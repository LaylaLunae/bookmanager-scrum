import type { Book } from "../types/Book";

import mhaCover from "../assets/covers/my-hero-academia-1.jpg";
import snkCover from "../assets/covers/attaque-des-titans-1.jpg";
import fmaCover from "../assets/covers/fullmetal-alchemist-1.jpg";

export const MOCK_BOOKS: Book[] = [
    {
        id: 1,
        title: "My Hero Academia",
        author: "Kohei Horikoshi",
        genre: "Shonen",
        summary: "Dans un monde où 80 % de la population possède un super-pouvoir appelé Alter, Izuku Midoriya en est dépourvu. Pourtant, son rêve est de rejoindre la prestigieuse filière super-héroïque du lycée Yuei...",
        cover: mhaCover
    },
    {
        id: 2,
        title: "L'Attaque des Titans",
        author: "Hajime Isayama",
        genre: "Seinen",
        summary: "Le monde appartient désormais aux Titans. L'humanité, réduite à l'état de proie, a construit d'immenses remparts pour se protéger. Eren Jäger, un jeune garçon téméraire, va voir son destiny basculer...",
        cover: snkCover
    },
    {
        id: 3,
        title: "Fullmetal Alchemist",
        author: "Hiromu Arakawa",
        genre: "Shonen",
        summary: "Pour avoir tenté de transgresser le tabou ultime de l'alchimie en voulant ressusciter leur mère, les frères Edward et Alphonse Elric vont payer un prix terrible...",
        cover: fmaCover
    }
];