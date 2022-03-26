console.log(ethers);
//import { ethers } from "ethers";
//import { ethers } from "ethers";
//const provider = await detectEthereumProvider();

if (typeof window.ethereum !== 'undefined') {
	console.log('MetaMask is installed!');
} else {
	console.log('MetaMask not installed!');
}

const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
	getAccount();
});

async function getAccount() {
	const accounts = await ethereum.request({ method: 'eth_requestAccounts' ,params: []});
	const account = accounts[0];
  console.log(account,"accountaccount")
	showAccount.innerHTML = account;
}
const betFormElement = document.getElementById('bet-form');

betFormElement.addEventListener('submit', (event) => {
	event.preventDefault();
	let data = new FormData(betFormElement);
	const bet = {};
	for (const [ name, value ] of data) {
		bet[name] = value;
	}
	console.log(bet);
	// bet is an object containing all the information about the bet
	// START CODING HERE
	/////////////////////////////////////////////////////
});

// This function detects most providers injected at window.ethereum
