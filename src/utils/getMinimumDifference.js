const getMinimumDifference = (arr = []) => {
	var lowestDiff = Infinity;
	arr.sort((a, b) => a - b);
	for (var i = 0; i < arr.length - 1; i++) {
		lowestDiff = Math.min(lowestDiff, Math.abs(arr[i] - arr[i + 1]));
	}
	return lowestDiff;
};

export default getMinimumDifference;
