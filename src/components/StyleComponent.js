import { StyleSheet, Dimensions } from 'react-native';


export default StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
        padding: 10,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputField: {
      width:200,
      backgroundColor: '#fff',
      borderColor: 'green',
      borderWidth:1,
      margin: 5,
      paddingLeft: 5,
    },
    buttons: {
      backgroundColor: 'green',
      margin: 1
    },
    cameraButton: {
      backgroundColor: 'lightgray', 
      borderWidth: 2, 
      borderColor: 'green',
      width: 60,
      height: 60,
    },
    imagePreview: {
      width: 300, 
      height: 300, 
      borderWidth: 5, 
      borderColor: 'green',
      backgroundColor: '#fff',
      margin: 10
    },
    imageContainer: {
        width: 100, 
        height: 100, 
        borderWidth: 2, 
        borderColor: 'green',
        backgroundColor: '#fff'
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    listTile: {
      width: '100%', 
      flexDirection: 'row', 
      justifyContent: 'space-around'
    },
    tileTitle: {
        alignItems: 'flex-start', 
        justifyContent:'center', 
        flex: 1, 
        flexDirection:'column'
    },
    tileSubtitle: {
        alignItems: 'flex-start', 
        justifyContent:'center', 
        flex: 1, 
        flexDirection:'column',
        paddingLeft: 10
    },
    map: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

