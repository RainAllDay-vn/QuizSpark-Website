import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import PracticeSection from '../practice_section';

/* 
  TC-03: Take Quiz Frontend Test
  
  Requirements: 
  1. Display one question at a time.
  2. Support MCQ inputs (trigger API call).
  3. Timer increments every second.
*/

// Mock API
const mockAnswer = vi.fn();
vi.mock('@/lib/api', () => ({
    answer: (id: string, data: any) => mockAnswer(id, data)
}));

// Mock Data
const mockPractice = {
    id: 'practice-123',
    questions: [
        {
            type: 'SINGLE_ANSWER',
            description: 'First Question: What is 2+2?',
            choices: ['3', '4', '5'],
            tags: ['math']
        },
        {
            type: 'SINGLE_ANSWER',
            description: 'Second Question: What is the capital of France?',
            choices: ['London', 'Paris', 'Berlin'],
            tags: ['geo']
        }
    ]
};

const mockCompletePractice = vi.fn();

describe('Take Quiz - PracticeSection UI Tests', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
    });

    it('should display only the first question initially and update the timer', async () => {
        render(
            <PracticeSection
                practice={mockPractice as any}
                completePractice={mockCompletePractice}
            />
        );

        // 1. Verify "One Question at a Time"
        expect(screen.getByText(/First Question/i)).toBeInTheDocument();
        expect(screen.queryByText(/Second Question/i)).not.toBeInTheDocument();

        // 2. Verify Timer increments
        expect(screen.getByText('00:00')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(2000);
        });

        expect(screen.getByText('00:02')).toBeInTheDocument();
    });

    it('should trigger API submission when an answer is selected', async () => {
        mockAnswer.mockResolvedValueOnce({ correctAnswer: ['1'], questionComments: [] });

        render(
            <PracticeSection
                practice={mockPractice as any}
                completePractice={mockCompletePractice}
            />
        );

        // Click option 'B' (index 1) which is "4"
        const optionB = screen.getByText('4');
        fireEvent.click(optionB);

        // Verify API called with correct index and answer
        await waitFor(() => {
            expect(mockAnswer).toHaveBeenCalledWith('practice-123', expect.objectContaining({
                index: 0,
                answer: ['1']
            }));
        });
    });
});
