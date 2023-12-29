const API_BASE_URL = "/api";

export const createMovie = async (formData: FormData): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/create_movie`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Failed to create movie");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to create movie");
  }
};

export const getMovies = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_movies`);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch movies");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch movies");
  }
};

export const getMovieDetails = async (movieId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_movies/${movieId}`);
    if (response.ok) {
      const data = await response.json();
      return data.movies[0];
    } else {
      throw new Error("Failed to fetch movie details");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch movie details");
  }
};

// NOT HANDLE YET
// export const updateMovie = async (movieId: string, updatedData: any): Promise<void> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/update_movie/${movieId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedData),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to update movie');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       throw new Error('Failed to update movie');
//     }
//   };

