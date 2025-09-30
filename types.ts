
export enum Page {
  Login,
  Dashboard,
  Projects,
  Settings,
  NewProject,
  UploadData,
  ProjectDetail,
  CarbonReport
}

export enum ProjectStatus {
  Draft = 'Draft',
  Submitted = 'Submitted',
  Verified = 'Verified',
  Approved = 'Approved'
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  type: string;
  location: string;
  startDate: string;
  endDate: string;
  hectares: number;
  species: string[];
}

export enum UserRole {
  Manager = 'Manager',
  Validator = 'Validator',
  Operator = 'Operator'
}

export interface UploadedFile {
    id: number;
    name: string;
    type: string;
    category: 'Drone Imagery' | 'Field Images' | 'CSV Files';
    size: string;
    preview: string;
}
