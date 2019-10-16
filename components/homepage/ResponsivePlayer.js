import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import HorizontalInfoBar from './HorizontalInfoBar';

const Wrapper = styled(Grid)({
    paddingLeft: '2em',
    paddingRight: '2em',
    paddingTop: '2em',
    paddingBottom: '2em',
});

const GridItem = styled(Grid)({
		paddingLeft: '1em',
		paddingRight: '2em',
		paddingBottom: '2em',
});

const CustomPlayer = styled(ReactPlayer)({
		minHeight: '40em',
		height: '100%',
		minWidth: '100%',
		width: '100%',
		boxShadow: '1em -1em 0.5em #BEBEBE',
});

function ResponsivePlayer(props) {
    const { url, title, body } = props;
    return (
        <Wrapper container direction="row" justify="flex-start" alignItems="flex-start">
					<GridItem item sm="12" md="8">
						<CustomPlayer url={url} playing="true" />
					</GridItem>
					<GridItem item sm="12" md="4">
						<HorizontalInfoBar title={title} body={body} />
					</GridItem>
        </Wrapper>
    );
}

ResponsivePlayer.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.array.isRequired,
};

export default ResponsivePlayer;
