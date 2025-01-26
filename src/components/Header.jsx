import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logoSmit from "../img/Saylani logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          <img src={logoSmit} alt="Saylani Welfare Logo" className="h-12" />
        </div>
        <div className="flex gap-3">
          {/* Dashboard Button */}
          <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>

          {/* Logout Button (shown when user is logged in) */}
          {user && (
            <Button onClick={logOut}>Logout</Button>
          )}

          {/* Login Button (shown when user is not logged in) */}
          {!user && (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
}