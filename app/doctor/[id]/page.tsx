"use client";

import Sidebar from "@/components/Sidebar";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  Star,
  Clock,
  Calendar,
  Languages,
  Hospital,
  Stethoscope,
} from "lucide-react";

export default function DoctorDetailsPage() {

  const params = useParams();

  const [doctor, setDoctor] =
    useState<any>(null);

  const [selectedSlot, setSelectedSlot] =
    useState("");

  // FETCH SINGLE DOCTOR

  useEffect(() => {

    fetchDoctor();

  }, []);

  const fetchDoctor =
    async () => {

      try {

        const response =
          await fetch(
            `http://localhost:5000/api/doctors/${params.id}`
          );

        const data =
          await response.json();

        setDoctor(data);

      } catch (error) {

        console.log(error);

      }
    };

  // BOOK APPOINTMENT

  const bookAppointment =
    async () => {

      try {

        const storedUser =
          localStorage.getItem("user");

        const user =
          storedUser
            ? JSON.parse(storedUser)
            : null;

        const response =
          await fetch(
            "http://localhost:5000/api/appointments",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                patientName:
                  user?.name || "Guest",

                patientEmail:
                  user?.email || "guest@gmail.com",

                doctorName:
                  doctor?.name,

                specialty:
                  doctor?.specialty,

                date: "Tomorrow",

                time:
                  selectedSlot ||
                  "10:00 AM",
              }),
            }
          );

        const data =
          await response.json();

        console.log(data);

        alert(
          "Appointment Booked Successfully 🎉"
        );

      } catch (error) {

        console.log(error);

        alert("Booking Failed");

      }
    };

  // LOADING

  if (!doctor) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-3xl
          font-bold
        "
      >

        Loading...

      </div>
    );
  }

  return (

    <div className="flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main
        className="
          flex-1 min-h-screen
          bg-gradient-to-br
          from-cyan-50
          via-white
          to-emerald-50
          p-6
        "
      >

        <div
          className="
            max-w-5xl
            mx-auto
            bg-white
            rounded-3xl
            shadow-2xl
            p-10
          "
        >

          <div
            className="
              flex flex-col
              md:flex-row
              gap-10
            "
          >

            {/* LEFT */}

            <div
              className="
                flex flex-col
                items-center
              "
            >

              <div
                className="
                  bg-teal-100
                  p-10
                  rounded-full
                "
              >

                <Stethoscope
                  className="
                    text-teal-700
                  "
                  size={80}
                />

              </div>

              <div
                className="
                  flex items-center
                  gap-2 mt-6
                  bg-yellow-100
                  px-4 py-2
                  rounded-full
                "
              >

                <Star
                  className="
                    text-yellow-500
                    fill-yellow-500
                  "
                  size={20}
                />

                <span className="font-bold">

                  4.8

                </span>

              </div>

            </div>

            {/* RIGHT */}

            <div className="flex-1">

              <h1
                className="
                  text-5xl
                  font-bold
                  text-slate-800
                "
              >

                {doctor.name}

              </h1>

              <p
                className="
                  text-2xl
                  text-teal-700
                  mt-3
                "
              >

                {doctor.specialty}

              </p>

              {/* INFO */}

              <div
                className="
                  grid
                  md:grid-cols-2
                  gap-6
                  mt-8
                "
              >

                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >

                  <Clock
                    className="
                      text-teal-600
                    "
                  />

                  <span>

                    {doctor.experience}

                  </span>

                </div>

                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >

                  <Hospital
                    className="
                      text-teal-600
                    "
                  />

                  <span>

                    Apollo Hospital

                  </span>

                </div>

                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >

                  <Languages
                    className="
                      text-teal-600
                    "
                  />

                  <span>

                    Hindi, English

                  </span>

                </div>

                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >

                  <Calendar
                    className="
                      text-teal-600
                    "
                  />

                  <span>

                    Mon - Sat

                  </span>

                </div>

              </div>

              {/* ABOUT */}

              <div className="mt-10">

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-slate-800
                  "
                >

                  About Doctor

                </h2>

                <p
                  className="
                    mt-4
                    text-slate-600
                    leading-8
                  "
                >

                  {doctor.name}
                  {" "}
                  is a highly experienced
                  {" "}
                  {doctor.specialty}
                  {" "}
                  dedicated to providing
                  high-quality healthcare
                  services to patients.

                </p>

              </div>

              {/* SLOTS */}

              <div className="mt-10">

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-slate-800
                  "
                >

                  Available Slots

                </h2>

                <div
                  className="
                    flex flex-wrap
                    gap-4 mt-6
                  "
                >

                  {[
                    "10:00 AM",
                    "11:30 AM",
                    "1:00 PM",
                    "4:00 PM",
                  ].map((slot, index) => (

                    <button
                      key={index}

                      onClick={() =>
                        setSelectedSlot(slot)
                      }

                      className={`
                        px-5 py-3
                        rounded-2xl
                        font-semibold
                        transition-all
                        duration-300

                        ${
                          selectedSlot === slot
                            ? `
                              bg-teal-600
                              text-white
                            `
                            : `
                              bg-teal-100
                              text-teal-700
                            `
                        }
                      `}
                    >

                      {slot}

                    </button>

                  ))}

                </div>

              </div>

              {/* FOOTER */}

              <div
                className="
                  mt-12
                  flex justify-between
                  items-center
                  flex-wrap
                  gap-6
                "
              >

                <div>

                  <p className="text-slate-500">

                    Consultation Fee

                  </p>

                  <h2
                    className="
                      text-4xl
                      font-bold
                      text-emerald-600
                    "
                  >

                    ₹{doctor.fee}

                  </h2>

                </div>

                <button
                  onClick={bookAppointment}

                  className="
                    px-8 py-4
                    bg-gradient-to-r
                    from-teal-600
                    to-cyan-500
                    text-white
                    rounded-2xl
                    text-lg
                    font-semibold
                    hover:scale-105
                    transition-all
                    duration-300
                    shadow-xl
                  "
                >

                  Confirm Appointment

                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}