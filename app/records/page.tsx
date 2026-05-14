"use client";

import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase";

import {
  FileText,
  Upload,
  Download,
  Calendar,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";

declare global {
  interface Window {
    ethereum: any;
  }
}

const records = [
  {
    title: "Blood Test Report",
    date: "12 May 2026",
    doctor: "Dr. Raj Sharma",
  },
  {
    title: "Dental Prescription",
    date: "5 April 2026",
    doctor: "Dr. Priya Verma",
  },
];

export default function RecordsPage() {

  const [file, setFile] =
    useState<File | null>(null);

  const [hash, setHash] =
    useState("");

  // GENERATE HASH + SAVE

  const generateHash = async () => {

    if (!file) {

      alert("Upload file first");

      return;
    }

    try {

      // FILE HASH

      const arrayBuffer =
        await file.arrayBuffer();

      const hashBuffer =
        await crypto.subtle.digest(
          "SHA-256",
          arrayBuffer
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

      // WALLET ADDRESS

      let wallet = "";

      if (window.ethereum) {

        const accounts =
          await window.ethereum.request({
            method: "eth_accounts",
          });

        wallet =
          accounts[0] || "";
      }

      // SAVE TO SUPABASE

      const { error } =
        await supabase
          .from("medical_hashes")
          .insert([
            {
              file_name: file.name,
              hash: hashHex,
              wallet,
            },
          ]);

      if (error) {

        console.log(error);

        alert(
          "Failed to save hash"
        );

        return;
      }

      alert(
        "Hash saved successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong"
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

        <div className="max-w-6xl mx-auto">

          {/* HEADER */}

          <div
            className="
              flex
              justify-between
              items-center
              flex-wrap
              gap-4
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

                Health Records

              </h1>

              <p
                className="
                  text-slate-500
                  mt-3
                  text-lg
                "
              >

                Store and verify
                medical reports securely

              </p>

            </div>

          </div>

          {/* BLOCKCHAIN */}

          <div
            className="
              bg-white
              rounded-3xl
              shadow-2xl
              p-8
              mt-10
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
                mb-6
              "
            >

              <ShieldCheck
                className="text-emerald-600"
                size={40}
              />

              <div>

                <h2
                  className="
                    text-3xl
                    font-bold
                    text-slate-800
                  "
                >

                  Blockchain Verification

                </h2>

                <p className="text-slate-500">

                  Generate secure SHA-256
                  hash for reports

                </p>

              </div>

            </div>

            {/* FILE INPUT */}

            <input
              type="file"

              onChange={(e) =>
                setFile(
                  e.target.files?.[0] || null
                )
              }

              className="
                border
                p-4
                rounded-2xl
                w-full
              "
            />

            {/* BUTTON */}

            <button
              onClick={generateHash}

              className="
                mt-6
                flex
                items-center
                gap-3
                px-6
                py-4
                bg-gradient-to-r
                from-teal-600
                to-cyan-500
                text-white
                rounded-2xl
                shadow-xl
                hover:scale-105
                transition-all
                duration-300
              "
            >

              <Upload size={22} />

              Generate Blockchain Hash

            </button>

            {/* HASH */}

            {hash && (

              <div className="mt-8">

                <p
                  className="
                    font-bold
                    text-slate-700
                    mb-3
                  "
                >

                  SHA-256 Hash

                </p>

                <div
                  className="
                    bg-slate-100
                    p-5
                    rounded-2xl
                    break-all
                    text-sm
                    text-slate-700
                  "
                >

                  {hash}

                </div>

              </div>

            )}

          </div>

          {/* RECORDS */}

          <div
            className="
              grid
              md:grid-cols-2
              gap-8
              mt-12
            "
          >

            {records.map(
              (record, index) => (

              <div
                key={index}

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
                    gap-5
                  "
                >

                  <div
                    className="
                      bg-teal-100
                      p-5
                      rounded-2xl
                    "
                  >

                    <FileText
                      className="text-teal-700"
                      size={40}
                    />

                  </div>

                  <div>

                    <h2
                      className="
                        text-2xl
                        font-bold
                        text-slate-800
                      "
                    >

                      {record.title}

                    </h2>

                    <p
                      className="
                        text-slate-500
                        mt-2
                      "
                    >

                      {record.doctor}

                    </p>

                  </div>

                </div>

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    mt-8
                    flex-wrap
                    gap-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-slate-500
                    "
                  >

                    <Calendar size={18} />

                    {record.date}

                  </div>

                  <button
                    className="
                      flex
                      items-center
                      gap-2
                      px-5
                      py-3
                      bg-teal-600
                      text-white
                      rounded-2xl
                      hover:bg-teal-700
                      transition-all
                      duration-300
                    "
                  >

                    <Download size={18} />

                    Download

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