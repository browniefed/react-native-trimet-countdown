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
            position: -1
        };
    },
    getCircles: function(position) {
        return _.map(_.range(0,8).reverse(), function(v) {
            return (
                <Circle filled={v == position} />
            )
        });
    },
    render: function() {
        return (
            <View style={styles.circles}>
                {this.getCircles(this.props.position)}
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