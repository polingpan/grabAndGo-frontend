import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'

import {SparkLineChart} from '@mui/x-charts/SparkLineChart'

function getDaysInMonth(month, year) {
    const date = new Date(year, month, 0)
    const monthName = date.toLocaleDateString('en-US', {
        month: 'short'
    })
    const daysInMonth = date.getDate()
    const days = []
    let i = 1
    while (days.length < daysInMonth) {
        days.push(`${monthName} ${i}`)
        i += 1
    }
    return days
}

function renderSparklineCell(params) {
    const data = getDaysInMonth(4, 2024)
    const {value, colDef} = params

    if (!value || value.length === 0) {
        return null
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
            <SparkLineChart
                data={value}
                width={colDef.computedWidth || 100}
                height={32}
                plotType="bar"
                showHighlight
                showTooltip
                colors={['hsl(210, 98%, 42%)']}
                xAxis={{
                    scaleType: 'band',
                    data
                }}
            />
        </div>
    )
}

function renderStatus(status) {
    const colors = {
        Completed: 'success',
        Pending: 'default'
    }

    return <Chip label={status} color={colors[status]} size="small" />
}

export function renderAvatar(params) {
    if (params.value == null) {
        return ''
    }

    return (
        <Avatar
            sx={{
                backgroundColor: params.value.color,
                width: '24px',
                height: '24px',
                fontSize: '0.85rem'
            }}
        >
            {params.value.name.toUpperCase().substring(0, 1)}
        </Avatar>
    )
}

export const columns = [
    {field: 'orderId', headerName: 'Order ID', flex: 0.5, minWidth: 100},
    {
        field: 'date',
        headerName: 'Date',
        flex: 0.5,
        minWidth: 100
    },
    {
        field: 'customerName',
        headerName: 'Customer Name',
        // headerAlign: 'right',
        // align: 'left',
        flex: 0.8,
        minWidth: 100
    },
    {
        field: 'productName',
        headerName: 'Product Name',
        flex: 1,
        minWidth: 80
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        // headerAlign: 'right',
        // align: 'right',
        flex: 0.5,
        minWidth: 30
    },
    {
        field: 'unitPrice',
        headerName: 'Unit Price',
        // headerAlign: 'right',
        // align: 'right',
        flex: 0.1,
        minWidth: 100
    },
    {
        field: 'totalPrice',
        headerName: 'Total Price',
        // headerAlign: 'right',
        // align: 'right',
        flex: 0.1,
        minWidth: 100
    },
    {
        field: 'paymentMethod',
        headerName: 'Payment',
        // headerAlign: 'right',
        // align: 'right',
        flex: 0.5,
        minWidth: 100
    },

    {
        field: 'status',
        headerName: 'Status',
        // headerAlign: 'right',
        // align: 'right',
        flex: 0.5,
        minWidth: 100,
        renderCell: params => renderStatus(params.value)
    }
]
