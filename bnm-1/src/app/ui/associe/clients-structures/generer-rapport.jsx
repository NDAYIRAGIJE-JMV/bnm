"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const GenererRapport = ({ closeModal, id, name }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    if (id) {
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        };
        const res = await fetch(
          "/secretaire/api/clients-structures/generer-rapport",
          requestOptions
        );
        const datas = await res.json();
        if (!datas.error) {
          setData(datas.results);
        }
      } catch (error) {
        console.log("error");
      }
    }
  };

  const handleGeneratePDF = async () => {
    const doc = new jsPDF('landscape', 'pt', 'a4'); // Format paysage A4
    const response = await fetch('/Logo/Logo.png');
    const blob = await response.blob();
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const logoBase64 = reader.result;
  
      // Centrer le logo
      const logoWidth = 120; // Nouvelle largeur du logo
      const logoHeight = 100; // Nouvelle hauteur du logo
      const logoX = (doc.internal.pageSize.getWidth() - logoWidth) / 2; 
      doc.addImage(logoBase64, 'PNG', logoX, 10, logoWidth, logoHeight);
      
      // Marges
      const marginBottomLogo = 70;
      const marginBottomTitle = 20;
  
      // Titre centré
      doc.setFontSize(24);
      const title = "Rapport du Client";
      const titleX = (doc.internal.pageSize.getWidth() - doc.getTextWidth(title)) / 2;
      doc.text(title, titleX, 70 + marginBottomLogo);
  
      doc.setFontSize(16); // Augmente la taille de la police des données
  
      // Define column headers
      const headers = ["Numéro dossier", "Demandeur", "Tribunal", "Date d'audience", "Décision", "Commentaire"];
      const dataRows = data.map(item => [
        item.numero !== undefined ? item.numero : '',
        item.demandeur !== undefined ? item.demandeur : '',
        item.nomtribunal !== undefined ? item.nomtribunal : '',
        item.date_audience !== undefined ? new Date(item.date_audience).toDateString() : '',
        item.decision !== undefined ? item.decision : '',
        item.comment !== undefined ? item.comment : ''
      ]);
  
      // Create a table
      const startY = 100 + marginBottomLogo + marginBottomTitle;
      const totalWidth = doc.internal.pageSize.getWidth() - 40;
      const columnWidths = [totalWidth * 0.15, totalWidth * 0.15, totalWidth * 0.15, totalWidth * 0.15, totalWidth * 0.15, totalWidth * 0.25];
      const tableX = (doc.internal.pageSize.getWidth() - totalWidth) / 2; // Centered X position
      let y = startY;
  
      // Draw headers
      headers.forEach((header, index) => {
        const headerX = tableX + columnWidths.slice(0, index).reduce((acc, width) => acc + width, 0);
        doc.setFillColor(240, 240, 240); // Background color for header
        doc.rect(headerX, y - 20, columnWidths[index], 20, 'F'); // Draw background rectangle
        doc.setFontSize(16);
        doc.text(header, headerX + 5, y - 5);
      });
      y += 30; // Move down for the next row
  
      // Draw data rows
      dataRows.forEach(row => {
        let maxHeight = 0;
  
        const cellHeights = row.map((cell, index) => {
          const cellText = cell.toString();
          const cellLines = doc.splitTextToSize(cellText, columnWidths[index] - 10);
          return cellLines.length * 10; // Assuming each line of text is about 10 pt high
        });
  
        maxHeight = Math.max(...cellHeights) + 10; // Adding some margin
  
        row.forEach((cell, index) => {
          const cellX = tableX + columnWidths.slice(0, index).reduce((acc, width) => acc + width, 0);
          const cellText = cell.toString();
          const cellLines = doc.splitTextToSize(cellText, columnWidths[index] - 10);
  
          const textY = y - 20 + (maxHeight - cellLines.length * 10) / 2 + 10; // Center vertically
          doc.setTextColor(0, 0, 0); // Dark color for text
          doc.text(cellLines, cellX + 5, textY); // Draw the text
        });
  
        // Move down for the next row
        y += maxHeight + 10; // Space between rows
      });
  
      doc.save("rapport_client.pdf");
    };
  
    reader.readAsDataURL(blob);
  };

  return (
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <div className="w-[95%] md:w-[95%] lg:w-[93%] xl:w-[95%] h-[95%] md:h-[97%] xl:h-[98%] relative flex flex-col space-y-3 md:space-y-2 bg-white rounded-md mx-auto rounded-md">
        <div className="w-[98%] h-[5%] flex justify-end mx-auto mt-2">
          <div className="w-[100%] md:w-[30%] xl:w-[25%] h-full flex justify-between items-center">
            <button onClick={handleGeneratePDF} className="mt-2 bg-slate-700 max-w h-9 flex items-center justify-center  hover:bg-slate-800  rounded">
            <span className="text-white mx-2">Générer PDF</span>
            </button>
            <button onClick={closeModal} className="w-6 h-6 hover:bg-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-lg text-black hover:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <span className="mx-auto text-md font-semibold underline">
          Rapport du client {name}
        </span>
        <div className="w-[100%] h-[90%]">
          <div className="w-full h-full">
            <div className="w-[100%] h-[100%] mx-auto py-2 overflow-y-scroll">
              <table id="example" className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-start py-2 bg-slate-100 p-2">
                      Numero dossier
                    </th>
                    <th className="py-2 text-start border bg-slate-100 p-2">
                      Demandeur
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Defendeur
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Tribunal
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Date d&#39;audience
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Décision
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Commentaire
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, index) => (
                      <tr key={index}>
                        <td className="border text-start py-2 p-2">
                          {item.numero}
                        </td>
                        <td className="border text-start py-2 p-2">
                          {item.demandeur}
                        </td>
                        <td className="border text-start py-2 p-2">
                          {item.nom}
                        </td>
                        <td className="border text-start py-2 p-2">
                          {item.nomtribunal}
                        </td>
                        <td className="border text-start py-2 p-2">
                          {new Date(item.date_audience).toDateString()}
                        </td>
                        <td className="border text-start py-2 p-2">
                          {item.decision}
                        </td>
                        <td className="border text-start py-2">
                          {item.comment}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenererRapport;