import React, {useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import ReactQuill from 'react-quill';
import { useAlert } from 'react-alert'
import { Button } from 'semantic-ui-react'
import { sendNotification, loadGig, apiTransact } from '../../components/service/alaio';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Gaia from '../../components/service/gaia';
import './create-proposal.scss';


function CreateProposal () {
	const [startDate, setStartDate] = useState(new Date());
	const [title, setTitle] = useState('');
	const [letter, setLetter] = useState('');
	const [hourLimit, setHourLimit] = useState('');
	const [rate, setRate] = useState('');
	const [milestones, setMilestones] = useState([]);
	const [edit, setEdit] = useState(false);
	const [newMile, setNewMile] = useState(false);
	const [mTitle, setMTitle] = useState('');
	const [mDate, setMDate] = useState(new Date());
	const [mDesc, setMDesc] = useState('');
	const [mAmount, setMAmount] = useState('');
	const [mRevisions, setMRevisions] = useState('');
	const [loading, setLoading] = useState(false);
	const [gig, setGig] = useState({});
	const [attachment, setAttachment] = useState([]);
	const [files, setFiles] = useState([]);


	let hubURL = 'https://rub.alacritys.net';
	const alert = useAlert();
	const location = useLocation();
	const history = useNavigate();

	const storage = JSON.parse(localStorage.getItem('User'))
	
	const onSubmit = async() => {
		setLoading(true)

		if(title !== '' && letter !== '' && startDate !== ''){
			// await submitFiles()
			console.log('onSubmit files',files)

			let data = {
				freelancer: storage.username,
				title:title,
				letter: letter,
				rate: rate+':'+hourLimit,
				file: JSON.stringify(files),
				startdate: startDate,
				gigid: +gig.id,
				status: 'OPEN',
				milestones: JSON.stringify(milestones)
			}
			console.log('createprop', data)
			Promise.all([
				apiTransact("createprop", data),
				sendNotification(gig.employer, `${storage.username} has submitted a proprosal for ${gig.title}!`, gig.id)
			]).then((values) => {
				alert.success("Proposal successfully submitted!")
				setLoading(false)
				setTimeout(() => history.push('/search'), 1500);
			})
		}
		else return;
	}

	const onChangeItem = async(e, i, value) => {
		let newMiles = [...milestones]

		if(value == 'amount') setRate((rate - (+newMiles[i].amount)) + (+e.target.value));
		if(value === 'date') newMiles[+i].date = e.toLocaleString("en-us")
		else newMiles[i][value] = e.target.value;
		console.log('newMiles', newMiles);

		setMilestones(newMiles)
	}

	const deleteMile = (i) => {
		setRate((+rate) - (+(milestones[i].amount)))
		setMilestones(array => array.filter((img,index) => index !== i))
	}

	const newMilestone = async() => {
		await setMilestones(array => [...array, {
			amount: mAmount,
			title: mTitle,
			revision_limit: mRevisions,
			desc: mDesc,
			date: mDate
		}]);
		setRate((+rate) + (+mAmount))
		setMAmount('')
		setMTitle('')
		setMDesc('')
		setMDate('')
		setNewMile(false)
	}

	const changeButton = (status) => {
		if(status === 'edit'){
			setEdit(!edit)
			setNewMile(false)
		}
		else if(status === 'new'){
			setNewMile(!newMile)
			setEdit(false)
		}
	}

	const submitFiles = async() => {
		for await(let file of attachment) {
			await postImage(file).then(res => {
				console.log('submitFiles->postImage',res)
				if(res.data.success === true) files.push({url: JSON.stringify(res.data.data), name: file.name})
				else alert.error('An error occured while trying to post your file')
			})
			.catch(error => {
				console.log(error)
				alert.error(error)
			})
		}
	}

	const postImage = async(file) => {
		let data = new FormData();
		data.append('file', file, `/${location.state.title}/${file.name}`)
		data.append('hubURL', hubURL)
		data.append('appPrivateKey', Gaia.getAppPrivateKey(storage));
		return Gaia.callAPI('uploadFile', data)
	}

	const onImageChange = (event) => {
		for(let i of event.target.files) {
			setAttachment(array => [...array, i])
		}
	}

	const handleFileRemoval = (name) => {
		setAttachment(files => files.filter(file => file.name !== name))
	}


	useEffect(() => {
		if(!location.state || !location.state.id) history.push('/search')
		loadGig(location.state.id).then((row)=>{
			setGig(row);
			if(row.paytype === 'Fixed') setRate(row.budget);
			else {
				setRate(row.hourlyrate);
				setHourLimit(row.weeklylimit)
			}
			setMilestones(row.milestones)
		})
	},[])

	return(
        <div className="my-container bottom">
            <div className="create-proposal-main-container">
                <div className="create-proposal-sub-container">
                    <div className="create-proposal-title-container">
                        <h3>Create Proposal for gig <span>#{gig.id}</span></h3>
                    </div>
					{/* <hr/> */}
                    <div className="create-proposal-form-container">
                        <h3>Title</h3>
                        <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Title"/>
                        <h3>Letter</h3>
                        <ReactQuill className="quill-rte" id="editing-area" value={letter} onChange={(e) => setLetter(e) } />
						{gig.paytype !== 'Fixed' &&   
							<>
								<h3>Hourly Rate (ALA)</h3>
								<input value={rate} onChange={e => setRate(e.target.value)} type="number" placeholder="Hourly Rate"/>
								
								<h3>Weekly hour limit</h3>
								<input value={hourLimit} onChange={e => setHourLimit(e.target.value)} type="number" placeholder="Weekly hour limit"/>
							</>
						}
						{gig.paytype === 'Fixed' &&   
							<>
								<h3>Gig Budget (ALA)</h3>
								<input value={rate} onChange={e => setRate(e.target.value)} type="number" placeholder="Gig Budget"/>
							</>
						}
						

                    </div>
					
					{gig.paytype === "Fixed" && 
					<div className="create-proposal-milestone-container">
						<div className="milestone-header">
							<h3>Milestones</h3>
							<Button.Group>
								<Button 
								style={newMile === true ? {opacity: '0.6'} : {opacity: '1'}}
								onClick={() => changeButton('new') } 
								color="green"
								>New</Button>
								<Button 
								style={edit === true ? {opacity: '0.6'} : {opacity: '1'}}
								onClick={() => changeButton('edit') } 
								color="yellow"
								>Edit</Button>
							</Button.Group>
						</div>
						{edit === true &&  newMile === false && 
						//Edit milstone(s)
							<div>
								{milestones?.map((milestone, i) => 
								<div style={{border: '2px solid yellow'}} className="milestone" key={i}>
									<label>
										<h5>Milestone Title</h5>
										<input
										onChange={(e) => onChangeItem(e, i, 'title')}
										value={milestone.title}
										type="text"/>
									</label>
									<label>
										<h5>Milestone Amount</h5>
										<input
										onChange={(e) => onChangeItem(e, i , 'amount')}
										value={milestone.amount}
										type="number"/>
									</label>
									<label>
										<h5>Milestone Revision Limit</h5>
										<input
										onChange={(e) => onChangeItem(e, i , 'revision_limit')}
										value={milestone.revision_limit}
										type="number"/>
									</label>
									<label>
										<h5>Milestone Description</h5>
										<textarea 
										onChange={(e) => onChangeItem(e, i, 'desc')}
										value={milestone.desc}></textarea>
									</label>
									<label>
										<h5>Milestone Deliverable by</h5>
										<DatePicker 
										id="m-date"
										name="date" 
										selected={new Date(milestone.date)}
										onSelect={e => onChangeItem(e, i , 'date')}
										onChange={e => onChangeItem(e, i, 'date')}/>
									</label>
									<br/>
									<Button onClick={() => deleteMile(i)} color="red">Delete</Button>
								</div>
								)}
							</div>
						}
						{edit === false && newMile === false &&
						//Original Milstone(s)
							<div>
							{milestones?.map((milestone, i) => 
							<div className="milestone" key={i}>
								<h3>Title: {milestone.title}</h3>
								<h3>ALA Amount: {milestone.amount} ALA</h3>
								<p><b>Description</b>: {milestone.desc}</p>
								<p><b>Date</b>: {String(milestone?.date)}</p>
							</div>
							)}
						</div>
						}
						{newMile === true && edit === false &&
						//New Milestone
							<div>
								<div className="milestone" style={{border: '2px solid lightgreen'}}>
									<div>
										<label>
											<h5>Milestone Title</h5>
											<input
											onChange={(e) => setMTitle(e.target.value)}
											value={mTitle}
											type="text"/>
										</label>
										<label>
											<h5>Milestone Amount</h5>
											<input
											onChange={(e) => setMAmount(e.target.value)}
											value={mAmount}
											type="number"/>
										</label>
										<label>
											<h5>Milestone Revision Limit</h5>
											<input
											onChange={(e) => setMRevisions(e.target.value)}
											value={mRevisions}
											type="number"/>
										</label>
										<label>
											<h5>Milestone Description</h5>
											<textarea  
											onChange={(e) => setMDesc(e.target.value) }
											value={mDesc}></textarea>
										</label>
										<label>
											<h5>Milestone Deliverable Date</h5>
											<DatePicker
											id="m-date"
											name="date" 
											selected={mDate} 
											onChange={date => setMDate(date)}/>
										</label>
										<br/>
										<Button onClick={() => newMilestone()} color="green">Submit</Button>
									</div>
								</div>
							</div>
						}
					</div>
					}
                    <div className="date-sub-container">
                        <h2>Available Start Date</h2>
                        <DatePicker name="date" selected={startDate} onChange={date => setStartDate(date)}/>
                    </div>
					<div className="additional-files-container">
						<h3>Additional project files (optional)</h3>
						<input multiple onChange={event => onImageChange(event)} type="file"/>
						<div className="files-container">
							{attachment.map((file, i) => 
								<div className="attachment-container" key={i}>
									<h3>{file.name}</h3>
									<button onClick={() => handleFileRemoval(file.name)}>X</button>
								</div>
							)}
						</div>
					</div>
                    <div className="create-proposal-button-container">
						<Button
						loading={loading === true}
						style={title === '' || letter === '' || startDate === '' ? {opacity: '0.2'} : {opacity: '1'}}
						disabled={title === '' || letter === '' || startDate === ''}
						onClick={() => onSubmit()}>Submit Proposal</Button>
                    </div>
                </div>
            </div>
            <div style={{height:'3rem'}}></div>
        </div>
		
	)
}

export default CreateProposal;