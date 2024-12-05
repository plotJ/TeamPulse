export interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

export interface Update {
  id: number;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  hoursWorked: string;
  accomplishments: string;
  problems: string;
  questions: string;
  timestamp: string;
  focus: string;
  project: string;
  comments: Comment[];
  teamMemberId?: string;
}

export interface UpdateData {
  hoursWorked: string;
  accomplishments: string;
  problems: string;
  questions: string;
}
