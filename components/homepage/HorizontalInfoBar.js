import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const Wrapper = styled(Grid)({
		paddingLeft: '1em',
		paddingRight: '1em',
});

const TitleBox = styled(Grid)({
    paddingBottom: '1em',
    textAlign: 'center',
    textTransform: 'uppercase',
});

const BodyBox = styled(Grid)({
    textAlign: 'justify',
});

const Bold = styled(Typography)({
    fontWeight: 'bold',
});

function HorizontalInfoBar(props) {
	const { title, body } = props;
    return (
        <Wrapper container direction="column" justify="center" alignItems="center">
            <TitleBox item sm="12">
                <Bold variant="h3">
                    {title}
                </Bold>
            </TitleBox>
            <BodyBox item sm="12">
                {body.map((line) => (
                    <Typography key={line} variant="body1">
                        {line}
                    </Typography>
                ))}
            </BodyBox>
        </Wrapper>
    );
}

HorizontalInfoBar.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.array.isRequired,
};

export default HorizontalInfoBar;
