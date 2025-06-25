// src/lib/loadContent.ts
import fs from 'node:fs/promises';
import {parseStringPromise} from 'xml2js';

export async function getContent(locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://portfolio-cv.vercel.app'; // remplace par ton URL
  const res = await fetch(`${baseUrl}/langues/content.xml`);
  const xml = await res.text();
  const data: any = await parseStringPromise(xml);
  return data.portfolio.lang.find((l: any) => l.$.code === locale);
}

