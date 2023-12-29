import React from "react";
import Layout from "@/components/Layout";
import MyMovies from "@/components/MyMovies";

const Movies: React.FC = () => {

  return (
    <Layout title="Fav Movies">
      <MyMovies />
    </Layout>
  );
};

export default Movies;
