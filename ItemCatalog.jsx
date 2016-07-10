import React from 'react';

import { fire, ItemActions, ListActions } from './actions.jsx';
import { ItemStore } from './stores.jsx';
import { NumberSpinner } from './NumberSpinner.jsx'
import { priceToUSDString } from './ShoppingList.jsx';

class ItemEditForm extends React.Component {
    render() {
        return <form>
            <article>
                <p><label>Name:</label>
                    <input type="text"
                        ref="name"
                        defaultValue={this.props.item.name} /></p>
                <p><label>Description:</label>
                    <input type="text"
                        ref="description"
                        defaultValue={this.props.item.description} /></p>
                <p><label>Price:</label>
                    <input type="text"
                        ref="price"
                        defaultValue={this.props.item.price} /></p>
                      <button onClick={this.save.bind(this)}>Save</button>
            </article>
        </form>;
    }

    save(event) {
        event.preventDefault();
        fire(ItemActions.edit(this.props.item.id, {
            id: this.props.item.id,
            name: this.refs.name.value,
            description: this.refs.description.value,
            price: parseFloat(this.refs.price.value)
        }));
        this.props.onSave(null);
    }
}

class ItemListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { quantity: 1 };
    }

    render() {
        return (<div>
          <article>
              <h3>{this.props.item.name}</h3>
              <p>{this.props.item.description}</p>
              <p className="price">
                  Price:<br />
                  <strong>{priceToUSDString(this.props.item.price)}</strong>
              </p>
              <a href="#" onClick={this.edit.bind(this)} className="edit">Edit</a>
          </article>
          <aside>
              <div className="quantity">
                  Quantity:<br />
                  <NumberSpinner value={this.state.quantity}
                                 onChange={this.setQuantity.bind(this)} />
                             </div>
              <button onClick={this.addItem.bind(this)}>Add to List</button>
          </aside>

        </div>);
    }

    setQuantity(value) {
        this.setState({quantity: value});
    }

    addItem() {
        fire(ListActions.addItem(this.props.item.id, this.state.quantity));
    }

    edit() {
        this.props.onEdit(this.props.item.id);
    }
}

class ItemCatalog extends React.Component {
    constructor(props) {
        super(props);
        console.log("ItemCatalog.constructor()");
        this.state = {
            editing: null,
            items: ItemStore.getAll()
        };
    }

    render() {
        console.log("ItemCatalog.render()");
        return <section className="catalog">
          {
            this.state.items.map(function(item) {
                if (this.state.editing === item.id) {
                    return <ItemEditForm item={item} key={item.id} onSave={this.onEdit.bind(this)} />;
                } else {
                    return <ItemListing item={item} key={item.id} onEdit={this.onEdit.bind(this)} />;
                }
                return <p>foo</p>
            }.bind(this))
          }
        </section>;
    }

    componentWillMount() {
        ItemStore.addListener('change', this.onStoreChange.bind(this));
    }

    componentWillUnmount() {
        ItemStore.removeListener('change', this.onStoreChange.bind(this));
    }

    onEdit(itemIdOrNull) {
        this.setState({editing: itemIdOrNull});
    }

    onStoreChange() {
        let tmpState = {items: ItemStore.getAll()};
        console.log(tmpState);
        console.log(this);
        this.setState(tmpState);
    }
}

export { ItemEditForm, ItemListing, ItemCatalog };
