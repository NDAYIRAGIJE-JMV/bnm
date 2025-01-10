import Collaborateur from "@/app/ui/collaborateur";
import { getTribunals } from "@/app/_libs/datas";
import { Suspense } from "react";
export const metadata = {
    title: "Collaborateurs",
    description: "BNM",
  };
export default async function Page(){
        const tribunals = await getTribunals()
        return (
        <Suspense><Collaborateur tribunals={tribunals} /></Suspense>
    )
}