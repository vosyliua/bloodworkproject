
import app from './api/middleware.js'
import * as flags from 'https://deno.land/std/flags/mod.ts'

const {args} = Deno
const defaultPort = 8080
const argPort = flags.parse(args).port;
const port = parseInt(argPort) ? parseInt(argPort) : defaultPort

app.addEventListener('listen', ({ port }) => console.log(`listening on port: ${port}`))

await app.listen({ port })
