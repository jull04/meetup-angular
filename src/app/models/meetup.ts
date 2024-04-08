import { User } from "./user";

export interface Meetup {
  name: string;
  description: string;
  location: string;
  target_audience: string;
  need_to_know: string;
  will_happen: string;
  reason_to_come: string;
  time: string;
  duration: number;
}

export interface ExtendedMeetup extends Meetup {
  id: number;
  createdBy: number;
  owner: User;
  users: User[];
}
