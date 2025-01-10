import { NextResponse } from 'next/server';
import executeQuery from "@/app/_utils/db";

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const [rows] = await executeQuery('SELECT id_grand FROM dossiers WHERE id = ?', [id]);

        if (!rows || rows.length === 0) {
            return NextResponse.json({ message: 'grandid non trouvé' }, { status: 404 });
        }
        const folder= rows;

        if (!folder || !folder.id_grand) {
            return NextResponse.json({ message: 'Données du grandid non valides' }, { status: 500 });
        }

        return NextResponse.json({ id_grand: folder.id_grand });
    } catch (error) {
        console.error('Erreur lors de la récupération du grandid:', error);
        return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
    }
}
