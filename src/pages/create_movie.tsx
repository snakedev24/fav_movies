import React from "react";
import CreateMovie from "../components/CreateMovie";
import Layout from "../components/Layout";
import styles from "../styles/CreateMovie.module.css";

const CreateMoviePage: React.FC = () => {
  return (
    <Layout title="Fav Movies">
      <div className={styles.CreateMovieOuter}>
        <CreateMovie />
      </div>
    </Layout>
  );
};

export default CreateMoviePage;
