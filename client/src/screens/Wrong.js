import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StatusBar } from 'react-native';
import { connect } from 'react-redux'
import { set_word } from '../actions'

import { 
	ButtonSmall,
	ButtonBig, 
	InputRounded 
} from '../components/common';

class Correct extends Component {
	constructor(props) {
		super(props);

		this.state= {
			username: ''
		}
	}
	
	next_stage() {
		const { navigate } = this.props.navigation;
		this.props.next_word(this.props.words[this.props.count+1])
		if(this.props.count == 2){
			navigate('GameOverScreen')
		}else {
			navigate('GuessScreen')
		}
	}

	static navigationOptions = {
		header: null,
	}
	render() {
		const { navigate } = this.props.navigation
		
		const { 
			topContainerStyle,
			bottomContainerStyle,
			parentContainerStyle,
			imageStyle,
			midContainerStyle,
			textStyle
		} = styles;

		return(
			<KeyboardAvoidingView behavior="padding" style={parentContainerStyle}>

				<StatusBar 
					hidden={true}
				/>

				<View style={topContainerStyle}>
					<Text style={textStyle}>
						Oops! Not yet, buddy!
					</Text>
				</View>
				
				<View style={midContainerStyle}>
					<Image style={imageStyle} source={require('../assets/images/XMLID_615_.png')} />
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig onPress={() => navigate('GuessScreen')}>
						<Text>AGAIN</Text>
					</ButtonBig>
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig backgroundColor="#f14d38" onPress={() => this.next_stage()}>
						<Text>SKIP</Text>
					</ButtonBig>
				</View>

			</KeyboardAvoidingView>
		)
	}
}

const styles = {
	parentContainerStyle: {
		flexDirection: 'column',
		flex: 1,
		backgroundColor: '#faf7eb'
	},
	topContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 60
	},
	textStyle: {
		fontSize: 28,
		fontWeight: 'bold'
	},
	bottomContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 30
	},
	imageStyle: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	midContainerStyle: {
		marginTop: 60,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
}

const mapStateToProps = (state) => {
	return {
		game: state.wordStore.game,
		count: state.wordStore.count,
		words: state.wordStore.words
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		next_word: (data) => dispatch(set_word(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Correct);