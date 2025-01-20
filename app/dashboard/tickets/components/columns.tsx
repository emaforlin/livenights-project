import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TicketBatch } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<TicketBatch>[] = [
    {
        accessorKey: "name",
        header: "Tanda"
    }, {
        accessorKey: "price",
        header: "Precio",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
            }).format(amount);
            
            return <div className="text-left font-medium">{formatted}</div>
        },
    }, {
        accessorKey: "start_date",
        header: "Fecha de inicio",
    }, {
        accessorKey: "end_date",
        header: "Fecha de finalizacion",
    }, {
        id: "actions",
        enableHiding: false,
        cell: (({row}) => {
            const batch = row.original;
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
                            <Button variant="destructive"
                                onClick={() => fetch(`/api/tickets/batches/${batch.id}`, {
                                    method: "DELETE"
                                })}>Eliminar</Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        })
        
    }
]

export default columns