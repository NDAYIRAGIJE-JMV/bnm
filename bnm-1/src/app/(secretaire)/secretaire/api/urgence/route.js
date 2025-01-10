import { NextResponse } from 'next/server';
import executeQuery from "@/app/_utils/db";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const body = await req.json();
    const { id_dossier, numero, date_audience, montant, tribunal,autre,user, commentaire } = body;

    // Vérifiez si le dossier existe
    const existingDossier = await executeQuery('SELECT * FROM dossiers WHERE id = ?', [id_dossier]);

    if (existingDossier.length === 0) {
      return NextResponse.json({ message: 'Dossier not found' }, { status: 404 });
    }

    const dossier = existingDossier[0];

    let tribunalId = tribunal;
    if(autre){
      const result = await executeQuery('INSERT INTO tribunal (nom) VALUES (?)', [tribunal.toUpperCase()]);
      tribunalId = result.insertId
    }
    // Créez un nouvel UUID pour le nouveau dossier
    const newUuid = uuidv4();
    const dossier_rows = await executeQuery(
      'INSERT INTO dossiers (uuid,type, id_grand, numero, demandeur, defendeur, date_audience, tribunal,avocat_ancien,avocat_new, comment,urgence) VALUES (?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?)',
      [newUuid, dossier.type,dossier.id_grand,numero, dossier.demandeur, dossier.defendeur, date_audience, tribunalId, dossier.avocat_new, dossier.avocat_new,commentaire,1]
    );
    const newDossierId = dossier_rows.insertId;

    // Insérez une nouvelle urgence associée au dossier
    await executeQuery(
      'INSERT INTO urgence (dossier, numero, user,comment) VALUES (?, ?, ?)',
      [id_dossier, newDossierId,user, commentaire]
    );
    if(montant!=0){
      await executeQuery('INSERT INTO caisse (dossier, montant,user) VALUES (?, ?,?)',[newDossierId , montant,user]);
    }
    return NextResponse.json({ message: 'Urgence créée avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Error creating penalité:', error);
    return NextResponse.json({ message: "Erreur lors de la création d'urgence" }, { status: 500 });
  }
}
