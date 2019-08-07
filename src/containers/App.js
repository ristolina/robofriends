import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll';
import './App.css'


const state = {
	robots: [],
	searchfield: ''
}
class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		console.log("Cehkc")
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => {
				return response.json();
			})
			.then(users => {
				this.setState({robots: users})
			});
	}
	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value})
	}
	render() {
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
		})

		if(this.state.robots.length === 0) {
			return (
				<div className='tc'>
	        <h1 className='f1'>RoboFriends</h1>
	        <SearchBox searchChange={this.onSearchChange}/>
						<h1>Loading...</h1>
				</div>
			)
		}
		else {
			return (
				<div className='tc'>
	        <h1 className='f1'>RoboFriends</h1>
	        <SearchBox searchChange={this.onSearchChange}/>
						<Scroll>
							<CardList robots={filteredRobots} />
						</Scroll>
				</div>
				);
		}

	}
}

export default App;
