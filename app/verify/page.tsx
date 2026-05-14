"use client";

import Sidebar from "@/components/Sidebar";

import { supabase } from "@/lib/supabase";

import {
  ShieldCheck,
  ShieldX,
  Search,
} from "lucide-react";

import { useState } from "react";

import { Scanner } from "@yudiel/react-qr-scanner";

export default function VerifyPage() {

  const [hash, setHash] =
    useState("");

  const [result, setResult] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const verifyPrescription =
    async (
      customHash?: string
    ) => {

      const finalHash =
        customHash || hash;

      if (!finalHash) {

        alert("Enter hash");

        return;
      }

      setLoading(true);

      const { data, error } =
        await supabase
          .from("prescriptions")
          .select("*")
          .eq(
            "prescription_hash",
            finalHash
          )
          .single();

      setLoading(false);

      if (error || !data) {

        setResult(false);

        return;
      }

      setResult(data);
    };

  return (

    <div className="flex">

      <Sidebar />

      <main
        className="
          flex-1
          min-h-screen
          bg-gradient-to-br
          from-slate-50
          via-blue-50
          to-emerald-50
          p-8
        "
      >

        <div className="max-w-4xl mx-auto">

          <div
            className="
              bg-white
              rounded-3xl
              shadow-2xl
              p-10
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
                mb-8
              "
            >

              <Search
                className="text-teal-600"
                size={45}
              />

              <div>

                <h1
                  className="
                    text-4xl
                    font-bold
                    text-slate-800
                  "
                >

                  Verify Prescription

                </h1>

                <p className="text-slate-500">

                  Check blockchain authenticity

                </p>

              </div>

            </div>

            {/* QR SCANNER */}

            <div
              className="
                mb-8
                overflow-hidden
                rounded-3xl
                border
              "
            >

              <Scanner
                constraints={{
                  facingMode:
                    "environment",
                }}
                onScan={(result) => {

                  if (
                    result?.[0]?.rawValue
                  ) {

                    const text =
                      result[0].rawValue;

                    setHash(text);

                    verifyPrescription(
                      text
                    );
                  }

                }}
                onError={(error) => {

                  console.log(
                    error
                  );

                }}
                styles={{
                  container: {
                    width: "100%",
                  },
                }}
              />

            </div>

            {/* INPUT */}

            <textarea
              placeholder="
Enter SHA-256 hash
              "

              value={hash}

              onChange={(e) =>
                setHash(
                  e.target.value
                )
              }

              className="
                w-full
                border
                p-5
                rounded-2xl
                h-40
                mb-6
              "
            />

            {/* BUTTON */}

            <button
              onClick={() =>
                verifyPrescription()
              }

              className="
                px-8
                py-4
                bg-gradient-to-r
                from-teal-600
                to-cyan-500
                text-white
                rounded-2xl
                font-bold
                hover:scale-105
                transition-all
              "
            >

              Verify Prescription

            </button>

            {/* LOADING */}

            {loading && (

              <p className="mt-6">

                Verifying...

              </p>

            )}

            {/* VERIFIED */}

            {result &&
              typeof result ===
                "object" && (

              <div
                className="
                  mt-10
                  bg-emerald-50
                  border
                  border-emerald-200
                  p-8
                  rounded-3xl
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mb-5
                  "
                >

                  <ShieldCheck
                    className="
                      text-emerald-600
                    "
                    size={40}
                  />

                  <h2
                    className="
                      text-3xl
                      font-bold
                      text-emerald-700
                    "
                  >

                    Verified

                  </h2>

                </div>

                <div className="space-y-4">

                  <p>

                    <span className="font-bold">

                      Patient:

                    </span>

                    {" "}
                    {result.patient_name}

                  </p>

                  <p>

                    <span className="font-bold">

                      Doctor:

                    </span>

                    {" "}
                    {result.doctor_name}

                  </p>

                  <p>

                    <span className="font-bold">

                      Medicines:

                    </span>

                    {" "}
                    {result.medicines}

                  </p>

                </div>

              </div>

            )}

            {/* FAILED */}

            {result === false && (

              <div
                className="
                  mt-10
                  bg-red-50
                  border
                  border-red-200
                  p-8
                  rounded-3xl
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <ShieldX
                    className="
                      text-red-600
                    "
                    size={40}
                  />

                  <h2
                    className="
                      text-3xl
                      font-bold
                      text-red-700
                    "
                  >

                    Invalid Prescription

                  </h2>

                </div>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}