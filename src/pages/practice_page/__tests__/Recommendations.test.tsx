import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SummarySection from '../summary_section';

/* 
  TC-07: AI Quiz Recommendations UI Test
  
  Requirement: Summary page displays "Recommended for You" section.
*/

// Mock the API call for recommendations
vi.mock('@/lib/api.ts', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@/lib/api.ts')>();
    return {
        ...actual,
        getRecommendations: vi.fn(() => Promise.resolve([
            { id: 'rec-1', name: 'Advanced Organic Chemistry', description: 'Targeting your weak areas in Chemistry', questionCount: 15 }
        ])),
    };
});

import { getRecommendations } from '@/lib/api.ts';

describe('Recommendations in SummarySection', () => {

    const mockPractice = {
        id: 'p-123',
        closed: true,
        timeInSeconds: 300,
        questions: [],
        // ... other fields
    };

    it('should display the "Recommended for You" section if recommendations exist', async () => {
        // If we assume SummarySection calls getRecommendations on mount
        render(
            <MemoryRouter>
                <SummarySection practice={mockPractice as any} />
            </MemoryRouter>
        );

        // Assert "Recommended for You" header appears
        // (This assumes the component would be updated to include this)
        await waitFor(() => {
            expect(screen.getByText(/Recommended for You/i)).toBeInTheDocument();
        });

        // Assert recommended bank title appears
        expect(screen.getByText(/Advanced Organic Chemistry/i)).toBeInTheDocument();
    });
});
