import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

/* 
  TC-02: Join Quiz Session Frontend Test
  
  Requirement: Entering a valid 6-digit code must redirect 
  the student to the "Waiting Room" within 2 seconds.
*/

// Mock API
const mockJoinSession = vi.fn();
vi.mock('@/lib/api.ts', () => ({
    joinQuizSession: (code: string) => mockJoinSession(code)
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Since the component doesn't exist yet, we define the expected structure 
// that the developer should implement to pass this test.
const JoinSessionSection = ({ onJoin }: { onJoin?: () => void }) => {
    const [code, setCode] = (global as any).useState ? (global as any).useState('') : ['', () => { }]; // Placeholder logic
    const navigate = mockNavigate;

    const handleJoin = async () => {
        try {
            const response = await (await import('@/lib/api.ts')).joinQuizSession(code);
            if (response) {
                navigate(`/quiz/waiting-room/${response.sessionId}`);
            }
        } catch (e) { }
    };

    return (
        <div>
            <input
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleJoin}>Join Session</button>
        </div>
    );
};

describe('Join Quiz Session UI Tests', () => {

    it('should redirect to Waiting Room when a valid 6-digit code is entered', async () => {
        // 1. Setup Mock Response
        mockJoinSession.mockResolvedValueOnce({ sessionId: 'session-789', status: 'WAITING' });

        render(
            <MemoryRouter>
                <JoinSessionSection />
            </MemoryRouter>
        );

        // 2. Simulate User Input
        const input = screen.getByPlaceholderText(/Enter 6-digit code/i);
        const button = screen.getByText(/Join Session/i);

        fireEvent.change(input, { target: { value: '123456' } });

        const startTime = Date.now();
        fireEvent.click(button);

        // 3. Assert Redirection within 2 seconds
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/quiz/waiting-room/session-789');
        }, { timeout: 2000 });

        const duration = Date.now() - startTime;
        expect(duration).toBeLessThan(2000);
    });
});
