import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Lock, Mail, User, Shield } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const disableClipboard = (e) => {
  e.preventDefault();
};

const handleKeyDown = (e) => {
  if (e.ctrlKey || e.metaKey) {
    const key = e.key.toLowerCase();
    if (key === "c" || key === "v" || key === "x") {
      e.preventDefault();
       e.stopPropagation();
    }
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Calculate password strength
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[!@#$%^&*]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "from-red-500 to-red-600";
    if (passwordStrength < 50) return "from-orange-500 to-orange-600";
    if (passwordStrength < 75) return "from-yellow-500 to-yellow-600";
    return "from-emerald-500 to-emerald-600";
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 25) return "Weak";
    if (passwordStrength < 50) return "Fair";
    if (passwordStrength < 75) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!formData.role) {
      setError("Please select a role to continue");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters and contain a special character (!@#$%^&*)");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful. Redirecting to login...");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
          role: ""
        });

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center">
      
      {/* Animated gradient orbs background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">EventHub</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Join EventHub</h1>
            <p className="text-slate-400">Create your account and start managing events</p>
          </div>

          {/* Form Card */}
          <div className="w-full max-w-md">
            <div className="relative">
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Form card */}
              <div className="relative bg-slate-800/40 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                
                {/* Decorative top accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Success Message */}
                  {message && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-lg flex items-start gap-3 text-sm animate-pulse">
                      <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" />
                      <span>{message}</span>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 hover:border-slate-500/50"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 hover:border-slate-500/50"
                      />
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Select Your Role
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "organizer", label: "Organizer", icon: Shield },
                        { value: "exhibitor", label: "Exhibitor", icon: Sparkles }
                      ].map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setFormData({ ...formData, role: value })}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 group ${
                            formData.role === value
                              ? "border-purple-400/50 bg-purple-500/20 ring-2 ring-purple-400/30"
                              : "border-slate-600/30 bg-slate-700/10 hover:border-slate-500/50"
                          }`}
                        >
                          <Icon size={24} className={`transition-colors ${
                            formData.role === value ? "text-purple-400" : "text-slate-400 group-hover:text-slate-300"
                          }`} />
                          <span className={`text-sm font-medium transition-colors ${
                            formData.role === value ? "text-purple-300" : "text-slate-300 group-hover:text-slate-200"
                          }`}>
                            {label}
                          </span>
                          {formData.role === value && (
                            <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="group">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        onPaste={disableClipboard}
  onCopy={disableClipboard}
  onCut={disableClipboard}
  onKeyDown={handleKeyDown}   
  onContextMenu={(e) => e.preventDefault()}
                        required
                        className="w-full pl-10 pr-12 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 hover:border-slate-500/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">Password strength:</span>
                          <span className="text-xs font-medium text-purple-400">{getPasswordStrengthLabel()}</span>
                        </div>
                        <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${getPasswordStrengthColor()} transition-all duration-300`}
                            style={{ width: `${passwordStrength}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-400">
                          At least 8 characters with uppercase, lowercase, numbers & special character (!@#$%^&*)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Input */}
                  <div className="group">
                    <label htmlFor="confirm_password" className="block text-sm font-medium text-slate-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                      <input
                        id="confirm_password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        placeholder="••••••••"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        onPaste={disableClipboard}
  onCopy={disableClipboard}
  onCut={disableClipboard}
  onKeyDown={handleKeyDown}   // 👈 HERE you use it
  onContextMenu={(e) => e.preventDefault()}
                        required
                        className="w-full pl-10 pr-12 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 hover:border-slate-500/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Password Match Indicator */}
                    {formData.confirm_password && (
                      <div className="mt-2">
                        {formData.password === formData.confirm_password ? (
                          <div className="flex items-center gap-2 text-emerald-400 text-xs">
                            <CheckCircle2 size={14} />
                            Passwords match
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-400 text-xs">
                            <AlertCircle size={14} />
                            Passwords don't match
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Register Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 disabled:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-2 group relative overflow-hidden mt-6"
                  >
                    <span className="relative z-10">{isLoading ? "Creating Account..." : "Create Account"}</span>
                    {!isLoading && <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-800/40 text-slate-500">Already registered?</span>
                  </div>
                </div>

                {/* Login Link */}
                <Link
                  to="/login"
                  className="w-full py-3 px-4 border border-slate-600/50 hover:border-purple-400/50 text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-300 text-center hover:bg-slate-700/20 flex items-center justify-center gap-2 group"
                >
                  Sign In Instead
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-slate-500 text-xs mt-8">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile brand indicator */}
      <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">EventHub</span>
      </div>
    </div>
  );
}