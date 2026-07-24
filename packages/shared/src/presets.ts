import { PresetPet } from './types';

export const PRESET_PETS: PresetPet[] = [
  {
    id: 'calico_cat',
    name: 'Calico Cat',
    species: 'Cat',
    description: 'A cozy pixel art cat who loves lounging, napping, and gentle desk stretches.',
    previewColor: '#F59E0B',
    defaultPersonality: 'calm',
    spriteSheetUrl: '/sprites/calico_cat.png',
    frameWidth: 64,
    frameHeight: 64,
    columns: 4,
    rows: 4,
    fps: 8,
    animations: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      sit: [8, 9, 10, 11],
      sleep: [12, 13, 14, 15]
    }
  },
  {
    id: 'shiba_inu',
    name: 'Shiba Inu',
    species: 'Dog',
    description: 'An energetic pixel Shiba who wags its tail, trots around your desktop, and keeps you smiling.',
    previewColor: '#E11D48',
    defaultPersonality: 'playful',
    spriteSheetUrl: '/sprites/shiba_inu.png',
    frameWidth: 64,
    frameHeight: 64,
    columns: 4,
    rows: 4,
    fps: 10,
    animations: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      sit: [8, 9, 10, 11],
      sleep: [12, 13, 14, 15]
    }
  },
  {
    id: 'baby_dragon',
    name: 'Baby Dragon',
    species: 'Dragon',
    description: 'A friendly purple dragon hatchling with tiny wings and a cheerful fiery spirit.',
    previewColor: '#8B5CF6',
    defaultPersonality: 'cheerful',
    spriteSheetUrl: '/sprites/baby_dragon.png',
    frameWidth: 64,
    frameHeight: 64,
    columns: 4,
    rows: 4,
    fps: 8,
    animations: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      sit: [8, 9, 10, 11],
      sleep: [12, 13, 14, 15]
    }
  },
  {
    id: 'cute_slime',
    name: 'Cute Slime',
    species: 'Slime',
    description: 'A soft jelly slime that bounces gently around your screen and makes cute squishy jumps.',
    previewColor: '#10B981',
    defaultPersonality: 'curious',
    spriteSheetUrl: '/sprites/cute_slime.png',
    frameWidth: 64,
    frameHeight: 64,
    columns: 4,
    rows: 4,
    fps: 8,
    animations: {
      idle: [0, 1, 2, 3],
      walk: [4, 5, 6, 7],
      sit: [8, 9, 10, 11],
      sleep: [12, 13, 14, 15]
    }
  }
];
