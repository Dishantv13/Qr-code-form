import './App.css'
import Home from './component/home.jsx'
import Form from './component/form.jsx'
import QRGenerator  from './component/qr-generator.jsx'
import Registrations from './component/registrations.jsx'
import CreateEvent from './component/create-event.jsx'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/qr-generator" element={<QRGenerator />} />
        <Route path="/register/:eventId" element={<Form />} />
        <Route path="/registrations" element={<Registrations />} />
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </>
  )
}

export default App
