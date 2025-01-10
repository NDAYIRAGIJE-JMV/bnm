export function dateString(date){
    const aujourdHui = new Date(date)
const dansCinqJours = new Date(aujourdHui);
dansCinqJours.setDate(aujourdHui.getDate());

const jour = String(dansCinqJours.getDate()).padStart(2, '0');
const mois = String(dansCinqJours.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
const annee = String(dansCinqJours.getFullYear());

const dateFormattee = `${annee}-${mois}-${jour}`;
return dateFormattee
}

export function dateDiff(date1,date2){
    const start = new Date(date1)
    const end = new Date(date2)
    return ((end-start)/(3600000*24)).toFixed(0)
}

export function formatDateToISO(date,start=false) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    if(start) return `${year}-${month}-${day}T${`00`}:${`00`}`;
    else return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  export function toMySQLTimestamp(isoString) {
    // Créer un objet Date à partir de la chaîne ISO
    const date = new Date(isoString);
    
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }
    
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
