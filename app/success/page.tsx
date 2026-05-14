"use client";

import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Hash
} from "lucide-react";

export default function SuccessPage() {

  return (

    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 flex items-center justify-center p-6">

      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center">

        {/* SUCCESS ICON */}

        <div className="flex justify-center">

          <div className="bg-emerald-100 p-8 rounded-full animate-pulse">

            <CheckCircle2
              className="text-emerald-600"
              size={100}
            />

          </div>

        </div>

        {/* HEADING */}

        <h1 className="text-5xl font-bold text-emerald-600 mt-8">
          Appointment Confirmed!
        </h1>

        <p className="text-slate-600 text-lg mt-5">
          Your consultation has been successfully booked.
        </p>

        {/* APPOINTMENT CARD */}

        <div className="mt-12 bg-slate-50 rounded-3xl p-8 text-left space-y-6">

          <div className="flex items-center gap-4">

            <User className="text-teal-600" />

            <div>

              <p className="text-slate-500">
                Doctor
              </p>

              <h2 className="font-bold text-xl">
                Dr. Raj Sharma
              </h2>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Calendar className="text-teal-600" />

            <div>

              <p className="text-slate-500">
                Appointment Date
              </p>

              <h2 className="font-bold text-xl">
                15 May 2026
              </h2>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Clock className="text-teal-600" />

            <div>

              <p className="text-slate-500">
                Time Slot
              </p>

              <h2 className="font-bold text-xl">
                11:30 AM
              </h2>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Hash className="text-teal-600" />

            <div>

              <p className="text-slate-500">
                Appointment ID
              </p>

              <h2 className="font-bold text-xl">
                SK2026A102
              </h2>

            </div>

          </div>

        </div>

        {/* BUTTONS */}

        <div className="flex flex-col md:flex-row gap-5 mt-10">

          <button className="flex-1 py-4 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-2xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-xl">

            Download Receipt

          </button>

          <button className="flex-1 py-4 border-2 border-teal-600 text-teal-700 rounded-2xl text-lg font-bold hover:bg-teal-600 hover:text-white transition-all duration-300">

            Back to Dashboard

          </button>

        </div>

      </div>

    </main>
  );
}