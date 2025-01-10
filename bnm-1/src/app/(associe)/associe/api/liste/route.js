import executeQuery from "@/app/_utils/db"

export async function GET(request) {
    try {
        const result = await executeQuery('SELECT * FROM dossiers ORDER BY create_at DESC', [])
        const result2 = await executeQuery('SELECT * FROM tribunal', [])

        const response = result
        if (response) {
            return new Response(JSON.stringify({ message: 'Success', data: response, tribunals: result2 }))
        }
        else {
            return new Response(JSON.stringify({ message: 'Error' }))
        }
    }
    catch (error) {
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}

//Api Detaille Dossiers

export async function POST(request) {
    try {
        const data = await request.json();
        const uuid = data.uuid;

        const results = await executeQuery('SELECT * FROM dossiers INNER JOIN tribunal ON tribunal.id=dossiers.tribunal WHERE (uuid=?) ', ([uuid]))
        return Response.json({ results });
    }

    catch (error) {
        return Response.json({ message: 'select error' });
    }
}