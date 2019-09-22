import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addToCartRequest } from '../../store/modules/cart/actions';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import {
  Container,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddButton,
  ProductAmount,
  ProductAmountText,
  AddButtonText,
} from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);

  const quantity = useSelector(state =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;
      return amount;
    }, {})
  );

  useEffect(() => {
    async function getProducts() {
      const { data } = await api.get('/products');

      const dataProducts = data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(dataProducts);
    }
    getProducts();
  }, []);

  const dispatch = useDispatch();

  function handleAddProduct(productId) {
    dispatch(addToCartRequest(productId));
  }

  function renderProduct({ item }) {
    return (
      <Product key={item.id}>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{formatPrice(item.price)}</ProductPrice>
        <AddButton onPress={() => handleAddProduct(item.id)}>
          <ProductAmount>
            <Icon name="add-shopping-cart" color="#fff" size={20} />
            <ProductAmountText>{quantity[item.id] || 0}</ProductAmountText>
          </ProductAmount>
          <AddButtonText>ADICIONAR</AddButtonText>
        </AddButton>
      </Product>
    );
  }

  return (
    <Container>
      <FlatList
        horizontal
        data={products}
        extraData={quantity}
        keyExtractor={item => String(item.id)}
        renderItem={renderProduct}
      />
    </Container>
  );
}
