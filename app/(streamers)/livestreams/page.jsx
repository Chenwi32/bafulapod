"use client"
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("https://niilong.vercel.app/"); // Replace with your server URL

function AudioListener() {
  const audioRef = useRef();
  const [audioUrl, SetAudioUrl] = useState()
  useEffect(() => {
    socket.on("audioBroadcast", (audioData) => {
      audioRef.current.srcObject = audioData;
        audioRef.current.play();
        SetAudioUrl(audioRef)
    });
  }, []);

  return <audio ref={audioUrl} controls autoPlay></audio>;
}

export default AudioListener;
