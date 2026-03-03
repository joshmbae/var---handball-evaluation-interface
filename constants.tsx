
import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  situation: {
    isHandball: true,
    handTouched: 'Left',
    timestamp: '42:15',
    category: 'Blocked',
    position: 'x: 43.5 | y: 3.3 ',
    playerNumber: '9 - Burkhardt',
    matchInfo: 'Sports Innovation 2026',
    team: 'Eintracht Frankfurt'
  },
  metrics: [
    { id: 'area', name: 'Increase of Body Surface', value: '36', unit: '%', rating: 75 },
    { id: 'dist', name: 'Distance', value: '3.89', unit: 'm', rating: 65 },
    { id: 'react', name: 'Reaction Time', value: '200', unit: 'ms', rating: 78 },
    { id: 'speed', name: 'Arm Movement Towards Ball Trajectory', value: '27', unit: 'cm', rating: 80 },
    { id: 'goal', name: 'Ball Trajectory Towards Goal', value: 'True', unit: '', rating: 100 },
  ],
  manualScore: null
};
