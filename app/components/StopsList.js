var React = require('react-native');
var PositionCard = require('./PositionCard');

var {
    View,
    ListView
} = React;

var StopsList = React.createClass({

    renderRow(rowData, sectionID, rowID) {
        return (
            <PositionCard
                {...rowData}
            />
        )
    },
    render: function() {
        return (
            <ListView 
                dataSource={this.props.dataSource}
                style={[this.props.style, {height: 100}]}
                renderRow={this.renderRow}
            />
        );
    }

});

module.exports = StopsList;