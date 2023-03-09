
import { apiTransact, getDataRow, getDataRows, getEscrow, loadGig, sendNotification } from './alaio'
import moment from 'moment';

let storage = JSON.parse(localStorage.getItem('User'));


export function getDispute(id) {
    return new Promise(async(res, rej) => {
		let options = {
			table: 'disputes',
			upper: +id,
			lower: +id,
			index: '4'
		};
		
		let dispute = await getDataRow(options)
        console.log('getDispute', dispute)

        if(!dispute) res(false);
        else {
            let checkD = moment(dispute.date);
            let today = moment();
            res({
                daysSinceStart: today.diff(checkD, 'days'), 
                dispute: dispute
            });
        }
    })
}

export function suggestDisputeAmount(gig, escrow = false) {
    return new Promise(async(res, rej) => {
        if(!escrow) escrow = await getEscrow(gig.id, gig.employer).then(({quantity})=> +quantity.replace('ALA',''));
        else if(typeof escrow === 'object') escrow = +escrow.quantity.replace('ALA','')

		//load list of works
		let options = {
			table: 'works',
			upper: gig.id,
			lower: gig.id,
			index: '4'
		};
		let works = await getDataRows(options).then(async({rows}) =>  rows.map((el) => ({...el, milestone: JSON.parse(el.milestone)})));
        let milestones = JSON.parse(JSON.stringify(gig.milestones));

		//check if the milestone has already been paid
		let unpaidMilestones = 0;
		let uncompletedMilestones = 0;
		for await(let milestone of milestones) {
			if(!milestone.works) milestone.works = [];

			for await(let row of works){
				if(milestone.amount===row.milestone.amount && milestone.title === row.milestone.title) {
					milestone.works.push(row)
					if(row.status === "APPROVED") milestone.completed = true;
				}
			}
			if(!milestone.completed) {
				if(milestone.works.length > 0) unpaidMilestones++;
				else uncompletedMilestones++;
			}
		}

		let defaultDisputeAmount = escrow / 2;
		if(unpaidMilestones > 0 && uncompletedMilestones > 0) defaultDisputeAmount = (+unpaidMilestones / +uncompletedMilestones) * escrow;
        res(defaultDisputeAmount.toFixed(4));
    });
}


export function createDispute(gig, disputeType, reason, amount) {
    return new Promise(async(res, rej) => {
        let escrow = await getEscrow(gig.id, gig.employer).then(({quantity})=> +quantity.replace('ALA',''));
		let now = new Date();
        let currentDate = now.toLocaleDateString('en-us');
        //testing purposes only
        // currentDate = moment(currentDate).subtract(5, 'days').format('MM/DD/YYYY');

        if(disputeType !== 'settlement-partial-freelancer') amount = escrow;
        if(amount === '') amount = 0;
        amount = +amount;

        if(amount > escrow) rej({message: `The settlement amount is more than you have in escrow (${escrow.toFixed(4)} ALA)`})
        if(amount === 0) rej({message: `Settlement amount must be greater than 0`})
        if(reason === '') rej({message: `Reason cannot be empty`})
        
        let data = {
            employer: gig.employer,
            freelancer: gig.freelancer,
            contractid: gig.id,
            date: currentDate,
            description: reason,
            amount: amount,
            status: 'IN-DISPUTE',
            result: '',
            rewards: '',
            vote: '',
            type: disputeType,
            last: storage.username,
            public_date: '',
            chat_link: ''
        }
        console.log('create dispute', data)
        Promise.all([
            apiTransact('createdis', data),
            sendNotification(storage.username===gig.employer ? gig.freelancer : gig.employer, `Amicable Process started for gig #${gig.id}`, gig.id)
        ]).then(([createdis, sendnotif]) => {
            console.log('createDispute data', createdis)
            res({message: 'Dispute has been started!', createdis})
        })
        .catch((err)=>{
            console.error("createDispute error", err)
        })
    });
}


export function sendDisputeToCommunity(dispute) {
    return new Promise(async(res, rej) => {
		let now = new Date();
        let currentDate = now.toLocaleDateString('en-us');
		let data = {...dispute, public_date: moment(currentDate).format('MM/DD/YYYY')}
        console.log('sendDisputeToCommunity data', data)
		let createdis = await apiTransact('createdis', data);
        res({message: "Amicable Process submitted to community", createdis})
    })
}




export function counterDispute(dispute, comment, amount, type) {
    return new Promise(async(res, rej) => {
        let escrow = await getEscrow(dispute.contractid, dispute.employer).then(({quantity})=> +quantity.replace('ALA',''));

		amount = +amount;
		if(type === 'settlement-partial-freelancer') {
            if(!amount || amount === 0) rej({message: "Please enter a settlement amount"});
            else if(amount > escrow) rej({message: `Partial settlement must be less than Escrow Balance (${escrow.toFixed(4)} ALA)`});
		}
		else amount = escrow;

        //testing purposes only
		// let now = new Date();
        // let currentDate = now.toLocaleDateString('en-us');
        // dispute.date = moment(currentDate).subtract(5, 'days').format('MM/DD/YYYY');

		let data = {
			employer: dispute.employer,
			freelancer: dispute.freelancer,
			contractid: dispute.contractid,
			date: dispute.date,
			description: comment,
			amount: amount,
			status: 'IN-DISPUTE',
			result: '',
			rewards: '',
			vote: '',
			type: type,
			last: storage.username,
            public_date: dispute.public_date,
            chat_link: dispute.chat_link
		}
        console.log('createdis data', data)
		let createdis = await apiTransact('createdis', data);
        res({message: "Dispute Response sent", createdis})
    })
}



export function restartCommunityDispute(dispute) {
    return new Promise(async(res, rej) => {
		let now = new Date();
        let currentDate = now.toLocaleDateString('en-us');
		let data = { ...dispute, public_date: currentDate }
        let message = `Time limit has been reached for Amicable Process for gig #${dispute.contractid}. Amicable process will now restart with more community voters`;
        console.log('createdis data', data)

        Promise.all([
            apiTransact('createdis', data),
            apiTransact('deldisvotes', {dispute_id: dispute.id}),
            sendNotification(dispute.employer, message, dispute.contractid),
            sendNotification(dispute.freelancer, message, dispute.contractid)
        ]).then(([createdis, deldisvotes])=>{
            res({message: "Community Vote process has been restarted", createdis, deldisvotes})
        })

    })
}


export function approveDispute(dispute, winningVoterList=false) {
    return new Promise(async (res, rej) =>{
        let response = {};
        let escrow = await getEscrow(dispute.contractid, dispute.employer).then(({quantity})=> +quantity.replace('ALA',''));

        //load gig
        let gig = await loadGig(dispute.contractid);
        
        if(+dispute.amount > +escrow){
            rej({message: "Not enough funds in escrow", type: 'escrow'})
            return;
        }

        let winner = dispute.employer;
        if(dispute.type === 'settlement-full-freelancer' || dispute.type === 'settlement-partial-freelancer') winner = dispute.freelancer


        //set final fields if dispute is approved before community.
        if(!dispute.result) dispute.result = dispute.type;
        if(!dispute.rewards) dispute.rewards = dispute.amount;
        if(!dispute.vote) dispute.vote = winner;



        //set dispute status to success, and update the vote/winner and the last user to act
        let data = {
            employer: dispute.employer,
            freelancer: dispute.freelancer,
            contractid: dispute.contractid,
            date: dispute.date,
            description: dispute.description,
            amount: dispute.amount,
            status: 'SETTLED',
            result: dispute.result,
            rewards: dispute.rewards,
            vote: dispute.vote,
            type: dispute.type,
            last: winningVoterList !== false ? 'community' : storage.username,
            public_date: dispute.public_date,
            chat_link: dispute.chat_link,
        }
        console.log('approveDispute - createdis data', data)
        response.createdis = await apiTransact('createdis', data);
        



        let message;
        //make payment. If full payment, this is the only one made, to the winner
        if(dispute.result === 'settlement-partial-freelancer') {
            //make payment to freelancer
            let freelancer_quantity = `${parseFloat(dispute.rewards).toFixed(4)} ALA`;
            let frelancer_payData = {
                from: 'skillsescrow',
                to: dispute.freelancer,
                quantity: freelancer_quantity,
                memo: dispute.result,
                gigid: dispute.contractid
            }
            console.log('approveDispute - payfree_freelancer data', frelancer_payData)
            response.payfree_freelancer = await apiTransact('payfree', frelancer_payData);


            //make payment to employer
            let employer_quantity = `${parseFloat(escrow - +dispute.rewards).toFixed(4)} ALA`;
            let employer_payData = {
                from: 'skillsescrow',
                to: dispute.employer,
                quantity: employer_quantity,
                memo: dispute.result,
                gigid: dispute.contractid
            }
            console.log('approveDispute - payfree_employer data', employer_payData)
            response.payfree_employer = await apiTransact('payfree', employer_payData);

            //generate message
            message = `${dispute.freelancer} was paid ${freelancer_quantity}, ${dispute.employer} was paid ${employer_quantity}. This gig is now completed.`;
        }
        else {
            let payData = {
                from: storage.username,
                to: dispute.vote,
                quantity: `${parseFloat(dispute.rewards).toFixed(4)} ALA`,
                memo: dispute.result,
                gigid: dispute.contractid
            }
            console.log('approveDispute - payfree data', payData)
            response.payfree = await apiTransact('payfree', payData);
            message = `${dispute.vote} was paid ${payData.quantity}. This gig is now completed.`;
        }




        if(winningVoterList !== false) {
            //update vote records
            let today = new Date();
            let currentMonth = (today.getMonth() + 1).toString() + today.getFullYear();
            let result = false;
            response.updatevoterec = [];

            for await(let winner of winningVoterList) {
                result = await apiTransact('updatevoterec', {date: currentMonth, winner});
                response.updatevoterec.push(result)
            }
        }


        
        
        //mark gig as completed
        let now = new Date();
        let completeData = {
            gigid: gig.id, 
            enddate: now.toLocaleDateString('en-us'),
            status: 'COMPLETED'
        }
        console.log('approveDispute - creategig data',completeData) 


        
        Promise.all([
            apiTransact('endgig', completeData),

            //send notifications to both employer and freelancer that the dispute is completed
            sendNotification(dispute.employer, `Amicable Process for gig #${gig.id} has been completed. ${message}`, gig.id),
            sendNotification(dispute.freelancer, `Amicable Process for gig #${gig.id} has been completed. ${message}`, gig.id),

            //send notifications that the gig is complete
            sendNotification(dispute.employer, `Gig ${gig.title} has been completed. Go to My Jobs to rate the gig`, gig.id),
            sendNotification(dispute.freelancer, `Gig ${gig.title} has been completed. Go to My Gigs to rate the gig`, gig.id)
        ]).then(([creategig])=>{
            console.log('creategig', creategig)
            res({...response, creategig, message})
        })

        


    })
}
