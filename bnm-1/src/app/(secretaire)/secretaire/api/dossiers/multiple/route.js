import executeQuery from "@/app/_utils/db";
import { v4 as uuidv4 } from "uuid";

export async function GET(request) {
    const dossier = request.headers.get('dossier');
    const rows  =  await executeQuery("SELECT id, numero, demandeur,comment  FROM dossiers WHERE precedent = ? AND multiple = 1",[dossier])
    return Response.json(rows)
}
export async function POST(request) {
    const {
        id_dossier,
        user,
        numero,
        demandeur,
        date_audience,
        commentaire,
      } = await request.json();
        // Vérifiez si le dossier existe
        const existingDossier = await executeQuery(
            "SELECT * FROM dossiers WHERE id = ?",
            [id_dossier]
          );
      
          if (existingDossier.length === 0) {
            return Response.json(
              { message: "Dossier not found" },
              { status: 404 }
            );
          }
      
          const dossier = existingDossier[0];
          let def = dossier.defendeur;
          if (dossier.type == 2) {
            let doss = await executeQuery("select * from client where id=? ", [
              dossier.defendeur,
            ]);
            def = doss[0].name;
          }
        
    // Créez un nouvel UUID pour le nouveau dossier
    const newUuid = uuidv4();
    const [dossier_row,result] = await Promise.all([
      executeQuery(
        "INSERT INTO dossiers (uuid, type, id_grand, numero, demandeur, defendeur, precedent, tribunal,multiple, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          newUuid,
          dossier.type,
          dossier.id_grand,
          numero,
          demandeur,
          def,
          id_dossier,
          dossier.tribunal,
          2,
          commentaire,
        ]
      ),
      executeQuery("UPDATE dossiers SET multiple = 1 WHERE id = ?",[id_dossier])
    ]);
    const dossier_id = dossier_row.insertId;
      
    await executeQuery("INSERT INTO audiences(date_audience, dossier) VALUES(?,?)",[date_audience,dossier_id])
    return Response.json({error:false});
}