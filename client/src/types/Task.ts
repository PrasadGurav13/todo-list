export interface Task {
    id: number;
    title: string;
    status: 'Complete' | 'Incomplete';
    created_at?: string; // Made optional
  }