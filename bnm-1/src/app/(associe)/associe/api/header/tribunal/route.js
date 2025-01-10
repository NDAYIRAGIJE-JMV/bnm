import executeQuery from "@/app/_utils/db";

export async function GET(request) {
    try {
        const result = await executeQuery('SELECT * FROM tribunal', [])
        return new Response(JSON.stringify({ message: 'Success', data: result }))
    }
    catch (error) {
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}
