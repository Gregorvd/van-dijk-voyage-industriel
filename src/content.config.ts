import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const etudesDeCas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/etudes-de-cas' }),
  schema: z.object({
    titre: z.string().min(1),
    titreEn: z.string().optional(),
    entreprise: z.string().min(1),
    pays: z.string().min(1),
    paysEn: z.string().optional(),
    ville: z.string().min(1),
    taille: z.string().min(1),
    tailleEn: z.string().optional(),
    domaine: z.string().min(1),
    domaineEn: z.string().optional(),
    tags: z.array(z.string().min(1)).min(1),
    tagsEn: z.array(z.string().min(1)).optional(),
    image: z.string().min(1),
    imageAlt: z.string().min(1),
    imageAltEn: z.string().optional(),
    duree: z.string().min(1),
    dureeEn: z.string().optional(),
    dateVisite: z.string().optional(),
    dateVisiteEn: z.string().optional(),
    contact: z.string().optional(),
    resume: z.string().min(1).max(200),
    resumeEn: z.string().max(200).optional(),
    ordre: z.number().int().min(1),
    publie: z.boolean().default(true),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
});

const etudesDeCasEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/etudes-de-cas-en' }),
  schema: z.object({
    ref: z.string().min(1),
  }),
});

export const collections = { 'etudes-de-cas': etudesDeCas, 'etudes-de-cas-en': etudesDeCasEn };
