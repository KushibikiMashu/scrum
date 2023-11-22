import {CreateProductCommand} from "@/use-case";
import {ProductName} from "@panda-project/core";

export class CreateProductWebCommand implements CreateProductCommand {
  constructor(
    private readonly productName: string,
  ) {
  }

  getProductName(): ProductName {
    return new ProductName(this.productName)
  }
}
