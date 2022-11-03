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
  // Get element from the DOM.
  const elem = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;

  const schema = {
    price_abc: 'float',
    price_def: 'float',
    ratio: 'float',
    timestamp: 'date',
    upper_bound: 'float',
    lower_bound: 'float',
    trigger_alert: 'float',
  };

  if (window.perspective && window.perspective.worker()) {
    this.table = window.perspective.worker().table(schema);
  }
  if (this.table) {
    // Load the `table` in the `<perspective-viewer>` DOM reference.
    elem.load(this.table);
    elem.setAttribute('view', 'y_line');
    elem.setAttribute('row-pivots', '["timestamp"]');
    elem.setAttribute('columns', '["top_ask_price"]');
    elem.setAttribute('aggregates', JSON.stringify({
    // To configure our graph, modify/add more attributes to the element. 
      price_abc: 'avg',
      price_def: 'avg',
      ratio: 'avg',
      timestamp: 'distinct count',
      upper_bound: 'avg',
      lower_bound: 'avg',
      trigger_alert: 'avg',
    }));
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
