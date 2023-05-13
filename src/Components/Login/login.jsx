import { Card, Form, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { LOGIN_CREDENTIALS } from '../../MockData/members';
import { useNavigate } from 'react-router';
import { getLoggedInUser, setLoginUser } from '../Utils/helperFunction';
import Logo from "../../assets/QuokkaLabsLogo.png";

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email validation regex
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/; // password validation regex

const Login = () => {
    const navigation = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (getLoggedInUser()?.id) {
            navigation("/members")
        }
    }, [navigation])

    const onFinish = (values) => {
        setLoading(true);
        const logInObj = LOGIN_CREDENTIALS.find((x) => x.email === values.email)
        if (logInObj) {
            if (logInObj.password === values.password) {
                message.success("Login successfully.")
                setLoginUser(logInObj)
                navigation("/members")
            } else {
                message.error("Password incorrect. please try again.")
            }
        } else {
            message.error("Entered email does not found.")
        }

        setLoading(false);
    };

    return (
        <div className='loginForm'>
            <div className='container'>
                {/* Setting the logo with login form*/}
                <img src={Logo} alt='logo' />
                <div className='cardWrapper '>
                    <Card title="Login" className='cardWrapperTitle'>
                        <Form form={form} name="login" onFinish={onFinish}>
                            <Form.Item
                                className="customFormItem"
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    {
                                        pattern: regexEmail,
                                        message: 'Please enter a valid email address',
                                    },
                                ]}
                                validateTrigger="onBlur"
                            >
                                <Input placeholder="Enter your email" />
                            </Form.Item>

                            <Form.Item
                                className="customFormItem"
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: 'Please enter your password' },
                                    {
                                        pattern: regexPassword,
                                        message: 'Minimum 6 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
                                    },
                                ]}
                                validateTrigger="onBlur"
                            >
                                <Input.Password placeholder="Enter your password" />
                            </Form.Item>

                            <Form.Item>
                                <Button className="loginButton" type="primary" htmlType="submit" loading={loading}>
                                    LOGIN
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;
