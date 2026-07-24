export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt?: string;
}

export interface AnimationStateFrames {
  idle: number[];
  walk: number[];
  sit: number[];
  sleep: number[];
  dragged?: number[];
}

export interface CustomPetManifest {
  id: string;
  name: string;
  spriteUrl: string;
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  fps: number;
  animations: AnimationStateFrames;
  isCustom: true;
}

export type PetPersonality = 'cheerful' | 'playful' | 'calm' | 'curious';

export interface AdoptedPet {
  id: string;
  userId: string;
  ownerName: string;
  name: string;
  speciesId: string;
  speciesName: string;
  birthday: string; // ISO UTC Date
  personality: PetPersonality;
  scale: number;
  position: { x: number; y: number };
  customManifest?: CustomPetManifest;
  certificateDataUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PresetPet {
  id: string;
  name: string;
  species: string;
  description: string;
  previewColor: string;
  defaultPersonality: PetPersonality;
  spriteSheetUrl: string;
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  fps: number;
  animations: AnimationStateFrames;
}
