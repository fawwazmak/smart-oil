import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null); // null | true | false

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up form submitted");
  };

  const handleGoogleSignup = () => {
    console.log("Google Sign-In clicked");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    handleSubmit(e);
  };

  // Live password check
  const handlePasswordChange = (value, isConfirm = false) => {
    if (isConfirm) setConfirmPassword(value);
    else setPassword(value);
    setPasswordMatch(isConfirm ? value === password : confirmPassword === value);
  };

  return (
    <div className="min-h-screen bg-[#101624] flex items-center justify-center px-4 font-sans">
      <div className="bg-[#151b29] text-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-center text-[#CBA244]">Create Account</h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Sign up to access the Smart Oil Dashboard
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Company name */}
          <div>
            <label htmlFor="company" className="block text-sm mb-1">Company Name</label>
            <input
              type="text"
              name="company"
              id="company"
              placeholder="Oando"
              required
              className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] 
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#183e51]"
            />
          </div>

          {/* Business category */}
          <div>
            <label htmlFor="business-category" className="block text-sm mb-1">Business Category</label>
            <input
              type="text"
              name="business-category"
              id="business-category"
              placeholder="Oil & Gas"
              required
              className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] 
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#183e51]"
            />
          </div>

          {/* Company address */}
          <div>
            <label htmlFor="location" className="block text-sm mb-1">Company Address</label>
            <input
              required
              id="location"
              placeholder="Lagos, Nigeria"
              className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] 
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#183e51]"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm mb-1">Password</label>
            <input
              name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] text-white placeholder-gray-400 focus:outline-none focus:border-[#183e51]" />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-400 cursor-pointer">
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="confirm-password" className="block text-sm mb-1">Confirm Password</label>
            <input
              name="confirm-password"
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => handlePasswordChange(e.target.value, true)}
              placeholder="••••••••"
              required
              className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] 
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#183e51]"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-400 cursor-pointer"
            >
              {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </span>

            {/* Password match message */}
            {passwordMatch === false && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
            {passwordMatch === true && (
              <p className="text-green-500 text-sm mt-1">Passwords match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={passwordMatch === false}
            className={`w-full cursor-pointer font-semibold p-3 rounded-lg mt-2 transition 
                        ${
                          passwordMatch === false
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-[#183e51] hover:bg-[#1d4e68] text-white"
                        }`}
          >
            Create Company Account
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
