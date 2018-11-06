import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function OverlayTooltip({children, tooltip}) {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={tooltip}>{tooltip}</Tooltip>}
      placement="top" delayShow={300} delayHide={150}
    >{children}</OverlayTrigger>
  );
}

export { OverlayTooltip };
