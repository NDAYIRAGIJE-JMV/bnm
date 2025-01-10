import executeQuery from "@/app/_utils/db";

export async function PUT(request) {
    const {id_grand} = await request.json();
    try {
        const rows  = await executeQuery("UPDATE grand_dossier SET cloture = 1 WHERE id = ?",[id_grand])
        return Response.json({error:false}, {status:200})
    } catch (error) {
        console.error("Error lors de la cloture", error)
        return Response.json({error:true}, {status:500})
    }
}