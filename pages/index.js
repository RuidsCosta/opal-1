import React from 'react';
import FeaturedImages from '../components/homepage/FeaturedImages';
import Banner from '../components/homepage/Banner';
import home from '../static/homepage.json';
import Layout from '../components/Layout';
import HorizontalInfoBar from '../components/homepage/HorizontalInfoBar';
import HowToGetHere from '../components/homepage/HowToGetHere';

const Index = () => (
    <Layout>
        <Banner
            src={home.banner.src}
            title={home.banner.title}
            subtitle={home.banner.subtitle}
        />
        <FeaturedImages
            title={home.featuredSpeakers.title}
            featured={home.featuredSpeakers.featured}
        />
        <HorizontalInfoBar
            title={home.about.title}
            body={home.about.body}
            url={home.about.url}
        />
        <HowToGetHere
            spot={home.where.spot}
            subtitle={home.where.howtogethere}
            means={home.where.means}
        />
    </Layout>
  );

export default Index;
