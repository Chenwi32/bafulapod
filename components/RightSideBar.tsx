import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
const RightSideBar = () => {
  return (
    <SignedIn>
      <section className="righ_sidebar">
        <h1 className="font-extrabold text-xl">Profile Information</h1>
      </section>
    </SignedIn>
  );
};

export default RightSideBar;
