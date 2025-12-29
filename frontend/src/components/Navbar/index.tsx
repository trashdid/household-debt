import { AppBar, Box, Toolbar, Typography } from '@mui/material'

const Navbar = () => {
    return (
        <Box sx={{width: '100%', height: '10%'}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Housing Debt Visualizer
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar