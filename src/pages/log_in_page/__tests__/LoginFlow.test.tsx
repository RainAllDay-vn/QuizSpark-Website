import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LogInSection from '../log_in_section';

/* 
  TC-05: Login Flow Test
  
  Requirement: Valid credentials grant access; invalid credentials show error.
*/

// Mock Firebase
vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    GoogleAuthProvider: vi.fn(),
    signInWithPopup: vi.fn(),
}));

// Mock Firebase App
vi.mock('../../firebase.tsx', () => ({
    app: {},
}));

import { signInWithEmailAndPassword } from 'firebase/auth';

describe('Login Flow UI Tests', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should call signInWithEmailAndPassword when credentials are submitted', async () => {
        render(
            <MemoryRouter>
                <LogInSection />
            </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText(/name@example.com/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const loginButton = screen.getByRole('button', { name: /Log In/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
            expect.anything(),
            'test@example.com',
            'password123'
        );
    });

    it('should display error message when login fails', async () => {
        // Mock failure
        vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce(new Error('Firebase: Error (auth/invalid-credential).'));

        render(
            <MemoryRouter>
                <LogInSection />
            </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText(/name@example.com/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const loginButton = screen.getByRole('button', { name: /Log In/i });

        fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.getByText(/invalid-credential/i)).toBeInTheDocument();
        });
    });

    it('should show error if fields are empty', async () => {
        render(
            <MemoryRouter>
                <LogInSection />
            </MemoryRouter>
        );

        const loginButton = screen.getByRole('button', { name: /Log In/i });
        fireEvent.click(loginButton);

        expect(screen.getByText(/Please enter both email and password/i)).toBeInTheDocument();
        expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
    });
});
