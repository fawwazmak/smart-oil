import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabaseClient";

const AccountPage = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage(null);
    
    if (!newPassword) {
      setMessage({ type: 'error', text: 'Please enter a new password' });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      setLoading(false);
      
      if (error) {
        setMessage({ type: 'error', text: error.message });
        return;
      }
      
      // Success
      window.dispatchEvent(new CustomEvent('app:toast', { 
        detail: { message: 'Password updated successfully', type: 'success' } 
      }));
      setMessage({ type: 'success', text: 'Password updated successfully' });
      setNewPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setShowNewPassword(false);
    } catch (err) {
      setLoading(false);
      setMessage({ type: 'error', text: err.message || 'Failed to update password' });
    }
  };

  return (
    <div className="min-h-screen bg-[#101624] text-white flex items-center justify-center px-4 font-sans py-8">
      <div className="bg-[#151b29] w-full max-w-2xl rounded-2xl shadow-lg p-8">
        <h1 className="md:text-4xl text-3xl font-bold text-center mb-2 text-[#CBA244]">
          Account Settings
        </h1>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Manage your account security and profile
        </p>

        {/* User Info Section */}
        <div className="bg-[#0f1720] p-6 rounded-lg mb-6 border border-[#2b313f]">
          <h2 className="text-lg font-semibold text-white mb-4">Account Information</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Email Address</label>
              <p className="text-white font-medium">{user?.email || 'Not available'}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">User ID</label>
              <p className="text-gray-300 text-sm font-mono">{user?.id || 'Not available'}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Account Created</label>
              <p className="text-gray-300 text-sm">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Not available'}
              </p>
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        <form onSubmit={handlePasswordChange} className="space-y-5">
          <div className="border-t border-[#2b313f] pt-6">
            <h2 className="text-lg font-semibold text-white mb-4">Change Password</h2>

            <div className="relative mb-4">
              <label htmlFor="new-password" className="block text-sm mb-1">New Password</label>
              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] 
                           text-white placeholder-gray-400 focus:outline-none 
                           focus:ring-2 focus:ring-[#CBA244] transition-all"
              />
              <span
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-9 text-gray-400 cursor-pointer hover:text-white"
              >
                {showNewPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </span>
            </div>

            <div className="relative mb-4">
              <label htmlFor="confirm-password" className="block text-sm mb-1">Confirm Password</label>
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-lg bg-[#191f2d] border border-[#2b313f] 
                           text-white placeholder-gray-400 focus:outline-none 
                           focus:ring-2 focus:ring-[#CBA244] transition-all"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 cursor-pointer hover:text-white"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </span>
            </div>

            {/* Password strength indicator */}
            {newPassword && (
              <div className="mb-4 text-xs text-gray-300">
                <div className="space-y-1">
                  <div className={newPassword.length >= 8 ? 'text-green-400' : 'text-gray-500'}>
                    {newPassword.length >= 8 ? '✓' : '•'} At least 8 characters
                  </div>
                </div>
              </div>
            )}

            {/* Error / Success Message */}
            {message && (
              <div className={`mb-4 p-3 rounded text-sm ${
                message.type === 'error' 
                  ? 'bg-red-900 bg-opacity-30 border border-red-500 text-red-300'
                  : 'bg-green-900 bg-opacity-30 border border-green-500 text-green-300'
              }`}>
                {message.text}
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading || !newPassword || newPassword !== confirmPassword}
            className={`w-full font-semibold p-3 rounded-lg transition-all duration-200 ${
              loading || !newPassword || newPassword !== confirmPassword
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-[#183e51] hover:bg-[#1d4e68] text-white'
            }`}
          >
            {loading ? 'Updating Password…' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;