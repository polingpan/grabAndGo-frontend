import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axiosInstance from '../axiosConfig'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

function BusinessEmailVerification() {
    const {token} = useParams()
    const navigate = useNavigate()
    const [statusMessage, setStatusMessage] = useState('')
    const [isVerified, setIsVerified] = useState(false)
    const [passwordMessage, setPasswordMessage] = useState('')

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axiosInstance.get(`/auth/business-verify/${token}`)
                setStatusMessage(response.data.message)
                setIsVerified(true)
            } catch (error) {
                setStatusMessage(error.response?.data?.error || 'Verification failed.')
                setIsVerified(false)
            }
        }
        verifyEmail()
    }, [token])

    const validationSchema = Yup.object({
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password')
    })

    const handleSubmit = async (values, {setSubmitting}) => {
        setSubmitting(true)
        try {
            const response = await axiosInstance.post(`/auth/complete-business-signup/${token}`, {
                password: values.password
            })
            setPasswordMessage(response.data.message || 'Password set successfully.')
            setTimeout(() => navigate('/login'), 2000)
        } catch (error) {
            setPasswordMessage(error.response?.data?.error || 'Failed to set password.')
        }
        setSubmitting(false)
    }

    return (
        <div>
            <h1>Email Verification</h1>
            <p>{statusMessage}</p>
            {isVerified && (
                <div>
                    <h2>Set Your Password</h2>
                    <Formik
                        initialValues={{password: '', confirmPassword: ''}}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <div>
                                    <label htmlFor="password">New Password:</label>
                                    <Field type="password" name="password" id="password" />
                                    <ErrorMessage name="password" component="div" className="error" />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password:</label>
                                    <Field type="password" name="confirmPassword" id="confirmPassword" />
                                    <ErrorMessage name="confirmPassword" component="div" className="error" />
                                </div>

                                <button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Setting Password...' : 'Set Password'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <p>{passwordMessage}</p>
                </div>
            )}
        </div>
    )
}

export default BusinessEmailVerification
