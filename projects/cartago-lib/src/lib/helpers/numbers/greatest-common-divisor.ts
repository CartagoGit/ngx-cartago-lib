/**
 * !! Deprecado
 * ? Pasandole un array de números devuelve el máximo común divisor de dichos números
 * @param {number[]} arrayNums
 * @returns {(number | null)} Devuelve null si el array esta vacio
 * @deprecated
 */
export const getGreatestCommonDivisior_depr = (
	arrayNums: number[]
): number | null => {
	if (arrayNums.length === 0) return null;
	else if (arrayNums.length === 1) return arrayNums[0];

	const greatestCommonDivisiorTwoNumbers = (
		num1: number,
		num2: number
	): number => {
		num1 = Math.abs(num1);
		num2 = Math.abs(num2);
		while (num1 !== num2) {
			if (num1 > num2) num1 -= num2;
			else num2 -= num1;
		}
		return num1;
	};

	let rest = greatestCommonDivisiorTwoNumbers(arrayNums[0], arrayNums[1]);
	for (let num of arrayNums)
		rest = greatestCommonDivisiorTwoNumbers(rest, num);

	return rest;
};

/**
 * ? Pasandole un array de números devuelve el máximo común divisor de dichos números
 * @param {number[]} arrayNums
 * @returns {(number | null)} Devuelve null si el array esta vacio
 */
export const getGreatestCommonDivisior = (
	arrayNums: number[]
): number | null => {
	if (arrayNums.length === 0) return null;
	else if (arrayNums.length === 1) return arrayNums[0];
	const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);
	return arrayNums.reduce(gcd);
};
