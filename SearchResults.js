import React, {Component} from 'react';
import {Text, title, TouchableHighlight, View} from "react-native";
import * as ListViev from "react-native";
import * as rowData from "react-native";



class SearchResults extends Component {
    constructor(props) {
        super(props);
        var dataSourse = new ListViev.DataSource(
            {rowHasChanged: (r1, r2) => r1.guid});
        this.state = {
            dataSourse: dataSourse.cloneWithRows(this.props.listings)
        };
    }

    renderRow(rowData, sessionID, rowID) {
        return (
            <TouchableHighlight
                underlayColor='#dddddd'>
                <View>
                    <Text> {rowData.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListViev
                dataSource={this.state.dataSourse}
                renderRow={this.renderRow.bind(this)}/>
        );
    }
}