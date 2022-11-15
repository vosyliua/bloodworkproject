
import app from './api/middleware.js'
import { Application, send, Status } from "https://deno.land/x/oak@v6.5.1/mod.ts";
import { Md5 } from 'https://deno.land/std@0.89.0/hash/md5.ts'
import { parse } from 'https://deno.land/std/flags/mod.ts'


const defaultPort = 8080
const { args } = Deno
const argPort = parse(args).port
const port = argPort ? Number(argPort) : defaultPort

app.addEventListener('listen', ({ port }) => console.log(`listening on port: ${port}`))

await app.listen({ port })
