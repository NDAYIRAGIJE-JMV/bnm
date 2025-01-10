import TracageLayout from "@/app/ui/secretaire/tracage/tracage"

export default function Page({params}){
    const numero = params.idDossier
    return <TracageLayout numero={numero}  />
}