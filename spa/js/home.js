
/* home.js */

import { customiseNavbar, showMessage, loadPage } from '../util.js'



export async function setup(node) {
	try {
		if (localStorage.getItem("settingsToken") !== null && localStorage.getItem('settingsToken') !="false") {
			
		}else{
			loadPage('login')
			return;
		}
		await getDailyCal(node)
		console.log("test")
		await searchBar(node)
		await excersiseBar(node)
		document.querySelector('header p').innerText = 'Welcome ' + localStorage.getItem('username') + "!"
		document.querySelector('header p').setAttribute('id', 'settingsHeader')
		customiseNavbar(['settings', 'logout', 'vitamins','backlog','stats'])
		const token = localStorage.getItem('authorization')

		console.log(token)
		if(token === null) customiseNavbar(['home', 'login','register'])

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
        console.log(data)
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

async function searchBar(node){
		var foodLabels = document.createElement('div')
		foodLabels.setAttribute('id', 'foodLabels')
		var foodName = document.createElement('p')
		var calAmount = document.createElement('p')
		var protAmount = document.createElement('p')
		var carbAmount = document.createElement('p')
		var fatAmount = document.createElement('p')
		var saveBacklog = document.createElement('button')
		saveBacklog.innerText = "Save"
		foodName.setAttribute('id', 'foodName')
		protAmount.setAttribute('id','protAmount')
		carbAmount.setAttribute('id','carbAmount')
		calAmount.setAttribute('id','calAmount')
		fatAmount.setAttribute('id','fatAmount')
		foodName.innerText = "Description"
		protAmount.innerText = "Protein Amount"
		carbAmount.innerText = "Carbohydrate Amount"
		fatAmount. innerText = "Fat Amount"
		calAmount.innerText = "Calorie Amount"
		saveBacklog.setAttribute('id','saveExcersise')
		foodLabels.appendChild(foodName)
		foodLabels.appendChild(calAmount)
		foodLabels.appendChild(protAmount)
		foodLabels.appendChild(carbAmount)
		foodLabels.appendChild(fatAmount)
		foodLabels.appendChild(saveBacklog)
		node.appendChild(foodLabels)
		var button1 = node.getElementById('searchButton')
		button1.addEventListener('click', await searchFood)
		saveBacklog.addEventListener('click', await saveToBacklog)
}

	    


async function saveToBacklog(){
	document.getElementById('saveWrapper').textContent=''
	var currentdate = new Date();
	var datetime =   currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/"  + currentdate.getFullYear() 
	var caloriesUser = parseInt(document.getElementById('personCalories').innerText) - parseInt(document.getElementById('calAddUp').innerText)
	console.log(typeof(caloriesUser))
	const data = {
		username: localStorage.getItem('username'),
		date: datetime,
		calories:caloriesUser
	}
	const options = {
		method: 'POST',
		headers: {
            'Authorization': localStorage.getItem('authorization'),
			'Content-Type': 'application/vnd.api+json',
			'Accept': 'application/vnd.api+json'
		},
		body: JSON.stringify(data)
	}
	const response = await fetch('/api/backlog',options)
	const backfeed = await response.json()
	console.log(backfeed)
}
 
async function excersiseBar(node){
	const excersises = ["Walking","Swimming","Running","Weight Lifting", "Cycling"]
	const intensities = ["Low Intensity", "Medium Intensity", "Vigurous Intensity"]
	const intensityDic = {
		low: 1,
		medium: 1.2,
		high: 1.5
	}
	const excersiseBtn = node.getElementById('saveExcersise')
	excersiseBtn.addEventListener('click',function(){
		const excersise = document.getElementById('excersise')
		const excersiseValue = excersise.options[excersise.selectedIndex].text
		const intensity = document.getElementById('effort')
		const intensityValue = intensity.options[intensity.selectedIndex].text
		const duration = document.getElementById('duration').value
		if(duration == ""){
			alert("Specify a duration")
			return;
		}
		const running = 653
		const swimming = 600
		const walking = 350
		const weights =  333
		const cycling = 666
		console.log(excersiseValue + " " + intensityValue + " " + duration)
		if(excersiseValue == "Walking"){
			if(intensityValue == "Low Intensity"){
				var finalCals = (duration / 100) *  walking
			}
			if(intensityValue == "Medium Intensity"){
				var finalCals = (duration / 100) *  (walking * 1.2)
			}
			if(intensityValue == "Vigurous Intensity"){
				var finalCals = (duration / 100) * (walking * 1.5)
			}
		}
		if(excersiseValue == "Swimming"){
			if(intensityValue == "Low Intensity"){
				var finalCals = (duration / 100) *  swimming
			}
			if(intensityValue == "Medium Intensity"){
				var finalCals = (duration / 100) *  (swimming * 1.2)
			}
			if(intensityValue == "Vigurous Intensity"){
				var finalCals = (duration / 100) * (swimming * 1.5)
			}
		}
		if(excersiseValue == "Running"){
			if(intensityValue == "Low Intensity"){
				var finalCals = (duration / 100) *  running
			}
			if(intensityValue == "Medium Intensity"){
				var finalCals = (duration / 100) *  (running * 1.2)
			}
			if(intensityValue == "Vigurous Intensity"){
				var finalCals = (duration / 100) * (running * 1.5)
			}
		}
		if(excersiseValue == "Cycling"){
			if(intensityValue == "Low Intensity"){
				var finalCals =(duration / 100) *  cycling
			}
			if(intensityValue == "Medium Intensity"){
				var finalCals = (duration / 100) *  (cycling * 1.2)
			}
			if(intensityValue == "Vigurous Intensity"){
				var finalCals = (duration / 100) * (cycling * 1.5)
			}
		}
		if(excersiseValue == "Weight Lifting"){
			if(intensityValue == "Low Intensity"){
				var finalCals = (duration / 100) *  weights
			}
			if(intensityValue == "Medium Intensity"){
				var finalCals = (duration / 100) *  (weights * 1.2)
			}
			if(intensityValue == "Vigurous Intensity"){
				var finalCals = (duration / 100) * (weights * 1.5)
			}
		}
		var wrapper = document.getElementById('saveWrapper')
		var excersiseName = document.createElement('p')
		var excersiseCals = document.createElement('p')
		var excersiseName1 = document.createElement('p')
		var excersiseName2 = document.createElement('p')
		var excersiseName3 = document.createElement('p')
		excersiseName.innerText = excersiseValue
		excersiseName.style.fontSize = "25px"
		excersiseCals.innerText = "-" + Math.round(finalCals)
		wrapper.appendChild(excersiseName)
		wrapper.appendChild(excersiseCals)
		wrapper.appendChild(excersiseName1)
		wrapper.appendChild(excersiseName2)
		wrapper.appendChild(excersiseName3)
		var removeButton = document.createElement('button')
		removeButton.innerText = "\u274C"
		removeButton.setAttribute('class', 'saveFood')
		wrapper.appendChild(removeButton)
		var personCalories = document.getElementById('personCalories')
		var newCalories = parseInt(personCalories.innerText) + Math.round(finalCals)
		personCalories.innerText = newCalories
		removeButton.addEventListener('click', function(){
			var removedCalories = parseInt(personCalories.innerText) - Math.abs(Math.round(finalCals))
			personCalories.innerText = Math.round(removedCalories)
			excersiseCals.remove()
			excersiseName.remove()
			excersiseName1.remove()
			excersiseName2.remove()
			excersiseName3.remove()
			removeButton.remove()
		})

	})
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
	saveButton.innerText = "ADD"
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
		cals.setAttribute('id', "personCalories")
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
		cals.setAttribute('id', "personCalories")
		cals.innerText = femaleCalories
		var caldiv = document.createElement('div')
		caldiv.appendChild(cals)
		caldiv.setAttribute('id','dailyCalories')
		document.body.appendChild(caldiv)
	}
}

function addFood(information){
	document.getElementById('wrapperFoods').remove()
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

