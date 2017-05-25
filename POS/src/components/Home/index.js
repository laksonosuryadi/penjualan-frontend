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
      selected: 'A',
      qty: '',
      cart: []
    }
  }

  onValueChange (value: string) {
    this.setState({
        selected: value,
    });
  }

  onButtonPushed(value) {
    var tmp = this.state.cart
    tmp.push(value)
    this.setState({
      cart: tmp
    })
    console.log(value.quantity);
    console.log(value.product);
    console.log(this.state.cart);
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
               { products.map(product => (
                 <Item label={product.name} value={product.name} key={product._id}/>
                 ))
               }
          </Picker>
          <Text>Selected: {this.state.selected}</Text>
          <Text>Cart Length: {this.state.cart.length}</Text>

          { this.state.cart.map( (isi,idx) => (
            <View key={idx} style={{flexDirection:'row'}}>
              <Text>Quantity: {isi.quantity},</Text>
              <Text>Product: {isi.product}</Text>
            </View>
          ))}

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
