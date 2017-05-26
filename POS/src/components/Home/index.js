import React from 'react';

import { View, Text } from 'react-native'
import { Picker, Button, Item as Qty, Input, Label, Form } from 'native-base'
const Item = Picker.Item;

import { connect } from 'react-redux'

import { fetchProduct } from '../../actions';

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selected: 'key0',
      qty: '',
      cart: []
    }
  }

  onValueChange (value) {
    this.setState({
        selected: value,
    });
  }

  onButtonPushed(value) {
    if(this.state.selected !== 'key0'){
      var tmp = this.state.cart
      tmp.push(value)
      this.setState({
        cart: tmp
      })

      console.log("SELECTED PRODUCT : ", value.product);
      console.log("WITH QUANTITY OF : ", value.quantity);
      console.log("TOTAL PRODUCT IN CART NOW : ", this.state.cart.length);
      console.log("WHATS IN CART NOW : ", this.state.cart);
    } else {
      console.log("YOU HAVEN'T SELECT ANYTHING YET!");
    }
  }

  componentWillMount() {
    this.props.fetchProduct()
  }

  render() {
    const { products } = this.props
    return (
      <View>
         <Picker
               mode="dropdown"
               selectedValue={this.state.selected}
               onValueChange={this.onValueChange.bind(this)}>
                 <Item label="Select Product" value="key0" />
               { products.map(product => (
                 <Item label={product.name} value={product} key={product._id}/> //value diganti jadi product._id ??
                 ))
               }
          </Picker>



          <Form>
            <Qty floatingLabel>
              <Label>Quantity</Label>
              <Input onChangeText={(qty) => this.setState({qty})} />
            </Qty>
          </Form>

          <Button onPress={ () => this.onButtonPushed({quantity:+(this.state.qty), product:this.state.selected})}>
            <Text>ADD</Text>
          </Button>
      </View>
    )
  }

}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: () => dispatch(fetchProduct()),
})


export default connect(mapStateToProps,mapDispatchToProps)(Home);
