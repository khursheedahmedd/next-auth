"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
// import { verify } from "crypto";
// import { useRouter } from "next/router";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  // const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (err: any) {
      setError(true);
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    setError(false);

    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // const { query } = router;
    // const urlToken = query.token;
  }, []);

  useEffect(() => {
    setError(false);

    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Verifying Your Email
        </h2>
        {/* <p className="text-gray-600 mb-8">
          We've sent a verification link to your email address. Please click on
          the link to verify your email.
        </p> */}
        {verified ? (
          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <p className="text-green-600 font-bold">
              Email verified successfully!
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <p className="text-red-600 font-bold">
              Error verifying email. Please try again.
            </p>
          </div>
        ) : (
          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <p className="text-yellow-600 font-bold">
              Verifying email... please wait.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
