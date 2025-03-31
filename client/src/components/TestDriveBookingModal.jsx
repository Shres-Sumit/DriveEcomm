import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import axios from 'axios';
import { useAuth } from '../Context/Auth';
import toast from 'react-hot-toast';
import 'react-calendar/dist/Calendar.css'; // Make sure to import the base styles

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
            console.log(formattedDate);

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

    // Custom tile className to style Saturdays with red text
    const tileClassName = ({ date, view }) => {
        if (view === 'month' && date.getDay() === 6) {
            return 'saturday-text';
        }
        return null;
    };

    // Custom CSS for the calendar
    const calendarStyles = `
        .react-calendar {
            width: 100%;
            max-width: 400px;
            border-radius: 8px;
            border: 1px solid #ddd;
            font-family: Arial, sans-serif;
        }
        
        .react-calendar__tile {
            padding: 10px 6px;
            position: relative;
            text-align: center;
            transition: all 0.2s ease;
        }
        
        .react-calendar__tile:enabled:hover {
            background-color: #e6f7ff;
            border-radius: 4px;
        }
        
        .react-calendar__tile--active {
            background-color: #1976d2 !important;
            color: white !important;
            border-radius: 4px;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            transform: scale(1.05);
        }
        
        .react-calendar__tile--active:enabled:hover {
            background-color: #1565c0 !important;
        }
        
        
        .saturday-text {
            color: #ff4d4f !important;
            font-weight: 500;
        }
        
       
        .saturday-text.react-calendar__tile--active {
            color: white !important;
            background-color: #1976d2 !important;
        }
        
        
        .react-calendar__month-view__days__day--weekend {
            color: inherit;
        }
        
       
        .react-calendar__month-view__days__day--weekend:not(.saturday-text) {
            color: inherit;
        }
        
        .react-calendar__tile--now {
            background-color: #ffeb3b33;
        }
        
        .react-calendar__tile--now.react-calendar__tile--active {
            background-color: #1976d2 !important;
        }
    `;

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
            <style>{calendarStyles}</style>
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
                        tileClassName={tileClassName}
                        firstDayOfWeek={0} // 0 represents Sunday
                    />

                    {selectedDate && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800 font-medium">
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