import executeQuery from "@/app/_utils/db";

// export const dynamic = 'force-dynamic'

export async function GET(request) {
    try {
        console.log('firstDatas')
        const [[clients],[dossiers],[standards],[report]] = await Promise.all([
            executeQuery('SELECT COUNT(*) as count FROM client', []),
            executeQuery('SELECT COUNT(*) as count FROM dossiers d WHERE (d.appel = 0) AND d.fusion <> 1 AND d.console <> 1 AND d.delete_at IS NULL', []),
            executeQuery('SELECT COUNT(*) as count FROM dossiers d INNER JOIN grand_dossier gd ON d.id_grand = gd.id WHERE (d.appel = 0) AND d.fusion <> 1 AND d.console <> 1 AND d.delete_at IS NULL AND d.type = ?', [1]),
            executeQuery('SELECT COUNT(*) as count FROM rapport_daily', [])
        ])
        
        console.log('Datas : ', dossiers, standards)
        const response = {
            clientsCount: clients,
            dossiersCount: dossiers,
            standardsCount: standards,
            reportsCount: report
        };
        return new Response(JSON.stringify({ message: 'Success', data: response}))
    }
    catch (error) {
        console.log('Try error', error)
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}
