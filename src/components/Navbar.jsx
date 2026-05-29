import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("book_request_user") || "null");

  const isStafPerpus = user?.role === "staf_perpus";
  const isPengaju =
    user?.role === "mahasiswa" || user?.role === "staf_akademik";

  const handleLogout = () => {
    localStorage.removeItem("book_request_user");
    navigate("/login");
  };

  const closeMenu = () => setIsOpen(false);

  const navClass = (path) => {
    const active = location.pathname === path;

    return active
      ? "text-[#1c69d4] border-b-2 border-[#1c69d4]"
      : "text-[#262626] border-b-2 border-transparent hover:text-[#1c69d4]";
  };

  const mobileNavClass = (path) => {
    const active = location.pathname === path;

    return active
      ? "text-[#1c69d4] bg-[#f0f6ff] border-l-4 border-[#1c69d4]"
      : "text-[#262626] border-l-4 border-transparent hover:bg-[#f7f7f7] hover:text-[#1c69d4]";
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e6e6e6]">
      <nav className="max-w-[1440px] mx-auto h-16 px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
        <Link to="/" className="inline-flex items-center shrink-0">
          <img
            src="/image/LogoUtama.png"
            alt="Logo Book Requests"
            className="h-8 sm:h-10 w-auto object-contain"
          />
        </Link>

        <div className="hidden xl:flex items-center gap-7 text-[14px] font-normal">
          <Link
            to="/dashboard"
            className={`h-16 flex items-center transition ${navClass("/dashboard")}`}
          >
            Dashboard
          </Link>

          {isPengaju && (
            <>
              <Link
                to="/request/book"
                className={`h-16 flex items-center transition ${navClass("/request/book")}`}
              >
                Request Buku
              </Link>

              <Link
                to="/request/module"
                className={`h-16 flex items-center transition ${navClass("/request/module")}`}
              >
                Request Modul
              </Link>

              <Link
                to="/data-request"
                className={`h-16 flex items-center transition ${navClass("/data-request")}`}
              >
                Data Request
              </Link>
            </>
          )}

          <Link
            to="/buku-referensi"
            className={`h-16 flex items-center transition ${navClass("/buku-referensi")}`}
          >
            Buku Referensi
          </Link>

          {isStafPerpus && (
            <>
              <Link
                to="/admin/requests"
                className={`h-16 flex items-center transition ${navClass("/admin/requests")}`}
              >
                Kelola Request
              </Link>

              <Link
                to="/grafik-request"
                className={`h-16 flex items-center transition ${navClass("/grafik-request")}`}
              >
                Grafik
              </Link>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          <div className="hidden lg:block text-right">
            <p className="text-[14px] font-bold text-[#262626] max-w-[180px] truncate">
              {user?.name || "User"}
            </p>
            <p className="text-[12px] text-[#6b6b6b] mt-1 max-w-[180px] truncate">
              {user?.roleLabel || user?.role}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="h-11 px-5 border border-[#cccccc] text-[13px] font-bold tracking-[0.5px] text-[#262626] hover:border-[#262626] transition"
          >
            LOGOUT
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="xl:hidden h-11 px-4 border border-[#cccccc] text-[13px] font-bold tracking-[0.5px] text-[#262626] hover:border-[#262626] transition"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {isOpen && (
        <div className="xl:hidden bg-white border-t border-[#e6e6e6]">
          <div className="px-4 sm:px-6 py-4 border-b border-[#e6e6e6] md:hidden">
            <p className="text-[14px] font-bold text-[#262626]">
              {user?.name || "User"}
            </p>
            <p className="text-[12px] text-[#6b6b6b] mt-1">
              {user?.roleLabel || user?.role}
            </p>
          </div>

          <div className="py-3 text-[14px]">
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className={`block px-4 sm:px-6 py-3 transition ${mobileNavClass("/dashboard")}`}
            >
              Dashboard
            </Link>

            {isPengaju && (
              <>
                <Link
                  to="/request/book"
                  onClick={closeMenu}
                  className={`block px-4 sm:px-6 py-3 transition ${mobileNavClass("/request/book")}`}
                >
                  Request Buku
                </Link>

                <Link
                  to="/request/module"
                  onClick={closeMenu}
                  className={`block px-4 sm:px-6 py-3 transition ${mobileNavClass("/request/module")}`}
                >
                  Request Modul
                </Link>

                <Link
                  to="/data-request"
                  onClick={closeMenu}
                  className={`block px-4 sm:px-6 py-3 transition ${mobileNavClass("/data-request")}`}
                >
                  Data Request
                </Link>
              </>
            )}

            <Link
              to="/buku-referensi"
              onClick={closeMenu}
              className={`block px-4 sm:px-6 py-3 transition ${mobileNavClass("/buku-referensi")}`}
            >
              Buku Referensi
            </Link>

            {isStafPerpus && (
              <>
                <Link
                  to="/admin/requests"
                  onClick={closeMenu}
                  className={`block px-4 sm:px-6 py-3 transition ${mobileNavClass("/admin/requests")}`}
                >
                  Kelola Request
                </Link>

                <Link
                  to="/grafik-request"
                  onClick={closeMenu}
                  className={`block px-4 sm:px-6 py-3 transition ${mobileNavClass("/grafik-request")}`}
                >
                  Grafik
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 mx-4 sm:mx-6 h-11 px-5 border border-[#cccccc] text-[13px] font-bold tracking-[0.5px] text-[#262626] hover:border-[#262626] transition md:hidden"
            >
              LOGOUT
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
