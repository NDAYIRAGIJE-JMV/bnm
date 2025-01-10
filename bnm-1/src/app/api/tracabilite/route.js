
import executeQuery from "@/app/_utils/db";
export async function POST(request) {
    try {

        const data = await request.json();
        const id_grand = data.id_grand;
        const result = await executeQuery('CALL tracabilite(?) ', [id_grand])
        const results=result[0]
        console.log(results)
        return Response.json({results});
    }

    catch (error) {
        return Response.json({ message: 'select error' });
    }



}