import executeQuery from "@/app/_utils/db"
export async function GET(request) {
    try {
        const result = await executeQuery('SELECT c.*, (SELECT COUNT(*) FROM grand_dossier gd WHERE gd.user = c.id) AS nombre_dossiers FROM client c WHERE c.type=1 ORDER BY create_at DESC', [])
        const response = result
        if (response) {
            return new Response(JSON.stringify({ message: 'Success', data: response }))
        }
        else {
            return new Response(JSON.stringify({ message: 'Error' }))
        }
    }
    catch (error) {
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}
