import { NextResponse } from 'next/server';
import executeQuery from "@/app/_utils/db";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const body = await req.json();
    const { user, dossier:dossierId, numero, date_audience, commentaire} = body;
    // Trouver les dossiers a joindre dans la base de donnees
    console.log('dossierNew:', user, dossierId, numero, date_audience, commentaire)
    const [[dossier1],[dossier2]] = await Promise.all([
      executeQuery('SELECT d.*, au.date_audience, au.id AS audience FROM dossiers d LEFT JOIN audiences au ON au.dossier = d.id WHERE d.id = ?', [dossierId]),
      executeQuery('SELECT d.*, au.date_audience, au.id AS audience FROM dossiers d LEFT JOIN audiences au ON au.dossier = d.id WHERE d.id = ?', [numero])
    ])
    const newUuid = uuidv4();
    if(dossier1.date_audience<dossier2.date_audience){
      try {
        const result =  await Promise.all([
          executeQuery(
            'INSERT INTO dossiers (uuid,type, numero, demandeur, defendeur, comment, id_grand, tribunal, fusion, penalite, urgence, console, appel, casse, multiple) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [newUuid, dossier1.type, dossier1.numero, dossier1.demandeur, dossier1.defendeur, commentaire, dossier1.id_grand, dossier1.tribunal,2,dossier1.penalite, dossier1.urgence, dossier1.console, dossier1.appel, dossier1.casse, dossier1.multiple]
          ),
          executeQuery("UPDATE dossiers SET fusion = 1 WHERE id = ?",[dossier1.id]),
          executeQuery("UPDATE audiences SET dossier = 1 WHERE id = ?",[dossier1.audience])
        ]);
        
        return Response.json({ message: 'Fusion créée avec succès' }, { status: 200 });
      } catch (error) {
        console.error('Error creating fusion:', error);
        return Response.json({ message: 'Erreur lors de la création de la fusion' }, { status: 500 });
      }

    }else if(dossier1.date_audience<dossier2.date_audience){
      try {
        const result  =  await Promise.all([
          executeQuery(
            'INSERT INTO dossiers (uuid,type, numero, demandeur, defendeur, comment, id_grand, tribunal, fusion, penalite, urgence, console, appel, casse, multiple) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [newUuid, dossier2.type, dossier2.numero, dossier2.demandeur, dossier2.defendeur, commentaire, dossier2.id_grand, dossier2.tribunal,2,dossier2.penalite, dossier2.urgence, dossier2.console, dossier2.appel, dossier2.casse, dossier2.multiple]
          ),
          executeQuery("UPDATE dossiers SET fusion = 1 WHERE id = ?",[dossier2.id]),
          executeQuery("UPDATE audiences SET dossier = 1 WHERE id = ?",[dossier2.audience])
        ]) ;
        return Response.json({ message: 'Fusion créée avec succès' }, { status: 200 });
      } catch (error) {
        console.error('Error creating fusion:', error);
        return Response.json({ message: 'Erreur lors de la création de la fusion' }, { status: 500 });
      }
    }else{
      console.error("Une erreur survenue lors de la comparaison des date d'audience")
      return Response.json({error:true})
    }

  } catch (error) {
    console.error('Error creating fusion:', error);
    return NextResponse.json({ message: 'Erreur lors de la création de la fusion' }, { status: 500 });
  }
}
