import { createToken, customiseNavbar, loadPage, showMessage } from '../util.js'

export async function setup(node){
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
        await vitaminInformation(node)
		console.log('LOGIN: setup')
		console.log(node)
		document.querySelector('header p').innerText = 'Details Page'
        console.log()
        document.querySelector('header p').setAttribute('id', 'settingsHeader')
		customiseNavbar(['home', 'settings', 'stats','logout','vitamins'])
	} catch(err) {
		console.error(err)
	}
}


async function vitaminInformation(node){
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
    const vitamins = ["vita","vitb1","vitb2","vitb3","vitb5","vitb6","vitb12","vitc","vitd","vite","vitk","ldl","hdl"]
    const vitToGet = localStorage.getItem('details')
    console.log(vitToGet)
    var vitamin = vitamins[vitToGet-1]
    console.log(vitamin)
    const vitaminGot = extracted[vitamin]
	if (vitamin == "vita"){
		aVitamin(vitaminGot,node)
	}
	if (vitamin == "vitb1"){
		b1Vitamin(vitaminGot,node)
	}
	if (vitamin == "vitb2"){
		b2Vitamin(vitaminGot,node)
	}
	if (vitamin == "vitb3"){
		b3Vitamin(vitaminGot,node)
	}
	if (vitamin == "vitb5"){
		b5Vitamin(vitaminGot,node)
	}
	if (vitamin == "vitb6"){
		b6Vitamin(vitaminGot,node)
	}
	if (vitamin == "vitb12"){
		b12Vitamin(vitaminGot,node)
	}
	if (vitamin == "vitc"){
		cVitamin(vitaminGot,node)
	}
	if (vitamin == "vitd"){
		dVitamin(vitaminGot,node)
	}
	if (vitamin == "vite"){
		eVitamin(vitaminGot,node)
	}
	if (vitamin == "vitk"){
		kVitamin(vitaminGot,node)
	}
	if (vitamin == "ldl"){
		ldlVitamin(vitaminGot,node)
	}
	if (vitamin == "hdl"){
		hdlVitamin(vitaminGot,node)
	}
	
}

function aVitamin(vitaminGot,node){
    if(vitaminGot <= 15  || vitaminGot >= 65  ){
        const vitamina = `Your Vitamin A blood levels are not in the recomended range of 15-60 Micrograms Per Decilitre, yours is ${vitaminGot} Micrograms Per Decilitre . Vitamin A deficencies can cause cirrhosis of the liver, pancreatic insufficiency celiac disease and more.`
        const vitamina2 = "Vitamin A helps form and maintain healthy teeth, skeletal and soft tissue, mucus membranes, and skin. It is also known as retinol because it produces the pigments in the retina of the eye."
        const vitaminab = vitamina + '\n' + vitamina2
        const vitaminabp = document.createElement('p')
		vitaminabp.style.fontSize = "25px"
        vitaminabp.innerText = vitaminab
        var vitadiv = document.createElement('div')
        vitadiv.setAttribute('id','informationDivb')
        vitadiv.appendChild(vitaminabp)
       
		const vitamina1 = "Foods that are healthy and high in Vitamin A are: \n Kale = 9 990 IU / 100g \n Broccoli = 623 IU / 100g \n Spinach = 9 377 IU / 100g \n Carrots = 16 706 IU / 100g \n Sweet Potatoes = 14 187 IU / 100g \n \n The daily recommended intake of Vitamin A is 3000 IU"
		const vitaminaFood = document.createElement('p')
		vitaminaFood.style.fontSize = "25px"
        vitaminaFood.innerText = vitamina1
		var space = document.createElement('p')
		var space1 = document.createElement('p')
		space.style = "padding:20px"
		space1.style = "padding:20px"
        var vita1div = document.createElement('div')
        vita1div.setAttribute('id','informationDivb')
        vita1div.appendChild(vitaminaFood)
		node.appendChild(space1)
		node.appendChild(vitadiv)
		node.appendChild(space)
		node.appendChild(vita1div)
		
    }
}
function b1Vitamin(vitaminGot,node){
	console.log("??")
	if(vitaminGot <= 74  || vitaminGot >= 224  ){
        const vitaminb = `Your Vitamin B1 blood levels are not in the recomended range of 74-222 Nanomoles Per Litre, yours is ${vitaminGot} Nanomoles Per Litre . Vitamin B1 deficencies can cause fatigue, irritability, poor memory and more.`
        const vitaminb2 = "Vitamin B1 helps in boosting energy production.When sugar mixes with vitamin B1, it becomes energy for your body to use. Also, it reduces the effects of sepsis. Sepsis, a severe response to an infection, can become fatal if your vitamin B1 levels are low. B1 helps fight depression, good for diabetes."
        const vitaminbb = vitaminb + '\n' + vitaminb2
        const vitaminbbp = document.createElement('p')
        vitaminbbp.innerText = vitaminbb
		vitaminbbp.style.fontSize = "20px"
		const vitaminbfoodp = document.createElement('p')
		vitaminbfoodp.style.fontSize = "20px"
		vitaminbfoodp.innerText ="Foods that are healthy and high in Vitamin B1 are: \n 1. Beans = 0.196 mg / 100g , 2. Lentils = 0.22 mg / 100g \n 3. Green Peas = 0.26 mg / 100g \n 4. Noodles = 0.29 mg / 100g \n 5. Rice = 0.16 mg / 100g \n 6. Sunflower Seeds = 1.476 mg / 100g \n \n The daily recommended intake of Vitamin B1 is 1.2 mg"
		var space = document.createElement('p')
		var space1 = document.createElement('p')
		space.style = "padding:20px"
		space1.style = "padding:20px"
        var vitbdiv = document.createElement('div')
		var vitbfooddiv = document.createElement('div')
        vitbdiv.setAttribute('id','informationDiv1b')
		vitbfooddiv.setAttribute('id','informationDiv1b')
		vitbfooddiv.appendChild(vitaminbfoodp)
        vitbdiv.appendChild(vitaminbbp)
		node.appendChild(space1)
        node.appendChild(vitbdiv)
		node.appendChild(space)
		node.appendChild(vitbfooddiv)
    }
	
}

function b2Vitamin(vitaminGot,node){
	if(vitaminGot <= 4  || vitaminGot >= 24  ){
        const vitaminb = `Your Vitamin B2 blood levels are not in the recomended range of 4-24 Micograms Per Decilitre, yours is ${vitaminGot} Nanomoles Per Litre . Your Vitamin B2 blood levels are not in the recomended range of 4-24 Micograms Per Decilitre, yours is ${vitaminGot} Micograms Per Decilitre . Vitamin B2 deficiency can cause fatigue, swollen throat, blurred vision, and depression.`
        const vitaminb2 = "Vitamin B2 helps break down proteins, fats, and carbohydrates. It plays a vital role in maintaining the body's energy supply."
        const vitaminbb = vitaminb + '\n' + vitaminb2
        const vitaminbbp = document.createElement('p')
        vitaminbbp.innerText = vitaminbb
		vitaminbbp.style.fontSize = "20px"
		const vitaminbfoodp = document.createElement('p')
		vitaminbfoodp.style.fontSize = "20px"
		vitaminbfoodp.innerText ="Foods that are healthy and high in Vitamin B2 are: \n 1. Almonds 1 mg / 100g , 2. Spinach 0.2 mg / 100g \n 3. Tempeh 0.358 mg / 100g \n 4. Soybeans 0.28 mg / 100g \n 5. Cheese 1.2 mg / 100g \n 6. Eggs 0.5mg / 100g \n \n The daily recommended intake of Vitamin B2 is 1.3 mg"
		var space = document.createElement('p')
		var space1 = document.createElement('p')
		space.style = "padding:20px"
		space1.style = "padding:20px"
        var vitbdiv = document.createElement('div')
		var vitbfooddiv = document.createElement('div')
        vitbdiv.setAttribute('id','informationDiv1b')
		vitbfooddiv.setAttribute('id','informationDiv1b')
		vitbfooddiv.appendChild(vitaminbfoodp)
        vitbdiv.appendChild(vitaminbbp)
		node.appendChild(space1)
        node.appendChild(vitbdiv)
		node.appendChild(space)
		node.appendChild(vitbfooddiv)
    }
	
}

function b3Vitamin(vitaminGot,node){
		if(vitaminGot <= 0.5  || vitaminGot >= 9  ){
        const vitaminb = `Your Vitamin B3 blood levels are not in the recomended range of 0.5 - 8.45 Micrograms Per Mililiter, yours is ${vitaminGot} Micograms Per Mililitre . A severe Vitamin B3 deficiency leads to pellagra, a condition that causes a dark, sometimes scaly rash to develop on skin areas exposed to sunlight; bright redness of the tongue; and constipation/diarrhea.`
        const vitaminb2 = "Vitamin B3 helps improving blood fat leves, may reduce blood pressure, may help treat type 1 diabetes, boosts brain functions and improves skin health."
        const vitaminbb = vitaminb + '\n' + vitaminb2
        const vitaminbbp = document.createElement('p')
        vitaminbbp.innerText = vitaminbb
		vitaminbbp.style.fontSize = "20px"
		const vitaminbfoodp = document.createElement('p')
		vitaminbfoodp.style.fontSize = "20px"
		vitaminbfoodp.innerText ="Foods that are healthy and high in Vitamin B3 are: \n 1. Wild Rice 6.73 mg / 100g , 2. Whole Wheat Pasta 8.7 mg / 100g \n 3. Corn 3.63 mg / 100g \n 4. Lentils 2.6 mg / 100g \n 5. Tuna 13 mg / 100g (High in LDL Cholesterol, which is bad) \n \n The daily recommended intake of Vitamin B3 is 16 mg."
		var space = document.createElement('p')
		var space1 = document.createElement('p')
		space.style = "padding:20px"
		space1.style = "padding:20px"
        var vitbdiv = document.createElement('div')
		var vitbfooddiv = document.createElement('div')
        vitbdiv.setAttribute('id','informationDiv1b')
		vitbfooddiv.setAttribute('id','informationDiv1b')
		vitbfooddiv.appendChild(vitaminbfoodp)
        vitbdiv.appendChild(vitaminbbp)
		node.appendChild(space1)
        node.appendChild(vitbdiv)
		node.appendChild(space)
		node.appendChild(vitbfooddiv)
    }
	
}

function b5Vitamin(vitaminGot,node){
		if(vitaminGot <= 22.7  || vitaminGot >= 429.2  ){
        const vitaminb = `Your Vitamin B5 blood levels are not in the recomended range of 22.7 - 429.2 Micrograms Per Litre, yours is ${vitaminGot} Micograms Per Litre . A severe Vitamin B5 deficiency could lead to headaches, irritability, restlessness, nausea, vomiting, stomach cramps, muscle cramps, numbness or burning sensation in the feet. `
        const vitaminb2 = "In addition to playing a role in the breakdown of fats and carbohydrates for energy, vitamin B5 is critical to the manufacture of red blood cells, as well as sex and stress-related hormones produced in the adrenal glands, small glands that sit atop the kidneys."
        const vitaminbb = vitaminb + '\n' + vitaminb2
        const vitaminbbp = document.createElement('p')
        vitaminbbp.innerText = vitaminbb
		vitaminbbp.style.fontSize = "20px"
		const vitaminbfoodp = document.createElement('p')
		vitaminbfoodp.style.fontSize = "20px"
		vitaminbfoodp.innerText ="Foods that are healthy and high in Vitamin B5 are: \n 1. Baked Potato 0.56 mg / 100g , 2. Sweet Potato 0.58 mg / 100g \n 3. Mushrooms 2.16 mg / 100g \n 4. Oatmeal 1.35 mg / 100g \n 5. Avocado 1.463 mg / 100g \n 6. Chicken 2.92 mg / 100g (High in LDL Cholesterol, which is bad for your health) \n \n The daily recommended intake of Vitamin B5 is 5 mg."
		var space = document.createElement('p')
		var space1 = document.createElement('p')
		space.style = "padding:20px"
		space1.style = "padding:20px"
        var vitbdiv = document.createElement('div')
		var vitbfooddiv = document.createElement('div')
        vitbdiv.setAttribute('id','informationDiv1b')
		vitbfooddiv.setAttribute('id','informationDiv1b')
		vitbfooddiv.appendChild(vitaminbfoodp)
        vitbdiv.appendChild(vitaminbbp)
		node.appendChild(space1)
        node.appendChild(vitbdiv)
		node.appendChild(space)
		node.appendChild(vitbfooddiv)
    }
	
}

function b6Vitamin(vitaminGot,node){
		if(vitaminGot <= 5  || vitaminGot >= 25  ){
			const vitaminb = `Your Vitamin B6 blood levels are not in the recomended range of 5 - 25 Nanograms Per Mililiter, yours is ${vitaminGot} Nanograms Per Mililiter . A severe Vitamin B6 deficiency can cause inflammation of the skin (dermatitis) and a red, greasy, scaly rash. `
			const vitaminb2 = "Vitamin B-6 (pyridoxine) is important for normal brain development and for keeping the nervous system and immune system healthy."
			const vitaminbb = vitaminb + '\n' + vitaminb2
			const vitaminbbp = document.createElement('p')
			vitaminbbp.innerText = vitaminbb
			vitaminbbp.style.fontSize = "20px"
			const vitaminbfoodp = document.createElement('p')
			vitaminbfoodp.style.fontSize = "20px"
			vitaminbfoodp.innerText ="Foods that are healthy and high in Vitamin B6 are: \n 1. Tuna  1 mg (High In LDL Cholesterol, which is bad for your health) / 100g , 2. Avocado 0.26 mg / 100g \n 3. Banana 0,4 mg / 100g \n 4. Chickpeas 0,5 mg / 100g \n 5. Sunflower Seeds 1,3 mg / 100g \n 6. Hazelnuts 0,6 mg / 100g \n 7. Spinach = 0,2 mg / 100g \n \n The daily recommended intake of Vitamin B6 is 1.5 mg."
			var space = document.createElement('p')
			var space1 = document.createElement('p')
			space.style = "padding:20px"
			space1.style = "padding:20px"
			var vitbdiv = document.createElement('div')
			var vitbfooddiv = document.createElement('div')
			vitbdiv.setAttribute('id','informationDiv1b')
			vitbfooddiv.setAttribute('id','informationDiv1b')
			vitbfooddiv.appendChild(vitaminbfoodp)
			vitbdiv.appendChild(vitaminbbp)
			node.appendChild(space1)
			node.appendChild(vitbdiv)
			node.appendChild(space)
			node.appendChild(vitbfooddiv)
    }
	
}
function b12Vitamin(vitaminGot,node){
		if(vitaminGot <= 205  || vitaminGot >= 678  ){
			const vitaminb = `Your Vitamin B12 blood levels are not in the recomended range of 205-678 Nanograms Per Mililiter, yours is ${vitaminGot} Nanograms Per Mililiter . A severe Vitamin B12 deficiency can cause extreme tiredness, a lack of energy, pins and needles (paraesthesia), a sore and red tongue, mouth ulcers, muscle weakness, disturbed vision. `
			const vitaminb2 = "Vitamin B-12 (cobalamin) plays an essential role in red blood cell formation, cell metabolism, nerve function and the production of DNA, the molecules inside cells that carry genetic information."
			const vitaminbb = vitaminb + '\n' + vitaminb2
			const vitaminbbp = document.createElement('p')
			vitaminbbp.innerText = vitaminbb
			vitaminbbp.style.fontSize = "20px"
			const vitaminbfoodp = document.createElement('p')
			vitaminbfoodp.style.fontSize = "20px"
			vitaminbfoodp.innerText ="Foods that are healthy and high in Vitamin B12 are: \n 1. The best way of getting your daily recommended intake of Vitamin B12 is by supplementing!\n 2. Eggs  0.89 μg / 100g μg (High In LDL Cholesterol, which is bad for your health) \n 3. Chicken 0.31 μg / 100g (High In LDL Cholesterol, which is bad for your health) \n 4. Milk 0.53 μg / 100g (High In LDL Cholesterol, which is bad for your health) \n 5. Liver 18,7 µg / 100g (High In LDL Cholesterol, which is bad for your health) \n The daily recommended intake of Vitamin B12 is 2.4 µg."
			var space = document.createElement('p')
			var space1 = document.createElement('p')
			space.style = "padding:20px"
			space1.style = "padding:20px"
			var vitbdiv = document.createElement('div')
			var vitbfooddiv = document.createElement('div')
			vitbdiv.setAttribute('id','informationDiv1b')
			vitbfooddiv.setAttribute('id','informationDiv1b')
			vitbfooddiv.appendChild(vitaminbfoodp)
			vitbdiv.appendChild(vitaminbbp)
			node.appendChild(space1)
			node.appendChild(vitbdiv)
			node.appendChild(space)
			node.appendChild(vitbfooddiv)

	}
}
function cVitamin(vitaminGot,node){
	if(vitaminGot <= 0.6  || vitaminGot >= 2  ){
			const vitaminb = `Your Vitamin C blood levels are not in the recomended range of 0.6-2 Miligrams Per Decilitre, yours is ${vitaminGot} Miligrams Per Decilitre . A severe Vitamin C deficiency can cause a condition called scurvy, fatigue and weakness, low mood, pain in the muscles and joints, nosebleeds, easy bruising, headaches, swollen or bleeding gums, low mood.`
			const vitaminb2 = "Vitamin C is an antioxidant that helps protect your cells against the effects of free radicals — molecules produced when your body breaks down food or is exposed to tobacco smoke and radiation from the sun, X-rays or other sources. Free radicals might play a role in heart disease, cancer and other diseases."
			const vitaminbb = vitaminb + '\n' + vitaminb2
			const vitaminbbp = document.createElement('p')
			vitaminbbp.innerText = vitaminbb
			vitaminbbp.style.fontSize = "20px"
			const vitaminbfoodp = document.createElement('p')
			vitaminbfoodp.style.fontSize = "20px"
			vitaminbfoodp.innerText ="Foods that are healthy and high in Vitamin C are: \n 1. Red Peppers - 242.5 mg / 100g \n 2. Kale 120 mg / 100g \n 3. Orange 53.2 mg / 100g \n 4. Strawberries 58.8 mg / 100g \n 5. Brussel Sprouts 85mg / 100g \n 6. Kiwi 92.7 mg / 100g \n 7. Broccoli 89.2 mg / 100g \n\n The daily recommended intake of Vitamin C is 75 mg."
			var space = document.createElement('p')
			var space1 = document.createElement('p')
			space.style = "padding:20px"
			space1.style = "padding:20px"
			var vitbdiv = document.createElement('div')
			var vitbfooddiv = document.createElement('div')
			vitbdiv.setAttribute('id','informationDiv1b')
			vitbfooddiv.setAttribute('id','informationDiv1b')
			vitbfooddiv.appendChild(vitaminbfoodp)
			vitbdiv.appendChild(vitaminbbp)
			node.appendChild(space1)
			node.appendChild(vitbdiv)
			node.appendChild(space)
			node.appendChild(vitbfooddiv)
	
	}
}
function dVitamin(vitaminGot,node){
	if(vitaminGot <= 20  || vitaminGot >= 40  ){
			const vitaminb = `Your Vitamin D blood levels are not in the recomended range of 20 - 40 Nanograms Per Mililiter, yours is ${vitaminGot} Nanograms Per Mililitre . Vitamin D deficiency can lead to a loss of bone density, which can contribute to osteoporosis and fractures (broken bones). Severe vitamin D deficiency can also lead to other diseases. In children, it can cause rickets. Rickets is a rare disease that causes the bones to become soft and bend.`
			const vitaminb2 = "Vitamin D helps regulate the amount of calcium and phosphate in the body. These nutrients are needed to keep bones, teeth and muscles healthy. A lack of vitamin D can lead to bone deformities such as rickets in children, and bone pain caused by a condition called osteomalacia in adults."
			const vitaminbb = vitaminb + '\n' + vitaminb2
			const vitaminbbp = document.createElement('p')
			vitaminbbp.innerText = vitaminbb
			vitaminbbp.style.fontSize = "20px"
			const vitaminbfoodp = document.createElement('p')
			vitaminbfoodp.style.fontSize = "20px"
			vitaminbfoodp.innerText ="Foods that are healthy and high in Vitamin D are: \n 1. The best way of getting your daily recommended intake of Vitamin D is by supplementing! \n 2. Salmon - 526 IU / 100g (High in LDL Cholesterol which is bad) \n 3. Sardines 193 IU / 100g (High in LDL Cholesterol, which is bad for your health) \n 4. Orange juice fortified with Vitamin D. \n\n The daily recommended intake of Vitamin D is 800 IU."
			var space = document.createElement('p')
			var space1 = document.createElement('p')
			space.style = "padding:20px"
			space1.style = "padding:20px"
			var vitbdiv = document.createElement('div')
			var vitbfooddiv = document.createElement('div')
			vitbdiv.setAttribute('id','informationDiv1b')
			vitbfooddiv.setAttribute('id','informationDiv1b')
			vitbfooddiv.appendChild(vitaminbfoodp)
			vitbdiv.appendChild(vitaminbbp)
			node.appendChild(space1)
			node.appendChild(vitbdiv)
			node.appendChild(space)
			node.appendChild(vitbfooddiv)
	
	}
	
}
function eVitamin(vitaminGot,node){
	if(vitaminGot <= 5.5  || vitaminGot >= 17  ){
			const vitaminb = `Your Vitamin E blood levels are not in the recomended range of 5.5 - 17 Micrograms Per Mililiter, yours is ${vitaminGot} Micrograms Per Mililiter . Vitamin E deficiency can lead to a loss of bone density, which can contribute to osteoporosis and fractures (broken bones).Vitamin E deficiency can cause nerve and muscle damage that results in loss of feeling in the arms and legs, loss of body movement control, muscle weakness, and vision problems. Another sign of deficiency is a weakened immune system.`
			const vitaminb2 = "Vitamin E helps maintain healthy skin and eyes, and strengthen the body's natural defence against illness and infection (the immune system)."
			const vitaminbb = vitaminb + '\n' + vitaminb2
			const vitaminbbp = document.createElement('p')
			vitaminbbp.innerText = vitaminbb
			vitaminbbp.style.fontSize = "20px"
			const vitaminbfoodp = document.createElement('p')
			vitaminbfoodp.style.fontSize = "20px"
			vitaminbfoodp.innerText ="Foods that are healthy and high in Vitamin E are: \n 1. Sunflower Seeds 35 mg / 100g \n 2. Almonds 26 mg / 100g \n 3. Sunflower Oil 41 mg / 100g \n 4. Almond Oil 39 mg / 100g 5. Hazelnuts 15mg / 100g \n\n The daily recommended intake of Vitamin E is 15 mg."
			var space = document.createElement('p')
			var space1 = document.createElement('p')
			space.style = "padding:20px"
			space1.style = "padding:20px"
			var vitbdiv = document.createElement('div')
			var vitbfooddiv = document.createElement('div')
			vitbdiv.setAttribute('id','informationDiv1b')
			vitbfooddiv.setAttribute('id','informationDiv1b')
			vitbfooddiv.appendChild(vitaminbfoodp)
			vitbdiv.appendChild(vitaminbbp)
			node.appendChild(space1)
			node.appendChild(vitbdiv)
			node.appendChild(space)
			node.appendChild(vitbfooddiv)
	
	}
	
}

function kVitamin(vitaminGot,node){
		if(vitaminGot <= 0.2  || vitaminGot >= 3.2  ){
			const vitaminb = `Your Vitamin K blood levels are not in the recomended range of 0.2 - 3.2 Nanograms Per Mililiter, yours is ${vitaminGot} Nanograms Per Mililiter. The main symptom of Vitamin K deficiency is bleeding (hemorrhage)—into the skin (causing bruises), from the nose, from a wound, in the stomach, or in the intestine. Sometimes bleeding in the stomach causes vomiting with blood. Blood may be seen in the urine or stool, or stools may be tarry black.`
			const vitaminb2 = "Vitamin K helps to make various proteins that are needed for blood clotting and the building of bones. Prothrombin is a vitamin K-dependent protein directly involved with blood clotting. Osteocalcin is another protein that requires vitamin K to produce healthy bone tissue."
			const vitaminbb = vitaminb + '\n' + vitaminb2
			const vitaminbbp = document.createElement('p')
			vitaminbbp.innerText = vitaminbb
			vitaminbbp.style.fontSize = "20px"
			const vitaminbfoodp = document.createElement('p')
			vitaminbfoodp.style.fontSize = "20px"
			vitaminbfoodp.innerText ="Foods that are healthy and high in Vitamin K are: \n 1. Cooked Spinach 540.7 mcg / 100g \n 2. Cooked Kale 418.5 mcg / 100g \n 3. Cooked Mustard Greens 592.7 mcg / 100g \n 4. Cooked Collard Greens 623.2 mcg / 100g 5. Raw Swiss Chard 830 mcg / 100g \n 6. Raw Dandelion Greens 778.4 mcg / 100g \n \n The daily recommended intake of Vitamin K is 1 mcg / Your Body Weight In Pounds."
			var space = document.createElement('p')
			var space1 = document.createElement('p')
			space.style = "padding:20px"
			space1.style = "padding:20px"
			var vitbdiv = document.createElement('div')
			var vitbfooddiv = document.createElement('div')
			vitbdiv.setAttribute('id','informationDiv1b')
			vitbfooddiv.setAttribute('id','informationDiv1b')
			vitbfooddiv.appendChild(vitaminbfoodp)
			vitbdiv.appendChild(vitaminbbp)
			node.appendChild(space1)
			node.appendChild(vitbdiv)
			node.appendChild(space)
			node.appendChild(vitbfooddiv)
	
	}
	
}
function ldlVitamin(vitaminGot,node){
			if(vitaminGot <= 100  || vitaminGot >= 129  ){
				const vitaminb = `Your LDL Cholesterol blood levels are not in the recomended range of 100 - 129 Miligrams Per Deciliter, yours is ${vitaminGot} Miligrams Per Deciliter. When your body has too much LDL cholesterol, the LDL cholesterol can build up on the walls of your blood vessels. This buildup is called “plaque.” As your blood vessels build up plaque over time, the insides of the vessels narrow. This narrowing blocks blood flow to and from your heart and other organs.`
				const vitaminb2 = "LDL Cholesterol is often called the “bad” cholesterol because it collects in the walls of your blood vessels, raising your chances of health problems like a heart attack or stroke. But cholesterol isn't all dangerous. Your body needs it to protect its nerves and make healthy cells and hormones. Your body makes the right amount LDL Cholesterol needed and thus it doesn't need to be ingested through diet."
				const vitaminbb = vitaminb + '\n' + vitaminb2
				const vitaminbbp = document.createElement('p')
				vitaminbbp.innerText = vitaminbb
				vitaminbbp.style.fontSize = "20px"
				const vitaminbfoodp = document.createElement('p')
				vitaminbfoodp.style.fontSize = "20px"
				vitaminbfoodp.innerText ="Foods that lower your LDL Cholesterol are : \n 1. Oats \n 2. Barley and other whole grains \n 3. Beans \n 4. Nuts \n 5. Vegetable Oils \n 6. Apples \n 7. Foods fortified with sterols and stanols"
				var space = document.createElement('p')
				var space1 = document.createElement('p')
				space.style = "padding:20px"
				space1.style = "padding:20px"
				var vitbdiv = document.createElement('div')
				var vitbfooddiv = document.createElement('div')
				vitbdiv.setAttribute('id','informationDiv1b')
				vitbfooddiv.setAttribute('id','informationDiv1b')
				vitbfooddiv.appendChild(vitaminbfoodp)
				vitbdiv.appendChild(vitaminbbp)
				node.appendChild(space1)
				node.appendChild(vitbdiv)
				node.appendChild(space)
				node.appendChild(vitbfooddiv)
		
	}
	
}
function hdlVitamin(vitaminGot,node){
	if(vitaminGot <= 400 ){
		const vitaminb = `Your HDL Cholesterol blood levels are not in the recomended range of 40 and above Miligrams Per Deciliter, yours is ${vitaminGot} Miligrams Per Deciliter. Without an adequate HDL level, there is a higher risk for plaques forming to block arteries. Heart attack or stroke: Plaques forming in the blood increase the risk they will dislodge or arteries flowing to the heart and brain will become blocked.`
		const vitaminb2 = "HDL (high-density lipoprotein), or “good” cholesterol, absorbs cholesterol and carries it back to the liver. The liver then flushes it from the body. High levels of HDL cholesterol can lower your risk for heart disease and stroke."
		const vitaminbb = vitaminb + '\n' + vitaminb2
		const vitaminbbp = document.createElement('p')
		vitaminbbp.innerText = vitaminbb
		vitaminbbp.style.fontSize = "20px"
		const vitaminbfoodp = document.createElement('p')
		vitaminbfoodp.style.fontSize = "20px"
		vitaminbfoodp.innerText ="The only ways of increasing your HDL Cholesterol is through excersise, losing weight and eating a low-saturated fat, whole plant based diet."
		var space = document.createElement('p')
		var space1 = document.createElement('p')
		space.style = "padding:20px"
		space1.style = "padding:20px"
		var vitbdiv = document.createElement('div')
		var vitbfooddiv = document.createElement('div')
		vitbdiv.setAttribute('id','informationDiv1b')
		vitbfooddiv.setAttribute('id','informationDiv1b')
		vitbfooddiv.appendChild(vitaminbfoodp)
		vitbdiv.appendChild(vitaminbbp)
		node.appendChild(space1)
		node.appendChild(vitbdiv)
		node.appendChild(space)
		node.appendChild(vitbfooddiv)
		
	}
	
}