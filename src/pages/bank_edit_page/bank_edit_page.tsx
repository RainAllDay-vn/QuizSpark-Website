import Loader from '@/components/custom/loader';
import BankEditSection from '@/pages/bank_edit_page/bank_edit_section';
import QuestionEditSection from '@/pages/bank_edit_page/question_edit_section';
import { Button } from '@/components/ui/button';
import { getQuestionBank } from '@/lib/api';
import type { QuestionBank } from '@/model/QuestionBank';
import { overwriteQuestion, uploadFile } from '@/lib/api';
import type QuestionCreationDTO from '@/dtos/QuestionCreationDTO';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function BankEditPage() {
  const { bankId } = useParams<{ bankId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questionBank, setQuestionBank] = useState<QuestionBank>({} as QuestionBank);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [aiRequest, setAiRequest] = useState<{ fileId: string, operation: string } | null>(null);

  useEffect(() => {
    if (!bankId) {
      alert("This page doesn't exist")
      navigate("/home")
      return;
    }
    getQuestionBank(bankId)
      .then(bank => {
        setQuestionBank(bank);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load data:', error);
        setLoading(false);
      });
  }, [bankId, navigate]);

  if (loading) return <Loader />

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleStartAiProcessing = (fileId: string, operation: string) => {
    setAiRequest({ fileId, operation });
  };

  const handleUploadFile = async (file: File) => {
    if (!file || !bankId) return;
    setIsImporting(true);
    setImportError(null);

    try {
      if (file.type === 'application/json') {
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
        const updatedQuestions = await overwriteQuestion(bankId, questionsToImport);
        setQuestionBank(prev => ({ ...prev, questions: updatedQuestions }));
      } else {
        const newFile = await uploadFile(bankId, file);
        setQuestionBank(prev => ({
          ...prev,
          files: [...(prev.files || []), newFile]
        }));
      }
    } catch (error) {
      console.error('Upload error:', error);
      setImportError(error instanceof Error ? error.message : 'Failed to upload file');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white w-full relative">
      {/* Scroll to Bottom Button */}
      <Button
        onClick={scrollToBottom}
        className="fixed bottom-20 right-8 z-10 bg-zinc-800 hover:bg-zinc-700 rounded-full p-3"
        size="icon"
      >
        <ChevronDown className="h-5 w-5" />
      </Button>

      {/* Header Section */}
      <div className="border-b border-zinc-800 bg-[#0f0f10]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Edit Question Bank
          </h1>
          <p className="text-zinc-400 mt-2 max-w-lg">
            Manage questions, edit content and configure quiz settings
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Question Bank Metadata Section */}
        <BankEditSection
          questionBank={questionBank}
          setQuestionBank={setQuestionBank}
          onStartAiProcessing={handleStartAiProcessing}
        />

        {/* Quiz Questions Section */}
        <QuestionEditSection
          questions={questionBank.questions}
          bankId={questionBank.id}
          onUpload={handleUploadFile}
          isImporting={isImporting}
          aiRequest={aiRequest}
          importError={importError}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-end">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={() => navigate("/home/banks")}>
            Finish Editing
          </Button>
        </div>
      </div>
    </div>
  );
}
