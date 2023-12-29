import React from 'react';
import Layout from '../../components/Layout';
import EditMovieCard from '@/components/EditMovieCard';

const CreateMoviePage: React.FC = () => {

  return (
    <Layout title="Fav Movies">
        <EditMovieCard />
    </Layout>
  );
};

export default CreateMoviePage;
