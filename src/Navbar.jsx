import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  // State untuk mengontrol visibilitas menu di mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. LOGO (Selalu muncul) */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            AnasNasrulloh
          </Link>

          {/* 2. DESKTOP MENU (Hanya muncul di layar medium ke atas / md) */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
            <Link to="https://github.com/anasnasrulloh100" className="text-gray-700 hover:text-blue-600 transition" target="_blank" rel="noopener noreferrer">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">Contact</Link>
          </div>

          {/* 3. MOBILE HAMBURGER BUTTON (Hanya muncul di layar kecil / default, hilang di md) */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen} // Aksesibilitas (a11y)
          >
            {/* Ikon Hamburger atau X berganti tergantung state */}
            {isMenuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>

        {/* 4. MOBILE DROPDOWN MENU (Muncul hanya jika isMenuOpen === true DAN di layar kecil) */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Home</Link>
            <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">About</Link>
            <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;