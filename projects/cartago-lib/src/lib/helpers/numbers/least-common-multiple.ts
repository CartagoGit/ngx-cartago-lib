import { getGreatestCommonDivisior } from './greatest-common-divisor';

/**
 * ? Pasandole un array de números devuelve el mínimo común multiplo de dichos números
 * @param {number[]} arrayNums
 * @returns {(number | null)} Devuelve null si el array esta vacio
 */
export const getLeastCommonMultiple = (arrayNums: number[]): number | null => {
	if (arrayNums.length === 0) return null;
	else if (arrayNums.length === 1) return arrayNums[0];
	const lcm = (a: number, b: number) =>
		(a * b) / getGreatestCommonDivisior([a, b])!;
	return arrayNums.reduce(lcm);
};
