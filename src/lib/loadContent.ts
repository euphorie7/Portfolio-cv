// src/lib/loadContent.ts
import fs from 'node:fs/promises';
import {parseStringPromise} from 'xml2js';

export async function getContent(locale: string) {
  const xml = await fs.readFile('langues/content.xml', 'utf8');
  const data: any = await parseStringPromise(xml);
  return data.portfolio.lang.find((l: any) => l.$.code === locale);
}

