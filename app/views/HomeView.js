var React = require('react-native');
var PositionView = require('./../components/PositionView');

var {
    View,
    Text,
    ScrollView
} = React;

var HomeView = React.createClass({
    getDefaultProps: function() {
        return {
            stops: []
        };
    },
    render: function() {
        return (
            <View>
                <ScrollView>
                    {this.props.stops.map((stop)=>(<PositionView {...stop} />))}
                </ScrollView>
            </View>
        );
    }

});

module.exports = HomeView;