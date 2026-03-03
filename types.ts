
export interface Metric {
  id: string;
  name: string;
  value: string;
  rating: number; // 0 to 100
  unit: string;
}

export type HandballCategory = 'Blocked' | 'Ball Control' | 'Deflection';

export interface SituationData {
  isHandball: boolean;
  handTouched: 'Left' | 'Right' | 'Both';
  category: HandballCategory;
  timestamp: string;
  position: string;
  playerNumber: string;
  matchInfo: string;
  team: string;
}

export interface AppState {
  situation: SituationData;
  metrics: Metric[];
  manualScore?: number | null;
}
