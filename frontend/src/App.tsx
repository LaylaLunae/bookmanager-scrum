import { useEffect } from 'react';
import api from './api/axiosInstance'; // Ajuste le chemin vers ton dossier api si besoin

function App() {
  useEffect(() => {
    // Fonction asynchrone pour tester l'appel API
    const testBackendConnection = async () => {
      console.log("⏳ Tentative de connexion au backend...");
      try {
        // On envoie exactement le JSON attendu par le contrat de ta collègue
        const response = await api.post('/auth/login', {
          email: 'test@test.com',
          password: 'password123'
        });

        console.log("✅ SUCCÈS ! Le backend a répondu :", response.data);
      } catch (error: any) {
        console.error("❌ ERREUR lors de l'appel API :");
        if (error.response) {
          // Le serveur a répondu avec un code d'erreur (ex: 400, 401, 500)
          console.error("Statut HTTP :", error.response.status);
          console.error("Détails du serveur :", error.response.data);
        } else if (error.request) {
          // La requête a été envoyée mais aucune réponse n'a été reçue (ex: backend éteint)
          console.error("Aucune réponse du serveur. Le backend est-il lancé ?");
        } else {
          console.error("Erreur de configuration :", error.message);
        }
      }
    };

    testBackendConnection();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Vérification de l'architecture & d'Axios</h1>
      <p>Ouvre la console de ton navigateur (F12 - Onglet Console) pour voir le résultat du test.</p>
    </div>
  );
}

export default App;