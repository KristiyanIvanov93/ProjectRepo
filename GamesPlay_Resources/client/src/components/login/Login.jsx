import { useLogin } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    email: '',
    password: ''
};

export default function Login() {
    const login = useLogin();
    const navigate = useNavigate();

    const loginHandler = async (values) => {
        try {
            await login(values.email, values.password);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const { changeHandler, submitHandler, values } = useForm(initialValues, loginHandler);

    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={submitHandler}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={values.email}
                        onChange={changeHandler}
                        name="email"
                        placeholder="email@gmail.com"
                    />
                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                        placeholder="password"

                    />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have a profile, click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    );
}
