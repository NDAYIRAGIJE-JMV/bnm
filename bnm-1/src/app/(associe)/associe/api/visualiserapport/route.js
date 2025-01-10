import executeQuery from "@/app/_utils/db";
export async function POST(request) {
    try {
        const data = await request.json();
            const results = await executeQuery('SELECT r.*,u.name,u.lastname FROM rapport_daily r INNER JOIN users u ON r.user=u.id WHERE user=?',
                [data.userId]
            )
            if (results) {
                return Response.json({results });
             
            }
            else {
                return Response.json({ message: 'error' });
            }

        

    }

    catch (error) {
        return Response.json({ message: 'select error' });
    }



}