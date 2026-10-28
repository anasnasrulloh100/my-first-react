import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import UserCard from "./UserCard";

function Home() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_BASE_URL}/users`).then((res) => {
        if (!res.ok) {
          throw new Error("Gagal mengambil data pengguna");
        }
        return res.json();
      }),
  });

  // State untuk Pencarian
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Tampilkan 6 kartu per halaman

  // 1. LOGIKA PENCARIAN (Dilakukan terlebih dahulu pada semua data)
  const filteredData = users.filter((user) => {
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 }, // Mulai dari transparan dan 20px di bawah
    visible: {
      opacity: 1,
      y: 0, // Bergerak ke posisi asli
      transition: { type: "spring", stiffness: 100, damping: 15 }, // Efek membal (spring) yang halus
    },
  };
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
        <motion.div
          key={currentPage} // Tambahkan key untuk memaksa re-render saat halaman berubah
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {currentItems.map((user) => (
            <motion.div key={user.id} variants={itemVariants}>
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                city={user.address?.city}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* KONTROL PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.04 }} // Membesar 5% saat di-hover
            whileTap={{ scale: 0.95 }} // Mengecil 5% saat diklik (efek tekan)
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-400 hover:bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} text-white border border-gray-300 rounded-lg text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
          >
            ← Sebelumnya
          </motion.button>

          <span className="font-semibold text-gray-700">
            Halaman {currentPage} dari {totalPages}
          </span>

          <motion.button
            whileHover={{ scale: 1.04 }} // Membesar 5% saat di-hover
            whileTap={{ scale: 0.95 }} // Mengecil 5% saat diklik (efek tekan)
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm`}
          >
            Selanjutnya →
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default Home;
