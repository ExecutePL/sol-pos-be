import { gql } from "@apollo/client";

export const CREATE_ORDERED_PRODUCT = gql`
  mutation CreateOrderedProduct($billId: ID, $productId: ID) {
    createOrderedProduct(
      input: { bill: { connect: $billId }, product: { connect: $productId } }
    ) {
      id
    }
  }
`;
