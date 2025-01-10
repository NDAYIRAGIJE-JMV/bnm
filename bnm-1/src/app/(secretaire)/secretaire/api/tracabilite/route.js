
import executeQuery from "@/app/_utils/db";
export async function GET(request) {
    try {
        const numero = request.headers.get('numero');
        const [result] = await executeQuery('CALL tracabilite(?) ', [numero]);
        return Response.json(result);
    }

    catch (error) {
        console.error(error)
        return Response.json({ Error : 'select error => '+error }, {status: 500});
    }
 


}