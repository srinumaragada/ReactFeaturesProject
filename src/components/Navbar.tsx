import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SignOutButton from "./SignOutButton";  

interface NavbarProps {
  user: any;
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
    const navigate= useNavigate()
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <div className="flex space-x-4">
        {!user ? (
          <Link to="/auth" className="text-lg font-semibold">
           Login/Signup to Dashboard
          </Link>
        ) : (
          <Link to="/dashboard" className="text-lg font-semibold">
            Dashboard
          </Link>
        )}
      </div>
      <button onClick={()=>navigate("/")}className="text-lg font-semibold">
        Home
      </button>
      <div className="flex space-x-4">
        {user ? (
          <SignOutButton />  
        ) : null}
      </div>
    </nav>
  );
};
