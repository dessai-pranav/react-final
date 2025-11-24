import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase.js";
import Button from "../ui/Button.jsx";
import { subtractDates } from "../utils/helpers.js";
import toast from "react-hot-toast";

// Import the actual data arrays - using named imports since they use named exports
import { bookings } from "./data-bookings.js";
import { cabins } from "./data-cabins.js";
import { guests } from "./data-guests.js";

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) {
    console.error(error.message);
    throw new Error("Guests could not be deleted");
  }
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) {
    console.error(error.message);
    throw new Error("Cabins could not be deleted");
  }
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) {
    console.error(error.message);
    throw new Error("Bookings could not be deleted");
  }
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) {
    console.error(error.message);
    throw new Error("Guests could not be created");
  }
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) {
    console.error(error.message);
    throw new Error("Cabins could not be created");
  }
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object,
  // it will calculate them on its own. So it might be different for different people,
  // especially after multiple uploads. Therefore, we need to first get all guestIds and
  // cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB

  const { data: guestsIds, error: guestsError } = await supabase
      .from("guests")
      .select("id")
      .order("id");

  if (guestsError) {
    console.error(guestsError.message);
    throw new Error("Could not fetch guests");
  }

  const allGuestIds = guestsIds.map((guest) => guest.id);

  const { data: cabinsIds, error: cabinsError } = await supabase
      .from("cabins")
      .select("id")
      .order("id");

  if (cabinsError) {
    console.error(cabinsError.message);
    throw new Error("Could not fetch cabins");
  }

  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have an ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
        ? numNights * 15 * booking.numGuests
        : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
        isPast(new Date(booking.endDate)) &&
        !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
        isFuture(new Date(booking.startDate)) ||
        isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
        (isFuture(new Date(booking.endDate)) ||
            isToday(new Date(booking.endDate))) &&
        isPast(new Date(booking.startDate)) &&
        !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) {
    console.error(error.message);
    throw new Error("Bookings could not be created");
  }
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    try {
      // Bookings need to be deleted FIRST
      await deleteBookings();
      await deleteGuests();
      await deleteCabins();

      // Bookings need to be created LAST
      await createGuests();
      await createCabins();
      await createBookings();

      toast.success("All data uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to upload data");
    } finally {
      setIsLoading(false);
    }
  }

  async function uploadBookings() {
    setIsLoading(true);
    try {
      await deleteBookings();
      await createBookings();
      toast.success("Bookings uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to upload bookings");
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <div
          style={{
            marginTop: "auto",
            backgroundColor: "#e0e7ff",
            padding: "8px",
            borderRadius: "5px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
      >
        <h3>SAMPLE DATA</h3>

        <Button onClick={uploadAll} disabled={isLoading}>
          Upload ALL
        </Button>

        <Button onClick={uploadBookings} disabled={isLoading}>
          Upload bookings ONLY
        </Button>
      </div>
  );
}

export default Uploader;