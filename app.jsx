import React from 'react';
import ReactDOM from 'react-dom';

import { NavTabs } from './NavTabs.jsx';
import { ItemCatalog } from './ItemCatalog.jsx';
import { ShoppingList } from './ShoppingList.jsx';
import { AppStore, ListStore } from './stores.jsx';
import { fire, ItemActions } from './actions.jsx';

var items = {
    0: {
        id: 0,
        name: 'Sleeping Bag w/ Stuff Sack',
        price: 44.99,
        description: 'Fill in some information about this product.'
    },
    1: {
        id: 1,
        name: 'Chocolate Energy Bar',
        price: 2.99,
        description: 'Fill in some information about this product.'
    },
    2: {
        id: 2,
        name: '2-Person Polyethylene Tent',
        price: 104.33,
        description: 'Fill in some information about this product.'
    }
};


class ShoppingApp extends React.Component{
    render() {
        return (
            <main>
                <NavTabs />

                {
                  AppStore.currentTab() === 'items' ?
                    <ItemCatalog items={this.props.items} />
                    :
                    <ShoppingList ref="list" list={ListStore.getList()} />
                }
            </main>
        );
    }

    componentWillMount() {
        AppStore.addListener('change', this.update.bind(this));
        ListStore.addListener('change', this.update.bind(this));
    }

    componentWillUnmount() {
        AppStore.removeListener('change', this.update.bind(this));
        ListStore.addListener('change', this.update.bind(this));
    }

    update() {
        this.forceUpdate();
    }
}

document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        var renderShoppingList = function renderShoppingList() {
            ReactDOM.render(<ShoppingApp items={items} />, document.getElementById('here'));
        };

        renderShoppingList();
        fire(ItemActions._rawSetItems(items));
    }
};
