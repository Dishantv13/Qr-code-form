import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import notify from "../utils/notification";

const Registrations = () => {
  const [eventId, setEventId] = useState("");
  const [eventData, setEventData] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!eventId.trim()) {
      notify.warning("Please enter an Event ID");
      return;
    }

    try {
      setLoading(true);
      setEventData(null);
      setRegistrations([]);

      const token = localStorage.getItem("token");

      if (!token) {
        notify.error("Please login as admin to view registrations");
        setSearched(true);
        return;
      }

      const res = await API.get(
        `/event/registrations/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setEventData(res.data.event);
      setRegistrations(res.data.registrations);
      setSearched(true);
      notify.success("Registrations loaded successfully!");
    } catch (err) {
      notify.error(
        err.response?.data?.message || "Failed to fetch registrations. Event not found."
      );
      setEventData(null);
      setRegistrations([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    if (registrations.length === 0) return;

    const headers = ["Name", "Email", "Phone Number", "Age", "Address", "Registration Date"];
    const rows = registrations.map((reg) => [
      reg.name,
      reg.email,
      reg.phonenumber,
      reg.age,
      reg.address,
      new Date(reg.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const link = document.createElement("a");
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
    link.download = `registrations-${eventId}.csv`;
    link.click();
    notify.success("CSV file downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Event Registrations
            </h1>
            <p className="text-gray-600">View all registered users for an event</p>
          </div>
          <Link
            to="/admin"
            className="px-4 py-2 bg-white/80 text-gray-700 rounded-lg hover:bg-white shadow-md transition-all duration-300"
          >
            ← Back to Admin
          </Link>
        </div>

    
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 mb-8 border border-gray-100">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter Event ID"
                value={eventId}
                onChange={(e) => {
                  setEventId(e.target.value);
                  setError("");
                }}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-400
                           focus:border-blue-400 transition duration-200"
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                  }`}
              >
                {loading ? "Loading..." : "Search"}
              </button>
            </div>
          </form>

        </div>

        {searched && (
          <>
            {eventData && (
              <div className="bg-linear-to-r from-blue-500 to-indigo-600 shadow-xl rounded-2xl p-8 mb-8 text-white">
                <h2 className="text-2xl font-bold mb-4">{eventData.eventName}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-blue-100">Event ID</p>
                    <p className="text-xl font-semibold">{eventData.eventId}</p>
                  </div>
                  <div>
                    <p className="text-blue-100">Date</p>
                    <p className="text-xl font-semibold">
                      {new Date(eventData.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-100">Location</p>
                    <p className="text-xl font-semibold">
                      {eventData.location || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {registrations.length > 0 ? (
              <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Total Registrations: {registrations.length}
                    </h3>
                  </div>
                  <button
                    onClick={handleDownloadCSV}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl
                             font-medium hover:bg-green-700 active:scale-95
                             transition-all duration-300"
                  >
                    Download CSV
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Phone
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Age
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Address
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Registered On
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg, index) => (
                        <tr
                          key={reg._id}
                          className="border-b border-gray-100 hover:bg-blue-50 transition"
                        >
                          <td className="py-3 px-4 text-gray-800">{reg.name}</td>
                          <td className="py-3 px-4 text-gray-800">{reg.email}</td>
                          <td className="py-3 px-4 text-gray-800">
                            {reg.phonenumber}
                          </td>
                          <td className="py-3 px-4 text-gray-800">{reg.age}</td>
                          <td className="py-3 px-4 text-gray-800">
                            {reg.address}
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {new Date(reg.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              searched &&
              eventData && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
                  <p className="text-yellow-800 text-lg font-medium">
                    No registrations found for this event yet.
                  </p>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Registrations;
