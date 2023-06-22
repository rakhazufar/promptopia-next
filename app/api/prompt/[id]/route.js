import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

//Untuk URD Prompt
//GET
export const GET =  async (req, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')

        if (!prompt) return new Response("Data not found", {status: 404})

        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch data", {status: 500})
    }

} 

//UPDATE
export const PATCH =  async (req, { params }) => {

    const {tag, prompt} = await req.json()

    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id).populate('creator')

        if(!existingPrompt) return new Response("Data not found", {status: 404})

        existingPrompt.tag = tag;
        existingPrompt.prompt = prompt;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200})
    } catch (error) {
        return new Response("Failed to update data", {status: 500})
    }

} 

//REMOVE
export const DELETE =  async (req, { params }) => {
    try {
        await connectToDB()

        await Prompt.findByIdAndRemove(params.id)

        return new Response("Success to delete prompt", {status: 200})
    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500})
    }

} 