export function formatDate(date) {
    // Ajouter 5 jours à la date
    date.setDate(date.getDate() + 5);

    // Formater la nouvelle date en YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0 en JS
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
