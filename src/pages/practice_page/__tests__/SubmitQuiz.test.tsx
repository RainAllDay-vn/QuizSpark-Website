import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PracticePage from '../practice_page';

/* 
  TC-04: Submit Quiz Frontend Test
  
  Requirement: Clicking "Finish" must transition 
  the UI to display the final score/summary.
*/

// Mock API
const mockGetPractice = vi.fn();
const mockFinishPractice = vi.fn();

vi.mock('@/lib/api.ts', () => ({
    getPractice: (id: string) => mockGetPractice(id),
    finishPractice: (id: string) => mockFinishPractice(id),
    startNewAnonymousPractice: vi.fn(),
}));

// Mock useAuthStatus
vi.mock('@/lib/use_auth_hook.ts', () => ({
    default: () => ({ user: { id: 'user-1' } })
}));

const mockOpenPractice = {
    id: 'practice-789',
    closed: false,
    questions: [
        {
            type: 'SINGLE_ANSWER',
            description: 'Is this the end?',
            choices: ['Yes', 'No'],
            userAnswer: ['0']
        }
    ]
};

const mockClosedPractice = {
    ...mockOpenPractice,
    closed: true,
};

describe('Submit Quiz - UI Transition Test', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should transition to SummarySection when Finish is clicked', async () => {
        mockGetPractice.mockResolvedValue(mockOpenPractice);
        mockFinishPractice.mockResolvedValue(mockClosedPractice);

        render(
            <MemoryRouter initialEntries={['/practice/practice-789']}>
                <Routes>
                    <Route path="/practice/:id" element={<PracticePage />} />
                </Routes>
            </MemoryRouter>
        );

        // 1. Wait for loading to finish and verify button exists
        await waitFor(() => {
            expect(screen.getByText(/Finish/i)).toBeInTheDocument();
        });

        // 2. Click Finish
        fireEvent.click(screen.getByText(/Finish/i));

        // 3. Verify transition to SummarySection (look for "YOUR RESULTS" or accuracy text)
        // Looking at summary_section.tsx, it likely contains accuracy or breakdown.
        await waitFor(() => {
            expect(mockFinishPractice).toHaveBeenCalledWith('practice-789');
            // SummarySection likely shows "Accuracy" or "Practice More"
            expect(screen.getByText(/Practice More/i)).toBeInTheDocument();
        });
    });
});
