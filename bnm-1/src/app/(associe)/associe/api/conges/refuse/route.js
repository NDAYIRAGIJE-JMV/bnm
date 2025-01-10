import executeQuery from "@/app/_utils/db";

export async function POST(request) {
    try {
        const data = await request.json();

        // Vérification de la présence des données nécessaires
        if (!data.status || !data.id) {
            return new Response(JSON.stringify({ message: "Données manquantes" }), {
                status: 400, // Bad Request
                headers: { "Content-Type": "application/json" }
            });
        }

        const res = await executeQuery(
            'UPDATE `demande_conge` SET `status`=? WHERE `id`=?',
            [data.status, data.id]
        );

        // Vérifier si une ligne a été affectée
        if (res.affectedRows > 0) { 
            return new Response(JSON.stringify({ message: "success" }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            return new Response(JSON.stringify({ message: "Aucune modification apportée" }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        }

    } catch (error) {
        console.error('Erreur lors de la modification dans la base de données:', error);
        return new Response(JSON.stringify({ message: "Erreur du serveur" }), {
            status: 500, // Internal Server Error
            headers: { "Content-Type": "application/json" }
        });
    }
}