import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    color: '#ffffff',
    background: 'linear-gradient(90deg, #1FDEDB 0.58%, #42E198 100%)',
    borderRadius: '40px',
    '&:focus': {
      outline: 'none',
    },
  },
})(Button);

const PrimaryButton = ({ onClick, style, children, className, type }, props) => {
  return (
    <Fragment>
      <StyledButton type={type} fullWidth variant="contained" style={style} className={className} onClick={onClick} {...props}>
        {children}
      </StyledButton>
    </Fragment>
  );
};
export default PrimaryButton;
