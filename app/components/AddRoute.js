var React = require('react-native');
var _ = require('lodash');
var {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image
} = React;

var AddRoute = React.createClass({
    getDefaultProps: function() {
        return {
            onChangeText: function() {}
        };
    },
    componentDidMount: function() {
        this.refs.input.setNativeProps({tintColor: '#FFF'});
    },
    blur: function() {
        this.refs.input.blur();
    },
    focus: function() {
        this.refs.input.focus();
    },
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.inputWrap}>
                    <TouchableOpacity onPress={this.focus}>
                        <View style={styles.searchImageButton}>
                            <Image style={styles.searchImage} src={require('image!search')} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.inputAbsolute}>
                        <TextInput 
                            ref="input"
                            clearButtonMode="always"
                            style={styles.input}
                            placeholderTextColor="#FFF"
                            {..._.omit(this.props, 'ref')}
                        />
                    </View>
                    <TouchableOpacity>
                        <View style={styles.nearbyStopsButton}>
                            <Image style={styles.compassImage} src={require('image!compass')} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    nearbyStopsButton: {
        position: 'absolute',
        right: 10,
        top: 0,
        padding: 5,
        width: 29,
        height: 29,
        borderWidth: 1,
        borderColor: '#3288aa',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchImageButton: {
        width: 24,
        height: 24,
        position: 'absolute',
        left: 10,
        top: 5,
    },
    compassImage: {
        width: 24,
        height: 24,
    },
    searchImage: {
        width: 24,
        height: 24,
    },
    inputWrap: {
        flex: 1
    },
    inputAbsolute: {
        position: 'absolute',
        top: 5,
        left: 34,
        right: 39,
    },
    input: {
        padding: 5,
        height: 30,
        color: '#FFF'
    }
})

module.exports = AddRoute;