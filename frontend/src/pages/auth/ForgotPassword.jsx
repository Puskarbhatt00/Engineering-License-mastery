import { useState } from "react";
import { useForgotPasswordMutation } from "../../redux/api/user/userApiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword({ email }).unwrap();
            setSubmitted(true);
        } catch (err) {
            toast.error(err?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-2">Forgot Password</h2>
                    <p className="text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
                </div>
                
                {submitted ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-5 rounded-lg mb-6 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p>If your email is in our system, you'll receive a password reset link shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-150 placeholder-gray-400"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-150 font-medium shadow-md hover:shadow-lg"
                        >
                            Send Reset Link
                        </button>
                    </form>
                )}
                
                <div className="mt-6 text-center">
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
