var React = require('react-native');
var {
    View,
    StyleSheet,
    Text
} = React;

var Circle = React.createClass({
    getDefaultProps: function() {
        return {
            filled: false,
            position: 0
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
    getPosition: function() {
        var _position = this.props.position + 1;
        if (_position == 1) {
            return '*';
        }
        return _position;
    },
    render: function() {
        return (
            <View style={[styles.circle, this.getFill()]}>
                <Text style={{color: this.props.filled ? '#FFF' : '#DDD'}}>{(this.getPosition())}</Text>
            </View>
        );
    }

});

var styles = StyleSheet.create({
    circle: {
        borderRadius: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

module.exports = Circle;