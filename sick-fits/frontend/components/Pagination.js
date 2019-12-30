import React from 'react';
import PaginationStyles from './styles/PaginationStyles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <PaginationStyles>
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if(loading) return <p>Loading ...</p>
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        const page = (count - perPage) - pages;
      return <p>Page {page} of {pages}</p>
    }}
    </Query>
  </PaginationStyles>
);

export default Pagination;
