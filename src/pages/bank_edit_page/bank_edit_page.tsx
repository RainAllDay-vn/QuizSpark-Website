import Loader from '@/components/custom/loader';
import BankEditSection from '@/pages/bank_edit_page/bank_edit_section';
import QuestionEditSection from '@/pages/bank_edit_page/question_edit_section';
import {Button} from '@/components/ui/button';
import {getQuestionBank} from '@/lib/api';
import type {Question} from '@/model/Question';
import type {QuestionBank} from '@/model/QuestionBank';
import {ChevronLeft, Eye} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

export default function BankEditPage() {
  const {bankId} = useParams<{ bankId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questionBank, setQuestionBank] = useState<QuestionBank | null>(null);

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
  }, [bankId]);

  const handleBankUpdated = (updatedBank: QuestionBank) => {
    setQuestionBank(updatedBank);
  };

  const handleQuestionsUpdated = (updatedQuestions: Question[]) => {
    if (!questionBank) return;
    setQuestionBank({...questionBank, questions: updatedQuestions});
  };

  if (loading) return <Loader/>

  return (
    <div className="min-h-screen bg-black text-white w-full">
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
          onBankUpdated={handleBankUpdated}
        />

        {/* Quiz Questions Section */}
        <QuestionEditSection
          questionBank={questionBank}
          onQuestionsUpdated={handleQuestionsUpdated}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]">
            <ChevronLeft className="w-4 h-4 mr-2"/>
            Back
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            <Eye className="w-4 h-4 mr-2"/>
            Preview & Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
