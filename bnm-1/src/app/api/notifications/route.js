import executeQuery from "@/app/_utils/db";

export async function GET(request) {
    try {
        const userId = request.headers.get('userId');
        const results = await executeQuery('CALL notifListe(?)', [0]);

        const result = results[0]
        if (result.length > 0) {
            return Response.json({ result, message: "success" });
        } else {
            return Response.json({ message: "no data" });
        }
    } catch (error) {
    }
        return Response.json({ message: 'select error' });
    }