import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { signUpWithEmailAndPassword, signInWithEmailAndPassword } from "./firebase/auth";
import { Counter } from "./components/Counter";
import { RichTextEditor } from "./components/RichTextEditor";
import { UserData } from "./components/UserDataPage";
import { UserProvider } from "./Context/UserContext";
import { auth } from "./config/firebase.config";
import { GoogleAuthPage } from "./Auth/GoogleAuth";
import { UserForm } from "./components/UserForm";

function App() {
  const [user, setUser] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const userObj = { email: authUser.email };
        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignUp = async (email: string, password: string) => {
    try {
      await signUpWithEmailAndPassword(auth, email, password);
      const userObj = { email };
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Error signing up: " + error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(email, password);
      const userObj = { email };
      setUser(userObj);
      navigate("/dashboard");
      localStorage.setItem("user", JSON.stringify(userObj));
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Invalid credentials: " + error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = user !== null; 

  return (
    <UserProvider>
      <Navbar user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100 py-12 px-4">
              <div className="max-w-6xl mx-auto space-y-12">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">React Features Demo</h1>
                <div className="flex w-full gap-10 h-full">
                  <div className="w-full md:w-1/2">
                    <Counter />
                  </div>
                  <div className="w-full md:w-1/2">
                    <RichTextEditor />
                  </div>
                </div>
                <div className="flex w-full gap-10 h-full mt-8">
                  <div className="w-full md:w-1/2">
                    <UserData />
                  </div>
                  <div className="w-full md:w-1/2">
                    <UserForm />
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard   /> : <Navigate to="/auth" />} />
        <Route
          path="/auth"
          element={
            <div className="min-h-screen bg-gray-50 py-12 px-4">
              <div className="max-w-6xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Sign Up / Log In</h1>
                <div className="bg-white shadow-md rounded-lg p-8">
                  <GoogleAuthPage onSignUp={handleSignUp} onSignIn={handleSignIn} />
                  <div className="mt-6 text-center">
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
