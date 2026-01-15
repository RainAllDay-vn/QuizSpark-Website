import { Button } from '@/components/ui/button';
import useAuthStatus from "@/lib/use_auth_hook.ts";
import { useEffect, useState } from "react";
import type { Practice } from "@/model/Practice.ts";
import Loader from "@/components/custom/loader.tsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getPractice, startNewAnonymousPractice } from "@/lib/api.ts";
import EndlessPracticeSection from './endless_practice_section';

export default function EndlessPracticePage() {
  const navigate = useNavigate();
  const { practiceId } = useParams();
  const [params] = useSearchParams();
  const { user, loading: authLoading } = useAuthStatus();
  const [dataLoading, setDataLoading] = useState(true);
  const [practice, setPractice] = useState({} as Practice);
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchPractice = async () => {
      if (authLoading) return;
      if (user) {
        if (practiceId == null) {
          setError("INVALID PRACTICE PARAMETERS");
        } else {
          try {
            const newPractice = await getPractice(practiceId);
            setPractice(newPractice);
          } catch (e) {
            setError("FAILED TO FETCH PRACTICE");
          }
        }
      } else {
        const size = params.get("size");
        const shuffle = params.get("shuffle");
        const endless = params.get("endless");
        if (practiceId == null || size == null || shuffle == null) {
          setError("INVALID PRACTICE PARAMETERS");
        } else {
          try {
            const newPractice = await startNewAnonymousPractice(practiceId, parseInt(size), shuffle === 'true', endless === 'true');
            setPractice(newPractice);
          } catch (e) {
            setError("FAILED TO START ANONYMOUS PRACTICE");
          }
        }
      }
      setDataLoading(false)
    };
    fetchPractice();
  }, [practiceId, params, user, authLoading]);

  if (error) return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="text-xl font-semibold text-red-400 mb-4 animate-pulse">ERROR</div>
      <div className="text-gray-400 mb-8">{error}</div>
      <Button onClick={() => navigate(-1)} variant="outline" className="border-gray-700 text-gray-300">
        Go Back
      </Button>
    </div>
  );

  if (dataLoading || authLoading) return <Loader />

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
        <h1 className="text-xl font-semibold uppercase tracking-widest text-blue-400">Endless Practice</h1>
        <div className="w-36"></div> {/* Spacer to center the title */}
      </div>

      <div className="grow"></div>

      {/* === Content Section === */}
      <EndlessPracticeSection practice={practice} />

      <div className="grow"></div>
    </div>
  );
}
