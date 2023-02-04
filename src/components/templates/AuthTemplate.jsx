import React from "react";
import { Outlet } from "react-router-dom";
import { Cover } from "../organisms";

export const AuthTemplate = () => {
  return (
    <>
      <div className="relative ">
        <div className="md:fixed md:w-2/5 right-0 ">
          <Cover />
        </div>
      </div>
      <div>
        <div className="absolute flex w-full md:w-3/5  h-screen items-center justify-center py-16 left-0">
          <main className="max-w-md w-full h-auto px-4">
            <div className="">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
