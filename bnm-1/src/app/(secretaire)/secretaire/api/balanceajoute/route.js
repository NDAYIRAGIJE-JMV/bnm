import executeQuery from "@/app/_utils/db";

export async function POST(request) {
    try {
        const data = await request.json();
        console.log(data)
        if (!data.montantpaye) {
            return Response.json({ error: 'complété tous les champs obligatoire' });
        } 
        else {

            const results = await executeQuery('INSERT INTO balance(`uuid`, `caisse`, `montant_paye`, `montant_restant`, `user`) VALUES(?,?,?,?,?)',
                [data.uuid, data.caisse, data.montantpaye, data.montantrestant,data.user]
            )
            if (results) {
                const res= await executeQuery("SELECT id FROM balance WHERE caisse=? ORDER BY create_at DESC",[data.caisse])    
                 if(res){
                    return Response.json({ message: 'success', response:res });
                 }   
             
            }
            else {
                return Response.json({ message: 'error' });
            }

        }

    }

    catch (error) {
        return Response.json({ message: 'select error' });
    }



}