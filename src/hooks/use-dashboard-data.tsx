import { useEffect } from 'react';
import { MockWebSocket } from '@/simulations/mock-server';
import { useDashboardContext } from '@/context/dashboard-context';

export function useDashboardData() {
  const { state, updateState } = useDashboardContext();

  useEffect(() => {
    const mockWs = new MockWebSocket();

    mockWs.on('open', () => {
      mockWs.send('User authorisation');
    });

    mockWs.on('message', (event) => {
      updateState({...state, ...event.data});
    });

    mockWs.on('close', () => {
      console.log('Mock WebSocket connection closed');
    });

    mockWs.on('error', (error) => {
      console.error('WebSocket Error:', error);
    });
  }, []);
}
