
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

		console.log('LOGIN: setup')
		console.log(node)
		document.querySelector('header p').innerText = 'OVERWIEW OF YOUR BLOOD RESULTS'
        document.querySelector('header p').setAttribute('id', 'settingsHeader')
		customiseNavbar(['home', 'settings','vitamins','logout'])
        await getRecipe(node)
        var list = document.getElementsByClassName('link')
        console.log(list)
	} catch(err) {
		console.error(err)
	}
}


async function getRecipe(node){
    
	node.getElementById('searchButtonRecipes').addEventListener('click', async function(){
        document.getElementById('recipeTitle').innerText = ""
        document.getElementById('servings').innerText = ""
        document.getElementById('recipeCall').innerText = ""
        document.getElementById('recipeImg').src = ""
        document.getElementById('recipeProt').innerText = ""
        document.getElementById('recipeCarb').innerText = ""
        document.getElementById('recipeFat').innerText = ""
        document.getElementById('recipeA').innerText = ""
        document.getElementById('recipeA').innerText = ""
        document.getElementById('recipeB1').innerText = ""
        document.getElementById('recipeB2').innerText = ""
        document.getElementById('recipeB3').innerText = ""
        document.getElementById('recipeB6').innerText = ""
        document.getElementById('recipeB12').innerText = ""
        document.getElementById('recipeC').innerText = ""
        document.getElementById('recipeD').innerText = ""
        document.getElementById('recipeE').innerText = ""
        document.getElementById('recipeK').innerText = ""
        document.getElementById('recipeIron').innerText = ""
        document.getElementById('recipeMag').innerText = ""
        document.getElementById('recipeCalcium').innerText = ""
        document.getElementById('recipeChol').innerText = ""
        document.getElementById('recipeZinc').innerText = ""
        document.getElementById('ingredientDiv').textContent = ""
        var userSearch = document.getElementById('searchbarRecipes').value
        try{
            var response = await fetch(`https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${userSearch}`, {
            method: 'GET',
            headers: { "Accept": "application/json" },
            })
            var data = await response.json()
            var randomRecipe = Math.floor(Math.random() * 10)
            console.log(response.count)
            if(response.count == 0){
                return;
            }else{
                document.getElementById('recipeShowDiv').hidden = false
            }
            var servingData = data.hits[randomRecipe].recipe.yield

            var objectRecipe = {
                name: data.hits[randomRecipe].recipe.label,
                image: data.hits[randomRecipe].recipe.image,
                calories: Math.round(data.hits[randomRecipe].recipe.calories / servingData),
                protein: Math.round(data.hits[randomRecipe].recipe.digest[2].total / servingData),
                fats:Math.round(data.hits[randomRecipe].recipe.digest[0].total / servingData),
                carbs: Math.round(data.hits[randomRecipe].recipe.digest[1].total / servingData),
                servings: data.hits[randomRecipe].recipe.yield,
                ingredients: data.hits[randomRecipe].recipe.ingredientLines,
                vita: Math.round(data.hits[randomRecipe].recipe.digest[11].total / servingData),
                vitb1: Math.round(data.hits[randomRecipe].recipe.digest[13].total / servingData),
                vitb2: Math.round(data.hits[randomRecipe].recipe.digest[14].total / servingData),
                vitb3: Math.round(data.hits[randomRecipe].recipe.digest[15].total / servingData),
                vitb6: Math.round(data.hits[randomRecipe].recipe.digest[16].total / servingData),
                vitb12: Math.round(data.hits[randomRecipe].recipe.digest[20].total / servingData),
                vitc: Math.round(data.hits[randomRecipe].recipe.digest[12].total / servingData),
                vitd: Math.round(data.hits[randomRecipe].recipe.digest[21].total / servingData),
                vite: Math.round(data.hits[randomRecipe].recipe.digest[22].total / servingData),
                vitk: Math.round(data.hits[randomRecipe].recipe.digest[23].total / servingData),
                calcium: Math.round(data.hits[randomRecipe].recipe.digest[5].total / servingData),
                iron: Math.round(data.hits[randomRecipe].recipe.digest[8].total / servingData),
                magnesium: Math.round(data.hits[randomRecipe].recipe.digest[6].total / servingData),
                zinc: Math.round(data.hits[randomRecipe].recipe.digest[9].total / servingData),
                cholesterol:Math.round(data.hits[randomRecipe].recipe.totalNutrients.CHOLE.quantity / servingData)
            }
            
            data.hits[randomRecipe].recipe.ingredientLines.length
            if(data.hits[randomRecipe].recipe.ingredientLines.length <= 7){
                document.getElementById('ingredientDiv').style.gridTemplateColumns = "1fr"
                document.getElementById('ingredientDiv').style.height = "20%"
            }else{
                document.getElementById('ingredientDiv').style.gridTemplateColumns = "repeat(2,1fr)"
            }
            data.hits[randomRecipe].recipe.ingredientLines.forEach(ingredient=>{
                var x = document.createElement('p')
                x.innerText = ingredient
                document.getElementById('ingredientDiv').appendChild(x)
                
            })
            document.getElementById('recipeTitle').innerText = objectRecipe.name
            document.getElementById('servings').innerText = objectRecipe.servings
            document.getElementById('recipeCall').innerText = objectRecipe.calories
            document.getElementById('recipeImg').src = objectRecipe.image 
            document.getElementById('recipeProt').innerText = objectRecipe.protein + " g"
            document.getElementById('recipeCarb').innerText = objectRecipe.carbs + " g"
            document.getElementById('recipeFat').innerText = objectRecipe.fats + " g"
            document.getElementById('recipeA').innerText = objectRecipe.vita + " mg"
            document.getElementById('recipeA').innerText = objectRecipe.vita + " mg"
            document.getElementById('recipeB1').innerText = objectRecipe.vitb1 + " mg"
            document.getElementById('recipeB2').innerText = objectRecipe.vitb2 + " mg"
            document.getElementById('recipeB3').innerText = objectRecipe.vitb3 + " mg"
            document.getElementById('recipeB6').innerText = objectRecipe.vitb6 + " mg"
            document.getElementById('recipeB12').innerText = objectRecipe.vitb12 + " mg"
            document.getElementById('recipeC').innerText = objectRecipe.vitc + " mg"
            document.getElementById('recipeD').innerText = objectRecipe.vitd + " mg"
            document.getElementById('recipeE').innerText = objectRecipe.vite + " mg"
            document.getElementById('recipeK').innerText = objectRecipe.vitk + " mg"
            document.getElementById('recipeIron').innerText = objectRecipe.iron + " mg"
            document.getElementById('recipeMag').innerText = objectRecipe.magnesium + " mg"
            document.getElementById('recipeCalcium').innerText = objectRecipe.calcium + " mg"
            document.getElementById('recipeChol').innerText = objectRecipe.cholesterol + " mg"
            document.getElementById('recipeZinc').innerText = objectRecipe.zinc + " mg"

            console.log(objectRecipe)
            
        }catch(err){
            console.log(err)
        }
	})
    
	
}