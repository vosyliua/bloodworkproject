import { createToken, customiseNavbar, loadPage, showMessage } from '../util.js'

export async function setup(node){
	if (localStorage.getItem("settingsToken") !== null && localStorage.getItem('settingsToken') !="false") {
			
		}else{
			loadPage('login')
			return;
	}
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
        
		console.log('LOGIN: setup')
		console.log(node)
		document.querySelector('header p').innerText = 'Backlog Page'
        console.log()
        document.querySelector('header p').setAttribute('id', 'settingsHeader')
		customiseNavbar(['home', 'settings', 'stats','logout','vitamins'])
		await setBmi(node)
        await getBacklogs(node)
		
	} catch(err) {
		console.error(err)
	}
}

async function setBmi(node){
    const username = localStorage.getItem('username')
	const options = {
		method: 'GET',
		headers: {
			'Authorization' : localStorage.getItem('authorization'),
			'Content-Type': 'application/vnd.api+json'
		}
	}
	const response = await fetch(`/api/settings/${username}`, options)
    const data = await response.json()
    const extracted = data.data[0]
    console.log(extracted)
    const height = extracted.height/100
    console.log(height*height+"height squared")
    console.log(height+"normal height")
    console.log(extracted.weight+"weight")
    const bmi = extracted.weight * (height*height)
	let bmiResult = ""
    if(bmi <=18.5){
		bmiResult = "UNDERWEIGHT"
	}
	  if(bmi >=18.5 && bmi <=24.9){
		bmiResult = "NORMAL WEIGHT"
	}
	  if(24.9 <= bmi){
		bmiResult = "OVERWEIGHT"
	}
	if(30 <= bmi){
		bmiResult = "MORBIDLY OBESE"
	}
	console.log(bmiResult)
	let x = document.createElement('h2')
	let weightArray = ["UNDERWEIGHT", "NORMAL WEIGHT", "OVERWEIGHT","MORBIDLY OBESE"]
	weightArray.forEach(weight=>{
		if (bmiResult == weight){bmiResult = weight}
		
	})
	x.innerText = `Your BMI is ${bmi}, which means you are ${bmiResult}`
	x.style.position = "absolute"
	x.style.left = "0%"
	x.style.width = "100%"
	x.style.border = "5px solid black"
	x.style.backgroundColor = "navajowhite"
	x.style.textAlign ="center"
	node.appendChild(x)

}



async function getBacklogs(node){
    const username = localStorage.getItem('username')
    const options = {
		method: 'GET',
		headers: {
			'Authorization' : localStorage.getItem('authorization'),
			'Content-Type': 'application/vnd.api+json'
		}
	}
    const response = await fetch(`/api/backlog/${username}`, options)
    const data = await response.json()
	const template = document.querySelector("template#backlog")
	const wrapperFor = document.createElement('div')
	wrapperFor.setAttribute('id','mainBacklog')
	const dataArray = data.data
	console.log(dataArray)
	dataArray.forEach(item=>{
		const fragment = template.content.cloneNode(true)
		fragment.getElementById('datePer').innerText = item.date
		fragment.getElementById('calPer').style.width="700px"
		if(item.calories < 0 ){
			var gainedWeight = (100*item.calories) / 7200
			var gainedWeight1 = (gainedWeight*1000) / 100
			fragment.getElementById('calPer').innerText = "You overate by: " + parseInt(Math.abs(item.calories))+" Calories, and gained " +Math.round(Math.abs(gainedWeight1)) + " grams of weight"
		}else{
			var lostWeight = (100*item.calories) / 7200
			var lostWeight1 = (lostWeight*1000) / 100
			fragment.getElementById('calPer').innerText = "You underate by: " +item.calories +" Calories , and lost "+ Math.round(lostWeight1)+" grams of weight"
		}
		wrapperFor.appendChild(fragment)
		node.appendChild(wrapperFor)
	})
    
}



