export interface IpollAns {
  answer: string;
  answerId: number;
  count: number;
}

export interface IPoll {
  id: string;
  answers: [IpollAns];
  question: string;
  user: string;
}
