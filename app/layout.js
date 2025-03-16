import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";


// Change font of the application
const inter =  Inter({subsets: ["georgia"]});

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
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            suppressHydrationWarning
          >
            <Header />
            <main className="min-h-screen min-w-screen">{children}</main>
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
