import executeQuery from "@/app/_utils/db";
export async function GET(request) {
    try {
       // const result = await executeQuery('SELECT d.* FROM dossiers d INNER JOIN grand_dossier gd ON d.id_grand = gd.id INNER JOIN client c ON gd.user = c.id WHERE c.type = ?', [3])
        const result = await executeQuery('SELECT * FROM dossiers ORDER BY create_at DESC', [])
        const response = result
        if (response) {
            return new Response(JSON.stringify({ message: 'Success', data: response }))
        }
        else {
            console.log('object', response)
            return new Response(JSON.stringify({ message: 'Error' }))
        }
    }
    catch (error) {
        console.log('Try error', error)
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}
