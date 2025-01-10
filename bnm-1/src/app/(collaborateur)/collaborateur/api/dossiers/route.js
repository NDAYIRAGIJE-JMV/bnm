import executeQuery from "@/app/_utils/db";

export async function GET(request) {
    const headers = request.headers

    const userId = headers.get('userId');
    const tribunal = headers.get('tribunal');
    const numero = headers.get('numero');
    const type = headers.get('type');
    const consoleState = headers.get('consoleState');
    const penalite = headers.get('penalite');
    const urgence = headers.get('urgence');
    try {
        const [rows] = await executeQuery('CALL dossiercollabliste(?,?,?,?,?,?,?)',
            [userId,tribunal,numero,type,consoleState,penalite,urgence]
        )
    return Response.json(rows,{status:201})
    } catch (error) {
    return Response.json([],{status:500})
    }
}