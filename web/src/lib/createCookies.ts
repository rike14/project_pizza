"use server"
    
import { cookies } from "next/headers"

export async function createCookies(token: string){
    const expressTime = 60 * 60 * 24 * 30 * 1000 // 30 days
    cookies().set("session", token), {
        maxAge: expressTime,
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
    }
}