import executeQuery from "@/app/_utils/db";

export async function GET(request) {
    try {
        const [[clients],[dossiers],[standards],[report]] = await Promise.all([
            executeQuery('SELECT COUNT(*) as count FROM client', []),
            executeQuery('SELECT COUNT(*) as count FROM dossiers', []),
            executeQuery('SELECT COUNT(*) as count FROM dossiers d INNER JOIN grand_dossier gd ON d.id_grand = gd.id INNER JOIN client c ON gd.user = c.id WHERE c.type = ?', [1]),
            executeQuery('SELECT COUNT(*) as count FROM rapport_daily', [])
        ])
        
        const response = {
            clientsCount: clients.count,
            dossiersCount: dossiers.count,
            standardsCount: standards.count,
            reportsCount: report.count
        };
        console.log("response",response)
        return new Response(JSON.stringify({ message: 'Success', data: response}))
    }
    catch (error) {
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}
