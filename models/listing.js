const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default:
                "https://imgs.search.brave.com/XijCjcWR5uclHjvs3Qhnqs7EYAEtJxHPwdg-PqZIlV0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9yb21hbnRpYy10/cm9waWNhbC1iZWFj/aC13aXRoLXZpbGxh/LWFuZC1wYWxtcy1k/dXJpbmctYmVhdXRp/ZnVsLXN1bnNldC1m/cmVlLXBob3RvLmpw/Zz93PTYwMCZxdWFs/aXR5PTgw",
            set: (v) =>
            v === ""
                ? "https://imgs.search.brave.com/XijCjcWR5uclHjvs3Qhnqs7EYAEtJxHPwdg-PqZIlV0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9yb21hbnRpYy10/cm9waWNhbC1iZWFj/aC13aXRoLXZpbGxh/LWFuZC1wYWxtcy1k/dXJpbmctYmVhdXRp/ZnVsLXN1bnNldC1m/cmVlLXBob3RvLmpw/Zz93PTYwMCZxdWFs/aXR5PTgw"
                : v,    
        },
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

