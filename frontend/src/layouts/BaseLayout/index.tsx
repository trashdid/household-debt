import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { Box } from '@mui/material'

const BaseLayout = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
				width: '100%',
			}}
		>
			<Navbar />
			<Box component="main" sx={{ flexGrow: 1 }}>
				<Outlet />
			</Box>
		</Box>
	)
}

export default BaseLayout
