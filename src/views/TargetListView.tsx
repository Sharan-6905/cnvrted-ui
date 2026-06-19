import React, { useState } from "react"
import { seedData } from "../data/seed"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Button } from "../components/ui/button"
import { Progress } from "../components/ui/progress"
import { Badge } from "../components/ui/badge"
import { ThumbsUp, ThumbsDown, Loader2, ExternalLink, Mail } from "lucide-react"
import { cn } from "../lib/utils"

export function TargetListView() {
  const [rows, setRows] = useState(seedData.targetList.rows.map(r => ({ ...r, status: 'idle' })))
  const [isValidating, setIsValidating] = useState(false)
  const [isFindingContacts, setIsFindingContacts] = useState(false)

  const provenCount = rows.filter(r => r.proof === 'verified').length
  const contactsCount = rows.filter(r => (r as any).contact).length
  const total = rows.length

  const handleValidate = () => {
    setIsValidating(true)
    // Simulate validation
    let currentIdx = 0
    
    const interval = setInterval(() => {
      setRows(prev => {
        const next = [...prev]
        if (currentIdx < next.length) {
          next[currentIdx].proof = 'verifying'
          if (currentIdx > 0) {
            next[currentIdx - 1].proof = 'verified'
          }
        } else {
          next[next.length - 1].proof = 'verified'
          clearInterval(interval)
          setIsValidating(false)
        }
        return next
      })
      currentIdx++
    }, 300)
  }

  const handleFindContacts = () => {
    setIsFindingContacts(true)
    let currentIdx = 0
    
    const interval = setInterval(() => {
      setRows(prev => {
        const next = [...prev]
        if (currentIdx < next.length) {
          if (currentIdx > 0) {
            (next[currentIdx - 1] as any).contact = `hello@${next[currentIdx - 1].company.toLowerCase().replace(/\s/g, '')}.com`
          }
        } else {
          (next[next.length - 1] as any).contact = `hello@${next[next.length - 1].company.toLowerCase().replace(/\s/g, '')}.com`
          clearInterval(interval)
          setIsFindingContacts(false)
        }
        return next
      })
      currentIdx++
    }, 400)
  }

  const handleAction = (id: number, action: 'keep' | 'reject') => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, status: action } : r))
  }

  return (
    <div className="w-full pb-12 space-y-6">
      <div className="bg-surface border border-border rounded-lg p-6 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center shadow-sm">
        <div className="space-y-4 flex-1 w-full max-w-xl">
          <h2 className="text-sm font-semibold text-ink">In-ICP companies to action</h2>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-muted uppercase tracking-wider">
                <span>{provenCount}/{total} proven</span>
                <span>{Math.round((provenCount/total)*100 || 0)}%</span>
              </div>
              <Progress value={(provenCount/total)*100} className="h-1.5" />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-muted uppercase tracking-wider">
                <span>{contactsCount}/{total} with contacts</span>
                <span>{Math.round((contactsCount/total)*100 || 0)}%</span>
              </div>
              <Progress value={(contactsCount/total)*100} className="h-1.5" indicatorClassName="bg-score-high" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={handleValidate} 
            disabled={isValidating || provenCount === total}
            className="w-full sm:w-48 justify-start"
          >
            {isValidating ? <Loader2 className="mr-2 h-4 w-4 animate-spin text-muted" /> : <Activity className="mr-2 h-4 w-4 text-accent" />}
            {isValidating ? "Verifying..." : "Validate + find proof"}
          </Button>
          <Button 
            onClick={handleFindContacts} 
            disabled={isFindingContacts || contactsCount === total}
            className="w-full sm:w-48 justify-start"
          >
            {isFindingContacts ? <Loader2 className="mr-2 h-4 w-4 animate-spin text-muted" /> : <Mail className="mr-2 h-4 w-4 text-muted" />}
            {isFindingContacts ? "Finding contacts..." : "Find contacts"}
          </Button>
        </div>
      </div>

      <div className="overflow-hidden border-y border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Company</TableHead>
              <TableHead className="w-[300px]">Why in-ICP</TableHead>
              <TableHead className="w-[120px]">Proof</TableHead>
              <TableHead className="w-[200px]">Contact</TableHead>
              <TableHead className="w-[80px]">LinkedIn</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow 
                key={row.id} 
                className={cn(
                  "transition-all duration-300",
                  row.status === 'reject' && "opacity-30 grayscale",
                  row.status === 'keep' && "bg-score-high/5"
                )}
              >
                <TableCell className="font-medium text-ink">{row.company}</TableCell>
                <TableCell className="text-xs text-muted">{row.why}</TableCell>
                <TableCell>
                  {row.proof === 'unverified' && <Badge variant="secondary" className="font-mono font-normal">unverified</Badge>}
                  {row.proof === 'verifying' && <Badge variant="outline" className="font-mono font-normal text-accent animate-pulse border-accent/50 bg-accent/5">verifying...</Badge>}
                  {row.proof === 'verified' && <Badge className="bg-score-high text-white font-mono font-normal border-transparent hover:bg-score-high">verified</Badge>}
                </TableCell>
                <TableCell className="text-xs font-mono text-ink">
                  {(row as any).contact || <span className="text-muted/50">—</span>}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-accent">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleAction(row.id, 'reject')}
                      className={cn("h-8 w-8 rounded-full", row.status === 'reject' ? "bg-cut/10 text-cut" : "text-muted hover:text-cut hover:bg-cut/10")}
                    >
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleAction(row.id, 'keep')}
                      className={cn("h-8 w-8 rounded-full", row.status === 'keep' ? "bg-score-high/10 text-score-high" : "text-muted hover:text-score-high hover:bg-score-high/10")}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
// Add Activity icon to imports
import { Activity } from "lucide-react"
