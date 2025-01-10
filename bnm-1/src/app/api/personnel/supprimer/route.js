
import executeQuery from "@/app/_utils/db";
export async function POST(request) {
    try {
     const data=  await request.json();
    const results = await executeQuery('DELETE FROM users WHERE id=?',[data.id])
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