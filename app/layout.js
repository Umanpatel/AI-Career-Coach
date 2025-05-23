import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";


// Change font of the application
const inter =  Inter({subsets: ["latin"]});

export const metadata = {
  title: "AI Career Coach",
  description: "",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark, // all app pages will be in dark mode
    }}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className}`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
            forcedTheme="dark"
            suppressHydrationWarning
          >
            <Header />
            <main className="min-h-screen min-w-screen over">{children}</main>
            <Toaster richColors/>
            <footer className="container mx-auto p-4 text-center text-gray-500">
              <div>
                <p>Made with ❤️ By Umang Patel</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
