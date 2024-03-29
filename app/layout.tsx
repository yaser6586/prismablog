import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

import Footer from "./ui/main/Footer";
import Provider from "./(post)/Provider";
// import localFont from "next/font/local";

// export const NotoNaskhArabic = localFont({
//   src: "../font/NotoNaskhArabic-VariableFont_wght.ttf",
// });
// export const NotoKufiArabic = localFont({
//   src: "../font/NotoKufiArabic-VariableFont_wght.ttf",
// });

// const NotoSansArabic = localFont({
//   src: "../font/NotoSansArabic-VariableFont_wdth,wght.ttf",
// });

// const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "مجله تکنولوژی تک نکست",
  description:
    " اخبار تکنولوژی و دنیای گجتها،خبر جدید ، گوشی همراه ، اخبار موضوعات مختلف و محصولات جدید، سامسونگ ، آیفون ، لپ تاپ ، ایسوس و... ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Provider>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
