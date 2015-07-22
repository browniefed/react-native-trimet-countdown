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
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (r1, r2) => r1 !== r2
        });

        return {
          dataSource: ds.cloneWithRowsAndSections(this.props.stops),
          value: '',
          results: {}
        };
    },
    componentWillMount: function() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.stops)
        });
    },
    handleChangeText: function(text) {
        this.setState({
            value: text
        });
    },
    handleSearch: function() {
        if ((this.state.value || '').length > 1) {

            this.setState({
                loading: true
            });

            Api.search(this.state.value).then(_.bind(function(json) {
                this.setState({
                    results: json,
                    loading: false
                });
            }, this)).catch(_.bind(function(err) {
                this.setState({
                    loading: false
                })
            }, this));
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
                <ScrollView style={styles.lower}>
                    {
                        _.map(this.state.results, function(result) {
                            return (
                                <View>
                                    <Text style={styles.title}>{result.desc}</Text>
                                        <View style={styles.results}>
                                            {
                                                _.map(result.routes, function(route) {
                                                    return (
                                                        <RouteButton 
                                                            onPress={this.addStopAndRoute}
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
                        onSubmitEditing={this.handleSearch}
                        value={this.state.value}
                        placeholder="Search by Stop ID or Name"
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
        paddingTop: 50
    },
    addRoute: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
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