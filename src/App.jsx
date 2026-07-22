import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import LenisScroll from "./components/LenisScroll";
import ChatAdvisor from "./components/ChatAdvisor";

// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CostCalculator from "./pages/CostCalculator";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Careers from "./pages/Careers";
import Gallery from "./pages/Gallery";
import FAQ from "./pages/FAQ";
import ErrorPage from "./pages/ErrorPage";

import { ThemeProvider } from "./context/ThemeContext";
import { MotionProvider } from "./motion/MotionProvider";
import PageTransition from "./motion/PageTransition";

function App() {
  return (
    <ThemeProvider>
      <MotionProvider>
        <Router>
          <LenisScroll />
          <ScrollToTop />
          <ChatAdvisor />
          
          <div className="flex flex-col min-h-screen bg-white dark:bg-charcoal text-charcoal dark:text-white transition-colors duration-300">
            <Navbar />
            
            <main className="flex-grow">
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/our-projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:id" element={<ServiceDetail />} />
                  <Route path="/construction-services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/about-us" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/contact-us" element={<Contact />} />
                  <Route path="/cost-calculator" element={<CostCalculator />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blogs" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogArticle />} />
                  <Route path="/blogs/:id" element={<BlogArticle />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/faq" element={<FAQ />} />
                  {/* Fallback route */}
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </PageTransition>
            </main>
            
            <Footer />
          </div>
        </Router>
      </MotionProvider>
    </ThemeProvider>
  );
}

export default App;
