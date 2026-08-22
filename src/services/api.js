import { createApi } from "@reduxjs/toolkit/query/react";
import { services, allTimeSlots, bookedSlotsFor } from "../data/mockDb";

// Simulated network layer — same pattern as a real REST integration
// (latency, structured errors, cache invalidation) without requiring
// a live backend to run the project.
const confirmedBookings = {}; // dateStr -> Set of times booked this session

const LATENCY = 500;

function simulatedBaseQuery() {
  return async ({ url, method = "GET", body }) => {
    await new Promise((res) => setTimeout(res, LATENCY));
    try {
      const data = resolve(url, method, body);
      return { data };
    } catch (err) {
      return { error: { status: 400, data: err.message } };
    }
  };
}

function resolve(url, method, body) {
  const [path, query] = url.split("?");
  const params = new URLSearchParams(query || "");

  if (path === "/services") return services;

  if (path === "/availability") {
    const date = params.get("date");
    if (!date) throw new Error("A date is required");
    const seedBooked = bookedSlotsFor(date);
    const sessionBooked = confirmedBookings[date] || new Set();
    return allTimeSlots.map((time) => ({
      time,
      available: !seedBooked.has(time) && !sessionBooked.has(time),
    }));
  }

  if (path === "/bookings" && method === "POST") {
    const { date, time, serviceId, name, phone } = body;
    if (!date || !time || !serviceId || !name || !phone) {
      throw new Error("Missing details — please complete every field.");
    }
    const seedBooked = bookedSlotsFor(date);
    const sessionBooked = confirmedBookings[date] || new Set();
    if (seedBooked.has(time) || sessionBooked.has(time)) {
      throw new Error("That slot was just taken. Please choose another time.");
    }
    if (!confirmedBookings[date]) confirmedBookings[date] = new Set();
    confirmedBookings[date].add(time);

    const service = services.find((s) => s.id === serviceId);
    return {
      confirmationCode: `HZ-${Math.floor(1000 + Math.random() * 9000)}`,
      date,
      time,
      service,
      name,
      phone,
    };
  }

  throw new Error(`Unhandled mock route: ${method} ${path}`);
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: simulatedBaseQuery(),
  tagTypes: ["Availability"],
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({ url: "/services" }),
    }),
    getAvailability: builder.query({
      query: (date) => ({ url: `/availability?date=${date}` }),
      providesTags: (result, error, date) => [{ type: "Availability", id: date }],
    }),
    createBooking: builder.mutation({
      query: (body) => ({ url: "/bookings", method: "POST", body }),
      invalidatesTags: (result, error, body) => [
        { type: "Availability", id: body.date },
      ],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetAvailabilityQuery,
  useCreateBookingMutation,
} = api;
