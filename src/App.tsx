import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainStore from './stores/MainStore';
import { Provider } from 'mobx-react';
import HomePage from './pages/HomePage';

interface IStore {
	MainStore: MainStore;
}

interface IProps {}

class App extends React.Component<IProps> {
	private stores: IStore = null;

	constructor(props: IProps) {
		super(props);

		this.stores = {
			MainStore: new MainStore()
		};
	}

	render() {
		return (
			<Provider {...this.stores}>
				<HomePage />
			</Provider>
		);
	}
}

export default App;
