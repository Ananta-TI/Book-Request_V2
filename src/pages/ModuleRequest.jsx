import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient";

function ModuleRequest() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("book_request_user") || "null");

  const [form, setForm] = useState({
    requestDate: new Date().toISOString().split("T")[0],
    title: "",
    subjectName: "",
    estimatedPrice: "",
    prodi: user?.prodi || "TI",
    moduleFileUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!user) {
      setMessage("User belum login.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("requests").insert({
      requester_name: user.name,
      requester_id: user.userId,
      requester_role: user.role,
      request_type: "module",
      request_date: form.requestDate,
      title: form.title.trim(),
      subject_name: form.subjectName.trim(),
      estimated_price: form.estimatedPrice ? Number(form.estimatedPrice) : null,
      prodi: form.prodi.trim(),
      module_file_url: form.moduleFileUrl.trim() || null,
      status: "diperiksa",
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/data-request");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-[#262626]">
        <section className="bg-[#1a2129] text-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#bbbbbb] mb-5">
              Form Pengajuan
            </p>
            <h1 className="text-[42px] md:text-[56px] leading-[1.05] font-bold">
              Request Modul
            </h1>
            <p className="mt-5 text-[16px] leading-[1.55] text-[#bbbbbb] font-light max-w-2xl">
              Ajukan permintaan modul atau bahan ajar untuk kebutuhan pembelajaran.
            </p>
          </div>
        </section>

        <section className="max-w-[980px] mx-auto px-6 lg:px-10 py-12">
          <form onSubmit={handleSubmit} className="border border-[#e6e6e6] bg-white">
            {message && (
              <div className="border-b border-[#e6e6e6] bg-red-50 text-[#dc2626] px-6 py-4 text-[14px] font-light">
                {message}
              </div>
            )}

            <div className="p-6 lg:p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Nama Pengaju">
                  <input value={user?.name || ""} disabled className="input-bmw bg-[#f7f7f7] text-[#6b6b6b]" />
                </Field>
                <Field label="NIM / ID">
                  <input value={user?.userId || ""} disabled className="input-bmw bg-[#f7f7f7] text-[#6b6b6b]" />
                </Field>
                <Field label="Tanggal Request">
                  <input type="date" name="requestDate" value={form.requestDate} onChange={handleChange} required className="input-bmw" />
                </Field>
                <Field label="Program Studi">
                  <input type="text" name="prodi" value={form.prodi} onChange={handleChange} placeholder="Contoh: TI" className="input-bmw" />
                </Field>
              </div>

              <Field label="Nama Modul">
                <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Masukkan nama modul" required className="input-bmw" />
              </Field>

              <Field label="Mata Kuliah">
                <input type="text" name="subjectName" value={form.subjectName} onChange={handleChange} placeholder="Contoh: Pemrograman Web" className="input-bmw" />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Estimasi Harga Modul">
                  <input type="number" name="estimatedPrice" value={form.estimatedPrice} onChange={handleChange} placeholder="Contoh: 75000" min="0" className="input-bmw" />
                </Field>
                <Field label="Link Lampiran">
                  <input type="url" name="moduleFileUrl" value={form.moduleFileUrl} onChange={handleChange} placeholder="Link Google Drive / file modul" className="input-bmw" />
                </Field>
              </div>
            </div>

            <div className="border-t border-[#e6e6e6] px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-end gap-3">
              <button type="button" onClick={() => navigate("/dashboard")} className="btn-secondary-bmw">
                BATAL
              </button>
              <button type="submit" disabled={loading} className="btn-primary-bmw disabled:bg-[#d6d6d6] disabled:text-[#6b6b6b]">
                {loading ? "MENYIMPAN..." : "KIRIM REQUEST MODUL"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-bold tracking-[1.5px] uppercase text-[#6b6b6b] mb-3">
        {label}
      </span>
      {children}
    </label>
  );
}

export default ModuleRequest;
