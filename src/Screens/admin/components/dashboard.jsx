import React, { useEffect, useState } from 'react';
import { Button, Table, Input, Modal } from 'semantic-ui-react';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { apiTransact, getDataRows, makeAPI } from '../../../components/service/alaio';

function Dashboard () {
	const [specs, setSpecs] = useState([]);
	const [cats, setCats] = useState([]);
	const [payableMonths, setPayableMonths] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [newSpec, setNewSpec] = useState('');
	const [newCat, setNewCat] = useState('');
	const [activeRecord, setActiveRecord] = useState(false);
	const [fund, setFund] = useState(false);

	let alert = useAlert();
	let history = useHistory();

	const loadData = async() => {
		await getDataRows({	table: 'gcategorys', key_type: 'name' }).then(async({rows}) => setCats(rows))
		await getDataRows({	table: 'gspecials',	key_type: 'name' }).then(async({rows}) => setSpecs(rows))

		let today = new Date();
		let currentMonth = (today.getMonth() + 1).toString() + today.getFullYear();
		await getDataRows({	table: 'revenue', index: '3' }).then(async({rows}) => {
			let months = [];
			for await(let row of rows) {
				let winners = await getDataRows({ table: 'voterecords', upper: row.date, lower: row.date, index: '4' }).then(async({rows}) => rows);
				row.wincount = 0;
				for await(let winner of winners) {
					row.wincount += winner.wins;
				}

				row.paid = row.paid === "true";
				row.date = row.date.toString();
				let year = row.date.slice(row.date.length - 4);
				let month = row.date.slice(0, row.date.length - 4);
				let winner_amount = Math.round(((+(row.revenue.split(" ")[0])) / 10) * 1000) / 1000;
				row.canBePaid = currentMonth != row.date;
				months.push({...row, winner_amount, formatted_date: `${month}/${year}`, winnerlist: winners})
			}
			console.log('months', months);
			setPayableMonths(months);
		})


		await getDataRows({	table: 'voterecords' }).then(async({rows}) => {
			console.log('voterecords', rows)
		})
	}

	const postCategory = async() => {
		setLoading(true)

		await apiTransact('gencategory', { category: newCat }).then((res) => {
			alert.success('Category successfully added!')
			setNewCat('')
			setTimeout(()=>window.location.reload(), 1500);
		}).catch(error => { console.log(error) })

		setLoading(false);
		setOpenModal(false);
	}

	const postSpeciality = async() => {
		setLoading(true)

		await apiTransact('genspecial', { special: newSpec }).then((res) => {
			alert.success('Speciality successfully added!')
			setNewSpec('');
			setTimeout(()=>window.location.reload(), 1500);
		}).catch(error => { console.log(error) })

		setLoading(false)
		setOpenModal(false)
	}

	const delCategory = async(cat) => {
		let data = {
			id: cat.id,
			category: cat.category
		}
		apiTransact('delgencat', data).then((res) => {
			alert.success('Category deleted!')
			setTimeout(()=>window.location.reload(), 1500);
		}).catch(error => { console.log(error) })
	}

	const delSpecial = async(spec) => {
		let data = {
			id:spec.id,
			special: spec.special
		}
		apiTransact('delgenspec', data).then((res) => {
			alert.success('Specialty deleted!')
			setTimeout(()=>window.location.reload(), 1500);
		}).catch(error => { console.log(error) })
	}




	const onGetPrivateKeys = async() => {
		setLoading(true);
		let data = { mnemonicCode: fund.mnemonic, password: fund.password }
		await axios.post(`https://euapi.alacritys.net/users/getKeys`, data).then(async(response) => {
			onPayUsers(response.data.activeKey.priv_key);
		}).catch(error => {
     		alert.error("Mnemonic code or password invalid");
			console.log(error)
		});
	}
	
	const onPayUsers = async(privateKey) => {
		setLoading(true);
		const api = makeAPI(privateKey);

		await apiTransact('payrevenue', {date: activeRecord.date}, 'skillstribe2', 'skillsadmin', api).then(async(res)=>{
			console.log('test', res)
		
			for await(let month of payableMonths) {
				if(month.date === activeRecord.date) month.paid = true;
			}
			setPayableMonths(payableMonths);
	
			alert.success('Payments sent out successfully!')
			setActiveRecord(false)
			setLoading(false);
		})
	}
	


	useEffect(() => {
		loadData()
		let admin = JSON.parse(localStorage.getItem('admin'))
		if(!admin || admin.username !== 'skillsadmin') history.push('/admin')
	}, [])

	return( 
		<div className="my-container">
			<div>
				<div className="admin-dash-header">
					<h2>Dashboard</h2>
				</div>

				<div className="monthly-reward-dashboard">
					<h2>Pay voters from monthly platform revenue</h2>
					{payableMonths.length === 0 && <p>No data</p>}
					{payableMonths.map((month, index) => (
						<div className="month" key={index}>
							<div className="month-header">
								<h3>{month.formatted_date}</h3>

								{!month.paid &&
								<div className="end">
									<Button disabled={month.winnerlist.length === 0 || !month.canBePaid} key={index} color="green" onClick={()=>setActiveRecord(month)}>
										Pay Winners
									</Button>
									<br/>
									{month.winnerlist.length === 0 && <b>Unable to payout - there are no winners</b>}
									{!month.canBePaid && <b>Unable to payout - the month is not over yet</b>}
								</div>}
								{month.paid && <h3 style={{margin: 0}}>Month has been paid out</h3>}
							</div>

							<b>Month's Revenue: {month.revenue}</b>
							<br/>
							<b>Payout amount: {month.winner_amount.toFixed(4)} ALA</b>

							<h3>Winners</h3>
							<Table className="winner-table" striped>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>Username</Table.HeaderCell>
										<Table.HeaderCell>Win Count</Table.HeaderCell>
										<Table.HeaderCell>Payout amount</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{month.winnerlist.length === 0 && 
										<Table.Row>
											<Table.Cell>N/a</Table.Cell>
											<Table.Cell>N/a</Table.Cell>
											<Table.Cell>N/a</Table.Cell>
										</Table.Row>
									}
									{month.winnerlist.map((user, i) => 
										<Table.Row key={i}>
											<Table.Cell><h4>{user.winner}</h4></Table.Cell>
											<Table.Cell><h4>{user.wins} wins</h4></Table.Cell>
											<Table.Cell><h4>{month.paid ? user.payment : 'N/a'}</h4></Table.Cell>
										</Table.Row>
									)}
								</Table.Body>
							</Table>
						</div>
					))}


					<Modal
						open={activeRecord !== false}
						onClose={() => setActiveRecord(false)}
						className="fund-modal"
						>
							<Modal.Header>Payout Users</Modal.Header>
							<Modal.Content className="fund-modal-content">
								{activeRecord.winner_amount === 0 && <p>Not enough revenue to pay users</p>}
								{activeRecord.winner_amount > 0 && 
								<>
								<h3>Confirm payment of {activeRecord.winner_amount?.toFixed(4)} ALA to users who have voted for the winners of community disputes.</h3>
								<Input value={fund.mnemonic} onChange={(e) => setFund({...fund, mnemonic: e.target.value})} placeholder="Cyphered Mnemonic Code"/>
								<Input value={fund.password} onChange={(e) => setFund({...fund, password: e.target.value})} placeholder="Password" type="password"/>
								</>
								}
								<div className="fund-btn-con">
									{activeRecord.winner_amount > 0 && <Button loading={loading} onClick={() => onGetPrivateKeys()} color="green">Submit</Button>}
									<Button onClick={() => setActiveRecord(false)}color="red">Cancel</Button>
								</div>
							</Modal.Content>
					</Modal>
				</div>

				<hr/>

				<div className="admin-dash-content">
					<div className="specials-content">
						<div className="spec-header">
							<h2>Speciality's</h2>
							<Button color="blue" onClick={() => setOpenModal('speciality')}>Add</Button>
						</div>
						<div className="specials">
							{specs?.map((spec, index) => 
								<div className="special" key={index}>
									<h2>{spec.special}</h2>
									<Button onClick={() => delSpecial(spec)}>Delete</Button>
								</div>
							)}
						</div>
					</div>
					<div className="category-content">
						<div className="cat-header">
							<h2>Category's</h2>
							<Button color="blue" onClick={() => setOpenModal('category')}>Add</Button>
						</div>
						<div className="categorys">
							{cats.map((cat, index) => 
								<div className="category" key={index}>
									<h2>{cat.category}</h2>
									<Button onClick={() => delCategory(cat)}>Delete</Button>
								</div>
							)}
						</div>
					</div>
					<Modal
						className="speciality-modal"
						open={openModal==='speciality'}
						onOpen={() => setOpenModal('speciality')}
						onClose={() => setOpenModal(false)}
						>
						<Modal.Header>Add Speciality</Modal.Header>
						<Modal.Content>
							<div className="spec-content">
								<Input 
								value={newSpec}
								onChange={(e) => setNewSpec(e.target.value)}
								className="spec-input"
								placeholder="Add speciality"/>
							</div>
							<div className="btn-group">
								<Button 
								onClick={() => postSpeciality()}
								loading={loading === true}
								disabled={newSpec === ''}
								color="green">Submit</Button>
								<Button onClick={() => setOpenModal(false)}>Cancel</Button>
							</div>
						</Modal.Content>
					</Modal>
					<Modal
						className="category-modal"
						open={openModal==='category'}
						onOpen={() => setOpenModal('category')}
						onClose={() => setOpenModal(false)}
						>
						<Modal.Header>Add Category</Modal.Header>
						<Modal.Content>
							<div className="cat-content">
								<Input 
								value={newCat}
								onChange={(e) => setNewCat(e.target.value)}
								className="cat-input" 
								placeholder="Add Category"/>
							</div>
							<div className="btn-group">
								<Button
								onClick={() => postCategory()}
								disabled={newCat === ''}
								loading={loading === true}
								color="green">Submit</Button>
								<Button onClick={() => setOpenModal(false)}>Cancel</Button>
							</div>
						</Modal.Content>
					</Modal>
				</div>
			</div>
		</div>
	)
}

export default Dashboard;