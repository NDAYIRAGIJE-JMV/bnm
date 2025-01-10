import { NextResponse } from 'next/server';
import executeQuery from "@/app/_utils/db";

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const [rows] = await executeQuery('SELECT montant FROM caisse WHERE dossier = ?', [id]);
         
        if (!rows || rows.length === 0) {
            return NextResponse.json({ message: 'Prix non trouvé' }, { status: 404 });
        }
        const prix  = rows;
        if (!prix || !prix.montant) {
            return NextResponse.json({ message: 'Données du prix non valides' }, { status: 500 });
        }

        return NextResponse.json({ montant: prix.montant });
    } catch (error) {
        console.error('Erreur lors de la récupération du prix:', error);
        return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
    }
}



