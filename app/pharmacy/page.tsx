"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

import {
  Search,
  ShoppingCart,
  Pill
} from "lucide-react";

const medicines = [
  {
    name: "Paracetamol",
    price: 50,
    company: "Cipla"
  },
  {
    name: "Vitamin D3",
    price: 120,
    company: "Sun Pharma"
  },
  {
    name: "Cough Syrup",
    price: 95,
    company: "Dr. Morepen"
  },
  {
    name: "Pain Relief Spray",
    price: 180,
    company: "Volini"
  }
];

export default function PharmacyPage() {

  const [search, setSearch] = useState("");

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="flex">

      <Sidebar />

      <main className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 p-8">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="flex justify-between items-center flex-wrap gap-4">

            <div>

              <h1 className="text-5xl font-bold text-slate-800">
                Online Pharmacy
              </h1>

              <p className="text-slate-500 mt-3 text-lg">
                Order medicines online at affordable prices
              </p>

            </div>

            <button className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">

              <ShoppingCart size={22} />

              Cart

            </button>

          </div>

          {/* SEARCH */}

          <div className="relative mt-10">

            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={24}
            />

            <input
              type="text"
              placeholder="Search medicines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-6 py-5 rounded-3xl bg-white shadow-xl outline-none text-lg"
            />

          </div>

          {/* MEDICINES */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

            {filteredMedicines.map((med, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl hover:scale-[1.03] transition-all duration-300"
              >

                <div className="bg-teal-100 w-fit p-5 rounded-2xl">

                  <Pill
                    className="text-teal-700"
                    size={40}
                  />

                </div>

                <h2 className="text-2xl font-bold text-slate-800 mt-6">
                  {med.name}
                </h2>

                <p className="text-slate-500 mt-2">
                  {med.company}
                </p>

                <div className="flex justify-between items-center mt-8">

                  <h3 className="text-3xl font-bold text-emerald-600">
                    ₹{med.price}
                  </h3>

                  <button className="px-5 py-3 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-2xl hover:scale-105 transition-all duration-300">

                    Buy

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>

  );
}