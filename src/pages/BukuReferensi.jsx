import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient";

function formatRupiah(value) {
  if (!value) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function BukuReferensi() {
  const user = JSON.parse(localStorage.getItem("book_request_user") || "null");
  const isStafPerpus = user?.role === "staf_perpus";

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("book_references")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setBooks(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin hapus buku referensi ini?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("book_references").delete().eq("id", id);
    if (!error) setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const keyword = search.toLowerCase();
    return (
      book.title?.toLowerCase().includes(keyword) ||
      book.author?.toLowerCase().includes(keyword) ||
      book.publisher?.toLowerCase().includes(keyword) ||
      book.prodi?.toLowerCase().includes(keyword) ||
      book.book_type?.toLowerCase().includes(keyword)
    );
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-[#262626]">
        <section className="bg-[#1a2129] text-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#bbbbbb] mb-5">
                Buku Referensi
              </p>
              <h1 className="text-[42px] md:text-[56px] leading-[1.05] font-bold">
                Daftar Buku Referensi
              </h1>
              <p className="mt-5 text-[16px] leading-[1.55] text-[#bbbbbb] font-light max-w-2xl">
                Koleksi buku referensi yang tersedia di sistem perpustakaan.
              </p>
            </div>

            {isStafPerpus && (
              <Link to="/buku-referensi/tambah" className="btn-primary-bmw bg-white text-[#1a2129] hover:bg-[#f7f7f7]">
                + TAMBAH BUKU
              </Link>
            )}
          </div>
        </section>

        <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
          <div className="border border-[#e6e6e6] bg-white p-4 mb-8">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul, pengarang, penerbit, prodi..."
              className="input-bmw"
            />
          </div>

          {loading ? (
            <div className="border border-[#e6e6e6] p-8 text-[#6b6b6b] font-light">Memuat data buku...</div>
          ) : filteredBooks.length === 0 ? (
            <div className="border border-[#e6e6e6] p-8 text-[#6b6b6b] font-light">
              Belum ada buku referensi. Rak digitalnya masih kosong, tragis tapi mudah diperbaiki.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#e6e6e6] bg-white">
              {filteredBooks.map((book, index) => (
                <article
                  key={book.id}
                  className={`bg-white ${index !== 0 ? "lg:border-l border-[#e6e6e6]" : ""} ${index < filteredBooks.length - 1 ? "border-b lg:border-b-0 border-[#e6e6e6]" : ""}`}
                >
                  <div className="h-80 bg-[#fafafa] border-b border-[#e6e6e6] overflow-hidden">
                    {book.image_url ? (
                      <img
                        src={book.image_url}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/400x600/fafafa/262626?text=No+Cover";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#9a9a9a] text-[12px] uppercase tracking-[1.5px]">
                        No Cover
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[12px] font-bold tracking-[0.5px] text-[#1c69d4] uppercase">
                        {book.book_type || "Referensi"}
                      </span>
                      <span className="text-[12px] text-[#6b6b6b] uppercase">
                        {book.prodi || "-"}
                      </span>
                    </div>

                    <h2 className="text-[20px] leading-[1.3] font-bold min-h-[54px]">
                      {book.title}
                    </h2>
                    <p className="text-[14px] text-[#6b6b6b] font-light mt-4 line-clamp-1">
                      {book.author || "Pengarang tidak tersedia"}
                    </p>
                    <p className="text-[14px] text-[#6b6b6b] font-light line-clamp-1">
                      {book.publisher || "Penerbit tidak tersedia"}
                    </p>

                    <div className="mt-6 pt-5 border-t border-[#e6e6e6]">
                      <p className="text-[12px] uppercase tracking-[0.5px] text-[#6b6b6b]">Estimasi Harga</p>
                      <p className="text-[18px] font-bold mt-2">{formatRupiah(book.estimated_price)}</p>
                    </div>

                    <p className="text-[12px] text-[#9a9a9a] mt-4">Update: {book.updated_date || "-"}</p>

                    {isStafPerpus && (
                      <div className="grid grid-cols-2 gap-3 mt-6">
                        <Link to={`/buku-referensi/edit/${book.id}`} className="btn-secondary-bmw justify-center">
                          EDIT
                        </Link>
                        <button onClick={() => handleDelete(book.id)} className="h-12 px-5 border border-[#dc2626] text-[#dc2626] text-[14px] font-bold tracking-[0.5px] hover:bg-[#dc2626] hover:text-white transition">
                          HAPUS
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default BukuReferensi;
