import executeQuery from "@/app/_utils/db";

export async function POST(request) {
    try {
  
     const data=  await request.json();
     const id=data.id;
    const results = await executeQuery('SELECT * FROM balance WHERE (dossier=?) ',([id]))
    return Response.json({results});
    }
  
    catch(error){
      return Response.json({ message: 'select error' });
  }
  
  
  
  }