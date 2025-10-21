import React from "react";
import { FcGoogle } from "react-icons/fc";
import logo from "/logo.png";

const SignInPage = () => {
const handleGoogleSignIn = () => {
// TODO: Add Google sign-in integration (Firebase or OAuth)
console.log("Google Sign-In clicked");
};

return (
<div className="min-h-screen flex flex-col items-center justify-center bg-[#101624] text-white font-sans px-4">
<div className="bg-[#151b29] p-8 rounded-2xl shadow-lg w-full max-w-md">
<img src={logo} alt="Logo" className="mb-4 mx-auto h-20" />
<h1 className="text-3xl font-bold text-center mb-6 text-[#CBA244]">Smart Oil</h1>

    <form className="space-y-5">
      <div>
        <label className="block text-sm mb-1 text-gray-300">Username</label>
        <input
          type="text"
          placeholder="Enter username"
          className="w-full px-3 py-2 bg-[#191f2d] rounded-lg border border-[#2b313f] focus:outline-none focus:border-[#183e51] text-white placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-gray-300">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full px-3 py-2 bg-[#191f2d] rounded-lg border border-[#2b313f] focus:outline-none focus:border-[#183e51] text-white placeholder-gray-400"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-3 rounded-lg bg-gradient-to-r from-[#183d50] to-[#183e51] font-semibold hover:opacity-90 transition cursor-pointer"
      >
        Login
      </button>
    </form>

    <div className="mt-6 flex items-center justify-center">
      <div className="border-t border-gray-700 w-1/4"></div>
      <span className="text-gray-400 text-sm mx-3">OR</span>
      <div className="border-t border-gray-700 w-1/4"></div>
    </div>

    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-2 bg-[#191f2d] hover:bg-[#1c2233] border border-[#2b313f] text-white font-semibold p-3 rounded-lg mt-4 transition"
    >
      <FcGoogle size={20} />
      Continue with Google
    </button>
  </div>

  <p className="text-center text-gray-400 text-sm mt-6">
    Don’t have an account?{" "}
    <a href="/register" className="text-[#CBA244] hover:underline">
      Register
    </a>
  </p>
</div>


);
};

export default SignInPage;