import {Box} from '@mui/material'
import Grid from '@mui/material/Grid2'
import CustomizedDataGrid from './components/CustomizedDataGrid'

function Sales() {
    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Grid container spacing={2} columns={12}>
                <Grid size={{xs: 12, lg: 9}}>
                    <CustomizedDataGrid />
                </Grid>
                {/*<Grid size={{xs: 12, lg: 3}}>*/}
                {/*    <Stack gap={2} direction={{xs: 'column', sm: 'row', lg: 'column'}}>*/}
                {/*        <CustomizedTreeView />*/}
                {/*        <ChartUserByCountry />*/}
                {/*    </Stack>*/}
                {/*</Grid>*/}
            </Grid>
        </Box>
    )
}

export default Sales