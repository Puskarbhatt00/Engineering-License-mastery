import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/user/userApiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetPassword] = useResetPasswordMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }
        try {
            await resetPassword({ token, password }).unwrap();
            toast.success("Password reset successful. Please log in.");
            navigate("/login");
        } catch (err) {
            toast.error(err?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-bold mb-2 text-center text-blue-600">Reset Password</h2>
                <p className="text-gray-600 text-center mb-6">Enter your new password below</p>
                
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
                    <p>This reset link will expire in 5 minutes</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Enter your new password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Confirm your new password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                        Reset Password
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
