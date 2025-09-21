import React, { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { authContext } from "../../Contexts/AuthContext";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";

export default function Layout() {
  const { isLoading } = useContext(authContext);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <div className="contianer">
            <Outlet />
          </div>
        </>
      )}

      <Footer />
    </>
  );
}
