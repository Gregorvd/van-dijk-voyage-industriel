import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const etudesDeCas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/etudes-de-cas' }),
  schema: z.object({
    titre: z.string().min(1),
    entreprise: z.string().min(1),
    pays: z.string().min(1),
    ville: z.string().min(1),
    taille: z.string().min(1),
    domaine: z.string().min(1),
    tags: z.array(z.string().min(1)).min(1),
    image: z.string().min(1),
    imageAlt: z.string().min(1),
    duree: z.string().min(1),
    dateVisite: z.string().optional(),
    contact: z.string().optional(),
    resume: z.string().min(1).max(200),
    ordre: z.number().int().min(1),
    publie: z.boolean().default(true),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
});

export const collections = { 'etudes-de-cas': etudesDeCas };
