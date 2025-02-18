import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface GoogleAuthPageProps {
  onSignUp: (email: string, password: string) => void;
  onSignIn: (email: string, password: string) => void;
}

export const GoogleAuthPage: React.FC<GoogleAuthPageProps> = ({
  onSignUp,
  onSignIn,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
const navigate=useNavigate()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      onSignUp(email, password);
      navigate("/dashboard")
    } else {
      onSignIn(email, password);
      navigate("/dashboard")
    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-blue-600 mt-4 w-full text-center"
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};
