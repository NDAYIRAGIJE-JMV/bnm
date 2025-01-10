import executeQuery from "@/app/_utils/db";

export async function GET(request) {
    const caisse = request.headers.get('caisse');
    try {
        const [rows] = await executeQuery('SELECT b.montant_restant  FROM balance b WHERE b.caisse = ? ORDER BY b.id DESC LIMIT 1', [caisse]);
        console.log(rows);
        return Response.json(rows,{status:200})
    } catch (error) {
        console.error(error)
    }
}