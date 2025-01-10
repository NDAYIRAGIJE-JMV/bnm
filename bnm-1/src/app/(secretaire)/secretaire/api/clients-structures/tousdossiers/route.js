import executeQuery from "@/app/_utils/db";
export async function POST(request) {
    try {
        console.log('results')
        const data = await request.json();
        const id = data.id;
        const results = await executeQuery(
            'SELECT DISTINCT d.*, t.nom AS nomtribunal, c.name AS nom, au.date_audience as date_audience ' +
            'FROM dossiers d ' +
            'INNER JOIN tribunal t ON t.id = d.tribunal ' +
            'INNER JOIN client c ON c.id = d.defendeur ' +
            'INNER JOIN audiences au ON au.dossier = d.id ' +
            'WHERE d.defendeur = ?',
            [id]
          );
      
        return Response.json({ results });
    }

    catch (error) {
        return Response.json({ message: 'select error' });
    }



}