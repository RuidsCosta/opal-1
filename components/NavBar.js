import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '../src/Link';

const StyledTypography = styled(Typography)({
  color: 'black',
  flexGrow: 1,
});

const StyledBox = styled(Box)({
  flexGrow: 1,
});

const StyledToolBar = styled(Toolbar)({
  background: 'transparent',
  shadowBox: 'none',
});


const Entry = ({ name }) => (
  <StyledTypography variant="h6">
    {name}
  </StyledTypography>
  );

// The signup link is not intended to stay in the navbar;
// it's there for development only. It may be incorporated into 
// the signin page in the future if deemed apropriate
const NavBar = () => (
  <StyledBox>
    <StyledToolBar>
      <Link href="/">
        <Entry name="Index" />
      </Link>
      <Grid
          container
          direction="row-reverse"
          justify="flex-start"
          alignItems="center"
          spacing={1}
      >
        <Grid item>
          <Link href="/signup">
            <Entry name="Signup" />
          </Link>
        </Grid>
        <Grid item>
          <Entry name="Test2" />
        </Grid>
        <Grid item>
          <Entry name="Test3" />
        </Grid>
      </Grid>
    </StyledToolBar>
  </StyledBox>
  );

Entry.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NavBar;
