import { inject, observer } from 'mobx-react';
import React from 'react';
import MainStore from '../stores/MainStore';
import './Home.css';

interface IProps {
	MainStore?: MainStore;
}
class HomePage extends React.Component<IProps> {
	render() {
		const { MainStore } = this.props;

		return (
			<div className="homePage">
				<div className="header">
					<div className="headerContent">
						<div className="inputContainer">
							<label className="title">Hány szék legyen foglalt?</label>
							<input className="inputField" value={MainStore.numberOfReservedSeats} onChange={(e) => MainStore.onChangeSetting(e)} type="number" id="reservedSeatsNumber" name="tentacles" />
						</div>

						<div className="inputContainer">
							<label className="title">Hány fő számára keresel szomszédos helyeket? (2-8)</label>
							<input
								className="inputField"
								value={MainStore.userWantToReservate}
								onChange={(e) => MainStore.onChange(e)}
								type="number"
								id="numOfReservations"
								name="tentacles"
								min="2"
								max="8"
							/>
							<button className="searchBtn" onClick={() => MainStore.search()}>
								Helyek keresése
							</button>
						</div>
					</div>

					{MainStore.results?.length !== 0 && <h2 className="title">EREDMÉNY</h2>}

					{MainStore.results?.length === 0 && <div className="title">Nincs a feltételeknek megfelelő találat</div>}

					<ul className="title">
						{MainStore.results?.map((item) => {
							return (
								<li>
									{item.seats[0]?.zone} zóna - {item.seats[0]?.row} sor -{' '}
									<b>
										{item.seats
											?.map((seat) => {
												return seat.seatNumber;
											})
											.reverse()
											.join(', ')}
									</b>{' '}
									ülőhelyek - {item.price} HUF
								</li>
							);
						})}
					</ul>
				</div>

				<div className="content">
					<img className="theaterImg" src={process.env.PUBLIC_URL + `/assets/PNG/theatre_v4.jpg`} alt="theater" />
				</div>
			</div>
		);
	}
}

export default inject('MainStore')(observer(HomePage));
