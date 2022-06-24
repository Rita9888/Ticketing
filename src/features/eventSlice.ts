import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { IEvent } from "../types/types";

export interface EventState {
  eventsList: IEvent[];
}

const initialState: EventState = {
  eventsList: [
    {
      id: "1",
      title: "First Title",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      date: "23.10.2022",
      urlImage:
        "https://s4.afisha.ru/mediastorage/c5/00/03d157b4614f479d9d49b19800c5.jpg",
    },
    {
      id: "2",
      title: "Second Title",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      date: "25.06.2022",
      urlImage:
        "https://www.kvitki.by/imageGenerator/concertShort/c21b2bcbc38f9af4b00b805f23ac09c0",
    },
    {
      id: "3",
      title: "Third Title",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      date: "17.09.2023",
      urlImage:
        "https://истра.рф/uploads/media/2018/12/afisha-lyusya31544465569.jpg",
    },
  ],
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<IEvent>) => {
      state.eventsList.push(action.payload);
    },
    editEvent: (state, action: PayloadAction<IEvent>) => {
      const { id, title, body, date, urlImage } = action.payload;
      const index = state.eventsList.findIndex((event) => event.id === id);
      state.eventsList[index].title = title;
      state.eventsList[index].body = body;
      state.eventsList[index].date = date;
      state.eventsList[index].urlImage = urlImage;
    },
    deleteEvent: (state, action: PayloadAction<number | string>) => {
      const index = state.eventsList.findIndex(
        (event) => event.id === action.payload
      );
      state.eventsList.splice(index, 1);
    },
  },
});

export const { addEvent, editEvent, deleteEvent } = eventSlice.actions;
export const selectEvent = (state: RootState) => state.events.eventsList;

export default eventSlice.reducer;
