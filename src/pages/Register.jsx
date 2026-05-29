import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    userCode: "",
    prodi: "TI",
    role: "mahasiswa",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const fullName = form.fullName.trim();
    const userCode = form.userCode.trim();

    const { data: existingUser } = await supabase
      .from("app_users")
      .select("id")
      .eq("user_code", userCode)
      .maybeSingle();

    if (existingUser) {
      setMessage("NIM / ID ini sudah terdaftar.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("app_users").insert({
      full_name: fullName,
      user_code: userCode,
      role: form.role,
      prodi: form.prodi.trim(),
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-white text-[#262626] grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="bg-[#1a2129] text-white px-6 lg:px-12 py-10 lg:py-16 flex flex-col justify-between">
        <div>
          <Link to="/" className="inline-flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-[#1c69d4] text-white flex items-center justify-center font-bold text-sm">BR</div>
            <div>
              <h1 className="text-[16px] font-bold leading-none">Book Requests</h1>
              <p className="text-[12px] text-[#bbbbbb] mt-1">Library Request System</p>
            </div>
          </Link>

          <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#bbbbbb] mb-5">
            Registrasi Pengguna
          </p>
          <h2 className="text-[42px] md:text-[56px] leading-[1.05] font-bold max-w-xl">
            Buat akun mahasiswa atau staf akademik.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.55] text-[#bbbbbb] font-light max-w-xl">
            Staff perpustakaan tidak tersedia di form register dan dibuat manual oleh admin. Supaya sistem tidak berubah jadi festival role palsu, sebagaimana manusia gemar mencoba.
          </p>
        </div>

        <p className="text-[13px] text-[#bbbbbb] font-light mt-12">
          Sudah punya akun? <Link to="/login" className="text-white font-bold hover:text-[#1c69d4]">Login</Link>
        </p>
      </section>

      <section className="px-6 lg:px-12 py-10 lg:py-16 flex items-center">
        <div className="w-full max-w-xl mx-auto border border-[#e6e6e6] bg-white">
          <div className="p-6 lg:p-8 border-b border-[#e6e6e6]">
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#6b6b6b] mb-4">Book Requests</p>
            <h1 className="text-[36px] leading-[1.1] font-bold">Register</h1>
            <p className="text-[16px] leading-[1.55] text-[#3c3c3c] font-light mt-4">
              Data ini dipakai untuk login berdasarkan nama dan NIM / ID.
            </p>
          </div>

          <form onSubmit={handleRegister} className="p-6 lg:p-8 space-y-6">
            {message && <div className="bg-red-50 text-[#dc2626] border border-red-200 px-4 py-3 text-[14px] font-light">{message}</div>}

            <Field label="Nama Lengkap">
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Contoh: Ananta Firdaus" required className="input-bmw" />
            </Field>

            <Field label="NIM / ID">
              <input type="text" name="userCode" value={form.userCode} onChange={handleChange} placeholder="Contoh: 2355301016" required className="input-bmw" />
            </Field>

            <Field label="Role">
              <select name="role" value={form.role} onChange={handleChange} className="input-bmw">
                <option value="mahasiswa">Mahasiswa</option>
                <option value="staf_akademik">Staf Akademik</option>
              </select>
            </Field>

            <Field label="Program Studi">
              <input type="text" name="prodi" value={form.prodi} onChange={handleChange} placeholder="Contoh: TI" className="input-bmw" />
            </Field>

            <button type="submit" disabled={loading} className="btn-primary-bmw w-full disabled:bg-[#d6d6d6] disabled:text-[#6b6b6b]">
              {loading ? "MENDAFTARKAN..." : "REGISTER"}
            </button>

            <p className="text-[14px] text-[#6b6b6b] font-light">
              Sudah punya akun? <Link to="/login" className="font-bold text-[#262626] hover:text-[#1c69d4]">Login</Link>
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

export default Register;
