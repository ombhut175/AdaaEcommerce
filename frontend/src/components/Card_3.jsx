function Card_3() {
    return (
        <div className="m-10">
            <a href="#" className="group relative block bg-black rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out sm:w-[300px] sm:h-[400px] lg:w-[600px] lg:h-[500px]">
                <img alt="fation Image"
                    src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
                    className="inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                />
                <div className="absolute bottom-0 w-full bg-black bg-opacity-75 text-white text-center py-4 transform translate-y-full group-hover:translate-y-0 transition duration-300 ease-in-out">
                    <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, amet!
                    </p>
                </div>
            </a>
        </div>
    );
}

export default Card_3;