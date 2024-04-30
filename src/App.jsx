import "./App.css";
import Home from "./_root/pages/Home";
import Navbar from "./_root/Navbar";
import { Routes, Route } from "react-router-dom";
import SignupForm from "./_auth/SignupForm";
import SigninForm from "./_auth/signinForm";
  import Profile from "./_root/pages/Profile";
 import HostPage from "./_root/pages/HostPage";
import HostAgriculture from "./_root/pages/HostAgriculture";
import AgricultureSessionCard from "./_root/pages/AgricultureSessionCard";
 import AgricultureHostCard from "./_root/pages/AgricultureHostCard";
import EditAgriculture from "./_root/pages/EditAgriculture"
import SetSheduleForClass from "./_root/pages/SetSheduleForClass";


function App() {
  return (
      <div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/signin" element={<SigninForm />} />
               <Route path="/agriclutre/:agriculture_id" element={<AgricultureSessionCard />} />
              <Route path="/agriclutre-host/:agriculture_id" element={<AgricultureHostCard />} />
               <Route path="/host-agriculture" element={<HostAgriculture />} />
              <Route path="/profile" element={<Profile/>}/>
               <Route path="/host" element={<HostPage/>}/>
               <Route path="/agriculture-host-edit/:agriculture_id" element={<EditAgriculture/>}/>
              <Route path="/:agriculture_id/set-schedule" element={<SetSheduleForClass/>}/>
              
          </Routes>
      </div>
  );
}

export default App;
