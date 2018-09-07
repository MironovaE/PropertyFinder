/***
 * Создаем страницу поиска
 * @type {Config|*|{panHandlers, getInteractionHandle}|{type, property}|any}
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    Image,
    ActivityIndicator
} from 'react-native';


const styles = StyleSheet.create({ // StyleSheet - таблицы стилей
    description: {//описание
        marginBottom:20,//отступ выравнивание снизу
        fontSize: 18,
        textAlign: 'center',//выравнивание текста
        color: '#656565'
    },
    container: {
        padding: 30,//устанавливает расстояние (его также называют "внутренний отступ") между внутренним краем рамки элемента и его содержимым.
        marginTop: 65,//margin-top устанавливает внешний отступ сверху элемента
        alignItems: 'center',//выравнивание элементов

    },
    flowRight: {//поток справа
        flexDirection: 'row',// направление гибкости
        alignItems: 'center',
        alignSelf: 'stretch'//выравнивание себя))
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,// граница радиуса
        marginBottom: 10,
        alignSelf: 'stretch',// растяжение
        justifyContent: 'center' // выровнять контент

    },
    searchInput: {
        height:36,
        marginBottom: 10,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    image: {
        width: 217,
        height: 138
    }
});

function urlForQueryAndPage(key,value,pageNumber) {
    const data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber,
    };
    data[key] = value;

    const querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');
    return 'https://api.nestoria.co.uk/api?' + querystring;
};

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'London',
            isLoading: false,
            message: '',
        };
    }
    onSearchTextChanged(event) {
        console.log('onSearchTextChanged');
        this.setState({searchString: event.nativeEvent.text});
        console.log(this.state.searchString);
    }
     _executeQuery = (query)  => { // если начинается с подчеркивания , значит приватный
         console.log(query);
         this.setState({isLoading: true});
         fetch(query)
             .then(response => response.json())
             .then(json => this._handleResponse(json.response))
             .catch(error =>
             this.setState({
                 isLoading: false,
                 message: 'Something bad happened '+ error
             }));
     };
     _handleResponse = (response) => {
        this.setState({isLoading: false, message: ''});
        if(response.application_response_code.substr(0,1) ==='1') {
            console.log('Properties found: ' + response.listings.length);
        }else {
            this.setState({message: 'Location not recognized; please try again.'});
        }
     };

     onSearchPressed = () => {
        const query = urlForQueryAndPage('place_name', this.state.searchString,1);
        this._executeQuery(query);
     };

    render() {
        console.log('SearchPage.render');
        const spinner = this.state.isLoading ?
            <ActivityIndicator size = 'large' /> : null;

        return (

            <View style={styles.container}>
                <Text style={styles.description}>
                    Search for houses to buy!
                </Text>
                <Text style={styles.description}>
                    Search by place-name, postcode or search near your location.
                </Text>
                <View style={styles.flowRight}>
                    <TextInput
                        style={styles.searchInput}
                        value={this.state.searchString}
                        onChange = {this.onSearchTextChanged.bind(this)}
                        placeholder='Search via name or postcode'/>
                    <TouchableHighlight style={styles.button}
                                        underlayColor='#99d9f4'
                                        onPress = {this.onSearchPressed.bind(this)}>
                        <Text style={styles.buttonText}>Go</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.flowRight}>
                    <TouchableHighlight style={styles.button}
                                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Location</Text>
                    </TouchableHighlight>
                </View>
                <Image source={require('./Resources/house.png')} style={styles.image}/>
                {spinner}
                <Text style = {styles.description}>{this.state.message}</Text>
            </View>
        );
    }
}
//module.exports = SearchPage;
export default SearchPage;