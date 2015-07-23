var React = require('react-native');
var _ = require('lodash');
var RouteButton = require('./RouteButton');

var {
    View,
    ScrollView,
    Text,
    StyleSheet
} = React;

var SearchResults = React.createClass({
    getDefaultProps: function() {
        return {
            addStopRoute: function() {},
            results: []
        };
    },
    render: function() {
        return (
            <ScrollView style={styles.container}>
                {
                    _.map(this.props.results, function(result) {
                        return (
                            <View>
                                <Text style={styles.title}>{result.desc}</Text>
                                    <View style={styles.results}>
                                        {
                                            _.map(result.routes, function(route) {
                                                return (
                                                    <RouteButton 
                                                        onPress={this.props.addStopAndRoute}
                                                        locid={result.locid}
                                                        route={route}
                                                    />
                                                )
                                            }, this)
                                        }
                                    </View>
                            </View>
                        );
                    }, this)
                }
            </ScrollView>
        );
    }

});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    results: {
        flexDirection: 'column',
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})


module.exports = SearchResults;