import { PayloadOrder } from "@/app/lib/tickets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VisibilityWrapper } from "@/components/VisibilityWrapper";
import { useTicketContext } from "@/context/TicketsContext";
import { useToast } from "@/hooks/use-toast";
import { TicketBatch } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";


interface Props {
    className?: string
    eventId: number
}

export function BuyTicketForm({className, eventId}: Props) {
    const { data: session } = useSession();
    const { ticketBatches, fetchTicketBatches } = useTicketContext();
    const { toast } = useToast();
    const [batch, setBatch] = useState<TicketBatch|undefined>(undefined);
    const [qty, setQty] = useState<number>(1);


    const onSubmit = async (e: any) => {
        e.preventDefault();

        if (session?.user && batch && qty) {
            const payload: Omit<PayloadOrder, "description"> = {
                batchId: batch.id,
                eventId: eventId,
                quantity: qty,
                userId: parseInt(session.user.id!),
            }
            try {
                const res = await fetch("/api/tickets/buy", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(payload)
                });

                if (!res.ok) throw new Error("No se pudo completar la compra.");
                
                toast({
                    title: "Compra exitosa!.",
                    description: "Puedes ver tus tickets en la sección Mis Tickets."
                    });
            } catch (error: any) {
                toast({
                    title: "Algo salió mal...",
                    description: error.message,
                    variant: "destructive"
                });
            }  

        }
    };

    const now = new Date();
    return (
    <form onSubmit={onSubmit}>
        <Select
            onOpenChange={fetchTicketBatches}
            onValueChange={(value) => {
                const selectedBatch = ticketBatches.find((item) => String(item.id) === value);
                if (selectedBatch) {
                    setBatch(selectedBatch);
                }
            } }>

            <SelectTrigger className="w-[170px]">
                <SelectValue placeholder={batch?.name || "Elije una opción"} />
            </SelectTrigger>
            <SelectContent>
                {ticketBatches.map((item: TicketBatch) => {
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