import React from 'react';

class NumberSpinner extends React.Component {

    constructor(props) {
      super(props);
    }

    customStyle(styles, mods) {
        var newStyles = {};
        for (var key in styles) {
            newStyles[key] = styles[key];
        }
        for (var key in mods) {
            newStyles[key] = mods[key];
        }
        return newStyles;
    }

    render() {
        return <div style={NumberSpinner.styles.container}>
          <input type="text"
                 value={this.props.value}
                 onChange={this.changeFromField.bind(this)}
                 onKeyDown={this.doArrowKeys.bind(this)}
                 style={NumberSpinner.styles.input} />
               <button onClick={this.increment.bind(this)}
         style={this.customStyle(
                 NumberSpinner.styles.spinButtons,
                 {top: 0}) }>^</button>
               <button onClick={this.decrement.bind(this)}
         style={this.customStyle(
                 NumberSpinner.styles.spinButtons,
                 {top: 13}) }>v</button>
        </div>;
    }

    changeFromField(evt) {
        var newValue = parseInt(evt.target.value, 10);
        if (isNaN(newValue)) {
            newValue = '';
        }
        this.props.onChange(newValue);
    }

    increment() {
        this.props.onChange(this.props.value + 1);
    }

    decrement() {
        this.props.onChange(this.props.value <= 0 ? 0 : this.props.value - 1);
    }

    doArrowKeys(evt) {
        if (evt.key === 'ArrowUp' || evt.key === 'ArrowDown') {
            evt.preventDefault();
            if (evt.key === 'ArrowUp') {
                this.increment();
            } else {
                this.decrement();
            }
        }
    }
}

NumberSpinner.propTypes = {
    value: React.PropTypes.number,
    onChange: React.PropTypes.func
};

NumberSpinner.styles = {
    container: {
        display: 'inline-block',
        width: '60%',
        position: 'relative',
        height: '1.8em'
    },
    input: {
        width: '75%',
        position: 'absolute',
        top: 0,
        left: 0,
        lineHeight: '1.8em'
    },
    spinButtons: {
        // resets
        backgroundColor: 'none',
        border: 'none',
        padding: 0,
        // styles for our particular needs
        position: 'absolute',
        right: 0,
        height: 12,
        width: 22
    }

};

export { NumberSpinner };
