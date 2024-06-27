import { SignIn } from "@clerk/nextjs";

const LogIn = () => {
    return (
      <div className="flex justify-center items-center glassmorphism-auth h-screen w-full">
        <SignIn />
      </div>
    );
}

export default LogIn;