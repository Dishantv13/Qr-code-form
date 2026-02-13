import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import notify from "../utils/notification";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        await API.post('/admin/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
      }
      notify.success("Logged out successfully!");
    } catch (error) {
      console.error('Logout error:', error);
      notify.error("Logout failed. Please try again.");
    } finally {
      localStorage.removeItem('adminUser');
      localStorage.removeItem('token');
      
      window.dispatchEvent(new Event('authChange'));
      
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage events and view registrations</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-red-400 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/create-event"
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300 group"
          >
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
              Create Event
            </h2>
            <p className="text-gray-600">
              Set up new events with details, dates, and locations
            </p>
          </Link>

          <Link
            to="/admin/registrations"
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-300 group"
          >
            <div className="text-5xl mb-4">👥</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
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

export default AdminDashboard;
