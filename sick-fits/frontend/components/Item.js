import React, { Component } from 'react';
import {string, number} from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';


class Item extends Component {
  render() {
    const { item } = this.props;

    return <ItemStyles>
      <Title>
        <Link href={{
          pathname: './item',
          query: { id: item.id }
        }}>
          <a>{item.title}</a>
        </Link>
      </Title>
      <PriceTag>
        {formatMoney(item.price)}
      </PriceTag>
      <p>{item.description}</p>

      <div className="buttonList">
        <Link href={{
          pathname: 'update',
          query: { id: item.id }
        }}>
          <a>Edit ✏️</a>
        </Link>
      </div>
    </ItemStyles>;
  }
}

Item.propTypes = {
  title: string.isRequired,
  price: number.isRequired,
};

export default Item;