"use client";

import Sidebar from "@/components/Sidebar";

import {
  useEffect,
  useState
} from "react";

import {
  User,
  Stethoscope,
  Pill,
  FileText,
  Trash2,
  Calendar
} from "lucide-react";

export default function PatientHistoryPage() {

  const [history, setHistory] =
    useState<any[]>([]);

  const [form, setForm] =
    useState({
      patientName: "",
      doctorName: "",
      disease: "",
      medicines: "",
      notes: "",
      appointmentDate: "",
    });

  // FETCH HISTORY

  const fetchHistory = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/patient-history"
      );

      const data = await res.json();

      console.log(data);

      if (data.success) {

        setHistory(data.history || []);
      }

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchHistory();

  }, []);

  // ADD HISTORY

  const addHistory = async (
    e: any
  ) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "http://localhost:5000/api/patient-history",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data =
        await res.json();

      if (data.success) {

        alert(
          "History Added ✅"
        );

        setForm({
          patientName: "",
          doctorName: "",
          disease: "",
          medicines: "",
          notes: "",
          appointmentDate: "",
        });

        fetchHistory();
      }

    } catch (error) {

      console.log(error);
    }
  };

  // DELETE HISTORY

  const deleteHistory = async (
    id: string
  ) => {

    const confirmDelete =
      confirm(
        "Delete history?"
      );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `http://localhost:5000/api/patient-history/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      if (data.success) {

        alert(
          "History Deleted ❌"
        );

        fetchHistory();
      }

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="flex">

      <Sidebar />

      <main className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 p-8">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div>

            <h1 className="text-5xl font-bold text-slate-800">
              Patient History
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Manage patient medical records
            </p>

          </div>

          {/* FORM */}

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-12">

            <h2 className="text-3xl font-bold text-slate-800 mb-8">
              Add Medical History
            </h2>

            <form
              onSubmit={addHistory}
              className="grid md:grid-cols-2 gap-6"
            >

              <input
                type="text"
                placeholder="Patient Name"
                value={form.patientName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    patientName:
                      e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <input
                type="text"
                placeholder="Doctor Name"
                value={form.doctorName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    doctorName:
                      e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <input
                type="text"
                placeholder="Disease"
                value={form.disease}
                onChange={(e) =>
                  setForm({
                    ...form,
                    disease:
                      e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <input
                type="text"
                placeholder="Medicines"
                value={form.medicines}
                onChange={(e) =>
                  setForm({
                    ...form,
                    medicines:
                      e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <input
                type="date"
                value={
                  form.appointmentDate
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    appointmentDate:
                      e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <textarea
                placeholder="Notes"
                value={form.notes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes:
                      e.target.value,
                  })
                }
                className="border p-4 rounded-2xl md:col-span-2"
                rows={5}
              />

              <button
                type="submit"
                className="md:col-span-2 px-6 py-4 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
              >

                Add History

              </button>

            </form>

          </div>

          {/* HISTORY LIST */}

          <div className="mt-16 space-y-8">

            {Array.isArray(history) &&
              history.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-xl p-8"
              >

                <div className="flex justify-between items-start flex-wrap gap-6">

                  <div className="space-y-4">

                    <div className="flex items-center gap-3">

                      <User className="text-blue-600" />

                      <h2 className="text-3xl font-bold text-slate-800">
                        {item.patientName}
                      </h2>

                    </div>

                    <div className="flex items-center gap-3">

                      <Stethoscope className="text-teal-600" />

                      <p className="text-lg">
                        {item.doctorName}
                      </p>

                    </div>

                    <div className="flex items-center gap-3">

                      <FileText className="text-red-500" />

                      <p className="text-lg">
                        {item.disease}
                      </p>

                    </div>

                    <div className="flex items-center gap-3">

                      <Pill className="text-purple-600" />

                      <p className="text-lg">
                        {item.medicines}
                      </p>

                    </div>

                    <div className="flex items-center gap-3">

                      <Calendar className="text-emerald-600" />

                      <p className="text-lg">
                        {item.appointmentDate}
                      </p>

                    </div>

                    {item.notes && (

                      <div className="bg-slate-100 p-4 rounded-2xl mt-4">

                        <p className="text-slate-700">
                          {item.notes}
                        </p>

                      </div>

                    )}

                  </div>

                  <button
                    onClick={() =>
                      deleteHistory(
                        item._id
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

      </main>

    </div>
  );
}
