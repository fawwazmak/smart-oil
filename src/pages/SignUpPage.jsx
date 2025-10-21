import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const SignupPage = () => {
const [showPassword, setShowPassword] = useState(false);

const handleSubmit = (e) => {
e.preventDefault();
// TODO: Hook up to backend or Firebase auth
console.log("Sign Up form submitted");
};

const handleGoogleSignup = () => {
// TODO: Integrate Google Sign-In (Firebase or OAuth2)
console.log("Google Sign-In clicked");
};

return (
<div className="min-h-screen bg-[#101624] flex items-center justify-center px-4 font-sans">
<div className="bg-[#151b29] text-white w-full max-w-md rounded-2xl shadow-lg p-8">
<h1 className="text-3xl font-bold mb-2 text-center text-[#CBA244]">Create Account</h1>
<p className="text-sm text-gray-400 text-center mb-6">
Sign up to access the Smart Oil Dashboard
</p>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Full Name</label>
        <input
          type="text"
          placeholder="Femi Olajide"
          required
          className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] text-white placeholder-gray-400 focus:outline-none focus:border-[#183e51]"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          placeholder="femi@email.com"
          required
          className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] text-white placeholder-gray-400 focus:outline-none focus:border-[#183e51]"
        />
      </div>

      <div className="relative">
        <label className="block text-sm mb-1">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          required
          className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] text-white placeholder-gray-400 focus:outline-none focus:border-[#183e51]"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-400 cursor-pointer"
        >
          {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
        </span>
      </div>

      <button
        type="submit"
        className="w-full bg-[#183e51] cursor-pointer hover:bg-[#1d4e68] transition text-white font-semibold p-3 rounded-lg mt-2"
      >Register
      </button>
    </form>

    <div className="mt-6 flex items-center justify-center">
      <div className="border-t border-gray-700 w-1/4"></div>
      <span className="text-gray-400 text-sm mx-3">OR</span>
      <div className="border-t border-gray-700 w-1/4"></div>
    </div>

    <button
      onClick={handleGoogleSignup}
      className="w-full flex items-center justify-center gap-2 bg-[#191f2d] hover:bg-[#1c2233] border border-[#2b313f] text-white font-semibold p-3 rounded-lg mt-4 transition"
    >
      <FcGoogle size={20} />
      Continue with Google
    </button>

    <p className="text-center text-gray-400 text-sm mt-6">
      Already have an account?{" "}
      <a href="/login" className="text-[#CBA244] hover:underline">
        Log In
      </a>
    </p>
  </div>
</div>


);
};

export default SignupPage;