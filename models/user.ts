export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
  birthday: string;
  password: string;
  observation: Observation[]
}

export interface Observation {
  id: string;
  patientId: string;
  weight: number;
  insulinLevel: string;
  bloodSugar: string;
  date: string;
  time: string;
}