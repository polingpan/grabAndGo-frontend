import * as React from 'react'
import PropTypes from 'prop-types'
import {useTheme} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {SparkLineChart} from '@mui/x-charts/SparkLineChart'
import {areaElementClasses} from '@mui/x-charts/LineChart'

function AreaGradient({color, id}) {
    return (
        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>
    )
}

AreaGradient.propTypes = {
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

function StatCard({title, interval, data}) {
    const theme = useTheme()

    // Calculate the total value and trend
    const totalValue = data.reduce((sum, item) => sum + item.value, 0)

    const {trend, trendLabel} = React.useMemo(() => {
        if (data.length < 2) return {trend: 'neutral', trendLabel: '0%'}

        const firstValue = data[0].value
        const lastValue = data[data.length - 1].value
        const percentageChange = ((lastValue - firstValue) / firstValue) * 100

        if (percentageChange > 5) {
            return {trend: 'up', trendLabel: `+${percentageChange.toFixed(1)}%`}
        } else if (percentageChange < -5) {
            return {trend: 'down', trendLabel: `${percentageChange.toFixed(1)}%`}
        } else {
            return {trend: 'neutral', trendLabel: '0%'}
        }
    }, [data])

    const trendColors = {
        up: theme.palette.success.main,
        down: theme.palette.error.main,
        neutral: theme.palette.grey[400]
    }

    const color = trend === 'up' ? 'success' : trend === 'down' ? 'error' : 'default'
    const chartColor = trendColors[trend]

    return (
        <Card variant="outlined" sx={{height: '100%', flexGrow: 1}}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    {title}
                </Typography>
                <Stack direction="column" sx={{justifyContent: 'space-between', flexGrow: 1, gap: 1}}>
                    <Stack sx={{justifyContent: 'space-between'}}>
                        <Stack direction="row" sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                            <Typography variant="h4" component="p">
                                {totalValue.toLocaleString()}
                            </Typography>
                            <Chip size="small" color={color} label={trendLabel} />
                        </Stack>
                        <Typography variant="caption" sx={{color: 'text.secondary'}}>
                            {interval}
                        </Typography>
                    </Stack>
                    <Box sx={{width: '100%', height: 50}}>
                        <SparkLineChart
                            colors={[chartColor]}
                            data={data.map(item => item.value)}
                            area
                            showHighlight
                            showTooltip
                            xAxis={{
                                scaleType: 'band',
                                data: data.map(item => item.date)
                            }}
                            sx={{
                                [`& .${areaElementClasses.root}`]: {
                                    fill: `url(#area-gradient-${totalValue})`
                                }
                            }}
                        >
                            <AreaGradient color={chartColor} id={`area-gradient-${totalValue}`} />
                        </SparkLineChart>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    interval: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        })
    ).isRequired
}

export default StatCard
