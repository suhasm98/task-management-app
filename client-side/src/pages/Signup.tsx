import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await api.post("/signup", formData);
      const { user, token } = res.data;

      
      localStorage.setItem("token", token);

      dispatch(loginSuccess({ user, token }));
      toast.success("Signup successful!");
      navigate("/dashboard");
    } catch (err: any) {
      const message = err.response?.data?.message || "Signup failed";
      dispatch(loginFailure(message));
      toast.error(message);
    }
  };

  return (
    

<div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
<div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
    Signup
    </h2>
</div>

<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
<form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 mt-10 bg-white shadow rounded">
<div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
            Name
            </label>
            <div className="mt-2">
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
        </div>
        <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
            </label>
            <div className="mt-2">
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
        </div>

        <div>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                </label>
                
            </div>
            <div className="mt-2">
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </div>
        </div>

        <div className="mt-2">
            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Sign up
            </button>
        </div>
    </form>

    <p className="mt-10 text-center text-sm/6 text-gray-500">
        Already a member?{' '}
        <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign in
        </a>
    </p>
</div>
</div>
  );
}
