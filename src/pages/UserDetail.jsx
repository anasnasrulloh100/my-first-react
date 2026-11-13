import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

function UserDetail() {
  // "Menyadap" ID dari URL (misal: /user/1, maka id = "1")
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`).then((res) => {
        if (res.status === 404) {
          return null;
        }
        if (!res.ok) {
          throw new Error("Gagal mengambil data pengguna");
        }
        return res.json();
      }),
  });

  if (isLoading) {
    return <p className="text-center">Loading user data...</p>;
  }
  if (user === null) {
    return (
      <main className="min-h-screen bg-gray-50 p-10 flex flex-col items-center">
        <p className="py-4 text-center text-red-500">User tidak ditemukan</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ⬅️ Kembali ke Daftar
        </Link>
      </main>
    );
  }
  if (isError) {
    return (
      <p className="py-4 text-center text-red-500">
        {`Terjadi kesalahan: ${error.message}`}
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-10 flex flex-col items-center">
      <article className="border border-gray-200 px-8 py-6 rounded-xl bg-white shadow-lg max-w-md w-full mb-6 hover:shadow-xl transition-shadow">
        <h1 className="text-3xl font-bold mb-4">{user?.name}</h1>
        <p className="text-gray-600 mb-1">📧Email : {user.email}</p>
        <p className="text-gray-600 mb-1">📍City : {user.address?.city}</p>
        <p className="text-gray-600 mb-1">📞Phone : {user.phone}</p>
        <p className="text-gray-600 mb-1">🏢Company : {user.company?.name}</p>
      </article>
      {/* Tombol untuk kembali */}
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ⬅️ Kembali ke Daftar
      </Link>
    </main>
  );
}

export default UserDetail;
