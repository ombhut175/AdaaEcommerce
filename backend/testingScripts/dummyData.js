const mongoose = require('mongoose');

const {ObjectId} = require('mongoose').Types;
const User = require('../models/User');
const Product = require('../models/Product');
const UserActivities = require('../models/UserActivities');


// Replace with your MongoDB URI
const mongoURI = ';


// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
//     const generateProductsForDealers = async () => {
//         try {
//             // Fetch all dealers with the role "dealer"
//             const dealerIds = await User.find({ role: "dealer" });
//
//             // Loop through each dealer
//             for (const dealer of dealerIds) {
//                 const products = [];
//                 for (let i = 1; i <= 10; i++) {
//                     products.push({
//                         dealerId: dealer._id,
//                         name: `Product ${i} by ${dealer.name}`,
//                         title: `Sample Product ${i} Title`,
//                         description: `Description for Product ${i}`,
//                         brand: `Brand ${String.fromCharCode(65 + i)}`, // Brand A, B, C...
//                         price: Math.floor(Math.random() * 1000) + 500, // Random price between 500 and 1500
//                         categoryOfProduct: ["Electronics", "Clothing", "Home", "Accessories"][i % 4],
//                         size: ["Small", "Medium", "Large"],
//                         colors: [
//                             {
//                                 colorName: `Color ${i}`,
//                                 images: [
//                                     `https://example.com/product${i}_image1.jpg`,
//                                     `https://example.com/product${i}_image2.jpg`,
//                                 ],
//                             },
//                         ],
//                         material: ["Plastic", "Metal", "Cotton", "Wood"][i % 4],
//                         discountPercent: Math.floor(Math.random() * 50), // Random discount between 0 and 50%
//                         productType: i % 2 === 0 ? "new" : "refurbished",
//                         stock: Math.floor(Math.random() * 100) + 10, // Random stock between 10 and 110
//                         features: [`Feature ${i}A`, `Feature ${i}B`, `Feature ${i}C`],
//                         offers: {
//                             bankOffers: `Flat ${Math.floor(Math.random() * 15)}% off with Bank ${i}`,
//                             partnersOffers: `Special Offer ${i}`,
//                         },
//                         warrantyDetails: `${Math.floor(Math.random() * 3) + 1} year warranty`,
//                         reviews: [
//                             {
//                                 userId: dealer._id,
//                                 rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
//                                 comment: `Review comment for Product ${i}`,
//                                 sales: Math.floor(Math.random() * 50), // Random sales count
//                                 createdAt: new Date(),
//                             },
//                         ],
//                     });
//                 }
//
//                 // Insert products for the current dealer
//                 await Product.insertMany(products);
//                 console.log(`Added 10 products for dealer: ${dealer.name}`);
//             }
//
//             console.log("Product generation completed.");
//         } catch (error) {
//             console.error("Error generating products:", error);
//         }
//     };
//
//
//     // Execute the function
//     generateProductsForDealers();
// })


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB connected");

        // Function to get random products from the products collection
        async function getRandomProducts(limit) {
            const products = await Product.aggregate([{ $sample: { size: limit } }]);
            return products;
        }

        // Function to update user activity with random products
        async function updateUserActivity(userId) {
            try {
                // Get random products (change limit as needed)
                const randomProducts = await getRandomProducts(5); // 5 random products

                // Map the product IDs to be used in searched, viewed, and purchased arrays
                const searchedProducts = randomProducts.map(product => ({
                    productId: product._id,
                    searchTimestamp: new Date(),
                }));

                const viewedProducts = randomProducts.map(product => ({
                    productId: product._id,
                    viewTimestamp: new Date(),
                }));

                const purchasedProducts = randomProducts.map(product => product._id);

                // Update the user activity
                const updatedActivity = await UserActivities.updateOne(
                    { userId: new ObjectId(userId) },
                    {
                        $set: {
                            searchedProducts: searchedProducts,
                            viewedProducts: viewedProducts,
                            purchasedProducts: purchasedProducts,
                        },
                    },
                    { upsert: true } // Create a new document if none exists
                );

                console.log("User activity updated:", updatedActivity);
            } catch (error) {
                console.error("Error updating user activity:", error);
            } finally {
                mongoose.connection.close(); // Close the connection after execution
            }
        }

        // Call the function with the specific user ID
        updateUserActivity("678e850933d84d4989a08449");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });