import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserDetail from "./UserDetail";
import Navbar from "./Navbar";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";

function JobCard({ id, name, address }) {
  //const [isSaved, setIsSaved] = useState(false);
  //const clickHandler = () => {
  //  setIsSaved(!isSaved);
  //};
  const { city } = address;
  return (
    <div
      data-id={id}
      className="border border-gray-200 p-5 rounded-xl m-3 bg-white shadow-sm hover:shadow-md transition-shadow align-middle"
    >
      <h2 className="font-bold text-lg">{name}</h2>
      <p>City: {city}</p>
      {/*<button
        onClick={clickHandler}
        className={`px-4 py-2 rounded-md transition-colors ${
          isSaved
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        {isSaved ? "✅ Tersimpan" : "🔖 Simpan"}
      </button> */}
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const users = await response.json();
        setData(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.city.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <Navbar />
      {/* Peta Rute (Routes) */}
      <main className="p-4 md:p-10 max-w-6xl mx-auto">
        <Routes>
          {/* Halaman Utama (Home) */}
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                  Direktori Pengguna
                </h1>
                <input
                  type="text"
                  placeholder="Cari nama atau kota..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="mb-6 p-3 border rounded-lg w-full max-w-md mx-auto block"
                />

                {filteredData.length === 0 && searchTerm !== "" ? (
                  <p className="col-span-full text-center text-gray-500">
                    Data tidak ditemukan
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((user) => (
                      // GANTI JobCard dengan Link yang membungkusnya, atau modifikasi JobCard (lihat Langkah 4)
                      <Link
                        to={`/user/${user.id}`}
                        key={user.id}
                        className="block"
                      >
                        <JobCard
                          id={user.id}
                          name={user.name}
                          address={user.address}
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            }
          />

          {/* Halaman Detail */}
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
