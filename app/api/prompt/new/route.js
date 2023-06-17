import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const POST =  async (req, res) => { 
    const {prompt, userId, tag} = await req.json()
    console.log("prompt: ", prompt)

    try {
        connectToDB()
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), {
            status: 201
        })
    } catch (error) {
        console.log(error)
        return new Response("Failed to add prompt", {status: 500})
    }
}