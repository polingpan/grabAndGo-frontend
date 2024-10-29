import {Box} from '@mui/material'
import Grid from '@mui/material/Grid2'
import CustomizedDataGrid from './components/CustomizedDataGrid'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchOrders} from '../actions/businessUser/businessUserAction'

function Sales() {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.businessUser.orders)

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    const formattedOrders = orders.map(order => ({
        id: order._id,
        orderId: order._id,
        productName: order.product.name,
        quantity: order.quantity,
        unitPrice: `$${order.product.price}`,
        totalPrice: `$${order.totalPrice}`,
        customerName: `${order.user.firstName} ${order.user.lastName}`,
        date: new Date(order.createdAt).toLocaleDateString(),
        status: order.status,
        paymentMethod: order.paymentMethod
    }))

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Grid container spacing={2} columns={12}>
                <Grid size={{xs: 12, lg: 12}}>
                    <CustomizedDataGrid rows={formattedOrders} />
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
