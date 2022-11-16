
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
    const vitArray = [extracted.vita, extracted.vitb6,extracted.vitb12,extracted.vitc,extracted.vitd,extracted.vite,extracted.vitk,extracted.ldl,extracted.hdl,extracted.calcium,extracted.iron,extracted.zinc,extracted.magnesium]
    var array = []
    var array1 = ["vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita", "vita" ]
    var imageArray = ["https://file.selleckchem.com/downloads/struct/vitamin-a-chemical-structure-s5592.gif",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Cobalamin_skeletal.svg/1200px-Cobalamin_skeletal.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/L-Ascorbic_acid.svg/1200px-L-Ascorbic_acid.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cholecalciferol2.svg/280px-Cholecalciferol2.svg.png",
    "https://file.selleckchem.com/downloads/struct/vitamin-e-chemical-structure-s4686.gif","https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/K-Vitamine.svg/1200px-K-Vitamine.svg.png",
    "http://www.medical-labs.net/wp-content/uploads/2014/04/LDL.jpg","https://www.researchgate.net/publication/346263982/figure/fig1/AS:961781652529154@1606318023975/Generalized-structure-of-spherical-HDL-High-density-lipoproteins-particles-consist-of-a.jpg",
    "https://www.tcichemicals.com/medias/H0917.jpg?context=bWFzdGVyfHJvb3R8Mjg1MTF8aW1hZ2UvanBlZ3xoODIvaGQxLzg5MzA5NjkzODcwMzgvSDA5MTcuanBnfGIzZGMyYTU2MzFkNTIwNDkzZTRkOWFjYTZkYWViZDQ4MGU5MGQ3Y2QwMGI5ZjNhNmIyNmJlZTlmNzI3YjY2YTc",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Heme_b.svg/220px-Heme_b.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/BasicZnAcetate.png/220px-BasicZnAcetate.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Magnesiumhydrogencitrat_V1.svg/1200px-Magnesiumhydrogencitrat_V1.svg.png"]
    var num = 0
    var vitaminArray = ["Vitamin A","Vitamin B6","Vitamin B12","Vitamin C","Vitamin D","Vitamin E","Vitamin K","LDL CHOLESTEROL","HDL CHOLESTEROL","Calcium","Iron","Zinc","Magnesium"]
    var amountArray = []
    var measurments = [" µg/dL"," ng/ml"," ng/ml"," mg/dl"," ng/ml"," µg/mL"," ng/ml"," mg/dl"," mg/dl"," mg/dl"," mg/dl"," mcg/dl"," µmol/l"]
    var wrapper = document.createElement('div')
    var recommended = ["15-60"," > 5 "," > 205 ","> 0.4", "20-40","5.5-17","0.2-3.2","< 93","> 40", "8.5-10.2","60-170","10.1–20.2","> 1.7"]
    wrapper.setAttribute('id', 'wrapper')
    var results = []
    var index = 0
    if(vitArray[0] <= 15  || vitArray[0]>= 65){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[1] <= 5 ){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[2] <= 205 ){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[3] <= 0.4 ){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[4] <= 20  || vitArray[7]>= 40){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[5] <= 5.5  || vitArray[8]>= 17){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[6] <= 0.2  || vitArray[9]>= 3.2){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[7]>= 93){
        results.push("X")
    }else{
        results.push("V")
    }
    if(vitArray[8] <= 40){
        results.push("X")
    }else{
        results.push("V")
    }if(vitArray[9] <= 8.5  || vitArray[12]>= 10.2){
      results.push("X")
    }else{
      results.push("V")
    }if(vitArray[10] <= 60  || vitArray[13]>= 170){
      results.push("X")
    }else{
      results.push("V")
    }if(vitArray[11] <= 10.1  || vitArray[15]>= 20.2){
      results.push("X")
    }else{
      results.push("V")
    }if(vitArray[12] <= 1.7 ){
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