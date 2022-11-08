
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
        await setPage(node)
        var detailsid = localStorage.getItem('details')
        if(detailsid != null){
            localStorage.setItem('details', 0)
        }
		console.log('LOGIN: setup')
		console.log(node)
		document.querySelector('header p').innerText = 'OVERWIEW OF YOUR BLOOD RESULTS'
        document.querySelector('header p').setAttribute('id', 'settingsHeader')
		customiseNavbar(['home', 'settings','backlog','logout'])
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
    vitaminLabel.innerText = "Vitamin/Mineral"
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
    const vitArray = [extracted.vita, extracted.vitb1,extracted.vitb2,extracted.vitb3,extracted.vitb5,extracted.vitb6,extracted.vitb12,extracted.vitc,extracted.vitd,extracted.vite,extracted.vitk,extracted.ldl,extracted.hdl,extracted.calcium,extracted.iron,extracted.sodium,extracted.zinc,extracted.potassium,extracted.magnesium]
    var array = []
    var array1 = ["vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita" ]
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
    "http://www.medical-labs.net/wp-content/uploads/2014/04/LDL.jpg","https://www.researchgate.net/publication/346263982/figure/fig1/AS:961781652529154@1606318023975/Generalized-structure-of-spherical-HDL-High-density-lipoproteins-particles-consist-of-a.jpg",
    "https://www.tcichemicals.com/medias/H0917.jpg?context=bWFzdGVyfHJvb3R8Mjg1MTF8aW1hZ2UvanBlZ3xoODIvaGQxLzg5MzA5NjkzODcwMzgvSDA5MTcuanBnfGIzZGMyYTU2MzFkNTIwNDkzZTRkOWFjYTZkYWViZDQ4MGU5MGQ3Y2QwMGI5ZjNhNmIyNmJlZTlmNzI3YjY2YTc",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Heme_b.svg/220px-Heme_b.svg.png",
    "https://media.geeksforgeeks.org/wp-content/uploads/20211122172336/SodiumCarbonate.PNG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/BasicZnAcetate.png/220px-BasicZnAcetate.png",
    "data:image/png;base64,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",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Magnesiumhydrogencitrat_V1.svg/1200px-Magnesiumhydrogencitrat_V1.svg.png"]
    var num = 0
    var vitaminArray = ["Vitamin A","Vitamin B1","Vitamin B2","Vitamin B3","Vitamin B5","Vitamin B6","Vitamin B12","Vitamin C","Vitamin D","Vitamin E","Vitamin K","LDL CHOLESTEROL","HDL CHOLESTEROL","Calcium","Iron","Sodium","Zinc","Potassium","Magnesium"]
    var amountArray = []
    var measurments = [" µg/dL"," nmol/l "," µg/dL"," ug/ml"," mcg/l","ng/ml"," ng/ml"," mg/dl"," ng/ml"," µg/mL"," ng/ml"," mg/dl"," mg/dl"," mg/dl"," mcg/dl"," mEq/l"," µmol/L"," nmol/l"," mg/dL"]
    var wrapper = document.createElement('div')
    var recommended = ["15-60","74-222","4-24","0.5-8.45","22.7 - 429.2","5 - 25","205-678","0.6-2", "20-40","5.5-17","0.2-3.2","100-129","40", "8.5-10.2","60-170","135-145","10.1–20.2"," 3.6-5.2","1.7-2.2"]
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
    }if(vitArray[13] <= 8.5  || vitArray[13]>= 10.2){
      results.push("X")
    }else{
      results.push("V")
    }if(vitArray[14] <= 60  || vitArray[14]>= 170){
      results.push("X")
    }else{
      results.push("V")
    }if(vitArray[15] <= 135  || vitArray[15]>= 145){
      results.push("X")
    }else{
      results.push("V")
    }if(vitArray[16] <= 10.1  || vitArray[16]>= 20.2){
      results.push("X")
    }else{
      results.push("V")
    }if(vitArray[17] <= 3.6 ){
      results.push("X")
    }else{
      results.push("V")
    }if(vitArray[18] <= 1.7 ){
      results.push("X")
    }else{
      results.push("V")
    }

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
        image.setAttribute('class',"imgTable")
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