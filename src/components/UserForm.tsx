import React, { useState } from 'react';
import { Save, User, Mail, Phone, MapPin } from 'lucide-react';
import { useUserContext } from '.././Context/UserContext'; 

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const UserForm: React.FC = () => {
  const { setUserData } = useUserContext(); 
  const [formData, setFormData] = useState<UserData>({
    id: crypto.randomUUID(),
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setHasUnsavedChanges(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem(`user_${formData.id}`, JSON.stringify(formData));
    localStorage.setItem('userId', formData.id); 
    setUserData(formData); 
    setHasUnsavedChanges(false);
    alert('User data saved successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Information</h2>
      
      <div className="space-y-4">
        <div className="flex items-center border-b border-gray-300 py-2">
          <User className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border-b border-gray-300 py-2">
          <Mail className="text-gray-400 mr-3" size={20} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border-b border-gray-300 py-2">
          <Phone className="text-gray-400 mr-3" size={20} />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center border-b border-gray-300 py-2">
          <MapPin className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full focus:outline-none"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <Save size={20} />
        Save Information
      </button>

      {hasUnsavedChanges && (
        <p className="mt-4 text-amber-600 text-sm">
          You have unsaved changes. Please save before leaving.
        </p>
      )}
    </form>
  );
};
