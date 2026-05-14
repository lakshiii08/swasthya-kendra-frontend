"use client";

import Sidebar from "@/components/Sidebar";

import { QRCodeCanvas } from "qrcode.react";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

import jsPDF from "jspdf";

import {
  ShieldCheck,
  FileText,
  Download,
} from "lucide-react";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function PrescriptionPage() {

  const [patientName, setPatientName] =
    useState("");

  const [doctorName, setDoctorName] =
    useState("");

  const [medicines, setMedicines] =
    useState("");

  const [hash, setHash] =
    useState("");

  const generatePrescription =
    async () => {

      try {

        const prescriptionData =
          `
          Patient:${patientName}
          Doctor:${doctorName}
          Medicines:${medicines}
          `;

        // HASH

        const encoder =
          new TextEncoder();

        const data =
          encoder.encode(
            prescriptionData
          );

        const hashBuffer =
          await crypto.subtle.digest(
            "SHA-256",
            data
          );

        const hashArray =
          Array.from(
            new Uint8Array(hashBuffer)
          );

        const hashHex =
          hashArray
            .map((b) =>
              b
                .toString(16)
                .padStart(2, "0")
            )
            .join("");

        setHash(hashHex);

        // WALLET

        let wallet = "";

        if (window.ethereum) {

          const accounts =
            await window.ethereum.request({
              method:
                "eth_accounts",
            });

          wallet =
            accounts[0] || "";
        }

        // SAVE TO SUPABASE

        const { error } =
          await supabase
            .from(
              "prescriptions"
            )
            .insert([
              {
                patient_name:
                  patientName,

                doctor_name:
                  doctorName,

                medicines,

                prescription_hash:
                  hashHex,

                wallet,
              },
            ]);

        if (error) {

          console.log(error);

          alert(
            "Failed to save"
          );

          return;
        }

        alert(
          "Prescription verified on blockchain"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Something went wrong"
        );
      }
    };

  // DOWNLOAD PDF

  const downloadPDF =
    () => {

      try {

        const pdf =
          new jsPDF(
            "p",
            "mm",
            "a4"
          );

        pdf.setFontSize(22);

        pdf.text(
          "Swasthya Prescription",
          20,
          20
        );

        pdf.setFontSize(14);

        pdf.text(
          `Patient Name: ${patientName}`,
          20,
          40
        );

        pdf.text(
          `Doctor Name: ${doctorName}`,
          20,
          55
        );

        pdf.text(
          "Medicines:",
          20,
          70
        );

        const medicineLines =
          pdf.splitTextToSize(
            medicines,
            160
          );

        pdf.text(
          medicineLines,
          20,
          80
        );

        pdf.text(
          "Blockchain Hash:",
          20,
          130
        );

        const hashLines =
          pdf.splitTextToSize(
            hash,
            160
          );

        pdf.text(
          hashLines,
          20,
          140
        );

        pdf.text(
          "Blockchain Verified Prescription",
          20,
          190
        );

        pdf.save(
          "swasthya-prescription.pdf"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to generate PDF"
        );
      }
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

            {/* HEADER */}

            <div
              className="
                flex
                items-center
                gap-4
                mb-8
              "
            >

              <ShieldCheck
                className="text-emerald-600"
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

                  Blockchain Prescription

                </h1>

                <p className="text-slate-500">

                  Secure healthcare verification

                </p>

              </div>

            </div>

            {/* PATIENT */}

            <input
              type="text"

              placeholder="Patient Name"

              value={patientName}

              onChange={(e) =>
                setPatientName(
                  e.target.value
                )
              }

              className="
                w-full
                border
                p-4
                rounded-2xl
                mb-5
              "
            />

            {/* DOCTOR */}

            <input
              type="text"

              placeholder="Doctor Name"

              value={doctorName}

              onChange={(e) =>
                setDoctorName(
                  e.target.value
                )
              }

              className="
                w-full
                border
                p-4
                rounded-2xl
                mb-5
              "
            />

            {/* MEDICINES */}

            <textarea
              placeholder="Medicines"

              value={medicines}

              onChange={(e) =>
                setMedicines(
                  e.target.value
                )
              }

              className="
                w-full
                border
                p-4
                rounded-2xl
                mb-6
                h-40
              "
            />

            {/* BUTTONS */}

            <div className="flex gap-4 flex-wrap">

              <button
                onClick={
                  generatePrescription
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

                Generate Prescription

              </button>

              {hash && (

                <button
                  onClick={
                    downloadPDF
                  }

                  className="
                    px-8
                    py-4
                    bg-gradient-to-r
                    from-emerald-600
                    to-green-500
                    text-white
                    rounded-2xl
                    font-bold
                    hover:scale-105
                    transition-all
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Download size={22} />

                  Download PDF

                </button>

              )}

            </div>

            {/* HASH + QR */}

            {hash && (

              <div className="mt-10">

                {/* HASH TITLE */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mb-4
                  "
                >

                  <FileText
                    className="text-teal-600"
                  />

                  <h2
                    className="
                      text-2xl
                      font-bold
                    "
                  >

                    Blockchain Hash

                  </h2>

                </div>

                {/* HASH BOX */}

                <div
                  className="
                    bg-slate-100
                    p-5
                    rounded-2xl
                    break-all
                    text-sm
                  "
                >

                  {hash}

                </div>

                {/* QR */}

                <div className="mt-8">

                  <h2
                    className="
                      text-2xl
                      font-bold
                      mb-4
                    "
                  >

                    Verification QR

                  </h2>

                  <div
                    className="
                      bg-white
                      p-6
                      rounded-2xl
                      inline-block
                      shadow-lg
                    "
                  >

                    <QRCodeCanvas
                      value={hash}
                      size={220}
                    />

                  </div>

                </div>

                {/* VERIFIED BADGE */}

                <div
                  className="
                    mt-8
                    bg-emerald-100
                    border
                    border-emerald-300
                    text-emerald-700
                    p-5
                    rounded-2xl
                    font-semibold
                  "
                >

                  ✅ Blockchain Verified Prescription

                </div>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}