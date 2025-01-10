import executeQuery from "@/app/_utils/db";

export async function POST(request) {
    try {
        const data = await request.json();
        const currentYear = new Date().getFullYear();
        
        const results = await executeQuery(
            'SELECT c.days FROM conge c INNER JOIN users u ON c.user_id = u.id WHERE c.user_id = ? AND YEAR(c.create_at) = ?',
            [data.userId, currentYear]
        );

        if (results.length > 0) {
            let NombreJourConsomme = 0; // Initialiser la somme

            // Utiliser forEach pour parcourir les résultats
            results.forEach(objet => {
                const jourconsomme = parseFloat(objet.days); // Convertir en nombre
                if (!isNaN(jourconsomme)) { // Vérifier si c'est un nombre valide
                    NombreJourConsomme += jourconsomme; // Additionner
                }
            });
            return Response.json({ NombreJourConsomme, message: "success" }); // Retourne uniquement une valeur
        } else {
            return Response.json({ message: "not data" });
        }
    } catch (error) {
        return Response.json({ message: 'select error', error: error.message });
    }
}