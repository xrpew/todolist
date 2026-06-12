import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow — Gestor de Tareas Premium",
  description: "Organiza tus tareas diarias con una interfaz moderna, limpia y de alto rendimiento.",
  keywords: ["todo list", "tasks", "gestor tareas", "golang", "nextjs", "docker"],
  authors: [{ name: "Antigravity Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
