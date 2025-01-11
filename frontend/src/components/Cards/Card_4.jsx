function Card_4() {
    return (
        <section className="dark:bg-gray-900 bg-slate-100">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                    <div>
                        <img
                            src="https://img.freepik.com/premium-photo/minimal-fashionable-style-elegance-collection-trendy-beauty-modern-clothes-stylish-sale-accessory-women_163305-236927.jpg"
                            className="rounded shadow-xl"
                            alt=""
                        />
                    </div>
                    <div>
                        <div className="max-w-lg md:max-w-none">
                            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </h2>

                            <p className="mt-4 text-gray-700 dark:text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
                                architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas
                                sequi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Card_4;