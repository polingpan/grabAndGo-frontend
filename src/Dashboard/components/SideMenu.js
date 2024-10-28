import * as React from 'react'
import {styled, useTheme} from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import MuiDrawer, {drawerClasses} from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SelectContent from './SelectContent'
import MenuContent from './MenuContent'
import CardAlert from './CardAlert'
import OptionsMenu from './OptionsMenu'
import {useSelector} from 'react-redux'

const drawerWidth = 240

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box'
    }
})

export default function SideMenu({onItemClick, selectedItem}) {
    const theme = useTheme()
    const isDarkMode = theme.palette.mode === 'dark'

    const storeInfo = useSelector(state => state.businessUser.storeInfo)
    return (
        <Drawer
            variant="permanent"
            sx={{
                display: {xs: 'none', md: 'block'},
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: isDarkMode ? 'black' : '#eeecd9'
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 'calc(var(--template-frame-height, 0px) + 4px)',
                    p: 1.5
                }}
            >
                <img src="/logo3.png" alt="" style={{width: '100px'}} />
            </Box>
            <Divider />
            <MenuContent onItemClick={onItemClick} selectedItem={selectedItem} />
            {/*<CardAlert />*/}
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider'
                }}
            >
                {/*<Avatar*/}
                {/*    sizes="small"*/}
                {/*    alt={storeInfo.storeName}*/}
                {/*    sx={{width: 36, height: 36}}*/}
                {/*>*/}
                {/*    {storeInfo.storeName.charAt(0).toUpperCase()}*/}
                {/*</Avatar>*/}
                <Box sx={{mr: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Typography variant="body2" sx={{fontWeight: 500, lineHeight: '16px'}}>
                        {storeInfo.storeName}
                    </Typography>
                    <Typography variant="caption" sx={{color: 'text.secondary'}}>
                        {storeInfo.email}
                    </Typography>
                </Box>
                <OptionsMenu />
            </Stack>
        </Drawer>
    )
}
