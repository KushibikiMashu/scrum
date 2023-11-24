import { CreateProductWebCommand } from '../product-command';
import {ProductName} from "@panda-project/core";

describe('CreateProductWebCommand', () => {
  test('getProductName', () => {
    const sut = new CreateProductWebCommand('プロダクト');
    expect(sut.getProductName()).toEqual(new ProductName('プロダクト'));
  });
})
