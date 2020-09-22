import appLocale from '@locales';
import useHeader from '@navigator/components/header/useHeader';
import * as navigation from '@react-navigation/native';
import { Routes } from '@routes';
import { productListActions } from '@store/product-list';
import { ProductListBuilderMock } from '@store/product-list/__mocks__/productListBuilder.mock';
import { act, renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';
import { useNavigationMocks } from 'src/__tests__/navigation-mocks';
import useProductLists from '../useProductLists';

const strings = appLocale();
jest.mock('@react-navigation/native');
jest.mock('@navigator/components/header/useHeader', () => jest.fn());
describe('ProductList - useProductLists', () => {
  const navigate = jest.fn();
  jest
    .spyOn(navigation, 'useNavigation')
    .mockReturnValue({ ...useNavigationMocks, navigate });
  const dispatch = jest.fn();
  jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);

  const mockProductList = new ProductListBuilderMock().build();
  jest.spyOn(reactRedux, 'useSelector').mockReturnValue(mockProductList);

  test('ao inicializar deve realizar um fetch nas listas e mostrar o header', () => {
    renderHook(useProductLists);

    expect(useHeader).toHaveBeenCalledWith({
      showHeader: true,
      title: strings.productLists.lists,
    });
    expect(dispatch).toHaveBeenCalledWith(
      productListActions.getProductListsAsync(),
    );
  });

  test('ao pressionar o botão de nova lista deve navegar para a tela de nova lista', () => {
    const { result } = renderHook(useProductLists);

    act(() => {
      result.current.onNewButtonPress();
    });

    expect(navigate).toHaveBeenCalledWith(Routes.NewList, {});
  });
});