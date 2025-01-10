import executeQuery from "@/app/_utils/db"

//Trace Dossiers

export async function POST(request) {
    try {
        const data = await request.json();
        const id_grand = data.id_grand;

        const results = await executeQuery('SELECT * FROM dossiers INNER JOIN tribunal ON tribunal.id=dossiers.tribunal WHERE (id_grand=?) ', ([id_grand]))
        return Response.json({ results });
    }

    catch (error) {
        return Response.json({ message: 'select error' });
    }

}