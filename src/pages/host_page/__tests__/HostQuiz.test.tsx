import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HostLobbyPage from '../HostLobbyPage';

/* 
  TC-11: Host Quiz Session UI Test
  
  Requirement: Teacher sees session code and real-time student count.
*/

// Mock the API response
vi.mock('@/lib/api.ts', () => ({
    createLiveSession: vi.fn((bankId) => Promise.resolve({ id: 's-123', pin: '888999', status: 'WAITING' })),
    getSessionStatus: vi.fn((sessionId) => Promise.resolve({ studentCount: 5, status: 'WAITING' })),
    startSession: vi.fn((sessionId) => Promise.resolve({ status: 'ACTIVE' })),
}));

describe('HostLobbyPage', () => {

    it('should render session PIN and student count', async () => {
        // Render with a specific bankId to trigger host logic
        render(<HostLobbyPage bankId="b-1" />);

        await waitFor(() => {
            expect(screen.getByText(/888999/)).toBeInTheDocument();
            expect(screen.getByText(/5 Students Joined/i)).toBeInTheDocument();
        });
    });

    it('should enable start button only when students are present', async () => {
        render(<HostLobbyPage bankId="b-1" />);

        const startBtn = await screen.findByRole('button', { name: /Start Quiz/i });

        // With 5 students (from mock), button should be enabled
        expect(startBtn).not.toBeDisabled();

        // Trigger start
        fireEvent.click(startBtn);

        await waitFor(() => {
            expect(screen.getByText(/Session is Live/i)).toBeInTheDocument();
        });
    });
});
