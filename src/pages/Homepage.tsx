import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
function Homepage() {
  return (
    <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Student ID</TableHead>
      <TableHead>Full Name</TableHead>
      <TableHead>Year/Section</TableHead>
      <TableHead className="text-right">General Weighted Average(GWA)</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Dave Christian P. Damo</TableCell>
      <TableCell>Bachelor of Science in Information Technology (BSIT 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Dave Christian P. Damo</TableCell>
      <TableCell>Bachelor of Science in Information Technology (BSIT 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Dave Christian P. Damo</TableCell>
      <TableCell>Bachelor of Science in Information Technology (BSIT 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Dave Christian P. Damo</TableCell>
      <TableCell>Bachelor of Science in Information Technology (BSIT 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Dave Christian P. Damo</TableCell>
      <TableCell>Bachelor of Science in Information Technology (BSIT 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Dave Christian P. Damo</TableCell>
      <TableCell>Bachelor of Science in Information Technology (BSIT 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Dave Christian P. Damo</TableCell>
      <TableCell>Bachelor of Science in Information Technology (BSIT 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
  </TableBody>
</Table>
  )
}

export default Homepage; 