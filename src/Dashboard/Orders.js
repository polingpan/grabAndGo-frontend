import React, {useState, useEffect} from 'react'
import {Box, Card, CardContent, Typography, Chip, Button, Divider, Tabs, Tab} from '@mui/material'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import {useDispatch, useSelector} from 'react-redux'
import {fetchTodayPickupOrder, updateOrderStatus} from '../actions/businessUser/businessUserAction'
import {alpha, useTheme} from '@mui/material/styles'

function Orders() {
    const [tabIndex, setTabIndex] = useState(1)
    const todayOrders = useSelector(state => state.businessUser.todayOrders)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
    const dispatch = useDispatch()
    const theme = useTheme()

    useEffect(() => {
        dispatch(fetchTodayPickupOrder())
    }, [dispatch])

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue)
    }

    const pickUpClicked = async orderId => {
        const result = await dispatch(updateOrderStatus(orderId))

        if (result.success) {
            setSnackbarSeverity('success')
        } else {
            setSnackbarSeverity('error')
        }

        setSnackbarMessage(result.message)
        setSnackbarOpen(true)
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const filteredOrders = todayOrders.filter(order => {
        if (tabIndex === 0) return order.status === 'Pickup Ready'
        if (tabIndex === 1) return order.status === 'Completed'
        return true
    })

    return (
        <Box>
            {filteredOrders.length > 0 ? (
                <Box>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        centered
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        <Tab label="Pickup Ready" />
                        <Tab label="Completed" />
                    </Tabs>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, 250px)',
                            gap: 2,
                            justifyContent: 'center'
                        }}
                    >
                        {filteredOrders.map(order => (
                            <Card key={order._id} variant="outlined">
                                <CardContent>
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                        <Typography variant="h6">
                                            {order._id.slice(0, 4)}...{order._id.slice(-4)}
                                        </Typography>
                                    </Box>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {order.userName}
                                    </Typography>

                                    <Divider sx={{my: 2}} />

                                    <Box mb={1}>
                                        <Typography variant="subtitle2">{order.productName}</Typography>
                                        <Typography variant="body2">Quantity: {order.quantity}</Typography>
                                    </Box>

                                    <Button
                                        onClick={() => pickUpClicked(order._id)}
                                        variant="contained"
                                        color="success"
                                        fullWidth
                                        disabled={order.status !== 'Pickup Ready'}
                                    >
                                        Pick Up
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert
                            onClose={handleSnackbarClose}
                            severity={snackbarSeverity}
                            sx={{width: '100%'}}
                            variant="filled"
                        >
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            ) : (
                <Box
                    sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 2,
                        mt: 3,
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        boxShadow: `0 1px 4px ${alpha(theme.palette.common.black, 0.1)}`
                    }}
                >
                    <Typography variant="body1" sx={{mb: 1}}>
                        目前尚無可取貨訂單
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default Orders
