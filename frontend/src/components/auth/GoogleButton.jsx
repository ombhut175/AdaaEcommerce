export function GoogleButton() {
    function handleSignIn(){
        window.location.href=import.meta.env.VITE_BACKEND_URL + '/api/google';
    }


    return (
        <>
            <button
                className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-md"
                onClick={handleSignIn}
            >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5"/>
                <span className="text-sm text-gray-700 dark:text-gray-200">Sign up with Google</span>
            </button>
        </>
    )
}