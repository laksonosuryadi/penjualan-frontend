import React from 'react';

import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Right, Body, Title, Content, Footer, Icon, Picker, Button, Item as Qty, Input, Label, Form, Spinner } from 'native-base'

import DateTimePicker from 'react-native-modal-datetime-picker';

import { connect } from 'react-redux'

import { fetchTransactionByDate, deleteTransaction } from '../../actions';

class TransactionsByDate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      totalIncome: 0,
      date: 0,
      month: 0,
      year: 0,
      isDatePickerVisible: false
    }
  }

  _showDatePicker = (index) => {
    this.setState({ isDatePickerVisible: true })
  }

  _hideDatePicker = (index) => {
    this.setState({ isDatePickerVisible: false });
  }

  _handleDatePicked = (date) => {
    var stringified = date.toDateString().split(' ')
    var newDate = +(stringified[2])
    var newMonth = 0
    var newYear = +(stringified[3])

    if(stringified[1]=='Jan'){newMonth = 1}
    else if (stringified[1]=='Feb') {newMonth = 2}
    else if (stringified[1]=='Mar') {newMonth = 3}
    else if (stringified[1]=='Apr') {newMonth = 4}
    else if (stringified[1]=='May') {newMonth = 5}
    else if (stringified[1]=='Jun') {newMonth = 6}
    else if (stringified[1]=='Jul') {newMonth = 7}
    else if (stringified[1]=='Aug') {newMonth = 8}
    else if (stringified[1]=='Sep') {newMonth = 9}
    else if (stringified[1]=='Oct') {newMonth = 10}
    else if (stringified[1]=='Nov') {newMonth = 11}
    else if (stringified[1]=='Dec') {newMonth = 12}
    console.log(stringified)
    this.setState({
      date: newDate,
      month: newMonth,
      year: newYear
    })
    console.log(this.state.date)
    console.log(this.state.month)
    console.log(this.state.year)
    this._hideDatePicker()

    this.props.fetchTransactionByDate(this.state.date, this.state.month, this.state.year)
  };

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

  componentWillReceiveProps(nextProps) {
    var totalA = 0;
    var totalB = 0;
    var totalC = 0;
    var totalD = 0;
    var totalIncome = 0;
    nextProps.transactions.forEach(transaction => {
      totalIncome += transaction.total
      transaction.product_list.forEach(product => {
        if(product.product.category === 'food') {
          if(product.product.name == 'A') {
            totalA += product.quantity
          } else {
            totalB += product.quantity
          }
        } else if(product.product.category === 'drink'){
          if(product.product.name == 'C') {
            totalC += product.quantity
          } else {
            totalD += product.quantity
          }
        }
      })
    })

    this.setState({
      A: totalA,
      B: totalB,
      C: totalC,
      D: totalD,
      totalIncome: totalIncome
    })
  }

  componentWillMount() {
    console.log("this.state.date on componentWillMount : ", this.state.date);
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor:'green'}}>
        <Left>
          <Button transparent
            onPress={ ()=> this.props.navigation.goBack()}
            style={{
            backgroundColor: 'green',
          }}>
            <Icon name="md-arrow-back" color="white" size={22}/>
          </Button>
        </Left>
          <Body style={{alignItems:'flex-end'}}>
              <Title>Transactions By Date</Title>
          </Body>
        </Header>

        <View style={{alignSelf:'center', marginTop: 20, marginBottom: 20}}>
          <TouchableOpacity>
            <Button style={{borderRadius:100, backgroundColor:'#5E35B1'}} onPress={() => this._showDatePicker()}>
              <Text style={{color:'#fff'}}>Select Date</Text>
            </Button>
          </TouchableOpacity>
          <DateTimePicker
            mode='date'
            isVisible={this.state.isDatePickerVisible}
            onConfirm={(date) => this._handleDatePicked(date)}
            onCancel={() => this._hideDatePicker()}/>
        </View>

        <ScrollView>
          { this.state.date !==0 && this.props.transactions.map((transaction, idx) => (
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
          { this.state.A !== 0 &&
            <View>
          <View style={{backgroundColor:'maroon', alignItems:'center', paddingTop:10, paddingBottom:10}}>
            <Text style={{color:'white'}}>TOTAL PRODUCT SOLD on {this.state.date} / {this.state.month} / {this.state.year}: </Text>
            <Text style={{color:'white'}}>Product A : { this.state.A }</Text>
            <Text style={{color:'white'}}>Product B : { this.state.B }</Text>
            <Text style={{color:'white'}}>Product C : { this.state.C }</Text>
            <Text style={{color:'white'}}>Product D : { this.state.D }</Text>
          </View>
          <View style={{backgroundColor:'maroon', alignItems:'center', paddingTop:10, paddingBottom:10}}>
            <Text style={{color:'white', fontSize:17}}>Total income on this day : Rp {this.state.totalIncome},-</Text>
          </View>
          </View>
          }
        </ScrollView>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions
})

const mapDispatchToProps = dispatch => ({
  fetchTransactionByDate: (date, month, year) => dispatch(fetchTransactionByDate(date, month, year)),
  deleteTransaction: (id) => dispatch(deleteTransaction(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(TransactionsByDate);
