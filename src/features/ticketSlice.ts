import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { ITicket } from "../types/types";

export interface TicketState {
  ticketList: Record<string, ITicket[]>;
}

const initialState: TicketState = {
  ticketList: {
    "First Title": [
      {
        id: "1",
        status: false,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 1,
        },
        price: 10,
      },
      {
        id: "2",
        status: false,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 2,
        },
        price: 10,
      },
      {
        id: "3",
        status: false,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 3,
        },
        price: 10,
      },
      {
        id: "4",
        status: false,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 4,
        },
        price: 10,
      },
      {
        id: "5",
        status: true,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 5,
        },
        price: 10,
      },
    ],

    "Second Title": [
      {
        id: "1",
        status: false,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 1,
        },
        price: 10,
      },
      {
        id: "2",
        status: false,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 2,
        },
        price: 10,
      },
      {
        id: "3",
        status: false,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 3,
        },
        price: 10,
      },
      {
        id: "4",
        status: false,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 4,
        },
        price: 10,
      },
      {
        id: "5",
        status: true,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 5,
        },
        price: 10,
      },
    ],

    "Third Title": [
      {
        id: "1",
        status: false,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 1,
        },
        price: 10,
      },
      {
        id: "2",
        status: false,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 2,
        },
        price: 10,
      },
      {
        id: "3",
        status: false,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 3,
        },
        price: 10,
      },
      {
        id: "4",
        status: false,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 4,
        },
        price: 10,
      },
      {
        id: "5",
        status: true,
        numbRows: 1,
        numbSeats: 5,
        pos: {
          row: 1,
          seat: 5,
        },
        price: 10,
      },
    ],
  },
};

export const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTickets: (
      state,
      action: PayloadAction<{ title: string; ticketList: ITicket[] }>
    ) => {
      state.ticketList[action.payload.title] = action.payload.ticketList;
    },
    bookingTicket: (
      state,
      action: PayloadAction<{
        key: string;
        id: number | string;
      }>
    ) => {
      const tickets = state.ticketList[action.payload.key];
      const ticket = tickets?.find((ticket) => ticket.id === action.payload.id);

      if (ticket) {
        // add else block
        ticket.status = !ticket.status;
      }
    },
  },
});

export const { addTickets, bookingTicket } = ticketSlice.actions;
export const selectTicket = (state: RootState) => state.tickets.ticketList;
export default ticketSlice.reducer;
