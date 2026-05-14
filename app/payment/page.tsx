"use client";

import Sidebar from "@/components/Sidebar";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {

  const handlePayment =
    async () => {

      const options = {

        key: "YOUR_RAZORPAY_KEY",

        amount: 50000,

        currency: "INR",

        name: "Swasthya",

        description:
          "Healthcare Consultation",

        handler: function (
          response: any
        ) {

          alert(
            "Payment Successful"
          );

          console.log(
            response
          );
        },

        theme: {
          color: "#0f766e",
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();
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
          flex
          items-center
          justify-center
        "
      >

        <div
          className="
            bg-white
            p-10
            rounded-3xl
            shadow-2xl
            w-full
            max-w-xl
            text-center
          "
        >

          <h1
            className="
              text-4xl
              font-bold
              mb-4
            "
          >

            Healthcare Payment

          </h1>

          <p
            className="
              text-slate-500
              mb-8
            "
          >

            Secure consultation payment

          </p>

          <button
            onClick={
              handlePayment
            }

            className="
              px-10
              py-5
              bg-gradient-to-r
              from-teal-600
              to-cyan-500
              text-white
              rounded-2xl
              font-bold
              text-xl
              hover:scale-105
              transition-all
            "
          >

            Pay ₹500

          </button>

        </div>

      </main>

    </div>
  );
}