
/* register.js */

import { customiseNavbar, loadPage, showMessage } from '../util.js'

export async function setup(node) {
	var remove3 = document.getElementById('dailyCalories')
    if(remove3 !=null ){
		remove3.remove()
	}
	var remove = document.getElementById('wrapperFoods')
    if(remove !=null ){
		remove.remove()
	}
    var remove1 = document.getElementById('saveWrapper')
    if(remove1 !=null ){
		remove1.remove()
	}
	try {
		customiseNavbar([ 'register', 'login'])
		node.querySelector('form').addEventListener('submit', await register)
	} catch(err) { // this will catch any errors in this script
		console.error(err)
	}
}

async function register() {
	event.preventDefault()
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
	console.log(data)
	if(data.pass.length <=5 || data.user.length <=5){
		alert("Username And Password Must Be Greater Than 5 Characters!")
		return;
	}
	const checks = ["`", "£", "@", "!", "^", "*", "(", ")", "#", "'", ",", ".", "?", "<", ">", "=", "+", "-", "_", "%",'"',"&"]
	checks.forEach(check =>{
		if(data.user.includes(check)){
			alert("Username Must Not Include Any Special Characters!")
			return;
		}
	})
	const url = '/api/accounts'
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Accept': 'application/vnd.api+json'
		},
		body: JSON.stringify(data)
	}
	const response = await fetch(url, options)
	const json = await response.json()
	console.log(json)
	console.log
	if(json.status == "success"){
		alert("new account created")
		loadPage('login')
	}else{
		alert('Account already exists')
	}

}