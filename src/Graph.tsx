import React, { Component } from 'react';
import { Table } from '@finos/perspective';
import { ServerRespond } from './DataStreamer';
import './Graph.css';

/**
 * Props declaration for <Graph />
 */
interface IProps {
  data: ServerRespond[],
}

/**
 * Perspective library adds load to HTMLElement prototype.
 * This interface acts as a wrapper for Typescript compiler.
 */
/**
 * Perspective library adds load to HTMLElement prototype.
 * This interface acts as a wrapper for Typescript compiler.
 */
/**
 * Perspective library adds load to HTMLElement prototype.
 * This interface acts as a wrapper for Typescript compiler.
 */
interface PerspectiveViewerElement extends HTMLElement{
  load: (table: Table) => void,
}


/**
 * React component that renders Perspective based on data
 * parsed from its parent through data property.
 */
/**
 * React component that renders Perspective based on data
 * parsed from its parent through data property.
 */
class Graph extends Component<IProps, {}> {
  // Perspective table
  table: Table | undefined;

  render() {
    return React.createElement('perspective-viewer');
  }

  componentDidMount() {
    // Get element to attach the table from the DOM.
    // the componentDidMount() method runs
    // after the component output has been rendered to the DOM.
    const elem = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;
    const schema = {
      stock: 'string',
      top_ask_price: 'float',
      top_bid_price: 'float',
      timestamp: 'date',
    };

    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }
    if (this.table) {
      // Load the `table` in the `<perspective-viewer>` DOM reference.
      // Add more Perspective configurations here.
      elem.load(this.table);
      elem.setAttribute('view','y_line');
      elem.setAttribute('column-pivots','["stock"]');
      elem.setAttribute('row-pivots','["timestamp"]');
      elem.setAttribute('columns','["top_ask_price"]');
      elem.setAttribute('aggregates', `{"stock":"distinct count","top_ask_price":"avg","top_bid_price":"avg","timestamp":"distinct count"}`);
    }
  }

   componentDidUpdate() {
    if (this.table) {
      this.table.update([
          DataManipulator.generateRow(this.props.data),
      ]);
    }
  }
}

export default Graph;
