require("dotenv").config({
    path: require("path").resolve(__dirname, "../../.env")
});

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/database");

const User = require("../models/User");
const Gig = require("../models/Gig");
const Booking = require("../models/Booking");
const Transaction = require("../models/Transaction");

async function seedDatabase() {
    try {
        if (process.env.NODE_ENV === "production" ||
            !/(local|dev|test)/i.test(process.env.MONGO_DB_NAME || "")) {
            throw new Error("Seeding is permitted only for a local, dev, or test database.");
        }
        await connectDB();

        console.log("Clearing existing development data...");

        // Keep Admin accounts.
        // Only Client and Freelancer development data is reset.
        await Transaction.deleteMany({});
        await Booking.deleteMany({});
        await Gig.deleteMany({});

        await User.deleteMany({
            role: { $ne: "Admin" }
        });

        console.log("Creating users...");

        const passwordHash = await bcrypt.hash(
            "Password123!",
            10
        );

        const client = await User.create({
            name: "Test Client",
            email: "client@hustlehub.test",
            password: passwordHash,
            role: "Client",
            provider: "local",
            isActive: true
        });

        const freelancer1 = await User.create({
            name: "John Freelancer",
            email: "john@hustlehub.test",
            password: passwordHash,
            role: "Freelancer",
            provider: "local",
            isActive: true,
            bio: "Web developer specializing in modern websites.",
            skills: [
                "React",
                "JavaScript",
                "Web Development"
            ]
        });

        const freelancer2 = await User.create({
            name: "Sarah Designer",
            email: "sarah@hustlehub.test",
            password: passwordHash,
            role: "Freelancer",
            provider: "local",
            isActive: true,
            bio: "Graphic designer specializing in branding.",
            skills: [
                "Graphic Design",
                "Logo Design",
                "Branding"
            ]
        });

        console.log("Creating gigs...");

        const gigs = await Gig.create([
            {
                freelancerId: freelancer1._id,

                title: "Build a React Website",

                description:
                    "I will build a responsive React website for your business.",

                category: "Web Development",

                price: 2500,

                deliveryDays: 7,

                location: {
                    address: "Pretoria, South Africa",
                },

                isActive: true,
                status: "active",
                views: 125,
                averageRating: 4.8,
                reviewCount: 12,
                imageUrl: ""
            },

            {
                freelancerId: freelancer1._id,

                title: "Fix JavaScript Bugs",

                description:
                    "I will troubleshoot and fix JavaScript and React issues.",

                category: "Programming",

                price: 800,

                deliveryDays: 3,

                location: {
                    address: "Pretoria, South Africa",
                },

                isActive: true,
                status: "active",
                views: 87,
                averageRating: 4.6,
                reviewCount: 8,
                imageUrl: ""
            },

            {
                freelancerId: freelancer1._id,

                title: "Create a Business Landing Page",

                description:
                    "Professional responsive landing page for your business.",

                category: "Web Development",

                price: 1200,

                deliveryDays: 4,

                location: {
                    address: "Johannesburg, South Africa",
                },

                isActive: true,
                status: "active",
                views: 64,
                averageRating: 4.5,
                reviewCount: 6,
                imageUrl: ""
            },

            {
                freelancerId: freelancer2._id,

                title: "Design a Business Logo",

                description:
                    "Professional logo design for businesses and startups.",

                category: "Graphic Design",

                price: 600,

                deliveryDays: 3,

                location: {
                    address: "Pretoria, South Africa",
                },

                isActive: true,
                status: "active",
                views: 103,
                averageRating: 4.9,
                reviewCount: 15,
                imageUrl: ""
            },

            {
                freelancerId: freelancer2._id,

                title: "Create a Brand Identity",

                description:
                    "Complete visual identity including colours and typography.",

                category: "Branding",

                price: 1800,

                deliveryDays: 7,

                location: {
                    address: "Johannesburg, South Africa",
                },

                isActive: true,
                status: "active",
                views: 91,
                averageRating: 4.7,
                reviewCount: 10,
                imageUrl: ""
            },

            {
                freelancerId: freelancer2._id,

                title: "Social Media Graphics",

                description:
                    "Professional graphics for your social media campaigns.",

                category: "Graphic Design",

                price: 900,

                deliveryDays: 5,

                location: {
                    address: "Pretoria, South Africa",
                },

                isActive: true,
                status: "active",
                views: 72,
                averageRating: 4.4,
                reviewCount: 7,
                imageUrl: ""
            }
        ]);

        console.log("Creating bookings...");

        const completedBooking = await Booking.create({
            gigId: gigs[0]._id,

            clientId: client._id,

            freelancerId: freelancer1._id,

            location: gigs[0].location,

            status: "completed",

            agreedPrice: 2500,

            bookingDate: new Date("2026-09-15"),

            completedAt: new Date("2026-09-22")
        });

        const activeBooking = await Booking.create({
            gigId: gigs[3]._id,

            clientId: client._id,

            freelancerId: freelancer2._id,

            location: gigs[3].location,

            status: "in_progress",

            agreedPrice: 600,

            bookingDate: new Date("2026-09-28")
        });

        const pendingBooking = await Booking.create({
            gigId: gigs[4]._id,

            clientId: client._id,

            freelancerId: freelancer2._id,

            location: gigs[4].location,

            status: "pending",

            agreedPrice: 1800,

            bookingDate: new Date("2026-10-10")
        });

        console.log("Creating transactions...");

        await Transaction.create({
            bookingId: completedBooking._id,

            clientId: client._id,

            freelancerId: freelancer1._id,

            amount: 2500,

            platformFee: 250,

            freelancerAmount: 1912.5,

            taxAmount: 337.5,

            status: "completed",

            payoutDate: new Date("2026-09-23"),

            invoiceNumber: "INV-2026-0001"
        });

        await Transaction.create({
            bookingId: activeBooking._id,

            clientId: client._id,

            freelancerId: freelancer2._id,

            amount: 600,

            platformFee: 60,

            freelancerAmount: 459,

            taxAmount: 81,

            status: "pending",

            payoutDate: null,

            invoiceNumber: "INV-2026-0002"
        });

        await Transaction.create({
            bookingId: pendingBooking._id,
            clientId: client._id,
            freelancerId: freelancer2._id,
            amount: 1800,
            platformFee: 180,
            taxAmount: 243,
            freelancerAmount: 1377,
            status: "pending",
            invoiceNumber: "INV-2026-0003"
        });

        console.log("Checking Admin account...");

        const adminExists = await User.findOne({
            role: "Admin"
        });

        if (!adminExists) {
            await User.create({
                name: "System Administrator",

                email: "admin@hustlehub.test",

                password: passwordHash,

                role: "Admin",

                provider: "local",

                isActive: true
            });

            console.log("Admin account created.");
        } else {
            console.log("Existing Admin account preserved.");
        }

        console.log("");
        console.log("Database seeded successfully.");
        console.log("");
        console.log("Test accounts:");
        console.log("------------------------------");

        console.log("Client:");
        console.log("Email: client@hustlehub.test");
        console.log("Password: Password123!");
        console.log("");

        console.log("Freelancer:");
        console.log("Email: john@hustlehub.test");
        console.log("Password: Password123!");
        console.log("");

        console.log("Freelancer:");
        console.log("Email: sarah@hustlehub.test");
        console.log("Password: Password123!");
        console.log("");

        console.log("Admin:");
        console.log("Email: admin@hustlehub.test");
        console.log("Password: Password123!");
        console.log("------------------------------");

    } catch (error) {
        console.error("Database seeding failed:");
        console.error(error);

        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
}

seedDatabase();
