import { Alert } from 'react-native';
import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import NavigationService from '../../../services/navigation';

import api from '../../../services/api';
import { formatPrice } from '../../../utils/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCartRequest({ productId }) {
  const productExists = yield select(state =>
    state.cart.find(product => product.id === productId)
  );

  const {
    data: { amount: stockAmount },
  } = yield call(api.get, `/stock/${productId}`);

  const currentAmount = productExists ? productExists.amount : 0;
  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    Alert.alert('Quantidade solicitada fora de estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(productId, amount));
  } else {
    const response = yield call(api.get, `/products/${productId}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));

    NavigationService.navigate('Cart');
  }
}

function* updateAmountRequest({ productId, amount }) {
  if (amount <= 0) return;

  const {
    data: { amount: stockAmount },
  } = yield call(api.get, `/stock/${productId}`);

  if (amount > stockAmount) {
    Alert.alert('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(productId, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCartRequest),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmountRequest),
]);
