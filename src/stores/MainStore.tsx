import { makeAutoObservable, toJS } from 'mobx';
import { ZoneEnum, ZonePreference, ZoneSeatPreference } from '../enums/ZoneEnum';
import { SEATS } from '../constans/Seats';

export type PriceCategory = 2000 | 3000 | 4000 | 5000;

export interface ISeat {
	zone: ZoneEnum;
	row: number;
	seatNumber: number;
	isReserved: boolean;
	priceCategory: PriceCategory;
}

interface IResultSeats extends ISeat {
	score: number;
}

export interface IResult {
	allScore: number;
	price: number;
	seats: IResultSeats[];
}

class MainStore {
	/**
	 * number of reservation by User
	 */
	userWantToReservate: number = 8;

	seats: ISeat[] = [];

	/**
	 * number of reserved seats - User can modifie this value on the UI
	 */
	numberOfReservedSeats: number = 50;

	/**
	 * The search result - neighboring seats with Score and Price
	 */
	results: IResult[] = [];

	constructor() {
		makeAutoObservable(this, {});

		this.initSeats();
	}

	/**
	 * Generate seats and X number of them marked as reserved
	 * The user can set the number of reserved seats on the UI - basic value is 50
	 * The number of reserved seats have to be minimum 20% of all seats
	 */
	initSeats() {
		this.seats = [...SEATS];

		//this array will be used to put random seatindexes where each should be different
		let reservedSeatIndexes = [];

		while (reservedSeatIndexes.length < this.numberOfReservedSeats) {
			let seatIndex = Math.floor(Math.random() * this.getNumberOfSeats);
			// if the generated index is not in the reservedSeatIndexes array then put it in otherwise do nothing
			if (reservedSeatIndexes.indexOf(seatIndex) === -1) reservedSeatIndexes.push(seatIndex);
		}

		// marke seats as reserved if theri indexes is in reservedSeatIndexes array
		reservedSeatIndexes.forEach((seatIndex) => {
			this.seats[seatIndex].isReserved = true;
		});

		console.log('seats', toJS(this.seats));
	}

	/**
	 * return the length of seats array
	 */
	get getNumberOfSeats() {
		return this.seats.length;
	}

	/**
	 * set the property userWantToReservate by input target value
	 * @param e
	 */
	onChange(e: any) {
		if (e.target.value) {
			this.userWantToReservate = +e.target.value;
		} else {
			this.userWantToReservate = null;
		}
	}

	/**
	 * set property numberOfReservedSeats by input target value
	 * @param e
	 */
	onChangeSetting(e: any) {
		if (e.target.value) {
			this.numberOfReservedSeats = +e.target.value;
			this.initSeats();
		} else {
			this.numberOfReservedSeats = null;
		}
	}

	/**
	 * validations of settings
	 * @returns
	 */
	doValidations() {
		if (!this.userWantToReservate) {
			alert('"Hány fő számára keresel szomszédos helyeket?" mező kitöltése kötelező');
			return;
		}

		if (!this.numberOfReservedSeats) {
			alert('"Hány szék legyen foglalt?" mező kitöltése kötelező');
			return;
		}

		if (this.userWantToReservate < 2 || this.userWantToReservate > 8) {
			alert('"Hány fő számára keresel szomszédos helyeket?" mezőben megadott számnak 2 és 8 között kell lennie');
			return;
		}

		if (this.numberOfReservedSeats < this.getMinimumNumberOfReservedSeats) {
			alert(`A "Hány szék legyen foglalt?" mezőben megadott szám értéke kevesebb, mint a minimum foglaltsági érték (összes hely 20%-a: ${this.getMinimumNumberOfReservedSeats})`);
			return;
		}

		if (this.numberOfReservedSeats > this.seats.length) {
			alert('A  "Hány szék legyen foglalt?" mezőben megadott szám értéke nagyobb, mint az összes ülőhely darabszáma');
			return;
		}

		if (this.seats.length - this.numberOfReservedSeats < this.userWantToReservate) {
			alert('Nincs elég szabad hely a foglaláshoz');
			return;
		}
	}

	/**
	 * Firstly there are plenty of validation taht has to be passed
	 *
	 */
	search() {
		this.doValidations();
		//seats that are neighboring [[{seat1}, {seat2}], [{seat2, seat3}]...]
		let availableSeats: ISeat[][] = [];

		//we have to itearte through the free seats
		let notReservedSeats = this.seats.filter((seat) => !seat.isReserved);

		//first cycle we go from 0 to the length of not reserved seats
		for (let seatIndex = 0; seatIndex < notReservedSeats.length; seatIndex++) {
			//we will increase count if we find zones and rows that are equal and first seat number is neighboring with the second seat number
			//firstly it will be one, because the first place is free and zone and row is a match
			let count = 1;

			//collect necessary data  - zone/row/seatNumber
			let firstItemZone = notReservedSeats[seatIndex].zone;
			let firstItemRow = notReservedSeats[seatIndex].row;
			let firstSeatNumber = notReservedSeats[seatIndex].seatNumber;

			//at the second cycle we go from seatIndex from the first cycle + 1 to  the length of not reserved seats
			// +1 is necessary because we don not want to compare the same seat with itself
			for (let secondSeatIndex = seatIndex + 1; secondSeatIndex < notReservedSeats.length; secondSeatIndex++) {
				//collect necessary data  - zone/row/seatNumber
				let secondItemZone = notReservedSeats[secondSeatIndex].zone;
				let secondItemRow = notReservedSeats[secondSeatIndex].row;
				let secondSeatNumber = notReservedSeats[secondSeatIndex].seatNumber;

				//we check if first seat row and second seat row is equal AND
				// first seat zone and second seat zone is equal AND
				// first seat number + 1 and second seat number is equal --> seatNumber 1, seatNumber 2, seatNumebr 3 =>  1+1 = 2, 2+1 = 3
				if (firstItemRow === secondItemRow && firstItemZone === secondItemZone && firstSeatNumber + count === secondSeatNumber) {
					count++;
				} else {
					//if not a match then have to skip and check the next seats
					continue;
				}

				//if our counter is equal to the number of User reservation then BINGO
				if (count === this.userWantToReservate) {
					//set count to zero
					count = 0;

					//create a result array where will go a group of seats like: [seat1, seat2..]
					let result = [];

					// we are now at the and of good solutions like if a good solution is 3,4,5 then we will be the index of 5
					// we have to iterate back X times to have all the seats. X will be the number of reservation by User
					// 5, 5 > 2, 5--
					// 5, 4, 3
					for (let resultSeatIndex = secondSeatIndex; resultSeatIndex > secondSeatIndex - this.userWantToReservate; resultSeatIndex--) {
						result.push(notReservedSeats[resultSeatIndex]);
					}

					availableSeats.push(result);
				}
			}
		}

		console.log(
			'availableSeats',
			toJS(
				availableSeats.map((item) => {
					return item.map((item2) => {
						return {
							zone: item2.zone,
							row: item2.row,
							seatNumber: item2.seatNumber
						};
					});
				})
			)
		);

		//score all result
		let scoredData = availableSeats.map((seats) => {
			let res: IResultSeats[] = seats.map((seat) => {
				return {
					...seat,
					score: this.addScore(seat)
				};
			});

			return {
				seats: res,
				allScore: res.reduce((previous, current) => {
					return previous + current.score;
				}, 0),
				price: res.reduce((previous, current) => {
					return previous + current.priceCategory;
				}, 0)
			};
		});

		console.log('scoredData', toJS(scoredData));

		//find the best score from off group of seats
		const bestScore = Math.max(...scoredData.map((item) => item.allScore));

		//filter group of seats that has the best score
		this.results = scoredData.filter((item) => item.allScore === bestScore);

		console.log('result', toJS(this.results));
	}

	/**
	 * Calculate point by the following:
	 * price category - can be 2, 3, 4 ,5 because setas has prices like 2000, 3000, 4000, 5000
	 * zone preference - can be 1, 2, 3, 4 bigger value is better
	 * row preference - tehere are 8 rows in the auditorium and 2 rows in the other places so calculation will be number of rows that has the zone MINUS seat.row
	 * row preference point can be: 8-1 = 7, 8-2 = 6 ... 2-1 = 1
	 * @param seat
	 * @returns
	 */
	addScore(seat: ISeat) {
		let score = 0;
		score += seat.priceCategory / 1000;
		//add score to zone
		score += ZonePreference[seat.zone];

		//add score to row index
		score += ZoneSeatPreference[seat.zone] - seat.row;

		//TODO: ami jobban középen van az több pont

		return score;
	}

	/**
	 * get number of reserved seats
	 */
	get getMinimumNumberOfReservedSeats() {
		return Math.round((this.getNumberOfSeats / 100) * 20);
	}
}
export default MainStore;
