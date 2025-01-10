import { NextResponse } from 'next/server';
import executeQuery from "@/app/_utils/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id_dossier } = body;

    // Check if the dossier exists with console = 2
    const [existingDossier] = await executeQuery('SELECT id FROM dossiers WHERE id = ? AND console = 2', [id_dossier]);

    if (!existingDossier) {
      return NextResponse.json({ message: 'Dossier non trouvé ou console != 2' }, { status: 404 });
    }

    // Fetch console rows associated with the dossier
    const consoleRows = await executeQuery('SELECT console FROM console WHERE dossier = ?', [id_dossier]);
    console.log(consoleRows)

    // Ensure consoleRows is an array before mapping over it
    if (!Array.isArray(consoleRows) || consoleRows.length === 0) {
      return NextResponse.json({ message: 'Aucune console trouvée' }, { status: 404 });
    }

    // Map over consoleRows to get console IDs
    const consoleIds = consoleRows.map(row => row.console);
    console.log(consoleIds)

    if (consoleIds.length > 0) {
      const relatedDossiers = await executeQuery('SELECT * FROM dossiers WHERE id IN (?)', [consoleIds]);
      console.log(relatedDossiers)
      return NextResponse.json(relatedDossiers, { status: 201 });
    } else {
      return NextResponse.json({ message: 'Aucune console correspondante trouvée' }, { status: 404 });
    }
    
  } catch (error) {
    console.error('Erreur lors de la récupération des consoles:', error);
    return NextResponse.json({ message: "Erreur lors de la selection des consoles" }, { status: 500 });
  }
}
