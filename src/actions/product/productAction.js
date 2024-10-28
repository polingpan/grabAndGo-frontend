import axiosInstance from '../../axiosConfig'

export const productActionType = {
    FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
    DELETE_PRODUCT_SUCCESS: 'DELETE_PRODUCT_SUCCESS',
    ADD_PRODUCT_SUCCESS: 'ADD_PRODUCT_SUCCESS',
    UPDATE_PRODUCT_SUCCESS: 'UPDATE_PRODUCT_SUCCESS'
}

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await axiosInstance.get('/products')
            dispatch({type: productActionType.FETCH_PRODUCTS_SUCCESS, payload: response.data.products})
        } catch (error) {
            dispatch({type: 'FETCH_PRODUCTS_FAILURE', payload: error})
        }
    }
}

export const deleteProduct = productId => {
    return async dispatch => {
        try {
            const response = await axiosInstance.delete(`/products/${productId}`)

            dispatch({
                type: productActionType.DELETE_PRODUCT_SUCCESS,
                payload: productId
            })
        } catch (error) {
            console.error('Failed to delete product:', error.response?.data || error.message)
        }
    }
}

export const addProduct = productData => {
    return async dispatch => {
        try {
            const response = await axiosInstance.post('/products', productData)

            dispatch({
                type: productActionType.ADD_PRODUCT_SUCCESS,
                payload: response.data.product
            })
        } catch (err) {
            console.error('Failed to add product:', err.response?.data || err.message)
        }
    }
}

export const editProduct = (productId, updateData) => {
    return async dispatch => {
        try {
            const response = await axiosInstance.patch(`/products/${productId}`, updateData)

            dispatch({
                type: productActionType.UPDATE_PRODUCT_SUCCESS,
                payload: response.data.product
            })
        } catch (err) {}
    }
}
