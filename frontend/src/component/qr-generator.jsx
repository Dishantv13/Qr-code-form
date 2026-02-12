import { useState } from "react";
import axios from "axios";

const QRGenerator = () => {
  const [eventId, setEventId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateQR = async (e) => {
    e.preventDefault();
    
    if (!eventId.trim()) {
      setError("Please enter an Event ID");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:5000/api/event/generate-qr", {
        eventId,
      });

      setQrCode(res.data.qrCode);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate QR code");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-blue-100 px-4">
    
    <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-100">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          QR Code Generator
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Generate a secure QR code for event registration
        </p>
      </div>


      <form onSubmit={handleGenerateQR} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter Event ID"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl
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
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </form>


      {error && (
        <div className="mt-4 text-sm text-red-500 bg-red-50 border border-red-200 p-3 rounded-lg">
          {error}
        </div>
      )}


      {qrCode && (
        <div className="mt-10 text-center border-t pt-6">
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
  </div>
);

};

export default QRGenerator