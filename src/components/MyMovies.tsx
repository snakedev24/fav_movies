import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { showSuccessToast } from "@/utils/toastMessage";
import { getMovies } from "@/service/apiService";

const MyMovies = () => {
  const moviesPerPage = 6;
  const totalMovies = 10;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [myMovieList, setMyMovieList] = useState<any>([]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    try {
      const movies = await getMovies();
      setMyMovieList(movies);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const redirectToCreateMovie = () => {
    router.push("/create_movie");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/SignIn");
    showSuccessToast("Logout Successfully");
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedUser = localStorage.getItem('token');
      if (loggedUser) {
        router.push('/')
      }else {
        router.push('/SignUp')
      }
    } else {
      console.log('testing.')
    }
  },[])

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.MovieSec}>
      <div className={styles.MovieHeading}>
        <h2>
          My movies{" "}
          <span style={{ cursor: "pointer" }} onClick={redirectToCreateMovie}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <g clipPath="url(#clip0_1_100)">
                <path
                  d="M17.3333 9.33335H14.6667V14.6667H9.33334V17.3334H14.6667V22.6667H17.3333V17.3334H22.6667V14.6667H17.3333V9.33335ZM16 2.66669C8.64001 2.66669 2.66667 8.64002 2.66667 16C2.66667 23.36 8.64001 29.3334 16 29.3334C23.36 29.3334 29.3333 23.36 29.3333 16C29.3333 8.64002 23.36 2.66669 16 2.66669ZM16 26.6667C10.12 26.6667 5.33334 21.88 5.33334 16C5.33334 10.12 10.12 5.33335 16 5.33335C21.88 5.33335 26.6667 10.12 26.6667 16C26.6667 21.88 21.88 26.6667 16 26.6667Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_100">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </h2>
        <div onClick={handleLogout} className="logout_btn">
          <button style={{ cursor: "pointer" }} className="signUpButton">
            Logout
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <g clipPath="url(#clip0_1_93)">
                  <path
                    d="M22.6667 10.6667L20.7867 12.5467L22.8933 14.6667H12V17.3333H22.8933L20.7867 19.44L22.6667 21.3333L28 16L22.6667 10.6667ZM6.66667 6.66667H16V4H6.66667C5.2 4 4 5.2 4 6.66667V25.3333C4 26.8 5.2 28 6.66667 28H16V25.3333H6.66667V6.66667Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_93">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className={styles.MovieList}>
        {myMovieList?.movies?.map((movie: any) => (
          <MovieCard
            key={movie._id}
            title={movie.title}
            year={movie.year}
            imageUrl={movie.imageUrl}
            movieId={movie._id}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MyMovies;
