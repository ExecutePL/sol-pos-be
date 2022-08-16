import { gql } from "@apollo/client";

export const CREATE_ORDERED_PRODUCT = gql`
    mutation CreateOrderedProduct(
        $billId: ID
        $productId: ID
        $quantity: Int!
    ) {
        createOrderedProduct(
            quantity: $quantity
            input: {
                bill: { connect: $billId }
                product: { connect: $productId }
            }
        )
    }
`;
