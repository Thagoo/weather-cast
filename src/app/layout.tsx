import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "next-themes";

const jost = Jost({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: `%s | WeatherCast`, default: "WeatherCast" },
  description: "WeatherCast is Weather Forecasting site",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen py-4 overflow-x-hidden overflow-y-auto gap-4">
            <Header />

            <div className="flex-grow ">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
