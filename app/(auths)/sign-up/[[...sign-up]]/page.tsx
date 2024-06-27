import { SignUp } from "@clerk/nextjs";


const CreateAccount = () => {
  return (
    <div className="flex justify-center items-center glassmorphism-auth h-screen w-full">
      <SignUp />
    </div>
  );
};

export default CreateAccount;
