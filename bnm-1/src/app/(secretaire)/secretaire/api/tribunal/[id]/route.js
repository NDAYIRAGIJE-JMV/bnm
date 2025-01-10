import { NextResponse } from 'next/server';
import executeQuery from "@/app/_utils/db";

export async function GET(request, { params }) {
    const { id } = params;

    try {

        // Execute query
        const [rows] = await executeQuery('SELECT nom FROM tribunal WHERE id = ?', [id]);

        if (!rows || rows.length === 0) {
            return NextResponse.json({ message: 'Tribunal non trouvé' }, { status: 404 });
        }

        // Check if rows[0] is defined and has the expected structure
        const tribunal = rows;
        if (!tribunal || !tribunal.nom) {
            return NextResponse.json({ message: 'Données du tribunal non valides' }, { status: 500 });
        }

        // Return JSON response
        return NextResponse.json({ nom: tribunal.nom });
    } catch (error) {
        console.error('Erreur lors de la récupération du tribunal:', error);
        return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
    }
}
