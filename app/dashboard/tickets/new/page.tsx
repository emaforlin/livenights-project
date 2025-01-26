import Link from "next/link";
import { TicketBatchForm } from "../components/TicketBatchForm";
import { Suspense } from "react";

export default function NewTicketBatch() {
    return (<>
        <div className="flex justify-center w-full">
            <Link href="/dashboard/tickets"
                className="mt-10 hover:underline">Volver</Link>
            <div className="flex w-full justify-center m-12">
                <Suspense>
                    <TicketBatchForm />
                </Suspense>
            </div>
        </div>
    </>);
}