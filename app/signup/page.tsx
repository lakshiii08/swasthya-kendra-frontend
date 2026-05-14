"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

import { supabase }
from "@/lib/supabase";

export default function RegisterPage() {

  const router =
    useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleRegister =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      setLoading(true);

      setError("");

      const {
        error
      } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

      if (error) {

        setError(
          error.message
        );

        setLoading(false);

        return;
      }

      alert(
        "Registration Successful"
      );

      router.push(
        "/login"
      );
    };

  return (

    <main
      className="
        min-h-screen
        flex items-center
        justify-center
        bg-black
        p-6
      "
    >

      <div
        className="
          bg-zinc-900
          p-10
          rounded-3xl
          shadow-2xl
          w-full
          max-w-md
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            text-white
            mb-8
            text-center
          "
        >

          Register

        </h1>

        {error && (

          <p
            className="
              text-red-500
              mb-4
              text-center
            "
          >

            {error}

          </p>
        )}

        <form
          onSubmit={
            handleRegister
          }
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="
              w-full
              p-4
              rounded-xl
              text-black
            "
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              w-full
              p-4
              rounded-xl
              text-black
            "
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full
              p-4
              rounded-xl
              text-black
            "
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-4
              bg-blue-500
              text-white
              rounded-xl
              text-lg
              font-semibold
              hover:scale-105
              transition-all
              duration-300
            "
          >

            {loading
              ? "Creating..."
              : "Register"}

          </button>

        </form>

      </div>

    </main>
  );
}