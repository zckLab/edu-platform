import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"

export function InvoicesTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-border">
          <TableHead className="py-4 text-muted-foreground font-medium">Descrição</TableHead>
          <TableHead className="py-4 text-muted-foreground font-medium">Vencimento</TableHead>
          <TableHead className="py-4 text-muted-foreground font-medium text-right">Valor</TableHead>
          <TableHead className="py-4 text-muted-foreground font-medium">Status</TableHead>
          <TableHead className="py-4 text-muted-foreground font-medium text-right">Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i} className="border-b border-border last:border-0">
            <TableCell className="py-4">
              <Skeleton className="h-5 w-48" />
            </TableCell>
            <TableCell className="py-4">
              <Skeleton className="h-5 w-24" />
            </TableCell>
            <TableCell className="py-4">
              <Skeleton className="h-5 w-20 ml-auto" />
            </TableCell>
            <TableCell className="py-4">
              <Skeleton className="h-6 w-20 rounded-full" />
            </TableCell>
            <TableCell className="py-4">
              <Skeleton className="h-8 w-16 ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
