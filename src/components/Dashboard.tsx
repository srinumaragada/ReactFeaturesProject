import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCounterStore } from '../store/counterStore';

export const Dashboard: React.FC = () => {
  const { count } = useCounterStore();
  const [data, setData] = useState<{ name: string; increase: number; decrease: number }[]>([]);
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

  // Load user data from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  // Update chart data based on count
  useEffect(() => {
    console.log("Current Count: ", count);  // Log the count value
    const currentDate = new Date().toLocaleDateString();
    const lastEntry = data[data.length - 1];

    if (count !== (lastEntry ? lastEntry.increase + lastEntry.decrease : 0)) {
      if (lastEntry && lastEntry.name === currentDate) {
        const updatedData = [...data];
        updatedData[updatedData.length - 1] = {
          ...lastEntry,
          increase: count > lastEntry.increase + lastEntry.decrease ? lastEntry.increase + 1 : lastEntry.increase,
          decrease: count < lastEntry.increase + lastEntry.decrease ? lastEntry.decrease + 1 : lastEntry.decrease,
        };
        setData(updatedData);
      } else {
        setData((prevData) => [
          ...prevData,
          { name: currentDate, increase: count > 0 ? 1 : 0, decrease: count < 0 ? 1 : 0 }
        ]);
      }
    }
  }, [count]);

  console.log("Chart Data: ", data); // Log the data passed to the chart

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* User Profile */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {userData ? (
            <>
              <h2 className="text-2xl font-semibold">User Profile</h2>
              <p><strong>Name:</strong> {userData?.name}</p>
              <p><strong>Email:</strong> {userData?.email}</p>
            </>
          ) : (
            <p className="text-red-500">No user data found</p>
          )}
        </div>

        {/* Counter Trends Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Counter Trends</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="increase" stroke="#10B981" strokeWidth={3} />
              <Line type="monotone" dataKey="decrease" stroke="#EF4444" strokeWidth={3} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
