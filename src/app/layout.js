import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bogsite",
  description: "Blogging site  for boggers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=' bg-gray-50 dark:bg-gray-900'>
      <Header/>
      {children}</body>
    </html>
  );
}
