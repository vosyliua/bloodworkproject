
/* logout.js */

import { customiseNavbar, loadPage, showMessage } from '../util.js'

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
		console.log('LOGOUT: setup')
		customiseNavbar([])
		document.querySelector('header p').innerText = ''
		node.querySelectorAll('button').forEach( button => button.addEventListener('click', event => {
			console.log(event.target.innerText)
			if(event.target.innerText === 'OK') {
				localStorage.removeItem('username')
				localStorage.removeItem('authorization')
				loadPage('login')
				showMessage('you are logged out')
				localStorage.clear();
			} else {
				loadPage('home')
			}
		}))
	} catch(err) {
		console.error(err)
	}
}
