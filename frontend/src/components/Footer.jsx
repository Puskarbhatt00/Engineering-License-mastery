const Footer = () => {
    return (
        <div className="bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto py-10 px-5">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-3">Enhance Your Skills with Our Mock Tests</h3>
                    <p className="text-gray-400">Practice makes perfect! Prepare confidently with our test series.</p>
                    
                    <div className="flex justify-center my-6 space-x-4">
                        <button className="flex items-center border border-gray-500 rounded-lg px-4 py-2 w-52 transition-transform hover:scale-105">
                            <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-7 md:w-8" />
                            <div className="text-left ml-3">
                                <p className="text-xs text-gray-400">Get it on</p>
                                <p className="text-sm md:text-base font-medium">Google Play</p>
                            </div>
                        </button>
                        <button className="flex items-center border border-gray-500 rounded-lg px-4 py-2 w-44 transition-transform hover:scale-105">
                            <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="w-7 md:w-8" />
                            <div className="text-left ml-3">
                                <p className="text-xs text-gray-400">Download from</p>
                                <p className="text-sm md:text-base font-medium">App Store</p>
                            </div>
                        </button>
                    </div>
                </div>
                
                <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 border-t border-gray-700 pt-6">
                    <p>&copy; {new Date().getFullYear()} Mock Test System. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-200">Test Guidelines</a>
                        <span className="border-l border-gray-600"></span>
                        <a href="#" className="hover:text-gray-200">Support</a>
                        <span className="border-l border-gray-600"></span>
                        <a href="#" className="hover:text-gray-200">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;