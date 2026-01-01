import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Play, Check, FileText, Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { QuestionBank } from "@/model/QuestionBank";
import type { Question } from "@/model/Question";
import type { DbFile } from "@/model/DbFile";
import { getQuestionBank, viewFile, downloadFile } from "@/lib/api";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/custom/loader";
import { formatRelativeTime } from "@/lib/utils";
import PracticeOptionsDialog from "@/components/custom/practice_options_dialog";
import MarkdownRenderer from "@/components/custom/markdown-renderer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function BankOverviewPage() {
  const { bankId } = useParams<{ bankId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questionBank, setQuestionBank] = useState<QuestionBank | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // File Preview State
  const [selectedFile, setSelectedFile] = useState<DbFile | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  useEffect(() => {
    if (!bankId) {
      alert("This page doesn't exist");
      navigate("/home");
      return;
    }

    getQuestionBank(bankId)
      .then(bank => {
        setQuestionBank(bank);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load question bank:', error);
        setLoading(false);
      });
  }, [bankId, navigate]);

  const handlePractice = () => {
    setIsDialogOpen(true);
  };

  const handleEdit = () => {
    if (questionBank) {
      navigate(`/edit/bank/${questionBank.id}`);
    }
  };

  const getQuestionTypeDisplay = (type: string) => {
    switch (type) {
      case "SINGLE_ANSWER": return "Single Answer";
      case "MULTIPLE_ANSWER": return "Multiple Answers";
      case "FILL_THE_BLANK": return "Fill in the Blank";
      case "OPEN_ANSWER": return "Open Answer";
      default: return type;
    }
  };

  const getFileStyle = (fileName: string, fileType: string) => {
    const normalizeType = fileType?.toLowerCase() || '';
    const normalizeName = fileName?.toLowerCase() || '';

    if (normalizeType.includes('pdf') || normalizeName.endsWith('.pdf')) {
      return 'bg-pink-950/40 border-pink-800 text-pink-200';
    }
    if (normalizeType.includes('word') || normalizeType.includes('document') || normalizeName.endsWith('.doc') || normalizeName.endsWith('.docx')) {
      return 'bg-blue-950/40 border-blue-800 text-blue-200';
    }
    return 'bg-zinc-800 border-zinc-700 text-zinc-300';
  };

  const handleFileClick = async (file: DbFile) => {
    if (!questionBank) return;
    setSelectedFile(file);

    // Only fetch content for PDFs
    if (file.fileType.includes('pdf') || file.fileName.toLowerCase().endsWith('.pdf')) {
      setIsLoadingPreview(true);
      try {
        const blob = await viewFile(questionBank.id, file.id);
        const url = URL.createObjectURL(blob);
        setFilePreviewUrl(url);
      } catch (error) {
        console.error("Failed to load file preview", error);
      } finally {
        setIsLoadingPreview(false);
      }
    } else {
      setFilePreviewUrl(null);
    }
  };

  const handleClosePreview = () => {
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
    setFilePreviewUrl(null);
    setSelectedFile(null);
  };

  const handleDownloadFile = async () => {
    if (!questionBank || !selectedFile) return;
    try {
      await downloadFile(questionBank.id, selectedFile.id);
    } catch (error) {
      console.error("Failed to download file", error);
    }
  };

  if (loading) return <Loader />;

  if (!questionBank) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Question Bank Not Found</h1>
          <Button onClick={() => navigate("/home")} className="bg-zinc-800 hover:bg-zinc-700">
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="border-b border-zinc-800 bg-[#0f0f10] px-6 py-8">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 w-fit px-2"
            >
              <ArrowLeft className="h-5 w-5" /> Go Back
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">
              {questionBank.name}
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 text-zinc-400 text-sm">
            <span>📘 {questionBank.numberOfQuestions} questions</span>
            {questionBank.rating && <span>⭐ {questionBank.rating} stars</span>}
            <span>👥 {questionBank.numberOfAttempts} completions</span>
            <span>🕒 Created {formatRelativeTime(questionBank.createdAt)}</span>
            <Badge
              variant={questionBank.status === "PUBLISHED" ? "default" : "secondary"}
              className={questionBank.status === "PUBLISHED"
                ? "bg-green-600 hover:bg-green-700"
                : questionBank.status === "DRAFT"
                  ? "bg-amber-600 hover:bg-amber-700 text-black"
                  : "bg-gray-600 hover:bg-gray-700"
              }
            >
              {questionBank.status}
            </Badge>
            {questionBank.access === "PRIVATE" && (
              <Badge variant="outline" className="border-orange-600 text-orange-400">
                Private Access
              </Badge>
            )}
            {questionBank.access === "PUBLIC" && (
              <Badge variant="outline" className="border-green-600 text-green-400">
                Public Access
              </Badge>
            )}
          </div>

          {questionBank.description && (
            <div className="text-zinc-400 mt-4 max-w-3xl">
              <MarkdownRenderer content={questionBank.description} />
            </div>
          )}

          {questionBank.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <h3 className="text-sm font-medium text-zinc-400 w-full mb-1">Tags:</h3>
              {questionBank.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-violet-900/30 text-violet-300 border-violet-800/50 hover:bg-violet-900/50 transition-colors px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {questionBank.files && questionBank.files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-zinc-400 mb-3">Attached Files:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {questionBank.files.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => handleFileClick(file)}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:opacity-80 transition-opacity ${getFileStyle(file.fileName, file.fileType)}`}
                  >
                    <div className="flex items-center min-w-0 overflow-hidden">
                      <FileText className="w-5 h-5 mr-3 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium truncate text-sm">{file.fileName}</p>
                        <p className="text-xs opacity-70">{new Date(file.uploadDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <Button
              onClick={handlePractice}
              className="bg-violet-600 hover:bg-violet-700"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Practice
            </Button>
            <Button
              onClick={handleEdit}
              variant="outline"
              className="border-zinc-700 text-white hover:bg-zinc-800"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Bank
            </Button>
          </div>
        </div>
      </div>

      {/* Practice Options Dialog */}
      {questionBank && (
        <PracticeOptionsDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          questionBank={questionBank}
        />
      )}

      {/* File Preview Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={(open) => !open && handleClosePreview()}>
        <DialogContent className="bg-[#151518] border-zinc-800 text-white max-w-5xl h-[90vh] flex flex-col p-0">
          <DialogHeader className="pl-6 pr-10 py-4 border-b border-zinc-800 flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="truncate pr-4">{selectedFile?.fileName}</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadFile}
              className="border-zinc-700 text-zinc-300 bg-transparent hover:bg-zinc-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </DialogHeader>
          <div className="flex-1 bg-[#0f0f10] w-full h-full overflow-hidden flex items-center justify-center relative">
            {isLoadingPreview ? (
              <div className="flex flex-col items-center justify-center text-zinc-400">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <p>Loading preview...</p>
              </div>
            ) : filePreviewUrl ? (
              <iframe
                src={filePreviewUrl}
                className="w-full h-full border-none"
                title="File Preview"
              />
            ) : (
              <div className="text-center p-8 text-zinc-400">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-white mb-2">Preview not available</h3>
                <p className="max-w-md mx-auto mb-6">
                  This file type cannot be previewed in the browser.
                  Please download the file to view it.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Questions Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Questions</h2>
        <div className="space-y-6">
          {questionBank.questions.map((question: Question, index: number) => (
            <Card key={question.id} className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    <span className="text-sm font-medium text-violet-400 mr-3">#{index + 1}</span>
                    <MarkdownRenderer content={question.description} />
                  </CardTitle>
                  <div className="flex items-center gap-2 shrink-0">
                    {question.totalAttempts !== undefined && question.totalAttempts > 0 && (
                      <Badge
                        variant="outline"
                        className={`${question.correctAttempts !== undefined && question.totalAttempts > 0
                            ? (question.correctAttempts / question.totalAttempts) >= 0.7
                              ? "border-green-700 text-green-400"
                              : (question.correctAttempts / question.totalAttempts) >= 0.4
                                ? "border-amber-700 text-amber-400"
                                : "border-red-700 text-red-400"
                            : "border-zinc-700 text-zinc-300"
                          }`}
                      >
                        {question.correctAttempts ?? 0}/{question.totalAttempts} correct
                        {question.totalAttempts > 0 && (
                          <span className="ml-1 opacity-70">
                            ({Math.round(((question.correctAttempts ?? 0) / question.totalAttempts) * 100)}%)
                          </span>
                        )}
                      </Badge>
                    )}
                    <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                      {getQuestionTypeDisplay(question.questionType)}
                    </Badge>
                  </div>
                </div>

                {question.tags && question.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {question.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-violet-900/30 text-violet-300 border-violet-800/50 hover:bg-violet-900/50 transition-colors px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Choices:</h4>
                    <div className="space-y-2">
                      {question.choices.map((choice, choiceIndex) => {
                        const isCorrect = question.answer.includes(choiceIndex.toString());

                        const containerClasses = isCorrect
                          ? "bg-green-900/30 border border-green-700"
                          : "bg-zinc-800 border border-zinc-700";

                        const indicatorClasses = isCorrect
                          ? "border-green-500 bg-green-500"
                          : "border-zinc-600";

                        return (
                          <div
                            key={choiceIndex}
                            className={`flex items-center space-x-2 p-2 rounded ${containerClasses}`}
                            aria-checked={isCorrect}
                            role="option"
                          >
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${indicatorClasses}`}
                            >
                              {isCorrect && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="text-zinc-200"
                              aria-label={isCorrect ? `Correct choice: ${choice}` : choice}>
                              <MarkdownRenderer content={choice} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div >
  );
}
