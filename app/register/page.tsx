"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default function RegisterPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e: any) => {

      e.preventDefault();

      setLoading(true);

      try {

        // REGISTER USER

        const {
          data,
          error,
        } = await supabase.auth.signUp({
          email: form.email,

          password:
            form.password,

          options: {
            data: {
              name:
                form.name,
            },
          },
        });

        console.log(
          "SUPABASE REGISTER:",
          data
        );

        // ERROR

        if (error) {

          alert(
            error.message
          );

          setLoading(false);

          return;
        }

        // SAVE PROFILE

        if (data.user) {

          const {
            error:
              profileError,
          } =
            await supabase
              .from(
                "profiles"
              )
              .insert([
                {
                  id:
                    data.user.id,

                  name:
                    form.name,

                  email:
                    form.email,

                  role:
                    "patient",
                },
              ]);

          if (
            profileError
          ) {

            console.log(
              profileError
            );
          }
        }

        alert(
          "Registration Successful"
        );

        router.push(
          "/login"
        );

      } catch (error) {

        console.log(
          error
        );

        alert(
          "Something went wrong"
        );
      }

      setLoading(false);
    };

  return (

    <div
      className="
        min-h-screen
        flex items-center
        justify-center
        bg-gradient-to-br
        from-blue-100
        via-white
        to-cyan-100
      "
    >

      <div
        className="
          bg-white
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
            text-slate-800
            mb-8
            text-center
          "
        >

          Register

        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="
            space-y-5
          "
        >

          {/* NAME */}

          <input
            type="text"

            placeholder="
              Enter Name
            "

            value={
              form.name
            }

            className="
              border
              p-4
              w-full
              rounded-xl
            "

            onChange={(e) =>
              setForm({
                ...form,

                name:
                  e.target
                    .value,
              })
            }
          />

          {/* EMAIL */}

          <input
            type="email"

            placeholder="
              Enter Email
            "

            value={
              form.email
            }

            className="
              border
              p-4
              w-full
              rounded-xl
            "

            onChange={(e) =>
              setForm({
                ...form,

                email:
                  e.target
                    .value,
              })
            }
          />

          {/* PASSWORD */}

          <input
            type="password"

            placeholder="
              Enter Password
            "

            value={
              form.password
            }

            className="
              border
              p-4
              w-full
              rounded-xl
            "

            onChange={(e) =>
              setForm({
                ...form,

                password:
                  e.target
                    .value,
              })
            }
          />

          {/* BUTTON */}

          <button
            type="submit"

            disabled={
              loading
            }

            className="
              bg-blue-500
              text-white
              px-6
              py-4
              rounded-xl
              w-full
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

        {/* LOGIN */}

        <div
          className="
            mt-6
            text-center
          "
        >

          <p
            className="
              text-slate-600
            "
          >

            Already have
            an account?

          </p>

          <Link
            href="/login"
          >

            <button
              className="
                mt-3
                px-6
                py-3
                bg-green-500
                text-white
                rounded-xl
                hover:scale-105
                transition-all
              "
            >

              Login

            </button>

          </Link>

        </div>

      </div>

    </div>
  );
}