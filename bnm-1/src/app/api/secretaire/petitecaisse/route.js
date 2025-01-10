import executeQuery from "@/app/_utils/db"
export async function GET(request) {
    try {
        const result = await executeQuery('SELECT * FROM petite_caisse', [])

        const response = result
        if (response) {
            console.log('object', response)
            return new Response(JSON.stringify({ message: 'Success', data: response }))
        }
        else {
            console.log('object', response)
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
     const data=  await request.json();
     console.log(data)
    /* if(!data.motif||!data.montant_total||!data.montant_restant){
        return Response.json({error:'complété tous les champs obligatoire'});
     }
     else{

    const results = await executeQuery('INSERT INTO petite_caisse(`Motif`, `montant_total`, `montant_restant`) VALUES(?,?,?)',
        [data.motif,data.montant_total,data.montant_restant]
    )
    if(results){
        return Response.json({message:'success'});
    }
    else{
        return Response.json({message:'error'});
    }
    
    }*/
            
}
  
    catch(error){
      return Response.json({ message: 'select error' }); 
  }
  
  
  
  }
