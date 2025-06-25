// components/LocaleSwitch.tsx
import Link from 'next/link';

const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
];

export default function LocaleSwitch({ locale }: { locale: string }) {
  return (
    <div className="flex gap-3 items-center">
      {languages.map((l) => (
        <Link
          key={l.code}
          href={`/${l.code}`}
          className={`px-3 py-1 rounded-full border text-sm transition hover:bg-gray-100 ${
            l.code === locale ? 'bg-gray-200 font-semibold' : 'text-gray-600'
          }`}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}

