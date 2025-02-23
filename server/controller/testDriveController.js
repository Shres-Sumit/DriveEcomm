const TestDriveBooking = require("../models/TestDriveModel");

const createTestDrive = async (req, res) => {
    const { date, userId, carId } = req.body;

    if (!date || !userId || !carId) {
        return res.status(400).json({
            error: 'Date, User ID, and Car ID are required'
        });
    }

    try {
        const bookingDate = new Date(date);

        if (isNaN(bookingDate.getTime())) {
            return res.status(400).json({
                error: 'Invalid date format'
            });
        }





        const newBooking = new TestDriveBooking({
            date: bookingDate,
            user: userId,
            car: carId
        });

        await newBooking.save();

        res.status(201).json({
            message: 'Test drive booked successfully',
            booking: newBooking
        });
    } catch (error) {
        console.error('Error creating test drive booking:', error);
        res.status(500).json({
            error: 'Failed to create booking. Please try again.'
        });
    }
};

const getAllTestDrive = async (req, res) => {
    try {
        const allDate = await TestDriveBooking.find()
        if (!allDate || !allDate.length === 0) {
            return res.status(400).json({ success: false, message: 'no test Drive' })
        }
        res.status(200).json({ success: true, date: allDate })
    } catch (error) {
        console.error('Error creating test drive booking:', error);
        res.status(500).json({
            error: 'Failed to create booking. Please try again.'
        });
    }
}

module.exports = { createTestDrive, getAllTestDrive };