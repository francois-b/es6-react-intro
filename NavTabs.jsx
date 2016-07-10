import React from 'react';

import { AppStore } from './stores.jsx';
import { AppActions } from './actions.jsx';
import { fire } from './actions.jsx';

class NavTabs extends React.Component {
    render() {
        var picked = AppStore.currentTab();

        return <nav id="tabs">
            <div onClick={this.pickItems}
                 className={picked === 'items' ? 'picked' : ''}>Items</div>
            <div onClick={this.pickList}
                 className={picked === 'list' ? 'picked' : ''}>Shopping List</div>
        </nav>;
    }

    componentWillMount() {
        AppStore.addListener('change', this.forceUpdate.bind(this));
    }

    componentWillUnmount() {
        AppStore.removeListener('change', this.forceUpdate.bind(this));
    }

    pickItems() { fire(AppActions.showItems()); }
    pickList() { fire(AppActions.showList()); }
}

export { NavTabs };
