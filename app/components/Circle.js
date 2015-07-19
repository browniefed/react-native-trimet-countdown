var React = require('react-native');
var {
    View,
    StyleSheet,
    Text
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
            <View style={[styles.circle, this.getFill()]}>
                <Text style={{color: this.props.filled ? '#FFF' : '#DDD'}}>{(this.props.position + 1)}</Text>
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