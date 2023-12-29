// src/components/MovieCard.tsx
import React from "react";
import styles from "../styles/MovieCard.module.css";
import Link from "next/link";
import Image from "next/image";
import EditButtonSvg from "./EditButtonSvg";

interface MovieCardProps {
  title: string;
  year: string;
  imageUrl: string;
  movieId: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  year,
  imageUrl,
  movieId,
}) => {
  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src={imageUrl}
        alt={title}
        height={340}
        width={250}
        // layout="responsive"
      />
      <div className={styles.details}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.year}>{year}</p>
        <div className={styles.editButton}>
          <Link href={`/edit_movie_card/${movieId}`} passHref>
            <EditButtonSvg />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
