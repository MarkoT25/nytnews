"use server";

import { z } from "zod";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { sendVerificationEmail } from "./mail";

const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

// export async function registerUser(prevState: any, formData: FormData) {

//     const data = Object.fromEntries(formData.entries());
//     const parsedData = signupSchema.safeParse(data);

//     if (!parsedData.success) {
//         return { error: parsedData.error.format() };
//     }

//     const { email, firstName, lastName, password, confirmPassword } = parsedData.data;

//     if (password !== confirmPassword) {
//         return {
//             error: {
//                 confirmPassword: {
//                     _errors: ["Passwords don't match"],
//                 },
//             },
//         }
//     }

//     const existingUser = await prisma.user.findUnique({
//         where: { email },
//     });

//     if (existingUser) {
//         return { error: { email: { _errors: ["Email already exists"] } } };
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await prisma.user.create({
//         data: {
//             email,
//             firstName,
//             lastName,
//             passwordHash: hashedPassword,
//         },
//     });
//     return { success: true, user };
// }

export async function registerUser(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsedData = signupSchema.safeParse(data);

  if (!parsedData.success) {
    return { error: parsedData.error.format() };
  }

  const { email, firstName, lastName, password, confirmPassword } =
    parsedData.data;

  if (password !== confirmPassword) {
    return {
      error: {
        confirmPassword: {
          _errors: ["Passwords don't match"],
        },
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: { email: { _errors: ["Email already exists"] } } };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      passwordHash: hashedPassword,
      emailVerified: false,
      verificationToken,
    },
  });

  const emailResult = await sendVerificationEmail(email, verificationToken);

  if (!emailResult.success) {
    return {
      error: {
        _errors: ["Failed to send verification email. Please try again."],
      },
    };
  }

  return { success: true, user };
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function loginUser(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsedData = loginSchema.safeParse(data);

  if (!parsedData.success) {
    return { error: parsedData.error.format() };
  }

  const { email, password } = parsedData.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: { email: { _errors: ["User not found."] } } };
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return { error: { password: { _errors: ["Invalid email or password!"] } } };
  }

  if (!user.emailVerified) {
    return {
      error: {
        email: {
          _errors: ["Please verify your email before logging in."],
        },
      },
    };
  }

  await createSession(user.id);
  redirect("/");
}

export async function logoutUser() {
  await deleteSession();
  redirect("/login");
}
