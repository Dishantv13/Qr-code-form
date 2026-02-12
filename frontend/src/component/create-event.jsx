import { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventId: "",
    eventName: "",
    date: "",
    description: "",
    location: "",
    capacity: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.eventId || !formData.eventName || !formData.date) {
      setMessage("Event ID, Event Name, and Date are required");
      setSuccess(false);
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post("http://localhost:5000/api/event/create-event", {
        ...formData,
        capacity: formData.capacity ? parseInt(formData.capacity, 10) : null,
      });

      setMessage(res.data.message);
      setSuccess(true);
      setFormData({
        eventId: "",
        eventName: "",
        date: "",
        description: "",
        location: "",
        capacity: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create event");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-200 via-white to-pink-200 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create New Event
          </h1>
          <p className="text-gray-600">Set up a new event for registration</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="eventId"
                  value={formData.eventId}
                  onChange={handleChange}
                  placeholder="e.g., EVT001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-purple-400
                           focus:border-purple-400 transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="e.g., Tech Conference 2026"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-purple-400
                           focus:border-purple-400 transition duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-purple-400
                         focus:border-purple-400 transition duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location  <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Convention Center, New York"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-purple-400
                         focus:border-purple-400 transition duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Event description"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-purple-400
                         focus:border-purple-400 transition duration-200 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g., 500"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-purple-400
                         focus:border-purple-400 transition duration-200"
              />
            </div>
            <div>
                <label className="block text-sm font-semibold text-red-500 mb-2">All fields indicated with (*) are required</label>
            </div>

            {message && ( 
              <div
                className={`p-4 rounded-lg text-sm ${
                  success
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {message}

              </div>
              
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 active:scale-95"
                }`}
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
