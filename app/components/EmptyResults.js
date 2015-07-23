var React = require('react-native');

var {
    View,
    Text,
    StyleSheet
} = React;

var EmptyResults = React.createClass({

    render: function() {
        return (
            <View>
                <Text style={styles.text}>Your search turned up no results.</Text>
            </View>
        );
    }

});

var styles = StyleSheet.create({
    text: {
        fontSize: 15,
        color: '#333',
        textAlign: 'center'
    }
})

module.exports = EmptyResults;