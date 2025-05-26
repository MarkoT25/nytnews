"use client";

import React, { useActionState } from "react";
import { registerUser } from "@/lib/auth";
import styles from "./RegisterForm.module.scss";
import Link from "next/link";
import { SubmitButton } from "../LoginPage/SubmitButton";
import { IoMailOutline } from "react-icons/io5";

export const RegisterForm = () => {
  const [state, registerAction] = useActionState(registerUser, undefined);
  const isSuccessful = state?.success === true;
  return (
    <div className={styles.registerContainer}>
      {isSuccessful ? (
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>
            <IoMailOutline size={48} />
          </div>
          <h2>Registration Successful!</h2>
          <p>
            We&apos;ve sent a verification email to your inbox. Please check
            your email and click the verification link to activate your account.
          </p>
          <p className={styles.emailNote}>
            If you don&apos;t see the email, please check your spam folder.
          </p>
          <Link href="/login" className={styles.loginLink}>
            Return to Login
          </Link>
        </div>
      ) : (
        <form action={registerAction} className={styles.registerForm}>
          <h2>Create Account</h2>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                required
                placeholder="John"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                required
                placeholder="Doe"
              />
            </div>
          </div>

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
              placeholder="Create a secure password"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirm your password"
            />
            {state?.error?.confirmPassword?._errors && (
              <p className={styles.errorMessage}>
                {state.error.confirmPassword._errors.join(", ")}
              </p>
            )}
          </div>

          <p className={styles.terms}>
            By creating an account, you agree to our{" "}
            <Link href="">Terms of Service</Link> and{" "}
            <Link href="">Privacy Policy</Link>.
          </p>

          <SubmitButton
            text="Create Account"
            loadingText="Creating Account..."
          />

          <div className={styles.registerFooter}>
            <p>
              Already have an account? <Link href="/login">Log in</Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
