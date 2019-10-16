import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const Wrapper = styled(Grid)({
    position: 'relative',
    overflow: 'hidden',
    zIndex: '-5',
});

const Body = styled(Grid)({
    position: 'absolute',
    paddingTop: '15%',
    paddingLeft: '5%',
    maxWidth: '90%',
    overflow: 'hidden',
});

const StyledText = styled(Typography)({
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: '1.1em',
    textShadow: '0.08em 0.08em black',
    paddingBottom: '0.2em',
});

const Text = ({ src, variant }) => (
    <Grid item>
        <StyledText variant={variant}>
            {src}
        </StyledText>
    </Grid>
);

const Image = styled(Grid)({
    maxHeight: '100vh',
});

function Banner(props) {
    const { src, title, subtitle } = props;
    return (
            <Wrapper container direction="column">
                <Image item>
                    <img alt="banner" width="100%" src={src} />
                </Image>
                <Body container direction="column" justify="center" alignItems="flex-start">
                    <Text src={title} variant="h2" />
                    <Text src={subtitle} variant="h4" />
                </Body>
            </Wrapper>
    );
}

Banner.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
};

Text.propTypes = {
    src: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
};

export default Banner;
