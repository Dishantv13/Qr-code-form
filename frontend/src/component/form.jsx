import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Form = () => {
  const { eventId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!eventId) {
    return <h2>Invalid Access. Please scan the QR code.</h2>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/register",
        {
          // name: formData.name,
          // email: formData.email,
          // phonenumber: formData.phone,
          // age: formData.age,
          // address: formData.address,
          // eventId,
          ...formData,
          phonenumber: formData.phone,
          eventId,
        }
      );

      setMessage(res.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        address: "",
      });

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
    
    <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
      
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Event Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            name="name"
            value={formData.name}
            placeholder="Enter your full name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       focus:border-indigo-400 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       focus:border-indigo-400 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            name="phone"
            value={formData.phone}
            placeholder="Enter your phone number"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       focus:border-indigo-400 transition duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Age
          </label>
          <input
            name="age"
            type="text"
            value={formData.age}
            placeholder="Enter your age"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       focus:border-indigo-400 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
          Address
          </label>
          <input
            name="address"
            type="text"
            value={formData.address}
            placeholder="Enter your address"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 
                       focus:border-indigo-400 transition duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition duration-300
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
            }`}
        >
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-green-600">
          {message}
        </p>
      )}
    </div>
  </div>
);
}

export default Form;
