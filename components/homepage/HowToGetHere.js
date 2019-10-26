import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import FeaturedImages from './FeaturedImages'

function HowToGetHere({ spot, subtitle, means }) {
    return (
        <div>
            <Typography variant="h1">
                {subtitle}
            </Typography>
            <FeaturedImages
                title={spot}
                featured={means}
            />
        </div>
    );
}

HowToGetHere.propTypes = {
    spot: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    means: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
    })).isRequired,
};

export default HowToGetHere;
