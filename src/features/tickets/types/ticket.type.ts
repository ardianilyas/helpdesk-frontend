export type TicketPriority = 'low' | 'medium' | 'high'

export interface Ticket {
  id: string
  categoryId: string
  title: string
  description: string
  ticketPriority: TicketPriority
  category?: {
    id: string
    name: string
  }
  createdAt?: string
  updatedAt?: string
}
