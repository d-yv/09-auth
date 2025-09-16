"use client";

import { useState } from "react";
import css from "./SignInPage.module.css";
import { login, type LoginRequest } from "@/lib/api/clientApi";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignIn() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const formData = new FormData(event.currentTarget);
      const formValues = Object.fromEntries(formData.entries()) as LoginRequest;

      const res = await login(formValues);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      if (isAxiosError(err)) {
        setError(
          err.response?.data?.message || "An error occurred. Please try again."
        );
      } else {
        setError("Unexpected error. Please try again.");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleLogin}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
