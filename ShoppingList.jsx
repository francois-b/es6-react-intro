import React from 'react';

import { NumberSpinner } from './NumberSpinner.jsx';
import { ListActions, fire } from './actions.jsx';

var priceToUSDString = function(price) {
    return "$" + price.toFixed(2);
};

class ShoppingItemRow extends React.Component {

    render() {
        var item = this.props.item;
        return <li>
            <ul>
                <li className="name">{item.name}</li>
                  <li className="quantity">
                      <NumberSpinner value={item.quantity}
                                     onChange={this.onChangeQuantity.bind(this)} />
                      {item.quantity===0 ?
                          <a className="remove" onClick={this.removeItem.bind(this)}>×</a>
                          :
                          null}
                  </li>
                <li className="price">
                    {priceToUSDString(item.quantity * item.price)}
                </li>
            </ul>
        </li>;
    }

    onChangeQuantity(value) {
        fire(ListActions.changeQuantity(this.props.item.id, value));
    }

    removeItem() {
        fire(ListActions.removeItem(this.props.item.id));
    }
}

ShoppingItemRow.propTypes = {
    item: React.PropTypes.object
}

class ShoppingTotal extends React.Component {

    render() {
        var total = this.props.list.reduce(function(runningTotal, item) {
            return (item.price * item.quantity) + runningTotal;
        }, 0);
        return <ul className="total">
            <li>Total</li>
            <li>{priceToUSDString(total)}</li>
        </ul>;
    }
}

ShoppingTotal.propTypes = {
    list: React.PropTypes.array
}

class ShoppingList extends React.Component {

    render() {
        var listComponents = this.props.list.map(function(item) {
            return <ShoppingItemRow item={item} key={item.name} />;
        });

        return <div>
            <ol className="items">
                {listComponents.length ?
                    listComponents
                    :
                    <li className="empty">No items</li>}
            </ol>
            <ShoppingTotal list={this.props.list} />
        </div>;
    }
}

ShoppingList.propTypes = {
    list: React.PropTypes.array.isRequired
}

export { ShoppingItemRow, ShoppingTotal, ShoppingList, priceToUSDString };
