import React from 'react';
import {fetchData} from '../utils';
import {
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {styles} from '../styles';


class DetailsScreen extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            story: {},
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        }, () => {
            fetchData(`https://hacker-news.firebaseio.com/v0/item/${this.props.navigation.getParam('item')}.json`)
                .then(story => {
                    this.setState({
                        story,
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

    renderBody = () => {
        const {story} = this.state;
        return (
            <>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.subtext}>{story.title}</Text>
                </View>
                <WebView source={{uri: story.url}}/>
            </>
        );
    };

    render() {
        return (
            this.state.isLoading ?
                <ActivityIndicator size="large" color='#ed8240' style={{marginTop: 20}}/> : this.renderBody()
        );
    }
}

export default DetailsScreen;
