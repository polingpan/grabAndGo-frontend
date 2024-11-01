import React, {useEffect, useMemo, useState} from 'react'
import {Box, Select, MenuItem, FormControl, Typography} from '@mui/material'
import Grid from '@mui/material/Grid2'
import StatCard from './components/StatCard'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {useDispatch, useSelector} from 'react-redux'
import PageViewsBarChart from './components/PageViewsBarChart'
import SessionsChart from './components/SessionsChart'
import {fetchDashboardData, fetchOrders} from '../actions/businessUser/businessUserAction'

function Performance() {
    const dispatch = useDispatch()
    const [dateRange, setDateRange] = useState('30days')
    const dashboardData = useSelector(state => state.businessUser.dashboardData)

    useEffect(() => {
        const days = dateRange === '30days' ? 30 : dateRange === '90days' ? 90 : undefined
        dispatch(fetchDashboardData(days))
    }, [dispatch, dateRange])

    const handleChange = event => {
        setDateRange(event.target.value)
    }

    const intervalLabel =
        dateRange === '30days' ? 'Last 30 days' : dateRange === '90days' ? 'Last 90 days' : 'Since Joined'

    return (
        <Box sx={{position: 'relative', width: '100%'}}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <FormControl variant="outlined" sx={{mb: 2, minWidth: 180}}>
                    <Select
                        value={dateRange}
                        onChange={handleChange}
                        displayEmpty
                        IconComponent={KeyboardArrowDownIcon}
                        renderValue={() => (
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <CalendarTodayIcon fontSize="small" />
                                <Typography>{intervalLabel}</Typography>
                            </Box>
                        )}
                        sx={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            borderRadius: 1,
                            paddingLeft: 1,
                            '& .MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center'
                            }
                        }}
                    >
                        <MenuItem value="30days">Last 30 Days</MenuItem>
                        <MenuItem value="90days">Last 90 Days</MenuItem>
                        <MenuItem value="sinceJoined">Since Joined</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={2} columns={7} sx={{mb: theme => theme.spacing(2)}}>
                {dashboardData.map((card, index) => (
                    <Grid key={index} size={{xs: 12, sm: 6, lg: 3}}>
                        <StatCard title={card.title} interval={card.interval} data={card.data} dateRange={dateRange} />
                    </Grid>
                ))}
                {/*<Grid size={{ xs: 12, sm: 6, lg: 3 }}>*/}
                {/*  <HighlightedCard />*/}
                {/*</Grid>*/}
                {/*<Grid size={{xs: 12, md: 6}}>*/}
                {/*    <SessionsChart dateRange={dateRange} />*/}
                {/*</Grid>*/}
                {/*<Grid size={{xs: 12, md: 6}}>*/}
                {/*    <PageViewsBarChart dateRange={dateRange} />*/}
                {/*</Grid>*/}
            </Grid>
        </Box>
    )
}

export default Performance
