import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import notify from "../utils/notification";

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
  const [eventData, setEventData] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);

  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const res = await API.get(`/event/event/${eventId}`);
      setEventData(res.data.event);
    } catch (error) {
      console.error("Failed to fetch event details:", error);
    } finally {
      setLoadingEvent(false);
    }
  };

  if (!eventId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600">Invalid Access</h2>
          <p className="text-gray-600 mt-2">Please scan the QR code to access the registration form.</p>
        </div>
      </div>
    );
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

      const res = await API.post("/register",
        {
          ...formData,
          phonenumber: formData.phone,
          eventId,
        }
      );

      notify.success(res.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        address: "",
      });

    } catch (error) {
      notify.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4 py-8">
    
    <div className="w-full max-w-2xl">
      {loadingEvent ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-2">Loading event details...</p>
        </div>
      ) : eventData ? (
        <>
          <div className="bg-linear-to-r from-blue-500 to-indigo-600 shadow-xl rounded-2xl p-6 mb-6 text-white">
            <h2 className="text-3xl font-bold mb-4">{eventData.eventName}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-blue-100 text-xs mb-1">Event ID</p>
                <p className="text-xl font-semibold">{eventData.eventId}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-blue-100 text-xs mb-1">Date</p>
                <p className="text-xl font-semibold">
                  {new Date(eventData.date).toLocaleDateString()}
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-blue-100 text-xs mb-1">Location</p>
                <p className="text-xl font-semibold">{eventData.location}</p>
              </div>
              
              {eventData.capacity && (
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-blue-100 text-xs mb-1">Capacity</p>
                  <p className="text-xl font-semibold">{eventData.capacity}</p>
                </div>
              )}
            </div>
            
            {eventData.description && (
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-blue-100 text-xs mb-1">Description</p>
                <p className="text-white">{eventData.description}</p>
              </div>
            )}
          </div>

          <div className="bg-white shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Event Registration
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name <span className="text-red-500">*</span>
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
                  Email Address <span className="text-red-500">*</span>
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
                  Phone Number <span className="text-red-500">*</span>
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
                  Age <span className="text-red-500">*</span>
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
                  Address <span className="text-red-500">*</span>
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
              <span className="text-red-500 text-sm mt-">Fields indicated with * are required</span>

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
          </div>
        </>
      ) : (
        <div className="bg-red-50 border border-red-300 shadow-lg rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-3">Event Not Found</h2>
            <p className="text-red-700 mb-6">The event you're trying to register for does not exist or has been removed.</p>
            <Link to="/" 
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
);
}

export default Form;
