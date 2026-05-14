"use client";

import { useEffect, useMemo, useState } from "react";

import Sidebar from "@/components/Sidebar";

import { supabase } from "@/lib/supabase";

import {
  Calendar,
  Users,
  IndianRupee,
  Video,
  Clock,
  Stethoscope,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";

type Appointment = {
  id: string;
  patient_name: string;
  doctor_name: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  created_at: string;
};

export default function DoctorDashboardPage() {

  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchAppointments();

  }, []);

  const fetchAppointments =
    async () => {

      setLoading(true);

      const { data, error } =
        await supabase
          .from("appointments")
          .select("*")
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (!error && data) {

        setAppointments(data);
      }

      setLoading(false);
    };

  const updateStatus =
    async (
      id: string,
      status: string
    ) => {

      const { error } =
        await supabase
          .from("appointments")
          .update({
            status,
          })
          .eq("id", id);

      if (!error) {

        fetchAppointments();
      }
    };

  const filteredAppointments =
    useMemo(() => {

      return appointments.filter(
        (appointment) =>
          appointment.patient_name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          appointment.doctor_name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [
      appointments,
      search,
    ]);

  const totalPatients =
    appointments.length;

  const confirmedAppointments =
    appointments.filter(
      (a) =>
        a.status ===
        "Confirmed"
    ).length;

  const completedAppointments =
    appointments.filter(
      (a) =>
        a.status ===
        "Completed"
    ).length;

  const earnings =
    confirmedAppointments *
    500;

  return (

    <div className="flex">

      <Sidebar />

      <main
        className="
          flex-1
          min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-cyan-50
          to-emerald-50
          p-8
        "
      >

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div
            className="
              flex
              justify-between
              items-center
              flex-wrap
              gap-6
            "
          >

            <div>

              <h1
                className="
                  text-5xl
                  font-bold
                  text-slate-800
                "
              >

                Doctor Dashboard

              </h1>

              <p
                className="
                  text-slate-500
                  mt-3
                  text-lg
                "
              >

                Manage appointments and consultations

              </p>

            </div>

            <button
              onClick={() =>
                window.location.href =
                  "/video-consultation"
              }

              className="
                px-7
                py-4
                bg-gradient-to-r
                from-teal-600
                to-cyan-500
                text-white
                rounded-2xl
                shadow-xl
                hover:scale-105
                transition-all
              "
            >

              Start Consultation

            </button>

          </div>

          {/* SEARCH */}

          <div
            className="
              mt-10
              bg-white
              rounded-3xl
              shadow-xl
              p-5
              flex
              items-center
              gap-4
            "
          >

            <Search
              className="
                text-slate-500
              "
            />

            <input
              type="text"
              placeholder="Search patient or doctor..."

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              className="
                w-full
                outline-none
                text-lg
              "
            />

          </div>

          {/* STATS */}

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-4
              gap-8
              mt-12
            "
          >

            <div
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-xl
              "
            >

              <Users
                className="
                  text-blue-600
                "
                size={50}
              />

              <h2
                className="
                  text-4xl
                  font-bold
                  text-slate-800
                  mt-6
                "
              >

                {totalPatients}

              </h2>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >

                Total Patients

              </p>

            </div>

            <div
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-xl
              "
            >

              <Calendar
                className="
                  text-teal-600
                "
                size={50}
              />

              <h2
                className="
                  text-4xl
                  font-bold
                  text-slate-800
                  mt-6
                "
              >

                {confirmedAppointments}

              </h2>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >

                Confirmed Appointments

              </p>

            </div>

            <div
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-xl
              "
            >

              <IndianRupee
                className="
                  text-emerald-600
                "
                size={50}
              />

              <h2
                className="
                  text-4xl
                  font-bold
                  text-slate-800
                  mt-6
                "
              >

                ₹{earnings}

              </h2>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >

                Earnings

              </p>

            </div>

            <div
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-xl
              "
            >

              <Video
                className="
                  text-purple-600
                "
                size={50}
              />

              <h2
                className="
                  text-4xl
                  font-bold
                  text-slate-800
                  mt-6
                "
              >

                {completedAppointments}

              </h2>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >

                Completed Calls

              </p>

            </div>

          </div>

          {/* APPOINTMENTS */}

          <div
            className="
              bg-white
              rounded-3xl
              shadow-xl
              p-8
              mt-16
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                text-slate-800
                mb-8
              "
            >

              Appointments

            </h2>

            {loading ? (

              <p>
                Loading appointments...
              </p>

            ) : filteredAppointments.length === 0 ? (

              <div
                className="
                  text-center
                  py-20
                "
              >

                <h3
                  className="
                    text-2xl
                    font-bold
                    text-slate-700
                  "
                >

                  No Appointments Found

                </h3>

              </div>

            ) : (

              <div className="space-y-6">

                {filteredAppointments.map(
                  (
                    appointment
                  ) => (

                    <div
                      key={
                        appointment.id
                      }

                      className="
                        flex
                        justify-between
                        items-center
                        border-b
                        pb-6
                        flex-wrap
                        gap-6
                      "
                    >

                      {/* PATIENT */}

                      <div
                        className="
                          flex
                          items-center
                          gap-5
                        "
                      >

                        <div
                          className="
                            bg-cyan-100
                            p-4
                            rounded-full
                          "
                        >

                          <Stethoscope
                            className="
                              text-cyan-700
                            "
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

                            {
                              appointment.patient_name
                            }

                          </h3>

                          <p
                            className="
                              text-slate-500
                              mt-1
                            "
                          >

                            Doctor:
                            {" "}
                            {
                              appointment.doctor_name
                            }

                          </p>

                        </div>

                      </div>

                      {/* TIME */}

                      <div
                        className="
                          flex
                          flex-col
                          gap-3
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          <Calendar
                            className="
                              text-teal-600
                            "
                          />

                          <span
                            className="
                              font-medium
                            "
                          >

                            {
                              appointment.appointment_date
                            }

                          </span>

                        </div>

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          <Clock
                            className="
                              text-teal-600
                            "
                          />

                          <span
                            className="
                              font-medium
                            "
                          >

                            {
                              appointment.appointment_time
                            }

                          </span>

                        </div>

                      </div>

                      {/* STATUS */}

                      <div>

                        <span
                          className={`
                            px-5
                            py-2
                            rounded-full
                            text-sm
                            font-semibold

                            ${
                              appointment.status ===
                              "Confirmed"

                                ? "bg-green-100 text-green-700"

                                : appointment.status ===
                                  "Rejected"

                                ? "bg-red-100 text-red-700"

                                : appointment.status ===
                                  "Completed"

                                ? "bg-blue-100 text-blue-700"

                                : "bg-yellow-100 text-yellow-700"
                            }
                          `}
                        >

                          {
                            appointment.status
                          }

                        </span>

                      </div>

                      {/* ACTIONS */}

                      <div
                        className="
                          flex
                          gap-4
                          flex-wrap
                        "
                      >

                        <button
                          onClick={() =>
                            updateStatus(
                              appointment.id,
                              "Confirmed"
                            )
                          }

                          className="
                            flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            bg-green-500
                            text-white
                            rounded-2xl
                            hover:scale-105
                            transition-all
                          "
                        >

                          <CheckCircle
                            size={18}
                          />

                          Accept

                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              appointment.id,
                              "Rejected"
                            )
                          }

                          className="
                            flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            bg-red-500
                            text-white
                            rounded-2xl
                            hover:scale-105
                            transition-all
                          "
                        >

                          <XCircle
                            size={18}
                          />

                          Reject

                        </button>

                        <button
                          onClick={() =>
                            window.location.href =
                              "/video-consultation"
                          }

                          className="
                            flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            bg-gradient-to-r
                            from-teal-600
                            to-cyan-500
                            text-white
                            rounded-2xl
                            hover:scale-105
                            transition-all
                          "
                        >

                          <Video
                            size={18}
                          />

                          Join Call

                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}