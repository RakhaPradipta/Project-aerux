import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children, hideFooter = false }) => (
  <div className="min-h-screen bg-cream-50 overflow-x-hidden">
    <Navbar />
    <main className="pt-[136px] sm:pt-[118px] md:pt-[112px]">{children}</main>
    {!hideFooter && <Footer />}
  </div>
);

export default MainLayout;
