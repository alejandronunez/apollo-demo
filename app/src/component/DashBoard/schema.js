import {gql} from "apollo-boost";

export const openQuery = gql`
query menuOpen{
  menuOpen @client
}
`;

export const openMutation = gql`
  mutation updateMenuOpen($menuOpen: Boolean) {
    updateMenuOpen(menuOpen: $menuOpen) @client
  }
`;
