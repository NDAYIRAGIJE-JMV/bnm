//Api Detaille Dossiers

export async function POST(request) {
    try {

        const data = await request.json();
        const uuid = data.uuid;

        console.log(uuid);
        const results = await executeQuery('SELECT * FROM dossiers INNER JOIN tribunal ON tribunal.id=dossiers.tribunal WHERE (uuid=?) ', ([uuid]))
        console.log(results);
        return Response.json({ results });
    }

    catch (error) {
        return Response.json({ message: 'select error' });
    }



}