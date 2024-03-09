import React, { useState } from 'react';
import { useRegisterWeddingMutation } from '../store/api/WeddingApi';
import { useParams } from 'react-router-dom';

const RegisterWedding = () => {
    const {wedding_id}=useParams();
    const [RegisterWedding]=useRegisterWeddingMutation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    numberOfGuests: '',
    place: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    const token=localStorage.getItem('token')
    const session =RegisterWedding({formData, token,wedding_id})
    // Here you can send the formData to the server or perform any other actions
  };

  return (
    <div className='w-80 m-10 p-5'>
        <h2 className='text-1xl font-bold '>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md block w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md block w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md block w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Number of Guests:
            <input
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md block w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Place:
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md block w-full"
            />
          </label>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default RegisterWedding;
