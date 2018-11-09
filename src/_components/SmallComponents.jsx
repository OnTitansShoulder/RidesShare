import React from 'react';
import { OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';

function OverlayTooltip({children, tooltip}) {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={tooltip}>{tooltip}</Tooltip>}
      placement="top" delayShow={300} delayHide={150}
    >{children}</OverlayTrigger>
  );
}

function OverlayPopOver({overlay}) {
  return (
    <Popover id="popover-positioned-bottom" title="">
    {overlay}
    </Popover>
  )
}

export { OverlayTooltip, OverlayPopOver };
