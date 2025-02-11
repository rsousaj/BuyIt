// @ts-nocheck

import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';

import { stockActions } from '../';
import stockReducer from '../reducer';

describe('ProductList Reducers', () => {
  const initialState = {
    isLoading: false,
    stock: [],
    error: undefined,
  };

  test('deve retornar o state para uma action default', () => {
    const action = { type: 'any' };

    const response = stockReducer(initialState, action);

    const expected = {
      ...initialState,
    };

    expect(response).toEqual(expected);
  });

  test('deve retornar o state correto para o setLoading', () => {
    const action = stockActions.setLoading(true);

    const response = stockReducer(initialState, action);

    const expected = {
      ...initialState,
      isLoading: true,
    };

    expect(response).toEqual(expected);
  });

  test('deve retornar o state correto para o setError', () => {
    const mockError = new Error('error');
    const action = stockActions.setError(mockError.message);

    const response = stockReducer(initialState, action);

    const expected = {
      ...initialState,
      error: mockError.message,
    };

    expect(response).toEqual(expected);
  });

  test('deve retornar o state correto para o setProductList', () => {
    const mockData = new ProductItemBuilderMock()
      .withId('123456')
      .withName('Teste')
      .build();

    const mockProductLists = [mockData];

    const action = stockActions.setStock(mockProductLists);

    const response = stockReducer(initialState, action);

    const expected = {
      ...initialState,
      stock: mockProductLists,
    };

    expect(response).toEqual(expected);
  });
});
