import React from 'react'

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#101624] text-white font-sans">
        <div className="bg-[#151b29] p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h1 className="text-3xl font-bold text-center mb-6 text-[#CBA244]">Smart Oil Dashboard</h1>
            <form className="space-y-5">
                <div>
                    <label className="block text-sm mb-1 text-gray-300">Username</label>
                    <input type="text" placeholder="Enter username" className="w-full px-3 py-2 bg-[#191f2d] rounded-lg border border-[#2b313f] focus:outline-none focus:border-[#183e51]" />
                </div>
                <div>
                    <label className="block text-sm mb-1 text-gray-300">Password</label>
                    <input type="password" placeholder="Enter password" className="w-full px-3 py-2 bg-[#191f2d] rounded-lg border border-[#2b313f] focus:outline-none focus:border-[#183e51]" />
                </div>

                <button type="submit" className="w-full py-2 mt-3 rounded-lg bg-linear-to-r from-[#183d50] to-[#183e51] font-semibold hover:opacity-90 transition" >Login</button>
            </form>
        </div>
    </div>
  )
}

export default SignInPage
