import Link from "next/link";
import { TicketBatchForm } from "../components/TicketBatchForm";

export function NewTicketBatch() {
    return (<>
        <div className="flex justify-center w-full">
            <Link href="/dashboard/tickets"
                className="mt-10 hover:underline">Volver</Link>
            <div className="flex w-full justify-center m-12">
                <TicketBatchForm />
            </div>
        </div>
    </>)
}

export default NewTicketBatch;