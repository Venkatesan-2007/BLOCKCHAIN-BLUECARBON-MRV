
import { Project, ProjectStatus, UploadedFile } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'PRJ-2023-001',
    name: 'Project A',
    status: ProjectStatus.Draft,
    type: 'Mangrove Restoration',
    location: 'Southeast Asia',
    startDate: '2023-01-15',
    endDate: '2028-01-15',
    hectares: 150,
    species: ['Rhizophora mucronata', 'Avicennia marina'],
  },
  {
    id: 'PRJ-2023-002',
    name: 'Project B',
    status: ProjectStatus.Submitted,
    type: 'Seagrass Meadow Conservation',
    location: 'Caribbean Sea',
    startDate: '2023-03-01',
    endDate: '2030-03-01',
    hectares: 300,
    species: ['Thalassia testudinum'],
  },
  {
    id: 'PRJ-2023-003',
    name: 'Project C',
    status: ProjectStatus.Verified,
    type: 'Coastal Wetland Revival',
    location: 'Pacific Northwest',
    startDate: '2022-09-10',
    endDate: '2027-09-10',
    hectares: 75,
    species: ['Spartina alterniflora'],
  },
  {
    id: 'PRJ-2023-004',
    name: 'Project D',
    status: ProjectStatus.Approved,
    type: 'Tidal Marsh Protection',
    location: 'East Coast, USA',
    startDate: '2021-06-20',
    endDate: '2026-06-20',
    hectares: 220,
    species: ['Juncus roemerianus', 'Salicornia virginica'],
  },
];


export const mockUploadedFiles: UploadedFile[] = [
    { id: 1, name: 'Drone_Image_01.tiff', type: 'Drone Imagery', category: 'Drone Imagery', size: '12.5 MB', preview: 'https://picsum.photos/seed/drone1/100/100' },
    { id: 2, name: 'Field_Photo_A.jpg', type: 'Field Image', category: 'Field Images', size: '4.2 MB', preview: 'https://picsum.photos/seed/field1/100/100' },
    { id: 3, name: 'Soil_Samples.csv', type: 'CSV File', category: 'CSV Files', size: '800 KB', preview: '' },
];
