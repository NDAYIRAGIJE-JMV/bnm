import { NextResponse } from 'next/server';
import executeQuery from "@/app/_utils/db";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const {dossier, demandeur, defendeur, tribunal, date, commentaire, descrPaie, penal, montant_a_payer, grandDossierMontant, autre, user, type, consort, partieConsort, partie} = await req.json();
    let suivi=grandDossierMontant

    if(type==2){
      suivi=2
    }
    console.log('first', demandeur, defendeur)
    
    const grand_dossier_rows = await executeQuery('INSERT INTO grand_dossier (montant,user) VALUES (?,?)', [suivi,user]);
    const grand_dossier_id = grand_dossier_rows.insertId
    let tribunalId = tribunal;
    if(autre){
      const result = await executeQuery('INSERT INTO tribunal (nom) VALUES (?)', [tribunal.toUpperCase()]);
      tribunalId = result.insertId
    }
 
    const uuid = uuidv4();
    let dossier_id = 0
    if (consort == "0"){
      const dossier_rows = await executeQuery(
      'INSERT INTO dossiers (uuid, id_grand, numero,type, demandeur, defendeur, date_audience, tribunal, penalite, comment) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?, ?)',
      [uuid, grand_dossier_id, dossier,type , demandeur, defendeur, date, tribunalId, penal, commentaire]
      );
      dossier_id = dossier_rows.insertId
    } else {
      const consortInt = 2
      let demandeurConsort = ''
      let defendeurConsort = ''
      if (partie == '1'){
        if (partieConsort == '1') {
          demandeurConsort = demandeur.split(';')[0]
          const dossier_rows = await executeQuery(
            'INSERT INTO dossiers (uuid, id_grand, numero,type, demandeur, defendeur, date_audience, tribunal, penalite, console, comment) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?)',
            [uuid, grand_dossier_id, dossier,type , demandeurConsort, defendeur, date, tribunalId, penal, consortInt, commentaire]
            );
          dossier_id = dossier_rows.insertId
        }
          
        if (partieConsort == '2'){
          defendeurConsort = defendeur.split(';')[0] 
          const dossier_rows = await executeQuery(
            'INSERT INTO dossiers (uuid, id_grand, numero,type, demandeur, defendeur, date_audience, tribunal, penalite, console, comment) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?)',
            [uuid, grand_dossier_id, dossier,type , demandeur, defendeurConsort, date, tribunalId, penal, consortInt, commentaire]
            );
          dossier_id = dossier_rows.insertId
        }
        if (partieConsort == '3'){
          defendeurConsort = defendeur.split(';')[0]
          demandeurConsort = demandeur.split(';')[0]
          const dossier_rows = await executeQuery(
            'INSERT INTO dossiers (uuid, id_grand, numero,type, demandeur, defendeur, date_audience, tribunal, penalite, console, comment) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?)',
            [uuid, grand_dossier_id, dossier,type , demandeurConsort, defendeurConsort, date, tribunalId, penal, consortInt, commentaire]
            );
          dossier_id = dossier_rows.insertId
        }
      } else {
        if (partieConsort == '1') {
          defendeurConsort = defendeur.split(';')[0]
          const dossier_rows = await executeQuery(
            'INSERT INTO dossiers (uuid, id_grand, numero,type, demandeur, defendeur, date_audience, tribunal, penalite, console, comment) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?)',
            [uuid, grand_dossier_id, dossier,type , demandeur, defendeurConsort, date, tribunalId, penal, consortInt, commentaire]
            );
          dossier_id = dossier_rows.insertId
        }

        if (partieConsort == '2'){
          demandeurConsort = demandeur.split(';')[0] 
          const dossier_rows = await executeQuery(
            'INSERT INTO dossiers (uuid, id_grand, numero,type, demandeur, defendeur, date_audience, tribunal, penalite, console, comment) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?)',
            [uuid, grand_dossier_id, dossier,type , demandeurConsort, defendeur, date, tribunalId, penal, consortInt, commentaire]
            );
          dossier_id = dossier_rows.insertId
        }
        if (partieConsort == '3'){
          defendeurConsort = defendeur.split(';')[0]
          demandeurConsort = demandeur.split(';')[0]
          const dossier_rows = await executeQuery(
            'INSERT INTO dossiers (uuid, id_grand, numero,type, demandeur, defendeur, date_audience, tribunal, penalite, console, comment) VALUES (?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?)',
            [uuid, grand_dossier_id, dossier,type , demandeurConsort, defendeurConsort, date, tribunalId, penal, consortInt, commentaire]
            );
          dossier_id = dossier_rows.insertId
        }
      }
    
      const consort_rows = await executeQuery(
        'INSERT INTO consorts (IdDossier, demandeur, defendeur) VALUES (?, ?, ?)', 
        [dossier_id, demandeur, defendeur]
      );
    }
    
    if(type =='1'){
      const result = await executeQuery('INSERT INTO caisse (dossier, montant,user, comment) VALUES (?, ?, ?, ?)',[dossier_id, montant_a_payer,user, descrPaie]);
    }

    const result = await executeQuery('INSERT INTO audiences(date_audience, dossier, avocat) VALUES(?, ?, ?)', [date, dossier_id, 0])

    return new Response(JSON.stringify({ success: true ,message: 'Le dossier a été crée avec succès'}), { status: 201 });
  } catch (error) {
    console.log('error:',error)
    return new Response(JSON.stringify({ success: false, message: "Une erreur de création du dossier !" }), { status: 500 });
  } 
}


export async function PATCH(req) {
  try {
    const {id,id_grand,dossier,demandeur,defendeur,tribunal,date,commentaire,montant_a_payer,grandDossierMontant,autre,user,type, consortDemand, consortDefend} = await req.json();
    if(type==1){
      await executeQuery('UPDATE grand_dossier SET montant=? WHERE id = ?', [grandDossierMontant,id_grand]);
    }
    console.log('demandeur: ', demandeur , 'defendeur', defendeur)
    let tribunalId = tribunal;
    if(autre){
      const result = await executeQuery('INSERT INTO tribunal (nom) VALUES (?)', [tribunal.toUpperCase()]);
      tribunalId = result.insertId
    }
    if (consortDemand && consortDefend) {
      const demand1 = demandeur.split(';')[0]
      const defend1 = defendeur.split(';')[0]
      const dossier_rows = await executeQuery(
        'UPDATE dossiers SET numero=?, demandeur=?, defendeur=?, date_audience=?, tribunal=?, comment=? WHERE id=?',
        [dossier, demand1, defend1, date, tribunalId, commentaire,id]
      );
    } else if(consortDemand && !consortDefend) {
      const demand1 = demandeur.split(';')[0]
      const dossier_rows = await executeQuery(
        'UPDATE dossiers SET numero=?, demandeur=?, defendeur=?, date_audience=?, tribunal=?, comment=? WHERE id=?',
        [dossier, demand1, defendeur, date, tribunalId, commentaire,id]
      );
    } else if(!consortDemand && consortDefend) {
      const defend1 = defendeur.split(';')[0]
      const dossier_rows = await executeQuery(
        'UPDATE dossiers SET numero=?, demandeur=?, defendeur=?, date_audience=?, tribunal=?, comment=? WHERE id=?',
        [dossier, demandeur, defend1, date, tribunalId, commentaire,id]
      );
      const consort_rows = await executeQuery(
        'UPDATE consorts SET demandeur = ?, defendeur = ? WHERE IdDossier = ?',  
        [demandeur, defendeur, id]
      );
    } else {
      const dossier_rows = await executeQuery(
      'UPDATE dossiers SET numero=?, demandeur=?, defendeur=?, date_audience=?, tribunal=?, comment=? WHERE id=?',
      [dossier, demandeur, defendeur, date, tribunalId, commentaire,id]
    );
    }
    
    if(type==1){
      await executeQuery('UPDATE caisse SET montant=? WHERE dossier = ?',[montant_a_payer,id]);
    }

  const result = await executeQuery('UPDATE audiences SET date_audience = ? , avocat = ? WHERE dossier = ?', [date, 0, id])

    return new Response(JSON.stringify({ success: true ,message: 'Le dossier a été mis à jour avec succès'}), { status: 201 });
  } catch (error) {
    console.log('error', error)
    return new Response(JSON.stringify({ success: false, message: "Une erreur mis à jour du dossier !" }), { status: 500 });
  }  

}

