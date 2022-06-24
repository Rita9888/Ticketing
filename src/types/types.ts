export interface ITicket {
  id: number | string;
  status: boolean;
  numbRows?: number | string;
  numbSeats?: number | string;
  pos: {
    row: number | string;
    seat: number | string;
  };
  price: number | string;
}

export interface IEvent {
  id: number | string;
  date?: string;
  title: string;
  body: string;
  ticketsList?: ITicket[];
  equalTicket?: number;
  urlImage?: string;
}
