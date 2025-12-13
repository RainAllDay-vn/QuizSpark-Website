import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type {PracticeQuestion} from "@/model/PracticeQuestion.ts";
import type QuestionComment from "@/model/Comment.ts";
import {formatRelativeTime} from "@/lib/utils.ts";
import { addComment, updateComment } from "@/lib/api.ts";
import type QuestionCommentCreationDTO from "@/dtos/QuestionCommentCreationDTO.ts";
import type QuestionCommentUpdateDTO from "@/dtos/QuestionCommentUpdateDTO.ts";
import MarkdownRenderer from "@/components/custom/markdown-renderer.tsx";
import useAuthStatus from "@/lib/use_auth_hook";

interface CommentSectionProps {
  question: PracticeQuestion;
  isVisible: boolean;
}

export default function CommentSection({ question, isVisible }: CommentSectionProps) {
  const {user} = useAuthStatus();
  const [comments, setComments] = useState<QuestionComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isAI, setIsAI] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [editingComment, setEditingComment] = useState<QuestionComment | null>(null);

  useEffect(() => {
    setComments(question.comments || []);
  }, [question]);


  const handleSubmitComment = async () => {
    if (newComment.trim() === "") return;
    const commentPayload: QuestionCommentCreationDTO = {
      comment: newComment,
      isAI: isAI,
      isAnswer: isAnswer,
    };
    const savedComment = await addComment(question.baseQuestionId, commentPayload);
    setComments([savedComment, ...comments]);
    setNewComment("");
    setIsAI(false);
    setIsAnswer(false);
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!editingComment) return;
    const commentPayload: QuestionCommentUpdateDTO = {
      comment: (newComment.length>0 && newComment!==editingComment.comment) ? newComment : undefined,
      isAI: isAI,
      isAnswer: isAnswer
    };
    try {
      const updatedComment = await updateComment(commentId, commentPayload);
      setComments(comments.map(comment =>
        comment.id === commentId ? updatedComment : comment
      ));
      setEditingComment(null);
      setNewComment("");
      setIsAI(false);
      setIsAnswer(false);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const startEditingComment = (comment: QuestionComment) => {
    setEditingComment(comment);
    setNewComment(comment.comment);
    setIsAI(comment.ai);
    setIsAnswer(comment.answer);
  };

  const cancelEditing = () => {
    setEditingComment(null);
    setNewComment("");
    setIsAI(false);
    setIsAnswer(false);
  };

  const isOwner = (item: any): boolean => {
    return 'ownerId' in item && item.ownerId===user?.userId;
  }

  const handleMarkAsAnswer = async (comment: QuestionComment) => {
    const commentPayload: QuestionCommentUpdateDTO = {
      isAnswer: !comment.answer
    };
    try {
      const updatedComment = await updateComment(comment.id, commentPayload);
      const newComments = comments.map(c =>
        c.id === comment.id ? updatedComment : c
      );
      question.comments = newComments;
      setComments(newComments);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <Card className="bg-gray-900/60 border border-gray-700 text-white mt-6">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3">Comments</h3>

        {/* New Comment Input */}
        {editingComment===null && 
          <div className="mb-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment about this question..."
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 resize-none"
              rows={3}
            />  
            {newComment && (
              <>
                <div className="mt-2 p-3 bg-gray-800/50 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Preview:</p>
                  <MarkdownRenderer
                    content={newComment}
                    className="text-gray-200 text-sm"
                  />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="ai-checkbox"
                    checked={isAI}
                    onCheckedChange={(checked) => setIsAI(checked as boolean)}
                    className="border-gray-600 data-[state=checked]:bg-purple-600"
                  />
                  <label htmlFor="ai-checkbox" className="text-sm text-gray-300 cursor-pointer">
                    Mark as AI
                  </label>
                </div>
              </>
            )}
            
            <div className="flex space-x-2 mt-2">
              <Button
                onClick={handleSubmitComment}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Post Comment
              </Button>
              {newComment && 
                <Button
                  onClick={cancelEditing}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Clear
                </Button>
              }
            </div>
          </div>
        }

        {/* Comments List */}
        <div className="space-y-3">
          {comments.length === 0 ? (
            <p className="text-gray-400 text-sm">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-gray-800/50 rounded-lg p-3">
                {editingComment !== comment && 
                  <>
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">{comment.ownerUsername}</span>
                        {comment.ai && (
                          <span className="px-2 py-1 text-xs bg-blue-600/20 text-blue-400 rounded">AI</span>
                        )}
                        {comment.answer && (
                          <span className="px-2 py-1 text-xs bg-green-600/20 text-green-400 rounded">Answer</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{formatRelativeTime(comment.createdDate)}</span>
                        {isOwner(question) && (
                          <Button
                            onClick={() => handleMarkAsAnswer(comment)}
                            variant="ghost"
                            size="sm"
                            className={`h-6 px-2 text-lg ${comment.answer ? 'hover:text-red-400' : 'hover:text-green-300'} text-gray-400`}
                            title={comment.answer ? "Unmark as answer" : "Mark as answer"}
                          >
                            {comment.answer ? "X" : "✓"}
                          </Button>
                        )}
                        {isOwner(comment) && editingComment!==comment && (
                          <Button
                            onClick={() => startEditingComment(comment)}
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                    <MarkdownRenderer
                      content={comment.comment}
                      className="text-gray-200 text-sm"
                    />
                  </>
                }
                {editingComment === comment && (
                  <div className="mt-3 pt-3">
                    <div className="flex flex-col space-y-2">
                      <div className="mt-2 p-3 bg-gray-800/50 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Preview:</p>
                        <MarkdownRenderer
                          content={newComment}
                          className="text-gray-200 text-sm"
                        />
                      </div>
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment about this question..."
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 resize-none"
                        rows={3}
                      />
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                          id="edit-ai-checkbox"
                          checked={isAI}
                          onCheckedChange={(checked) => setIsAI(checked as boolean)}
                          className="border-gray-600 data-[state=checked]:bg-purple-600"
                        />
                        <label htmlFor="edit-ai-checkbox" className="text-sm text-gray-300 cursor-pointer">
                          Mark as AI-generated
                        </label>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <Button
                          onClick={() => handleUpdateComment(comment.id)}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={cancelEditing}
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
