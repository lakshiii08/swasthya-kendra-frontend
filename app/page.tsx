"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import WalletConnect from "@/components/WalletConnect";

export default function Home() {

  const { language, setLanguage } = useLanguage();

  const [darkMode, setDarkMode] = useState(false);

  return (

    <main
      className={`min-h-screen flex items-center justify-center px-4 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black"
          : "bg-gradient-to-br from-teal-600 via-cyan-500 to-emerald-400"
      }`}
    >

      <div
        className={`backdrop-blur-xl border p-10 rounded-3xl shadow-2xl text-center max-w-md w-full transition-all duration-500 ${
          darkMode
            ? "bg-white/10 border-white/10 text-white"
            : "bg-white/20 border-white/30 text-white"
        }`}
      >

        <h1 className="text-5xl font-extrabold">
          Swasthya Kendra
        </h1>

        <p className="mt-4 text-lg">
          {language === "en"
            ? "Your Health, Our Responsibility"
            : "आपका स्वास्थ्य, हमारी ज़िम्मेदारी"}
        </p>

        <div className="mt-8">
          <Link href="/login">
  <Button text="Get Started" />
</Link>
        </div>
        <div className="mt-6">
  <WalletConnect />
</div>


        <div className="mt-8 flex gap-4 justify-center">

          <button
            onClick={() => setLanguage("en")}
            className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
              language === "en"
                ? "bg-white text-teal-700"
                : "bg-white/20 border border-white/40"
            }`}
          >
            English
          </button>

          <button
            onClick={() => setLanguage("hi")}
            className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
              language === "hi"
                ? "bg-white text-teal-700"
                : "bg-white/20 border border-white/40"
            }`}
          >
            हिन्दी
          </button>

        </div>

        <div className="mt-6">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-6 py-3 bg-black/20 border border-white/30 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

        </div>

      </div>

    </main>

  );
}