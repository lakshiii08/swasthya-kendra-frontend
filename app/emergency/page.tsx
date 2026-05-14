"use client";

import Sidebar from "@/components/Sidebar";

import {
  Ambulance,
  Phone,
  MapPin,
  Siren
} from "lucide-react";

const hospitals = [
  {
    name: "Apollo Hospital",
    distance: "2.4 km"
  },
  {
    name: "Fortis Healthcare",
    distance: "3.1 km"
  },
  {
    name: "SMS Hospital",
    distance: "5.7 km"
  }
];

export default function EmergencyPage() {

  return (

    <div className="flex">

      <Sidebar />

      <main className="flex-1 min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-8">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="text-center">

            <div className="bg-red-100 w-fit mx-auto p-8 rounded-full animate-pulse">

              <Siren
                className="text-red-600"
                size={80}
              />

            </div>

            <h1 className="text-6xl font-bold text-red-600 mt-8">
              Emergency SOS
            </h1>

            <p className="text-slate-600 text-xl mt-4">
              Quick access to emergency medical support
            </p>

          </div>

          {/* SOS BUTTON */}

          <div className="flex justify-center mt-12">

            <button className="w-72 h-72 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white text-4xl font-bold shadow-[0_0_60px_rgba(255,0,0,0.5)] hover:scale-105 transition-all duration-300 animate-pulse">

              SOS

            </button>

          </div>

          {/* EMERGENCY ACTIONS */}

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            <div className="bg-white rounded-3xl p-8 shadow-xl text-center">

              <Ambulance
                className="text-red-600 mx-auto"
                size={60}
              />

              <h2 className="text-2xl font-bold mt-6">
                Ambulance
              </h2>

              <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all duration-300">

                Call 108

              </button>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl text-center">

              <Phone
                className="text-orange-500 mx-auto"
                size={60}
              />

              <h2 className="text-2xl font-bold mt-6">
                Emergency Contact
              </h2>

              <button className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all duration-300">

                Call Family

              </button>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl text-center">

              <MapPin
                className="text-teal-600 mx-auto"
                size={60}
              />

              <h2 className="text-2xl font-bold mt-6">
                Nearby Hospitals
              </h2>

              <button className="mt-6 px-6 py-3 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all duration-300">

                View Map

              </button>

            </div>

          </div>

          {/* HOSPITALS */}

          <div className="mt-16">

            <h2 className="text-4xl font-bold text-slate-800 mb-8">
              Nearby Hospitals
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {hospitals.map((hospital, index) => (

                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:scale-[1.03] transition-all duration-300"
                >

                  <h3 className="text-2xl font-bold text-slate-800">
                    {hospital.name}
                  </h3>

                  <p className="text-slate-500 mt-4">
                    Distance: {hospital.distance}
                  </p>

                  <button className="mt-6 px-5 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-2xl hover:scale-105 transition-all duration-300">

                    Get Directions

                  </button>

                </div>

              ))}

            </div>

          </div>

        </div>

      </main>

    </div>

  );
}