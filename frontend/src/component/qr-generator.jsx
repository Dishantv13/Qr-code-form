import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import notify from "../utils/notification";

const QRGenerator = () => {
  const [eventId, setEventId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/event/events");
      setEvents(res.data.events);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoadingEvents(false);
    }
  };

  const handleEventSelect = (event) => {
    setEventId(event.eventId);
    setSelectedEvent(event);
    setQrCode("");
  };

  const handleGenerateQR = async (e) => {
    e.preventDefault();
    
    if (!eventId.trim()) {
      notify.warning("Please select or enter an Event ID");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/event/generate-qr", {
        eventId,
      });

      notify.success("QR Code generated successfully!");
      setQrCode(res.data.qrCode);
    } catch (err) {
      notify.error(err.response?.data?.message || "Failed to generate QR code");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-blue-100 px-4 py-8">
    
    <div className="w-full max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold text-gray-800">
            QR Code Generator
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Generate a secure QR code for event registration
          </p>
        </div>
        <Link
          to="/"
          className="px-4 py-2 bg-white/80 text-gray-700 rounded-lg hover:bg-white shadow-md transition-all duration-300"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8 border border-gray-100">
          {selectedEvent && (
            <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
              <h3 className="text-sm font-semibold text-indigo-800 mb-2">
                Selected Event
              </h3>
              <p className="text-lg font-bold text-gray-800">
                {selectedEvent.eventName}
              </p>
              <p className="text-sm text-gray-600">
                ID: {selectedEvent.eventId}
              </p>
            </div>
          )}

          <form onSubmit={handleGenerateQR} className="space-y-4">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-gray-700">
                Event ID
              </label>
              <input
                type="text"
                placeholder="Enter or select Event ID"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-indigo-400
                         focus:border-indigo-400 transition duration-200"
              />

              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
                  }`}
              >
                {loading ? "Generating..." : "Generate QR Code"}
              </button>
            </div>
          </form>

          {qrCode && (
            <div className="mt-8 text-center border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Your QR Code
              </h2>

              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-2xl shadow-lg border">
                  <img
                    src={qrCode}
                    alt="QR Code"
                    className="w-64 h-64 object-contain"
                  />
                </div>
              </div>

              <p className="text-gray-500 text-sm mt-4">
                Scan this QR code to access the event registration form
              </p>

              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = qrCode;
                  link.download = `qr-code-${eventId}.png`;
                  link.click();
                }}
                className="mt-6 px-6 py-2 bg-green-600 text-white rounded-xl 
                         font-medium hover:bg-green-700 active:scale-95 
                         transition-all duration-300 shadow-md"
              >
                Download QR Code
              </button>
            </div>
          )}
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mt-10">
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Available Events
          </h2>

          {loadingEvents ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="space-y-3 max-h-125 overflow-y-auto">
              {events.map((event) => (
                <div
                  key={event._id}
                  onClick={() => handleEventSelect(event)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedEvent?._id === event._id
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {event.eventName}
                    </h3>
                    <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
                      {event.eventId}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No events available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

};

export default QRGenerator