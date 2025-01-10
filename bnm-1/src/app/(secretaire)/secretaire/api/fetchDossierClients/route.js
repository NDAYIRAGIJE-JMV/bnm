import executeQuery from "@/app/_utils/db"
export async function GET(request) {
    const id = request.headers.get('id')
    try {
        const result = await executeQuery('SELECT * FROM consorts WHERE IdDossier = ?', [id])
        console.log('clients:',result)

        const response = result
        if (response) {
            console.log('objectClientsDossier', response)
            return new Response(JSON.stringify({ message: 'Success', data: response }))
        }
        else {
            console.log('object', response)
            return new Response(JSON.stringify({ message: 'Error ' }))
        }
    }
    catch (error) {
        console.log('Try error', error)
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}