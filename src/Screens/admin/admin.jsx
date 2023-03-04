
import React from 'react'
import './admin.scss';
import LoginPage from './components/login';

function AdminPage() {
	return(
		<div className="my-container">
			<div>
				<h2>Admin</h2>
				<LoginPage/>
			</div>
		</div>
	)
}

export default AdminPage;