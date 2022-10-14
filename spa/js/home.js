
/* home.js */

import { customiseNavbar, showMessage } from '../util.js'



export async function setup(node) {
	try {
		await getDailyCal(node)
		var x = document.createElement("INPUT");
		var v = document.createElement("INPUT");
		v.setAttribute('type', "text")
		v.setAttribute('id', "searchMeasure")
		x.setAttribute("type", "text");
		x.setAttribute("id","searchbar")
		x.setAttribute('placeholder', "Enter Food")
		v.setAttribute('placeholder', "Grams")
		node.appendChild(v)
		node.appendChild(x)
		var white = document.createElement('p')
		node.appendChild(white)
		var button1 = document.createElement('button')
		var foodLabels = document.createElement('div')
		foodLabels.setAttribute('id', 'foodLabels')
		var foodName = document.createElement('p')
		var calAmount = document.createElement('p')
		var protAmount = document.createElement('p')
		var carbAmount = document.createElement('p')
		var fatAmount = document.createElement('p')
		foodName.setAttribute('id', 'foodName')
		protAmount.setAttribute('id','protAmount')
		carbAmount.setAttribute('id','carbAmount')
		calAmount.setAttribute('id','calAmount')
		fatAmount.setAttribute('id','fatAmount')
		button1.setAttribute("id","searchButton")
		foodName.innerText = "Food Name"
		protAmount.innerText = "Protein Amount"
		carbAmount.innerText = "Carbohydrate Amount"
		fatAmount. innerText = "Fat Amount"
		calAmount.innerText = "Calorie Amount"
		foodLabels.appendChild(foodName)
		foodLabels.appendChild(calAmount)
		foodLabels.appendChild(protAmount)
		foodLabels.appendChild(carbAmount)
		foodLabels.appendChild(fatAmount)
		node.appendChild(button1)
		node.appendChild(foodLabels)
		button1.innerHTML = "Search"
		var c = document.createElement('p')
		c.setAttribute('id',"searchLabel")
		c.innerText = "Enter what you've eaten"
		node.appendChild(c)
		document.querySelector('header p').innerText = 'Welcome ' + localStorage.getItem('username') + "!"
		document.querySelector('header p').setAttribute('id', 'settingsHeader')
		customiseNavbar(['home', 'settings', 'logout','stats', 'vitamins']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		button1.addEventListener('click', await searchFood)
		console.log(token)
		if(token === null) customiseNavbar(['home', 'login','register']) //navbar if logged out
		// add content to the page

	} catch(err) {
		console.error(err)
	}
}

async function searchFood(event){
	var remove = document.getElementById('wrapperFoods')
	if(remove !=null ){
		remove.remove()
	}
	

	var node = event.currentTarget.myparam
	const value = document.getElementById('searchbar').value 
	const measurment = document.getElementById('searchMeasure').value / 100
	if(value == "" ){
		alert('Please enter all required fields')
		return
	}
	if(measurment == "" ){
		alert('Please enter all required fields')
		return
	}
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
				console.log(data.hints[0].food.nutrients)
				const information = {
					name: data.hints[0].food.label,
					calories: Math.ceil(data.hints[0].food.nutrients.ENERC_KCAL*measurment),
					protein: Math.ceil(data.hints[0].food.nutrients.PROCNT*measurment),
					carbs: Math.ceil(data.hints[0].food.nutrients.CHOCDF*measurment),
					fat: Math.ceil(data.hints[0].food.nutrients.FAT*measurment),
					image: data.hints[0].food.image
				}
				loadFood(information)
			}
}

function loadFood(information){
	var wrapper = document.createElement('div')
	var imgDiv = document.createElement('div')
	var nameDiv = document.createElement('div')
	var calDiv = document.createElement('div')
	var protDiv = document.createElement('div')
	var carbDiv = document.createElement('div')
	var fatDiv = document.createElement('div')
	var imgEle = document.createElement('img')
	var nameEle = document.createElement('p')
	var calEle = document.createElement('p')
	var protEle = document.createElement('p')
	var carbEle = document.createElement('p')
	var fatEle = document.createElement('p')
	var saveButton = document.createElement('button')
	imgEle.setAttribute('src', information.image)
	imgEle.style.width = "75px"
	imgEle.style.height = "75px"
	nameEle.innerText = information.name
	calEle.innerText = information.calories +" Cal"
	imgDiv.style.marginRight = "10px"
	protEle.innerText = information.protein +" P"
	carbEle.innerText = information.carbs + "C"
	fatEle.innerText = information.fat + " F"
	nameEle.style.fontSize = "25px"
	imgDiv.appendChild(imgEle)
	nameDiv.appendChild(nameEle)
	calDiv.appendChild(calEle)
	protDiv.appendChild(protEle)
	carbDiv.appendChild(carbEle)
	fatDiv.appendChild(fatEle)
	saveButton.setAttribute('class', 'saveFood')
	saveButton.innerText = "Save"
	wrapper.setAttribute('id', 'wrapperFoods')
	wrapper.appendChild(imgDiv)
	wrapper.appendChild(nameDiv)
	wrapper.appendChild(calDiv)
	wrapper.appendChild(protDiv)
	wrapper.appendChild(carbDiv)
	wrapper.appendChild(fatDiv)
	wrapper.appendChild(saveButton)
	document.body.appendChild(wrapper)
	saveButton.addEventListener('click', function(){
		addFood(information)
	})

}

async function getDailyCal(node){
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
	if(userData.data[0].gender == "male"){
		var age = parseInt(userData.data[0].age)
		var weight = parseInt(userData.data[0].weight)
		var height = parseInt(userData.data[0].height)
		const maleCalories = Math.round(66.5 + (13.75 * weight)+(5.003 * height)-(4.676 * age))
		console.log(maleCalories)
		var calLabel = document.createElement('h2')
		var callabel1 = document.createElement('h2')
		calLabel.innerText = "Calories You've eaten"
		callabel1.innerText = "Out Of: "
		var calAddUp = document.createElement('h2')
		calAddUp.setAttribute('id','calAddUp')
		calAddUp.innerText = 0
		var cals = document.createElement('h2')
		cals.innerText = maleCalories
		var caldiv = document.createElement('div')
		caldiv.appendChild(calLabel)
		caldiv.appendChild(calAddUp)
		caldiv.appendChild(callabel1)
		caldiv.appendChild(cals)
		caldiv.setAttribute('id','dailyCalories')
		document.body.appendChild(caldiv)
	}
	if(userData.data[0].gender == "female"){
		var age = parseInt(userData.data[0].age)
		var weight = parseInt(userData.data[0].weight)
		var height = parseInt(userData.data[0].height)
		const femaleCalories = Math.round(655.1+ (9.563 * weight)+(1.850 * height)-(4.676 * age))
		var cals = document.createElement('h2')
		var cals1 = document.createElement('h2')
		cals.innerText = femaleCalories
		var caldiv = document.createElement('div')
		caldiv.appendChild(cals)
		caldiv.setAttribute('id','dailyCalories')
		document.body.appendChild(caldiv)
	}
}

function addFood(information){

	var nameDiv = document.createElement('div')
	var calDiv = document.createElement('div')
	var protDiv = document.createElement('div')
	var carbDiv = document.createElement('div')
	var fatDiv = document.createElement('div')
	var nameEle = document.createElement('p')
	var calEle = document.createElement('p')
	var protEle = document.createElement('p')
	var carbEle = document.createElement('p')
	var fatEle = document.createElement('p')
	var num = information.calories
	var base = document.getElementById('calAddUp')
	var num1 = parseInt(base.innerText)
	var num2 = num1+num
	base.innerText = num2
	var removeButton = document.createElement('button')
	removeButton.innerText = "\u274C"
	removeButton.setAttribute('class', 'saveFood')
	nameEle.innerText = information.name
	nameEle.style.fontSize = "25px"
	calEle.innerText = information.calories
	protEle.innerText = information.protein +"g"
	carbEle.innerText = information.carbs+"g"
	fatEle.innerText = information.fat +"g"
	nameDiv.appendChild(nameEle)
	calDiv.appendChild(calEle)
	protDiv.appendChild(protEle)
	carbDiv.appendChild(carbEle)
	fatDiv.appendChild(fatEle)
	var wrapper = document.getElementById('saveWrapper')
	wrapper.appendChild(nameDiv)
	wrapper.appendChild(calDiv)
	wrapper.appendChild(protDiv)
	wrapper.appendChild(carbDiv)
	wrapper.appendChild(fatDiv)
	wrapper.appendChild(removeButton)
	document.body.appendChild(wrapper)
	removeButton.addEventListener('click', function(){
		var removeAmount = parseInt(document.getElementById('calAddUp').innerText)
		var correctAmount  = removeAmount - information.calories
		document.getElementById('calAddUp').innerText = correctAmount
		nameDiv.remove()
		calDiv.remove()
		protDiv.remove()
		carbDiv.remove()
		fatDiv.remove()
		removeButton.remove()
	})
}

