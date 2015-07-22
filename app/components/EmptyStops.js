var React = require('react-native');

var {
    View,
    Text,
    StyleSheet
} = React;

var EmptyStops = React.createClass({

    render: function() {
        return (
            <View>
                <Text style={styles.text}>You don't have any stops</Text>
                <Text style={styles.text}>Try searching or finding stops near you</Text>
            </View>
        );
    }

});

var styles = StyleSheet.create({
    text: {
        textAlign: 'center'
    }
})

module.exports = EmptyStops;