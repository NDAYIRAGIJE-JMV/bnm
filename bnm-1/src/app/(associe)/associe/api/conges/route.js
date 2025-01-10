import executeQuery from "@/app/_utils/db";
export async function POST(request) {
    try {
        const data = await request.json();
            const results = await executeQuery('SELECT * FROM conge c INNER JOIN users u ON c.user_id=u.id WHERE c.user_id=?',
                [data.userId]
            )
           
        if (results.length > 0) {
         
            let NombreJourConsomme = 0; // Initialiser la somme

            // Utiliser forEach pour parcourir les résultats
            results.forEach(objet => {
                const jourconsomme = parseFloat(objet.days); // Convertir en nombre
                if (!isNaN(jourconsomme)) { // Vérifier si c'est un nombre valide
                    NombreJourConsomme += jourconsomme; // Additionner
                }
            });
            return Response.json({ results, NombreJourConsomme, message: "success" });
        } else {
            return Response.json({ message: "not data" });
        }
    } catch (error) {
        return Response.json({ message: 'select error' });
    }
}

export async function GET(request) {
    try {
        const nom = request.headers.get('nom');
        const results = await executeQuery('CALL congeListe(?)', [nom]);

        const result = results[0]
        if (result.length > 0) {
            return Response.json({ result, message: "success" });
        } else {
            return Response.json({ message: "no data" });
        }
    } catch (error) {
    }
        return Response.json({ message: 'select error' });
    }



