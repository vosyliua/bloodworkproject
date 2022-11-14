
import app from './api/middleware.js'
import { parse } from 'https://deno.land/std/flags/mod.ts'

const defaultPort = 8080
const { args } = Deno
const argPort = parse(args).port
const port = argPort ? Number(argPort) : defaultPort

app.addEventListener('listen', ({ port }) => console.log(`listening on port: ${port}`))

await app.listen({ port })
