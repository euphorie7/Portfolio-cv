// app/layout.tsx  ← root layout (obligatoire)
import './globals.css';            // ✅ import global Tailwind

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}

