import { PayloadOrder } from "@/app/lib/tickets";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VisibilityWrapper } from "@/components/VisibilityWrapper";
import { useEventContext } from "@/context/EventContext";
import { useTicketContext } from "@/context/TicketsContext";
import { TicketBatch, TicketOrder } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
    className?: string
    eventId: number
}

interface NewOrderType {
    userId: number;
    batchId: number;
    eventId: number;
    quantity: number;
}

export function BuyTicketForm({className, eventId}: Props) {
    const { data: session } = useSession();
    const { batches, fetchTicketBatches } = useTicketContext();

    const [batch, setBatch] = useState<TicketBatch|undefined>(undefined);
    const [qty, setQty] = useState<number>(1);


    const onSubmit = async (e) => {
        e.preventDefault();

        if (session?.user && batch && qty) {
            const payload: Omit<PayloadOrder, "description"> = {
                batchId: batch.id,
                eventId: eventId,
                quantity: qty,
                userId: parseInt(session.user.id!),
            }

            await fetch("/api/tickets/buy", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload)
                }
            );
        }
    };

    const now = new Date();
    return (
    <form onSubmit={onSubmit}>
        <Select
            onValueChange={(value) => {
                const selectedBatch = batches.find((item) => String(item.id) === value);
                if (selectedBatch) {
                    setBatch(selectedBatch);
                }
            } }>

            <SelectTrigger className="w-[170px]">
                <SelectValue placeholder={batch?.name || "Elije una opción"} />
            </SelectTrigger>
            <SelectContent>
                {batches.map((item: TicketBatch) => {
                    const isDisabled = item.quantity < 1 || !item.active || new Date(item.end_date) < now || new Date(item.start_date) > now;
                    return (
                        <SelectItem key={item.id}
                        value={String(item.id)}
                        disabled={isDisabled}
                        >
                            {item.name} {item.quantity < 1 && <p className="font-bold">SOLD OUT</p>}
                        </SelectItem>);
                }
            )}
            </SelectContent>

        </Select>
        <VisibilityWrapper visible={!!batch}>
            <div className="mt-5 space-y-4">
                <p className="text-3xl break-words font-bold">$ {batch?.price}</p>
                <Input type="number" placeholder="Cantidad"
                    className="w-[170px]" value={qty || 1}
                    onChange={(e) => setQty(Number(e.target.value))}/>
                <Button type="submit">Comprar</Button>
            </div>
        </VisibilityWrapper>
    </form>
    )
}