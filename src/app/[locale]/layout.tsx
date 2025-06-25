// app/[locale]/layout.tsx
import LocaleSwitch from '@/components/LocaleSwitch';

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  return (
     <>
      {/* en-tête avec sélecteur de langue */}
      <header className="p-4 border-b flex justify-end">
        <LocaleSwitch locale={locale} />
      </header>

      {/* le <main> reste uniquement dans la page (page.tsx) */}
      <div lang={locale} className="container mx-auto p-6">
        {props.children}
      </div>
    </>
  );
}

