export interface Author {
  name: string;
  avatar: string;
  role: string;
  color: string;
}

export interface Comment {
  id: number;
  author: Author;
  content: string;
  timestamp: string;
}

export interface Update {
  id: number;
  author: Author;
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
  project: string;
  focus: string;
  teamMemberId?: string;
}
