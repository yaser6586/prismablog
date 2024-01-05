import { Inter } from "next/font/google";
import Navbar from "../ui/main/Navbar";
// import { manrope, notoKufi, notoSansArabic, nunito } from "../ui/font";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div lang="fa"> {children}</div>
    </div>
  );
}
