import { gql } from "@apollo/client";

export const CREATE_POINT_OF_SALE = gql`
    mutation CreatePointOfSale($name: String!, $publicKey: String!) {
        createPointOfSale(input: { name: $name, public_key: $publicKey }) {
            id
            name
            status
            created_at
            updated_at
            # user
            # bills
        }
    }
`;
