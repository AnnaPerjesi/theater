export enum ZoneEnum {
	Auditorium = 'Auditorium',
	BalconyMid = 'BalconyMid',
	BalconyLeft = 'BalconyLeft',
	BalconyRight = 'BalconyRight',
	BoxLeft1 = 'BoxLeft1',
	BoxLeft2 = 'BoxLeft2',
	BoxRight1 = 'BoxRight1',
	BoxRight2 = 'BoxRight2'
}

export const ZonePreference: Record<ZoneEnum, number> = {
	Auditorium: 4,
	BalconyMid: 3,
	BalconyLeft: 2,
	BalconyRight: 2,
	BoxLeft1: 1,
	BoxLeft2: 1,
	BoxRight1: 1,
	BoxRight2: 1
};

export const ZoneSeatPreference: Record<ZoneEnum, number> = {
	Auditorium: 8,
	BalconyMid: 2,
	BalconyLeft: 2,
	BalconyRight: 2,
	BoxLeft1: 2,
	BoxLeft2: 2,
	BoxRight1: 2,
	BoxRight2: 2
};
