import { db } from './db.js'

export async function addSettings(data) {
	let sql = `SELECT id FROM accounts WHERE user = "${data.username}"`
	let result = await db.query(sql)
    data.userid = result[0].id
	sql = `INSERT INTO settings(username,age,weight,height,gender,vita,vitb1,vitb2,vitb3,vitb5,vitb6,vitb12,vitc,vitd,vite,vitk,ldl,hdl,calcium,zinc,magnesium,potassium,iron,sodium,userid,date) VALUES("${data.username}","${data.age}", "${data.weight}", "${data.height}","${data.gender}", "${data.vita}", "${data.vitb1}" , "${data.vitb2}",
    "${data.vitb3}","${data.vitb5}","${data.vitb6}","${data.vitb12}","${data.vitc}","${data.vitd}","${data.vite}", "${data.vitk}", "${data.ldl}", "${data.hdl}","${data.calcium}","${data.zinc}","${data.magnesium}","${data.potassium}","${data.iron}","${data.sodium}", "${data.userid}", "${data.date}")`
	console.log(sql)
	await db.query(sql)
	return true
}

export async function getSettings(username){
	let sql = `SELECT * FROM settings WHERE username = "${username}" ORDER BY ID DESC LIMIT 1`
	let result = await db.query(sql)
	if(result.length!=0){
		return result
	}else{
		return false
	}
}

export async function saveToBacklog(data){
	let sql = `INSERT INTO backlog (name, date, calories) VALUES("${data.username}", "${data.date}", ${data.calories})`
	console.log(sql)
	let result = await db.query(sql)
	console.log(result)
	return result

}

export async function getBacklog(username){
	let sql = `SELECT * FROM backlog WHERE name = "${username}"`
	let result = await db.query(sql)
	if(result.length!=0){
		return result
	}else{
		return false;
	}
}