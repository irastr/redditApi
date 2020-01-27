import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemWrap: {
        borderColor: 'transparent',
        borderWidth: 2,
        marginVertical: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    subtext: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        padding: 10
    },
    img: {
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
    }
});
