import executeQuery from "@/app/_utils/db";

export async function GET(request) {
    const nom = request.headers.get('nom');
    try {
        const result = await executeQuery(`CALL ecritureListe(?)`, [nom])
        if (result) {
            return new Response(JSON.stringify({ message: 'Success', data: result[0] }))
        }
        else {
            return new Response(JSON.stringify({ message: 'Error' }))
        }
    }
    catch (error) {
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}