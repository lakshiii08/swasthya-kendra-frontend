"use client";

import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import WalletConnect from "@/components/WalletConnect";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useLanguage,
} from "@/contexts/LanguageContext";

import {
  HeartPulse,
  Calendar,
  Phone,
  MessageCircle,
  Stethoscope,
} from "lucide-react";

export default function DashboardPage() {

  const { language } = useLanguage();

  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  const [doctors, setDoctors] =
    useState<any[]>([]);

  // FETCH DOCTORS

  const fetchDoctors = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/doctors"
      );

      const data = await res.json();

      console.log("Doctors API:", data);

      setDoctors(
        data.doctors || data.data || []
      );

    } catch (error) {

      console.log(error);

      setDoctors([]);

    }
  };

  // PROTECT DASHBOARD

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {

      router.push("/login");

    } else {

      setUser(
        JSON.parse(storedUser)
      );
    }

    fetchDoctors();

  }, [router]);

  return (

    <div className="flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main
        className="
          flex-1 min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-blue-50
          to-emerald-50
          py-8 px-4
        "
      >

        <div className="max-w-7xl mx-auto">

          {/* TOP SECTION */}

          <div
            className="
              flex justify-between
              items-center flex-wrap
              gap-4
            "
          >

            <div>

              <h1
                className="
                  text-4xl font-bold
                  text-slate-800
                "
              >

                {language === "en"
                  ? "Good Morning 👋"
                  : "सुप्रभात 👋"}

              </h1>

              <p
                className="
                  text-slate-600
                  mt-2
                "
              >

                {language === "en"
                  ? "Welcome to Swasthya Kendra"
                  : "स्वस्थ्य केंद्र में आपका स्वागत है"}

              </p>

              {/* USER */}

              {user && (

                <p
                  className="
                    mt-3
                    text-teal-700
                    font-semibold
                  "
                >

                  Logged in as: {user.email}

                </p>

              )}

            </div>

            {/* WALLET */}

            <div
              className="
                bg-white
                p-4
                rounded-2xl
                shadow-lg
              "
            >

              <WalletConnect />

            </div>

            {/* HEALTH SCORE */}

            <div
              className="
                bg-white
                p-4
                rounded-2xl
                shadow-lg
              "
            >

              <p className="text-slate-500">

                {language === "en"
                  ? "Health Score"
                  : "स्वास्थ्य स्कोर"}

              </p>

              <h2
                className="
                  text-3xl
                  font-bold
                  text-emerald-600
                "
              >
                92%
              </h2>

            </div>

          </div>

          {/* TOP CARDS */}

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-4
              gap-6
              mt-10
            "
          >

            {/* HEART RATE */}

            <div
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-xl
              "
            >

              <HeartPulse
                className="text-red-500"
                size={40}
              />

              <h3
                className="
                  text-xl
                  font-bold
                  mt-4
                "
              >

                {language === "en"
                  ? "Heart Rate"
                  : "हृदय गति"}

              </h3>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >
                76 BPM
              </p>

            </div>

            {/* APPOINTMENTS */}

            <div
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-xl
              "
            >

              <Calendar
                className="text-blue-500"
                size={40}
              />

              <h3
                className="
                  text-xl
                  font-bold
                  mt-4
                "
              >

                {language === "en"
                  ? "Appointments"
                  : "अपॉइंटमेंट"}

              </h3>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >
                2 Upcoming
              </p>

            </div>

            {/* EMERGENCY */}

            <div
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-xl
              "
            >

              <Phone
                className="text-green-500"
                size={40}
              />

              <h3
                className="
                  text-xl
                  font-bold
                  mt-4
                "
              >

                {language === "en"
                  ? "Emergency"
                  : "आपातकाल"}

              </h3>

              <button
                className="
                  mt-4
                  px-4 py-2
                  bg-green-500
                  text-white
                  rounded-xl
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >

                Call Now

              </button>

            </div>

            {/* AI ASSISTANT */}

            <div
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-xl
              "
            >

              <MessageCircle
                className="text-purple-500"
                size={40}
              />

              <h3
                className="
                  text-xl
                  font-bold
                  mt-4
                "
              >
                AI Assistant
              </h3>

              <Link href="/ai-chat">

                <button
                  className="
                    mt-4
                    px-4 py-2
                    bg-purple-500
                    text-white
                    rounded-xl
                    hover:scale-105
                    transition-all
                    duration-300
                  "
                >

                  Chat Now

                </button>

              </Link>

            </div>

          </div>

          {/* SPECIALISTS */}

          <div className="mt-12">

            <h2
              className="
                text-3xl
                font-bold
                text-slate-800
                mb-6
              "
            >

              {language === "en"
                ? "Find Specialists"
                : "विशेषज्ञ खोजें"}

            </h2>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
            >

              {Array.isArray(doctors) &&
                doctors.map((doctor) => (

                  <div
                    key={doctor.id}
                    className="
                      bg-white
                      rounded-3xl
                      p-8
                      shadow-xl
                      hover:scale-[1.02]
                      transition-all
                      duration-300
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-6
                      "
                    >

                      <div
                        className="
                          bg-teal-100
                          p-6
                          rounded-full
                        "
                      >

                        <Stethoscope
                          className="text-teal-700"
                          size={50}
                        />

                      </div>

                      <div>

                        <h3
                          className="
                            text-2xl
                            font-bold
                            text-slate-800
                          "
                        >

                          {doctor.name}

                        </h3>

                        <p
                          className="
                            text-teal-600
                            text-lg
                          "
                        >

                          {doctor.specialty}

                        </p>

                        <p
                          className="
                            text-slate-500
                            mt-2
                          "
                        >

                          {doctor.experience}

                        </p>

                      </div>

                    </div>

                    <div
                      className="
                        flex justify-between
                        items-center
                        mt-8
                        flex-wrap
                        gap-4
                      "
                    >

                      <div>

                        <p className="text-slate-500">
                          Consultation Fee
                        </p>

                        <h2
                          className="
                            text-3xl
                            font-bold
                            text-emerald-600
                          "
                        >

                          ₹{doctor.fee}

                        </h2>

                      </div>

                      <Link
                        href={`/doctor/${doctor.id}`}
                      >

                        <button
                          className="
                            px-6 py-3
                            bg-gradient-to-r
                            from-teal-600
                            to-cyan-500
                            text-white
                            rounded-2xl
                            font-semibold
                            hover:scale-105
                            transition-all
                            duration-300
                          "
                        >

                          View Doctor

                        </button>

                      </Link>

                    </div>

                  </div>

                ))}

            </div>

          </div>

        </div>

      </main>

    </div>

  );
}