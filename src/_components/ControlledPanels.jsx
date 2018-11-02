import React from 'react';
import { PanelGroup } from 'react-bootstrap';

class ControlledPanelGroup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeKey: '1'
    };
  }
  handleSelect(activeKey) { this.setState({ activeKey }); }
  render() {
    return (
      <PanelGroup
        accordion
        id="controlled-panels"
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
      >
        { this.props.children }
      </PanelGroup>
    );
  }
}

export { ControlledPanelGroup as ControlledPanels }
