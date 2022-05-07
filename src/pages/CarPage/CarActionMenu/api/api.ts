export const deleteCar = (carId: number): Promise<number> => {
	console.log("delete car", carId);
	return Promise.resolve(1);
};

export const complainCar = (carId: number): Promise<number> => {
	console.log("complain car", carId);
	return Promise.resolve(1);
};
