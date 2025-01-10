import executeQuery from "@/app/_utils/db";

export async function GET(request) {
    const prononce = request.headers.get('prononce');
    console.log({prononce:prononce})
    try {
        const [[rows], avocats] = await Promise.all([
            executeQuery('CALL getCondense(?)',[prononce]),
            executeQuery('SELECT id,name,lastname FROM users WHERE role = ?', [2])
        ])
        return Response.json({ rows: rows, avocats: avocats })
    } catch (error) {
        return Error(error)
    }
}

export async function PATCH(request) {
    const {avocat,audience} = await request.json()
    try {
        const [rows] = await executeQuery('UPDATE audiences SET avocat = ? WHERE id=?', [avocat,audience])
        return Response.json(rows)
    } catch (error) {
        return Response.json(error)
    }
}

