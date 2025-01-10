import executeQuery from "@/app/_utils/db";

export async function POST(request) {
    try {
     const data=  await request.json();

     const results = await executeQuery('UPDATE users SET name=?, lastname=?, username=?, phone=?, email=?, role=? WHERE id=?',
        [data.name,data.lastname,data.username,data.phone,data.email,data.role,data.id]
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