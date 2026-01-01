import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';
import { useState, useCallback, useEffect, useRef } from 'react';

import QuestionCard from "@/pages/bank_edit_page/question_card.tsx";
import AiProcessingStatus from "@/pages/bank_edit_page/ai_processing_status";

import type { Question } from '@/model/Question';
import { parseAiFile, addAllQuestions } from '@/lib/api';
import type QuestionCreationDTO from '@/dtos/QuestionCreationDTO';

interface Props {
  questions: Question[];
  bankId: string;
  onUpload: (file: File) => void;
  isImporting: boolean;
  aiRequest?: { fileId: string, operation: string } | null;
  importError: string | null;
}

export default function QuestionEditSection({ questions: initialQuestions, bankId, onUpload, isImporting, aiRequest = null, importError }: Props) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [aiQuestions, setAiQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<Question | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const [processingStage, setProcessingStage] = useState<string | null>(null);

  useEffect(() => {
    if (statusRef.current) {
      statusRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiQuestions, processingStage]);

  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  useEffect(() => {
    if (aiRequest) {
      setProcessingStage("start");
      if (aiRequest.operation === "parse") {
        let index = 0;
        parseAiFile(aiRequest.fileId, (aiResponse) => {
          if (aiResponse.status === "thinking") {
            setProcessingStage("thinking");
          }
          if (aiResponse.status === "data") {
            if (!aiResponse.data) return;
            const newQuestion: Question = JSON.parse(aiResponse.data);
            newQuestion.id = "AI_" + index.toString();
            console.log(newQuestion);
            index++;
            setAiQuestions(prev => [...prev, newQuestion]);
          }
          if (aiResponse.status === "finish") {
            setProcessingStage("finish");
          }
        });
      }
    }
  }, [aiRequest]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
    // Always reset the input value so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
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
    if (question.id === 'new') {
      setNewQuestion(null);
      return;
    }
    setQuestions(questions.filter(q => q.id !== question.id));
  }, [questions]);

  const handleConfirmAiQuestions = async () => {
    if (aiQuestions.length === 0) return;

    try {
      const dtos: QuestionCreationDTO[] = aiQuestions.map(q => ({
        description: q.description,
        choices: q.choices,
        answer: q.answer,
        questionType: q.questionType,
        tags: q.tags || [],
        explanation: q.explanation
      }));

      const newQuestions = await addAllQuestions(bankId, dtos);
      setQuestions([...questions, ...newQuestions]);
      setAiQuestions([]);
      setProcessingStage(null);
    } catch (error) {
      console.error("Failed to add AI questions", error);
    }
  };

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
            <Upload className="w-4 h-4 mr-2" />
            {isImporting ? 'Uploading...' : 'Upload File'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />

          <Button
            variant="outline"
            className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
            onClick={handleAddQuestion}
          >
            <Plus className="w-4 h-4 mr-2" />
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
          <QuestionCard key={q.id} questionProp={q} bankId={bankId} index={index} isEditingProp={false}
            appendQuestion={handleAppendQuestion} removeQuestion={handleRemoveQuestion} />
        )}
        {newQuestion && <QuestionCard questionProp={newQuestion} bankId={bankId} index={0} isEditingProp={true}
          appendQuestion={handleAppendQuestion} removeQuestion={handleRemoveQuestion} />}
      </div>

      {/* Add Question Button at Bottom */}
      {!newQuestion && !processingStage &&
        <div className="mt-6 border-2 border-dashed border-zinc-700 rounded-lg p-4 flex justify-center">
          <Button
            variant="outline"
            className="border-zinc-600 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
            onClick={handleAddQuestion}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Question
          </Button>
        </div>}

      {processingStage && (
        <div className="mt-6 border-2 border-dashed border-zinc-700 rounded-lg p-4 flex flex-col justify-center">
          <div className="space-y-4">
            {aiQuestions.map((q, index) =>
              <QuestionCard key={q.id} questionProp={q} bankId={bankId} index={index} isEditingProp={false}
                appendQuestion={handleAppendQuestion} removeQuestion={handleRemoveQuestion} />
            )}
          </div>
          <div ref={statusRef} className="mt-12">
            <AiProcessingStatus stage={processingStage} />
            {processingStage === "finish" && (
              <div className="flex justify-center mt-4">
                <Button
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                  onClick={handleConfirmAiQuestions}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add All {aiQuestions.length} Questions to Bank
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}