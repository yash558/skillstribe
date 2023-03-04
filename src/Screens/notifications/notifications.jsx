import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import LoadingOverlay from 'react-loading-overlay';
// import { apiTransact, getDataRows } from '../../components/service/alaio';
import { Button } from 'semantic-ui-react';
import './notifications.scss';
import { useNavigate } from 'react-router-dom';

function Notifications() {
	const [rows, setRows] = useState([]);	
	const [active, setActive] = useState(false);

	let history = useNavigate();
	
	let storage = JSON.parse(localStorage.getItem('User'));
	let role = localStorage.getItem('role');

	const getUserData = async() => {
		setActive(true)
		let options = {
			table: 'notifis',
			upper: storage.username,
			lower: storage.username,
			key_type: 'name',
			index: '4',
			reverse: true
		};

		// await getDataRows(options).then(async(res) => {
		// 	for await(let row of res.rows) {
		// 		if(row.type.toLowerCase().includes('invited')) row.subtype = 'invited'
		// 		if(row.type.toLowerCase().includes('ready to be completed')) row.subtype = 'completed'
		// 		if(row.type.toLowerCase().includes('negotiations have been opened')) row.subtype = 'negotiations'
		// 		if(row.type.toLowerCase().includes('rate the gig')) row.subtype = 'rategig'
		// 		setRows(rows=> [...rows, row])
		// 	}
		// 	setActive(false)
		// })
	}

	const setRead = async(item) => {
		console.log('setRead', item)
		let data = {
			sender: item.sender,
			recipient: item.recipient,
			date: item.date,
			type: item.type,
			gigid: item.gigid,
			status: 'read'
		}
		// apiTransact('notificat', data)
	}

	const onNavigate = async(route, item) => {
		await setRead(item);
		history.push(route)
	}

	useEffect(() => {
		getUserData()
	},[])

	return(
		// <LoadingOverlay
        // active={active}
        // spinner
		// text="Exploring the Chain"
		// fadeSpeed={500}
        // className="spinner"
        // styles={{
        //     overlay: (base) => ({
        //         ...base,
        //         background: 'rgba(221, 13, 0, 0.5)'
        //     })
        // }}
        // >
			<div className="not-main">
				<div className="my-container">
					<div className="not-header-con">
						<h2>Notifications</h2>
					</div>
					<div className="not-content-con">
						
						<div className="not-content">
							{rows.map((row, i) => 
								<div className="notification" key={i}>
									<div>
									<FontAwesomeIcon className="notification-icon" style={{color: (row.status === 'unread' ? "#FE6360" : "gray")}} size="2x" icon={faBell}/>
										<div>
											<h3>{row.type}</h3>
											<h4>{row.date}</h4>
										</div>
									</div>
									{role === 'freelancer' && 
									<>
										{!row.subtype && 
											<Button onClick={() => onNavigate(`/gig-overview/${row.gigid}`, row)}>View Gig</Button>
										}
										{row.subtype === 'invited' && 
											<Button onClick={() => onNavigate(`/view-gig/${row.gigid}`, row)}>Create Proposal</Button>
										}
										{row.subtype === "negotiations" && 
											<Button onClick={() => onNavigate(`/negotiations/${row.gigid}`, row)}>View Negotiations</Button>
										}
										{row.subtype === 'rategig' && 
											<Button onClick={() => onNavigate(`/ongoing-gigs`, row)}>Rate Gig</Button>
										}
									</>
									}

									{role === 'employer' &&
									<> 
										{!row.subtype && 
											<Button onClick={() => onNavigate(`/proposal/${row.gigid}/review-proposals`, row)}>View Proposals</Button>
										}
										{row.subtype =='completed' && 
											<Button onClick={() => onNavigate(`/gig-overview/${row.gigid}`, row)}>View Gig</Button>
										}
										{row.subtype === 'rategig' && 
											<Button onClick={() => onNavigate(`/my-gigs`, row)}>Rate Gig</Button>
										}
									</>
									}
								</div>
							)}
							{rows.length === 0 && 
								<div className="no-nots">
									<h2>No Notifications!</h2>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		// </LoadingOverlay>
	)
}

export default Notifications;