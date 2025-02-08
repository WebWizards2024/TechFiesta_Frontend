import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetMedicData } from "../../hooks/useGetMedicData";
import { useQueryClient } from "@tanstack/react-query";

function Container() {
  const queryClient = useQueryClient();
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `http://localhost:8000/api/v1/health-data/getUser/${auth.user_id}`
      );
      const data = await res.json();
      console.log(data, auth);
      if (data) {
        setAuth((pre) => {
          return { ...pre, healthData: data.data };
        });
      }
    }
    getData();
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar className="fixed top-0 left-0" />
        <div className="w-screen bg-white">
          <div className="m-10 ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Container;
