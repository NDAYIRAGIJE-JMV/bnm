import executeQuery from "@/app/_utils/db"
export async function GET(request) {
    try {
        const result = await executeQuery('SELECT * FROM users', [])
        const result2 = await executeQuery('SELECT * FROM role', [])
        if (result) {
            return new Response(JSON.stringify({ message: 'Success', data: result, roles: result2 }))
        }
        else {
            return new Response(JSON.stringify({ message: 'Error' }))
        }
    }
    catch (error) {
        console.error('Try error', error)
        return new Response(JSON.stringify({ message: 'Erreur' }));
    }
}


//Api Detaille Utilisateur

export async function POST(request) {
    try {
        const data = await request.json();
        const id = data.userId;
        const results = await executeQuery('SELECT * FROM users WHERE (id=?) ', ([id]))
        const result2 = await executeQuery('SELECT * FROM role', [])
        return Response.json({ results,roles:result2 });
    }

    catch (error) {
        return Response.json({ message: 'select error' });
    }
}