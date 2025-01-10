import executeQuery from "@/app/_utils/db";

export async function POST(request) {
    try {
        const data = await request.json();
        if (!data.objet || !data.expect || !data.destinataire) {
            return Response.json({ error: 'complété tous les champs obligatoire' });
        }
        else {

            const results = await executeQuery('INSERT INTO ecriture(`user_id`,destinataire, `object`,`expect`,`ref`, `reference`) VALUES(?,?,?,?,?,?)',
                [data.user, data.destinataire, data.objet, data.expect,data.ref, data.reference]
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