var React = require('react-native');
var _ = require('lodash');
var Circle = require('./Circle');

var {
    View,
    StyleSheet
} = React;

var PositionCircles = React.createClass({
    getDefaultProps: function() {
        return {
            position: []
        };
    },
    getCircles: function(position, color) {
        return _.map(_.range(0,8).reverse(), function(v) {
            return (
                <Circle 
                    key={v}
                    filled={_.contains(position, v)}
                    circleColor={color}
                    position={v}
                />
            )
        });
    },
    render: function() {
        return (
            <View style={styles.circles}>
                {this.getCircles(this.props.position, this.props.circleColor)}
            </View>
        );
    }
});

var styles = StyleSheet.create({
    circles: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'nowrap'
    }
})
module.exports = PositionCircles;