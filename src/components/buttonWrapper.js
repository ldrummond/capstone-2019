import React, {Component} from 'react';
import classnames from 'classnames'; 

export default class ButtonWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {hovering: false}
  }
  
  render() {
    return (
      <button 
        className={
          classnames(
            'button-wrapper', 
            'unbuttoned', 
            this.props.className, 
            {hovering: this.props.hovering || this.state.hovering}
          )
        }
        onClick={this.props.onClick}  
      >
        <div className='active-area' 
          onMouseEnter={_ => this.setState({hovering: true})} 
          onMouseLeave={_ => this.setState({hovering: false})}
        ></div>
        {this.props.children}
      </button>
    );
  }
}
