const CarProduct = require("../models/productModel");
const Purchase = require("../models/purchaseModel");

const createPurchase = async (req, res) => {
    try {
        const { cars, user_id } = req.body;
        console.log("User ID:", user_id);
        console.log("Cars to purchase:", cars);

        // Validate input
        if (!Array.isArray(cars) || cars.length === 0) {
            return res.status(400).json({ error: 'No cars specified' });
        }

        // Process each car as a separate purchase
        const purchases = [];

        for (const item of cars) {
            const { carId, quantity } = item;

            // Find the car
            const car = await CarProduct.findById(carId);
            if (!car) {
                return res.status(404).json({ error: `Car with ID ${carId} not found` });
            }

            // Check stock
            if (car.stock < quantity) {
                return res.status(400).json({ error: `Not enough stock available for ${car.title}` });
            }

            // Calculate price
            const totalPrice = car.price * quantity;

            // Create purchase
            const purchase = new Purchase({
                userId: user_id,
                cars: [{ carId: car._id, quantity }], // Match your schema format
                carDetailsSnapshot: {
                    title: car.title,
                    model: car.model,
                    year: car.year,
                    price: car.price,
                    image: car.image,
                },
                quantity: quantity,
                totalPrice: totalPrice
            });

            // Save the purchase
            await purchase.save();
            purchases.push(purchase);

            // Update car stock
            car.stock -= quantity;
            await car.save();
        }

        res.status(201).json({
            success: true,
            message: 'Purchase successful',
            purchases
        });

    } catch (error) {
        console.error('Purchase error:', error);
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};

const getAllPurchase = async (req, res) => {
    try {
        const purchases = await Purchase.find()
            .populate('userId', '-password')
            .populate('cars.carId')
            .sort({ purchasedAt: -1 });

        console.log("Fetched purchases:", purchases.length);

        res.status(200).json({
            success: true,
            count: purchases.length,
            purchases
        });
    } catch (error) {
        console.error('Error fetching purchases:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch purchases',
            error: error.message
        });
    }
}

const updateVisitDate = async (req, res) => {
    const { purchaseId, visitDate } = req.body;

    try {
        const updatedPurchase = await Purchase.findByIdAndUpdate(
            purchaseId,
            { visitDate },
            { new: true }
        );

        if (!updatedPurchase) {
            return res.status(404).send('Purchase not found.');
        }

        res.status(200).json(updatedPurchase);
    } catch (error) {
        console.error('Error updating visit date:', error);
        res.status(500).send('Failed to update visit date.');
    }
}

const getAllPurchaseVisitDate = async (req, res) => {
    const { userId } = req.params;
    console.log("User ID:", userId);

    try {
        // Find all purchases for the given user and populate each car inside the cars array
        const purchases = await Purchase.find({ userId }).populate('cars.carId');
        console.log("Fetched purchases:", purchases);

        if (!purchases || purchases.length === 0) {
            return res.status(404).json({ message: 'No purchases found for this user.' });
        }
        console.log(purchases)

        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error fetching purchase data:', error);
        res.status(500).json({ message: 'Failed to fetch purchase data.' });
    }
};


module.exports = { createPurchase, getAllPurchase, updateVisitDate, getAllPurchaseVisitDate }
