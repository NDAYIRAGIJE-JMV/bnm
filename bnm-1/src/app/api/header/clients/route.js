import executeQuery from "@/app/_utils/db";
export async function GET(request) {
    try {
        const result1 = await executeQuery('SELECT COUNT(*) as count_client FROM client', [])
        const result2 = await executeQuery('SELECT COUNT(*) as count_dossiers FROM dossiers d WHERE d.appel = 0 AND d.fusion = 0 ', []);
        const result3 = await executeQuery('SELECT COUNT(*) as count_standards FROM dossiers d INNER JOIN grand_dossier gd ON d.id_grand = gd.id INNER JOIN client c ON gd.user = c.id WHERE c.type = ? AND d.appel = 0 AND d.fusion = 0 ', [1]);
        const result4 = await executeQuery('SELECT COUNT(*) as count_report FROM rapport_daily', []);
        const response = {
            clientsCount: result1[0].count_client,
            dossiersCount: result2[0].count_dossiers,
            standardsCount: result3[0].count_standards,
            reportsCount: result4[0].count_report,
        };
        console.log('obj', response)
        return new Response(JSON.stringify({ message: 'Success', data: response }))
    }
    catch (error) {
        console.log('Try error', error)
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}
