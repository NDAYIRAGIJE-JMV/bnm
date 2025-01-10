import executeQuery from "@/app/_utils/db";

export async function GET(request) {

    try {
        const results = await executeQuery('SELECT ecr.* FROM ecriture ecr INNER JOIN users us WHERE us.id=ecr.uuid ORDER BY ecr.create_at DESC', [])
        
        if (results) {
            
            return Response.json({ message:"Success",results});
        }
        else {
            return Response.json({ message: 'error' });
        }
    }

    catch (error) {
        return Response.json({ message: 'select error' });
    }
}
export async function POST(request) {
    try {
        const data = await request.json();
        if (!data.objet || !data.reference || !data.destinataire) {
            return Response.json({ error: 'complété tous les champs obligatoire' });
        }
        else {

            const results = await executeQuery('INSERT INTO ecriture(`uuid`, `object`, `reference`, `destinataire`) VALUES(?,?,?,?)',
                [1, data.objet, data.reference, data.destinataire]
            )
            if (results) {
                return Response.json({ message: 'success' });
            }
            else {
                return Response.json({ message: 'error' });
            }

        }

    }

    catch (error) {
        return Response.json({ message: 'select error' });
    }



}