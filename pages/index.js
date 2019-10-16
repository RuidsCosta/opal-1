import React from 'react';
import FeaturedImages from '../components/homepage/FeaturedImages';
import Banner from '../components/homepage/Banner';
import home from '../static/homepage.json';
import Layout from '../components/Layout';
import HorizontalInfoBar from '../components/homepage/HorizontalInfoBar';
import ResponsivePlayer from '../components/homepage/ResponsivePlayer';

const Index = () => (
    <Layout>
        <Banner
            src={home.banner.src}
            title={home.banner.title}
            subtitle={home.banner.subtitle}
            spot={home.banner.spot}
        />
        <FeaturedImages title={home.featuredSpeakers.title} featured={home.featuredSpeakers.featured}/>
				<ResponsivePlayer url={home.player.url} />
    </Layout>
  );

export default Index;
