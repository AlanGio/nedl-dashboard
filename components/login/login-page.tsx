"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just redirect to dashboard without validation
    router.push("/summary");
  };

  const handleSignUp = () => {
    // For now, just redirect to dashboard
    router.push("/summary");
  };

  const handleForgotPassword = () => {
    // For now, just redirect to dashboard
    router.push("/summary");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 relative">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/background-login.png"
          alt="Login Background"
          className="w-full h-full object-cover"
          tabIndex={0}
          aria-label="Login background image"
          role="img"
        />
        {/* Mobile overlay for better readability */}
        <div className="absolute inset-0 bg-black/20 lg:hidden"></div>
      </div>

      {/* Main login card */}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-6xl bg-gradient-to-r from-[#449CFB] to-[#f087fb] rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[500px] lg:h-[600px]">
          {/* Left Panel - Branding (hidden on mobile) */}
          <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
            <img
              src="/login-image.svg"
              alt="Login Background"
              className="object-none w-full h-full absolute inset-0"
              tabIndex={0}
              aria-label="Login background illustration"
              role="img"
              width="80%"
            />
          </div>

          {/* Right Panel - Login Form */}
          <div className="w-full lg:w-2/5 p-3 sm:p-4 flex flex-col justify-center">
            <div className="space-y-6 sm:space-y-8 lg:space-y-10 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full h-full flex flex-col justify-center shadow-lg">
              {/* Title */}
              <div className="text-center">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                  Sign In
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={handleSignUp}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    tabIndex={0}
                    aria-label="Sign up for a new account"
                  >
                    Sign Up
                  </button>
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                    placeholder="Enter your username"
                    tabIndex={0}
                    aria-label="Username input field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                    placeholder="Enter your password"
                    tabIndex={0}
                    aria-label="Password input field"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 sm:py-3 px-4 rounded-xl sm:rounded-2xl transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base touch-manipulation"
                  tabIndex={0}
                  aria-label="Sign in to your account"
                >
                  <span>Login</span>
                  <span>&gt;</span>
                </button>
              </form>

              {/* Forgot Password */}
              <div className="text-center">
                <button
                  onClick={handleForgotPassword}
                  className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm transition-colors"
                  tabIndex={0}
                  aria-label="Forgot password link"
                >
                  Forgot Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
