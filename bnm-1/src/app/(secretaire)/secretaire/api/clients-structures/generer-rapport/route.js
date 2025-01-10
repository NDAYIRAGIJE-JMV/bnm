import executeQuery from "@/app/_utils/db";
export async function POST(request) {
    try {

        const data = await request.json();
        const id = data.id;
        const results = await executeQuery(
            'SELECT d.*, t.nom AS nomtribunal, c.name AS nom ' +
            'FROM dossiers d ' +
            'INNER JOIN tribunal t ON t.id = d.tribunal ' +
            'INNER JOIN client c ON c.id = d.defendeur ' +
            'WHERE d.defendeur = ?',
            [id]
          );
          console.log(results)
        return Response.json({ results });
    }

    catch (error) {
        return Response.json({ message: 'select error' });
    }



}