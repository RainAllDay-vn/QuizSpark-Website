import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardSection from '../dashboard_section';
import SummarySection from '../../practice_page/summary_section';
import { MemoryRouter } from 'react-router-dom';

// Mock the Auth Hook
vi.mock('@/lib/use_auth_hook.ts', () => ({
  default: () => ({
    user: { id: 'user-123', username: 'teststudent', role: 'ROLE_STUDENT' }
  })
}));

// Mock the API
vi.mock('@/lib/api.ts', () => ({
  getUserStatistic: vi.fn(() => Promise.resolve({
    totalQuestionsAnswered: 3,
    totalQuestionBanks: 1,
    totalTimeSpentInSeconds: 30
  }))
}));

describe('Results & Progress UI Tests', () => {
  
  it('DashboardSection should render correct statistics', async () => {
    render(
      <MemoryRouter>
        <DashboardSection />
      </MemoryRouter>
    );

    // Wait for data to load and check labels
    // Note: Since DashboardSection uses an async useEffect to fetch data, 
    // we would typically use findByText in a real environment.
    expect(await screen.findByText('3')).toBeInTheDocument(); // Questions Answered
    expect(await screen.findByText('1')).toBeInTheDocument(); // Question Banks
    expect(await screen.findByText('30s')).toBeInTheDocument(); // Time Spent (formatted as 30s)
  });

  it('SummarySection should calculate accuracy correctly', () => {
    const mockPractice = {
      id: 'practice-123',
      bankNames: ['Science Quiz'],
      numberOfQuestion: 3,
      timeInSeconds: 30,
      closed: true,
      date: new Date().toISOString(),
      questions: [
        { userAnswer: ['A'], correctAnswer: ['A'] }, // Correct
        { userAnswer: ['B'], correctAnswer: ['B'] }, // Correct
        { userAnswer: ['C'], correctAnswer: ['D'] }  // Incorrect
      ]
    };

    render(
      <MemoryRouter>
        <SummarySection practice={mockPractice as any} />
      </MemoryRouter>
    );

    // Accuracy: (2/3) * 100 = 66.66% -> Math.round is 67%
    expect(screen.getByText('67%')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Correct Answers count
    expect(screen.getByText('Practice Completed!')).toBeInTheDocument();
  });
});
