import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';

const Dashboard = ({ navigation, route }) => {
    const [currentWallpaper, setCurrentWallpaper] = useState('');

    useEffect(() => {
        const currentHour = moment().utcOffset(route?.params ? route?.params?.timeZone : '+5:30').format('HH');
        if (currentHour >= 3 && currentHour < 12) {
            setCurrentWallpaper(require('./images/morningWallpaper.jpeg'));
        } else if (currentHour >= 12 && currentHour < 18) {
            setCurrentWallpaper(require('./images/afternoonWallpaper.jpeg'));
        } else {
            setCurrentWallpaper(require('./images/nightWallpaper.jpeg'));
        }
    }, [route?.params]);

    return (
        <View style={styles.container}>
            <Image source={currentWallpaper} style={styles.imageSize} resizeMode='stretch' />
            <Text style={styles.timeText}>{moment().utcOffset(route?.params ? route?.params?.timeZone : '+5:30').format('hh:mm A')}</Text>
            <View style={styles.countryContainer}>
                <View style={styles.rowCenter}>
                    <Image style={{ width: 30, height: 30 }} resizeMode='contain' source={{ uri: route?.params ? route?.params?.image : 'https://flagcdn.com/w320/in.png' }} />
                    <Text style={styles.countryText}>{route?.params ? route?.params?.countryName : 'India'}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CountryList')} style={styles.selectCountryButton}>
                <Text style={styles.selectCountryText}>{'Select Country'}</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1, height: '100%'
    },
    imageSize: {
        width: '100%', height: '100%', flex: 1
    },
    timeText: {
        position: 'absolute',
        top: 70,
        right: 0,
        paddingRight: 10,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 0.3
    },
    countryContainer: {
        position: 'absolute',
        top: 100,
        right: 0,
        height: 40,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: 'white',
        alignItems: 'baseline',
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    countryText: {
        fontSize: 14,
        color: 'black',
        fontWeight: '600',
        letterSpacing: 0.3,
        paddingLeft: 8,
        textAlign: 'center'
    },
    selectCountryText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 0.3
    },
    selectCountryButton: {
        position: 'absolute',
        bottom: 0,
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    }
});

export default Dashboard;