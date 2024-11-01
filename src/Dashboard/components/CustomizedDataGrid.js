import * as React from 'react'
import {DataGrid} from '@mui/x-data-grid'
import {columns} from '../internals/data/gridData'

export default function CustomizedDataGrid({rows, paginationModel, setPaginationModel, totalOrders}) {
    return (
        <DataGrid
            autoHeight
            checkboxSelection
            rowCount={totalOrders}
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 20, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            paginationMode="server"
            getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
            initialState={{
                pagination: {paginationModel: {pageSize: 10}}
            }}
            disableColumnResize
            density="compact"
            slotProps={{
                filterPanel: {
                    filterFormProps: {
                        logicOperatorInputProps: {
                            variant: 'outlined',
                            size: 'small'
                        },
                        columnInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: {mt: 'auto'}
                        },
                        operatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: {mt: 'auto'}
                        },
                        valueInputProps: {
                            InputComponentProps: {
                                variant: 'outlined',
                                size: 'small'
                            }
                        }
                    }
                }
            }}
        />
    )
}
