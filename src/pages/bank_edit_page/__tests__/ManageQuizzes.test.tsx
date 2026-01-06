import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BankEditSection from '../bank_edit_section';

/* 
  TC-08: Create / Manage Quizzes UI Test
  
  Requirement: User can edit metadata and trigger AI generation.
*/

// Mock the API and navigation
vi.mock('@/lib/api', () => ({
    updateQuestionBank: vi.fn((id, data) => Promise.resolve({ id, ...data })),
    deleteQuestionBank: vi.fn(() => Promise.resolve()),
    deleteFile: vi.fn(() => Promise.resolve()),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>();
    return { ...actual, useNavigate: () => mockNavigate };
});

describe('BankEditSection Tests', () => {
    const mockBank = {
        id: 'b-123',
        name: 'Original Bank Name',
        description: 'Original Description',
        access: 'PRIVATE',
        status: 'DRAFT',
        createdAt: new Date().toISOString(),
        files: [
            { id: 'f-1', fileName: 'test.pdf', fileType: 'application/pdf', uploadDate: new Date().toISOString() }
        ],
        questions: []
    };

    const setQuestionBank = vi.fn();
    const onStartAiProcessing = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should transition to edit mode and save changes', async () => {
        render(
            <MemoryRouter>
                <BankEditSection
                    questionBank={mockBank as any}
                    setQuestionBank={setQuestionBank}
                    onStartAiProcessing={onStartAiProcessing}
                />
            </MemoryRouter>
        );

        // Click Edit
        fireEvent.click(screen.getByText(/Edit/i));

        // Change Name
        const nameInput = screen.getByDisplayValue('Original Bank Name');
        fireEvent.change(nameInput, { target: { value: 'New Bank Name' } });

        // Click Save
        fireEvent.click(screen.getByText(/Save/i));

        await waitFor(() => {
            expect(setQuestionBank).toHaveBeenCalled();
        });
    });

    it('should trigger AI Processing from file preview', async () => {
        render(
            <MemoryRouter>
                <BankEditSection
                    questionBank={mockBank as any}
                    setQuestionBank={setQuestionBank}
                    onStartAiProcessing={onStartAiProcessing}
                />
            </MemoryRouter>
        );

        // 1. Click on the file to open preview
        fireEvent.click(screen.getByText('test.pdf'));

        // 2. Click "AI Generation" button (mocking FilePreviewDialog headerActions side)
        const aiBtn = screen.getByText(/AI Generation/i);
        fireEvent.click(aiBtn);

        // 3. Verify dialog shows up and select "Extract Questions"
        expect(screen.getByText(/Extract Questions/i)).toBeInTheDocument();

        // 4. Confirm Process
        fireEvent.click(screen.getByText(/Process File/i));

        expect(onStartAiProcessing).toHaveBeenCalledWith('f-1', 'parse');
    });
});
