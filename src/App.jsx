
import { Routes, Route} from "react-router-dom";
import UserDetail from "./pages/UserDetail";
import UserCard from "./pages/UserCard";
import Navbar from "./components/Navbar";



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserCard />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );  
}
  

export default App;
