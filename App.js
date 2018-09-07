/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {NavigatorIOS, Platform, StyleSheet, Text, View} from 'react-native';
import SearchPage from './SearchPage'; //Импортирование другого файла (include)


export default class PropertyFinderApp extends Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: SearchPage,
                    title: 'Property Finder',
                }}
                style={{flex: 1}}
            />
        );
    }
}
/*<SearchPage/>//В функции render класса PropertyFinderApp обновляем */
/* initialRoute, чтобы привязать только что созданную страницу SearchPage*/
