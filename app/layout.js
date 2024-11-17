import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get Me a Chai - Funds Your Projects with Chai",
  description: "This website is a croudFunding Platform for creators Lovers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
        <Navbar />
        <div className="min-h-[82.7vh] text-white bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)]">
          {children}
        </div>
        <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
