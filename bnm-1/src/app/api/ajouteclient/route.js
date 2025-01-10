import executeQuery from "@/app/_utils/db";

export async function POST(request) {
    try {
        const data = await request.json();

        // Exécuter la requête pour récupérer les données
        const results = await executeQuery("INSERT INTO `client` ( `name`, `email`, `phone`, `montant`, `type`) VALUES(?,?,?,?,?)",
             [data.nom,data.email,data.phone,data.montant,1]);

        if (results) {

            return Response.json({ message: "Success" });
        } else {
            return Response.json({ error: " insert error" });
        }
    } catch (error) {
        return Response.json({ error: 'Validation error' });
    }
}