import { Link } from "react-router-dom";

// Hanya menerima props, tidak ada state atau fetch di sini
function UserCard({ id, name, city }) {
  return (
    <Link to={`/user/${id}`} className="block group">
      <div className="border border-gray-300 bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:border-blue-400 transition-all duration-200">
        <h2 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
          {name}
        </h2>
        <p className="text-gray-600 mt-2">📍Kota: {city || "Tidak diketahui"}</p>
      </div>
    </Link>
  );
}

export default UserCard;