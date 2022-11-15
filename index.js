
import app from './api/middleware.js'
import * as flags from 'https://deno.land/std/flags/mod.ts'
import { parse } from 'https://deno.land/std/flags/mod.ts'

const { args } = Deno
const defaultPort = 8080
const port = parse(args).port ?? defaultPort;
console.log(defaultPort + " " + port )
console.log(typeof(defaultPort) + " " + typeof(port))

app.addEventListener('listen', ({ port }) => console.log(`listening on port: ${port}`))

await app.listen({ port })
