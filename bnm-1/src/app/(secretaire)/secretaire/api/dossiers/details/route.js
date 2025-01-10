import executeQuery from "@/app/_utils/db";

export async function GET(request){
    const caisse_id = request.headers.get('caisse');
    const dossier_id = request.headers.get('dossier');
    const [[caisse],audiences] = await Promise.all([
        executeQuery("SELECT montant_restant AS montant FROM balance b WHERE b.caisse = ? ORDER BY id DESC LIMIT 1",[caisse_id]),
        executeQuery("SELECT au.id, au.date_audience, ra.decision, ra.comment FROM audiences au LEFT JOIN rapport_audience ra ON ra.audience = au.id WHERE au.dossier = ?",[dossier_id])
    ])
    return Response.json({caisse,audiences},{status:200});
}