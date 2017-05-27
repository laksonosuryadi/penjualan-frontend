import React from 'react';

import { View, Text, DrawerLayoutAndroid, Image } from 'react-native'
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

  addToCart(value) {
    if(this.state.selected !== 'key0' && value.quantity !== '' && value.quantity !== 0 && value.quantity !== null){
      const regex = new RegExp('^(?=.*[0-9])')
      if(regex.test(value.quantity)){
        var tmp = this.state.cart
        tmp.push(value)
        this.setState({
          cart: tmp,
          warning: ''
        })
        Toast.show({
          type: 'warning',
          duration: 4500,
          text: `Product ${value.product.name}, Quantity of ${value.quantity}, Added to Cart!`,
          position: 'bottom',
          buttonText: 'OK'
        })
      } else {
        Toast.show({
          type: 'danger',
          duration: 4500,
          text: `Please input number only for Quantity`,
          position: 'bottom',
          buttonText: 'OK'
        })
      }

      var tmpCheckout = this.state.checkout
      tmpCheckout.push({quantity:value.quantity, product: value.product._id})
      this.setState({
        checkout: tmpCheckout,
      })

      console.log("SELECTED PRODUCT : ", value.product);
      console.log("WITH QUANTITY OF : ", value.quantity);
      console.log("TOTAL PRODUCT IN CART NOW : ", this.state.cart.length);
      console.log("WHATS IN CART NOW : ", this.state.cart);
    } else {
      console.log("YOU HAVEN'T SELECT ANYTHING YET!");

      Toast.show({
        type: 'danger',
        duration: 3500,
        text: `Please input all fields`,
        position: 'bottom',
        buttonText: 'OK'
      })
    }
  }

  checkout(value) {
    if(value.length !== 0) {
      this.props.postTransaction(value)
      Toast.show({
        type: 'success',
        duration: 3500,
        text: `Successfully Post a New Transaction!`,
        position: 'bottom',
        buttonText: 'OK'
      })
      this.setState({
        selected: 'key0',
        cart: [],
        checkout: [],
      })
    } else {
      Toast.show({
        type: 'danger',
        duration: 3500,
        text: `You haven't add anything to Cart yet`,
        position: 'bottom',
        buttonText: 'OK'
      })
    }

  }

  componentWillMount() {
    this.props.fetchProduct()
  }

  render() {
    var navigationView = (
     <View style={{flex: 1, backgroundColor: '#fff'}}>
       <View style={{
           height: 140,
           backgroundColor: '#fff',
           alignItems: 'center'}}>
         <Image
           style={{
             marginTop:20,
             width: 100,
             height: 100,
             alignItems: 'center',
             resizeMode: 'contain'
            }}
           source={{uri: 'http://www.freeiconspng.com/uploads/point-of-sale-icon-9.png'}}
         />
       </View>
       <Button full
          style={{backgroundColor:'orange'}}
          onPress={()=> Toast.show({
               text: 'See Transaction Button Pushed!',
               position: 'bottom',
               buttonText: 'Okay'
             })}>
          <Text>See Transactions</Text>
        </Button>
     </View>
   );
    const { products } = this.props
    return (
      <DrawerLayoutAndroid
        ref={c => this.drawer = c}
        drawerWidth={200}
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
                      style={{marginTop:10, borderRadius:100, width: 60, height: 60, backgroundColor:'orange'}}>
                 <Icon name='md-cart' />
              </Button>

              <Button onPress={() => this.checkout(this.state.checkout)}
                      style={{marginTop:10, borderRadius:100, width: 60, height: 60, backgroundColor:'green'}}>
                <Icon name='md-send' />
              </Button>
          </View>

          { this.state.cart.length !== 0 &&
            <View style={{marginTop:20, alignSelf:'center', borderWidth:1, borderRadius:20, padding: 20}}>
                <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold', marginBottom:10}}>
                  CART ({this.state.cart.length})
                </Text>
                { this.state.cart.map((cartContent,idx) => (
                  <View style={{flexDirection:'row'}} key={idx}>
                    <Text>{idx+1}.) </Text>
                    <Text>Product: {cartContent.product.name},  </Text>
                    <Text>Quantity: {cartContent.quantity},  </Text>
                    <Text>Price: Rp {cartContent.product.price},-</Text>
                  </View>
                ))}
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
  postTransaction: (arrOfObject) => dispatch(postTransaction(arrOfObject))
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);
