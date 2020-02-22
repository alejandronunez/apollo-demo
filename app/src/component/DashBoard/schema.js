import gql from "graphql-tag";

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
