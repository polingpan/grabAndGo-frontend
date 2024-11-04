import './login.scss'
import * as yup from 'yup'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../axiosConfig'
import {useDispatch} from 'react-redux'
import {setBusinessUserInfo} from '../actions/businessUser/businessUserAction'
import {useState} from 'react'
import {Alert} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import {OutlinedInput} from '@mui/material'

function Login() {
    const [loginError, setLoginError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const schema = yup.object().shape({
        email: yup.string().required('此為必填欄位').email('請輸入有效電子郵件'),
        password: yup.string().trim().min(6, '密碼必須至少包含 6 個字符').max(20, '密碼不能超過 20 個字符')
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClickShowPassword = () => setShowPassword(show => !show)

    const handleMouseDownPassword = event => {
        event.preventDefault()
    }

    const handleMouseUpPassword = event => {
        event.preventDefault()
    }

    return (
        <div className="pageWrapper">
            <div className="leftSection">
                <div className="formContainer">
                    <h2 className="heading">登入您的 GRAB & GO 帳戶</h2>

                    <Formik
                        initialValues={{email: '', password: ''}}
                        validationSchema={schema}
                        validateOnMount={true}
                        onSubmit={async (values, {setSubmitting}) => {
                            setLoginError('')
                            try {
                                const response = await axiosInstance.post('/auth/business-login', values)

                                if (response.status === 200) {
                                    localStorage.setItem('token', response.data.token)
                                    axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.token}`

                                    navigate('/dashboard')
                                } else {
                                    setLoginError('Login failed. Please try again.')
                                }
                            } catch (error) {
                                console.error('Error:', error.response.data.message)
                                setLoginError(error.response.data.message)
                            }
                            setSubmitting(false)
                        }}
                    >
                        {({errors, touched, isSubmitting, isValid, values}) => (
                            <Form>
                                {loginError && (
                                    <Alert
                                        severity="error"
                                        sx={{
                                            margin: '0 0 1rem 0',
                                            borderRadius: '30px',
                                            width: '100%'
                                        }}
                                    >
                                        {loginError}
                                    </Alert>
                                )}
                                <div style={{textAlign: 'left'}}>
                                    <Field
                                        as={OutlinedInput}
                                        name="email"
                                        type="email"
                                        placeholder="電子郵件"
                                        className={`input ${errors.email && touched.email ? 'error' : ''}`}
                                        sx={{
                                            boxSizing: 'unset',
                                            borderRadius: '30px',
                                            padding: '10px',
                                            paddingRight: '14px',
                                            fontSize: '14px'
                                        }}
                                    />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>
                                <div style={{textAlign: 'left'}}>
                                    <Field
                                        name="password"
                                        as={OutlinedInput}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="密碼"
                                        className={`input ${errors.password && touched.password ? 'error' : ''}`}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showPassword ? 'hide the password' : 'display the password'
                                                    }
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        sx={{
                                            boxSizing: 'unset',
                                            borderRadius: '30px',
                                            padding: '10px',
                                            paddingRight: '14px',
                                            fontSize: '14px'
                                        }}
                                    />
                                    <ErrorMessage name="password" component="div" className="error" />
                                </div>
                                <div className="forgotPassword">
                                    <a href="">忘記密碼？</a>
                                </div>
                                <button
                                    type="submit"
                                    className="loginBtn"
                                    disabled={!isValid || isSubmitting || !values.email || !values.password}
                                >
                                    登入
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            <div className="rightSection">
                <img src="/grabAndGo.svg" alt="Visual" className="image" />
            </div>
        </div>
    )
}

export default Login
