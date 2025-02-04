import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

function Container() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  useEffect(() => {
    if (!user) {
      console.log("Please login to continue");
      navigate("/login"); // Ensure it's an absolute path
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex">
        {user && <Sidebar className="fixed top-0 left-0" />}
        <div className="w-screen m-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Container;
