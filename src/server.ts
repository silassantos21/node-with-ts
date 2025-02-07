import fastify from "fastify";
import cors from "@fastify/cors";
import { memoriesRoutes } from "./routes/memories";

const app = fastify()

app.register(cors, {
    origin: true
})

app.register(memoriesRoutes)

app.listen({
    port: 3333,
    host: "0.0.0.0"
}).then(() => {
    console.log("Servidor no ar! -> localhost:3333 😊")
})