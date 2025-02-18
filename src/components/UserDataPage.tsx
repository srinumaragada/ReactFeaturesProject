import React, { useEffect, useState } from 'react';
import { useUserContext } from '../Context/UserContext';

export const UserData: React.FC = () => {
  const { userData } = useUserContext(); 
  const [storedData, setStoredData] = useState<string | null>(null);
console.log(userData);

 
  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setStoredData(savedData);
    }
  }, []);

 
  const handleSave = () => {
    if (userData) {
      const jsonData = JSON.stringify(userData);
      localStorage.setItem('userData', jsonData);
      setStoredData(jsonData);  
      alert('User data saved to localStorage');
    }
  };

 
  if (!userData) {
    return <p>No user data available</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Information</h2>

      <div className="space-y-4">
       
        <pre className="w-full bg-gray-100 p-4 text-sm">
          {`{
  "id": "${userData.id}",
  "name": "${userData.name}",
  "email": "${userData.email}",
  "phone": "${userData.phone}",
  "address": "${userData.address}"
}`}
        </pre>  
                    <p>Id: <span>{userData.id}</span></p>
                    <p> Name: <span>{userData.name}</span></p>
        <button
          onClick={handleSave}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          Save 
        </button>
      </div>
    </div>
  );
};
