export type FSMState = 'idle' | 'walk' | 'sit' | 'sleep' | 'dragged';

export interface FSMStateData {
  currentState: FSMState;
  stateTimer: number;
  direction: 1 | -1; // 1 = facing right, -1 = facing left
}

export class PetFSM {
  private stateData: FSMStateData = {
    currentState: 'idle',
    stateTimer: 0,
    direction: 1
  };

  private onStateChangeCallback?: (newState: FSMState) => void;

  constructor(onStateChange?: (newState: FSMState) => void) {
    this.onStateChangeCallback = onStateChange;
    this.resetTimer(4);
  }

  public getState(): FSMState {
    return this.stateData.currentState;
  }

  public getDirection(): 1 | -1 {
    return this.stateData.direction;
  }

  public setState(newState: FSMState) {
    if (this.stateData.currentState === newState) return;
    this.stateData.currentState = newState;
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(newState);
    }
  }

  public update(deltaTimeSeconds: number) {
    if (this.stateData.currentState === 'dragged') return;

    this.stateData.stateTimer -= deltaTimeSeconds;
    if (this.stateData.stateTimer <= 0) {
      this.transition();
    }
  }

  private transition() {
    const states: FSMState[] = ['idle', 'walk', 'sit', 'sleep'];
    const current = this.stateData.currentState;

    let nextState: FSMState = 'idle';

    if (current === 'idle') {
      const rand = Math.random();
      if (rand < 0.4) nextState = 'walk';
      else if (rand < 0.8) nextState = 'sit';
      else nextState = 'sleep';
    } else if (current === 'walk') {
      nextState = Math.random() < 0.6 ? 'idle' : 'sit';
    } else if (current === 'sit') {
      nextState = Math.random() < 0.5 ? 'idle' : 'walk';
    } else if (current === 'sleep') {
      nextState = 'idle';
    }

    if (nextState === 'walk') {
      this.stateData.direction = Math.random() < 0.5 ? 1 : -1;
      this.resetTimer(3 + Math.random() * 5);
    } else if (nextState === 'sleep') {
      this.resetTimer(8 + Math.random() * 10);
    } else {
      this.resetTimer(3 + Math.random() * 4);
    }

    this.setState(nextState);
  }

  private resetTimer(seconds: number) {
    this.stateData.stateTimer = seconds;
  }
}
