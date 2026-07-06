import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { VisionPage } from './pages/VisionPage'
import { TimelinePage } from './pages/TimelinePage'
import { LeadershipPage } from './pages/LeadershipPage'
import { ClientsPage } from './pages/ClientsPage'
import { IndustryPage } from './pages/IndustryPage'
import { ITProfessionalsPage } from './pages/ITProfessionalsPage'
import { CyberSecurityPage } from './pages/CyberSecurityPage'
import { LogisticsPage } from './pages/LogisticsPage'
import { StaffingPage } from './pages/StaffingPage'
import { BPOPage } from './pages/BPOPage'
import { ContactPage } from './pages/ContactPage'
import { EnquiryPage } from './pages/EnquiryPage'
import { GetQuotePage } from './pages/GetQuotePage'
import { ServiceTopicPage } from './pages/ServiceTopicPage'
import { ClientCapabilityPage } from './pages/ClientCapabilityPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about/vision" element={<VisionPage />} />
          <Route path="/about/timeline" element={<TimelinePage />} />
          <Route path="/about/leadership" element={<LeadershipPage />} />
          <Route path="/about/clients" element={<ClientsPage />} />
          <Route path="/about/clients/healthcare" element={<IndustryPage slug="healthcare" />} />
          <Route path="/about/clients/financial" element={<IndustryPage slug="financial" />} />
          <Route path="/about/clients/technology" element={<IndustryPage slug="technology" />} />
          <Route path="/about/clients/logistics" element={<IndustryPage slug="logistics" />} />
          <Route path="/about/clients/government" element={<IndustryPage slug="government" />} />
          <Route path="/about/clients/manufacturing" element={<IndustryPage slug="manufacturing" />} />
          <Route path="/about/clients/:industry/:capability" element={<ClientCapabilityPage />} />
          <Route path="/services/it-professionals" element={<ITProfessionalsPage />} />
          <Route path="/services/it-professionals/:slug" element={<ServiceTopicPage area="it-professionals" />} />
          <Route path="/services/cybersecurity" element={<CyberSecurityPage />} />
          <Route path="/services/cybersecurity/:slug" element={<ServiceTopicPage area="cybersecurity" />} />
          <Route path="/services/logistics" element={<LogisticsPage />} />
          <Route path="/services/logistics/:slug" element={<ServiceTopicPage area="logistics" />} />
          <Route path="/services/staffing" element={<StaffingPage />} />
          <Route path="/services/staffing/:slug" element={<ServiceTopicPage area="staffing" />} />
          <Route path="/services/bpo" element={<BPOPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          <Route path="/get-quote" element={<GetQuotePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}