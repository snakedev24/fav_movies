// src/components/MovieCard.tsx
import React from "react";
import styles from "../styles/MovieCard.module.css";
import Link from "next/link";
import Image from "next/image";
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
          {/* <Link href={`/edit_movie_card/${movieId}`} passHref>
            <EditMovieSvg />
          </Link> */}
          <Link href={`/edit_movie_card/${movieId}`} passHref>
            <a>
              <EditMovieSvg />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

const EditMovieSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="#000000"
      height="800px"
      width="800px"
      version="1.1"
      id="Capa_1"
      viewBox="0 0 306.637 306.637"
      xmlSpace="preserve"
    >
      <g>
        <g>
          <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896    l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z" />
          <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095    L265.13,75.602L231.035,41.507z" />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </g>
    </svg>
  );
};
