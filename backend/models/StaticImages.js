const mongoose = require('mongoose');

const staticImagesSchema = mongoose.Schema({
    heroSection: {
        left: {
            type: String,
            default: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&q=80"
        },
        right: {
            type: String,
            default: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80"
        }
    },
    brands: {
        type: [String],
        index: true
    },
    deals: {
        type: [String],
        default: [
            'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80'
        ],
        index: true
    },
    instagram: {
        type: [String],
        default: [
            "https://images.unsplash.com/photo-1520975661595-6453be3f7070",
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b"
        ],
        index: true 
    }
});


module.exports = mongoose.model("StaticImages", staticImagesSchema);