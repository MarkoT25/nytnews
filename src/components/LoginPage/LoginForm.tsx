"use client";

import { loginUser } from "@/lib/auth";
import React, { useActionState } from "react";
import styles from "./LoginForm.module.scss";
import Link from "next/link";
import { SubmitButton } from "./SubmitButton";

export const LoginForm = () => {
  const [state, loginAction] = useActionState(loginUser, undefined);
  return (
    <div className={styles.loginContainer}>
      <form action={loginAction} className={styles.loginForm}>
        <h2>Welcome Back</h2>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="your.email@example.com"
          />
          {state?.error?.email?._errors && (
            <p className={styles.errorMessage}>
              {state.error.email._errors.join(", ")}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            placeholder="Your password"
          />
          {state?.error?.password?._errors && (
            <p className={styles.errorMessage}>
              {state.error.password._errors.join(", ")}
            </p>
          )}
        </div>

        <SubmitButton text="Log in" loadingText="Logging in..." />

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <div className={styles.loginFooter}>
          <p>
            Don&apos;t have an account? <Link href="/register">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};
