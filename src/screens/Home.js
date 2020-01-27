import React from 'react';
import {
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Image,
} from 'react-native';

import {fetchData} from '../utils';
import {styles} from '../styles';

class HomeScreen extends React.Component {
    constructor(props: Props) {
        super(props);
        this.counter = {};
        this.timers = {};
        this.state = {
            data: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        }, () => {
            fetchData('https://hacker-news.firebaseio.com/v0/topstories.json')
                .then(data => {
                    this.setState({
                        data,
                        isLoading: false,
                    });
                })
                .catch(error =>
                    this.setState({
                        isLoading: false,
                        error,
                    }),
                );
        });
    }

    renderHeader = () => {
        return <Image style={styles.img} source={require('../img/reddit.jpg')}/>;
    };

    renderList = () => {
        return (
            <FlatList
                data={this.state.data}
                renderItem={({item, index}) => this.renderItem(item, index)}
                keyExtractor={(item, index) => String(index)}
                ListHeaderComponent={() => this.renderHeader()}
            />
        );
    };

    renderItem = (item) => {
        return (
            <TouchableOpacity
                style={styles.itemWrap}
                onPress={() => this.props.navigation.navigate('Details', {item})}>
                <Text style={styles.title}>
                    {item}
                </Text>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            this.state.isLoading ?
                <ActivityIndicator size="large" color='#ed8240' style={{marginTop: 20}}/> : this.renderList()
        );
    }
}

export default HomeScreen;
