import { Link, useNavigate } from "react-router-dom";

const services = [
  {
    title: "OPAC PCR",
    description:
      "Situs web OPAC (Online Public Access Catalog) Politeknik Caltex Riau dirancang untuk memudahkan mahasiswa, staf, dan pengunjung dalam mengakses katalog perpustakaan secara online.",
    link: "https://opac.lib.pcr.ac.id/index.php",
  },
  {
    title: "Website Resmi PCR",
    description:
      "Situs web resmi Politeknik Caltex Riau menyediakan informasi penting tentang program studi, fasilitas, prestasi, dan penerimaan mahasiswa.",
    link: "https://pcr.ac.id/",
  },
];

const steps = [
  {
    number: "01",
    title: "Ajukan Request",
    description:
      "Mahasiswa atau staf akademik mengisi formulir request buku atau modul sesuai kebutuhan pembelajaran.",
  },
  {
    number: "02",
    title: "Verifikasi Perpustakaan",
    description:
      "Staf perpustakaan memeriksa data pengajuan, memvalidasi kebutuhan, lalu memperbarui status request.",
  },
  {
    number: "03",
    title: "Pantau Status",
    description:
      "Pengguna dapat melihat perkembangan request mulai dari diperiksa, diterima, ditolak, dicetak, hingga selesai.",
  },
];

const roles = [
  {
    title: "Mahasiswa",
    description:
      "Register, login, mengajukan request buku atau modul, dan melihat status pengajuan sendiri.",
  },
  {
    title: "Staf Akademik",
    description:
      "Mengusulkan kebutuhan buku atau modul untuk mendukung proses pembelajaran.",
  },
  {
    title: "Staf Perpustakaan",
    description:
      "Mengelola semua request, mengubah status, melihat grafik, dan mengatur buku referensi.",
  },
];

const books = [
  {
    title: "Clean Code",
    image: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
  },
  {
    title: "Introduction to Algorithms",
    image: "https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg",
  },
  {
    title: "Database System Concepts",
    image: "https://covers.openlibrary.org/b/isbn/9780073523323-L.jpg",
  },
  {
    title: "Computer Networking",
    image: "https://covers.openlibrary.org/b/isbn/9780133594140-L.jpg",
  },
];

function Landing() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("book_request_user") || "null");
  const isLoggedIn = Boolean(user);

  const handleLogout = () => {
    localStorage.removeItem("book_request_user");
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-white text-[#262626] font-sans">
      <header className="sticky top-0 z-50 bg-white border-b border-[#e6e6e6]">
        <nav className="max-w-[1440px] mx-auto h-16 px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center">
            <img
              src="/image/LogoUtama.png"
              alt="Logo Book Requests"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-[14px] text-[#262626]">
            <a href="#home" className="hover:text-[#1c69d4] transition">
              Home
            </a>

            <a href="#tentang" className="hover:text-[#1c69d4] transition">
              Tentang
            </a>

            <a href="#alur" className="hover:text-[#1c69d4] transition">
              Alur
            </a>

            <a href="#layanan" className="hover:text-[#1c69d4] transition">
              Layanan
            </a>

            <a href="#koleksi" className="hover:text-[#1c69d4] transition">
              Koleksi
            </a>

            <Link
              to="/buku-referensi"
              className="hover:text-[#1c69d4] transition"
            >
              Buku Referensi
            </Link>

            {isLoggedIn && (
              <Link
                to="/dashboard"
                className="hover:text-[#1c69d4] transition"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <div className="hidden md:block text-right">
                  <p className="text-[14px] font-bold text-[#262626]">
                    {user?.name || "User"}
                  </p>
                  <p className="text-[12px] text-[#6b6b6b] mt-1">
                    {user?.roleLabel || user?.role}
                  </p>
                </div>

                <Link
                  to="/dashboard"
                  className="inline-flex h-12 items-center px-6 bg-[#1c69d4] text-white text-[14px] font-bold tracking-[0.5px] hover:bg-[#0653b6] transition"
                >
                  DASHBOARD
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden sm:inline-flex h-12 items-center px-6 border border-[#cccccc] text-[#262626] text-[14px] font-bold tracking-[0.5px] hover:border-[#262626] transition"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex h-12 items-center px-8 border border-[#cccccc] text-[14px] font-bold tracking-[0.5px] hover:border-[#262626] transition"
                >
                  LOGIN
                </Link>

                <Link
                  to="/register"
                  className="inline-flex h-12 items-center px-8 bg-[#1c69d4] text-white text-[14px] font-bold tracking-[0.5px] hover:bg-[#0653b6] transition"
                >
                  REGISTER
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <section id="home" className="bg-[#1a2129] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#bbbbbb] mb-6">
              Sistem Request Buku & Modul
            </p>

            <h2 className="text-[34px] sm:text-[42px] md:text-[56px] lg:text-[64px] leading-[1.05] font-bold max-w-3xl">
              Selamat Datang Di PCR Request
            </h2>

            <p className="mt-6 text-[16px] leading-[1.65] text-[#bbbbbb] max-w-2xl font-light">
              Permintaan buku dan modul dalam perkuliahan di Politeknik Caltex
              Riau merupakan salah satu kebutuhan mendasar yang sangat mendukung
              proses pembelajaran mahasiswa. Buku dan modul yang relevan dengan
              kurikulum tidak hanya memperkaya wawasan dan pengetahuan, tetapi
              juga menjadi panduan praktis dalam penerapan teori di lapangan.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="inline-flex h-12 items-center justify-center px-8 bg-[#1c69d4] text-white text-[14px] font-bold tracking-[0.5px] hover:bg-[#0653b6] transition"
                  >
                    MASUK DASHBOARD
                  </Link>

                  <Link
                    to="/buku-referensi"
                    className="inline-flex h-12 items-center justify-center px-8 border border-white text-white text-[14px] font-bold tracking-[0.5px] hover:bg-white hover:text-[#1a2129] transition"
                  >
                    LIHAT BUKU
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex h-12 items-center justify-center px-8 bg-[#1c69d4] text-white text-[14px] font-bold tracking-[0.5px] hover:bg-[#0653b6] transition"
                  >
                    MULAI SEKARANG
                  </Link>

                  <Link
                    to="/login"
                    className="inline-flex h-12 items-center justify-center px-8 border border-white text-white text-[14px] font-bold tracking-[0.5px] hover:bg-white hover:text-[#1a2129] transition"
                  >
                    LOGIN SISTEM
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="bg-[#262e38] p-6 lg:p-8">
            <div className="bg-white text-[#262626]">
              <div className="bg-[#fafafa] px-6 py-5 border-b border-[#e6e6e6]">
                <p className="text-[12px] tracking-[0.5px] uppercase text-[#6b6b6b]">
                  Dashboard Preview
                </p>
                <h3 className="text-[32px] leading-[1.15] font-bold mt-2">
                  PCR Request
                </h3>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#fafafa] p-5">
                    <p className="text-[14px] text-[#6b6b6b] font-light">
                      Diperiksa
                    </p>
                    <h4 className="text-[32px] font-bold mt-2">5</h4>
                  </div>

                  <div className="bg-[#fafafa] p-5">
                    <p className="text-[14px] text-[#6b6b6b] font-light">
                      Diterima
                    </p>
                    <h4 className="text-[32px] font-bold mt-2">4</h4>
                  </div>
                </div>

                <div className="divide-y divide-[#e6e6e6] border border-[#e6e6e6]">
                  {[
                    ["Request Buku", "Buku referensi perkuliahan", "DIPERIKSA"],
                    ["Request Modul", "Modul pembelajaran", "DITERIMA"],
                    ["Buku Referensi", "Koleksi buku tersedia", "TERSEDIA"],
                  ].map(([title, desc, status]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between gap-4 p-4"
                    >
                      <div>
                        <p className="text-[16px] font-bold">{title}</p>
                        <p className="text-[14px] text-[#6b6b6b] font-light mt-1">
                          {desc}
                        </p>
                      </div>

                      <span className="text-[12px] font-bold tracking-[0.5px] text-[#1c69d4]">
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#6b6b6b] mb-5">
                Tentang Sistem
              </p>

              <h3 className="text-[30px] sm:text-[36px] md:text-[48px] leading-[1.1] font-bold text-[#262626]">
                Sistem request akademik yang lebih jelas dan terdokumentasi.
              </h3>
            </div>

            <div className="flex items-end">
              <p className="text-[18px] leading-[1.65] text-[#3c3c3c] font-light">
                PCR Request membantu civitas akademika menghubungkan kebutuhan
                bahan belajar dengan layanan perpustakaan. Sistem ini membuat
                proses pengajuan buku dan modul lebih efisien, transparan, dan
                mudah dipantau oleh pengguna maupun staf perpustakaan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mt-14 border border-[#e6e6e6]">
            {[
              ["Transparan", "Status request dapat dipantau dengan jelas."],
              ["Terstruktur", "Data pengajuan tersimpan dalam satu sistem."],
              ["Efisien", "Mengurangi proses manual dan pencatatan terpisah."],
              ["Edukatif", "Mendukung akses bahan belajar yang relevan."],
            ].map(([title, desc], index) => (
              <div
                key={title}
                className={`p-6 bg-white ${
                  index !== 0 ? "md:border-l border-[#e6e6e6]" : ""
                } ${
                  index !== 3 ? "border-b md:border-b-0 border-[#e6e6e6]" : ""
                }`}
              >
                <h4 className="text-[20px] font-bold">{title}</h4>
                <p className="text-[14px] leading-[1.55] text-[#6b6b6b] font-light mt-3">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="alur" className="bg-[#f7f7f7] border-y border-[#e6e6e6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
          <div className="mb-12">
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#6b6b6b] mb-5">
              Alur Sistem
            </p>

            <h3 className="text-[30px] sm:text-[36px] md:text-[48px] leading-[1.1] font-bold text-[#262626]">
              Bagaimana PCR Request bekerja.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#e6e6e6] bg-white">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`p-6 lg:p-8 ${
                  index !== 0 ? "md:border-l border-[#e6e6e6]" : ""
                } ${
                  index !== 2 ? "border-b md:border-b-0 border-[#e6e6e6]" : ""
                }`}
              >
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#1c69d4]">
                  Step {step.number}
                </p>

                <h4 className="text-[24px] leading-[1.25] font-bold mt-6">
                  {step.title}
                </h4>

                <p className="text-[16px] leading-[1.55] text-[#3c3c3c] font-light mt-4">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="layanan" className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12">
            <div>
              <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#6b6b6b] mb-5">
                Layanan Kami
              </p>

              <h3 className="text-[30px] sm:text-[36px] md:text-[48px] leading-[1.1] font-bold">
                Layanan pendukung perpustakaan dan informasi kampus.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#e6e6e6]">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`p-6 lg:p-8 bg-white ${
                    index !== 0 ? "md:border-l border-[#e6e6e6]" : ""
                  } ${
                    index !== services.length - 1
                      ? "border-b md:border-b-0 border-[#e6e6e6]"
                      : ""
                  }`}
                >
                  <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#1c69d4]">
                    External Link
                  </p>

                  <h4 className="text-[24px] leading-[1.25] font-bold mt-6">
                    {service.title}
                  </h4>

                  <p className="text-[16px] leading-[1.55] text-[#3c3c3c] font-light mt-4">
                    {service.description}
                  </p>

                  <a
                    href={service.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex mt-8 text-[13px] font-bold tracking-[1.5px] uppercase text-[#262626] hover:text-[#1c69d4]"
                  >
                    Learn More ›
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="koleksi" className="bg-[#f7f7f7] border-y border-[#e6e6e6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#6b6b6b] mb-5">
                Referensi Akademik
              </p>

              <h3 className="text-[30px] sm:text-[36px] md:text-[48px] leading-[1.1] font-bold">
                Koleksi Buku Kami
              </h3>
            </div>

            <Link
              to="/buku-referensi"
              className="inline-flex h-12 items-center justify-center px-8 bg-[#1c69d4] text-white text-[14px] font-bold tracking-[0.5px] hover:bg-[#0653b6] transition"
            >
              LIHAT SEMUA BUKU
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#e6e6e6] bg-white">
            {books.map((book, index) => (
              <div
                key={book.title}
                className={`bg-white ${
                  index !== 0 ? "md:border-l border-[#e6e6e6]" : ""
                } ${
                  index < books.length - 1
                    ? "border-b md:border-b-0 border-[#e6e6e6]"
                    : ""
                }`}
              >
                <div className="bg-[#fafafa] h-72">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/300x450/fafafa/262626?text=Book";
                    }}
                  />
                </div>

                <div className="p-6">
                  <h4 className="text-[18px] leading-[1.4] font-bold min-h-[50px]">
                    {book.title}
                  </h4>

                  <Link
                    to="/buku-referensi"
                    className="inline-flex mt-5 text-[13px] font-bold tracking-[1.5px] uppercase text-[#262626] hover:text-[#1c69d4]"
                  >
                    Learn More ›
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
          <div className="mb-12">
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#6b6b6b] mb-5">
              Pengguna Sistem
            </p>

            <h3 className="text-[30px] sm:text-[36px] md:text-[48px] leading-[1.1] font-bold">
              Tiga role utama dalam PCR Request.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#e6e6e6]">
            {roles.map((role, index) => (
              <div
                key={role.title}
                className={`p-6 lg:p-8 bg-white ${
                  index !== 0 ? "md:border-l border-[#e6e6e6]" : ""
                } ${
                  index !== roles.length - 1
                    ? "border-b md:border-b-0 border-[#e6e6e6]"
                    : ""
                }`}
              >
                <h4 className="text-[24px] leading-[1.25] font-bold">
                  {role.title}
                </h4>

                <p className="text-[16px] leading-[1.55] text-[#3c3c3c] font-light mt-4">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1a2129] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
            <div>
              <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#bbbbbb] mb-5">
                Mulai Sekarang
              </p>

              <h3 className="text-[30px] sm:text-[36px] md:text-[48px] leading-[1.1] font-bold max-w-3xl">
                Permudah pengajuan buku dan modul dengan sistem yang lebih
                modern.
              </h3>

              <p className="text-[16px] leading-[1.55] text-[#bbbbbb] font-light mt-5 max-w-2xl">
                Gunakan PCR Request untuk membuat proses pengajuan bahan belajar
                lebih jelas, lebih cepat, dan lebih mudah dipantau.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="inline-flex h-12 items-center justify-center px-8 bg-[#1c69d4] text-white text-[14px] font-bold tracking-[0.5px] hover:bg-[#0653b6] transition"
                  >
                    MASUK DASHBOARD
                  </Link>

                  <Link
                    to="/buku-referensi"
                    className="inline-flex h-12 items-center justify-center px-8 border border-white text-white text-[14px] font-bold tracking-[0.5px] hover:bg-white hover:text-[#1a2129] transition"
                  >
                    LIHAT BUKU
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex h-12 items-center justify-center px-8 bg-[#1c69d4] text-white text-[14px] font-bold tracking-[0.5px] hover:bg-[#0653b6] transition"
                  >
                    DAFTAR SEKARANG
                  </Link>

                  <Link
                    to="/login"
                    className="inline-flex h-12 items-center justify-center px-8 border border-white text-white text-[14px] font-bold tracking-[0.5px] hover:bg-white hover:text-[#1a2129] transition"
                  >
                    MASUK SISTEM
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#f7f7f7] text-[#3c3c3c]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h4 className="text-[16px] font-bold mb-4">Book Requests</h4>
            <p className="text-[14px] leading-[1.55] font-light text-[#6b6b6b]">
              Sistem request buku dan modul untuk mendukung kebutuhan
              pembelajaran di Politeknik Caltex Riau.
            </p>
          </div>

          <div>
            <h4 className="text-[16px] font-bold mb-4">Navigasi</h4>
            <div className="space-y-3 text-[14px] font-light">
              <a href="#home" className="block hover:text-[#1c69d4]">
                Home
              </a>
              <a href="#tentang" className="block hover:text-[#1c69d4]">
                Tentang
              </a>
              <a href="#alur" className="block hover:text-[#1c69d4]">
                Alur
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[16px] font-bold mb-4">Sistem</h4>
            <div className="space-y-3 text-[14px] font-light">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block hover:text-[#1c69d4]"
                  >
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block hover:text-[#1c69d4] text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block hover:text-[#1c69d4]">
                    Login
                  </Link>

                  <Link to="/register" className="block hover:text-[#1c69d4]">
                    Register
                  </Link>
                </>
              )}

              <Link
                to="/buku-referensi"
                className="block hover:text-[#1c69d4]"
              >
                Buku Referensi
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-[16px] font-bold mb-4">Kontak</h4>
            <p className="text-[14px] leading-[1.55] font-light text-[#6b6b6b]">
              Politeknik Caltex Riau
              <br />
              Jl. Umban Sari, Rumbai
              <br />
              Pekanbaru, Riau
            </p>
          </div>
        </div>

        <div className="border-t border-[#e6e6e6]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 text-[14px] text-[#6b6b6b] font-light">
            © Book Requests - Library Request System
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Landing;