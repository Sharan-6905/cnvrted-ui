"use client";
import React from "react"
import { seedData } from "../data/seed"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { ArrowUpRight } from "lucide-react"

export function CompetitorsView() {
  const competitors = seedData.competitors

  return (
    <div className="w-full max-w-4xl pb-12">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-ink mb-1">Competitors</h2>
        <p className="text-xs text-muted">Companies in your space — excluded from leads, kept as market intel.</p>
      </div>

      <div className="overflow-hidden border-y border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Competitor</TableHead>
              <TableHead>Site</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {competitors.map((comp, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <div className="font-medium text-ink">{comp.name}</div>
                  <div className="text-xs text-muted mt-0.5">{comp.desc}</div>
                </TableCell>
                <TableCell>
                  <a 
                    href={`https://${comp.site}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center text-sm font-mono text-muted hover:text-accent transition-colors"
                  >
                    {comp.site}
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
