import React, { Component } from 'react';
import {string, number} from 'prop-types';
import Link from 'next/link';
import DeleteItem from './DeleteItem';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';


class Item extends Component {
  render() {
    const { item } = this.props;
    if (!item) return <p>There are no items.</p>
    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title}/>}
        <Title>
          <Link href={{
            pathname: './item',
            query: { id: item.id }
          }}>
            <a>{item && item.title}</a>
          </Link>
        </Title>
        <PriceTag>
          {formatMoney(item.price)}
        </PriceTag>
        <p>{item && item.description}</p>

        <div className="buttonList">
          <Link href={{
            pathname: 'update',
            query: { id: item.id }
          }}>
            <a>Edit ✏️</a>
          </Link>
          <button>Add To Cart 🛒</button>
          <DeleteItem id={item.id}>❌ Delete this item </DeleteItem>
        </div>
    </ItemStyles>
    );
  }
}

Item.propTypes = {
  title: string.isRequired,
  price: number.isRequired,
};

export default Item;
