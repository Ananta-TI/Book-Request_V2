import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient";

function AddBook() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    estimatedPrice: "",
    requesterId: "",
    prodi: "TI",
    bookType: "Referensi",
    author: "",
    publisher: "",
    updatedDate: new Date().toISOString().split("T")[0],
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMessage("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("File harus berupa gambar.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Ukuran gambar maksimal 5 MB.");
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadCover = async () => {
    if (!imageFile) {
      return form.imageUrl.trim() || null;
    }

    const fileExt = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("book-covers")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("book-covers").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const coverUrl = await uploadCover();

      const { error } = await supabase.from("book_references").insert({
        title: form.title.trim(),
        estimated_price: form.estimatedPrice ? Number(form.estimatedPrice) : null,
        requester_id: form.requesterId.trim() || null,
        prodi: form.prodi.trim(),
        book_type: form.bookType,
        author: form.author.trim() || null,
        publisher: form.publisher.trim() || null,
        updated_date: form.updatedDate,
        image_url: coverUrl,
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate("/buku-referensi");
    } catch (error) {
      setMessage(error.message || "Gagal upload gambar.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-[#262626]">
        <section className="bg-[#1a2129] text-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#bbbbbb] mb-5">
              Buku Referensi
            </p>
            <h1 className="text-[42px] md:text-[56px] leading-[1.05] font-bold">
              Tambah Buku Referensi
            </h1>
            <p className="mt-5 text-[16px] leading-[1.55] text-[#bbbbbb] font-light max-w-2xl">
              Tambahkan data buku referensi ke sistem perpustakaan.
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
              <Field label="Judul Buku">
                <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="Masukkan judul buku" className="input-bmw" />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-start">
                <div className="bg-[#fafafa] border border-[#e6e6e6] h-[260px] flex items-center justify-center overflow-hidden">
                  {(previewUrl || form.imageUrl) ? (
                    <img
                      src={previewUrl || form.imageUrl}
                      alt="Preview cover"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/300x450/fafafa/262626?text=No+Cover";
                      }}
                    />
                  ) : (
                    <span className="text-[12px] uppercase tracking-[1.5px] text-[#9a9a9a]">No Cover</span>
                  )}
                </div>

                <div className="space-y-6">
                  <Field label="Upload Gambar Cover">
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} className="input-bmw file:mr-4 file:border-0 file:bg-[#1c69d4] file:text-white file:px-4 file:py-2 file:font-bold" />
                  </Field>

                  <Field label="URL Gambar Cover">
                    <input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Opsional kalau tidak upload gambar" className="input-bmw" />
                  </Field>

                  <p className="text-[14px] text-[#6b6b6b] font-light leading-[1.55]">
                    Jika upload gambar dipilih, sistem memakai hasil upload. Jika tidak, sistem memakai URL gambar.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Pengarang">
                  <input type="text" name="author" value={form.author} onChange={handleChange} placeholder="Nama pengarang" className="input-bmw" />
                </Field>
                <Field label="Penerbit">
                  <input type="text" name="publisher" value={form.publisher} onChange={handleChange} placeholder="Nama penerbit" className="input-bmw" />
                </Field>
                <Field label="Estimasi Harga">
                  <input type="number" name="estimatedPrice" value={form.estimatedPrice} onChange={handleChange} min="0" placeholder="Contoh: 150000" className="input-bmw" />
                </Field>
                <Field label="NIM / ID Pengaju">
                  <input type="text" name="requesterId" value={form.requesterId} onChange={handleChange} placeholder="Opsional" className="input-bmw" />
                </Field>
                <Field label="Prodi">
                  <input type="text" name="prodi" value={form.prodi} onChange={handleChange} placeholder="Contoh: TI" className="input-bmw" />
                </Field>
                <Field label="Jenis Buku">
                  <select name="bookType" value={form.bookType} onChange={handleChange} className="input-bmw">
                    <option value="Referensi">Referensi</option>
                    <option value="Hobby">Hobby</option>
                  </select>
                </Field>
                <Field label="Tanggal Diperbarui">
                  <input type="date" name="updatedDate" value={form.updatedDate} onChange={handleChange} className="input-bmw" />
                </Field>
              </div>
            </div>

            <div className="border-t border-[#e6e6e6] px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-end gap-3">
              <button type="button" onClick={() => navigate("/buku-referensi")} className="btn-secondary-bmw">
                BATAL
              </button>
              <button type="submit" disabled={loading} className="btn-primary-bmw disabled:bg-[#d6d6d6] disabled:text-[#6b6b6b]">
                {loading ? "MENYIMPAN..." : "SIMPAN BUKU"}
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

export default AddBook;
