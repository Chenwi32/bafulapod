"use client"

import { useState, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Replace with your server URL

function AudioBroadcaster() {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const audioRef = useRef(null);

  const startBroadcasting = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioRef.current.srcObject = stream;
        audioRef.current.play();
        setIsBroadcasting(true);
        socket.emit("broadcastAudio", stream);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const stopBroadcasting = () => {
    audioRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setIsBroadcasting(false);
    socket.emit("stopBroadcast");
  };

  return (
    <div>
      {isBroadcasting ? (
        <button onClick={stopBroadcasting}>Stop Broadcasting</button>
      ) : (
        <button onClick={startBroadcasting}>Start Broadcasting</button>
      )}
      <audio ref={audioRef} controls autoPlay></audio> 
    </div>
  );
}

export default AudioBroadcaster;
