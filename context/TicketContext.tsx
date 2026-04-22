"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Ticket, DUMMY_TICKETS } from "@/lib/data";

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("oceantix_tickets_v2");
    if (stored) {
      try {
        setTickets(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse tickets from localStorage", err);
      }
    } else {
      // If no stored tickets, optionally populate with dummy data
      setTickets(DUMMY_TICKETS);
      localStorage.setItem("oceantix_tickets_v2", JSON.stringify(DUMMY_TICKETS));
    }
  }, []);

  const addTicket = (ticket: Ticket) => {
    setTickets((prev) => {
      const updated = [ticket, ...prev];
      localStorage.setItem("oceantix_tickets_v2", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
}
