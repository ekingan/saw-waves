import gql from 'graphql-tag';
import Router from 'next/router';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import Error from './ErrorMessage';
import Form from './styles/Form';
import { isThisSecond } from 'date-fns';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }

  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type == 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val })
  };

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log("updating");
    console.log(this.state);
    const res = await updateItemMutation({
      variables: { id: this.props.id, ...this.state }
    });
    console.log("updates");
  };

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
        {({ data, loading }) => {
          if(loading) return <p>Loading...</p>
          if(!data.item) return <p>There was no item found with the Id {this.props.id}</p>
          return (
          <Mutation
            mutation={ UPDATE_ITEM_MUTATION }
            variables={this.state}>
            {(updateItem, { loading, error }) => (
              <Form onSubmit={e => this.updateItem(e, updateItem)}>
                <Error error={error}/>
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="title">
                    Title
                    <input
                      onChange={this.handleChange}
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      required
                      defaultValue={data.item.title}
                      />
                  </label>
                  <label htmlFor="price">
                    Price
                    <input
                      onChange={this.handleChange}
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Price"
                      required
                      defaultValue={data.item.price}
                      />
                  </label>
                  <label htmlFor="description">
                    Description
                    <textarea
                      onChange={this.handleChange}
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Enter a Description"
                      required
                      defaultValue={data.item.description}
                      />
                  </label>
                  <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                </fieldset>
            </Form>
            )}
          </Mutation>
        )}}
      </Query>
    );
  }
}

UpdateItem.propTypes = {

};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };

