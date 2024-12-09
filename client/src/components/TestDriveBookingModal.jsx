import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import Calendar from 'react-calendar';

const TestDriveBookingModal = ({ open, onClose, onBook }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleBook = () => {
        if (selectedDate) {
            onBook(selectedDate);
            onClose();
        } else {
            alert('Please select a date and time!');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className='font-bold text-3xl'> <Typography variant="h4">Book a Test Drive</Typography></DialogTitle>
            <DialogContent>
                <div className="calendar-container">
                    <h3 className="mb-4 text-lg font-semibold">Select a Date</h3>
                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        minDate={new Date()} // Disable past dates
                    />
                    {selectedDate && (
                        <p className="mt-4 text-sm text-gray-600">
                            Selected Date: {selectedDate.toDateString()}
                        </p>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleBook} color="primary" variant="contained">
                    Confirm Booking
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TestDriveBookingModal