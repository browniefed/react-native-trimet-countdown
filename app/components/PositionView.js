var React = require('react-native');

var {
    View,
    Text
} = React;

var PositionView = React.createClass({
    getDefaultProps: function() {
        return {
            name: '',
            id: '',
            position: 0
        };
    },
    render: function() {
        return (
            <View />
        );
    }

});

module.exports = PositionView;