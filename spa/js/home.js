
/* home.js */

import { customiseNavbar, showMessage } from '../util.js'

export async function setup(node) {
	console.log("update")
	console.log('HOME: setup1')
	try {
		console.log(node)
		var x = document.createElement("INPUT");

		x.setAttribute("type", "text");
		x.setAttribute("id","searchbar")
		node.appendChild(x)
		var white = document.createElement('p')
		node.appendChild(white)
		var button = document.createElement('button')
		button.setAttribute("id","searchButton")
		button.innerHTML = "Search"
		node.appendChild(button)
		document.querySelector('header p').innerText = 'Welcome ' + localStorage.getItem('username') + "!"
		document.querySelector('header p').setAttribute('id', 'settingsHeader')
		customiseNavbar(['home', 'settings', 'logout','stats', 'vitamins']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		node.getElementById('searchButton').addEventListener('click', await searchFood)
		console.log(token)
		if(token === null) customiseNavbar(['home', 'login','register']) //navbar if logged out
		// add content to the page

	} catch(err) {
		console.error(err)
	}
}


async function searchFood(node){
	const value = document.getElementById('searchbar').value
	console.log("https://api.edamam.com/api/food-database/v2/parser/"+ value)
	const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=0dc8dbf9&app_key=26d3a8f5d794b2698a1b8f8bf2c1802b&ingr=${value}&nutrition-type=cooking`, {
                method: 'GET',
                headers: { "Accept": "application/json" },
            })
            if (response.ok === true) {
				const data = await response.json()
				if(data.hints.length == 0){
					console.log("empty")
					showMessage("food not found")
					return
				}
				console.log(data.hints[0].food.label)
			}
			else{
				console.log("poop")
			}
		
}

