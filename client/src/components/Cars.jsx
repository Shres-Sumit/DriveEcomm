import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCarsList } from '../Context/Auth';

const Cars = () => {
    const [carsList] = useCarsList();
    const [filteredCars, setFilteredCars] = useState([]);
    const [filters, setFilters] = useState({
        price: '',
        condition: '',
        vehicleType: '',
        fuelType: '',
    });

    useEffect(() => {
        console.log("Cars list from context:", carsList);
        setFilteredCars(carsList || []);
    }, [carsList]);


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };


    const handleFilterClick = () => {
        console.log("Filter button clicked");
        console.log("Current filters:", filters);
        console.log("Cars list before filtering:", carsList);

        if (!carsList || carsList.length === 0) {
            console.log("Warning: carsList is empty or undefined");
            return;
        }

        // Make sure price is treated as a number
        const numericPrice = filters.price ? Number(filters.price) : 0;

        const newFilteredCars = carsList.filter((car) => {

            console.log("Checking car:", car);

            const priceMatch = !filters.price || (car.price && car.price <= numericPrice);
            const conditionMatch = !filters.condition || (car.condition === filters.condition);
            const vehicleTypeMatch = !filters.vehicleType || (car.vehicleType === filters.vehicleType);
            const fuelTypeMatch = !filters.fuelType || (car.fuelType === filters.fuelType);

            return priceMatch && conditionMatch && vehicleTypeMatch && fuelTypeMatch;
        });

        console.log("Filtered cars:", newFilteredCars);
        setFilteredCars(newFilteredCars);
    };

    // Reset filters to show all cars
    const handleResetFilters = () => {
        setFilters({
            price: '',
            condition: '',
            vehicleType: '',
            fuelType: '',
        });
        setFilteredCars(carsList || []);
    };

    return (
        <div className="mt-[50px]">
            <h1 className="text-3xl font-semibold">Antique Collection</h1>
            <div className="container flex flex-col md:flex-row mt-8">
                {/* Sidebar for filters */}
                <div className="sidebar w-full md:w-[20%] mb-4 md:mb-0">
                    <h3 className="font-semibold text-lg mb-4">Filters</h3>

                    {/* Price Filter */}
                    <div className="filter-group mb-4">
                        <label className="block">Max Price</label>
                        <input
                            type="number"
                            name="price"
                            value={filters.price}
                            onChange={handleFilterChange}
                            placeholder="Max Price"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Condition Filter */}
                    <div className="filter-group mb-4">
                        <label className="block">Condition</label>
                        <select
                            name="condition"
                            value={filters.condition}
                            onChange={handleFilterChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Condition</option>
                            <option value="New">New</option>
                            <option value="Used">Used</option>
                        </select>
                    </div>

                    {/* Vehicle Type Filter */}
                    <div className="filter-group mb-4">
                        <label className="block">Vehicle Type</label>
                        <select
                            name="vehicleType"
                            value={filters.vehicleType}
                            onChange={handleFilterChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="normal">Normal</option>
                            <option value="luxury">Luxury</option>
                        </select>
                    </div>

                    {/* Fuel Type Filter */}
                    <div className="filter-group mb-4">
                        <label className="block">Fuel Type</label>
                        <select
                            name="fuelType"
                            value={filters.fuelType}
                            onChange={handleFilterChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Fuel Type</option>
                            <option value="Gasoline">Gasoline</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Hydrogen">Hydrogen</option>
                        </select>
                    </div>


                    <div className="flex gap-2">
                        <button
                            onClick={handleFilterClick}
                            className="flex-1 bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
                        >
                            Filter
                        </button>
                        <button
                            onClick={handleResetFilters}
                            className="flex-1 bg-gray-300 text-gray-700 p-2 rounded mt-4 hover:bg-gray-400"
                        >
                            Reset
                        </button>
                    </div>
                </div>


                <div className="w-full md:w-[80%] md:pl-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {!filteredCars || filteredCars.length === 0 ? (
                            <div className="col-span-full text-center py-8">
                                <p className="text-gray-500">No cars available matching your filters</p>
                            </div>
                        ) : (
                            filteredCars.map((car) => (
                                <Link
                                    key={car._id}
                                    className="border rounded-lg p-4 shadow-md cursor-pointer transform transition-all hover:scale-105 hover:bg-gray-100"
                                    to={`/c/${car.slug}`}
                                >
                                    <div className="mb-2">
                                        <img
                                            src={car.image}
                                            alt={`${car.title} ${car.model}`}
                                            className="w-full h-48 object-cover rounded-md"
                                            onError={(e) => {
                                                e.target.src = '/api/placeholder/300/200';
                                                e.target.alt = 'Car image not available';
                                            }}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-bold text-lg">{car.title}</h3>
                                        <p className="font-semibold text-xl text-blue-600">
                                            Rs {car.price}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cars;