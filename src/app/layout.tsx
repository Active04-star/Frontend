import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Chatbot from "@/components/chatbot/chatbox";
import '@fontsource-variable/onest';




export const metadata: Metadata = {
  title: "Active",
  description: "SportCenter Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className="antialiased min-h-screen flex flex-col"
        >
          {/* Contenido principal */}
          <main className="flex-grow">{children}</main>

          {/* Botón de chat flotante */}
          <Chatbot />  {/* Colocamos el chat flotante aquí */}

          {/* Footer siempre al final */}
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
