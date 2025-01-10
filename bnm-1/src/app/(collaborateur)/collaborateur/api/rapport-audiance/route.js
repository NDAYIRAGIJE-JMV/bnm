import executeQuery from "@/app/_utils/db";
export async function POST(request) {
    try {
  
     const data=  await request.json();
     console.log(data)
    const results = await executeQuery('INSERT INTO rapport_audience(`audience`, `user`, `decision`, `comment`) VALUES(?,?,?,?)',
        [data.dossier,data.user,data.decision,data.commentaire]
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