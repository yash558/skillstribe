import { JsonRpc, RpcError, Api } from 'alaiojs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
// import * as Gaia from './gaia';
import moment from 'moment';
import axios from 'axios';

let rpc = new JsonRpc('https://alaio.alacritys.net/', {fetch});		//mainnet
// let rpc = new JsonRpc('https://testapi.alacritys.net/', {fetch});	//testnet
let storage = JSON.parse(localStorage.getItem('User'));


export function tryParseJSON(jsonString) {
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
};


export function getDataRows(options) {
	return new Promise((res, rej) => {
		try {
			let result = rpc.get_table_rows({
				json: true,
				scope: options.scope || 'skillstribe2',
				code: options.code || 'skillstribe2',
				table: options.table,
				upper_bound: options.upper || '',
				lower_bound: options.lower || '',
				key_type: options.key_type || 'i64',
				index_position: options.index || '',
				limit: options.limit || 100,
				reverse: options.reverse|| false,
				show_payer: false
			});
			res(result);
		}catch (e){
			console.log(e)
			if (e instanceof RpcError) {
				res(JSON.stringify(e.json, null, 2));
			}else{
				return
			}
		}
	})
}

export function getDataRow(options) {
	return new Promise(async (res, rej) => {
		try {
			let result = await rpc.get_table_rows({
				json: true,
				scope: options.scope || 'skillstribe2',
				code: options.code || 'skillstribe2',
				table: options.table,
				upper_bound: options.upper || '',
				lower_bound: options.lower || '',
				key_type: options.key_type || 'i64',
				index_position: options.index || '2',
				limit: options.limit || 100,
				reverse: options.reverse|| false,
				show_payer: false
			});
			res(result.rows[0]);
		}catch (e){
			console.log(e)
			if (e instanceof RpcError) {
				res(JSON.stringify(e.json, null, 2));
			}else{
				return
			}
		}
	})
}

export function makeRPC() {
	return new JsonRpc('https://alaio.alacritys.net/', { fetch });
}

export function makeAPI(privateKey=false) {
	const keys = JSON.parse(localStorage.getItem('keys'));
	if(!keys) return false;
	const defaultPrivateKey = privateKey ? privateKey : keys.priv_key;
	const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
	let rpc = new JsonRpc('https://alaio.alacritys.net/', { fetch });
	return new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});
}

export function apiTransact(name, data, account='skillstribe2', actor='local', api=false) {
	if(!storage) storage = JSON.parse(localStorage.getItem('User'));

	if(actor === 'local') actor = storage.username;
	if(!api) api = makeAPI();

	return new Promise(async (res, rej)=>{
		try{
			await api.transact({
				actions:[{
					account: account,
					name: name,
					authorization: [{
						actor: actor,
						permission: 'active'
					}],
					data: data
				}]
			}, {
				blocksBehind: 3,
				expireSeconds: 30
			})
			.then((result) => res(result))
			.catch(error => rej(error))
		}catch(error) {
			rej(error);
		}
	})
}


export function loadGig(id) {
	return getDataRow({
		table: 'gigs',
		upper: id,
		lower: id,
		index: '2'
	}).then((gig)=>{
		gig.speciality = JSON.parse(gig.speciality);
		gig.attachments = JSON.parse(gig.attachments);
		if(gig.milestones != "[object Object]") gig.milestones = JSON.parse(gig.milestones);
		console.log('alaio.js->loadGig', gig)
		return gig;
	})
}

export function updateGig(gig) {
	let data = {
		employer: gig.employer,
		freelancer: gig.freelancer,
		budget: gig.budget,
		description: gig.description,
		title: gig.title,
		category: gig.category,
		speciality: gig.speciality,
		paytype: gig.paytype,
		visibility: gig.visibility,
		time: gig.time,
		experience: gig.experience,
		startdate: gig.startdate,
		enddate: gig.enddate,
		created: gig.created,
		attachments: gig.attachments,
		hourlyrate: gig.hourlyrate,
		weeklylimit: gig.weeklylimit,
		location: gig.location,
		status: gig.status,
		milestones: gig.milestones
	}
	if(typeof gig.speciality !== 'string') data.speciality = JSON.stringify(gig.speciality)
	if(typeof gig.attachments !== 'string') data.attachments = JSON.stringify(gig.attachments)
	if(typeof gig.milestones !== 'string') data.milestones = JSON.stringify(gig.milestones)

	
	console.log('update gig', data)
	return apiTransact('creategig', data)
}


export function loadWorks(gigid, gig=false) {
	return new Promise(async (res, rej)=>{
		if(!gig) gig = await loadGig(gigid);

		//load list of works
		let options = {
			table: 'works',
			upper: gigid,
			lower: gigid,
			index: '4'
		};
		await getDataRows(options).then(async({rows}) => {
			for await(let row of rows){
				row.revision_limit = row.revision_limit ? +row.revision_limit : 2;
				row.newDate = new Date(row.date)
				row.newDate = row.newDate.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
				row.file = JSON.parse(row.file)
				if(row.milestone !== '') {
					row.milestone = JSON.parse(row.milestone)
					if(row.milestone && !row.milestone.revisions) row.milestone.revisions = [];
				}

				//check if the milestone has already been paid
				for await(let milestone of gig.milestones) {
					if(milestone.amount===row.milestone.amount && milestone.title === row.milestone.title && row.status === "APPROVED") milestone.completed = true;
				}
				let uncompletedMilestones = gig.milestones.filter((el)=>!el.completed);
				let hasBeenPaid = true;
				for await(let mile of uncompletedMilestones) {
					if(mile.amount == row.milestone.amount && mile.title == row.milestone.title) hasBeenPaid = false;
				}
				if(gig.paytype === "Hourly") hasBeenPaid = false;
				row.hasBeenPaid = hasBeenPaid;
			}
			res(rows)
		});
	});
}



export function loadUser(username=false) {
	return new Promise(async (res, rej)=>{
		if(!username) {
			console.log('no username, use storage', storage)
			if(!storage) rej(false);
			else username = storage.username;
		}

		let user = await getDataRow({
			table: 'users',
			upper: username,
			lower: username,
			index: 2,
			key_type: 'name'
		})
		console.log('loadUser->'+username, user)
		res(user);
	});
}


export function getEscrow(gigid, employer=false) {
	if(!employer) employer = storage.username;

	return getDataRows({
		scope: 'skillsescrow',
		code: 'skillsescrow',
		upper: '',
		lower: '',
		table: 'transfers',
		index: '3',
		reverse: true
	}).then(async({rows}) => {
		for await(let row of rows){
			if(row.gigid == gigid) {
				console.log('getEscrow', row)
				return row
			}
		}
	})
}



export function sendNotification(recipient, type, gigid) {
	return new Promise(async(res, rej)=>{
		let now = new Date();
		now = now.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})

		let data = {
			sender: storage.username,
			recipient: recipient,
			date: now,
			type: type,
			gigid: gigid,
			status: 'unread'
		}
		
		let result = apiTransact('notificat', data)
		res(result);
	})
}


export function autoApproveRevisedWorkItems(worksList, gig) {
	return new Promise(async(res, rej)=>{

		let approvedItems = 0;
		for await(let work of worksList) {
			if(work.milestone.revisions.length === 0 || work.status !== 'SUBMITTED') continue;
			let lastRevision = work.milestone.revisions[work.milestone.revisions.length - 1];
			if(lastRevision.status === "OPEN") continue;

			let checkD = moment(lastRevision.date);
			let today = moment();
			let daysSinceStart = today.diff(checkD, 'days')

			console.log('last revision', lastRevision)
			console.log('days since last work item revision submission', daysSinceStart)
			
			if(daysSinceStart >= 3) {
				let result = await approveWorkItem(work, gig, "Revised work item has been automatically approved");
				console.log('approveWorkItem result', result);
				if(result.success) approvedItems++;
				else if(result.reason === 'escrow-too-low') rej('Escrow needs to be funded to automatically approve revised work item')
			}
		}
		res(approvedItems);
	})
}


export function approveWorkItem(work, gig, milestoneMemo=false, escrow=false) {
	return new Promise(async(res, rej)=>{
		if(!escrow || !Number.isFinite(escrow)) escrow = await getEscrow(gig.id, gig.employer).then(({quantity})=>+quantity.replace('ALA',''));

		let amount = +work.hours * +gig.hourlyrate;
		if(gig.paytype === 'Fixed') amount = work.milestone.amount
		if(+escrow >= +amount){
			if(work.milestone) {
				for await(let revision of work.milestone.revisions) {
					revision.status = "APPROVED";
				}
			}

			let data = {
				freelancer: work.freelancer,
				file: JSON.stringify(work.file),
				date: work.date,
				fmessage: work.fmessage,
				emessage: work.emessage,
				status: 'APPROVED',
				gigid: gig.id,
				message: work.message,
				hours: String(work.hours) || 0,
				milestone: JSON.stringify(work.milestone),
				last: storage.username
			}
			console.log('approveWorkItem - creatework', data);
			await apiTransact('creatework', data)
			

			if(!work.hasBeenPaid && +amount > 0) {
				let data = {
					from: storage.username,
					to: work.freelancer,
					quantity: `${parseFloat(amount).toFixed(4)} ALA`,
					memo: milestoneMemo ? milestoneMemo : 'Payment to freelancer for milestone work',
					gigid: gig.id
				}
				console.log('approveWorkItem - payfree', data);
				await apiTransact('payfree', data)
			}
			res({success: true, freelancerPaid: !work.hasBeenPaid})
		}
		else res({success: false, reason: 'escrow-too-low'})
	});
}


export function signOut(){
	return new Promise((res, rej) => {
		try{
			localStorage.clear();
			res(true)
		}catch(error){
			res(false)
		}	
	})
}

export function getUserKeys(mnemonicCode, password){
	return new Promise((res, rej) => {
		if(!mnemonicCode && !password){
			res(false);
		}

		axios.post('https://euapi.alacritys.net/users/getKeys', {
			mnemonicCode,
			password
		}).then(data => {
			res(data);
		}).catch(err => {
			rej(err);
		})
	})
}
