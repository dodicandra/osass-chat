import {UiActionType} from './types';

export const setLoading = (): UiActionType => ({
  type: 'SET_LOADING'
});

export const stopLoading = (): UiActionType => ({
  type: 'STOP_LOADING'
});

export const setError = (message: string): UiActionType => ({
  type: 'SET_ERROR',
  payload: message
});

export const clearError = (): UiActionType => ({
  type: 'CLEAR_ERROR'
});
