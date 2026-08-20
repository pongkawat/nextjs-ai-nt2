import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Inter,
  Fira_Code,
  Prompt,
} from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plusjakarta",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-firacode",
});

const prompt = Prompt({
  weight: ["400", "500", "700"],
  subsets: ["thai"],
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ระบบ ล็อกอิน",
  description: "เรียนรู้การเขียน Nex.tjs",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(
        prompt.className,
        "font-sans",
        plusJakartaSans.variable,
        inter.variable,
        firaCode.variable,
        prompt.variable
      )}
    >
      <body>{children}</body>
    </html>
  );
}