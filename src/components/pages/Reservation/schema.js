import * as z from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Prénom requis (min 2 caractères)"),
  lastName: z.string().min(2, "Nom requis (min 2 caractères)"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(/^[0-9+\s]{10,}$/, "Téléphone invalide (10+ chiffres)"),
  lieuLivraison: z.string().min(1, "Sélectionnez un lieu de livraison"),
  lieuRecuperation: z.string().min(1, "Sélectionnez un lieu de récupération"),
  notes: z.string().optional(),
});