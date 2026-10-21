import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserCard() {
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users`,
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const users = await response.json();
        setData(users);
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsloading(false);
      }
    };
    fetchData();
  }, []);

  if (isloading) {
    return <p className="text-center text-gray-500 py-4">Loading...</p>;
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
    <div>
      <h1 className="mt-4 text-3xl font-bold text-center mb-8 text-gray-800">
        Direktori Pengguna
      </h1>
      <input
        type="text"
        placeholder="Cari nama atau kota..."
        value={searchTerm}
        onChange={handleSearch}
        className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md mx-auto block mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {filteredData.length === 0 || searchTerm !== "" ? (
        <p className="text-center text-gray-500">
          Tidak ada pengguna yang ditemukan.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          {filteredData.map((user) => (
            <Link to={`/user/${user.id}`} className="block" key={user.id}>
              <div className="border border-gray-300 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="font-bold text-lg">{user.name}</h2>
                <p>City: {user.address.city}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      ;
    </div>
  );
}

export default UserCard;
