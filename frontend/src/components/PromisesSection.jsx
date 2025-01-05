import React from 'react';

function PromisesSection() {
    const promises = [
        {
            icon: (
                <img
                    src="https://cdn-icons-png.flaticon.com/128/870/870181.png"
                    alt="Free Shipping Icon"
                    className="w-16 h-16 mx-auto"
                />
            ),
            title: "Free Shipping",
            description: "We provide free and fast worldwide delivery via Express Shipping on orders above ₹1999/-",
        },
        {
            icon: (
                <img
                    src="https://cdn-icons-png.flaticon.com/128/11449/11449880.png"
                    alt="Easy Returns Icon"
                    className="w-16 h-16 mx-auto"
                />
            ),
            title: "Easy Returns & Refund",
            description: "Should you change your mind, we will happily offer a return within 7 days of purchase",
        },
        {
            icon: (
                <img
                    src="https://cdn-icons-png.flaticon.com/128/1041/1041898.png"
                    alt="Support Hours Icon"
                    className="w-16 h-16 mx-auto"
                />
            ),
            title: "Mon-Fri (10:00am to 6:00pm)",
            description:
                "Should you have questions about delivery, returns, and technical issues, we are always here to help",
        },
    ];

    return (
        <div className="bg-white py-12 px-4 sm:px-8 lg:px-16 dark:bg-gray-900">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-8 dark:text-white">
                Add Jaipur Promises
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {promises.map((promise, idx) => (
                    <div key={idx} className="text-center">
                        <div className="mb-4">{promise.icon}</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{promise.title}</h3>
                        <p className="text-sm text-gray-600 mt-2 dark:text-white">{promise.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PromisesSection;
