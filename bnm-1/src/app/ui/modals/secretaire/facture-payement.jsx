"use client";
import React, { useState, useEffect } from "react";

const FacturePayement = ({paymentId,caisse}) => {
  const [data, setData] = useState([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caisse: caisse }),
      };
      const response = await fetch("/secretaire/api/facture", requestOptions);
      const result = await response.json();

      if (result && !result.error && result.results.length > 0) {
        setData(result.results[0]);
        await handleGeneratePDF(result.results[0]); // Appeler l'API pour générer et stocker le PDF
      } else {
        console.error("Aucune donnée trouvée ou une erreur s'est produite");
      }
    } catch (error) {
      console.error("Erreur de récupération :", error);
    }
  };

  const handleGeneratePDF = async (data) => {
    try {
      const response = await fetch('/secretaire/api/facture/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          create_at: data.create_at,
          caisse: data.caisse,
          name: data.name,
          lastname: data.lastname,
          montant_paye: data.montant_paye,
          montant_restant: data.montant_restant,
          id:paymentId,
        }),
      });

      if (response.ok) {
        // Obtenir le numéro de facture depuis la réponse
        const blob = await response.blob();
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/"/g, '')
          : `facture_numero${Math.floor(Math.random() * 100)}.pdf`; // Valeur par défaut si pas d'en-tête

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename; // Utiliser le nom de fichier récupéré
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Libérer l'URL créée
      } else {
        console.error("Erreur lors de la génération du PDF");
      }
    } catch (error) {
      console.error("Erreur lors de la génération du PDF :", error);
    }
  };

  return (
    <div>
      <h1>Génération de Facture</h1>
      {/* Vous pouvez afficher des informations supplémentaires ici */}
    </div>
  );
};

export default FacturePayement;