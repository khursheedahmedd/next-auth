import React from "react";

const page = ({ params }: any) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold">Profile</h1>
      <h2 className="text-xl font-bold">{params.id}</h2>
    </div>
  );
};

export default page;
