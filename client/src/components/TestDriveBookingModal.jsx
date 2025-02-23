import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import axios from 'axios';
import { useAuth } from '../Context/Auth';
import toast from 'react-hot-toast';

const TestDriveBookingModal = ({ open, onClose, carId }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [auth] = useAuth();

    const formatDateToYYYYMMDD = (date) => {
        return date.toISOString().split('T')[0];  // Returns YYYY-MM-DD
    };

    const handleBook = async () => {
        if (!selectedDate) {
            toast.error('Please select a date for your test drive');
            return;
        }

        if (!auth?.user?._id) {
            toast.error('Please login to book a test drive');
            return;
        }

        setIsLoading(true);
        try {

            const formattedDate = formatDateToYYYYMMDD(selectedDate);
            console.log(formattedDate)


            const { data } = await axios.post('/testDrive/book-test-drive', {
                date: formattedDate,
                userId: auth?.user?._id,
                carId: carId
            });

            if (data?.booking) {
                toast.success('Test drive booked successfully!');

                onClose();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to book test drive. Please try again.';
            toast.error(errorMessage);
            console.error('Test drive booking error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                className: 'p-4'
            }}
        >
            <DialogTitle>
                <Typography variant="h4" className="font-bold">
                    Book a Test Drive
                </Typography>
            </DialogTitle>

            <DialogContent>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Select Your Preferred Date</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Choose a date for your test drive. Appointments are available starting tomorrow.
                        </p>
                    </div>

                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        minDate={tomorrow}
                        className="mx-auto"
                    />

                    {selectedDate && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                                Selected Date: {new Date(selectedDate).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>

            <DialogActions className="p-4">
                <Button
                    onClick={onClose}
                    color="secondary"
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleBook}
                    color="primary"
                    variant="contained"
                    disabled={isLoading || !selectedDate}
                >
                    {isLoading ? 'Booking...' : 'Confirm Booking'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TestDriveBookingModal;