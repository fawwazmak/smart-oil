import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const AccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    company: "Oando",
    category: "Oil & Gas",
    location: "Lagos, Nigeria",
    email: "admin@oando.com",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated account:", formData);
    // TODO: connect to backend update API
  };

  return (
    <div className="min-h-screen bg-[#101624] text-white flex items-center justify-center px-4 font-sans">
      <div className="bg-[#151b29] w-full max-w-2xl rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2 bg-linear-to-r from-[#CBA244] to-[#D98021] bg-clip-text text-transparent">
          Account Settings
        </h1>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Manage your company profile and account security
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Company Info Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Company Information</h2>

            <div>
              <label htmlFor="company" className="block text-sm mb-1">Company Name</label>
              <input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] 
                           text-white placeholder-gray-400 focus:outline-none 
                           focus:ring-2 focus:ring-[#CBA244] transition-all"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm mb-1">Business Category</label>
              <input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] 
                           text-white placeholder-gray-400 focus:outline-none 
                           focus:ring-2 focus:ring-[#CBA244] transition-all"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm mb-1">Company Address</label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] 
                           text-white placeholder-gray-400 focus:outline-none 
                           focus:ring-2 focus:ring-[#CBA244] transition-all"
              />
            </div>
          </div>

          {/* Account Info Section */}
          <div className="space-y-4 pt-6 border-t border-[#2b313f]">
            <h2 className="text-lg font-semibold text-white">Account Details</h2>

            <div>
              <label htmlFor="email" className="block text-sm mb-1">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] 
                           text-white placeholder-gray-400 focus:outline-none 
                           focus:ring-2 focus:ring-[#CBA244] transition-all"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm mb-1">Current Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] 
                           text-white placeholder-gray-400 focus:outline-none 
                           focus:ring-2 focus:ring-[#CBA244] transition-all"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 cursor-pointer"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </span>
            </div>

            <div className="relative">
              <label htmlFor="new-password" className="block text-sm mb-1">New Password</label>
              <input
                id="new-password"
                name="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] 
                           text-white placeholder-gray-400 focus:outline-none 
                           focus:ring-2 focus:ring-[#CBA244] transition-all"
              />
              <span
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-9 text-gray-400 cursor-pointer"
              >
                {showNewPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </span>
            </div>
          </div>

          {/* Save Changes */}
          <button
            type="submit"
            className="w-full bg-[#183e51] hover:bg-[#1d4e68] text-white font-semibold 
                       p-3 rounded-lg transition-all duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;
