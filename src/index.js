import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider,} from '@material-ui/core/styles';
import { Paper, Grid, Button, Switch, Slider, Typography,} from '@material-ui/core';
import { blue } from '@material-ui/core/colors'
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

import './index.css';

function DrumPad(props) {

	const handleClick = (event) => {
		props.onClick(event, props.keyButton);
	}

	return (
		<div className="drum-Pad">
			<Button variant="outlined"
					style={{maxWidth: '50px', maxHeight: '50px', minWidth: '50px', minHeight: '50px'}}
					color="primary"
					onClick={handleClick}
					id={props.keyButton+"-btn"}
					className="drum-pad">
					{props.keyButton}
					<audio src={props.source} id={props.keyButton} className="clip"></audio>
			</Button>
		</div>

	);
}

function Drums(props) {
	return (
		<Grid container direction="column" justify="space-evenly"  spacing={5}>
			<Grid item container direction="row" alignItems="center" spacing={5}>
				<Grid item xs={4}>
					<DrumPad keyButton="Q" onClick={props.onClick} source='https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'></DrumPad>
				</Grid>
				<Grid item xs={4}>
					<DrumPad keyButton="W" onClick={props.onClick} source='https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'></DrumPad>
				</Grid>
				<Grid item xs={4}>
					<DrumPad keyButton="E" onClick={props.onClick} source='https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'></DrumPad>
				</Grid>
			</Grid>
			<Grid item container direction="row"  spacing={5}>
				<Grid item xs={4}>
					<DrumPad keyButton="A" onClick={props.onClick} source='https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'></DrumPad>
				</Grid>
				<Grid item xs={4}>
					<DrumPad keyButton="S" onClick={props.onClick} source='https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'></DrumPad>
				</Grid>
				<Grid item xs={4}>
					<DrumPad keyButton="D" onClick={props.onClick} source='https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'></DrumPad>
				</Grid>
			</Grid>
			<Grid item container direction="row"  spacing={5}>
				<Grid item xs={4}>
					<DrumPad keyButton="Z" onClick={props.onClick} source='https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'></DrumPad>
				</Grid>
				<Grid item xs={4}>
					<DrumPad keyButton="X" onClick={props.onClick} source='https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'></DrumPad>
				</Grid>
				<Grid item xs={4}>
					<DrumPad keyButton="C" onClick={props.onClick} source='https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'></DrumPad>
				</Grid>
			</Grid>
		</Grid>
	)
}

function Controls(props) {
	const [volume , setVolume] = React.useState(props.state.volume);

	const handleChange = (event, newValue) => {
		setVolume(newValue);
	}

	const handleCommit = (event) => {
		props.handleChange({"currentTarget":{id:"volume"}}, volume)
	}


	return (
		<Grid container direction="column" justify="center" alignItems="center" spacing={3} style={{padding:"10px", width:"300px"}}>
			<Grid item container justify="center" direction="column" alignItems="center">
				<Typography>Power</Typography>
				<Switch checked={props.state.power} onChange={props.handleChange} id="power"></Switch>
			</Grid>
			<Grid item container justify="center">
				<Grid item xs={6}>
					<Paper elevation={1} style={{backgroundColor:"#212121"}}>
						<Grid container justify="center" alignItems="center" style={{height:"50px"}}>
							<Grid item>
								<Typography align="center" size={10} id="display">
									{props.state.display}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
			<Grid item container xs={12} justify="center">
				<Grid item>
					<Typography gutterBottom align="center">
						Volume
					</Typography>
				</Grid>
				<Grid item container spacing={2}>
					<Grid item>
						<VolumeDown style={{height:"100%"}} />
					</Grid>
					<Grid item xs>
							<Slider	value={volume} 
								onChange={handleChange}
								onChangeCommitted={handleCommit}
								id="volume"
							/>
					</Grid>
					<Grid item>
						<VolumeUp style={{height:"100%"}} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

class DrumMachine extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			power: true,
			display: "Click any button",
			volume: 100, // range: 0 to 100 
		}
		
		this.darkTheme = createMuiTheme({
  			palette: {
				type: 'dark',
				primary: blue
  			},
		});
		
		this.handleChange = this.handleChange.bind(this);

		
	}
	
	componentDidMount() {
		document.addEventListener("keydown", (event) => {
			if (event.key === "q" || event.key === "Q") {
				document.getElementById("Q-btn").click();
			} else if (event.key === "w" || event.key === "W") {
				document.getElementById("W-btn").click();
			} else if (event.key === "e" || event.key === "E") {
				document.getElementById("E-btn").click();
			} else if (event.key === "a" || event.key === "A") {
				document.getElementById("A-btn").click();
			} else if (event.key === "s" || event.key === "S") {
				document.getElementById("S-btn").click();
			} else if (event.key === "d" || event.key === "D") {
				document.getElementById("D-btn").click();
			} else if (event.key === "z" || event.key === "Z") {
				document.getElementById("Z-btn").click();
			} else if (event.key === "x" || event.key === "X") {
				document.getElementById("X-btn").click();
			} else if (event.key === "c" || event.key === "C") {
				document.getElementById("C-btn").click();
			}
		});
	}

	handleChange(event, value) {
		let currentDisplay = "";
		let audio;
		let volume = this.state.volume;

		let playPromise;

		if(!this.state.power) {
			volume = 0;
		}

		switch(event.currentTarget.id) {
			case "power":
				this.setState({
					power: event.target.checked
				});
				currentDisplay = event.target.checked ? 'Power ON' : 'Power OFF';
				break;
			case "volume":
				this.setState({
					volume: value
				});
				currentDisplay = value;
				break;
			case "Q-btn":
				currentDisplay = "Heater 1";
				audio = document.getElementById(value);
				audio.volume = volume / 100;
				audio.currentTime = 0;
				playPromise = audio.play();
				if (playPromise !== undefined) {
					playPromise.then(_ => {}).catch(err => {console.log(err)});
				}
				break;
			case "W-btn":
				currentDisplay = "Heater 2";
				audio = document.getElementById(value);
				audio.volume = volume / 100;
				audio.currentTime = 0;
				playPromise = audio.play();
				if (playPromise !== undefined) {
					playPromise.then(_ => {}).catch(err => {console.log(err)});
				}
				break;
			case "E-btn":
				currentDisplay = "Heater 3";
				audio = document.getElementById(value);
				audio.volume = volume / 100;
				audio.currentTime = 0;
				playPromise = audio.play();
				if (playPromise !== undefined) {
					playPromise.then(_ => {}).catch(err => {console.log(err)});
				}
				break;
			case "A-btn":
				currentDisplay = "Heater 4";
				audio = document.getElementById(value);
				audio.volume = volume / 100;
				audio.currentTime = 0;
				playPromise = audio.play();
				if (playPromise !== undefined) {
					playPromise.then(_ => {}).catch(err => {console.log(err)});
				}
				break;
			case "S-btn":
				currentDisplay = "Clap";
				audio = document.getElementById(value);
				audio.volume = volume / 100;
				audio.currentTime = 0;
				playPromise = audio.play();
				if (playPromise !== undefined) {
					playPromise.then(_ => {}).catch(err => {console.log(err)});
				}
				break;
			case "D-btn":
				currentDisplay = "Open HH";
				audio = document.getElementById(value);
				audio.volume = volume / 100;
				audio.currentTime = 0;
				playPromise = audio.play();
				if (playPromise !== undefined) {
					playPromise.then(_ => {}).catch(err => {console.log(err)});
				}
				break;
			case "Z-btn":
				currentDisplay = "Kick n' Hat";
				audio = document.getElementById(value);
				audio.volume = volume / 100;
				audio.currentTime = 0;
				playPromise = audio.play();
				if (playPromise !== undefined) {
					playPromise.then(_ => {}).catch(err => {console.log(err)});
				}
				break;
			case "X-btn":
				currentDisplay = "Kick";
				audio = document.getElementById(value);
				audio.volume = volume / 100;
				audio.currentTime = 0;
				playPromise = audio.play();
				if (playPromise !== undefined) {
					playPromise.then(_ => {}).catch(err => {console.log(err)});
				}
				break;
			case "C-btn":
				currentDisplay = "Close HH";
				audio = document.getElementById(value);
				audio.volume = volume / 100;
				audio.currentTime = 0;
				playPromise = audio.play();
				if (playPromise !== undefined) {
					playPromise.then(_ => {}).catch(err => {console.log(err)});
				}
				break;
			default:
			break;
		}

		this.setState({
			display: currentDisplay
		});
	}

    render() {
		return (
			<ThemeProvider theme={this.darkTheme}>
				<Paper elevation={5} className="paper" id="drum-machine">
					<Grid container direction="row" justify="space-between" alignItems="center" id="drums" spacing={5} className="container">
						<Grid item xs={9} sm={9} md={6} >
							<Drums onClick={this.handleChange}/>
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
							<Controls state={this.state} handleChange={this.handleChange}></Controls>
						</Grid>
					</Grid>	
				</Paper>
				<Typography gutterBottom align="center" style={{color:"white", marginTop:"10px"}}>
						By Siddharth Roy
				</Typography>
			</ThemeProvider>
		);
    }
}


ReactDOM.render(<DrumMachine />,document.getElementById("root"));
