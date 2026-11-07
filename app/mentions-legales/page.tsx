import type { Metadata } from "next";
import { profile } from "@/data/site";
import s from "./legal.module.css";

export const metadata: Metadata = { title: "Mentions légales | Mouhamadou Gaye" };

// TODO : complète les champs ci-dessous avec tes informations réelles.
// Cette page est un modèle de départ, pas un avis juridique : vérifie ce qui s'applique à ton activité.
export default function Legal() {
  return (
    <article className={s.page}>
      <h1>Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>{profile.name}, {profile.status.toLowerCase()}.<br />
        SIRET : [à compléter]<br />
        Adresse : [à compléter]<br />
        E-mail : {profile.email}</p>

      <h2>Hébergement</h2>
      <p>[Nom et adresse de l’hébergeur, à compléter]</p>

      <h2>Données personnelles</h2>
      <p>Le formulaire de contact collecte votre nom, votre e-mail, votre entreprise (facultatif) et votre message, uniquement pour répondre à votre demande. Ces données ne sont pas revendues. Vous pouvez demander leur accès ou leur suppression en écrivant à {profile.email}.</p>

      <h2>Applications SenFile</h2>
      <p>Les applications présentées sur ce site sont des services distincts, accessibles sur senfile.com, avec leurs propres conditions d’utilisation.</p>
    </article>
  );
}
