import executeQuery from "@/app/_utils/db";

export async function POST(request) {
    try {
        const data = await request.json();
        const id = data.id;
      
        const results = await executeQuery('SELECT f.* FROM facture f INNER JOIN balance b ON b.id=f.id_payment WHERE f.id_payment=?', [id]);
             
        if (results.length > 0) {
            return Response.json({ results, message: "success" });
        } else {
            return Response.json({ message: "not data" });
        }
    } catch (error) {
        return Response.json({ message: 'select error' });
    }
}


