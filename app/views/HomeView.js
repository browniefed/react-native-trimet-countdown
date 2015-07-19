var React = require('react-native');
var PositionCard = require('./../components/PositionCard');
var AddRoute = require('./../components/AddRoute');
var StopsList = require('./../components/StopsList');
var RouteButton = require('./../components/RouteButton');

var Api = require('../Api');
var _ = require('lodash');
var StopMap = require('../StopMap');

var {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ListView,
    LayoutAnimation,
    TouchableOpacity,
    ActivityIndicatorIOS
} = React;

var HomeView = React.createClass({
    getDefaultProps: function() {
        return {
            stops: {},
            onAdd: function() {}
        };
    },
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
          dataSource: ds.cloneWithRows(this.props.stops),
          value: '',
          results: {}
        };
    },
    componentWillMount: function() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.stops)
        });
    },
    handleChangeText: function(text) {
        this.setState({
            value: text
        });

        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        if ((text || '').length > 1) {
            this.setState({
                loading: true
            })
            Api.search(text).then(_.bind(function(json) {
                this.setState({
                    results: json,
                    loading: false
                });
            }, this)).catch(function(err) {

            })
        } 
        
        if ((text || '').length === 0) {
            this.refs.add_route.blur();
        }
        
    },
    addStopAndRoute: function(stopId, routeId) {
        this.props.onAdd(stopId, routeId);
        this.setState({
            results: {},
            value: ''
        });
        this.refs.add_route.blur();

    },
    getLowerView: function() {

        if (this.state.loading) {
            return (
                    <View style={[styles.lower, styles.center]}>
                        <ActivityIndicatorIOS 
                            animating={true} 
                            size="large"
                        />
                    </View>
            );
        }

        if (!_.isEmpty(this.state.results) && this.state.value) {
            return (
                <View style={[styles.lower]} key="results">
                    <Text style={styles.title}>{this.state.results.desc}</Text>
                    <ScrollView>
                        <View style={styles.results}>
                            {
                                _.map(this.state.results.routes, function(route) {
                                    return (
                                        <RouteButton 
                                            onPress={this.addStopAndRoute}
                                            locid={this.state.results.locid}
                                            route={route}
                                        />
                                    )
                                }, this)
                            }
                        </View>
                    </ScrollView>
                </View>
            )

        }

        return (
                <View style={styles.lower} key="active_stops">
                    <StopsList 
                        dataSource={this.state.dataSource}
                    />
                </View>
        );
    },
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.addRoute}>
                    <AddRoute 
                        ref="add_route"
                        onAdd={this.props.onAdd}
                        onChangeText={this.handleChangeText}
                        value={this.state.value}
                        placeholder="Search by Stop ID"
                        returnKeyType="search"
                    />
                </View>
                {this.getLowerView()}
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        padding: 20,
        paddingTop: 50
    },
    addRoute: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    results: {
        flexDirection: 'column',
        flex: 1
    },
    stops: {
        flex: 1
    },
    lower: {
        flex: 15,
        flexDirection: 'column'
    },
    center: {
        alignItems: 'center'
    }
})

module.exports = HomeView;