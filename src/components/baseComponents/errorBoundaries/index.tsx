//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppText from '../AppText';

// create a component
class ErrorBoundaries extends Component {
  state = {
    hasError: false,
  };
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      hasError: true,
    });
  }
  render() {
    const {hasError} = this.state;
    if (hasError)
      return (
        <View>
          <AppText
            onPress={() =>
              this.setState({
                hasError: false,
              })
            }>
            errorrrrr
          </AppText>
        </View>
      );
    return this.props.children;
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default ErrorBoundaries;
