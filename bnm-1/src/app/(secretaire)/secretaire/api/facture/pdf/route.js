import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";
import executeQuery from "@/app/_utils/db";

export async function POST(request) {
    try {
        const data = await request.json();
        console.log(data)
        const directoryPath = path.join(process.cwd(), 'public', 'factures');
        let numero;

        // Vérifiez si le fichier existe déjà
        do {
            numero = Math.floor(Math.random() * 100); 
            const factureName = `facture_numero${numero}.pdf`;
            const filePath = path.join(directoryPath, factureName);
            if (!fs.existsSync(filePath)) {
                break; // Le fichier n'existe pas, sortez de la boucle
            }
        } while (true);

        const factureName = `facture_numero${numero}.pdf`; 
        const results = await executeQuery(
            'INSERT INTO facture (`id_payment`, `numero`, `facture`) VALUES (?, ?, ?)',
            [data.id, numero, factureName]
        );
        
        if (results) {
            const doc = new jsPDF('portrait', 'pt', [448, 364]); 
            const logoPath = path.join(process.cwd(), 'public', 'Logo', 'Logo.png'); 
            const logo = fs.readFileSync(logoPath);
            const logoBase64 = Buffer.from(logo).toString('base64'); 
            const logoWidth = 120; 
            const logoHeight = 100; 
            const logoX = (doc.internal.pageSize.getWidth() - logoWidth) / 2; 
            doc.addImage(logoBase64, 'PNG', logoX, 10, logoWidth, logoHeight);

            doc.setFontSize(24);
            const title = "Facture de Paiement numéro " + numero;
            const titleX = (doc.internal.pageSize.getWidth() - doc.getTextWidth(title)) / 2;
            doc.text(title, titleX, 70 + logoHeight);

            doc.setFontSize(16);
            const verticalData = [
                `Date de Paiement: ${data.create_at ? new Date(data.create_at).toLocaleDateString() : ''}`,
                `Numéro Dossier: ${data.caisse || ''}`,
                `Montant Payé: ${data.montant_paye ? data.montant_paye + " Fbu" : ''}`,
                `Montant Restant: ${data.montant_restant ? data.montant_restant + " Fbu" : ''}`,
               
            ];

            let y = 100 + logoHeight; 
            verticalData.forEach((line) => {
                doc.text(line, 40, y);
                y += 20;
            });
            
            // Ajoutez un saut avant le texte de l'émetteur de facture
            y += 50; 
            doc.setFontSize(10); 
            doc.text("Émetteur de facture:", 60, y); // Ajoutez le texte en bas
            
            // Positionnez le nom et le prénom juste en dessous
            y += 20; // Sautez une ligne pour le nom
            doc.setFontSize(10); // Taille de police pour le nom
            doc.text(`${data.name || ''} ${data.lastname || ''}`, 60, y); // Ajoutez le nom complet
            const pdfPath = path.join(directoryPath, factureName);
            const pdfData = doc.output('arraybuffer');

            await fs.promises.writeFile(pdfPath, new Uint8Array(pdfData));

            const fileStream = fs.createReadStream(pdfPath);
            return new Response(fileStream, {
                status: 200,
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename=${factureName}`
                },
            });
        } else {
            return new Response(JSON.stringify({ error: "Erreur lors de l'insertion dans la base de données" }), { status: 500 });
        }

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Erreur lors de la génération du PDF' }), { status: 500 });
    }
}