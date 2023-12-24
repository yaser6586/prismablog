import { Inter } from "next/font/google";
import Navbar from "../ui/main/Navbar";
import { manrope, notoKufi, nunito } from "../ui/font";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${notoKufi.className}`}>
      <Navbar />
      {children}
    </div>
  );
}
