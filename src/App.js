import './App.css';
import { useState, useEffect } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { changeNetwork } from './web3Service';

const DefaultNetwork = Number(4); // <------This is Rikeby network

export const injectedConnector = new InjectedConnector({
	supportedChainIds: [DefaultNetwork],
});

function App() {

	//Web 3 functions

	const { error, activate } = useWeb3React();
	const [wrongNetwork, setWrongNetwork] = useState(false);
	const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

	useEffect(() => {
		setWrongNetwork(isUnsupportedChainIdError);
	}, [isUnsupportedChainIdError]);
	useEffect(() => {
		console.log(wrongNetwork);
		if (wrongNetwork) changeNetwork();
	}, [wrongNetwork]);

	//Form values

	const [token, setToken] = useState('ETH');
	const [amount, setAmount] = useState(0);
	const [price, setPrice] = useState('up');
	const contractAddress = '0xw23nsi2d2dsf2323r';

	const handleSelectChange = (event) => {
		setToken(event.target.value);
	}

	const handlePrice = (e) => {
		console.log(e.target.value)
		setPrice(e.target.value)
	}

	const handleAmount = (e) => {

		setAmount(e.target.value);
	}
	const handleSubmit = () => {
		//When you click the submit button, this funcion invokes
		console.log('okay---------', token, price, amount)
	}
	const connectMetamask = async () => {
		try {
			await activate(injectedConnector);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<div className="App">
			<div className='container'>
				<h1>Betting Escrow</h1>
				<div className='form-content'>
					<p>Make Bet</p>
					<div className='price-form'>
						<p>Choose a coin pair bet on the price of</p>
						<select onChange={handleSelectChange}>
							<option value="ETH">ETH-USD</option>
						</select>
					</div>
					<p>Current Price:</p>
					<div className='price-form'>
						<p>Choose how much ETH to bet</p>
						<input type="number" value={amount} onChange={handleAmount} />
					</div>
					<div className='price-form'>
						<p>Bet that the price goes up? or down?</p>
						<select onChange={handlePrice}>
							<option value="up">Up</option>
							<option value="down">Down</option>
						</select>
					</div>
					<button type="button" onClick={handleSubmit}>
						Submit
					</button>
				</div>
				<button type="button" onClick={connectMetamask}>
					connnect meta mask
				</button>
				<p>
					Contract address for this bet:{contractAddress}
				</p>
			</div>

		</div>
	);
}

export default App;
