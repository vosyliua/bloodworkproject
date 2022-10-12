
/* login.js */

import { createToken, customiseNavbar, loadPage, showMessage } from '../util.js'

export async function setup(node) {
	try {
		console.log('LOGIN: setup')
		console.log(node)
		document.querySelector('header p').innerText = 'Settings Page'
        document.querySelector('header p').setAttribute('id', 'settingsHeader')
        node.querySelector('form').addEventListener('submit', saveSettings)
		customiseNavbar(['home', 'settings', 'logout'])
	} catch(err) {
		console.error(err)
	}
}

function saveSettings(node){
    event.preventDefault()
    const variables = []
    var age = document.getElementById("age").value
    var gender = document.getElementById("gender").value
    var weight = document.getElementById("weight").value
    var vita = document.getElementById("vita").value
    var vitb1 = document.getElementById("vitb1").value
    var vitb2 = document.getElementById("vitb2").value
    var vitb3 = document.getElementById("vitb3").value
    var vitb5 = document.getElementById("vitb5").value
    var vitb6 = document.getElementById("vitb6").value
    var vitb12 = document.getElementById("vitb12").value
    var vitc = document.getElementById("vitb12").value
    var vitd = document.getElementById("vitb12").value
    var vite = document.getElementById("vitb12").value
    var vitk = document.getElementById("vitb12").value
    var ldl = document.getElementById("ldl").value
    var hdl = document.getElementById("hdl").value
    var height = document.getElementById("height").value
    if(age<= 0 || age >= 120){
        showMessage("please enter a valid age")
    }
    variables.push(height,age,gender,weight,vita,vitb1,vitb2,vitb3,vitb5,vitb6,vitb12,vitc,vitd,vite,vitk,ldl,hdl)
    var check = true
    variables.forEach(variable =>{
        if(variable == ""){
            check = false
            return check
        }
        else{
            return check
        }
    })
    if(check == true){
        var currentdate = new Date(); 
        var datetime =   currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
        const data = {
            username : localStorage.getItem('username'),
            age : age,
            weight : weight,
            height : height,
            date : datetime,
            gender : gender,
            vita: vita,
            vitb1: vitb1,
            vitb2: vitb2,
            vitb3: vitb3,
            vitb5: vitb5,
            vitb6: vitb6,
            vitb12: vitb12,
            vitc: vitc,
            vitd: vitd,
            vite: vite,
            vitk: vitk,
            ldl: ldl,
            hdl:hdl
        }            
        console.log(data)
    }

    if(check == false){
        console.log("nay")
    }
}
