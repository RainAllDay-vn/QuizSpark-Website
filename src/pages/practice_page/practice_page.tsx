import {Button} from '@/components/ui/button';
import useAuthStatus from "@/lib/use_auth_hook.ts";
import {useEffect, useState} from "react";
import type {Practice} from "@/model/Practice.ts";
import Loader from "@/components/custom/loader.tsx";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {finishPractice, getPractice, startNewAnonymousPractice} from "@/lib/api.ts";
import SummarySection from "@/pages/practice_page/summary_section.tsx";
import PracticeSection from './practice_section';
import ChatBot from './chat_bot';

export default function PracticePage() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [params] = useSearchParams();
  const {user} = useAuthStatus();
  const [loading, setLoading] = useState(true);
  const [practice, setPractice] = useState({} as Practice);
  const [error, setError] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchPractice = async () => {
      if (user) {
        if (id == null) {
          setError("INVALID PRACTICE PARAMETERS");
        } else {
          const newPractice = await getPractice(id);
          setPractice(newPractice);
        }
      } else {
        const size = params.get("size");
        const shuffle = params.get("shuffle");
        if (id == null || size == null || shuffle == null) {
          setError("INVALID PRACTICE PARAMETERS");
        } else {
          const newPractice = await startNewAnonymousPractice(id, parseInt(size), shuffle === 'true');
          setPractice(newPractice);
        }
      }
    };
    fetchPractice().then(() => setLoading(false));
  }, [id, params, user]);

  const completePractice = async () => {
    if (id === undefined) return;
    const practice = await finishPractice(id);
    setPractice(practice);
  }

  if (error) return <div>Error: {error}</div>;
  
  if (loading) return <Loader/>
  
  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* === Header === */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-6 relative z-10">
        <Button 
          onClick={() => user ? navigate("/home") : navigate('/')}
          variant="outline" 
          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          ← Back to Home
        </Button>
        <h1 className="text-xl font-semibold">PRACTICE</h1>
        <div className="w-36"></div> {/* Spacer to center the title */}
      </div>

      <div className="grow"></div>

      {/* === Content Section === */}
      {practice.closed
        ? <SummarySection practice={practice} />
        : <PracticeSection practice={practice} completePractice={completePractice} />
      }

      <div className="grow"></div>
      
      {/* Chat Bot Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-20"
        aria-label="Toggle chat bot"
      >
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      </button>
      
      {/* Chat Bot Component */}
      <ChatBot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}