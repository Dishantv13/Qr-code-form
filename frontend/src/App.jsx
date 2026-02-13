import './App.css'
import Home from './component/home.jsx'
import Form from './component/form.jsx'
import QRGenerator  from './component/qr-generator.jsx'
import Registrations from './component/registrations.jsx'
import CreateEvent from './component/create-event.jsx'
import AdminDashboard from './component/AdminDashboard.jsx'
import AdminAuth from './component/AdminAuth.jsx'
import AdminRoute from './routes/AdminRoute.jsx'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-auth" element={<AdminRoute requireAuth={false}><AdminAuth /></AdminRoute>} />
        <Route path="/admin" element={<AdminRoute requireAuth={true}><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/create-event" element={<AdminRoute requireAuth={true}><CreateEvent /></AdminRoute>} />
        <Route path="/admin/registrations" element={<AdminRoute requireAuth={true}><Registrations /></AdminRoute>} />
        <Route path="/qr-generator" element={<QRGenerator />} />
        <Route path="/register/:eventId" element={<Form />} />
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </>
  )
}

export default App
