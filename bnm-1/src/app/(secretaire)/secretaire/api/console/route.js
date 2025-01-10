import { NextResponse } from 'next/server';
import executeQuery from "@/app/_utils/db";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const body = await req.json();
    const { id_dossier,user, numero, date_audience, demandeur,commentaire } = body;

    // Vérifiez si le dossier existe
    const existingDossier = await executeQuery('SELECT * FROM dossiers WHERE id = ?', [id_dossier]);

    if (existingDossier.length === 0) {
      return NextResponse.json({ message: 'Dossier not found' }, { status: 404 });
    }

    const dossier = existingDossier[0];

    await executeQuery(
        'UPDATE dossiers SET console = ? WHERE id = ?',
        [2, id_dossier]
      );

      const newUuid = uuidv4();
      const result=await executeQuery(
        'INSERT INTO dossiers (uuid, id_grand, numero, demandeur, defendeur, type, date_audience, tribunal,avocat_ancien,avocat_new, comment,console) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
        [
          newUuid,
          dossier.id_grand,
          numero,
          demandeur,
          dossier.defendeur,
          2,
          date_audience,
          dossier.tribunal,
          dossier.avocat_new,
          dossier.avocat_new,
          commentaire,
          1
        ]
      );
      console.log('result:',result)
      const dossierId = result.insertId;
      await executeQuery(
        'INSERT INTO console (dossier, console,user) VALUES (?, ?,?)',
        [id_dossier ,dossierId,user]
      );
    return NextResponse.json({ message: 'Dossier fusionné et nouvelle ligne insérée avec données de fusion enregistrées' }, { status: 200 });
  } catch (error) {
    console.error('Error creating penalité:', error);
    return NextResponse.json({ message: 'Erreur lors de la création de la pénalité' }, { status: 500 });
  }
}
