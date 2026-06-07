/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "./lib/supabase";
import {
  Menu,
  X,
  MessageCircle,
  Check,
  ChevronRight,
  ChevronLeft,
  Shirt,
  Printer,
  Layers,
  Scissors,
  Download,
  Eye,
  MapPin,
  Map,
  ExternalLink,
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
import customTacticalUniform from "./assets/images/clean_tactical_uniform_1780817605266.png";
import scoutUniform from "./assets/images/scout_uniform_1779871358964.png";
import stackedBlueShirts from "./assets/images/stacked_blue_shirts_1779871380690.png";
import navyCargoVest from "./assets/images/navy_cargo_vest_1779871397045.png";
import hijabLifestylePhoto from "./assets/images/hijab_lifestyle_photo_1779871425679.png";
import raglanNavyGrey from "./assets/images/raglan_navy_grey_1779871441429.png";

// Import plain and professional product images (100% no logos or emblems)
import plainKaosCombed from "./assets/images/kaos_polos_combed_1780476586912.png";
import plainKaosRaglan from "./assets/images/kaos_raglan_polos_1780476604048.png";
import plainPdlPanjang from "./assets/images/pdl_polos_panjang_1780476620252.png";
import plainPdhPendek from "./assets/images/pdh_polos_pendek_1780476641023.png";
import plainRompiLapangan from "./assets/images/rompi_lapangan_polos_1780476660513.png";
import plainJaketBomber from "./assets/images/jaket_bomber_polos_1780476675787.png";
import plainPoloShirt from "./assets/images/polo_shirt_polos_1780476692780.png";

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
// =========================================================================
// KONFIGURASI LINK WHATSAPP
// Silakan sesuaikan nomor WA dan teks template default
// =========================================================================
const WHATSAPP_LINK = "https://wa.me/6288218640155";

// =========================================================================
// KONFIGURASI LINK GOOGLE MAPS & MAPS EMBED
// =========================================================================
const GOOGLE_MAPS_URL = "https://share.google/p4cRBcvCt0qEsuvto";
const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.257613583489!2d109.244318!3d-7.4258908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655c39fd1af3df%3A0xebecdeb27891be52!2sJl.%20Penatusan%2C%20Purwokerto%20Wetan%2C%20Kec.%20Purwokerto%20Tim.%2C%20Kabupaten%20Banyumas%2C%20Jawa%20Tengah%2053111!5e0!3m2!1sid!2sid!4v1717320000000!5m2!1sid!2sid";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isScrolled, setIsScrolled] = useState(false);
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);

  // State untuk mengontrol filter tone warna & ukuran foto secara dinamis sesuai request user secara interaktif
  const [imageTone, setImageTone] = useState<"vintage" | "distro" | "clean" | "raw">("vintage");
  const [imageRatio, setImageRatio] = useState<"portrait" | "square" | "standard">("portrait");

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
  const categories = ["Semua", "Kaos", "Outer", "Seragam"];

  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const COMPANY_PROFILE_PDF_URL = companyProfile?.company_profile_pdf;
  console.log(companyProfile?.company_profile_pdf);

  useEffect(() => {
    getProducts();
    loadCompanyProfile();
  }, []);

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        console.error("Error fetching products from Supabase:", error);
      } else if (data && data.length > 0) {
        setProducts(data);
      } else {
        // Fallback to local products so the UI remains polished and doesn't break if table/db is fresh/empty
        setProducts([
          {
            id: "kaos-polos-combed",
            name: "Kaos Polos Cotton Combed 30s",
            category: "Kaos",
            desc: "Kaos polos lengan pendek premium berbahan 100% Cotton Combed 30s super halus dan nyaman. Polos tanpa gambar/sablon, dijahit rantai rapi berstandar premium.",
            image_url: plainKaosCombed,
            badge: "Cotton Combed"
          },
          {
            id: "kaos-raglan-polos",
            name: "Kaos Raglan Polos Premium",
            category: "Kaos",
            desc: "Kaos raglan lengan 3/4 dengan perpaduan warna netral yang minimalis. Full polos tanpa sablon maupun sablon brand, memberikan kesan santai tapi rapi.",
            image_url: plainKaosRaglan,
            badge: "Raglan Polos"
          },
          {
            id: "polo-shirt-polos",
            name: "Polo Shirt Polos Klasik",
            category: "Kaos",
            desc: "Polo shirt polo berkerah dengan material katun pique berpori halus. Tanpa logo bordir di dada dan polos, sangat pas untuk seragam semi-formal modern.",
            image_url: plainPoloShirt,
            badge: "Polo"
          },
          {
            id: "pdl-polos-panjang",
            name: "Kemeja PDL Polos Lengan Panjang",
            category: "Seragam",
            desc: "Kemeja PDL (Pakaian Dinas Lapangan) polos bernuansa khaki tanpa emblem, nama, atau patch velcro. Dilengkapi dua saku kargo depan minimalis dengan kancing kokoh.",
            image_url: plainPdlPanjang,
            badge: "PDL"
          },
          {
            id: "pdh-polos-pendek",
            name: "Kemeja PDH Polos Lengan Pendek",
            category: "Seragam",
            desc: "Kemeja PDH (Pakaian Dinas Harian) premium berwarna navy blue polos tanpa bordir instansi atau tanda pangkat. Serat kain halus, adem, dan rapi sepanjang hari.",
            image_url: plainPdhPendek,
            badge: "PDH Kantor"
          },
          {
            id: "rompi-lapangan-polos",
            name: "Rompi Lapangan Cargo Polos",
            category: "Outer",
            desc: "Rompi taktis/kegiatan lapangan berwarna navy blue polos dengan banyak saku cargo fungsional. Bebas dari logo atau identitas organisasi apa pun.",
            image_url: plainRompiLapangan,
            badge: "Rompi Cargo"
          }
        ]);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  }

  async function loadCompanyProfile() {
    try {
      const { data, error } = await supabase
        .from("company_profile")
        .select("*")
        .maybeSingle();

      if (error) {
        console.error("Error fetching company_profile from Supabase:", error);
      } else if (data) {
        setCompanyProfile(data);
      }
    } catch (err) {
      console.error("Failed to load company profile from Supabase:", err);
    }
  }

  // Filter produk berdasarkan kategori terpilih
  const filteredProducts = activeCategory === "Semua" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased scroll-smooth selection:bg-brick selection:text-white overflow-x-hidden">
      
      {/* ==================== 1. STICKY NAVBAR ==================== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo + Brand */}
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className="flex items-center gap-3 group shrink-0"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-red-600 shadow-lg shadow-red-500/20 transition-all duration-300 group-hover:scale-105 border border-red-500/25 flex items-center justify-center">
                <img
                  src={companyProfile?.logo_url || "https://kqejmeecpnqyltfkpefr.supabase.co/storage/v1/object/public/pdf/Company%20Profile%20Baloeng%20Gedhe.pdf"}
                  alt="Baloeng Gedhe Indonesia"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                />
              </div>

              <div>
                <h1 className="text-base sm:text-xl lg:text-3xl font-bold text-slate-900">
                  Baloeng Gedhe Indonesia
                </h1>
                <p className="hidden sm:block text-sm text-slate-500">
                  Konveksi & Sablon Premium
                </p>
              </div>
            </a>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-3 whitespace-nowrap">
              {[
                { label: "Home", href: "home" },
                { label: "Layanan", href: "layanan" },
                { label: "Katalog", href: "katalog" },
                { label: "Tentang", href: "tentang" },
                { label: "Company Profile", href: "company-profile" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={`#${item.href}`}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="
                    px-5
                    py-3
                    rounded-xl
                    text-base
                    font-semibold
                    text-slate-700
                    transition-all
                    duration-300
                    hover:bg-red-50
                    hover:text-red-600
                    hover:-translate-y-0.5
                  "
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Tombol Toggle Burger Menu - Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 md:hidden transition text-navy ml-auto"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
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
                  { label: "Company Profile", id: "company-profile" }
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Teks Hero - Kolom Kiri */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-1.5 rounded-full bg-brick/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-brick uppercase">
                <Sparkles className="h-4 w-4" />
                <span>Konveksi & Sablon Premium Purwokerto</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-navy tracking-tight">
                Produksi Kaos & Seragam untuk <span className="text-brick font-extrabold">Brand & Komunitas</span>
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
            <div className="relative mt-6 lg:mt-0">
              {/* Backing Card Ornaments */}
              <div className="absolute -inset-4 rounded-3xl bg-slate-100 -rotate-3 -z-10"></div>
              
              {/* Grid 4 Foto */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Foto 1 - Hero Grid */}
                <div className={`group relative overflow-hidden rounded-2xl bg-slate-100 shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-lg ${
                  imageRatio === "portrait" ? "aspect-[4/5]" : imageRatio === "square" ? "aspect-square" : "aspect-[4/4.5]"
                }`}>
                  {/* COMMENT: Ganti URL di bawah ini di variabel IMAGES atau local file assets/images/hero_1.jpg */}
                  <img 
                    src={IMAGES.hero_grid_1} 
                    alt="Peralatan jahit sablon premium" 
                    referrerPolicy="no-referrer"
                    className={`h-full w-full object-cover object-center transition duration-500 group-hover:scale-110 ${
                      imageTone === "vintage" 
                        ? "contrast-[1.03] saturate-[1.05] brightness-[0.98] sepia-[0.04]"
                        : imageTone === "distro"
                        ? "contrast-[1.10] saturate-[1.15] brightness-[0.94] hue-rotate-[1deg]"
                        : imageTone === "clean"
                        ? "contrast-[1.02] saturate-[1.02] brightness-[1.02]"
                        : "" // raw
                    }`}
                  />
                  {imageTone === "vintage" && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-[#B23B22]/5 mix-blend-multiply pointer-events-none rounded-2xl"></div>
                  )}
                  {imageTone === "distro" && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/25 via-transparent to-navy/15 mix-blend-overlay pointer-events-none rounded-2xl"></div>
                  )}
                  {imageTone === "clean" && (
                    <div className="absolute inset-0 bg-white/5 pointer-events-none rounded-2xl"></div>
                  )}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"></div>
                </div>

                {/* Foto 2 - Hero Grid */}
                <div className={`group relative overflow-hidden rounded-2xl bg-slate-100 shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-lg translate-y-4 ${
                  imageRatio === "portrait" ? "aspect-square" : imageRatio === "square" ? "aspect-[4/5]" : "aspect-square"
                }`}>
                  {/* COMMENT: Ganti URL di bawah ini di variabel IMAGES atau local file assets/images/hero_2.jpg */}
                  <img 
                    src={IMAGES.hero_grid_2} 
                    alt="Proses sablon kaos custom" 
                    referrerPolicy="no-referrer"
                    className={`h-full w-full object-cover object-center transition duration-500 group-hover:scale-110 ${
                      imageTone === "vintage" 
                        ? "contrast-[1.03] saturate-[1.05] brightness-[0.98] sepia-[0.04]"
                        : imageTone === "distro"
                        ? "contrast-[1.10] saturate-[1.15] brightness-[0.94] hue-rotate-[1deg]"
                        : imageTone === "clean"
                        ? "contrast-[1.02] saturate-[1.02] brightness-[1.02]"
                        : "" // raw
                    }`}
                  />
                  {imageTone === "vintage" && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-[#B23B22]/5 mix-blend-multiply pointer-events-none rounded-2xl"></div>
                  )}
                  {imageTone === "distro" && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/25 via-transparent to-navy/15 mix-blend-overlay pointer-events-none rounded-2xl"></div>
                  )}
                  {imageTone === "clean" && (
                    <div className="absolute inset-0 bg-white/5 pointer-events-none rounded-2xl"></div>
                  )}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"></div>
                </div>

                {/* Foto 3 - Hero Grid */}
                <div className={`group relative overflow-hidden rounded-2xl bg-slate-100 shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-lg -translate-y-2 ${
                  imageRatio === "portrait" ? "aspect-square" : imageRatio === "square" ? "aspect-[4/5]" : "aspect-square"
                }`}>
                  {/* COMMENT: Ganti URL di bawah ini di variabel IMAGES atau local file assets/images/hero_3.jpg */}
                  <img 
                    src={IMAGES.hero_grid_3} 
                    alt="Penjahit pakaian profesional" 
                    referrerPolicy="no-referrer"
                    className={`h-full w-full object-cover object-center transition duration-500 group-hover:scale-110 ${
                      imageTone === "vintage" 
                        ? "contrast-[1.03] saturate-[1.05] brightness-[0.98] sepia-[0.04]"
                        : imageTone === "distro"
                        ? "contrast-[1.10] saturate-[1.15] brightness-[0.94] hue-rotate-[1deg]"
                        : imageTone === "clean"
                        ? "contrast-[1.02] saturate-[1.02] brightness-[1.02]"
                        : "" // raw
                    }`}
                  />
                  {imageTone === "vintage" && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-[#B23B22]/5 mix-blend-multiply pointer-events-none rounded-2xl"></div>
                  )}
                  {imageTone === "distro" && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/25 via-transparent to-navy/15 mix-blend-overlay pointer-events-none rounded-2xl"></div>
                  )}
                  {imageTone === "clean" && (
                    <div className="absolute inset-0 bg-white/5 pointer-events-none rounded-2xl"></div>
                  )}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"></div>
                </div>

                {/* Foto 4 - Hero Grid */}
                <div className={`group relative overflow-hidden rounded-2xl bg-slate-100 shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-lg translate-y-2 ${
                  imageRatio === "portrait" ? "aspect-[4/5]" : imageRatio === "square" ? "aspect-square" : "aspect-[4/4.5]"
                }`}>
                  {/* COMMENT: Ganti URL di bawah ini di variabel IMAGES atau local file assets/images/hero_4.jpg */}
                  <img 
                    src={IMAGES.hero_grid_4} 
                    alt="Pakaian selesai diproduksi" 
                    referrerPolicy="no-referrer"
                    className={`h-full w-full object-cover object-center transition duration-500 group-hover:scale-110 ${
                      imageTone === "vintage" 
                        ? "contrast-[1.03] saturate-[1.05] brightness-[0.98] sepia-[0.04]"
                        : imageTone === "distro"
                        ? "contrast-[1.10] saturate-[1.15] brightness-[0.94] hue-rotate-[1deg]"
                        : imageTone === "clean"
                        ? "contrast-[1.02] saturate-[1.02] brightness-[1.02]"
                        : "" // raw
                    }`}
                  />
                  {imageTone === "vintage" && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-[#B23B22]/5 mix-blend-multiply pointer-events-none rounded-2xl"></div>
                  )}
                  {imageTone === "distro" && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/25 via-transparent to-navy/15 mix-blend-overlay pointer-events-none rounded-2xl"></div>
                  )}
                  {imageTone === "clean" && (
                    <div className="absolute inset-0 bg-white/5 pointer-events-none rounded-2xl"></div>
                  )}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
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
          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
          ">
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
                  <div className={`relative w-full overflow-hidden bg-slate-100 border-b border-slate-200/50 transition-all duration-300 ${
                    imageRatio === "portrait" ? "aspect-[4/3.5]" : imageRatio === "square" ? "aspect-[1/1]" : "aspect-[4/3]"
                  }`}>
                    <span className="absolute top-3 left-3 z-10 rounded-full bg-navy/90 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                      {p.category}
                    </span>
                    <span className="absolute top-3 right-3 z-10 rounded-full bg-brick px-3 py-1 text-xs font-semibold tracking-wide text-white">
                      {p.badge}
                    </span>
                    
                    {/* COMMENT: Ganti URL di bawah ini di variabel IMAGES atau local file assets/images/ nama produk.jpg */}
                    <img
                      src={p.image_url}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className={`h-full w-full object-cover object-center transition duration-700 group-hover:scale-108 ${
                        imageTone === "vintage" 
                          ? "contrast-[1.02] saturate-[1.04] brightness-[0.98] sepia-[0.03]"
                          : imageTone === "distro"
                          ? "contrast-[1.10] saturate-[1.12] brightness-[0.95] hue-rotate-[1deg]"
                          : imageTone === "clean"
                          ? "contrast-[1.01] saturate-[1.02] brightness-[1.01]"
                          : ""
                      }`}
                    />
                    
                    {imageTone === "vintage" && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/12 via-transparent to-brick/5 mix-blend-multiply pointer-events-none"></div>
                    )}
                    {imageTone === "distro" && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/20 via-transparent to-navy/10 mix-blend-overlay pointer-events-none"></div>
                    )}
                    {imageTone === "clean" && (
                      <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                    )}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  CV. Baloeng Gedhe Indonesia siap menjadi partner terpercaya dalam memenuhi kebutuhan parsing seragam dan konveksi custom untuk perusahaan, instansi, komunitas, maupun organisasi. Kepuasan pelanggan dan kualitas produk merupakan prioritas utama dalam setiap proses produksi.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================== 5B. STANDAR OPERASIONAL PROSEDUR (SOP) PRODUKSI ==================== */}
      <section className="bg-white py-20 border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-brick font-mono">Alur Kerja Profesional</h2>
            <p className="text-3xl font-extrabold text-navy sm:text-4xl tracking-tight">
              SOP Proses Produksi Konveksi
            </p>
            <div className="h-1 w-20 bg-brick mx-auto rounded-full"></div>
            <p className="text-slate-600 text-sm md:text-base">
              Kami menerapkan Standar Operasional Prosedur yang terjadwal dan terstruktur guna memastikan kualitas pengerjaan dan kepuasan maksimal setiap pelanggan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                id: "P1",
                num: "01",
                title: "Penerimaan Order",
                desc: "Admin menerima order dari pembeli dan mencatatnya ke dalam surat order secara detail.",
                icon: "📋"
              },
              {
                id: "P2",
                num: "02",
                title: "Nota & Invoice",
                desc: "Setelah order dicatat, admin akan membuatkan invoice tagihan resmi atau nota pembayaran.",
                icon: "💳"
              },
              {
                id: "P3",
                num: "03",
                title: "SPK Mandatori",
                desc: "Membuat lembar kerja 3 rangkap: Lembar 1 arsip admin, lembar 2 bagian jahit, lembar 3 bagian bordir/sablon.",
                icon: "📄"
              },
              {
                id: "P4",
                num: "04",
                title: "Persiapan Kain",
                desc: "Menyiapkan kain gulung berkualitas premium serta material penunjang sesuai pesanan pelanggan.",
                icon: "🧶"
              },
              {
                id: "P5",
                num: "05",
                title: "Alokasi Meja",
                desc: "Mendistribusikan kain yang tersedia kepada bagian pemotongan dan jahit sesuai jumlah yang tepat.",
                icon: "🚛"
              },
              {
                id: "P6",
                num: "06",
                title: "Pemotongan Handal",
                desc: "Menyesuaikan kepadatan jadwal jahit: potong kain pola sebelum sablon, atau jahit langsung jika desain standar.",
                icon: "✂️"
              },
              {
                id: "P7",
                num: "07",
                title: "Sablon & Bordir",
                desc: "Proses cetak sablon manual plastisol atau bordir komputer presisi tinggi dengan kerapatan padat.",
                icon: "🎨"
              },
              {
                id: "P8",
                num: "08",
                title: "Quality Control",
                desc: "Kepala bagian QC memeriksa detail jahitan secara ketat demi meminimalkan kesalahan hasil.",
                icon: "🔍"
              },
              {
                id: "P9",
                num: "09",
                title: "Pengerjaan Ulang",
                desc: "Jika ada temuan cacat (reject), bagian jahit/sablon segera memperbaiki secara teliti sesuai standard.",
                icon: "🔧"
              },
              {
                id: "P10",
                num: "10",
                title: "Selesai & Kirim",
                desc: "Pekerjaan selesai, produk dikemas premium, siap untuk dikirim ekspedisi atau diambil oleh customer.",
                icon: "📦"
              }
            ].map((step) => (
              <div 
                key={step.id} 
                className="group relative rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between hover:border-brick hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-4 right-4 font-mono font-extrabold text-lg text-slate-300 group-hover:text-brick/20 transition-colors">
                  {step.id}
                </div>
                <div className="space-y-4">
                  <div className="text-3xl">{step.icon}</div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-brick font-mono">{step.num} / STEP</span>
                    <h4 className="font-extrabold text-navy text-sm md:text-base tracking-tight group-hover:text-brick transition-colors">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== 6. COMPANY PROFILE PDF SECTION ==================== */}
      <section
        id="company-profile"
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#00142F] to-[#021D42] rounded-[32px] p-10 lg:p-14">

            <div className="
              grid
              grid-cols-1
              lg:grid-cols-[1fr_0.9fr]
              gap-10
              items-center
            ">

              {/* Kiri */}
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#C34A2C] text-[#C34A2C] text-sm font-semibold mb-8">
                  📄 KREDIBILITAS BISNIS
                </div>

                <h2 className="text-5xl font-bold text-white leading-tight mb-6">
                  Unduh Company Profile
                  <br />
                  Baloeng Gedhe
                </h2>

                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  Kami mengerti pentingnya legalitas dan rincian kerja sama
                  konveksi. Di dokumen Company Profile ini, Anda dapat
                  menemukan portofolio terlengkap kami, daftar legalitas
                  usaha kami, opsi bahan konveksi secara detail,
                  daftar harga, serta syarat tata cara pemesanan.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
                  <p className="text-slate-300 text-sm">
                    Dokumen terbaru diperbarui untuk tahun berjalan.
                    Anda bisa melihat preview ringkasan atau langsung
                    mengunduh PDF resminya.
                  </p>
                </div>

                <a
                  href={companyProfile?.company_profile_pdf || "https://kqejmeecpnqyltfkpefr.supabase.co/storage/v1/object/public/pdf/Company%20Profile%20Baloeng%20Gedhe.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    px-7
                    py-4
                    rounded-2xl
                    bg-[#C34A2C]
                    hover:bg-[#A53F24]
                    text-white
                    font-semibold
                    transition-all
                    duration-300
                  "
                >
                  ⬇ Download Company Profile
                </a>
              </div>

              {/* Kanan */}
              <div className="flex justify-center">
                <div
                  className="
                  w-full
                  max-w-[500px]
                  h-[500px]
                  sm:h-[650px]
                  lg:h-[700px]
                  rounded-[28px]
                  overflow-hidden
                  shadow-[0_25px_60px_rgba(0,0,0,0.45)]
                  border
                  border-white/10
                  "
                >
                  <iframe
                    src={`${companyProfile?.company_profile_pdf || "https://kqejmeecpnqyltfkpefr.supabase.co/storage/v1/object/public/pdf/Company%20Profile%20Baloeng%20Gedhe.pdf"}#toolbar=0`}
                    title="Company Profile"
                    className="w-full h-full bg-white"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ==================== 6B. PORTOFOLIO KLIEN & PENGALAMAN KERJA ==================== */}
      <section className="bg-slate-50 py-20 md:py-24 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#B23B22] font-mono">Pengalaman Pekerjaan</h2>
            <p className="text-3xl font-extrabold text-navy sm:text-4xl tracking-tight">
              Mitra Terpercaya &amp; Pengalaman Kerja
            </p>
            <div className="h-1 w-20 bg-brick mx-auto rounded-full"></div>
            <p className="text-slate-600 text-sm md:text-base">
              Hadir mendampingi berbagai instansi pemerintah, BUMN, organisasi medis, institusi akademik, hingga clothing line lokal dalam mewujudkan pakaian seragam berkualitas tinggi.
            </p>
          </div>

          {/* Experience Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                client: "KPU Kabupaten Banyumas",
                product: "Seragam PDH & Kaos Pendidikan Pemilu",
                material: "Bahan High Quality Japan Drill &amp; Cotton Combed 24s",
                badge: "Lembaga Negara",
                desc: "Produksi seragam dinas harian berlogo bordir komputer presisi tinggi dan kaos kampanye edukasi pemilu yang nyaman dan adem.",
                color: "bg-amber-600",
                initials: "KPU"
              },
              {
                client: "PMI Kabupaten Banyumas",
                product: "Rompi Tactical",
                material: "Bahan High-Grade Ripstop &amp; Double Mesh",
                badge: "Organisasi Sosial",
                desc: "Desain rompi dinas outdoor taktis multifungsi dengan saku kargo, furing jala berventilasi, dan scotlite reflektor cahaya untuk tugas kemanusiaan.",
                color: "bg-red-650",
                initials: "PMI"
              },
              {
                client: "BPS Kabupaten Banyumas",
                product: "Seragam PDH",
                material: "Bahan Japan Drill Premium Super-Soft",
                badge: "Instansi Pemerintah",
                desc: "Kemeja kerja dinas harian berpotongan rapi dengan detail bordir logo instansi presisi tinggi dan bahan kain handeel halus.",
                color: "bg-blue-650",
                initials: "BPS"
              },
              {
                client: "Universitas Jenderal Soedirman Purwokerto",
                product: "Kaos Dies Natalis",
                material: "Bahan Cotton Combed 30s Premium Reaktif",
                badge: "Sektor Pendidikan",
                desc: "Kaos sablon premium uniseks Dies Natalis Universitas dengan kualitas tinta plastisol awet yang lembut dan daya rekat super.",
                color: "bg-yellow-600",
                initials: "UNS"
              },
              {
                client: "Dinporabudpar Kabupaten Banyumas",
                product: "Jaket Olahraga",
                material: "Bahan Parasut Taslan &amp; Furing High-Ventilation Drifit",
                badge: "Instansi Pemerintah",
                desc: "Jaket olahraga windbreaker kontingen daerah dengan kain kedap air (water-resistant), sleting waterproof, dan sirkulasi udara optimal.",
                color: "bg-cyan-700",
                initials: "DNP"
              },
              {
                client: "SMP Telkom Purwokerto",
                product: "Seragam Olahraga &amp; Jas Almamater Siswa",
                material: "Bahan Dri-Fit Milano &amp; Twist High-Class",
                badge: "Sektor Pendidikan",
                desc: "Setelan jersey olahraga dinamis bermedium lembut dipadukan jas almamater berfuring satin halus yang sangat pas untuk kegiatan siswa.",
                color: "bg-red-700",
                initials: "TLK"
              },
              {
                client: "Universitas Nahdlatul Ulama Purwokerto",
                product: "Seragam PDL KKN",
                material: "Bahan American Drill Grade A",
                badge: "Sektor Pendidikan",
                desc: "Pakaian dinas lapangan taktis KKN mahasiswa berpundak pangkat fleksibel dengan aksen saku kargo ganda pendukung kegiatan sosial.",
                color: "bg-emerald-700",
                initials: "UNU"
              },
              {
                client: "Dinporapar Kabupaten Purbalingga",
                product: "Jersey POPDA",
                material: "Bahan Dri-Fit Benzema Ultra-Evap",
                badge: "Instansi Pemerintah",
                desc: "Custom jersey olahraga tim atlet daerah hasil cetakan sublim full-print berkualitas tinggi dengan sirkulasi pori evaporasi kering.",
                color: "bg-indigo-650",
                initials: "DPP"
              }
            ].map((exp, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Badge & initials row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#B23B22] bg-brick/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {exp.badge}
                    </span>
                    <div className={`h-9 w-9 rounded-xl text-white text-xs font-bold font-mono flex items-center justify-center ${exp.color}`}>
                      {exp.initials}
                    </div>
                  </div>

                  {/* Header text */}
                  <div className="space-y-1.5">
                    <h4 className="text-base font-extrabold text-navy tracking-tight leading-tight">
                      {exp.client}
                    </h4>
                    <p className="text-xs text-brick font-semibold">
                      {exp.product}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
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
                { label: "Company Profile", id: "company-profile" }
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
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 text-slate-300 hover:text-brick group transition-colors duration-200"
              >
                <MapPin className="h-5 w-5 text-brick shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-115" />
                <span className="underline-offset-4 group-hover:underline leading-relaxed">
                  Jl. Penatusan RT.03/06 Purwokerto Wetan, Banyumas, Jawa Tengah
                </span>
              </a>

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

              {/* Tombol Lokasi Kami, Ikon Peta & Embedded Google Maps */}
              <div className="pt-2 space-y-4">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 rounded-xl bg-brick/15 border border-brick/40 hover:bg-brick hover:border-brick px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 shadow-sm hover:shadow-brick/30 group"
                >
                  <Map className="h-4 w-4 shrink-0 text-brick group-hover:text-white transition-transform duration-200 group-hover:scale-110" />
                  <span>Lokasi Kami</span>
                </a>

                {/* Embedded Google Maps Frame */}
                <div className="rounded-xl overflow-hidden border border-slate-700/60 shadow-md h-36 relative group w-full">
                  <iframe
                    title="Peta Alamat CV Baloeng Gedhe Indonesia"
                    src={GOOGLE_MAPS_EMBED_URL}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    className="filter grayscale saturate-[0.8] contrast-[1.05] group-hover:grayscale-0 transition-all duration-300 pointer-events-none"
                  ></iframe>
                  {/* Click Overlay calling direct Google Maps */}
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-transparent hover:bg-black/10 transition-all duration-300 flex items-center justify-center cursor-pointer"
                    title="Buka di Google Maps"
                  >
                    <div className="bg-slate-950/90 text-white rounded-lg px-2.5 py-1.5 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5 border border-white/20 shadow-lg">
                      <ExternalLink className="h-3 w-3" />
                      <span>Buka di Google Maps</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Hak Cipta Bawah */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CV. Baloeng Gedhe Indonesia. Seluruh Hak Cipta Dilindungi.</p>
          <p className="mt-1 font-medium text-slate-500">Konveksi & produksi seragam terpercaya Purwokerto, Jawa Tengah.</p>
        </div>
      </footer>

      {/* Fullscreen PDF Company Profile Reader Modal */}
      <AnimatePresence>
        {pdfPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          >
            {/* Close layer hit area */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setPdfPreviewOpen(false)}></div>
            
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center justify-between select-none">
                <div className="flex items-center space-x-3 text-white">
                  <div className="h-9 w-9 bg-brick rounded-xl flex items-center justify-center text-xs font-bold font-mono">
                    PDF
                  </div>
                  <div className="text-left font-sans">
                    <h3 className="font-extrabold text-sm md:text-base leading-none text-white">CV. Baloeng Gedhe Indonesia</h3>
                    <p className="text-[10px] md:text-xs text-slate-400 mt-1">Company Profile Resmi &bull; PDF Slides Reader</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setPdfPreviewOpen(false)}
                  className="cursor-pointer p-2 bg-slate-700 hover:bg-slate-650 rounded-xl text-white transition duration-150"
                  aria-label="Tutup"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* PDF Content Area */}
              <div className="flex-1 bg-white overflow-hidden min-h-[500px] md:min-h-[700px] flex flex-col">
                <iframe
                  src="https://kqejmeecpnqyltfkpefr.supabase.co/storage/v1/object/public/pdf/Company%20Profile%20Baloeng%20Gedhe.pdf"
                  title="Company Profile"
                  className="w-full h-full flex-1 min-h-[650px]"
                />
              </div>

              {/* Bottom Navigation Control Bar */}
              <div className="bg-slate-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-700 select-none text-xs text-white pb-6">
                <div className="text-slate-400">
                  Melihat dokumen asli PDF
                </div>
                {/* Download PDF button inside modal */}
                <div>
                  <a
                    href={COMPANY_PROFILE_PDF_URL}
                    download="baloeng-gedhe-company-profile.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 rounded-xl bg-brick/20 border border-brick/40 hover:bg-brick py-2 px-4 text-xs font-bold text-white transition duration-200"
                  >
                    <Download className="h-4 w-4" />
                    <span>Unduh PDF</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
