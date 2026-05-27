/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  MessageCircle,
  Check,
  ChevronRight,
  Shirt,
  Printer,
  Layers,
  Scissors,
  Download,
  Eye,
  MapPin,
  Phone,
  Mail,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  Instagram
} from "lucide-react";

// Import local real assets generated specifically for CV. Baloeng Gedhe Indonesia
import heroForestModels from "./assets/images/hero_forest_models_1779871287571.png";
import screenPrintingSetup from "./assets/images/screen_printing_setup_1779871311128.png";
import customTacticalUniform from "./assets/images/custom_tactical_uniform_1779871332727.png";
import scoutUniform from "./assets/images/scout_uniform_1779871358964.png";
import stackedBlueShirts from "./assets/images/stacked_blue_shirts_1779871380690.png";
import navyCargoVest from "./assets/images/navy_cargo_vest_1779871397045.png";
import hijabLifestylePhoto from "./assets/images/hijab_lifestyle_photo_1779871425679.png";
import raglanNavyGrey from "./assets/images/raglan_navy_grey_1779871441429.png";

// =========================================================================
// KONFIGURASI ASSET & GAMBAR (PLACEHOLDER & LOCAL FILES)
// =========================================================================
// Silakan simpan gambar Anda di folder "public/assets/images/" atau import sesuai kebutuhan.
// Jika file offline sudah siap, Anda tinggal mengubah path URL di bawah ini ke lokasi file lokal Anda.
// Contoh: hero_grid_1: "/assets/images/hero-1.jpg"
// =========================================================================
const IMAGES = {
  // Hero Area - Grid 4 Foto Produk (Berbasis aset lokal otentik)
  hero_grid_1: heroForestModels,          // Foto model memakai kaos di hutan pinus (Baturraden vibes)
  hero_grid_2: screenPrintingSetup,        // Proses sablon manual emblem wayang di workshop
  hero_grid_3: customTacticalUniform,      // Mockup detail kemeja PDL Tactical hitam
  hero_grid_4: hijabLifestylePhoto,       // Potret model berhijab kaos hitam lokal

  // Section Tentang - Foto workshop konveksi / tim kerja
  tentang_konveksi: screenPrintingSetup,   // Foto detail proses sablon di meja workshop

  // Katalog Produk (Produk nyata yang dihasilkan CV. Baloeng Gedhe Indonesia)
  katalog_kaos: raglanNavyGrey,            // Kaos premium model raglan lengan 3/4 navy-abu
  katalog_hoodie: stackedBlueShirts,      // Tumpukan baju/hoodie pesanan instansi terlipat rapi
  katalog_polo: customTacticalUniform,     // Kemeja PDH/Tactical dengan detail saku kargo
  katalog_tote: navyCargoVest,             // Rompi kegiatan lapangan navy model saku ritsleting
  katalog_seragam: scoutUniform,           // Kemeja PDL seragam Pramuka/Komunitas maroon
  katalog_merchandise: stackedBlueShirts,  // Pesanan massal instansi nasional
};

// =========================================================================
// KONFIGURASI FILE PDF COMPANY PROFILE
// Ganti path "company-profile.pdf" jika file Anda memiliki nama yang berbeda
// =========================================================================
const COMPANY_PROFILE_PDF_URL = "/company-profile.pdf";

// =========================================================================
// KONFIGURASI LINK WHATSAPP
// Silakan sesuaikan nomor WA dan teks template default
// =========================================================================
const WHATSAPP_LINK = "https://wa.me/6288218640155";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isScrolled, setIsScrolled] = useState(false);
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);

  // Efek untuk memantau scroll kepala halaman (sticky header style)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler Scroll Halus (Smooth Scroll)
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  // Kategori & Produk Data
  const categories = ["Semua", "Kaos", "Outer", "Seragam", "Merchandise"];

  const products = [
    {
      id: "kaos-custom-raglan",
      name: "Kaos Raglan & Custom 3/4 Lengan",
      category: "Kaos",
      desc: "Kaos custom bahan Cotton Combed premium dengan model raglan elegan kombinasi warna navy-abu, jahitan rapi serta pola cutting nyaman.",
      img: IMAGES.katalog_kaos,
      badge: "Desain Sporty"
    },
    {
      id: "pdl-tactical-haira",
      name: "Kemeja PDL Tactical Premium",
      category: "Seragam",
      desc: "Kemeja dinas lapangan/PDL bahan High Twist Drill tebal dengan saku kargo depan, jahitan dobel kuat, dan bordir nama kustom presisi.",
      img: IMAGES.katalog_polo,
      badge: "Best Seller"
    },
    {
      id: "pdl-scout-zeta",
      name: "Kemeja Pramuka & Sandi Scout PDL",
      category: "Seragam",
      desc: "Seragam Pramuka / PDL taktis warna merah maroon eksklusif dengan aksen kuning, tempat badge velcro, dan jahitan dobel anti-sobek.",
      img: IMAGES.katalog_seragam,
      badge: "Edisi Khusus"
    },
    {
      id: "rompi-cargo-navy",
      name: "Rompi Lapangan & Kegiatan Cargo",
      category: "Outer",
      desc: "Rompi taktis berbahan kanvas premium atau drill dobel furing dengan saku multifungsi, ritsleting besi kokoh, sangat cocok untuk aktivitas outdoor.",
      img: IMAGES.katalog_tote,
      badge: "Desain Taktis"
    },
    {
      id: "kaos-instansi-gizi",
      name: "Kaos Polo & Seragam Instansi",
      category: "Seragam",
      desc: "Produksi kaos polo/olahraga instansi dalam jumlah massal standar nasional, seperti kaos lipat rapi dengan emblem instansi resmi.",
      img: IMAGES.katalog_hoodie,
      badge: "Skala Nasional"
    },
    {
      id: "sablon-manual-wayang",
      name: "Jasa Sablon Manual Presisi Tinggi",
      category: "Merchandise",
      desc: "Layanan sablon manual kualitas premium menggunakan tinta plastisol tahan lama dengan detail presisi tinggi bermotif etnik nusantara.",
      img: IMAGES.katalog_merchandise,
      badge: "Premium Craft"
    }
  ];

  // Filter produk berdasarkan kategori terpilih
  const filteredProducts = activeCategory === "Semua" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased scroll-smooth selection:bg-brick selection:text-white">
      
      {/* ==================== 1. STICKY NAVBAR ==================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-navy/95 text-white shadow-lg backdrop-blur-md py-4" 
            : "bg-transparent text-slate-900 xl:text-slate-900 py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo Brand */}
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, "home")}
            className="flex items-center space-x-3 text-2xl font-bold tracking-tight text-navy transition hover:opacity-90 animate-fade-in"
          >
            {/* Logo Image / SVG */}
            <svg 
              viewBox="0 0 100 100" 
              className="h-10 w-10 shrink-0 select-none shadow-sm rounded-full bg-[#E2231A]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text 
                x="20" 
                y="61" 
                fontFamily="'Poppins', sans-serif" 
                fontSize="48" 
                fontWeight="700" 
                fill="#FFFFFF" 
                letterSpacing="-4"
              >
                b
              </text>
              <text 
                x="44" 
                y="70" 
                fontFamily="'Poppins', sans-serif" 
                fontSize="48" 
                fontWeight="700" 
                fill="#FFFFFF" 
                letterSpacing="-4"
              >
                g
              </text>
            </svg>
            <div className="flex items-center space-x-1">
              <span className={`transition-colors duration-300 ${isScrolled ? "text-white" : "text-navy"}`}>
                Baloeng
              </span>
              <span className="text-brick">Gedhe</span>
            </div>
          </a>

          {/* Navigasi Desktop */}
          <nav className="hidden items-center space-x-8 md:flex">
            {[
              { label: "Home", id: "home" },
              { label: "Layanan", id: "layanan" },
              { label: "Katalog", id: "katalog" },
              { label: "Tentang", id: "tentang" },
              { label: "Company Profile", id: "profile" }
            ].map((menu) => (
              <a
                key={menu.id}
                href={`#${menu.id}`}
                onClick={(e) => scrollToSection(e, menu.id)}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 hover:text-brick group ${
                  isScrolled ? "text-slate-200" : "text-navy-light"
                }`}
              >
                {menu.label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-brick transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Tombol CTA Hubungi WA - Desktop */}
          <div className="hidden md:block">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center space-x-2 rounded-full bg-brick px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-brick-dark hover:shadow-xl active:scale-95"
            >
              <MessageCircle className="h-4.5 w-4.5 fill-current" />
              <span>Hubungi WA</span>
            </a>
          </div>

          {/* Tombol Toggle Burger Menu - Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`rounded-lg p-2 md:hidden transition ${
              isScrolled ? "text-white" : "text-navy"
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menu Navigasi Mobile (Drawer) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-100 bg-white shadow-xl md:hidden block absolute top-full left-0 right-0 max-h-screen overflow-y-auto"
            >
              <div className="space-y-2 px-6 py-6 border-b border-slate-100 bg-slate-50">
                {[
                  { label: "Home", id: "home" },
                  { label: "Layanan", id: "layanan" },
                  { label: "Katalog", id: "katalog" },
                  { label: "Tentang", id: "tentang" },
                  { label: "Company Profile", id: "profile" }
                ].map((menu) => (
                  <a
                    key={menu.id}
                    href={`#${menu.id}`}
                    onClick={(e) => scrollToSection(e, menu.id)}
                    className="block rounded-lg px-4 py-3 text-base font-semibold text-navy hover:bg-slate-100 hover:text-brick transition"
                  >
                    {menu.label}
                  </a>
                ))}
                <div className="pt-4">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex w-full items-center justify-center space-x-2 rounded-xl bg-brick px-4 py-3 text-base font-bold text-white shadow-lg shadow-brick/20 hover:bg-brick-dark active:scale-95 transition"
                  >
                    <MessageCircle className="h-5 w-5 fill-current" />
                    <span>Chat Hubungi WA</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ==================== 2. HERO SECTION ==================== */}
      <section 
        id="home" 
        className="relative overflow-hidden bg-gradient-to-b from-slate-100 to-white pt-28 pb-20 md:pt-36 md:pb-28"
      >
        {/* Ornamen Latar Belakang */}
        <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-slate-200/50 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 -z-10 h-80 w-80 rounded-full bg-brick/5 blur-3xl"></div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Teks Hero - Kolom Kiri */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-1.5 rounded-full bg-brick/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-brick uppercase">
                <Sparkles className="h-4 w-4" />
                <span>Konveksi & Sablon Premium Purwokerto</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl md:text-6xl xl:leading-[1.1]">
                Produksi Kaos & Seragam untuk <span className="text-brick">Brand & Komunitas</span>
              </h1>
              <p className="mx-auto lg:mx-0 max-w-2xl text-lg text-slate-600 sm:text-xl">
                Wujudkan pakaian berkualitas terbaik bersama <strong className="text-navy font-semibold">CV. Baloeng Gedhe Indonesia</strong>. Kami melayani jasa konveksi, sablon, bordir, dan produksi custom apparel berstandar kualitas distro dengan bahan nyaman, presisi, dan pengerjaan tepat waktu.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-auto flex items-center justify-center space-x-2.5 rounded-xl bg-brick px-8 py-4 text-base font-bold text-white shadow-lg shadow-brick/20 transition-all duration-300 hover:bg-brick-dark hover:shadow-xl hover:shadow-brick/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="h-5 w-5 fill-current" />
                  <span>Konsultasi via WhatsApp</span>
                </a>
                <a
                  href="#katalog"
                  onClick={(e) => scrollToSection(e, "katalog")}
                  className="w-full sm:w-auto flex items-center justify-center space-x-1 rounded-xl border border-slate-300 bg-white px-8 py-4 text-base font-bold text-slate-700 transition duration-300 hover:border-brick hover:text-brick hover:bg-slate-50"
                >
                  <span>Lihat Katalog</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </div>

              {/* Status Bar */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-navy">100%</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">Lokal Terpercaya</p>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-navy">5K+</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">Pakaian Dipasang</p>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-navy">99%</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">Kepuasan Pelanggan</p>
                </div>
              </div>
            </div>

            {/* Grid 4 Foto - Kolom Kanan */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              {/* Backing Card Ornaments */}
              <div className="absolute -inset-4 rounded-3xl bg-slate-100 -rotate-3 -z-10"></div>
              
              {/* Grid 4 Foto */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Foto 1 - Hero Grid */}
                <div className="group relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/5] shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-lg">
                  {/* COMMENT: Ganti URL di bawah ini di variabel IMAGES atau local file assets/images/hero_1.jpg */}
                  <img 
                    src={IMAGES.hero_grid_1} 
                    alt="Peralatan jahit sablon premium" 
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-110 contrast-[1.03] saturate-[1.05] brightness-[0.98] sepia-[0.04]"
                  />
                  {/* Elegant warm-light vintage color tone overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-brick/5 mix-blend-multiply pointer-events-none rounded-2xl"></div>
                  {/* Subtle inner card border highlight */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"></div>
                </div>

                {/* Foto 2 - Hero Grid */}
                <div className="group relative overflow-hidden rounded-2xl bg-slate-100 aspect-square shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-lg translate-y-4 animate-pulse-subtle">
                  {/* COMMENT: Ganti URL di bawah ini di variabel IMAGES atau local file assets/images/hero_2.jpg */}
                  <img 
                    src={IMAGES.hero_grid_2} 
                    alt="Proses sablon kaos custom" 
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-110 contrast-[1.03] saturate-[1.05] brightness-[0.98] sepia-[0.04]"
                  />
                  {/* Elegant warm-light vintage color tone overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-brick/5 mix-blend-multiply pointer-events-none rounded-2xl"></div>
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"></div>
                </div>

                {/* Foto 3 - Hero Grid */}
                <div className="group relative overflow-hidden rounded-2xl bg-slate-100 aspect-square shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-lg -translate-y-2">
                  {/* COMMENT: Ganti URL di bawah ini di variabel IMAGES atau local file assets/images/hero_3.jpg */}
                  <img 
                    src={IMAGES.hero_grid_3} 
                    alt="Penjahit pakaian profesional" 
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-110 contrast-[1.03] saturate-[1.05] brightness-[0.98] sepia-[0.04]"
                  />
                  {/* Elegant warm-light vintage color tone overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-brick/5 mix-blend-multiply pointer-events-none rounded-2xl"></div>
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"></div>
                </div>

                {/* Foto 4 - Hero Grid */}
                <div className="group relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/5] shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-lg translate-y-2">
                  {/* COMMENT: Ganti URL di bawah ini di variabel IMAGES atau local file assets/images/hero_4.jpg */}
                  <img 
                    src={IMAGES.hero_grid_4} 
                    alt="Pakaian selesai diproduksi" 
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-110 contrast-[1.03] saturate-[1.05] brightness-[0.98] sepia-[0.04]"
                  />
                  {/* Elegant warm-light vintage color tone overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-brick/5 mix-blend-multiply pointer-events-none rounded-2xl"></div>
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"></div>
                </div>

              </div>

              {/* Terapkan Overlay Badge */}
              <div className="absolute -bottom-6 -right-2 bg-navy text-white px-5 py-3.5 rounded-2xl shadow-xl border border-slate-700/50 flex items-center space-x-3.5">
                <div className="p-2 bg-brick rounded-xl">
                  <Shirt className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Bahan Utama</p>
                  <p className="text-sm font-bold text-white">Full Cort Cotton CVC</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3. LAYANAN KAMI ==================== */}
      <section id="layanan" className="bg-slate-50 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-brick">Layanan Profesional</h2>
            <p className="text-3xl font-extrabold text-navy sm:text-4xl tracking-tight"> Jasa Konveksi Lengkap & Kustomisasi Tanpa Batas </p>
            <div className="h-1 w-20 bg-brick mx-auto rounded-full"></div>
            <p className="text-slate-600"> Kami melayani seluruh kebutuhan produksi apparel dengan standar pengerjaan, material terbaik, dan QC ketat untuk kepuasan maksimal. </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Card 1: Produksi Kaos */}
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
              <div className="absolute top-0 left-0 h-1.5 w-0 bg-brick rounded-t-2xl transition-all duration-500 group-hover:w-full"></div>
              <div className="mb-6 inline-flex rounded-xl bg-brick/10 p-3 text-brick transition duration-300 group-hover:bg-brick group-hover:text-white">
                <Shirt className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-navy">Produksi Kaos</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pembuatan kaos custom segala macam jenis model; oblong, raglan, kerah v-neck, polo shirt dengan bahan Cotton Combed murni.
              </p>
            </div>

            {/* Card 2: Sablon Custom */}
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
              <div className="absolute top-0 left-0 h-1.5 w-0 bg-brick rounded-t-2xl transition-all duration-500 group-hover:w-full"></div>
              <div className="mb-6 inline-flex rounded-xl bg-brick/10 p-3 text-brick transition duration-300 group-hover:bg-brick group-hover:text-white">
                <Printer className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-navy">Sablon Custom</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Teknik cetak sablon bervariasi mulai dari cat Plastisol tradisional yang kuat, DTF (Direct to Transfer Film) dengan warna detail, hingga Rubber super lembut.
              </p>
            </div>

            {/* Card 3: Produksi Massal */}
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
              <div className="absolute top-0 left-0 h-1.5 w-0 bg-brick rounded-t-2xl transition-all duration-500 group-hover:w-full"></div>
              <div className="mb-6 inline-flex rounded-xl bg-brick/10 p-3 text-brick transition duration-300 group-hover:bg-brick group-hover:text-white">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-navy">Produksi Massal</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kapasitas produksi tinggi untuk pesanan berskala besar (Ratusan hingga Ribuan pcs) seperti kebutuhan seragam karyawan, merchandise event, seminar, dll.
              </p>
            </div>

            {/* Card 4: Desain Apparel */}
            <div className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
              <div className="absolute top-0 left-0 h-1.5 w-0 bg-brick rounded-t-2xl transition-all duration-500 group-hover:w-full"></div>
              <div className="mb-6 inline-flex rounded-xl bg-brick/10 p-3 text-brick transition duration-300 group-hover:bg-brick group-hover:text-white">
                <Scissors className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-navy">Desain Apparel</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Bingung soal desain? Kami memiliki tim khusus yang siap membuat visual mockup 3D, menyempurnakan file raster, dan memberi konsultasi desain gratis.
              </p>
            </div>

          </div>

          {/* Quick Note info */}
          <div className="mt-12 text-center text-sm font-medium text-slate-500 flex items-center justify-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Menerima layanan konsultasi gratis via WhatsApp setiap hari kerja (08:00 - 17:00 WIB).</span>
          </div>

        </div>
      </section>

      {/* ==================== 4. KATALOG PRODUK ==================== */}
      <section id="katalog" className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-brick">Katalog Eksklusif</h2>
            <p className="text-3xl font-extrabold text-navy sm:text-4xl tracking-tight"> Lihat Hasil Karya Terbaik Kami </p>
            <div className="h-1 w-20 bg-brick mx-auto rounded-full"></div>
            <p className="text-slate-600"> Klik kategori untuk mempermudah pencarian pakaian custom yang sesuai dengan rencana brand atau komunitas Anda. </p>
          </div>

          {/* Navigasi Filter Kategori */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide shadow-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-brick text-white shadow-md shadow-brick/20 scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Container Image */}
                  <div className="relative aspect-[4/3.3] w-full overflow-hidden bg-slate-100 border-b border-slate-200/50">
                    <span className="absolute top-3 left-3 z-10 rounded-full bg-navy/90 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                      {p.category}
                    </span>
                    <span className="absolute top-3 right-3 z-10 rounded-full bg-brick px-3 py-1 text-xs font-semibold tracking-wide text-white">
                      {p.badge}
                    </span>
                    
                    {/* COMMENT: Ganti URL di bawah ini di variabel IMAGES atau local file assets/images/ nama produk.jpg */}
                    <img
                      src={p.img}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-108 contrast-[1.02] saturate-[1.04] brightness-[0.98] sepia-[0.03]"
                    />
                    
                    {/* Warm Color Tone Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/12 via-transparent to-brick/5 mix-blend-multiply pointer-events-none"></div>
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none"></div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent opacity-0 transition duration-300 group-hover:opacity-100 flex items-end p-4">
                      <p className="text-white text-xs font-semibold">Tersedia banyak pilihan warna &amp; jenis bahan</p>
                    </div>
                  </div>

                  {/* Deskripsi Atribut */}
                  <div className="flex flex-1 flex-col p-6 space-y-2">
                    <h3 className="text-lg font-bold text-navy group-hover:text-brick transition">
                      {p.name}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">
                      {p.desc}
                    </p>
                    <div className="pt-4 border-t border-slate-200/60 mt-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">Mulai MOQ Rendah</span>
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center space-x-1 text-xs font-bold text-brick group-hover:text-brick-dark transition"
                      >
                        <span>Pesan Desain Ini</span>
                        <ChevronRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ==================== 5. TENTANG BALOENG GEDHE ==================== */}
      <section id="tentang" className="bg-slate-100 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* Bagian Kiri - Ilustrasi Gambar */}
            <div className="relative">
              {/* Dekorasi Ornamen Bingkai */}
              <div className="absolute -top-4 -left-4 h-full w-full rounded-3xl border-2 border-brick/30 -z-10 translate-x-1 translate-y-1"></div>
              
              <div className="overflow-hidden rounded-3xl bg-slate-100 shadow-xl aspect-[4/3] group relative">
                {/* COMMENT: Ganti URL di bawah ini di variabel IMAGES atau local file assets/images/tentang.jpg */}
                <img
                  src={IMAGES.tentang_konveksi}
                  alt="Konveksi Lokal Workshop Baloeng Gedhe"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105 contrast-[1.02] saturate-[1.03] brightness-[0.98] sepia-[0.03]"
                />
                {/* Warm Color Tone Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/12 via-transparent to-brick/5 mix-blend-multiply pointer-events-none rounded-3xl"></div>
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl pointer-events-none"></div>
              </div>

              {/* Tag Terapung */}
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl flex items-center space-x-4 border border-slate-100 max-w-xs">
                <div className="text-brick font-extrabold text-3xl">UMKM</div>
                <div className="border-l border-slate-300 pl-4">
                  <p className="text-xs text-slate-500 font-medium">Melestarikan industri</p>
                  <p className="text-sm font-bold text-navy">Konveksi Lokal Terbaik</p>
                </div>
              </div>
            </div>

            {/* Bagian Kanan - Teks & Poin Keunggulan */}
            <div className="space-y-6 lg:pl-4">
              <div className="space-y-2">
                <h2 className="text-xs uppercase font-extrabold tracking-widest text-brick">Profil Perusahaan</h2>
                <h3 className="text-3xl font-extrabold text-navy tracking-tight sm:text-4xl">
                  CV. Baloeng Gedhe Indonesia
                </h3>
                <div className="h-1 w-20 bg-brick rounded-full"></div>
              </div>
              
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <p>
                  <strong>CV. Baloeng Gedhe Indonesia</strong> merupakan perusahaan yang bergerak di bidang produksi pakaian seragam dan konveksi custom yang berdiri sejak tahun 2013 di Purwokerto, Jawa Tengah.
                </p>
                <p>
                  Dengan pengalaman lebih dari 10 tahun, perusahaan telah dipercaya menangani berbagai kebutuhan produksi seragam untuk instansi pemerintah, lembaga pendidikan, organisasi, komunitas, hingga kebutuhan event dan promosi.
                </p>
                <p>
                  Perusahaan berkomitmen menghadirkan produk berkualitas, pengerjaan tepat waktu, dan pelayanan profesional guna membangun kerja sama jangka panjang bersama setiap klien.
                </p>
              </div>

              {/* Visi & Misi Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h4 className="font-bold text-navy flex items-center space-x-2 text-base mb-2">
                    <span className="p-1 bg-brick/10 text-brick rounded-lg text-xs font-bold">Visi</span>
                    <span>Visi Kami</span>
                  </h4>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    Menjadi perusahaan konveksi dan produksi seragam terpercaya yang mengutamakan kualitas, profesionalisme, dan kepuasan pelanggan.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h4 className="font-bold text-navy flex items-center space-x-2 text-base mb-2">
                    <span className="p-1 bg-brick/10 text-brick rounded-lg text-xs font-bold">Misi</span>
                    <span>Misi Kami</span>
                  </h4>
                  <ul className="text-xs md:text-sm text-slate-500 leading-relaxed list-disc list-inside space-y-1">
                    <li>Menghasilkan produk kualitas terbaik.</li>
                    <li>Pelayanan profesional & komunikatif.</li>
                    <li>Menjaga ketepatan waktu produksi.</li>
                    <li>Menjalin hubungan baik jangka panjang.</li>
                  </ul>
                </div>
              </div>

              {/* Komitmen Perusahaan */}
              <div className="p-5 rounded-2xl bg-navy text-white space-y-2 shadow-md">
                <h4 className="font-bold text-brick text-sm uppercase tracking-wide">Komitmen Perusahaan</h4>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  CV. Baloeng Gedhe Indonesia siap menjadi partner terpercaya dalam memenuhi kebutuhan produksi seragam dan konveksi custom untuk perusahaan, instansi, komunitas, maupun organisasi. Kepuasan pelanggan dan kualitas produk merupakan prioritas utama dalam setiap proses produksi.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================== 6. COMPANY PROFILE PDF SECTION ==================== */}
      <section id="profile" className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="rounded-3xl bg-navy text-white p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 h-80 w-80 bg-brick/10 rounded-full blur-3xl -z-1"></div>
            <div className="absolute bottom-0 left-0 h-60 w-60 bg-white/5 rounded-full blur-2xl -z-1"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Kolom Teks Informasi */}
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-flex items-center space-x-1 border border-brick/40 text-brick bg-brick/10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Kredibilitas Bisnis</span>
                </span>
                
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                  Unduh Company Profile Baloeng Gedhe
                </h2>
                
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  Kami mengerti pentingnya legalitas dan rincian kerja sama konveksi. Di dokumen Company Profile ini, Anda dapat menemukan portofolio terlengkap kami, daftar legalitas usaha kami, opsi bahan konveksi secara detail, daftar harga, serta syarat tata cara pemesanan.
                </p>

                {/* Info File Alert */}
                <div className="p-4 bg-navy-light rounded-xl border border-slate-700/60 flex items-center space-x-3 text-xs text-slate-300">
                  <Clock className="h-5 w-5 text-brick shrink-0" />
                  <span>
                    Dokumen terbaru diperbarui untuk tahun berjalan. Anda bisa melihat preview ringkasan atau langsung mengunduh PDF resminya.
                  </span>
                </div>

                {/* Tombol Interaksi */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <button
                    onClick={() => setPdfPreviewOpen(!pdfPreviewOpen)}
                    className="cursor-pointer flex items-center justify-center space-x-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-white/25 active:scale-95"
                  >
                    <Eye className="h-4.5 w-4.5" />
                    <span>{pdfPreviewOpen ? "Tutup Preview" : "Lihat Company Profile"}</span>
                  </button>

                  {/* COMMENT: Nama file PDF dapat disesuaikan pada konstan COMPANY_PROFILE_PDF_URL di bagian atas kode */}
                  <a
                    href={COMPANY_PROFILE_PDF_URL}
                    download="balieng-gedhe-company-profile.pdf"
                    className="flex items-center justify-center space-x-2 rounded-xl bg-brick px-6 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-brick-dark shadow-md"
                  >
                    <Download className="h-4.5 w-4.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>

              {/* Kolom Preview Visual */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="relative bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden aspect-[4/3] shadow-lg flex flex-col">
                  
                  {/* Top Bar Simulated App */}
                  <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300 font-mono">
                    <span className="flex items-center space-x-2">
                      <span className="h-3 w-3 rounded-full bg-red-500 inline-block"></span>
                      <span className="h-3 w-3 rounded-full bg-yellow-500 inline-block"></span>
                      <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span>
                    </span>
                    <span className="text-[10px] md:text-xs">company-profile.pdf</span>
                    <span className="opacity-0">dummy</span>
                  </div>

                  {/* PDF Simulator / Live Preview Frame */}
                  <div className="flex-1 bg-slate-950 p-4 relative overflow-y-auto max-h-[300px]">
                    <AnimatePresence mode="wait">
                      {pdfPreviewOpen ? (
                        <motion.iframe
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          src={COMPANY_PROFILE_PDF_URL}
                          className="w-full h-full border-none rounded-lg bg-white"
                          title="Preview PDF Company Profile"
                        />
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-4 p-4"
                        >
                          <div className="p-4 bg-white/5 rounded-full text-brick">
                            <FileText className="h-10 w-10" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">Live PDF Preview</p>
                            <p className="text-xs text-slate-400 max-w-sm mt-1 mx-auto">
                              Klik tombol &ldquo;Lihat Company Profile&rdquo; untuk membuka preview berkas asli, atau langsung download dokumen melalui tombol di sebelah kiri.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ==================== 7. CTA SECTION ==================== */}
      <section className="bg-slate-100 py-16 relative overflow-hidden">
        {/* Background Decorative patterns */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full max-w-7xl bg-[radial-gradient(#B23B22_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>

        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3.5xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-5xl">
            Siap Produksi Apparel Custom?
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-slate-600">
            Dapatkan konsultasi gratis, visual mockup gratis, dan rekomendasi bahan konveksi terbaik yang ramah di kantong & memuaskan. Hubungi representatif admin kami sekarang juga.
          </p>
          
          <div className="pt-4 flex items-center justify-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center space-x-3 rounded-full bg-brick hover:bg-brick-dark px-10 py-5 text-base font-bold text-white shadow-xl shadow-brick/20 transition duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <MessageCircle className="h-6 w-6 fill-current" />
              <span>Chat WhatsApp Sekarang</span>
            </a>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Atau kirimkan desain mentah Anda untuk segera dihitung estimasi harganya secara cepat.
          </p>
        </div>
      </section>

      {/* ==================== 8. FOOTER ==================== */}
      <footer id="kontak" className="bg-navy text-white pt-16 pb-8 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Kolom 1 - Deskripsi Brand */}
          <div className="md:col-span-5 space-y-5">
            <h3 className="text-2xl font-bold tracking-tight">
              CV. Baloeng <span className="text-brick">Gedhe</span> Indonesia
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Perusahaan Konveksi & Sablon kustom berkualitas tinggi yang berbasis di Purwokerto, Jawa Tengah. Kami berkomitmen menyajikan pakaian yang dijahit rapi, bahan premium adem, dan sablon awet untuk instansi, korporasi, organisasi, serta komunitas di seluruh Indonesia.
            </p>

          </div>

          {/* Kolom 2 - Tautan Cepat */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="text-base font-bold text-white tracking-wide uppercase border-l-2 border-brick pl-3">
              Tautan Navigasi
            </h4>
            <nav className="flex flex-col space-y-3">
              {[
                { label: "Home", id: "home" },
                { label: "Layanan Kami", id: "layanan" },
                { label: "Katalog Produk", id: "katalog" },
                { label: "Tentang Kami", id: "tentang" },
                { label: "Company Profile", id: "profile" }
              ].map((menu) => (
                <a
                  key={menu.id}
                  href={`#${menu.id}`}
                  onClick={(e) => scrollToSection(e, menu.id)}
                  className="text-sm text-slate-300 hover:text-brick transition-all duration-200 flex items-center space-x-1"
                >
                  <ChevronRight className="h-3 w-3" />
                  <span>{menu.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Kolom 3 - Informasi Kontak */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="text-base font-bold text-white tracking-wide uppercase border-l-2 border-brick pl-3">
              Hubungi Kami
            </h4>
            
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brick shrink-0 mt-0.5" />
                <p>Jl. Penatusan RT.03/06 Purwokerto Wetan, Banyumas, Jawa Tengah</p>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-brick shrink-0" />
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="hover:text-brick transition-colors"
                >
                  088218640155 (WhatsApp Admin)
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brick shrink-0" />
                <a href="mailto:baloenggedheindonesia@gmail.com" className="hover:text-brick transition-colors">
                  baloenggedheindonesia@gmail.com
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Instagram className="h-5 w-5 text-brick shrink-0" />
                <a 
                  href="https://instagram.com/baloeng_gedhe_2.0" 
                  target="_blank" 
                  referrerPolicy="no-referrer" 
                  className="hover:text-brick transition-colors"
                >
                  @baloeng_gedhe_2.0
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Hak Cipta Bawah */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CV. Baloeng Gedhe Indonesia. Seluruh Hak Cipta Dilindungi.</p>
          <p className="mt-1 font-medium text-slate-500">Konveksi & produksi seragam terpercaya Purwokerto, Jawa Tengah.</p>
        </div>
      </footer>

    </div>
  );
}
