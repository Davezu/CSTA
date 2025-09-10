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
function deansLister() {
  return (
    <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Student ID</TableHead>
      <TableHead>Full Name</TableHead>
      <TableHead>Year/Section</TableHead>
      <TableHead className="text-right">(GWA)</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Levi Ackerman</TableCell>
      <TableCell>Bachelor of Science in Information Technology (BSIT 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Gon Freecss</TableCell>
      <TableCell>Bachelor of Science in Accountancy (BSA 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Mikasa Ackerman</TableCell>
      <TableCell>Bachelor of Science Nursing (BSN 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Eren Yeager</TableCell>
      <TableCell>Bachelor of Science in Business Administration (BSBA 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Shinji Hirako</TableCell>
      <TableCell>Bachelor of Science in Education (BSEd 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Killua Zoldyck</TableCell>
      <TableCell>Bachelor of Science in Economics (BSEcon 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">22-00244</TableCell>
      <TableCell>Yoruichi Shihouin</TableCell>
      <TableCell>Bachelor of Science in Architecture (BSA 4-2)</TableCell>
      <TableCell className="text-right">1.25</TableCell>
    </TableRow>
  </TableBody>
</Table>
  )
}

export default deansLister; 