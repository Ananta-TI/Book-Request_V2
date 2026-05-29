import Navbar from "../components/Navbar";

function MyRequests() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-[#262626]">
        <section className="bg-[#1a2129] text-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase text-[#bbbbbb] mb-5">
              Request Saya
            </p>
            <h1 className="text-[34px] sm:text-[42px] md:text-[56px] leading-[1.05] font-bold">
              Daftar Request
            </h1>
            <p className="mt-5 text-[16px] leading-[1.55] text-[#bbbbbb] font-light max-w-2xl">
              Daftar request milik user akan ditampilkan di halaman data request.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default MyRequests;
