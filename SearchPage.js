/***
 * Создаем страницу поиска
 * @type {Config|*|{panHandlers, getInteractionHandle}|{type, property}|any}
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

var styles = StyleSheet.create({ // StyleSheet - таблицы стилей
    desription: {
        marginBottom:20,//отступ выравнивание снизу
        fontSize: 18,
        textAlign: 'center',//выравнивание текста
        color: '#656565'
    },
    container: {
        padding: 30,//отступы
        marginTop: 65,//верхняя часть
        alignItems: 'center'//выраснивание элементов
    }
});
class SearchPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.desription}>
                    Seach for houses to buy!
                </Text>
                <Text style={styles.desription}>
                    Seach by plase-name, postcode or seach near your location.
                </Text>
            </View>
        );
    }
}
module.exports = SearchPage;