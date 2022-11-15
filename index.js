
import app from './api/middleware.js'
import * as flags from 'https://deno.land/std/flags/mod.ts'
import { parse } from 'https://deno.land/std/flags/mod.ts'

const {args} = Deno
const defaultPort = 8080
const argPort = parse(Deno.args).port
const port = argPort ? argPort : defaultPort
console.log(defaultPort + " " + port + " " + argPort)
console.log(typeof(defaultPort) + " " + typeof(port) + " " + typeof(argPort))

app.addEventListener('listen', ({ port }) => console.log(`listening on port: ${port}`))

await app.listen({ port })
