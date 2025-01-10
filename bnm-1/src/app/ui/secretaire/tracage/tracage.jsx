import { getTribunals } from "@/app/_libs/datas";
import { Suspense } from "react";
import Tracage from ".";

export default async function TracageLayout({numero}){
    const tribunals = await getTribunals();
    return (
        <Suspense>
            <Tracage numero={numero} tribunals={tribunals} />
        </Suspense>
    )
}