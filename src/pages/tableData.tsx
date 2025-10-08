import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function deansLister() {
  return (
    <div className="w-full px-6 md:px-10 max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Dean's Lister</h1>
        <p className="text-sm text-muted-foreground">Academic excellence recognition</p>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Student ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Year/Section</TableHead>
              <TableHead className="text-right w-[100px]">GWA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <span className="text-sm font-mono">22-00244</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/img/csa.PNG" alt="Levi Ackerman" />
                    <AvatarFallback className="text-xs font-medium">LA</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Levi Ackerman</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  Bachelor of Science in Information Technology (BSIT 4-2)
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-semibold">1.25</span>
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="font-medium">
                <span className="text-sm font-mono">22-00245</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/img/csa.PNG" alt="Gon Freecss" />
                    <AvatarFallback className="text-xs font-medium">GF</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Gon Freecss</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  Bachelor of Science in Accountancy (BSA 4-2)
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-semibold">1.30</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">
                <span className="text-sm font-mono">22-00246</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/img/csa.PNG" alt="Mikasa Ackerman" />
                    <AvatarFallback className="text-xs font-medium">MA</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Mikasa Ackerman</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  Bachelor of Science in Nursing (BSN 4-2)
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-semibold">1.28</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">
                <span className="text-sm font-mono">22-00247</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/img/csa.PNG" alt="Eren Yeager" />
                    <AvatarFallback className="text-xs font-medium">EY</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Eren Yeager</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  Bachelor of Science in Business Administration (BSBA 4-2)
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-semibold">1.35</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">
                <span className="text-sm font-mono">22-00248</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/img/csa.PNG" alt="Shinji Hirako" />
                    <AvatarFallback className="text-xs font-medium">SH</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Shinji Hirako</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  Bachelor of Science in Education (BSEd 4-2)
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-semibold">1.40</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">
                <span className="text-sm font-mono">22-00249</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/img/csa.PNG" alt="Killua Zoldyck" />
                    <AvatarFallback className="text-xs font-medium">KZ</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Killua Zoldyck</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  Bachelor of Science in Economics (BSEcon 4-2)
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-semibold">1.32</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">
                <span className="text-sm font-mono">22-00250</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/img/csa.PNG" alt="Yoruichi Shihouin" />
                    <AvatarFallback className="text-xs font-medium">YS</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Yoruichi Shihouin</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  Bachelor of Science in Architecture (BSA 4-2)
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-semibold">1.45</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card text-card-foreground p-4 text-center">
          <div className="text-2xl font-semibold mb-1">7</div>
          <div className="text-sm text-muted-foreground">Total Students</div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground p-4 text-center">
          <div className="text-2xl font-semibold mb-1">5</div>
          <div className="text-sm text-muted-foreground">Dean's Listers</div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground p-4 text-center">
          <div className="text-2xl font-semibold mb-1">1.33</div>
          <div className="text-sm text-muted-foreground">Average GWA</div>
        </div>
      </div>
    </div>
  )
}

export default deansLister; 