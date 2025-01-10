import executeQuery from "@/app/_utils/db";

export async function GET(request) {
    try {
        const results = await executeQuery(
            'SELECT * FROM users INNER JOIN demande_conge  ON demande_conge.user_id=users.id ORDER BY demande_conge.id DESC',
            []
        );
        if (results) {
            return new Response(JSON.stringify({ message: "Success", results }));
        } else {
            return new Response(JSON.stringify({ message: 'error' }));
        }
    } catch (error) {
        console.log('Try error', error);
        return new Response(JSON.stringify({ message: 'Error' }));
    }
}
