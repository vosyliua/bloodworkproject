
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
        await setBmi(node)
        await setPage(node)
        var detailsid = localStorage.getItem('details')
        if(detailsid != null){
            localStorage.setItem('details', 0)
        }
		console.log('LOGIN: setup')
		console.log(node)
		document.querySelector('header p').innerText = 'OVERWIEW OF YOUR BLOOD RESULTS'
        document.querySelector('header p').setAttribute('id', 'settingsHeader')
		customiseNavbar(['home', 'settings', 'stats','logout'])
	} catch(err) {
		console.error(err)
	}
}



async function setPage (node){
    var labelWrapper = document.createElement('div')
    labelWrapper.setAttribute('id', 'labelWrapper')
    var v = document.createElement('div')
    var v1 = document.createElement('div')
    var v2 = document.createElement('div')
    var v3 = document.createElement('div')
    var v4 = document.createElement('div')
    var v5 = document.createElement('div')
    var compoundLabel = document.createElement("h1")
    var vitaminLabel = document.createElement("h1")
    var yourLabel = document.createElement("h1")
    var recommendedLabel = document.createElement("h1")
    var statusLabel = document.createElement("h1")
    var detailsLabel = document.createElement("h1")
    compoundLabel.innerText = "Compound"
    vitaminLabel.innerText = "Vitamin"
    yourLabel.innerText = " Your levels"
    recommendedLabel.innerText = "Recommended levels"
    statusLabel.innerText = "Status"
    detailsLabel.innerText = "Details"
    v.appendChild(compoundLabel)
    v1.appendChild(vitaminLabel)
    v2.appendChild(yourLabel)
    v3.appendChild(recommendedLabel)
    v4.appendChild(statusLabel)
    v5.appendChild(detailsLabel)
    const loopLabels = [v,v1,v2,v3,v4,v5]
    loopLabels.forEach(label=>{
        labelWrapper.appendChild(label)
    })
    node.appendChild(labelWrapper)
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
    const vitArray = [extracted.vita, extracted.vitb1,extracted.vitb2,extracted.vitb3,extracted.vitb5,extracted.vitb6,extracted.vitb12,extracted.vitc,extracted.vitd,extracted.vite,extracted.vitk,extracted.ldl,extracted.hdl]
    var array = []
    var array1 = ["vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita" ]
    var imageArray = ["https://file.selleckchem.com/downloads/struct/vitamin-a-chemical-structure-s5592.gif",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Thiamin.svg/1200px-Thiamin.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Riboflavin.svg/1200px-Riboflavin.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Nicotinamid.svg/1200px-Nicotinamid.svg.png",
    "https://file.selleckchem.com/downloads/struct/d-pantethine-chemical-structure-s5220.gif",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Nicotinamid.svg/1200px-Nicotinamid.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Cobalamin_skeletal.svg/1200px-Cobalamin_skeletal.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/L-Ascorbic_acid.svg/1200px-L-Ascorbic_acid.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cholecalciferol2.svg/280px-Cholecalciferol2.svg.png",
    "https://file.selleckchem.com/downloads/struct/vitamin-e-chemical-structure-s4686.gif","https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/K-Vitamine.svg/1200px-K-Vitamine.svg.png",
    "http://www.medical-labs.net/wp-content/uploads/2014/04/LDL.jpg","https://www.researchgate.net/publication/346263982/figure/fig1/AS:961781652529154@1606318023975/Generalized-structure-of-spherical-HDL-High-density-lipoproteins-particles-consist-of-a.jpg"]
    var num = 0
    var vitaminArray = ["Vitamin A","Vitamin B1","Vitamin B2","Vitamin B3","Vitamin B5","Vitamin B6","Vitamin B12","Vitamin C","Vitamin D","Vitamin E","Vitamin K","LDL CHOLESTEROL","HDL CHOLESTEROL"]
    var amountArray = []
    var measurments = [" µg/dL"," nmol/l "," µg/dL"," ug/ml"," mcg/l","ng/ml"," ng/ml"," mg/dl"," ng/ml"," µg/mL"," ng/ml"," mg/dl"," mg/dl"]
    var wrapper = document.createElement('div')
    var recommended = ["15-60","74-222","4-24","0.5-8.45","22.7 - 429.2","5 - 25","205-678","0.6-2", "20 and 40","5.5-17","0.2-3.2","100-129","40"]
    wrapper.setAttribute('id', 'wrapper')
    var results = []
    var index = 0
    if(vitArray[0] <= 15  || vitArray[0]>= 65){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[1] <= 74  || vitArray[1]>= 222){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[2] <= 4  || vitArray[2]>= 24){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[3] <= 0.5  || vitArray[3]>= 8.45){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[4] <= 22.7  || vitArray[4]>= 429.2){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[5] <= 5  || vitArray[5]>= 25){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[6] <= 205  || vitArray[6]>= 678){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[7] <= 0.6  || vitArray[7]>= 2){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[8] <= 20  || vitArray[8]>= 40){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[9] <= 5.5  || vitArray[9]>= 17){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[10] <= 0.2  || vitArray[10]>= 3.2){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[11] <= 100  || vitArray[11]>= 129){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[12] <= 400){
        results.push("X")
    }else{
        results.push("V")
    }
    console.log(results)
    array1.forEach(vitamin=>{
        var x = document.createElement('div')
        var x1 = document.createElement('div')
        var x2 = document.createElement('div')
        var x3 = document.createElement('div')
        var x4 = document.createElement('div')
        var x5 = document.createElement('div')
        num.toString()
        var image = document.createElement('img')
        var vitamin = document.createElement('p')
        var userVitamin = document.createElement('p')
        var recommendedVitamin = document.createElement('p')
        var detailsButton = document.createElement('button')
        detailsButton.innerText = "Details"
        detailsButton.setAttribute('id', num+1)
        detailsButton.setAttribute('class', "detailsClass")
        recommendedVitamin.innerText = recommended[num] + measurments[num]
        vitamin.innerText = vitaminArray[num]
        userVitamin.innerText = vitArray[num] + measurments[num]
        image.setAttribute('id','imageItem')
        image.setAttribute('src', imageArray[num])
        x.setAttribute('class','vitamin' + num)
        x1.setAttribute('class','vitamin' + num)
        x2.setAttribute('class','vitamin' + num)
        x3.setAttribute('class','vitamin' + num)
        x4.setAttribute('class','vitamin' + num)
        x5.setAttribute('class','vitamin' + num)
        x.appendChild(image)
        x1.appendChild(vitamin)
        x2.appendChild(userVitamin)
        x3.appendChild(recommendedVitamin)
        if(results[num] == "X"){
            x4.innerText = "\u274C"
            x5.appendChild(detailsButton)
        }else{
            x4.innerText = "\u2705" 
        }
        x1.style.fontSize = "30px";
        x2.style.fontSize = "30px";
        x3.style.fontSize = "30px";
        x4.style.fontSize = "50px";
        detailsButton.addEventListener('click', ()=>{
            localStorage.setItem('details', detailsButton.id)
            loadDetails()
        })
        wrapper.appendChild(x)
        wrapper.appendChild(x1)
        wrapper.appendChild(x2)
        wrapper.appendChild(x3)
        wrapper.appendChild(x4)
        wrapper.appendChild(x5)
        num += 1
        
    })
    
    node.appendChild(wrapper)
    console.log(wrapper)
}

function loadDetails(){
    loadPage('details')
}