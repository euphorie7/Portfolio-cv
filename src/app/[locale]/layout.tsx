// app/[locale]/layout.tsx
import LocaleSwitch from '@/components/LocaleSwitch';

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  return (
    <div lang={locale}>
      <header className="p-4 border-b flex justify-end">
        <LocaleSwitch locale={locale} />   {/* ← ici */}
      </header>

      <main className="container mx-auto p-6">{props.children}</main>
    </div>
  );
}

