import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function UserDetail() {
  // "Menyadap" ID dari URL (misal: /user/1, maka id = "1")
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users/${id}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading user data...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
      <article className="border border-gray-200 px-6 py-4 rounded-xl m-3 bg-white shadow-sm hover:shadow-md transition-shadow align-middle">
        <h1 className="text-3xl font-bold mb-4">{user?.name}</h1>
        <p className="text-gray-600 mb-1">Email : {user.email}</p>
        <p className="text-gray-600 mb-1">City : {user.address?.city}</p>
        <p className="text-gray-600 mb-1">Phone : {user.phone}</p>
        <p className="text-gray-600 mb-1">Company : {user.company?.name}</p>
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
