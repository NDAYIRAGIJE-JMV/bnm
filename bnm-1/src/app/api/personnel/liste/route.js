import executeQuery from "@/app/_utils/db"

export async function GET(request) {
    try {
        const result = await executeQuery('SELECT * FROM users', [])
        const result2 = await executeQuery('SELECT * FROM role', [])
        if (result) {
            return new Response(JSON.stringify({ message: 'Success', data: result, roles: result2 }))
        }
        else {
            console.log('object', result)
            return new Response(JSON.stringify({ message: 'Error' }))
        }
    }
    catch (error) {
        console.log('Try error', error)
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}
