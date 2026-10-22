
import { Routes, Route} from "react-router-dom";
import UserDetail from "./pages/UserDetail";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );  
}
  

export default App;
