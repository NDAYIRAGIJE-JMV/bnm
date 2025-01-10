import executeQuery from "@/app/_utils/db";

export async function GET(request) {
    try {
        // Extract the 'caisse' header
        const caisse = request.headers.get('caisse');
        if (!caisse) {
            return new Response(JSON.stringify({ message: 'Caisse header is required' }), { status: 400 });
        }

        console.log('caisse', caisse);

        // Execute the database query
        const results = await executeQuery(
            'SELECT * FROM balance WHERE caisse = ? ORDER BY create_at DESC',
            [caisse]
        );

        if (results.length > 0) {
            // Calculate the sum of amounts
            const sommeMontants = results.reduce((sum, obj) => {
                const montant = parseFloat(obj.montant_paye); // Convert to a number
                return sum + (isNaN(montant) ? 0 : montant); // Add to sum if valid
            }, 0);

            return new Response(JSON.stringify({ results, sommeMontants, message: 'success' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'no data' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error('Error in GET handler:', error);
        return new Response(JSON.stringify({ message: 'select error', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

