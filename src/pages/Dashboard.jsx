import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient";

const statItems = [
  ["diperiksa", "Diperiksa"],
  ["diterima", "Diterima"],
  ["ditolak", "Ditolak"],
  ["selesai", "Selesai"],
];

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("book_request_user") || "null");

  const [stats, setStats] = useState({
    total: 0,
    diperiksa: 0,
    diterima: 0,
    ditolak: 0,
    selesai: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("requests")
        .select("status, requester_id");

      if (error || !data) return;

      const filteredData =
        user.role === "staf_perpus"
          ? data
          : data.filter((item) => item.requester_id === user.userId);

      setStats({
        total: filteredData.length,
        diperiksa: filteredData.filter((item) => item.status === "diperiksa").length,
        diterima: filteredData.filter((item) => item.status === "diterima").length,
        ditolak: filteredData.filter((item) => item.status === "ditolak").length,
        selesai: filteredData.filter((item) => item.status === "selesai").length,
      });
    };

    loadStats();
  }, []);

  const isStafPerpus = user?.role === "staf_perpus";

  const actions = isStafPerpus
    ? [
        {
          title: "Kelola Request",
          desc: "Lihat semua request buku dan modul, lalu ubah status pengajuan.",
          to: "/admin/requests",
          cta: "KELOLA REQUEST",
        },
        {
          title: "Grafik Request",
          desc: "Pantau ringkasan request berdasarkan status, tipe, dan program studi.",
          to: "/grafik-request",
          cta: "LIHAT GRAFIK",
        },
        {
          title: "Buku Referensi",
          desc: "Kelola koleksi buku referensi yang ditampilkan pada sistem.",
          to: "/buku-referensi",
          cta: "BUKA KOLEKSI",
        },
      ]
    : [
        {
          title: "Request Buku",
          desc: "Ajukan permintaan buku baru untuk kebutuhan pembelajaran.",
          to: "/request/book",
          cta: "AJUKAN BUKU",
        },
        {
          title: "Request Modul",
          desc: "Ajukan permintaan modul atau bahan ajar tambahan.",
          to: "/request/module",
          cta: "AJUKAN MODUL",
        },
        {
          title: "Data Request",
          desc: "Lihat daftar request yang sudah kamu ajukan beserta statusnya.",
          to: "/data-request",
          cta: "LIHAT DATA",
        },
      ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white text-[#262626]">
        <section className="bg-[#1a2129] text-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
            <div>
              <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#bbbbbb] mb-5">
                Dashboard
              </p>
              <h1 className="text-[42px] md:text-[56px] lg:text-[64px] leading-[1.05] font-bold">
                Selamat datang, {user?.name || "User"}
              </h1>
              <p className="mt-5 text-[16px] leading-[1.55] text-[#bbbbbb] font-light">
                {user?.roleLabel || user?.role} • {user?.userId} • {user?.prodi || "-"}
              </p>
            </div>

            <div className="bg-[#262e38] p-6 border border-[#262e38]">
              <p className="text-[13px] tracking-[1.5px] uppercase text-[#bbbbbb] font-bold">
                Total Request
              </p>
              <h2 className="text-[64px] leading-none font-bold mt-4">
                {stats.total}
              </h2>
            </div>
          </div>
        </section>

        <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 border border-[#e6e6e6]">
            {statItems.map(([key, label], index) => (
              <div
                key={key}
                className={`p-6 bg-white ${
                  index !== 0 ? "md:border-l border-[#e6e6e6]" : ""
                } ${index !== statItems.length - 1 ? "border-b md:border-b-0 border-[#e6e6e6]" : ""}`}
              >
                <p className="text-[13px] tracking-[1.5px] uppercase text-[#6b6b6b] font-bold">
                  {label}
                </p>
                <h3 className="text-[40px] leading-none font-bold mt-4 text-[#262626]">
                  {stats[key]}
                </h3>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-20">
          <div className="mb-10">
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#6b6b6b] mb-4">
              Akses Cepat
            </p>
            <h2 className="text-[36px] md:text-[48px] leading-[1.1] font-bold">
              Pilih pekerjaan yang ingin dilakukan.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#e6e6e6] bg-white">
            {actions.map((item, index) => (
              <Link
                key={item.title}
                to={item.to}
                className={`group p-8 bg-white hover:bg-[#fafafa] transition ${
                  index !== 0 ? "md:border-l border-[#e6e6e6]" : ""
                } ${index !== actions.length - 1 ? "border-b md:border-b-0 border-[#e6e6e6]" : ""}`}
              >
                <h3 className="text-[24px] leading-[1.25] font-bold">
                  {item.title}
                </h3>
                <p className="text-[16px] leading-[1.55] text-[#3c3c3c] font-light mt-4 min-h-[76px]">
                  {item.desc}
                </p>
                <span className="inline-flex mt-8 text-[13px] font-bold tracking-[1.5px] uppercase text-[#262626] group-hover:text-[#1c69d4]">
                  {item.cta} ›
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
