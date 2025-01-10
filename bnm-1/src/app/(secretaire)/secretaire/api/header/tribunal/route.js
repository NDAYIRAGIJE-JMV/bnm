import executeQuery from "@/app/_utils/db";

export async function GET(request) {
    try {
        const result = await executeQuery('SELECT * FROM tribunal', [])
        console.log('object', result)
        return new Response(JSON.stringify({ message: 'Success', data: result }))
    }
    catch (error) {
        console.log('Try error', error)
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}
