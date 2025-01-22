"use server"

import { signIn, signOut } from "@/auth"
import { PayloadOrder } from "./tickets"

export const handleSignOut = async () => {
  await signOut()
}

export const handleSignIn = async () => {
  await signIn();
}

export const handleBuyTicket = async (payload: Omit<PayloadOrder,"description">) => {
  await fetch("/api/tickets/buy", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })
}