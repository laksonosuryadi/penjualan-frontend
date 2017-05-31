import React from 'react';

import { View, Text, DrawerLayoutAndroid, Image, Alert } from 'react-native'
import { Container, Header, Left, Right, Body, Title, Content, Footer, Icon, Picker, Button, Item as Qty, Input, Label, Form, Toast } from 'native-base'
const Item = Picker.Item;

import { connect } from 'react-redux'

import { fetchProduct, postTransaction } from '../../actions';

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selected: 'key0',
      qty: '',
      cart: [], //array of object which consist of Quantity and Object Product
      checkout: [], // array of object which consist of Quantity and Product._id, and this will be used on Checkout process
      total: 0
    }
  }

  closeDrawer() {
    this.drawer._root.close()
  };
  openDrawer() {
    this.drawer._root.open()
  };

  onValueChange (value) {
    this.setState({
        selected: value,
    });
  }

  addToCart(objectInCart) {
    if(this.state.selected !== 'key0' && objectInCart.quantity !== '' && objectInCart.quantity !== 0 && objectInCart.quantity !== null){
      const regex = new RegExp('^(?=.*[0-9])')
      if(regex.test(objectInCart.quantity)){
        var tmp = this.state.cart
        var newTotal = this.state.total + (objectInCart.quantity * objectInCart.product.price)

        tmp.push(objectInCart)
        this.setState({
          cart: tmp,
          total: newTotal
        }, () => console.log("TOTAL NOW: ", this.state.total))

        var tmpCheckout = this.state.checkout
        tmpCheckout.push({quantity:objectInCart.quantity, product: objectInCart.product._id})
        this.setState({
          checkout: tmpCheckout,
        })

      } else {
        Alert.alert(
            'Error',
            'Please input number only for Quantity',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )
      }

      console.log("SELECTED PRODUCT : ", objectInCart.product);
      console.log("WITH QUANTITY OF : ", objectInCart.quantity);
      console.log("TOTAL PRODUCT IN CART NOW : ", this.state.cart.length);
      console.log("WHATS IN CART NOW : ", this.state.cart);

    } else {
      console.log("YOU HAVEN'T SELECT ANYTHING YET!");
      Alert.alert(
          'Error',
          'Please input all fields',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        )
    }
  }

  checkout(checkoutCart, total) {
    if(checkoutCart.length !== 0) {
      this.props.postTransaction(checkoutCart, total)
      console.log("TOTAL >>>>> ", total);
      console.log("checkoutCart >>>>> ", checkoutCart);
      Alert.alert(
          'Info',
          'Successfully Post a New Transaction!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        )

      this.setState({
        selected: 'key0',
        cart: [],
        checkout: [],
        total: 0
      })
    } else {
      Alert.alert(
          'Error',
          'You haven\'t add anything to Cart yet!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        )
    }
  }

  deleteItem(idx, cancelTotal) {
    var deleteOneFromCart = this.state.cart
    deleteOneFromCart.splice(idx, 1)
    var deleteOneFromCheckout = this.state.checkout
    deleteOneFromCheckout.splice(idx,1)
    var updateTotal = this.state.total - cancelTotal
    this.setState({
      cart: deleteOneFromCart,
      checkout: deleteOneFromCheckout,
      total: updateTotal
    })
  }

  componentWillMount() {
    this.props.fetchProduct()
  }

  render() {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{height: 140, backgroundColor: '#fff', alignItems: 'center'}}>
          <Image style={{marginTop:20, width: 100, height: 100, alignItems: 'center',resizeMode: 'contain'}}
            source={{uri: 'http://www.freeiconspng.com/uploads/point-of-sale-icon-9.png'}}/>
        </View>
        <Button full
          style={{backgroundColor:'red'}}
          onPress={()=>this.props.navigation.navigate('AllTransactions')}>
          <Text style={{color:'white'}}>Show All Transactions</Text>
        </Button>
        <Button full
          style={{backgroundColor:'orange'}}
          onPress={()=>this.props.navigation.navigate('TodayTransactions')}>
          <Text style={{color:'white'}}>Show Today Transactions</Text>
        </Button>
        <Button full
          style={{backgroundColor:'green'}}
          onPress={()=>this.props.navigation.navigate('TransactionsByDate')}>
          <Text style={{color:'white'}}>Show Transactions By Date</Text>
        </Button>

        <Button full
          style={{backgroundColor:'purple'}}>
          <Text style={{color:'white'}}>Show Monthly Transactions</Text>
        </Button>
        <Button full
          style={{backgroundColor:'blue'}}>
          <Text style={{color:'white'}}>Show Yearly Transactions</Text>
        </Button>
      </View>
    );
    const { products } = this.props
    return (
      <DrawerLayoutAndroid
        ref={c => this.drawer = c}
        drawerWidth={230}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <Container>
          <Header style={{backgroundColor:'maroon'}}>
            <Left>
              <Button transparent
                onPress={ ()=> this.drawer.openDrawer()}
                style={{
                backgroundColor: 'maroon',
              }}>
                <Icon name="menu" color="white" size={22}
                />
              </Button>
            </Left>
            <Body style={{alignItems:'flex-end'}}>
                <Title>My-POS</Title>
            </Body>
          </Header>
          <View style={{width:'80%', alignSelf:'center', marginTop:10, marginBottom:10}}>
              <Picker
                mode="dropdown"
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}>
                 <Item label="Select Product" value="key0" />
                    { products.map(product => (
                          <Item label={product.name} value={product} key={product._id}/>
                        )
                    )}
              </Picker>

              <Form style={{width:'95%'}}>
                <Qty floatingLabel>
                  <Label>Quantity</Label>
                  <Input onChangeText={(qty) => this.setState({qty})} />
                </Qty>
              </Form>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
              <Button onPress={() => this.addToCart({quantity:+(this.state.qty), product:this.state.selected})}
                      style={{marginTop:10, borderRadius:100, width: 130, height: 60, backgroundColor:'orange'}}>
                <Text style={{color:'white'}}>Add To Cart </Text>
                <Icon name='md-cart' />
              </Button>

              <Button onPress={() => this.checkout(this.state.checkout, this.state.total)}
                      style={{marginTop:10, borderRadius:100, width: 130, height: 60, backgroundColor:'green'}}>
                <Icon name='md-send' />
                <Text style={{color:'white'}}> Checkout</Text>
              </Button>
          </View>

          { this.state.cart.length !== 0 &&
            <View style={{marginTop:10, alignSelf:'center', padding: 20}}>
                <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold', marginBottom:10}}>
                  CART ({this.state.cart.length})
                </Text>

                { this.state.cart.map((cartContent,idx) => (
                  <View style={{flexDirection:'row', marginBottom:10, justifyContent:'space-around'}} key={idx}>
                    <Text> {idx+1}.) </Text>
                    <Text> {cartContent.product.name}, </Text>
                    <Text> Qty: {cartContent.quantity}, </Text>
                    <Text> Price: {cartContent.product.price}, </Text>
                    <Text> Subtotal: {cartContent.quantity * cartContent.product.price} </Text>
                    <View
                      style={{borderWidth:1, borderRadius:10, width: 30, height: 23, backgroundColor:'red', marginLeft:10}}>
                      <Icon name='md-trash'
                      onPress={()=>this.deleteItem(idx, (cartContent.quantity * cartContent.product.price))}
                      style={{color:'white', alignSelf:'center', fontSize:18}}/>
                    </View>
                  </View>
                ))}
                <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold', marginTop:10}}>
                  TOTAL : Rp {this.state.total},-
                </Text>
            </View>
          }

        </Container>
      </DrawerLayoutAndroid>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: () => dispatch(fetchProduct()),
  postTransaction: (checkoutCart, total) => dispatch(postTransaction(checkoutCart, total))
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);
