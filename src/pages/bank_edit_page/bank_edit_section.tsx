import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {updateQuestionBank, deleteQuestionBank} from '@/lib/api';
import type {QuestionBank} from '@/model/QuestionBank';
import type QuestionBankUpdateDTO from '@/dtos/QuestionBankUpdateDTO';
import {Save, Edit, Trash2} from 'lucide-react';
import {useState} from 'react';
import {Textarea} from "@/components/ui/textarea.tsx";

interface BankEditSectionProps {
  questionBank: QuestionBank | null;
  onBankUpdated: (updatedBank: QuestionBank) => void;
  onBankDeleted: () => void;
}

export default function BankEditSection({
  questionBank,
  onBankUpdated,
  onBankDeleted
}: BankEditSectionProps) {
  const [editingBank, setEditingBank] = useState<QuestionBank | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const handleEditBank = () => {
    if (questionBank) {
      setEditingBank({...questionBank});
    }
  };

  const handleSaveBank = async () => {
    if (!editingBank || !questionBank) return;

    try {
      const updateData: QuestionBankUpdateDTO = {
        name: editingBank.name,
        description: editingBank.description || '',
        access: editingBank.access,
        status: editingBank.status
      };
      
      const updatedBank = await updateQuestionBank(questionBank.id, updateData);
      onBankUpdated(updatedBank);
      setEditingBank(null);
    } catch (error) {
      console.error('Failed to update question bank:', error);
    }
  };

  const handleCancelBank = () => {
    setEditingBank(null);
  };

  const handleBankFieldChange = (field: keyof QuestionBank, value: string) => {
    if (!editingBank) return;
    setEditingBank({...editingBank, [field]: value});
  };

  const handleDeleteBank = () => {
    setShowDeleteWarning(true);
  };

  const confirmDeleteBank = async () => {
    if (!questionBank) return;

    setIsDeleting(true);
    try {
      await deleteQuestionBank(questionBank.id);
      onBankDeleted();
    } catch (error) {
      console.error('Failed to delete question bank:', error);
      alert('Failed to delete question bank. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteWarning(false);
    }
  };

  const cancelDeleteBank = () => {
    setShowDeleteWarning(false);
  };
  return (
    <div className="bg-[#0f0f10] border border-zinc-800 rounded-lg p-6 mb-6">
      {showDeleteWarning && (
        <div className="bg-red-900/20 border border-red-600 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 font-medium">Delete Question Bank</p>
              <p className="text-zinc-300 text-sm mt-1">
                Are you sure you want to delete "{questionBank?.name}"? This action cannot be undone.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-600 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
                onClick={cancelDeleteBank}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-red-600 text-red-400 bg-[#151518] hover:bg-red-900/20"
                onClick={confirmDeleteBank}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Question Bank Details</h2>
        {editingBank ? (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-green-600 text-green-400 bg-[#151518] hover:bg-green-900/20"
              onClick={handleSaveBank}
            >
              <Save className="w-4 h-4 mr-2"/>
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
              onClick={handleCancelBank}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
              onClick={handleEditBank}
            >
              <Edit className="w-4 h-4 mr-2"/>
              Edit
            </Button>
            {showDeleteWarning || 
              <Button
                variant="outline"
                size="sm"
                className="border-red-600 text-red-400 bg-[#151518] hover:bg-red-900/20"
                onClick={handleDeleteBank}
              >
                <Trash2 className="w-4 h-4 mr-2"/>
                Delete
              </Button>
            }
          </div>
        )}
      </div>

      {editingBank ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
            <Input
              value={editingBank.name}
              onChange={(e) => handleBankFieldChange('name', e.target.value)}
              className="bg-[#0f0f10] border border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-600"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
            <Textarea
              value={editingBank.description}
              onChange={(e) => handleBankFieldChange('description', e.target.value)}
              className="bg-[#0f0f10] border border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-600"
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Access</label>
            <Select
              value={editingBank.access}
              onValueChange={(value) => handleBankFieldChange('access', value)}
            >
              <SelectTrigger className="bg-[#0f0f10] border border-zinc-700 text-white focus-visible:ring-violet-600">
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f0f10] border border-zinc-700 text-white">
                <SelectItem value="PUBLIC">Public</SelectItem>
                <SelectItem value="PRIVATE">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Status</label>
            <Select
              value={editingBank.status}
              onValueChange={(value) => handleBankFieldChange('status', value)}
            >
              <SelectTrigger className="bg-[#0f0f10] border border-zinc-700 text-white focus-visible:ring-violet-600">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f0f10] border border-zinc-700 text-white">
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-zinc-400 mb-1">Name</p>
            <p className="text-white">{questionBank?.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-400 mb-1">Access</p>
            <p className="text-white">{questionBank?.access}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-400 mb-1">Status</p>
            <p className="text-white">{questionBank?.status}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-400 mb-1">Created</p>
            <p className="text-white">{questionBank && new Date(questionBank.createdAt).toLocaleDateString()}</p>
          </div>
          {questionBank?.description && (
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-zinc-400 mb-1">Description</p>
              <p className="text-white whitespace-pre-wrap">{questionBank.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}