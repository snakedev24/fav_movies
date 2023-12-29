import React, { useState } from 'react';
import styles from "../styles/CreateMovie.module.css"
import { showErrorToast, showSuccessToast } from '@/utils/toastMessage';
import { createMovie } from '@/service/apiService';

const CreateMovie: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    image: null as File | null,
  });

  const handleInputChange = (e: any, field: any) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files && e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { title, year, image } = formData;
      const formDataToSend = new FormData();
      formDataToSend.append('title', title);
      formDataToSend.append('year', year);
      formDataToSend.append('imageUrl', image as Blob);

      const isSuccess = await createMovie(formDataToSend);

      if (isSuccess) {
        showSuccessToast('Movie created successfully');
        setFormData({ title: '', year: '', image: null });
      }
    } catch (error) {
      showErrorToast('Failed to create movie');
    }
  };

  return (
    <div className={styles.createMovieContainer}>
      <h2>Create a new movie </h2>
      <div className={styles.createMovieInner}>
      <div className={styles.chooseImage}>
      <label>
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clipPath="url(#clip0_1_58)">
            <path d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_1_58">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>Drop an image here</span>
          <input type="file" onChange={handleImageChange} />
        </label>
        </div>
      <div className={styles.createMovieRight}>
      <form onSubmit={handleSubmit} className={styles.createMovieForm}>
        <label>
          <input type="text" placeholder="Title" className={styles.movieTitle} value={formData.title} onChange={(e) => handleInputChange(e, 'title')} />
        </label>
        <label>
          <input type="text" placeholder="Publishing year"  value={formData.year} onChange={(e) => handleInputChange(e, 'year')} />
        </label>
        <div className={styles.createMovieButton}>
        <button type="submit" className={styles.cancelButton}>Cancel</button>
        <button type="submit">Submit</button>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
};

export default CreateMovie;
