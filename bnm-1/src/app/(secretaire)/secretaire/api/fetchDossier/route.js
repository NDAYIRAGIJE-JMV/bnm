import executeQuery from "@/app/_utils/db"
export async function GET(request) {
    const id = request.headers.get('id')
    try {
        const req1 = await executeQuery('SELECT * FROM dossiers WHERE id = ?', [id])
        const req2 = await executeQuery('SELECT * FROM caisse WHERE dossier = ?', [id])
        console.log('Dossier:',req1)

        const resultDossier = req1
        if (resultDossier) {
            const resultCaisse = req2
            return new Response(JSON.stringify({ message: 'Success', data: resultDossier, caisse : resultCaisse }))
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