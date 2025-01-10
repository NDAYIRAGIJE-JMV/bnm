import executeQuery from "@/app/_utils/db"

export async function GET(request, { params }) {
    const tribunal = request.headers.get('tribunal');
    const numero = request.headers.get('numero');
    const type = request.headers.get('type');
    const consoleState = request.headers.get('consoleState');
    const penalite = request.headers.get('penalite');
    const urgence = request.headers.get('urgence');
    const start = request.headers.get('start')||0;
    const prononce = request.headers.get('prononce')||0;
    const limit = request.headers.get('limit')||8;

    try {
        const result = await executeQuery(`CALL getAllDossiers(?,?,?,?,?,?,?,?,?)`, [tribunal, numero, type,consoleState,penalite,urgence,start,limit,prononce])


        const response = result
        if (response) {
            return new Response(JSON.stringify({ message: 'Success', data: response }))
        }
        else {
            return new Response(JSON.stringify({ message: 'Error' }))
        }
    }
    catch (error) {
        console.log('Try error', error)
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}

//Api Detaille Dossiers

export async function POST(request) {
    try {

        const data = await request.json();
        const uuid = data.uuid;
        const result = await executeQuery('CALL detaildossiers(?) ', [uuid])
        const results=result[0]
        return Response.json({results});
    }

    catch (error) {
        return Response.json({ message: 'select error' });
    }





}