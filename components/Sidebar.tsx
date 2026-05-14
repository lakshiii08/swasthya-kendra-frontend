"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Calendar,
  FileText,
  MessageCircle,
  CreditCard,
  CheckCircle2,
  HeartPulse,
  LogOut,
  ClipboardList,
  ShieldCheck
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function Sidebar() {

  const router = useRouter();

  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    router.push("/login");
  };

  const links = [

    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard
    },

    {
      name: "Appointments",
      href: "/appointments",
      icon: Calendar
    },

    {
      name: "Patient History",
      href: "/patient-history",
      icon: ClipboardList
    },

    {
      name: "Reports",
      href: "/reports",
      icon: FileText
    },

    {
      name: "Verify Prescription",
      href: "/verify",
      icon: ShieldCheck
    },

    {
      name: "AI Assistant",
      href: "/ai-chat",
      icon: MessageCircle
    },

    {
      name: "Payments",
      href: "/payment",
      icon: CreditCard
    },

    {
      name: "Success",
      href: "/success",
      icon: CheckCircle2
    }

  ];

  return (

    <aside className="w-72 min-h-screen bg-gradient-to-b from-teal-700 to-cyan-600 text-white p-6 shadow-2xl flex flex-col justify-between">

      <div>

        {/* LOGO */}

        <div className="flex items-center gap-3 mb-12">

          <HeartPulse size={38} />

          <div>

            <h1 className="text-2xl font-bold">
              Swasthya
            </h1>

            <p className="text-sm opacity-80">
              Healthcare System
            </p>

          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="space-y-4">

          {links.map((link, index) => (

            <Link
              key={index}
              href={link.href}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 group"
            >

              <link.icon
                size={24}
                className="group-hover:scale-110 transition-all duration-300"
              />

              <span className="text-lg font-medium">
                {link.name}
              </span>

            </Link>

          ))}

        </nav>

      </div>

      {/* LOGOUT BUTTON */}

      <button
        onClick={handleLogout}
        className="
          flex items-center gap-4
          px-5 py-4
          rounded-2xl
          bg-red-500/90
          hover:bg-red-600
          transition-all duration-300
          group
        "
      >

        <LogOut
          size={24}
          className="group-hover:scale-110 transition-all duration-300"
        />

        <span className="text-lg font-medium">
          Logout
        </span>

      </button>

    </aside>
  );
}