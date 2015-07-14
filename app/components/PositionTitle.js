var React = require('react-native');
var {
    View,
    Text
} = React;

var PositionTitle = React.createClass({

    render: function() {
        return (
            <View>
                <Text>{this.props.id}</Text>
                <Text>{this.props.name}</Text>
            </View>
        );
    }

});

module.exports = PositionTitle;