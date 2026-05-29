import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const roleConfig = {
  mahasiswa: {
    label: "Mahasiswa",
    role: "mahasiswa",
    idLabel: "NIM",
    idPlaceholder: "Contoh: 2355301016",
    description: "Masuk sebagai mahasiswa untuk mengajukan request buku atau modul.",
  },
  "staf-akademik": {
    label: "Staf Akademik",
    role: "staf_akademik",
    idLabel: "NIP / ID Staf",
    idPlaceholder: "Masukkan NIP atau ID staf",
    description: "Masuk sebagai staf akademik untuk mengajukan kebutuhan buku atau modul.",
  },
  "staf-perpus": {
    label: "Staf Perpustakaan",
    role: "staf_perpus",
    idLabel: "ID Staff Perpustakaan",
    idPlaceholder: "Masukkan ID staff",
    description: "Masuk sebagai staf perpustakaan untuk mengelola request.",
  },
};

function RoleLogin() {
  const { role } = useParams();
  const navigate = useNavigate();
  const config = roleConfig[role];
  const [form, setForm] = useState({ name: "", userId: "", prodi: "TI" });

  if (!config) return <Navigate to="/login" replace />;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "book_request_user",
      JSON.stringify({
        name: form.name.trim(),
        userId: form.userId.trim(),
        prodi: form.prodi.trim(),
        role: config.role,
        roleLabel: config.label,
      })
    );
    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen bg-white text-[#262626] grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="bg-[#1a2129] text-white px-4 sm:px-6 lg:px-12 py-10 lg:py-16 flex flex-col justify-between">
        <div>
          <Link to="/login" className="inline-flex text-[13px] font-bold tracking-[1.5px] uppercase text-[#bbbbbb] hover:text-white mb-16">
            Kembali ke login
          </Link>
          <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#bbbbbb] mb-5">
            Login {config.label}
          </p>
          <h1 className="text-[34px] sm:text-[42px] md:text-[56px] leading-[1.05] font-bold max-w-xl">
            {config.label}
          </h1>
          <p className="mt-6 text-[16px] leading-[1.55] text-[#bbbbbb] font-light max-w-xl">
            {config.description}
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-12 py-10 lg:py-16 flex items-center">
        <div className="w-full max-w-xl mx-auto border border-[#e6e6e6] bg-white">
          <div className="p-6 lg:p-8 border-b border-[#e6e6e6]">
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#6b6b6b] mb-4">Book Requests</p>
            <h2 className="text-[36px] leading-[1.1] font-bold">Masukkan Data Pengguna</h2>
          </div>

          <form onSubmit={handleLogin} className="p-6 lg:p-8 space-y-6">
            <Field label="Nama Lengkap">
              <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Contoh: Ananta Firdaus" className="input-bmw" />
            </Field>
            <Field label={config.idLabel}>
              <input type="text" name="userId" value={form.userId} onChange={handleChange} required placeholder={config.idPlaceholder} className="input-bmw" />
            </Field>
            <Field label="Program Studi">
              <input type="text" name="prodi" value={form.prodi} onChange={handleChange} placeholder="Contoh: TI" className="input-bmw" />
            </Field>
            <button type="submit" className="btn-primary-bmw w-full">MASUK KE DASHBOARD</button>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-bold tracking-[1.5px] uppercase text-[#6b6b6b] mb-3">{label}</span>
      {children}
    </label>
  );
}

export default RoleLogin;
