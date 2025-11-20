import "./globals.css";
import { Inter } from 'next/font/google';
import { AuthProvider } from "@/context/AuthContext";
import { TravelProvider } from "@/context/TravelContext";
import { TravelDataProvider } from "@/context/TravelDataContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "TravelHub - Meet. Match. Travel.",
  description: "Travio is a social travel platform designed to connect solo and group travelers worldwide. It emphasizes trust, safety, and personalized experiences while providing essential travel services like accommodations, restaurants, adventure spots, and other necessities. AI-driven features enhance trip planning, matching, and safety, while sponsored content and recommendations create monetization opportunities"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <TravelDataProvider>
            <TravelProvider>
              <Header />
              <main className="min-h-[60vh]">{children}</main>
              <Footer />
            </TravelProvider>
          </TravelDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
