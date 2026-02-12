import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Event Registration System
          </h1>
          <p className="text-xl text-gray-600">
            Manage events and track registrations with QR codes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          <Link
            to="/create-event"
            className="group bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Create Event
            </h2>
            <p className="text-gray-600">
              Create a new event and set up its details for registration
            </p>
          </Link>

          <Link
            to="/qr-generator"
            className="group bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="text-4xl mb-4">📱</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Generate QR
            </h2>
            <p className="text-gray-600">
              Generate QR codes for your created events
            </p>
          </Link>

          <Link
            to="/registrations"
            className="group bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="text-4xl mb-4">👥</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              View Registrations
            </h2>
            <p className="text-gray-600">
              See all registered users for any event
            </p>
          </Link>
        </div>

        
      </div>
    </div>
  );
};

export default Home;
