import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { VisionPage } from './pages/VisionPage'
import { ClientsPage } from './pages/ClientsPage'
import { ITProfessionalsPage } from './pages/ITProfessionalsPage'
import { LogisticsPage } from './pages/LogisticsPage'
import { StaffingPage } from './pages/StaffingPage'
import { BPOPage } from './pages/BPOPage'
import { ContactPage } from './pages/ContactPage'
import { EnquiryPage } from './pages/EnquiryPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about/vision" element={<VisionPage />} />
          <Route path="/about/clients" element={<ClientsPage />} />
          <Route path="/services/it-professionals" element={<ITProfessionalsPage />} />
          <Route path="/services/logistics" element={<LogisticsPage />} />
          <Route path="/services/staffing" element={<StaffingPage />} />
          <Route path="/services/bpo" element={<BPOPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}