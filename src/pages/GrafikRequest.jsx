import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient";

function GrafikRequest() {
  const [stats, setStats] = useState({
    total: 0,
    book: 0,
    module: 0,
    diperiksa: 0,
    diterima: 0,
    ditolak: 0,
    dicetak: 0,
    selesai: 0,
  });

  const [byProdi, setByProdi] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const prodiMap = {};

      data.forEach((item) => {
        const key = item.prodi || "Tidak Ada";
        prodiMap[key] = (prodiMap[key] || 0) + 1;
      });

      setStats({
        total: data.length,
        book: data.filter((item) => item.request_type === "book").length,
        module: data.filter((item) => item.request_type === "module").length,
        diperiksa: data.filter((item) => item.status === "diperiksa").length,
        diterima: data.filter((item) => item.status === "diterima").length,
        ditolak: data.filter((item) => item.status === "ditolak").length,
        dicetak: data.filter((item) => item.status === "dicetak").length,
        selesai: data.filter((item) => item.status === "selesai").length,
      });

      setByProdi(Object.entries(prodiMap).map(([prodi, total]) => ({ prodi, total })));
    }

    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const maxProdi = Math.max(...byProdi.map((item) => item.total), 1);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-[#262626]">
        <section className="bg-[#1a2129] text-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#bbbbbb] mb-5">
              Grafik Request
            </p>
            <h1 className="text-[42px] md:text-[56px] leading-[1.05] font-bold">
              Monitoring Request Buku & Modul
            </h1>
            <p className="mt-5 text-[16px] leading-[1.55] text-[#bbbbbb] font-light max-w-2xl">
              Ringkasan request berdasarkan tipe, status, dan program studi.
            </p>
          </div>
        </section>

        <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
          {loading ? (
            <div className="border border-[#e6e6e6] p-8 text-[#6b6b6b] font-light">Memuat grafik...</div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 border border-[#e6e6e6] bg-white mb-10">
                {[
                  ["Total Request", stats.total],
                  ["Request Buku", stats.book],
                  ["Request Modul", stats.module],
                  ["Selesai", stats.selesai],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={`p-6 ${index !== 0 ? "md:border-l border-[#e6e6e6]" : ""} ${index !== 3 ? "border-b md:border-b-0 border-[#e6e6e6]" : ""}`}
                  >
                    <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#6b6b6b]">{label}</p>
                    <h2 className="text-[40px] leading-none font-bold mt-4">{value}</h2>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartPanel title="Status Request">
                  {[
                    ["Diperiksa", stats.diperiksa],
                    ["Diterima", stats.diterima],
                    ["Ditolak", stats.ditolak],
                    ["Dicetak", stats.dicetak],
                    ["Selesai", stats.selesai],
                  ].map(([label, value]) => (
                    <Bar key={label} label={label} value={value} max={stats.total || 1} />
                  ))}
                </ChartPanel>

                <ChartPanel title="Request per Prodi">
                  {byProdi.length === 0 ? (
                    <p className="text-[#6b6b6b] font-light">Belum ada data prodi.</p>
                  ) : (
                    byProdi.map((item) => (
                      <Bar key={item.prodi} label={item.prodi} value={item.total} max={maxProdi} />
                    ))
                  )}
                </ChartPanel>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}

function ChartPanel({ title, children }) {
  return (
    <div className="border border-[#e6e6e6] bg-white p-6 lg:p-8">
      <h2 className="text-[24px] leading-[1.25] font-bold mb-8">{title}</h2>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function Bar({ label, value, max }) {
  return (
    <div>
      <div className="flex justify-between text-[14px] mb-3">
        <span className="font-bold text-[#262626]">{label}</span>
        <span className="text-[#6b6b6b] font-light">{value}</span>
      </div>
      <div className="h-3 bg-[#ebebeb]">
        <div className="h-full bg-[#1c69d4]" style={{ width: `${max ? (value / max) * 100 : 0}%` }} />
      </div>
    </div>
  );
}

export default GrafikRequest;
