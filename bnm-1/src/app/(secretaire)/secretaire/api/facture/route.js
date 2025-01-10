import executeQuery from "@/app/_utils/db";

export async function POST(request) {
    try {
        const data = await request.json();
        const caisse = data.caisse;
      
        const results = await executeQuery('SELECT b.*,u.name as name,u.lastname as lastname FROM balance b INNER JOIN users u ON u.id=b.user WHERE b.caisse=? ORDER BY b.create_at DESC;', [caisse]);
             
        if (results.length > 0) {

            let sommeMontants = 0; 
            results.forEach(objet => {
                const montant = parseFloat(objet.montant_paye); 
                if (!isNaN(montant)) { 
                    sommeMontants += montant; 
                }
            });
            return Response.json({ results, sommeMontants, message: "success" });
        } else {
            return Response.json({ message: "not data" });
        }
    } catch (error) {
        return Response.json({ message: 'select error' });
    }
}


