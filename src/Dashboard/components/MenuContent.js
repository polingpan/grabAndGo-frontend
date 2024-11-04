import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import ReceiptIcon from '@mui/icons-material/Receipt'
import {useNavigate} from 'react-router-dom'
import {useTheme} from '@mui/material/styles'
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded'

const mainListItems = [
    {text: '主頁', icon: <HomeRoundedIcon />, path: 'home'},
    {text: '今日訂單', icon: <LocalMallRoundedIcon />, path: 'orders'},
    {text: '業績分析', icon: <AnalyticsRoundedIcon />, path: 'performance'},
    {text: '銷售紀錄', icon: <ReceiptIcon />, path: 'sales'}
]

const secondaryListItems = [
    {text: '設定', icon: <SettingsRoundedIcon />, path: 'settings'},
    {text: '關於', icon: <InfoRoundedIcon />, path: 'about'},
    {text: '反饋', icon: <HelpRoundedIcon />, path: 'feedback'}
]

export default function MenuContent({onItemClick, selectedItem}) {
    const theme = useTheme()
    const isDarkMode = theme.palette.mode === 'dark'
    return (
        <Stack sx={{flexGrow: 1, p: 1, justifyContent: 'space-between'}}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            onClick={() => onItemClick(item.text)}
                            selected={selectedItem === item.text}
                            sx={{
                                backgroundColor: selectedItem === item.text ? '#c8c5b2' : 'transparent',
                                '&:hover': {backgroundColor: isDarkMode ? 'hsla(220, 20%, 88%, 0.3)' : '#c8c5b2'}
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    '& .MuiTypography-root': {
                                        fontSize: '1rem'
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            onClick={() => onItemClick(item.text)}
                            sx={{
                                backgroundColor: selectedItem === item.text ? '#c8c5b2' : 'transparent',
                                '&:hover': {backgroundColor: isDarkMode ? 'hsla(220, 20%, 88%, 0.3)' : '#c8c5b2'}
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    '& .MuiTypography-root': {
                                        fontSize: '1rem'
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    )
}
