import React from 'react';

import { View, Text, ScrollView, Alert } from 'react-native';
import { Container, Header, Left, Right, Body, Title, Content, Footer, Icon, Picker, Button, Item as Qty, Input, Label, Form, Spinner } from 'native-base'

import { connect } from 'react-redux'

import { fetchTransaction, deleteTransaction } from '../../actions';

class AllTransactions extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      A: 0,
      B: 0,
      C: 0,
      D: 0
    }
  }

  componentWillMount() {
    this.props.fetchTransaction()
  }

  deleteTrx(id){
    Alert.alert(
      'Info',
      'Are you sure want to delete this Transaction ?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
        {text: 'OK', onPress: () => this.props.deleteTransaction(id)},
      ]
    )
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor:'red'}}>
        <Left>
          <Button transparent
            onPress={ ()=> this.props.navigation.goBack()}
            style={{
            backgroundColor: 'red',
          }}>
            <Icon name="md-arrow-back" color="white" size={22}/>
          </Button>
        </Left>
          <Body style={{alignItems:'flex-end'}}>
              <Title>All Transactions</Title>
          </Body>
        </Header>
        <ScrollView>
          { this.props.transactions.length == 0 ? <Spinner color='red' /> : this.props.transactions.map((transaction, idx) => (
            <View key={idx} style={{marginBottom:0, padding:20, borderWidth:1}}>
              <Text>Transaction No.: {idx+1}</Text>
              <Text style={{marginBottom:10}}>Created At: {transaction.date}-{transaction.month}-{transaction.year}</Text>
                <View key={idx} style={{flexDirection:'row'}}>
                  <View style={{padding:7, borderWidth:1, width: 40}}><Text style={{alignSelf:'center'}}>No.</Text></View>
                  <View style={{padding:7, borderWidth:1, width: 75}}><Text style={{alignSelf:'center'}}>Product</Text></View>
                  <View style={{padding:7, borderWidth:1, width: 40}}><Text style={{alignSelf:'center'}}>Qty</Text></View>
                  <View style={{padding:7, borderWidth:1, width: 80}}><Text style={{alignSelf:'center'}}>Price</Text></View>
                  <View style={{padding:7, borderWidth:1, width: 80}}><Text style={{alignSelf:'center'}}>Subtotal</Text></View>
                </View>
                {transaction.product_list.map((product, idx) => (
                  <View key={idx} style={{flexDirection:'row'}}>
                    <View style={{padding:7, borderWidth:1, width: 40}}><Text style={{alignSelf:'center'}}>{idx+1}</Text></View>
                    <View style={{padding:7, borderWidth:1, width: 75}}><Text>{product.product.name}</Text></View>
                    <View style={{padding:7, borderWidth:1, width: 40}}><Text>{product.quantity}</Text></View>
                    <View style={{padding:7, borderWidth:1, width: 80}}><Text>{product.product.price}</Text></View>
                    <View style={{padding:7, borderWidth:1, width: 80}}><Text>{product.product.price * product.quantity}</Text></View>
                  </View>
                ))}
              <Text style={{alignSelf:'flex-end', fontSize:18, fontWeight:'bold'}}>Total: Rp {transaction.total},-</Text>
              <Button onPress={() => this.deleteTrx(transaction._id)} style={{height:30}}>
                <Text style={{color:'white'}}>DELETE</Text>
              </Button>
            </View>
          ))}
        </ScrollView>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions
})

const mapDispatchToProps = dispatch => ({
  fetchTransaction: () => dispatch(fetchTransaction()),
  deleteTransaction: (id) => dispatch(deleteTransaction(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(AllTransactions);
