import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ManageClasses from '../ManageClasses';

/* 
  TC-10: Manage Classes UI Test
  
  Requirement: Teacher can create a class and see the invite code.
*/

// Mock the API response
vi.mock('@/lib/api.ts', () => ({
    getClasses: vi.fn(() => Promise.resolve([
        { id: 'c-1', name: 'Mathematics', studentCount: 5 }
    ])),
    createClass: vi.fn((data) => Promise.resolve({ id: 'c-2', ...data, inviteCode: 'MATH123' })),
    getInviteCode: vi.fn((classId) => Promise.resolve({ inviteCode: 'MATH123' })),
}));

describe('ManageClasses Dashboard', () => {

    it('should render existing classes', async () => {
        render(<ManageClasses />);
        await waitFor(() => {
            expect(screen.getByText(/Mathematics/i)).toBeInTheDocument();
            expect(screen.getByText(/5 Students/i)).toBeInTheDocument();
        });
    });

    it('should allow creating a new class and displaying the invite code', async () => {
        render(<ManageClasses />);

        // 1. Open Create Dialog
        fireEvent.click(screen.getByText(/Create Class/i));

        // 2. Fill Form
        fireEvent.change(screen.getByLabelText(/Class Name/i), { target: { value: 'Physics' } });
        fireEvent.click(screen.getByText(/Confirm/i));

        // 3. Verify Invite Code visibility
        await waitFor(() => {
            expect(screen.getByText(/Invite Code/i)).toBeInTheDocument();
            expect(screen.getByText(/MATH123/)).toBeInTheDocument();
        });
    });
});
