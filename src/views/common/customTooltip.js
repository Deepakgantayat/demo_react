import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

const CustTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#FFFFFF',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #bdbdbd',
    boxSizing: 'border-box',
    borderRadius: '8px',
    padding: '5%',
    minWidth: '300px',
  },
  arrow: {
    color: '#FFFFFF',
    '&:before': {
      border: '1px solid #bdbdbd',
    },
  },
}))(Tooltip);
const useStyles = makeStyles((theme) => ({
    icon: {
      color: '#66E3BE',
      cursor: 'pointer',
      marginTop: '15%',
      marginLeft: '1%',
    },
  }));

export default function CustomizedTooltips({ title, icon, placement, marginTop, iconColor }) {
  const classes = useStyles();
  return (
    <>
      <CustTooltip title={title && title} arrow placement='right'>
          <InfoIcon className={classes.icon} />
      </CustTooltip>
    </>
  );
}
