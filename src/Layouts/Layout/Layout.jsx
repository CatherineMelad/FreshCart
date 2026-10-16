import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import { useAuth } from "../../Contexts/AuthContext";

export default function Layout() {
  const { isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <Navbar />
      <main className="page-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}