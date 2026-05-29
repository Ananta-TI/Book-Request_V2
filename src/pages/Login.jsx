import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", userCode: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const roleLabel = {
    mahasiswa: "Mahasiswa",
    staf_akademik: "Staf Akademik",
    staf_perpus: "Staf Perpustakaan",
  };

  const normalize = (value) => value.trim().toLowerCase().replace(/\s+/g, " ");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const userCode = form.userCode.trim();
    const { data: user, error } = await supabase
      .from("app_users")
      .select("*")
      .eq("user_code", userCode)
      .maybeSingle();

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (!user) {
      setMessage("Akun tidak ditemukan. Periksa kembali NIM / ID.");
      setLoading(false);
      return;
    }

    if (normalize(user.full_name) !== normalize(form.fullName)) {
      setMessage("Nama tidak cocok dengan NIM / ID yang terdaftar.");
      setLoading(false);
      return;
    }

    localStorage.setItem(
      "book_request_user",
      JSON.stringify({
        id: user.id,
        name: user.full_name,
        userId: user.user_code,
        role: user.role,
        roleLabel: roleLabel[user.role] || user.role,
        prodi: user.prodi,
      })
    );

    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen bg-white text-[#262626] grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="bg-[#1a2129] text-white px-6 lg:px-12 py-10 lg:py-16 flex flex-col justify-between">
        <div>
          <Link to="/" className="inline-flex  gap-1 ">
  <img
    src="/image/LogoUtama.png"
    alt="Logo Book Requests"
    className="h-14 w-auto "
  />

</Link>

          <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#bbbbbb] mb-5">
            Login Sistem
          </p>
          <h2 className="text-[42px] md:text-[56px] leading-[1.05] font-bold max-w-xl">
            Masuk dengan nama dan NIM / ID.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.55] text-[#bbbbbb] font-light max-w-xl">
            Role pengguna otomatis diambil dari database, jadi mahasiswa tidak bisa pura-pura menjadi staf perpustakaan. Akhirnya logika bekerja, kejutan kecil dari dunia software.
          </p>
          <br />
  <Link
    to="/"
    className="inline-flex h-12 items-center px-6 border border-white/40 text-white text-[13px] font-bold tracking-[1.5px] uppercase hover:bg-white hover:text-[#1a2129] transition"
  >
    ← Kembali ke Home
  </Link>
        </div>

        <p className="text-[13px] text-[#bbbbbb] font-light mt-12">
          Belum punya akun? <Link to="/register" className="text-white font-bold hover:text-[#1c69d4]">Register</Link>
        </p>
      </section>

      <section className="px-6 lg:px-12 py-10 lg:py-16 flex items-center">
        <div className="w-full max-w-xl mx-auto border border-[#e6e6e6] bg-white">
          <div className="p-6 lg:p-8 border-b border-[#e6e6e6]">
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#6b6b6b] mb-4">Book Requests</p>
            <h1 className="text-[36px] leading-[1.1] font-bold">Login</h1>
            <p className="text-[16px] leading-[1.55] text-[#3c3c3c] font-light mt-4">
              Masukkan nama lengkap dan NIM / ID yang sudah terdaftar.
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-6 lg:p-8 space-y-6">
            {message && <div className="bg-red-50 text-[#dc2626] border border-red-200 px-4 py-3 text-[14px] font-light">{message}</div>}

            <Field label="Nama Lengkap">
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Contoh: Ananta Firdaus" required className="input-bmw" />
            </Field>

            <Field label="NIM / ID">
              <input type="text" name="userCode" value={form.userCode} onChange={handleChange} placeholder="Contoh: 2355301016" required className="input-bmw" />
            </Field>

            <button type="submit" disabled={loading} className="btn-primary-bmw w-full disabled:bg-[#d6d6d6] disabled:text-[#6b6b6b]">
              {loading ? "MEMERIKSA AKUN..." : "LOGIN"}
            </button>

            <p className="text-[14px] text-[#6b6b6b] font-light">
              Belum punya akun? <Link to="/register" className="font-bold text-[#262626] hover:text-[#1c69d4]">Daftar</Link>
            </p>
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

export default Login;
