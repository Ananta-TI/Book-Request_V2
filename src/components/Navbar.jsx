import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("book_request_user") || "null");

  const isStafPerpus = user?.role === "staf_perpus";
  const isPengaju =
    user?.role === "mahasiswa" || user?.role === "staf_akademik";

  const handleLogout = () => {
    localStorage.removeItem("book_request_user");
    navigate("/login");
  };

  const navClass = (path) => {
    const active = location.pathname === path;

    return active
      ? "text-[#1c69d4] border-b-2 border-[#1c69d4]"
      : "text-[#262626] border-b-2 border-transparent hover:text-[#1c69d4]";
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e6e6e6]">
      <nav className="max-w-[1440px] mx-auto h-16 px-6 lg:px-10 flex items-center justify-between gap-6">
        <Link to="/dashboard" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-[#1c69d4] text-white flex items-center justify-center font-bold text-sm">
            BR
          </div>

          <div>
            <h1 className="text-[16px] leading-none font-bold text-[#262626]">
              Book Requests
            </h1>
            <p className="text-[12px] text-[#6b6b6b] mt-1">
              Library Request System
            </p>
          </div>
        </Link>

        <div className="hidden xl:flex items-center gap-7 text-[14px] font-normal">
          <Link to="/dashboard" className={`h-16 flex items-center transition ${navClass("/dashboard")}`}>
            Dashboard
          </Link>

          {isPengaju && (
            <>
              <Link to="/request/book" className={`h-16 flex items-center transition ${navClass("/request/book")}`}>
                Request Buku
              </Link>

              <Link to="/request/module" className={`h-16 flex items-center transition ${navClass("/request/module")}`}>
                Request Modul
              </Link>

              <Link to="/data-request" className={`h-16 flex items-center transition ${navClass("/data-request")}`}>
                Data Request
              </Link>
            </>
          )}

          <Link to="/buku-referensi" className={`h-16 flex items-center transition ${navClass("/buku-referensi")}`}>
            Buku Referensi
          </Link>

          {isStafPerpus && (
            <>
              <Link to="/admin/requests" className={`h-16 flex items-center transition ${navClass("/admin/requests")}`}>
                Kelola Request
              </Link>

              <Link to="/grafik-request" className={`h-16 flex items-center transition ${navClass("/grafik-request")}`}>
                Grafik
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:block text-right">
            <p className="text-[14px] font-bold text-[#262626]">
              {user?.name || "User"}
            </p>
            <p className="text-[12px] text-[#6b6b6b] mt-1">
              {user?.roleLabel || user?.role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="h-12 px-6 border border-[#cccccc] text-[14px] font-bold tracking-[0.5px] text-[#262626] hover:border-[#262626] transition"
          >
            LOGOUT
          </button>
        </div>
      </nav>

      <div className="xl:hidden border-t border-[#e6e6e6] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 flex gap-6 overflow-x-auto text-[14px] whitespace-nowrap">
          <Link to="/dashboard" className={`h-12 flex items-center shrink-0 ${navClass("/dashboard")}`}>
            Dashboard
          </Link>

          {isPengaju && (
            <>
              <Link to="/request/book" className={`h-12 flex items-center shrink-0 ${navClass("/request/book")}`}>
                Request Buku
              </Link>
              <Link to="/request/module" className={`h-12 flex items-center shrink-0 ${navClass("/request/module")}`}>
                Request Modul
              </Link>
              <Link to="/data-request" className={`h-12 flex items-center shrink-0 ${navClass("/data-request")}`}>
                Data Request
              </Link>
            </>
          )}

          <Link to="/buku-referensi" className={`h-12 flex items-center shrink-0 ${navClass("/buku-referensi")}`}>
            Buku Referensi
          </Link>

          {isStafPerpus && (
            <>
              <Link to="/admin/requests" className={`h-12 flex items-center shrink-0 ${navClass("/admin/requests")}`}>
                Kelola Request
              </Link>
              <Link to="/grafik-request" className={`h-12 flex items-center shrink-0 ${navClass("/grafik-request")}`}>
                Grafik
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
