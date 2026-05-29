import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient";

const statusClass = {
  diperiksa: "bg-yellow-100 text-yellow-800",
  diterima: "bg-green-100 text-green-800",
  ditolak: "bg-red-100 text-red-800",
  dicetak: "bg-blue-100 text-blue-800",
  selesai: "bg-[#ebebeb] text-[#262626]",
};

function formatRupiah(value) {
  if (!value) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function DataRequest() {
  const user = JSON.parse(localStorage.getItem("book_request_user") || "null");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    setLoading(true);

    let query = supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (user?.role !== "staf_perpus") {
      query = query.eq("requester_id", user?.userId);
    }

    const { data, error } = await query;

    if (!error && data) setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-[#262626]">
        <PageHeader
          eyebrow="Data Request"
          title="Daftar Request"
          desc={
            user?.role === "staf_perpus"
              ? "Menampilkan semua request buku dan modul."
              : "Menampilkan request buku dan modul milik kamu."
          }
        />

        <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
          <div className="border border-[#e6e6e6] bg-white overflow-x-auto">
            {loading ? (
              <div className="p-8 text-[#6b6b6b] font-light">Memuat data...</div>
            ) : requests.length === 0 ? (
              <div className="p-8 text-[#6b6b6b] font-light">
                Belum ada data request. Isi form dulu, karena sistem ini belum sampai tahap membaca pikiran manusia.
              </div>
            ) : (
              <table className="w-full text-[14px]">
                <thead className="bg-[#f7f7f7] border-b border-[#e6e6e6]">
                  <tr className="text-left text-[#6b6b6b] uppercase tracking-[0.5px]">
                    <th className="table-head-bmw">Tanggal</th>
                    <th className="table-head-bmw">Tipe</th>
                    <th className="table-head-bmw">Judul / Modul</th>
                    <th className="table-head-bmw">Prodi</th>
                    <th className="table-head-bmw">Harga</th>
                    <th className="table-head-bmw">Lampiran</th>
                    <th className="table-head-bmw">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6e6e6]">
                  {requests.map((item) => (
                    <tr key={item.id} className="hover:bg-[#fafafa]">
                      <td className="table-cell-bmw whitespace-nowrap">{item.request_date || "-"}</td>
                      <td className="table-cell-bmw">{item.request_type === "book" ? "Buku" : "Modul"}</td>
                      <td className="table-cell-bmw min-w-[260px]">
                        <div className="font-bold text-[#262626]">{item.title}</div>
                        {item.request_type === "book" ? (
                          <div className="text-[12px] text-[#6b6b6b] mt-1 font-light">
                            {item.author || "-"} • {item.publisher || "-"} • {item.book_type || "-"}
                          </div>
                        ) : (
                          <div className="text-[12px] text-[#6b6b6b] mt-1 font-light">
                            Mata kuliah: {item.subject_name || "-"}
                          </div>
                        )}
                      </td>
                      <td className="table-cell-bmw">{item.prodi || "-"}</td>
                      <td className="table-cell-bmw">{formatRupiah(item.estimated_price)}</td>
                      <td className="table-cell-bmw">
                        {item.module_file_url ? (
                          <a href={item.module_file_url} target="_blank" rel="noreferrer" className="text-[#1c69d4] font-bold hover:text-[#0653b6]">
                            LIHAT
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="table-cell-bmw">
                        <span className={`px-3 py-1 text-[12px] font-bold uppercase ${statusClass[item.status] || "bg-[#ebebeb] text-[#262626]"}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

function PageHeader({ eyebrow, title, desc }) {
  return (
    <section className="bg-[#1a2129] text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
        <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#bbbbbb] mb-5">
          {eyebrow}
        </p>
        <h1 className="text-[42px] md:text-[56px] leading-[1.05] font-bold">{title}</h1>
        <p className="mt-5 text-[16px] leading-[1.55] text-[#bbbbbb] font-light max-w-2xl">
          {desc}
        </p>
      </div>
    </section>
  );
}

export default DataRequest;
