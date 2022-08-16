import { gql } from "@apollo/client";

export const UPDATE_BILL = gql`
  mutation UpdateBill($billId: ID!, $tip: Int) {
    updateBill(id: $billId, input: { tip: $tip }) {
      id
    }
  }
`;
