import executeQuery from "@/app/_utils/db"
export async function GET(request) {
    const name = request.headers.get('nom')
    try {
        const result = await executeQuery(`CALL clientListe(?)`, [name])

        const response = result
     
        if (response) {
            return new Response(JSON.stringify({ message: 'Success', data: response[0] }))
        }
        else {
        
            return new Response(JSON.stringify({ message: 'Error' }))
        }
    }
    catch (error) {
        console.log('Try error', error)
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}
