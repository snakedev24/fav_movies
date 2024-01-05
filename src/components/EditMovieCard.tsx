// src/components/EditMovieCard.tsx
import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "../styles/EditMovieCard.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { getMovieDetails } from "@/service/apiService";

const EditMovieCard: React.FC = () => {
  const router = useRouter();
  const { id }: any = router.query;

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    year: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
      setFile(fileInput.files[0]);
    }
  };

  // NOT HANDLE YET
  // const handleSave = async () => {
  //   try {
  //     const updatedData = { ...formData };
  //     if (file) {
  //       updatedData.imageUrl = URL.createObjectURL(file);
  //     }

  //     await updateMovie(id, updatedData);

  //     showSuccessToast("Movie updated successfully");
  //   } catch (error) {
  //     showErrorToast("Failed to update movie");
  //     console.error("Error updating movie:", error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieDetails = await getMovieDetails(id);

        setFormData({
          title: movieDetails.title,
          year: movieDetails.year,
          imageUrl: movieDetails.imageUrl,
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(`/api/get_movies/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            title: data.movies[0].title,
            year: data.movies[0].year,
            imageUrl: data.movies[0].imageUrl,
          });
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
        });
    }
  }, [id]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files && e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  return (
    <div className={styles.editCard}>
      <h2>Edit</h2>
      <div 
        className={`${styles.editCardInner} ${isDragging ? styles.dragging : ''}`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={styles.chooseImage}>
          <label>
            <Image
              className={styles.image}
              src={formData.imageUrl}
              alt={formData.title}
              width={200}
              height={300}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
          <div  className={styles.selectedImage}>
            {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="Dropped Image"
              className={styles.uploadedImage}
            />
        )}
          </div>
        </div>
        <div className={styles.details}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.movieTitle}
            placeholder="Title"
          />
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className={styles.input}
          />
          <div className={styles.EditMovieButton}>
            <button className={styles.cancelButton}>Cancel</button>
            <button className={styles.saveButton}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovieCard;
