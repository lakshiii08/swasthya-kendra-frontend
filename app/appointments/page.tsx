"use client";

import Sidebar from "@/components/Sidebar";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import {
  Calendar,
  Clock,
  Stethoscope,
  Trash2,
} from "lucide-react";

export default function AppointmentsPage() {

  const [appointments, setAppointments] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

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

      setLoading(false);

      if (error) {

        console.log(error);

        return;
      }

      setAppointments(data || []);
    };

  // CANCEL APPOINTMENT

  const cancelAppointment =
    async (id: string) => {

      const { error } =
        await supabase
          .from("appointments")
          .delete()
          .eq("id", id);

      if (error) {

        console.log(error);

        alert(
          "Failed to cancel"
        );

        return;
      }

      alert(
        "Appointment Cancelled"
      );

      fetchAppointments();
    };

  return (

    <div className="flex">

      <Sidebar />

      <main
        className="
          flex-1
          min-h-screen
          bg-gradient-to-br
          from-cyan-50
          via-white
          to-emerald-50
          p-8
        "
      >

        <div className="max-w-6xl mx-auto">

          <h1
            className="
              text-5xl
              font-bold
              text-slate-800
              mb-12
            "
          >

            My Appointments

          </h1>

          {loading ? (

            <div
              className="
                bg-white
                rounded-3xl
                p-10
                shadow-xl
                text-center
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                  text-slate-700
                "
              >

                Loading...

              </h2>

            </div>

          ) : appointments.length === 0 ? (

            <div
              className="
                bg-white
                rounded-3xl
                p-10
                shadow-xl
                text-center
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                  text-slate-700
                "
              >

                No Appointments Found

              </h2>

            </div>

          ) : (

            <div className="grid gap-8">

              {appointments.map(
                (appointment: any) => (

                  <div
                    key={appointment.id}
                    className="
                      bg-white
                      rounded-3xl
                      shadow-xl
                      p-8
                      flex
                      flex-col
                      md:flex-row
                      justify-between
                      gap-8
                    "
                  >

                    <div className="flex gap-6">

                      <div
                        className="
                          bg-teal-100
                          p-5
                          rounded-full
                          h-fit
                        "
                      >

                        <Stethoscope
                          className="text-teal-700"
                          size={40}
                        />

                      </div>

                      <div>

                        <h2
                          className="
                            text-3xl
                            font-bold
                            text-slate-800
                          "
                        >

                          Dr. {
                            appointment.doctor_name
                          }

                        </h2>

                        <p
                          className="
                            text-lg
                            text-slate-500
                            mt-2
                          "
                        >

                          Patient: {
                            appointment.patient_name
                          }

                        </p>

                        <div className="mt-4">

                          <span
                            className={`
                              px-4 py-2
                              rounded-full
                              text-sm
                              font-semibold

                              ${
                                appointment.status ===
                                "Approved"
                                  ? "bg-green-100 text-green-700"
                                  : appointment.status ===
                                    "Rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }
                            `}
                          >

                            {
                              appointment.status
                            }

                          </span>

                        </div>

                      </div>

                    </div>

                    <div
                      className="
                        flex
                        flex-col
                        gap-4
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
                          className="text-teal-600"
                        />

                        <span className="font-medium">

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
                          className="text-teal-600"
                        />

                        <span className="font-medium">

                          {
                            appointment.appointment_time
                          }

                        </span>

                      </div>

                      <button
                        onClick={() =>
                          cancelAppointment(
                            appointment.id
                          )
                        }

                        className="
                          mt-4
                          flex
                          items-center
                          justify-center
                          gap-2
                          bg-red-500
                          text-white
                          px-5
                          py-3
                          rounded-2xl
                          hover:bg-red-600
                          transition-all
                        "
                      >

                        <Trash2 size={18} />

                        Cancel Appointment

                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}