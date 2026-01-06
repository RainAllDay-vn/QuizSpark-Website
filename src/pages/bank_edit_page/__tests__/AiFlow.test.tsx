import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import AiProcessingStatus from '../ai_processing_status';

/* 
  TC-06: AI Processing UI Test
  
  Requirement: UI correctly handles the streaming states of AI generation.
*/

describe('AiProcessingStatus Component Tests', () => {

    it('should render analyzing state correctly', () => {
        render(<AiProcessingStatus stage="analyzing" />);
        expect(screen.getByText(/Analyzing Document/i)).toBeInTheDocument();
        expect(screen.getByText(/Extracting content and structure/i)).toBeInTheDocument();
    });

    it('should render thinking state correctly', () => {
        render(<AiProcessingStatus stage="thinking" />);
        expect(screen.getByText(/Processing/i)).toBeInTheDocument();
        expect(screen.getByText(/AI is analyzing your document/i)).toBeInTheDocument();
    });

    it('should render finish state correctly', () => {
        render(<AiProcessingStatus stage="finish" />);
        expect(screen.getByText(/Processing Complete/i)).toBeInTheDocument();
        expect(screen.getByText(/AI has finished generating questions/i)).toBeInTheDocument();
    });

    it('should render nothing for unknown stage', () => {
        const { container } = render(<AiProcessingStatus stage="idle" />);
        expect(container.firstChild).toBeNull();
    });
});
