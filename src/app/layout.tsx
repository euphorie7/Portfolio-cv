// app/layout.tsx  ← root layout (obligatoire)
import './globals.css';            // ✅ import global Tailwind

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <html lang="fr">
     <head>
      <title>Portfolio – Hamza Laouni</title>
      <meta
        name="description"
        content="Portfolio multilingue d’Hamza Laouni – Développeur full-stack."
      />
     </head>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}

