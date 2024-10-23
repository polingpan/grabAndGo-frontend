import './login.scss'
import * as yup from 'yup'
import {Formik, Form, Field, ErrorMessage} from 'formik'

function Login() {
    const schema = yup.object().shape({
        email: yup.string().required('此為必填欄位').email('請輸入有效電子郵件'),
        password: yup.string().trim().min(6, '密碼必須至少包含 6 個字符').max(20, '密碼不能超過 20 個字符')
    })

    return (
        <div className="pageWrapper">
            <div className="leftSection">
                <div className="formContainer">
                    <h2 className="heading">登入您的 GRAB & GO 帳戶</h2>

                    <Formik
                        initialValues={{email: '', password: ''}}
                        validationSchema={schema}
                        validateOnMount={true}
                        onSubmit={(values, {setSubmitting}) => {
                            console.log('Form data', values)
                            setSubmitting(false)
                        }}
                    >
                        {({errors, touched, isSubmitting, isValid, values}) => (
                            <Form>
                                <div style={{textAlign: 'left'}}>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="電子郵件"
                                        className={`input ${errors.email && touched.email ? 'error' : ''}`}
                                    />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>
                                <div style={{textAlign: 'left'}}>
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="密碼"
                                        className={`input ${errors.password && touched.password ? 'error' : ''}`}
                                    />
                                    <ErrorMessage name="password" component="div" className="error" />
                                </div>
                                <div className="forgotPassword">
                                    <a href="">忘記密碼？</a>
                                </div>
                                <button
                                    type="submit"
                                    className="loginBtn"
                                    disabled={
                                        !isValid || isSubmitting || !values.email || !values.password // Disable if form is invalid or fields are empty
                                    }
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
