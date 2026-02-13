import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/api";
import notify from "../utils/notification";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/event/events");
      setEvents(res.data.events);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      notify.error("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Event Registration System
          </h1>
          <p className="text-xl text-gray-600">
            Scan QR code to register for events
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-12">
          <Link
            to="/admin"
            className="group bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center"
          >
            <div className="text-5xl mb-4">🔧</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Admin Panel
            </h2>
            <p className="text-gray-600">
              Create events and manage registrations
            </p>
          </Link>
          <Link
            to="/qr-generator"
            className="group bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center"
          >
            <div className="text-5xl mb-4">📱</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Generate QR Code
            </h2>
            <p className="text-gray-600">
              Generate QR codes for event registration
            </p>
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-100 ">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Available Events
          </h2>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="max-h-150 overflow-y-auto pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-linear-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {event.eventName}
                    </h3>
                    <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
                      {event.eventId}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📅</span>
                      <span className="font-semibold">Date:</span>
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-lg">📍</span>
                      <span className="font-semibold">Location:</span>
                      <span>{event.location}</span>
                    </div>

                    {event.capacity && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg">👥</span>
                        <span className="font-semibold">Capacity:</span>
                        <span>{event.capacity}</span>
                      </div>
                    )}

                    {event.description && (
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <p className="text-gray-600 text-sm">
                          {event.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No events available at the moment
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
