import { NextResponse } from 'next/server';
import executeQuery from "@/app/_utils/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id_grand, numero } = body;
    if (!id_grand) {
      return NextResponse.json({ message: 'id_grand required' }, { status: 404 });
    }

    const numeros = await executeQuery('SELECT id,numero FROM dossiers WHERE id_grand = ? AND numero <> ?', [id_grand, numero]);
    return NextResponse.json(numeros, { status: 201 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ message: "Erreur lors de la selection des numeros" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const id = req.headers.get('id');
    const id_grand = req.headers.get('id_grand');
    const numero = req.headers.get('numero');
    if (!id_grand) {
      return NextResponse.json({ message: 'Le dossier doit être bien selectionné' }, { status: 404 });
    }

    const numeros = await executeQuery('SELECT id,numero FROM dossiers WHERE id_grand <> ? AND numero <> ?', [id_grand, numero]);
    return NextResponse.json(numeros, { status: 201 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ message: "Erreur lors de la selection des numeros" }, { status: 500 });
  }
}
