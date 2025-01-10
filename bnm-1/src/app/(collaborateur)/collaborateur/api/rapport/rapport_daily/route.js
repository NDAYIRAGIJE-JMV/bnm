import executeQuery from "@/app/_utils/db";
export async function POST(request) {
    try {
  
     const data=  await request.json();
     console.log(data)
    const results = await executeQuery('INSERT INTO rapport_daily(`user`, `body`) VALUES(?,?)',
        [data.user,data.body]
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