import { Memory } from './../../node_modules/.prisma/client/index.d';
import { FastifyInstance } from "fastify";

import { prisma } from "../lib/prisma";

import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
    app.get('/memories', async () => {
        const memories = await prisma.memory.findMany({
            orderBy: {
                createdAt: 'asc'
            },
        })    
        // return memories

        return memories.map(m => {
            return {
                id: m.id,
                coverUrl: m.coverUrl,
                excerpt: m.content.substring(0, 115).concat('...')
            }
        })
    })

    app.get('/memories/:id', async (request, response) => {
        // const { id } = request.params

        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            }
        })

        return memory
    })

    app.post('/memories', async (request, response) => {
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false)
        })

        const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

        await prisma.memory.create({
            data: {
                content,
                coverUrl,
                isPublic,
                userId: '5609fdbe-c045-4295-9ffc-27b8b5a22887'
            }
        })
    })

    app.put('/memories/:id', async (request, response) => {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false)
        })

        const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

        const memory = await prisma.memory.update({
            where: {
                id,
            },
            data: {
                content,
                coverUrl,
                isPublic
            }
        })

        return memory
    })

    app.delete('/memories/:id', async (request, response) => {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.memory.delete({
            where: {
                id,
            }
        })
    })

}