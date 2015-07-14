'use strict';

var React = require('react-native');

var Application = require('./app/Application');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = React;

var react_bus = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Application />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('react_bus', () => react_bus);
