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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        width: 20,
        height: 20,
        margin: 2
    }
});

module.exports = Circle;