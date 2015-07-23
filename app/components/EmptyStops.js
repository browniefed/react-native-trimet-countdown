var React = require('react-native');

var {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} = React;

var EmptyStops = React.createClass({
    getDefaultProps: function() {
        return {
            onViewPress: function() {}
        };
    },
    render: function() {
        return (
            <TouchableOpacity onPress={this.props.onViewPress} activeOpacity={.8}>
                <View>
                    <Image style={styles.image} source={require('image!busblade')} />
                    <Text style={[styles.text, styles.titleText]}>You don't have any stops!</Text>
                    <Text style={[styles.text, styles.bottomText]}>Try searching or finding stops near you.</Text>
                </View>
            </TouchableOpacity>
        );
    }

});

var styles = StyleSheet.create({
    image: {
        height: 225,
        width: 100,
        alignSelf: 'center'
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333'
    },
    bottomText: {
        width: 200,
        alignSelf: 'center',
        color: '#AAA'
    },
    text: {
        textAlign: 'center'
    }
})

module.exports = EmptyStops;