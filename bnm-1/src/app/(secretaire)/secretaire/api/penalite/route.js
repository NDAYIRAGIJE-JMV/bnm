import { NextResponse } from 'next/server';
import executeQuery from "@/app/_utils/db";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const body = await req.json();
    const { id_dossier, numero, montant, date_audience, tribunal,autre,user,commentaire } = body;
    
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
    const newUuid = uuidv4();
    const dossier_rows = await executeQuery(
      'INSERT INTO dossiers (uuid, id_grand, numero,type, demandeur, defendeur, date_audience, tribunal, avocat_ancien,avocat_new,comment,penalite) VALUES (?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?)',
      [newUuid, dossier.id_grand,numero,dossier.type, dossier.demandeur,dossier.defendeur, dossier.date_audience, tribunalId,dossier.avocat_new, dossier.avocat_new,commentaire,1]
    );


    const newDossierId = dossier_rows.insertId;

    // Insérez une nouvelle pénalité associée au dossier
    await executeQuery(
      'INSERT INTO penalite (dossier, penalite, user, comment) VALUES (?, ?,?, ?)',
      [id_dossier, newDossierId,user, commentaire]
    );
    if(montant!=0){
      await executeQuery('INSERT INTO caisse (dossier, montant,user) VALUES (?, ?,?)',[newDossierId , montant,user]);
    }
    return NextResponse.json({ message: 'Penalité créée avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Error creating penalité:', error);
    return NextResponse.json({ message: 'Erreur lors de la création de la pénalité' }, { status: 500 });
  }
}
