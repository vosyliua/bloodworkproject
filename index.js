
import app from './api/middleware.js'
import { parse } from 'https://deno.land/std@0.164.0/flags/mod.ts'

const DEFAULT_PORT = 8080;
const envPort = Deno.env.get("PORT");
const port = envPort ? Number(envPort) : DEFAULT_PORT;

app.addEventListener('listen', ({ port }) => console.log(`listening on port: ${port}`))

await app.listen({ port })
