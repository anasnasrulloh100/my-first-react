import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

function UserDetail() {
  // "Menyadap" ID dari URL (misal: /user/1, maka id = "1")
  const { id } = useParams();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`).then((res) =>
        res.json(),
      ),
  });

  if (isLoading) {
    return <p className="text-center">Loading user data...</p>;
  }

  if (!user) {
    return (
      <p className="py-4 text-center text-red-500">
        Data pengguna tidak ditemukan.
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
