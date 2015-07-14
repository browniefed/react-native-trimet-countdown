var React = require('react-native');
var _ = require('lodash');
var Circle = require('./Circle');

var {
    View
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
            <View>
                {this.getCircles(this.props.position)}
            </View>
        );
    }

});

module.exports = PositionCircles;