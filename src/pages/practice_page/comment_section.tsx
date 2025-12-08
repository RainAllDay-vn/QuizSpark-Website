import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type {PracticeQuestion} from "@/model/PracticeQuestion.ts";

interface CommentSectionProps {
  question: PracticeQuestion;
  isVisible: boolean;
}

interface Comment {
  id: string;
  text: string;
  timestamp: Date;
}

export default function CommentSection({ question, isVisible }: CommentSectionProps) {
  // Sample comments for demonstration
  const sampleComments: Comment[] = [
    {
      id: "1",
      text: "This question really made me think about the concept in a different way. The multiple choice options were well-designed!",
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: "2",
      text: "I initially chose option B but realized it was incorrect after reviewing the explanation. Great question for testing understanding.",
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      id: "3",
      text: "Could someone explain why option C is the correct answer? I thought D would be better based on my understanding.",
      timestamp: new Date(Date.now() - 10800000) // 3 hours ago
    }
  ];
  
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    if (newComment.trim() === "") return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      timestamp: new Date()
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isVisible) return null;

  return (
    <Card className="bg-gray-900/60 border border-gray-700 text-white mt-6">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3">Comments</h3>

        {/* New Comment Input */}
        <div className="mb-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment about this question..."
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 resize-none"
            rows={3}
          />
          <Button 
            onClick={handleSubmitComment}
            className="mt-2 bg-purple-600 hover:bg-purple-700 text-white"
          >
            Post Comment
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-3">
          {comments.length === 0 ? (
            <p className="text-gray-400 text-sm">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm text-gray-400">User</span>
                  <span className="text-xs text-gray-500">{formatTime(comment.timestamp)}</span>
                </div>
                <p className="text-gray-200 text-sm">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
