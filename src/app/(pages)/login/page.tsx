"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      setLoading(false);

      console.log(response.data.message);
      console.log("Login successfully", response.data);

      toast.success("Login successfully");

      router.push("/profile");
    } catch (err: any) {
      console.log(err, "Login failed");
      toast.error(err.message);

      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Login</h2>
        <form
        // onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={user.email}
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
              placeholder="email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={user.password}
              onChange={(event) =>
                setUser({ ...user, password: event.target.value })
              }
              placeholder="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={!buttonDisabled}
              onClick={onLogin}
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <Link href="/register" className="text-blue-500 text-sm">
              Don't have an account? Click here
            </Link>
            {/* {error && (
              <p className="text-red-500 text-xs">{error}</p>
            )} */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
