import React from "react";

export const Cover = () => {
  return (
    <>
      <div className="hidden md:flex justify-center items-center min-h-screen bg-gradient-to-r from-sky-100 via-sky-500 to-sky-900">
        <div className="text-center text-white space-y-3 p-8">
          <img
            className="mx-auto h-40 w-min"
            src="https://cdn-icons-png.flaticon.com/512/4945/4945861.png"
            alt="EduPoli"
          />
          <h2 className="text-3xl font-extrabold">EduPoli</h2>
          <p className="text-base">Aprender es mas facil</p>
        </div>
      </div>
    </>
  );
};
