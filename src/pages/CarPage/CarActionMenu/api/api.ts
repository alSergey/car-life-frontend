export const deleteCar = (carId: number): Promise<number> => {
	console.log("delete car", carId);
	return Promise.resolve(1);
};
