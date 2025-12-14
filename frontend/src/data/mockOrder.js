export const mockOrders = [
    {
        _id: "ord_1",
        productId: {
            name: "Rounded Red Hat",
            image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shop%20Page.jpg-tSODerZI9zsLpZ0wXJ0bqCkrRFM2TO.jpeg",
            price: 58.0,
        },
        addressId: {
            street: "123 Fashion Ave",
            city: "New York",
            state: "NY",
            zipCode: "10001",
        },
        price: 58.0,
        quantity: 1,
        orderType: "standard",
        paymentMethod: "Credit Card",
        paymentStatus: "paid",
        orderStatus: "delivered",
        orderDate: "2024-01-15T10:30:00Z",
        deliveryDate: "2024-01-20T14:00:00Z",
    },
    {
        _id: "ord_2",
        productId: {
            name: "Long-sleeve Coat",
            image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shop%20Page.jpg-tSODerZI9zsLpZ0wXJ0bqCkrRFM2TO.jpeg",
            price: 106.0,
        },
        addressId: {
            street: "456 Style Street",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90001",
        },
        price: 106.0,
        quantity: 1,
        orderType: "express",
        paymentMethod: "PayPal",
        paymentStatus: "paid",
        orderStatus: "in transit",
        orderDate: "2024-01-25T15:45:00Z",
        deliveryDate: "2024-01-30T12:00:00Z",
    },
    {
        _id: "ord_3",
        productId: {
            name: "Linen-blend Shirt",
            image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shop%20Page.jpg-tSODerZI9zsLpZ0wXJ0bqCkrRFM2TO.jpeg",
            price: 17.0,
        },
        addressId: {
            street: "789 Boutique Blvd",
            city: "Miami",
            state: "FL",
            zipCode: "33101",
        },
        price: 17.0,
        quantity: 2,
        orderType: "standard",
        paymentMethod: "Debit Card",
        paymentStatus: "pending",
        orderStatus: "processing",
        orderDate: "2024-01-28T09:15:00Z",
        deliveryDate: null,
    },
]
