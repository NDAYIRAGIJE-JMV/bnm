import executeQuery from "@/app/_utils/db";
import { auth } from "@/auth";
export async function POST(request) {
     "use server"
    try {
        const {delibere,prononce,commentaire,dossier,avocat} = await request.json();
        const session = await auth();
        const [row_delib,aud_delib] = await Promise.all([
            executeQuery('INSERT INTO delibere (dossier, date_delibere, user, comment) VALUES(?, ?, ?, ?)', [dossier, delibere, session?.user?.id, commentaire]),
            executeQuery('INSERT INTO audiences (date_audience, dossier, avocat, prononce) VALUES(?, ?, ?, ?)', [prononce, dossier, avocat, 1])
        ])
        const rp_row = await executeQuery('INSERT INTO rapport_audience (audience, decision, user, comment) VALUES(?, ?, ?, ?)', [aud_delib.insertId, prononce, session?.user?.id, commentaire])
        return Response.json({error:false}, {status: 200});
    } catch (error) {
        return Response.json({error:true}, {status: 500});
    }
}