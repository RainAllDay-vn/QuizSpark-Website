import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import AnalyticsDashboard from '../AnalyticsDashboard';

/* 
  TC-09: View Analytics UI Test
  
  Requirement: System displays aggregate scores and success rates.
*/

// Mock the API response
vi.mock('@/lib/api.ts', () => ({
    getBankAnalytics: vi.fn((bankId) => Promise.resolve({
        averageScore: 75.5,
        highestScore: 100,
        lowestScore: 25,
        totalCompletions: 12,
        questionBreakdown: [
            { questionDescription: 'What is 2+2?', successRate: 90 },
            { questionDescription: 'What is the speed of light?', successRate: 45 }
        ]
    })),
}));

describe('AnalyticsDashboard Component', () => {

    it('should render aggregate statistics correctly', async () => {
        render(<AnalyticsDashboard bankId="b-123" />);

        await waitFor(() => {
            expect(screen.getByText(/Average Score/i)).toBeInTheDocument();
            expect(screen.getByText(/75.5%/)).toBeInTheDocument();
            expect(screen.getByText(/Highest Score/i)).toBeInTheDocument();
            expect(screen.getByText(/100%/)).toBeInTheDocument();
            expect(screen.getByText(/Lowest Score/i)).toBeInTheDocument();
            expect(screen.getByText(/25%/)).toBeInTheDocument();
            expect(screen.getByText(/Total Completions/i)).toBeInTheDocument();
            expect(screen.getByText(/12/)).toBeInTheDocument();
        });
    });

    it('should render question breakdown table', async () => {
        render(<AnalyticsDashboard bankId="b-123" />);

        await waitFor(() => {
            expect(screen.getByText(/What is 2\+2\?/)).toBeInTheDocument();
            expect(screen.getByText(/90%/)).toBeInTheDocument();
            expect(screen.getByText(/What is the speed of light\?/)).toBeInTheDocument();
            expect(screen.getByText(/45%/)).toBeInTheDocument();
        });
    });
});
