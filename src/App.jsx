import "./App.css";
import Home from "./_root/pages/Home";
import Navbar from "./_root/Navbar";
import { Routes, Route } from "react-router-dom";
import SignupForm from "./_auth/SignupForm";
import SigninForm from "./_auth/signinForm";
import WeddingCard from "./_root/pages/WeddingCard";
import HostWedding from "./_root/pages/HostWedding";

function App() {
  return (
    <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/signin" element={<SigninForm />} />
      <Route path="/wedding/:wedding_id" element={<WeddingCard />} />
      <Route path="/host-wedding" element={<HostWedding />} />
    </Routes>
  </div>
  );
}

export default App;
