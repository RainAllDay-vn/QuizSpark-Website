import {Button} from '@/components/ui/button';
import {overwriteQuestion} from '@/lib/api';
import type QuestionCreationDTO from '@/dtos/QuestionCreationDTO';
import type {Question} from '@/model/Question';
import type {QuestionBank} from '@/model/QuestionBank';
import {Plus, Upload} from 'lucide-react';
import {useState, useRef, useCallback} from 'react';
import * as React from "react";
import QuestionCard from "@/pages/bank_edit_page/question_card.tsx";

export default function QuestionEditSection({questionBank}: {questionBank: QuestionBank}) {
  const [questions, setQuestions] = useState(questionBank.questions);
  const [newQuestion, setNewQuestion] = useState<Question | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleImportFromJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    setImportError(null);

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      if (!Array.isArray(jsonData)) {
        console.error('Import error:', 'JSON file must contain an array of questions');
        setImportError('JSON file must contain an array of questions');
        setIsImporting(false);
        return;
      }

      // Validate each question
      const questionsToImport: QuestionCreationDTO[] = jsonData.map(q => {
        return {
          questionType: q.questionType,
          tags: q.tags || [],
          description: q.description,
          choices: q.choices,
          answer: q.answer,
          explanation: q.explanation
        };
      });
      // Call the API to overwrite all questions
      const updatedQuestions = await overwriteQuestion(questionBank.id, questionsToImport);
      setQuestions(updatedQuestions);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Import error:', error);
      setImportError(error instanceof Error ? error.message : 'Failed to import questions');
    } finally {
      setIsImporting(false);
    }
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: 'new', // Temporary ID for new questions
      description: '',
      choices: ['', '', ''], // Start with 3 empty choices
      answer: ['0'], // Default to first choice as string
      questionType: 'SINGLE_ANSWER',
      tags: []
    };
    setNewQuestion(newQuestion);
    scrollToBottom();
  };

  const handleAppendQuestion = useCallback((question: Question) => {
    setQuestions([...questions, question]);
  }, [questions]);

  const handleRemoveQuestion = useCallback((question: Question) => {
    if (question.id==='new') {
      setNewQuestion(null);
      return;
    }
    setQuestions(questions.filter(q => q.id !== question.id));
  }, [questions]);

  return (
    <div className="bg-[#0f0f10] border border-zinc-800 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Questions ({questions.length || 0})</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
          >
            <Upload className="w-4 h-4 mr-2"/>
            {isImporting ? 'Importing...' : 'Import JSON'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportFromJSON}
            className="hidden"
          />
          <Button
            variant="outline"
            className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
            onClick={handleAddQuestion}
          >
            <Plus className="w-4 h-4 mr-2"/>
            Add Question
          </Button>
        </div>
      </div>

      {/* Import Error Display */}
      {importError && (
        <div className="mb-4 bg-red-900/20 border border-red-700 rounded-lg p-4">
          <p className="text-red-200">{importError}</p>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q, index) =>
          <QuestionCard key={q.id} questionProp={q} bankId={questionBank.id} index={index} isEditingProp={false}
                        appendQuestion={handleAppendQuestion} removeQuestion={handleRemoveQuestion}/>
        )}
        {newQuestion && <QuestionCard questionProp={newQuestion} bankId={questionBank.id} index={0} isEditingProp={true}
                                      appendQuestion={handleAppendQuestion} removeQuestion={handleRemoveQuestion}/>}
      </div>

      {/* Add Question Button at Bottom */}
      {!newQuestion &&
          <div className="mt-6 border-2 border-dashed border-zinc-700 rounded-lg p-4 flex justify-center">
            <Button
                variant="outline"
                className="border-zinc-600 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
                onClick={handleAddQuestion}
            >
              <Plus className="w-4 h-4 mr-2"/>
              Add New Question
            </Button>
          </div>}
    </div>
  );
}