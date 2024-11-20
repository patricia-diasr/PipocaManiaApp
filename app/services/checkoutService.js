import { apiMovieTheater } from "./apiClient";

export async function getCheckout(userId) {
  try {
    const response = await apiMovieTheater.get(`/users.json`);
    const usersData = response.data;
    const user = usersData.find((user) => user.id === userId);

    let tickets = user.tickets;

    if (tickets && tickets.length > 0) {
      tickets = tickets.sort((a, b) => {
        return a.status === b.status ? 0 : a.status ? -1 : 1;
      });
      return tickets;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error getting checkouts");
  }
}

export async function useCheckout(checkoutId) {
  try {
    const userResponse = await apiMovieTheater.get(`/users.json`);
    const usersData = userResponse.data || [];

    let foundTicket = null;
    let userIndex = -1;
    let ticketIndex = -1;

    for (let i = 0; i < usersData.length; i++) {
      const user = usersData[i];
      
      ticketIndex = user.tickets ? user.tickets.findIndex(ticket => ticket.checkoutId === checkoutId) : -1;
      
      if (ticketIndex !== -1) {
        foundTicket = user.tickets[ticketIndex];
        userIndex = i;
        break;  
      }
    }

    if (!foundTicket) {
      return { message: "Ingresso não encontrado" }; 
    }

    if (foundTicket.status === false) {
      return { message: "Ingresso já utilizado" };  
    }

    usersData[userIndex].tickets[ticketIndex].status = false;

    const updateResponse = await apiMovieTheater.put(`/users.json`, usersData);

    if (updateResponse.status === 200) {
      return {
        message: "Ingresso utilizado",
        checkoutData: usersData[userIndex].tickets[ticketIndex], 
      };
    } else {
      throw new Error("Failed to update user tickets");
    }
  } catch (error) {
    throw new Error(`Error updating checkout status: ${error.message}`);
  }
}


export async function saveCheckout(userId, reservation) {
  try {
    const userResponse = await apiMovieTheater.get(`/users.json`);
    const usersData = userResponse.data || [];

    const userIndex = usersData.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const user = usersData[userIndex];

    const updatedTickets = user.tickets
      ? [...user.tickets, reservation]
      : [reservation];

    usersData[userIndex].tickets = updatedTickets;

    const updateResponse = await apiMovieTheater.put(`/users.json`, usersData);

    if (updateResponse.status === 200) {
      return {
        message: "Reservation saved successfully",
      };
    } else {
      throw new Error("Failed to update user tickets");
    }
  } catch (error) {
    throw new Error(`Error submitting reservation: ${error.message}`);
  }
}

export async function updateSeatingData(movieId, screeningId, seatingData) {
  try {
    seatingData.forEach((row) => {
      row.forEach((seat) => {
        if (seat !== "null" && seat.status === "selected") {
          seat.status = "booked";
        }
      });
    });

    const moviesResponse = await apiMovieTheater.get(`/movies.json`);
    const movies = moviesResponse.data || [];

    const movieIndex = movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex === -1) {
      throw new Error("Movie not found");
    }

    const movie = movies[movieIndex];
    const screeningIndex = movie.movie_screenings.findIndex(
      (screening) => screening.id === screeningId
    );

    if (screeningIndex === -1) {
      throw new Error("Screening not found");
    }

    movies[movieIndex].movie_screenings[screeningIndex].seats = seatingData;
    await apiMovieTheater.put(`/movies.json`, movies);
  } catch (error) {
    throw new Error("Error updating seating data: " + error.message);
  }
}


