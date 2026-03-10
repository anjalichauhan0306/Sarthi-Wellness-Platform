import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { loginUser } from "../../api/userapi";


const loginSchema = Yup.object({
    email: Yup.string().email("Enter valid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
});


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (values) => {
        try {
           const data = await loginUser(values);
            dispatch(setUserData(data));
            navigate("/dashboard");
            console.log(data);
        } catch (error) {
            console.error("Login failed:", error.response ? error.response.data : error.message);
            dispatch(setUserData(null));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-100 to-white">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-orange-200">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-orange-500 tracking-wide">
                        SARTHI
                    </h1>
                    <p className="text-orange-500 text-sm mt-1">Mind • Body • Soul</p>
                </div>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* EMAIL */}
                            <div>
                                <label className="text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full mt-1 p-3 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                                {touched.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <label className="text-sm text-gray-600">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full mt-1 p-3 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                />
                                {touched.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
                            >
                                Login
                            </button>
                        </form>
                    )}
                </Formik>

                <Link to="/register">
                    <p className="text-center text-sm text-gray-500 mt-6">
                        New here?{" "}
                        <span className="text-orange-500 cursor-pointer">
                            Create account
                        </span>
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Login;
