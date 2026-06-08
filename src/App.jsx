import { useState } from "react";
import "./App.css";
import BrandSlider from "./components/pages/BrandSlider";
import FleetSection from "./components/pages/FleetSection";
import Hero from "./components/pages/Hero";
import HowItWorks from "./components/pages/HowItWorks";
import Navbar from "./components/pages/Navbar";
import BookingModal from "./components/pages/BookingModal";
import ContactSection from "./components/pages/ContactSection";
import { Toaster } from "sonner";
import WhatsAppWidget from "./components/pages/WhatsAppWidget";
import Footer from "./components/pages/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reservation from "./components/pages/Reservation";
import CarDetail from "./components/pages/CarDetail";
import CarsPage from "./components/pages/CarsPage";

function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showChatWidget, setShowChatWidget] = useState(false); 

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              {/* Important: add the id wrappers for scrollTo to work */}
              <div id="home"><Hero /></div>
              <BrandSlider />
              <HowItWorks />
              <div id="fleet">
                <FleetSection 
                  setSelectedCar={setSelectedCar} 
                  setShowModal={setShowModal} 
                />
              </div>
              <BookingModal 
                selectedCar={selectedCar}
                setSelectedCar={setSelectedCar}
                showModal={showModal}
                setShowModal={setShowModal}
              />
              <div id="contact"><ContactSection /></div>
              <WhatsAppWidget 
                showChatWidget={showChatWidget} 
                setShowChatWidget={setShowChatWidget} 
              />
              <Footer />
            </>
          } />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/cars" element={<CarsPage />} />
        </Routes>
        <Toaster richColors position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;