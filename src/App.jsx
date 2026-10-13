import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LandingPage, FeaturesPage, PricingPage, AboutPage, ContactPage, LoginPage, DashboardPage } from './pages';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/fitur" element={<FeaturesPage />} />
        <Route path="/harga" element={<PricingPage />} />
        <Route path="/tentang" element={<AboutPage />} />
        <Route path="/kontak" element={<ContactPage />} />
        <Route path="/masuk" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <Toaster position="top-center" toastOptions={{ duration: 3500, style: { borderRadius: '12px', border: '1px solid rgba(28,25,23,0.12)' } }} />
    </Router>
  );
}

export default App;
