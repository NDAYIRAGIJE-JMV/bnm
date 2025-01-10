import executeQuery from "@/app/_utils/db";
import { v4 as uuidv4 } from 'uuid';
export async function POST(request) {
    try {
     const data=  await request.json();
    const results = await executeQuery('INSERT INTO demande_conge(`uuid`, `user_id`, `sortie`, `retour`, `jours`, `motif`) VALUES(?,?,?,?,?,?)',
        [uuidv4(),data.user,data.datesortie,data.dateretour,data.jours,data.objet]
    )
    if(results){
        return Response.json({message:'success'});
    }
    else{
        return Response.json({message:'error'});
    }
    
    }
  
    catch(error){
      return Response.json({ message: 'select error' }); 
  }
  
  
  
  }