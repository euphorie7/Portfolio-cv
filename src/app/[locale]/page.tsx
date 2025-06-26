// app/[locale]/page.tsx
import { getContent } from '@/lib/loadContent';
import Image from 'next/image';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const p = await getContent(locale);

  const profil = p.profile[0];
  const skills = p.skills[0].category;
  const projects = p.projects[0].project;
  const education = p.education[0].item;
  const video = p.video?.[0];
  const videoUrl = video?.url?.[0];

  return (
    <div
      className="flex flex-col lg:flex-row gap-0"
      vocab="https://schema.org/"
      typeof="Person"
    >
      {/* ---------------- Sidebar ---------------- */}
      <aside
        resource="#sidebar"
        typeof="WPAside"
        className="fixed left-0 top-0 h-screen w-80 bg-gradient-to-b from-gray-100 to-gray-200 px-6 py-8 shadow-lg overflow-y-auto space-y-6 z-20"
      >
        {/* Photo */}
        <div className="flex justify-center mb-4" property="image" typeof="ImageObject">
          <div className="relative w-40 h-40 overflow-hidden rounded-full ring-4 ring-gray-300 hover:scale-105 transition">
            {profil.photo?.[0]?.$?.src && (
              <Image
                src={profil.photo[0].$.src}
                alt={profil.photo[0].$.alt || 'photo'}
                fill
                className="object-cover"
                property="contentUrl"
              />
            )}
          </div>
        </div>

        {/* Infos principales */}
        <div className="text-center space-y-1" typeof="ContactPoint" property="contactPoint">
          <h1 className="text-2xl font-bold" property="name">
            {profil.name[0]}
          </h1>
          <p className="text-sm text-gray-700">
            <span property="birthDate">{profil.age[0]}</span> ans •{' '}
            <span property="address">{profil.location[0]}</span>
          </p>
          <div className="space-y-0.5">
            <a
              href={`mailto:${profil.email[0]}`}
              className="block underline hover:text-blue-600"
              property="email"
            >
              {profil.email[0]}
            </a>
            <a
              href={`tel:${profil.phone[0].replace(/\s+/g, '')}`}
              className="block underline hover:text-blue-600"
              property="telephone"
            >
              {profil.phone[0]}
            </a>
            <a
              href={profil.linkedin[0].$.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-600 underline mb-2"
              property="sameAs"
            >
              LinkedIn
            </a>
            <a
              href={profil.github[0].$.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-600 underline"
              property="sameAs"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Intérêts */}
        <section typeof="ItemList" property="knowsAbout">
          <h2 className="font-semibold">Intérêts</h2>
          <ul className="list-disc list-inside text-sm">
            {profil.interests[0].item.map((it: string, i: number) => (
              <li key={`${it}-${i}`} property="itemListElement">
                {it}
              </li>
            ))}
          </ul>
        </section>

        {/* Langues */}
        <section typeof="ItemList" property="knowsLanguage">
          <h2 className="font-semibold">Langues</h2>
          <ul className="text-sm space-y-0.5">
            {profil.languages[0].lang.map((l: any, i: number) => (
              <li key={`${l.$.name}-${i}`} className="flex items-center gap-1" property="itemListElement">
                <span className="font-medium" property="name">{l.$.name}</span>
                <span className="text-xs text-gray-600">({l.$.level})</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Compétences */}
        <section typeof="ItemList" property="hasSkill">
          <h2 className="font-semibold">Compétences</h2>
          <ul className="text-sm space-y-2">
            {skills.map((cat: any, i: number) => (
              <li
                key={`${cat['@_name']}-${i}`}
                className="bg-white hover:bg-gray-50 transition p-3 rounded-lg shadow-sm"
                property="itemListElement"
                typeof="DefinedTerm"
              >
                <span className="font-medium block text-gray-800" property="name">
                  {cat['@_name']}
                </span>
                <span className="text-xs text-gray-600" property="description">
                  {cat.skill.join(', ')}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      {/* ---------------- Main ---------------- */}
      <main className="flex-1 ml-0 lg:ml-80 space-y-12 px-4 py-10 bg-gray-50" resource="#main" typeof="WebPageElement">
        {/* À propos */}
        <section typeof="AboutPage" property="about">
          <h2 className="text-2xl font-semibold mb-3">À propos</h2>
          <p property="description" className="leading-relaxed text-gray-800">
            {p.about[0]}
          </p>
        </section>

        {/* Formation – Carousel */}
        <section resource="#education" typeof="ItemList" property="alumniOf">
          <h2 className="text-2xl font-semibold mb-3">Formation</h2>
          <p className="text-sm text-gray-500 mb-2">Glissez ou utilisez les flèches</p>
          <Carousel className="relative">
            <CarouselPrevious />
            <CarouselContent className="m-3">
              {education.map((e: any, i: number) => (
                <CarouselItem
                  key={`${i}-edu`} className="p-2" typeof="EducationalOccupationalProgram" property="itemListElement">
                  <Card className="h-full bg-white/80 hover:bg-white transition">
                    <CardContent className="py-4 space-y-1">
                      <p className="font-medium" property="name">
                        {e.label[0]} <span className="text-xs text-gray-500">({e.year[0]})</span>
                      </p>
                      <p className="text-sm text-gray-600" property="provider">{e.place[0]}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </section>

        {/* Projets – Carousel */}
        <section resource="#projects" typeof="ItemList" property="hasPart">
          <h2 className="text-2xl font-semibold mb-3">Projets</h2>
          <p className="text-sm text-gray-500 mb-2">Glissez ou utilisez les flèches</p>
          <Carousel className="relative">
            <CarouselPrevious />
            <CarouselContent className="m-3">
              {projects.map((proj: any, i: number) => (
                <CarouselItem
                  key={`${proj['@_code']}-${i}`}
                  className="p-2"
                  resource={`#${proj['@_code']}`}
                  typeof="CreativeWork"
                  property="itemListElement"
                >
                  <Card className="h-full bg-white/80 hover:bg-white transition">
                    <CardContent className="space-y-1 py-4">
                      <h3 property="name" className="font-medium">
                        {proj.name[0]}
                      </h3>
                      <p className="text-xs text-gray-500" property="dateCreated">
                        {proj.period[0]} · {proj.tools}
                      </p>
                      <p property="description" className="text-sm text-gray-700">
                        {proj.desc[0]}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </section>

        {/* Vidéo */}
        {videoUrl && (
          <section resource="#video1" typeof="VideoObject" property="hasPart">
            <h2 className="text-2xl font-semibold mb-3" property="name">
              {video?.title?.[0] || 'Présentation vidéo'}
            </h2>
            <div className="aspect-video w-full max-w-3xl mx-auto">
              <iframe
                src={videoUrl}
                title="Présentation vidéo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg shadow-lg"
                property="embedUrl"
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

