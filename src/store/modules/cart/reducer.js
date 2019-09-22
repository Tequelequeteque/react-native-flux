import produce from 'immer';

export default function cart(state = [], { type, product, productId, amount }) {
  switch (type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        draft.push(product);
        return draft;
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        return draft.filter(p => p.id !== productId);
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS':
      return produce(state, draft => {
        const productFound = draft.find(p => p.id === productId);
        if (productFound) productFound.amount = Number(amount);
        return draft;
      });
    default:
      return state;
  }
}
