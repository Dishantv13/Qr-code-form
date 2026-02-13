import { useState } from "react";
import API from "../api/api";
import notify from "../utils/notification";

function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? "/admin/login" : "/admin/register";

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const { data } = await API.post(endpoint, payload);

      localStorage.setItem("adminUser", JSON.stringify(data.admin));
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      notify.success(`${isLogin ? "Login" : "Registration"} successful!`);
      window.dispatchEvent(new Event('authChange'));
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || "An error occurred";
      notify.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-[#667eea] to-[#764ba2] p-5">
      <div className="bg-white rounded-[10px] shadow-[0_10px_25px_rgba(0,0,0,0.2)] p-10 w-full max-w-100">
        <h1 className="text-center text-[#333] mb-8 text-[28px] font-semibold">
          {isLogin ? "Admin Login" : "Admin Registration"}
        </h1>



        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block mb-2 text-[#555] font-medium">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full p-3 border border-[#ddd] rounded-[5px] text-sm transition duration-300 focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_5px_rgba(102,126,234,0.3)]"
              />
            </div>
          )}

          <div>
            <label className="block mb-2 text-[#555] font-medium">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full p-3 border border-[#ddd] rounded-[5px] text-sm transition duration-300 focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_5px_rgba(102,126,234,0.3)]"
            />
          </div>

          <div>
            <label className="block mb-2 text-[#555] font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full p-3 border border-[#ddd] rounded-[5px] text-sm transition duration-300 focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_5px_rgba(102,126,234,0.3)]"
            />
          </div>

          <span className="text-red-500 text-sm">Fields indicated with * are required</span>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white rounded-[5px] text-base font-semibold transition-all duration-200 ${
              loading
                ? "opacity-60 cursor-not-allowed bg-linear-to-br from-[#667eea] to-[#764ba2]"
                : "bg-linear-to-br from-[#667eea] to-[#764ba2] hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(102,126,234,0.4)]"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center mt-5 pt-5 border-t border-[#ddd]">
          <p className="text-[#666]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: "", email: "", password: "" });
              }}
              className="ml-2 text-[#667eea] font-semibold underline transition-colors duration-300 hover:text-[#764ba2]"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminAuth;
