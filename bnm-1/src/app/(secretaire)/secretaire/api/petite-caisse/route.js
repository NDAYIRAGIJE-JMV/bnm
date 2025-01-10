import executeQuery from "@/app/_utils/db"
export async function GET(request) {
    try {
        const date = request.headers.get('da');
        const action = request.headers.get('action');
        const result = await executeQuery(`CALL petiteCaisseListe(?,?)`, [date,action])

        const response = result
        if (response) {
            return new Response(JSON.stringify({ message: 'Success', data: response[0] }))
        }
        else {
            return new Response(JSON.stringify({ message: 'Error' }))
        }
    }
    catch (error) {
        console.log('Try error', error)
        return new Response(JSON.stringify({ message: 'Eroor' }));
    }
}

export async function POST(request) {
    try {
        const {motif,montant,action} = await request.json();
        console.log(motif,montant,action)
      
        if (!motif || (!montant||isNaN(montant))) {
            return Response.json({ error: 'complété tous les champs obligatoire' });
        }
        const [result] = await executeQuery('SELECT * FROM petite_caisse ORDER BY create_at DESC LIMIT 1', [])
        const caisse = result.caisse
        if(action === 0){
           try {
            const rows =  await executeQuery('INSERT INTO petite_caisse(`Motif`, `caisse`, `solde`,`decaisser`) VALUES(?,?,?,?)',
                     [motif, caisse+montant,montant,action])
             return Response.json({error:false, message: 'L\'Enregistre de caisse a été fait avec succès' },{status:200});
           } catch (error) {
            console.error(error)
           }
        }else if(action === 1 && caisse>= montant){
            try {
                const rows =  await executeQuery('INSERT INTO petite_caisse(`Motif`, `caisse`, `solde`,`decaisser`) VALUES(?,?,?,?)',
                         [motif, caisse-montant,montant,action])
                 
                 return Response.json({error:false, message: 'L\'Enregistre de caisse a été fait avec succès' },{status:200});
               } catch (error) {
                console.error(error)
               }
        } else{
            return Response.json({error: true, message: "Erreur no reconnue !"},{status:500})
        }
    }

    catch (error) {
        console.log(error)
        return Response.json({ message: 'non inseree' });
    }



}
