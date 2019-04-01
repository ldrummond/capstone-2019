import React, { Component, Children } from 'react';
import Transition from 'react-transition-group/Transition'
import { mergeObjects } from '../components/helperFunctions';

// // https://swizec.com/blog/fade-in-lazy-loaded-images-react-css-quick-guide/swizec/8163
// // Great FadeIn Component
export class FadeWrapper extends Component {
	constructor(props) {
		super(props);

		this.state = { loaded: false, };

		this.defaultStyle = {
			transition: `opacity ${this.props.duration}ms ease-in-out`,
			opacity: 0,
			height: 0,
		}

		this.transitionStyles = {
			entering: { opacity: 0, height: 0, pointerEvents: "none" },
			entered: { opacity: 1, height: "auto", pointerEvents: "all" },
		};

		this.onLoad = this.onLoad.bind(this);
	}

	onLoad() { this.setState({ loaded: true }); };

	render() {
		const { height, children, duration, key } = this.props,
			{ loaded } = this.state;

		return (
			<Transition key={key} in={loaded} timeout={duration}>
				{state => children(this.onLoad, { ...this.defaultStyle, ...this.transitionStyles[state] })}
			</Transition>
		);
	}
}

export class SimpleFade extends Component {
	constructor(props) {
		super(props);

		this.defaultStyle = {
			transition: `opacity ${this.props.duration}ms ease-in-out`,
			opacity: 0,
		}

		this.transitionStyles = {
			entering: { opacity: 0, pointerEvents: "none" },
			entered: { opacity: 1, pointerEvents: "all" },
			exiting: { opacity: 1, pointerEvents: "all" },
			exited: { opacity: 0, pointerEvents: "none" },
		};
	}

	render() {
		const { children, duration = 333, shouldRender } = this.props;
		return (
			<Transition in={shouldRender} timeout={duration}>
				{state =>
					<span className={this.props.className} style={{ ...this.defaultStyle, ...this.transitionStyles[state] }}>
						{this.props.children}
					</span>
				}
			</Transition>
		);
	}
}