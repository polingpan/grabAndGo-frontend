import * as React from 'react'

import {alpha} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import AppNavbar from './components/AppNavbar'
import Header from './components/Header'
import MainGrid from './components/MainGrid'
import SideMenu from './components/SideMenu'
import AppTheme from '../Dashboard/theme/AppTheme'
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations
} from './theme/customizations'
import {useEffect, useState} from 'react'
import {setBusinessUserInfo} from '../actions/businessUser/businessUserAction'
import {useDispatch} from 'react-redux'

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations
}

export default function Dashboard(props) {
    const dispatch = useDispatch()
    const [selectedItem, setSelectedItem] = useState('主頁')

    const handleItemClick = (item) => {
        setSelectedItem(item)
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        dispatch(setBusinessUserInfo(token))
    }, [])
    
    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{display: 'flex'}}>
                <SideMenu onItemClick={handleItemClick} selectedItem={selectedItem} />
                <AppNavbar />

                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: 'auto'
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: {xs: 8, md: 0}
                        }}
                    >
                        <Header selectedItem={selectedItem} />
                        <MainGrid selectedItem={selectedItem} />
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    )
}