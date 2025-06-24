const TestDriveBooking = require("../models/TestDriveModel");

const createTestDrive = async (req, res) => {
    const { date, user_id, car_id } = req.body;

    if (!date || !user_id || !car_id) {
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
            user_id,
            car_id
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

const UpdateTestDriveStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['approved', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const updatedBooking = await TestDriveBooking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({
                error: 'Test drive booking not found'
            });
        }

        res.status(200).json({
            message: 'Test drive status updated successfully',
            booking: updatedBooking
        });
    } catch (error) {
        console.error('Error updating test drive status:', error);
        res.status(500).json({
            error: 'Failed to update status. Please try again.'
        });
    }
}

const getUserTestDrives = async (req, res) => {
    const { user_id } = req.params;
    try {
        const testDrives = await TestDriveBooking.find({ user_id }).populate('car_id');
        res.status(200).json(testDrives);
        console.log(testDrives)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching test drives.' });
    }
}
module.exports = { createTestDrive, getAllTestDrive, UpdateTestDriveStatus, getUserTestDrives };