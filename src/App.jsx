import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import UserDetail from "./pages/UserDetail";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
         
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -20 }} // Masuk dari kiri, transparan
                  animate={{ opacity: 1, x: 0 }} // Ke posisi asli
                  exit={{ opacity: 0, x: 20 }} // Keluar ke kanan, transparan
                  transition={{ duration: 0.3 }}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/user/:id"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -20 }} // Masuk dari kiri, transparan
                  animate={{ opacity: 1, x: 0 }} // Ke posisi asli
                  exit={{ opacity: 0, x: 20 }} // Keluar ke kanan, transparan
                  transition={{ duration: 0.3 }}
                >
                  <UserDetail />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
export default App;
