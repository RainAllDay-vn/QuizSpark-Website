import Loader from '@/components/custom/loader';
import BankEditSection from '@/pages/bank_edit_page/bank_edit_section';
import QuestionEditSection from '@/pages/bank_edit_page/question_edit_section';
import {Button} from '@/components/ui/button';
import {getQuestionBank} from '@/lib/api';
import type {Question} from '@/model/Question';
import type {QuestionBank} from '@/model/QuestionBank';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ChevronDown} from 'lucide-react';

export default function BankEditPage() {
  const {bankId} = useParams<{ bankId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questionBank, setQuestionBank] = useState<QuestionBank>({} as QuestionBank);

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

  const handleQuestionsUpdated = (updatedQuestions: Question[]) => {
    if (!questionBank) return;
    setQuestionBank({...questionBank, questions: updatedQuestions});
  };

  if (loading) return <Loader/>

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
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
        />

        {/* Quiz Questions Section */}
        <QuestionEditSection
          questionBank={questionBank}
          onQuestionsUpdated={handleQuestionsUpdated}
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
