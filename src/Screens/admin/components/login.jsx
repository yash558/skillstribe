import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import './style.scss';
import * as Alaio from '../../../components/service/alaio';
import * as aladinjs from 'aladinjs';

function LoginPage() {
	const [email, setEmail] = useState('');
	let [code, setCode] = useState('');
	const [pass, setPass] = useState('');

	let history = useHistory();
	const alert = useAlert();

	const onSubmit = async() => {
		//If user uses a mnemonic phrase
		if(code.includes(" ")) {
			code = await encryptMnemonic(code, pass).catch(err => {
				console.log(err)
			});
		}

		await axios.post('https://euapi.alacritys.net/users/login', {password: pass, mnemonic_code: code})	//mainnet
		// await axios.post('https://euapitest.alacritys.net/users/login', {email, password: pass, mnemonic_code: code})	//testnet
		.then(async(response) => {
			console.log(response.data.data);
			let username = '';
			if(response.status === 200){
				let activeKey = await Alaio.getUserKeys(code, pass).then(res => res.data.data.activeKey);
				localStorage.setItem('keys', JSON.stringify(activeKey))
				let rpc = Alaio.makeRPC();
				username = await rpc.history_get_key_accounts(activeKey.pub_key).then( async(response) => {
					return response.account_names[0];
				})
			}

			if(username === "skillsadmin"){
				let data = {
					accPrivateKey: response.data.data.accPrivateKey,
					account: response.data.data.account,
					mnemonicCode: response.data.data.mnemonicCode,
					profileInfo: response.data.data.profileInfo,
					publicKeychain: response.data.data.publicKeychain,
					username: username
				}
				localStorage.setItem('admin', JSON.stringify(data))
				history.push('/admin/dashboard');
			}
			else{
				alert.error("Looks like you aren't an admin!")
			}
		})
		.catch(error => {
			alert.error(`An error occured: ${error}`);
			return;
		})
	}

	const encryptMnemonic = async(mnemonic, password) => {
		return aladinjs.encryptMnemonic(mnemonic, password);
	}

	return(
		<div className="my-container">
			<div>
				<form>
					{/* <label htmlFor="">
						<h4>Email</h4>
						<input 
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"/>
					</label> */}
					<label htmlFor="">
						<h4>Recovery Code</h4>
						<textarea 
						value={code}
						onChange={(e) => setCode(e.target.value)}
						id="code-area" 
						type="text"/>
					</label>
					<label htmlFor="">
						<h4>Password</h4>
						<input 
						value={pass}
						onChange={(e) => setPass(e.target.value)}
						type="password"/>
					</label>
					<div className="btn-container">
						<Button
						type="button"
						disabled={code === '' || pass === ''}
						className="btn" 
						onClick={onSubmit}>Sign In</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginPage;