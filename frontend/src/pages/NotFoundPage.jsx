import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
return (
<div className="min-h-screen flex flex-col items-center justify-center bg-[#101624] text-white font-sans px-4">
<div className="text-center">
<div className="relative inline-block">
<div className="absolute inset-0 bg-[#183e51] rounded-full blur-2xl opacity-30 animate-pulse"></div>
<div className="relative text-8xl font-extrabold text-[#CBA244] drop-shadow-lg">
404
</div>
</div>

    <h1 className="text-3xl font-bold mt-6 text-[#CBA244]">
      Page Not Found
    </h1>
    <p className="text-gray-400 mt-3 max-w-md mx-auto">
      Oops! The page you’re looking for doesn’t exist or has been moved.
    </p>

    <Link
      to="/"
      className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-[#183d50] to-[#183e51] rounded-lg font-semibold hover:opacity-90 transition"
    >
      <ArrowLeft size={20} />
      Go Back Home
    </Link>
  </div>
</div>


);
};

export default NotFoundPage;