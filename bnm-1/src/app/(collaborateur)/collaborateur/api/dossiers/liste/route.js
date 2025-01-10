import executeQuery from "../../../../../_utils/db"

export async function POST(request) {
    const data = await request.json()
    const id = data.userId
    const tribunal = data.tribunal
    const numero = data.numero
    const type = data.type
    const consoleState = data.consoleState
    const penalite = data.penalite
    const urgence = data.urgence
    console.log("user id", id)
    try {
        // const result2 = await executeQuery('SELECT * FROM tribunal', [])
        // SELECT d.* FROM dossiers d INNER JOIN grand_dossier gd ON d.id_grand = gd.id AND gd.user=2
        const result = await executeQuery(`CALL dossiercollabliste(?, ?, ?, ?, ?, ?, ?)`, [id, tribunal, numero, type,consoleState, penalite, urgence])

        const response = result[0]
        console.log('collabdoss', response)
        if (response) {
            return new Response(JSON.stringify({ message: 'Success', data: response}))
        }
        else {
            console.log('object', response)
            return new Response(JSON.stringify({ message: 'Error' }))
        }
    }
    catch (error) {
        console.log('Try error', error)
        return new Response(JSON.stringify({ message: 'Error' }));
    }
}

