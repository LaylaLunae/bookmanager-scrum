import type { PageData } from '../types/PageData';
import Home from '../pages/Home';
import Subscription from '../pages/Subscription';
import Connection from '../pages/Connection';


const Pages: PageData[] = [
    {
        id: 0,
        path: "/",
        name: "Accueil",
        page: <Home />,
    },
    {
        id: 1,
        path: "/inscription",
        name: "Inscription",
        page: <Subscription />
    },
    {
        id: 2,
        path: "/connexion",
        name: "Connexion",
        page: <Connection />
    }
];

export const getAllPages = (): PageData[] => {
    return Pages;
};
