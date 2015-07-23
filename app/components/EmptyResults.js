var React = require('react-native');

var {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} = React;

var EmptyResults = React.createClass({
    getDefaultProps: function() {
        return {
            onViewPress: function() {}
        };
    },
    render: function() {
        return (
            <TouchableOpacity onPress={this.props.onViewPress} activeOpacity={.8}>
                <View style={styles.container}>
                    <Image style={styles.image} src={require('image!search_grey')} />
                    <Text style={styles.text}>Your search turned up no results.</Text>
                </View>
            </TouchableOpacity>            
        );
    }

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -64,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 64,
        width: 64,
        opacity: .5
    },
    text: {
        fontSize: 15,
        color: '#333',
        textAlign: 'center'
    }
})

module.exports = EmptyResults;