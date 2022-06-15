import { ref, string } from "yup";

export const nameSchema = string()
  .required("Champ obligatoire.")
  .matches(
    /^['’\p{L}\p{M}]*[-\s]?['’\p{L}\p{M}]*$/giu,
    "Peut uniquement comporter '-' comme caractère spécial ou un espace."
  )
  .min(2, "2 caractères minimum.")
  .max(20, "Nom trop long (20 caractères maximum).");

export const emailAddressSchema = string()
  .required("Champ obligatoire.")
  .email("Format invalide.");

export const passwordSchema = string()
  .required("Champ obligatoire.")
  .matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{0,}$/,
    "Votre mot de passe doit comprendre au moins 1 caractère minuscule, 1 caractère majuscule, 1 chiffre et 1 caractère spécial."
  )
  .min(8, "Mot de passe trop court (8 caractères minimum).")
  .max(50, "Mot de passe trop long (50 caractères minimum).");

export const passwordConfirmationSchema = string()
  .required("Champ obligatoire.")
  .oneOf([ref("password"), null], "Les mots de passe doivent correspondre.");
