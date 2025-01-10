import executeQuery from "@/app/_utils/db";

export async function POST(request) {
    const data = await request.json()
    const nom = data.name
    const date = data.date
    try {
        const result = await executeQuery(`CALL rapportListe(?,?)`, [date, nom])
        if (result) {
            return new Response(JSON.stringify({ message: 'Success', data: result[0] }))
        }
        else {
            return new Response(JSON.stringify({ message: 'Error' }))
        }
    }
    catch (error) {
        console.error('Try error', error)
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}