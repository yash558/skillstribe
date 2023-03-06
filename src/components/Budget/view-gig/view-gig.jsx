import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDataRows, loadGig, apiTransact } from '../../components/service/alaio';
import './view-gig.scss';

function ViewGig (){
	const [gig, setGig] = useState({});
	const [active, setActive] = useState(true);
	const [saved, setSaved] = useState(false);
	const [canCreateProposal, setCanCreateProposal] = useState(false);

	const history = useHistory();
	let { id } = useParams();

	let role = localStorage.getItem('role');
	const storage = JSON.parse(localStorage.getItem('User'));


	const getProposals = async() => {
		let propCount = 0;
		let options = {
			table: 'proposals',
			upper: id,
			lower: id,
			index: 4
		}
		await getDataRows(options).then(async(res) => {
			for await(let row of res.rows){
				if(row.freelancer == storage.username) propCount++;
			}
		});

		await getDataRows({...options, table: 'invitefress', index: 3}).then(async({rows}) => {
			if(propCount === 0 || propCount <= rows.length) setCanCreateProposal(true)
		});
	}

	const checkSaved = async() => {
		let options = {
			table: 'saves',
			upper: storage.username,
			lower: storage.username,
			key_type: 'name',
			index: '3'
		};

		getDataRows(options).then(async(res) => {
			for await(let row of res.rows){
				if(row.gigid === +id) await setSaved(true)
			}
		})
	}

	const saveGig = async() => {
		if(saved === false){
			let data = {
				owner: storage.username,
				gigid: id
			}
			await apiTransact('addgig', data)
			setSaved(true)
		}
		else deleteSaved();
	}

	const deleteSaved = async() => {
		let data = {
			owner: storage.username,
			gigid: id
		}
		await apiTransact('delsaved', data)
		setSaved(false)
	}


	const handleNav = () => {
		history.push({
			pathname:'/create-proposal',
			state: { id: +id }
		})
	}


	useEffect(() => {
		loadGig(id).then((row)=>{
			console.log('row', row)
			if(row.freelancer === storage.username) history.push('/gig-overview/'+id);
			setGig(row)
		})
		if(storage) {
			getProposals();
			checkSaved();
		}
		setActive(false)
	},[])

	return(
		<LoadingOverlay
      active={active}
      spinner
      text="Exploring the Chain"
      fadeSpeed={500}
      className="spinner"
      styles={{
        overlay: (base) => ({
          ...base,
          background: 'rgba(221, 13, 0, 0.5)'
        })
      }}
      >
        <div className="my-container">
          <div className="view-gig-main-container">
            <div className="view-gig-sub-container">
              <div className="view-gig-title-container">
                	<div className="view-title-header">
						<h1 className="view-gig-title">{gig.title}</h1>
						{role !== 'employer' && storage && (
							<FontAwesomeIcon onClick={()=>saveGig()} className="save" size="2x" icon={saved === false ? farHeart : faHeart} />
						)}
					</div>
					<div>
						<h3>Posted by: <span>{gig.employer}</span></h3>
					</div>
              </div>
              <div className="view-gig-info-container">
                <div className="description-container">
					<h3>{gig.category}</h3>
					<h5>Posted on: <span>{gig.created}</span></h5>
                </div>
                <div className="time-container">
					<div className="time-sub-container">
						{gig.paytype === 'Fixed' && <h4 style={{overflow: 'auto'}}>Budget: {gig.budget} ALA</h4>}
						<h4 style={{color: 'gray'}}>{gig.paytype}{gig.paytype === 'Fixed' ? '-Price': '-rate: '+gig.hourlyrate+' ALA/hour'}</h4>
					</div>
					<div className="expertise-con">
						<h4>Experience: {gig.experience}-level</h4>
						<p style={{color: 'gray'}}>I am willing to pay higher rates for the most experienced freelancers.</p>
					</div>
                </div>
                <div className="expertise-info-container">
					<h4 className="special-con">Specialities wanted:&nbsp;&nbsp;&nbsp;
						{gig.speciality?.map((special, i) =><span key={i} className="special-item">{special.value}</span>)}
					</h4>
                </div>

                <div className="details-container">
					<h3>Details</h3>
					<div className="description-con">
						<p dangerouslySetInnerHTML={{__html: gig.description}}/>
					</div>
					<div className="milestones-container">
						<h3>Milestones</h3>
						<div className="milestones-content">
						{gig.milestones?.length === 0 && <p style={{padding: '10px'}}>No Milestones!</p>}
						{gig.milestones?.map((milestone, i) => 
							<div className="milestone" key={i}>
								<div className="milestone-header">
									<h4>{milestone.title}</h4>
									<h5 style={{color: 'gray'}}>Deliverable by: {milestone.date}</h5>
								</div>
								<div className="milestone-content">
									<h4>{milestone.desc}</h4>
									<h5 style={{color: 'gray'}}>Amount for milestone: {milestone.amount}</h5>
								</div>
							</div>
						)}
						</div>
					</div>
                </div>
                <div className="attachment-container">
					<h3>Attachments</h3>
					<div className="attachments-container">
						{gig.attachments?.length === 0 && <p style={{padding: '10px'}}>No Attachments!</p>}
						{gig.attachments?.map((attachment, i) => 
						<div className="attachment" key={i}>
							<h4>{attachment.name}</h4>
							<a href={JSON.parse(attachment.url)} download={attachment.name} >
								<button>Download</button>
							</a>
						</div>
						)}
					</div>
                </div>
				{( !storage || !storage.username) && (<h4 className="has-prop-container">Log in to create a proposal!</h4>)}

				{canCreateProposal === false && (<h4 className="has-prop-container">Looks like you have already created a proposal for this gig!</h4>)}

				{ role === 'employer' && (<h4 className="can-create-container">You can't create a proposal as an employer</h4>)}

				{canCreateProposal === true && role === 'freelancer' && (
					<div className="proposal-button-container">
						<button onClick={() => handleNav()}>Create Proposal</button>
					</div>
				)}
              </div>
            </div>
          </div>
        </div>
		</LoadingOverlay>
	)
}

export default ViewGig;