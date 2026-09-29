const path = require("path");

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
        await connectDB();

        console.log("Clearing existing development data...");

        await Transaction.deleteMany({});
        await Booking.deleteMany({});
        await Gig.deleteMany({});
        await User.deleteMany({});

        console.log("Creating users...");

        const passwordHash = await bcrypt.hash(
            "Password123!",
            10
        );

        const client = await User.create({
            name: "Test Client",
            email: "client@hustlehub.test",
            password: passwordHash,
            role: "Client"
        });

        const freelancer1 = await User.create({
            name: "John Freelancer",
            email: "john@hustlehub.test",
            password: passwordHash,
            role: "Freelancer",
            bio: "Web developer specialising in modern websites.",
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
            bio: "Graphic designer specialising in branding.",
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
                    placeId: "development-place-1",
                    latitude: -25.7479,
                    longitude: 28.2293
                }
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
                    placeId: "development-place-2",
                    latitude: -25.7479,
                    longitude: 28.2293
                }
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
                    placeId: "development-place-3",
                    latitude: -26.2041,
                    longitude: 28.0473
                }
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
                    placeId: "development-place-4",
                    latitude: -25.7479,
                    longitude: 28.2293
                }
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
                    placeId: "development-place-5",
                    latitude: -26.2041,
                    longitude: 28.0473
                }
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
                    placeId: "development-place-6",
                    latitude: -25.7479,
                    longitude: 28.2293
                }
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
            freelancerAmount: 2250,
            taxAmount: 450,
            status: "completed"
        });

        await Transaction.create({
            bookingId: activeBooking._id,
            clientId: client._id,
            freelancerId: freelancer2._id,
            amount: 600,
            platformFee: 60,
            freelancerAmount: 540,
            taxAmount: 108,
            status: "pending"
        });

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