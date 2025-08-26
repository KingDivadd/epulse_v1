"use server"
import {StreamClient} from "@stream-io/node-sdk"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY

export const tokenProvider = async (user_id:string) => {

    if (!apiKey) throw new Error("No api key!");
    if (!apiSecret) throw new Error("No api secret!");


    if (!user_id) return null;

    
    const client = new StreamClient(apiKey, apiSecret)
    
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000) - 60

    const token = client.createToken(user_id, exp, issued)

    return token;
}