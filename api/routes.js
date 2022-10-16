
/* routes.js */

import { Router } from 'oak'

import { extractCredentials, dataURLtoFile } from 'util'
import { login, register } from 'accounts'
import { addSettings, getSettings, saveToBacklog, getBacklog } from '///home/codio/workspace/api/modules/settings.js'

const router = new Router()

// the routes defined here
router.get('/', async context => {
	console.log('GET /')
	context.response.headers.set('Content-Type', 'text/html')
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})

router.get('/api/accounts', async context => {
	console.log('GET /api/accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		var username = await login(credentials)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify(
			{
				data: { username }
			}, null, 2)
	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}
})

router.get('/api/backlog/:username', async context => {
	const token = context.request.headers.get('Authorization')
	context.response.headers.set('Content-Type', 'application/json')
	try {
		var username = context.params.username
		var credentials = extractCredentials(token)
		const username1 = await login(credentials)
		console.log(`username: ${username}`)
		const backlogs = await getBacklog(username)
		if(backlogs != false){
			context.response.body = JSON.stringify({data:backlogs})
		}else{
			context.response.body = JSON.stringify({msg: "not found"})
		}


	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}
})

router.post('/api/accounts', async context => {
	console.log('POST /api/accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	if(await register(data) === true){
		context.response.status = 201
		context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
	}else{
		context.response.body = JSON.stringify({ status: 'failed', msg: 'account not created' })
	}
	
})

router.post('/api/settings', async context => {
	try{
		const token = context.request.headers.get('Authorization')
		const credentials = extractCredentials(token)
		var username = await login(credentials)
		const body  = await context.request.body()
		const data = await body.value
		await addSettings(data)
		context.response.status = 201
		context.response.body = JSON.stringify({ status: 'success', msg: 'settings saved' })
	}catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}

})

router.post('/api/backlog', async context => {
	try {
		const token = context.request.headers.get('Authorization')
		const credentials = extractCredentials(token)
		var username = await login(credentials)
		const data1 = await context.request.body()
		const data = await data1.value
		const settings = await saveToBacklog(data);
		if(settings === false){
			context.response.body = JSON.stringify({status:'failed', msg:'Not Added'})
		}else{
			context.response.body = JSON.stringify({status:'success', msg:'Added to backlog'})
		}
		

	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}
})

router.get('/api/settings/:username', async context => {
	try {
		const token = context.request.headers.get('Authorization')
		const credentials = extractCredentials(token)
		var username = await login(credentials)
		var username = context.params.username
		console.log(username)
		const settings = await getSettings(username);
		if(settings === false){
			context.response.body = {status:'failed'}
		}else{
			context.response.body = {status:'success', data :settings}
		}

	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}
})

router.post('/api/files', async context => {
	console.log('POST /api/files')
	try {
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
		const body  = await context.request.body()
		const data = await body.value
		console.log(data)
		dataURLtoFile(data.base64, data.user)
		context.response.status = 201
		context.response.body = JSON.stringify(
			{
				data: {
					message: 'file uploaded'
				}
			}
		)
	} catch(err) {
		err.data = {
			code: 500,
			title: '500 Internal Server Error',
			detail: err.message
		}
		throw err
	}
})

export default router

