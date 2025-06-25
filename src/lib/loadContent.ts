// src/lib/loadContent.ts
import fs from 'node:fs/promises';
import {parseStringPromise} from 'xml2js';

export async function getContent(locale: string) {
  // ✅ remplace par un fetch :
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/langues/content.xml`);
const xml = await res.text();
  const data: any = await parseStringPromise(xml);
  return data.portfolio.lang.find((l: any) => l.$.code === locale);
}

