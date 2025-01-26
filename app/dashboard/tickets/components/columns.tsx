import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTicketContext } from "@/context/TicketsContext";
import { useToast } from "@/hooks/use-toast";
import { TicketBatch } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<TicketBatch>[] = [
    {
        accessorKey: "name",
        header: "Tanda",
    },
    {
        accessorKey: "price",
        header: "Precio",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
            }).format(amount);

            return <div className="text-left font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "start_date",
        header: "Fecha de inicio",
    },
    {
        accessorKey: "end_date",
        header: "Fecha de finalización",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ActionCell batch={row.original} />, // Llamada al componente funcional
    },
];

// Componente funcional para manejar la lógica de la celda de acciones
const ActionCell = ({ batch }: { batch: TicketBatch }) => {
    const { toast } = useToast();
    const { fetchTicketBatches } = useTicketContext();

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/tickets/batches/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("No se pudo eliminar la tanda.");

            toast({ title: "Tanda eliminada exitosamente." });
            fetchTicketBatches();
        } catch (error: unknown) {
            const errorMessage =
        error instanceof Error ? error.message : "Algo salió mal.";
            toast({
                title: errorMessage,
                description:
          "Puede deberse a que ya se han vendido tickets. Y esto no tiene solución.",
                variant: "destructive",
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem>
                    <Button
                        variant="destructive"
                        onClick={() => handleDelete(batch.id)}
                    >
            Eliminar
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default columns;
