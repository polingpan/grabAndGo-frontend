import {useTheme} from '@emotion/react'
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material'
import {useState} from 'react'
import {useSelector} from 'react-redux'

export default function MyAccount({open, onClose}) {
    const theme = useTheme()
    const isDarkMode = theme.palette.mode === 'dark'

    const storeInfo = useSelector(state => state.businessUser.storeInfo)

    return (
        <Dialog open={open} close={onClose} aria-labelledby="my-account-dialog">
            <DialogTitle>帳號資訊</DialogTitle>
            <DialogContent sx={{width: '490px'}}>
                <Box sx={{display: 'flex', gap: 2}}>
                    <TextField
                        margin="dense"
                        label="商店名稱"
                        value={storeInfo.storeName}
                        fullWidth
                        InputProps={{readOnly: true}}
                    />
                    <TextField
                        margin="dense"
                        label="電子郵件"
                        value={storeInfo.email}
                        fullWidth
                        InputProps={{readOnly: true}}
                    />
                </Box>
                <Box sx={{display: 'flex', gap: 2}}>
                    <TextField
                        margin="dense"
                        label="商店地址"
                        value={storeInfo.storeAddress}
                        fullWidth
                        InputProps={{readOnly: true}}
                    />
                    <TextField
                        margin="dense"
                        label="電話號碼"
                        value={storeInfo.phoneNumber}
                        fullWidth
                        InputProps={{readOnly: true}}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Box>
                    <Button
                        onClick={onClose}
                        sx={{
                            backgroundColor: isDarkMode ? 'hsl(220, 20%, 42%)' : '#E0E0E0',
                            color: '#424242'
                        }}
                    >
                        返回
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}
