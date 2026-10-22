import { useState, useEffect } from "react";
import UserCard from "./UserCard";

function HomePage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk Pencarian
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Tampilkan 6 kartu per halaman

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users`,
        );
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const users = await response.json();
        setData(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // 1. LOGIKA PENCARIAN (Dilakukan terlebih dahulu pada semua data)
  const filteredData = data.filter((user) => {
    const term = searchTerm.toLowerCase().trim();
    const nameMatch = user.name?.toLowerCase().includes(term);
    // Gunakan optional chaining (?.) agar tidak crash jika address kosong
    const cityMatch = user.address?.city?.toLowerCase().includes(term);
    return nameMatch || cityMatch;
  });

  // 2. LOGIKA PAGINATION (Dilakukan pada data yang SUDAH difilter)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  // 3. RESET HALAMAN SAAT MENCARI
  // Jika user mengetik, kembalikan ke halaman 1 agar hasil pencarian tidak "hilang" di halaman 2
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 py-10 text-xl animate-pulse">
        Memuat data direktori...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Direktori Pengguna Global
      </h1>

      {/* INPUT PENCARIAN */}
      <input
        type="text"
        placeholder="Cari nama atau kota..."
        value={searchTerm}
        onChange={handleSearchChange} // Gunakan fungsi yang me-reset halaman
        className="px-4 py-3 border border-gray-300 rounded-lg w-full max-w-md mx-auto block mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
      />

      {/* GRID KARTU */}
      {currentItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Tidak ada pengguna yang ditemukan untuk "{searchTerm}".
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {currentItems.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              city={user.address?.city}
            />
          ))}
        </div>
      )}

      {/* KONTROL PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Sebelumnya
          </button>

          <span className="font-semibold text-gray-700">
            Halaman {currentPage} dari {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Selanjutnya →
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
