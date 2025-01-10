import { NextResponse } from "next/server";
import executeQuery from "@/app/_utils/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const {
      id_dossier,
      tribunal,
      autre,
      montant,
      user,
      numero,
      date_audience,
      commentaire,
    } = await req.json();

    // Vérifiez si le dossier existe
    const existingDossier = await executeQuery(
      "SELECT * FROM dossiers WHERE id = ?",
      [id_dossier]
    );

    if (existingDossier.length === 0) {
      return NextResponse.json(
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

    let tribunalId = tribunal;
    if (autre) {
      const result = await executeQuery(
        "INSERT INTO tribunal (nom) VALUES (?)",
        [tribunal.toUpperCase()]
      );
      tribunalId = result.insertId;
    }

    // Créez un nouvel UUID pour le nouveau dossier
    const newUuid = uuidv4();
    const [dossier_row,result] = await Promise.all([
      executeQuery(
        "INSERT INTO dossiers (uuid, type, id_grand, numero, demandeur, defendeur, precedent, tribunal, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          newUuid,
          dossier.type,
          dossier.id_grand,
          numero,
          dossier.demandeur,
          def,
          id_dossier,
          tribunalId,
          commentaire,
        ]
      ),
      executeQuery("UPDATE dossiers SET casse = 1 WHERE id = ?",[id_dossier])
    ]);
    const dossier_id = dossier_row.insertId;
    if (montant != 0) {
      await executeQuery(
        "INSERT INTO caisse (dossier, montant,user) VALUES (?, ?,?)",
        [dossier_id, montant, user]
      );
    }
    await executeQuery("INSERT INTO audiences(date_audience, dossier) VALUES(?,?)",[date_audience,dossier_id])
    return NextResponse.json(
      {
        message:
          "Dossier avance et nouvelle ligne insérée avec données davancement enregistrées",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating fusion:", error);
    return NextResponse.json(
      { message: "Erreur lors de la création de la fusion" },
      { status: 500 }
    );
  }
}
