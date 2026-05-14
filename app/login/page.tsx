"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

import Link
from "next/link";

import { supabase }
from "@/lib/supabase";

export default function LoginPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      setLoading(true);

      setError("");

      const {
        data,
        error
      } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {

        setError(
          error.message
        );

        setLoading(false);

        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      alert(
        "Login Successful"
      );

      router.push(
        "/dashboard"
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

          Login

        </h1>

        {error && (

          <p
            className="
              text-red-500
              text-center
              mb-4
            "
          >

            {error}

          </p>
        )}

        <form
          onSubmit={
            handleLogin
          }
          className="space-y-6"
        >

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
              bg-green-500
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
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

        <div
          className="
            flex
            justify-center
            gap-4
            mt-6
          "
        >

          <Link href="/register">

            <button
              className="
                px-6
                py-3
                bg-blue-500
                text-white
                rounded-xl
                hover:scale-105
                transition-all
              "
            >

              Register

            </button>

          </Link>

        </div>

      </div>

    </main>
  );
}