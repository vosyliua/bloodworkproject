
import { createToken, customiseNavbar, loadPage, showMessage } from '../util.js'

export async function setup(node) {
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
        await userInformation(node)
		console.log('LOGIN: setup')
		console.log(node)
		document.querySelector('header p').innerText = 'OVERWIEW OF YOUR BLOOD RESULTS'
        document.querySelector('header p').setAttribute('id', 'settingsHeader')
		customiseNavbar(['home', 'settings','vitamins','logout'])
	} catch(err) {
		console.error(err)
	}
}

async function userInformation(node){
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
    console.log(data)
    console.log(data.data[0])
    if(data.data[0].vita <= 15  || data.data[0].vita >= 65  ){
        const vitamina = `Your Vitamin A blood levels are not in the recomended range of 15-60 Micrograms Per Decilitre, yours is ${data.data[0].vita} Micrograms Per Decilitre . Vitamin A deficencies can cause cirrhosis of the liver, pancreatic insufficiency celiac disease and more.`
        const vitamina1 = "Foods that are healthy and high in Vitamin A are Leafy green vegetables (kale, spinach, broccoli), orange and yellow vegetables (carrots, sweet potatoes, pumpkin and other winter squash, summer squash. "
        const vitamina2 = "Vitamin A helps form and maintain healthy teeth, skeletal and soft tissue, mucus membranes, and skin. It is also known as retinol because it produces the pigments in the retina of the eye."
        const vitaminab = vitamina + '\n' + vitamina1 + '\n' + vitamina2
        console.log(node)
        const vitaminabp = document.createElement('p')
        vitaminabp.innerText = vitaminab
        var vitadiv = document.createElement('div')
        vitadiv.setAttribute('id','informationDivb')
        vitadiv.appendChild(vitaminabp)
        node.appendChild(vitadiv)
    }
    else{
        const vitaminag = `Your Vitamin A levels, which are ${data.data[0].vita} fall in the healthy range between 15-60 Micrograms Per Decilitre`
        const vitaminagp = document.createElement('p')
        vitaminagp.innerText = vitaminag
        var vitadiv = document.createElement('div')
        vitadiv.setAttribute('id','informationDivg')
        vitadiv.appendChild(vitaminagp)
        node.appendChild(vitadiv)

    }
    if(data.data[0].vitb1 <= 74  || data.data[0].vitb1 >= 224  ){
        const vitaminb = `Your Vitamin B1 blood levels are not in the recomended range of 74-222 Nanomoles Per Litre, yours is ${data.data[0].vitb1} Nanomoles Per Litre . Vitamin B1 deficencies can cause fatigue, irritability, poor memory and more.`
        const vitaminb1 = "Foods that are healthy and high in Vitamin B1 are beans, lentils, green peas, enriched cereals, breads, noodles, rice, sunflower seeds and yogurt."
        const vitaminb2 = "Vitamin B1 helps in boosting energy production.When sugar mixes with vitamin B1, it becomes energy for your body to use. Also, it reduces the effects of sepsis. Sepsis, a severe response to an infection, can become fatal if your vitamin B1 levels are low. B1 helps fight depression, good for diabetes."
        const vitaminbb = vitaminb + '\n' + vitaminb1 + '\n' + vitaminb2
        const vitaminbbp = document.createElement('p')
        vitaminbbp.innerText = vitaminbb
        var vitbdiv = document.createElement('div')
        vitbdiv.setAttribute('id','informationDivb')
        vitbdiv.appendChild(vitaminbbp)
        
        node.appendChild(vitbdiv)
    }
    else{
        const vitaminbg = `Your Vitamin B1 levels, which are ${data.data[0].vitb1} fall in the healthy range between 74-222 Nanomoles Per Litre`
        const vitaminbgp = document.createElement('p')
        vitaminbgp.innerText = vitaminbg
        var vitbdiv = document.createElement('div')
        vitbdiv.setAttribute('id','informationDivg')
        vitbdiv.appendChild(vitaminbgp)
        node.appendChild(vitbdiv)
    } 
    if(data.data[0].vitb2 <= 4  || data.data[0].vitb2 >= 25  ){
        const vitaminbb = `Your Vitamin B2 blood levels are not in the recomended range of 4-24 Micograms Per Decilitre, yours is ${data.data[0].vitb2} Micograms Per Decilitre . Vitamin B2 deficiency can cause fatigue, swollen throat, blurred vision, and depression.`
        const vitaminbb1 = "Foods that are healthy and high in Vitamin B2 are almonds, spinach, tempeh, soybeans, yogurt, cheese, eggs."
        const vitaminbb2 = "Vitamin B2 helps break down proteins, fats, and carbohydrates. It plays a vital role in maintaining the body's energy supply."
        const vitaminbbb = vitaminbb + '\n' + vitaminbb1 + '\n' + vitaminbb2
        const vitaminbbbp = document.createElement('p')
        vitaminbbbp.innerText = vitaminbbb
        var vitbbdiv = document.createElement('div')
        vitbbdiv.setAttribute('id','informationDivb')
        vitbbdiv.appendChild(vitaminbbbp)
        node.appendChild(vitbbdiv)
    }
    else{
        const vitaminbbg = `Your Vitamin B2 levels, which are ${data.data[0].vitb2} fall in the healthy range between 4-24 Micrograms Per Decilitre`
        const vitaminbbgp = document.createElement('p')
        vitaminbbgp.innerText = vitaminbbg
        var vitbbdiv = document.createElement('div')
        vitbbdiv.setAttribute('id','informationDivg')
        vitbbdiv.appendChild(vitaminbbgp)
        node.appendChild(vitbbdiv)
    } 
    if(data.data[0].vitb3 <= 0.5  || data.data[0].vitb3 >= 9  ){
        const vitaminbbb = `Your Vitamin B3 blood levels are not in the recomended range of 0.5 - 8.45 Micrograms Per Mililiter, yours is ${data.data[0].vitb3} Micograms Per Mililitre . A severe Vitamin B3 deficiency leads to pellagra, a condition that causes a dark, sometimes scaly rash to develop on skin areas exposed to sunlight; bright redness of the tongue; and constipation/diarrhea.`
        const vitaminbbb1 = "Foods that are healthy and high in Vitamin B3 are wild rice, wholemeal spaghetti, corn on the cob, brown rice, acorn squash, fish, white rice."
        const vitaminbbb2 = "Vitamin B3 helps improving blood fat leves, may reduce blood pressure, may help treat type 1 diabetes, boosts brain functions and improves skin health."
        const vitaminbbbb = vitaminbbb + '\n' + vitaminbbb1 + '\n' + vitaminbbb2
        const vitaminbbbbp = document.createElement('p')
        vitaminbbbbp.innerText = vitaminbbbb
        var vitbbbdiv = document.createElement('div')
        vitbbbdiv.setAttribute('id','informationDivb')
        vitbbbdiv.appendChild(vitaminbbbbp)
        node.appendChild(vitbbbdiv)
    }
    else{
        const vitaminbbbg = `Your Vitamin B3 levels, which are ${data.data[0].vitb3} Micrograms Per Mililiter fall in the healthy range between 0.5-8.45 Micrograms Per Mililitre`
        const vitaminbbbgp = document.createElement('p')
        vitaminbbbgp.innerText = vitaminbbbg
        var vitbbbdiv = document.createElement('div')
        vitbbbdiv.setAttribute('id','informationDivg')
        vitbbbdiv.appendChild(vitaminbbbgp)
        node.appendChild(vitbbbdiv)
    }
    if(data.data[0].vitb5 <= 22.7  || data.data[0].vitb5 >= 440  ){
        const vitaminbbbb = `Your Vitamin B5 blood levels are not in the recomended range of 22.7 - 429.2 Micrograms Per Litre, yours is ${data.data[0].vitb5} Micograms Per Litre . A severe Vitamin B5 deficiency could lead to headaches, irritability, restlessness, nausea, vomiting, stomach cramps, muscle cramps, numbness or burning sensation in the feet. `
        const vitaminbbbb1 = "Foods that are healthy and high in Vitamin B5 avocado are acorn squash, plantain, baked potato, corn on the cob, sweet potato, mushrooms, oranges, mange-tout peas, pecan nuts, oatmeal or rolled oats and chestnuts."
        const vitaminbbbb2 = "In addition to playing a role in the breakdown of fats and carbohydrates for energy, vitamin B5 is critical to the manufacture of red blood cells, as well as sex and stress-related hormones produced in the adrenal glands, small glands that sit atop the kidneys."
        const vitaminbbbbb = vitaminbbbb + '\n' + vitaminbbbb1 + '\n' + vitaminbbbb2
        const vitaminbbbbbp = document.createElement('p')
        vitaminbbbbbp.innerText = vitaminbbbbb
        var vitbbbbdiv = document.createElement('div')
        vitbbbbdiv.setAttribute('id','informationDivb')
        vitbbbbdiv.appendChild(vitaminbbbbbp)
        node.appendChild(vitbbbbdiv)
    }
    else{
        const vitaminbbbbg = `Your Vitamin B5 levels, which are ${data.data[0].vitb5} Micrograms Per Litre fall in the healthy range between 22.7 - 429.2 Micrograms Per Litre`
        const vitaminbbbbgp = document.createElement('p')
        vitaminbbbgp.innerText = vitaminbbbbg
        var vitbbbbdiv = document.createElement('div')
        vitbbbdiv.setAttribute('id','informationDivg')
        vitbbbbdiv.appendChild(vitaminbbbbgp)
        node.appendChild(vitbbbbdiv)
    }
    if(data.data[0].vitb6 <= 5  || data.data[0].vitb6 >= 25  ){
        const vitaminbbbbb = `Your Vitamin B6 blood levels are not in the recomended range of 5 - 25 Nanograms Per Mililiter, yours is ${data.data[0].vitb6} Nanograms Per Mililiter . A severe Vitamin B6 deficiency can cause inflammation of the skin (dermatitis) and a red, greasy, scaly rash. `
        const vitaminbbbbb1 = "Foods that are healthy and high in Vitamin B6 are avocados, pistachio nuts, wheat germ, acorn squash, banana, quinoa, sunflower seeds, corn on the cob, wholemeal spaghetti, Brussel's sprouts, spring greens, chestnuts, hazelnuts, oranges, tahini, chickpeas."
        const vitaminbbbbb2 = "Vitamin B-6 (pyridoxine) is important for normal brain development and for keeping the nervous system and immune system healthy."
        const vitaminbbbbbb = vitaminbbbbb + '\n' + vitaminbbbbb1 + '\n' + vitaminbbbbb2
        const vitaminbbbbbbp = document.createElement('p')
        vitaminbbbbbbp.innerText = vitaminbbbbbb
        var vitbbbbbdiv = document.createElement('div')
        vitbbbbbdiv.setAttribute('id','informationDivb')
        vitbbbbbdiv.appendChild(vitaminbbbbbbp)
        node.appendChild(vitbbbbbdiv)
    }
    else{
        const vitaminbbbbbg = `Your Vitamin B6 levels, which are ${data.data[0].vitb6} Nanograms Per Mililiter fall in the healthy range between 5 - 25 Nanograms Per Mililiter`
        const vitaminbbbbbgp = document.createElement('p')
        vitaminbbbbbgp.innerText = vitaminbbbbbg
        var vitbbbbbdiv = document.createElement('div')
        vitbbbbbdiv.setAttribute('id','informationDivg')
        vitbbbbbdiv.appendChild(vitaminbbbbbgp)
        node.appendChild(vitbbbbbdiv)
    }
    if(data.data[0].vitb12 <= 205  || data.data[0].vitb12 >= 678  ){
        const vitaminbbbbbb = `Your Vitamin B12 blood levels are not in the recomended range of 205-678 Nanograms Per Mililiter, yours is ${data.data[0].vitb12} Nanograms Per Mililiter . A severe Vitamin B12 deficiency can cause extreme tiredness, a lack of energy, pins and needles (paraesthesia), a sore and red tongue, mouth ulcers, muscle weakness, disturbed vision. `
        const vitaminbbbbbb1 = "Vitamin B12 is better took is better supplemented than absorbed through foods, so B12 supplements are the best option since B12 is only contained in foods that are high in saturated fat and cholesterol, like dairy and animal flesh"
        const vitaminbbbbbb2 = "Vitamin B-12 (cobalamin) plays an essential role in red blood cell formation, cell metabolism, nerve function and the production of DNA, the molecules inside cells that carry genetic information."
        const vitaminbbbbbbb = vitaminbbbbbb + '\n' + vitaminbbbbbb1 + '\n' + vitaminbbbbbb2
        const vitaminbbbbbbbp = document.createElement('p')
        vitaminbbbbbbbp.innerText = vitaminbbbbbbb
        var vitbbbbbbdiv = document.createElement('div')
        vitbbbbbbdiv.setAttribute('id','informationDivb')
        vitbbbbbbdiv.appendChild(vitaminbbbbbbbp)
        node.appendChild(vitbbbbbbdiv)
    }
    else{
        const vitaminbbbbbbg = `Your Vitamin B12 levels, which are ${data.data[0].vitb12} Nanograms Per Mililiter fall in the healthy range between 205-678 Nanograms Per Mililiter`
        const vitaminbbbbbbgp = document.createElement('p')
        vitaminbbbbbgp.innerText = vitaminbbbbbg
        var vitbbbbbbdiv = document.createElement('div')
        vitbbbbdiv.setAttribute('id','informationDivg')
        vitbbbbbbdiv.appendChild(vitaminbbbbbbgp)
        node.appendChild(vitbbbbbbdiv)
    }
    
}