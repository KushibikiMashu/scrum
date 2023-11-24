import { CreateProductCliCommand } from '../product-command';
import {ProductName} from "@panda-project/core";

describe('CreateProductCliCommand', () => {
  test('getProductName', () => {
    const sut = new CreateProductCliCommand('プロダクト');
    expect(sut.getProductName()).toEqual(new ProductName('プロダクト'));
  });
})
