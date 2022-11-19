
import { createToken, customiseNavbar, loadPage, showMessage } from '../util.js'

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
		document.querySelector('header p').innerText = ''
		customiseNavbar([ 'register', 'login'])
		node.querySelector('form').addEventListener('submit', await login)
	} catch(err) {
		console.error(err)
	}
}

async function login() {
	event.preventDefault()
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
	const token = 'Basic ' + btoa(`${data.user}:${data.pass}`)
	const options = {
		method: 'GET',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/vnd.api+json',
			'Accept': 'application/vnd.api+json'
		}
	}
	const response = await fetch('/api/accounts', options)
	const json = await response.json()

	if(response.status === 200) {
		localStorage.setItem('username', json.data.username)
		localStorage.setItem('authorization', token)
		await loadMain()
	} else {
		var errorPop = document.getElementById('wrapperError')
		errorPop.hidden = false
		setTimeout(() => {
			errorPop.hidden = true;
			}, "4000")
		document.querySelector('input[name="pass"]').value = ''
		
	}

}


async function loadMain(){
	const username = localStorage.getItem('username')
	const options = {
		method: 'GET',
		headers: {
			'Authorization' : localStorage.getItem('authorization'),
			'Content-Type': 'application/vnd.api+json'
		}
	}
	const response = await fetch(`/api/settings/${username}`, options)
	const userData = await response.json()
	console.log(userData)
	if(userData.status == "failed"){
		localStorage.setItem('settingsToken','false')
		loadPage('settings')
	}else{
		localStorage.setItem('settingsToken','true')
		loadPage('home')
	}

}
