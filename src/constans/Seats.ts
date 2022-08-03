import { ZoneEnum } from '../enums/ZoneEnum';
import { ISeat, PriceCategory } from '../stores/MainStore';

/**
 * This method generate X number of setas. The X will be the length of prices array
 * U shoud give Zone, Row and SeatPrices as paramater of this method
 * @param zone Zone
 * @param row row of seat
 * @param prices prices of seats
 * @returns
 */
function generateSeats(zone: ZoneEnum, row: number, prices: PriceCategory[]): ISeat[] {
	return prices.map((price, i) => {
		return {
			isReserved: false,
			priceCategory: price,
			row: row,
			zone: zone,
			seatNumber: i + 1
		};
	});
}

/**
 * Generált ülőhelyek Zónánként
 */
export const SEATS: ISeat[] = [
	//Auditorium
	...generateSeats(ZoneEnum.Auditorium, 1, [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000]),
	...generateSeats(ZoneEnum.Auditorium, 2, [4000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 4000]),
	...generateSeats(ZoneEnum.Auditorium, 3, [4000, 4000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 4000, 4000]),
	...generateSeats(ZoneEnum.Auditorium, 4, [3000, 4000, 4000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 4000, 4000, 3000]),
	...generateSeats(ZoneEnum.Auditorium, 5, [3000, 3000, 3000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 3000, 3000, 3000]),
	...generateSeats(ZoneEnum.Auditorium, 6, [3000, 3000, 3000, 3000, 3000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 3000, 3000, 3000, 3000, 3000]),
	...generateSeats(ZoneEnum.Auditorium, 7, [3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000]),
	...generateSeats(ZoneEnum.Auditorium, 8, [3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000]),
	//MidBalcony
	...generateSeats(ZoneEnum.BalconyMid, 1, [4000, 4000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 4000, 4000]),
	...generateSeats(ZoneEnum.BalconyMid, 2, [2000, 2000, 3000, 3000, 3000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 3000, 3000, 3000, 2000, 2000]),
	//LeftBalcony
	...generateSeats(ZoneEnum.BalconyLeft, 1, [4000, 4000, 4000, 3000]),
	...generateSeats(ZoneEnum.BalconyLeft, 2, [3000, 3000, 3000, 2000]),
	//RightBalcony
	...generateSeats(ZoneEnum.BalconyRight, 1, [4000, 4000, 4000, 3000]),
	...generateSeats(ZoneEnum.BalconyRight, 2, [3000, 3000, 3000, 2000]),
	//BoxLeft1
	...generateSeats(ZoneEnum.BoxLeft1, 1, [3000, 3000, 3000]),
	...generateSeats(ZoneEnum.BoxLeft1, 2, [2000, 2000, 2000]),
	//BoxLeft2
	...generateSeats(ZoneEnum.BoxLeft2, 1, [3000, 3000, 3000]),
	...generateSeats(ZoneEnum.BoxLeft2, 2, [2000, 2000, 2000]),
	//BoxRight1
	...generateSeats(ZoneEnum.BoxRight1, 1, [3000, 3000, 3000]),
	...generateSeats(ZoneEnum.BoxRight1, 2, [2000, 2000, 2000]),
	//BoxRight2
	...generateSeats(ZoneEnum.BoxRight2, 1, [3000, 3000, 3000]),
	...generateSeats(ZoneEnum.BoxRight2, 2, [2000, 2000, 2000])
];
