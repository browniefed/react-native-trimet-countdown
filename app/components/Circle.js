var React = require('react-native');
var {
    View,
    StyleSheet
} = React;

var Circle = React.createClass({
    getDefaultProps: function() {
        return {
            filled: false
        };
    },
    getFill: function() {
        var style = {
            backgroundColor: 'transparent'
        }
        if (this.props.filled) {
            style.backgroundColor = this.props.circleColor;
        }
        return style;
    },
    render: function() {
        return (
            <View style={[styles.circle, this.getFill()]} />
        );
    }

});

var styles = StyleSheet.create({
    circle: {
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#f9f9f9',
        width: 30,
        height: 30,
        margin: 2
    }
});

module.exports = Circle;