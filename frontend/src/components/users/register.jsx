import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import { registerUser } from "../../api/userapi";

const registerSchema = Yup.object({
    username: Yup.string()
        .min(3, "At least 3 characters")
        .required("Username required"),
    email: Yup.string().email("Enter valid email").required("Email required"),
    password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm your password"),
});

export default function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (values) => {
        try {
            const data = await registerUser(values)   
            dispatch(setUserData(data));
            console.log(data);
            navigate("/dashboard");
        } catch (error) {
            console.error("Registration failed:", error.response ? error.response.data : error.message);
            dispatch(setUserData(null));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 via-white to-orange-50 py-10">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-orange-500 tracking-wide">
                        SARTHI
                    </h1>
                    <p className="text-orange-500 text-sm">Create your account</p>
                </div>

                <Formik
                    initialValues={{
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={registerSchema}
                    onSubmit={(values) => {
                       handleSubmit(values);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={values.username}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-400 outline-none"
                                />
                                {touched.username && (
                                    <p className="text-red-500 text-sm">{errors.username}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-400 outline-none"
                                />
                                {touched.email && (
                                    <p className="text-red-500 text-sm">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-400 outline-none"
                                />
                                {touched.password && (
                                    <p className="text-red-500 text-sm">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-400 outline-none"
                                />
                                {touched.confirmPassword && (
                                    <p className="text-red-500 text-sm">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            <button type="submit"
                            className="w-full mt-2 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition">
                                Continue
                            </button>
                        </form>
                    )}
                </Formik>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-orange-500 font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
