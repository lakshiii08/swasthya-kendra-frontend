"use client";

import Sidebar from "@/components/Sidebar";

import { useEffect, useState } from "react";

import {
  Users,
  Calendar,
  IndianRupee,
  Activity,
  Trash2,
  Pencil
} from "lucide-react";

export default function AdminPage() {

  const [doctors, setDoctors] =
    useState<any[]>([]);

  const [form, setForm] =
    useState({
      name: "",
      specialty: "",
      experience: "",
      fee: "",
    });

  const [editingId, setEditingId] =
    useState("");

  // FETCH DOCTORS

  const fetchDoctors = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/doctors"
      );

      const data = await res.json();

      setDoctors(data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchDoctors();

  }, []);

  // ADD OR UPDATE DOCTOR

  const handleSubmit = async (
    e: any
  ) => {

    e.preventDefault();

    try {

      const url = editingId
        ? `http://localhost:5000/api/doctors/${editingId}`
        : "http://localhost:5000/api/doctors";

      const method =
        editingId ? "PUT" : "POST";

      const res = await fetch(url, {

        method,

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(form),
      });

      const data =
        await res.json();

      if (data.success) {

        alert(
          editingId
            ? "Doctor Updated ✅"
            : "Doctor Added ✅"
        );

        setForm({
          name: "",
          specialty: "",
          experience: "",
          fee: "",
        });

        setEditingId("");

        fetchDoctors();
      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");
    }
  };

  // DELETE DOCTOR

  const deleteDoctor = async (
    id: string
  ) => {

    const confirmDelete =
      confirm(
        "Delete this doctor?"
      );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `http://localhost:5000/api/doctors/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      if (data.success) {

        alert(
          "Doctor Deleted ❌"
        );

        fetchDoctors();
      }

    } catch (error) {

      console.log(error);
    }
  };

  // EDIT DOCTOR

  const editDoctor = (
    doctor: any
  ) => {

    setEditingId(
      doctor._id
    );

    setForm({
      name: doctor.name,
      specialty:
        doctor.specialty,
      experience:
        doctor.experience,
      fee: doctor.fee,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (

    <div className="flex">

      <Sidebar />

      <main className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 p-8">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="flex justify-between items-center flex-wrap gap-4">

            <div>

              <h1 className="text-5xl font-bold text-slate-800">
                Admin Dashboard
              </h1>

              <p className="text-slate-500 mt-3 text-lg">
                Manage healthcare operations
              </p>

            </div>

          </div>

          {/* STATS */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

            <div className="bg-white rounded-3xl p-8 shadow-xl">

              <Users
                className="text-blue-600"
                size={50}
              />

              <h2 className="text-4xl font-bold text-slate-800 mt-6">
                2,540
              </h2>

              <p className="text-slate-500 mt-2">
                Total Patients
              </p>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">

              <Calendar
                className="text-teal-600"
                size={50}
              />

              <h2 className="text-4xl font-bold text-slate-800 mt-6">
                1,240
              </h2>

              <p className="text-slate-500 mt-2">
                Appointments
              </p>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">

              <IndianRupee
                className="text-emerald-600"
                size={50}
              />

              <h2 className="text-4xl font-bold text-slate-800 mt-6">
                ₹4.8L
              </h2>

              <p className="text-slate-500 mt-2">
                Revenue
              </p>

            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">

              <Activity
                className="text-purple-600"
                size={50}
              />

              <h2 className="text-4xl font-bold text-slate-800 mt-6">
                92%
              </h2>

              <p className="text-slate-500 mt-2">
                System Health
              </p>

            </div>

          </div>

          {/* ADD / EDIT DOCTOR */}

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-16">

            <h2 className="text-3xl font-bold text-slate-800 mb-8">

              {editingId
                ? "Edit Doctor"
                : "Add Doctor"}

            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-6"
            >

              <input
                type="text"
                placeholder="Doctor Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name:
                      e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <input
                type="text"
                placeholder="Specialty"
                value={form.specialty}
                onChange={(e) =>
                  setForm({
                    ...form,
                    specialty:
                      e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <input
                type="text"
                placeholder="Experience"
                value={form.experience}
                onChange={(e) =>
                  setForm({
                    ...form,
                    experience:
                      e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <input
                type="number"
                placeholder="Fee"
                value={form.fee}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fee:
                      e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <button
                type="submit"
                className="col-span-2 px-6 py-4 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
              >

                {editingId
                  ? "Update Doctor"
                  : "Add Doctor"}

              </button>

            </form>

          </div>

          {/* DOCTORS LIST */}

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-16">

            <h2 className="text-3xl font-bold text-slate-800 mb-8">
              Doctors List
            </h2>

            <div className="space-y-6">

              {doctors.map((doctor) => (

                <div
                  key={doctor._id}
                  className="flex justify-between items-center border-b pb-6 flex-wrap gap-4"
                >

                  <div>

                    <h3 className="text-2xl font-bold">
                      {doctor.name}
                    </h3>

                    <p className="text-slate-500 mt-2">
                      {doctor.specialty}
                    </p>

                    <p className="text-slate-500">
                      {doctor.experience}
                    </p>

                    <p className="text-emerald-600 font-bold mt-2">
                      ₹{doctor.fee}
                    </p>

                  </div>

                  <div className="flex gap-4">

                    <button
                      onClick={() =>
                        editDoctor(
                          doctor
                        )
                      }
                      className="px-5 py-3 bg-blue-500 text-white rounded-2xl flex items-center gap-2"
                    >

                      <Pencil size={18} />

                      Edit

                    </button>

                    <button
                      onClick={() =>
                        deleteDoctor(
                          doctor._id
                        )
                      }
                      className="px-5 py-3 bg-red-500 text-white rounded-2xl flex items-center gap-2"
                    >

                      <Trash2 size={18} />

                      Delete

                    </button>

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