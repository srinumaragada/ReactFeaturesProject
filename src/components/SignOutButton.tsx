import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 
import { auth } from "../config/firebase.config";  

const SignOutButton: React.FC = () => {
  const navigate = useNavigate();  

  const handleSignOut = async () => {
    try {
      
      await signOut(auth);
      
      
      localStorage.removeItem("user");

      
      navigate("/");  
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <button onClick={handleSignOut} className="bg-red-500 text-white p-3 rounded-lg">
      Sign Out
    </button>
  );
};

export default SignOutButton;
