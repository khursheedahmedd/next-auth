"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [data, setData] = useState("nothing");
  const router = useRouter();

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/me");

      console.log(response.data.data._id);
      setData(response.data.data._id);
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-2">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <h2>
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}{" "}
      </h2>
      <div className="flex gap-4 py-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={logout}
        >
          Logout
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={getUserDetails}
        >
          Get User Details
        </button>
      </div>
    </div>
  );
};

export default Profile;
