import { getTribunals } from "@/app/_libs/datas";
import Secretaire from ".";
import { Suspense } from "react";

export default async function SecretairePageLayout(params) {
    const tribunals = await getTribunals()
    return (
        <Suspense>
            <Secretaire tribunals={tribunals} />
        </Suspense>
    )
} 