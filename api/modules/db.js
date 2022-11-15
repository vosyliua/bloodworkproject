
/* db.js */

import { Client } from 'https://deno.land/x/mysql@v2.10.3/mod.ts'

const home = Deno.env.get('HOME')
console.log(`HOME: ${home}`)

const connectionData = {
	'/home/codio': {
		hostname: '127.0.0.1',
		username: 'websiteuser',
		password: 'websitepassword',
		db: 'website'
	},
	'/app': {
		hostname: 'HOSTNAME',
		username: 'USERNAME',
		password: 'PASSWORD',
		db: 'DATABASE'
	}
}

const conn = connectionData[home]
// console.log(conn)

let db
try {
	db = await new Client().connect(conn)
	console.log('connection to database established')
} catch(err) {
	err.data = {
		code: 500,
		title: ' 500 Internal Server Error',
		detail: 'the API database is currently down'
	}
	throw err
}
console.log('connection to database established')
export { db }
