import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Tag as TagIcon } from 'lucide-react';
import type { QuestionBank } from '@/model/QuestionBank';
import type Tag from '@/model/Tag';
import { addTag, updateTag, deleteTag as archiveTag } from '@/lib/api';
import type { TagCreationDTO } from '@/dtos/TagCreationDTO';
import type { TagUpdateDTO } from '@/dtos/TagUpdateDTO';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import TagDisplay from '@/components/custom/tag_display';

interface Props {
    questionBank: QuestionBank;
    setQuestionBank: React.Dispatch<React.SetStateAction<QuestionBank>>;
}

export default function TagManagementSection({ questionBank, setQuestionBank }: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTag, setEditingTag] = useState<Tag | null>(null);
    const [tagName, setTagName] = useState('');
    const [tagDescription, setTagDescription] = useState('');
    const [tagColor, setTagColor] = useState('#7c3aed'); // Default violet
    const [isLoading, setIsLoading] = useState(false);

    const openAddDialog = () => {
        setEditingTag(null);
        setTagName('');
        setTagDescription('');
        setTagColor('#7c3aed');
        setIsDialogOpen(true);
    };

    const openEditDialog = (tag: Tag) => {
        setEditingTag(tag);
        setTagName(tag.name);
        setTagDescription(tag.description || '');
        setTagColor(tag.color || '#7c3aed');
        setIsDialogOpen(true);
    };

    const handleSaveTag = async () => {
        if (!tagName.trim()) return;
        setIsLoading(true);

        try {
            if (editingTag) {
                const payload: TagUpdateDTO = {
                    name: tagName,
                    description: tagDescription,
                    color: tagColor
                };
                const updated = await updateTag(editingTag.id, payload);
                setQuestionBank(prev => ({
                    ...prev,
                    tags: prev.tags.map(t => t.id === updated.id ? updated : t)
                }));
            } else {
                const payload: TagCreationDTO = {
                    name: tagName,
                    description: tagDescription,
                    color: tagColor
                };
                const created = await addTag(questionBank.id, payload);
                setQuestionBank(prev => ({
                    ...prev,
                    tags: [...prev.tags, created]
                }));
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Failed to save tag:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTag = async (tagId: string) => {
        if (!window.confirm('Are you sure you want to delete this tag? It will be removed from all questions in this bank.')) return;

        try {
            await archiveTag(tagId);
            setQuestionBank(prev => ({
                ...prev,
                tags: prev.tags.filter(t => t.id !== tagId)
            }));
        } catch (error) {
            console.error('Failed to delete tag:', error);
        }
    };

    return (
        <div className="bg-[#0f0f10] border border-zinc-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                    <TagIcon className="w-5 h-5 mr-2 text-violet-400" />
                    Tags Management
                </h2>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
                    onClick={openAddDialog}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tag
                </Button>
            </div>

            <div className="space-y-3">
                {questionBank.tags && questionBank.tags.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {questionBank.tags.map(tag => (
                            <div key={tag.id} className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-[#151518] hover:border-zinc-700 transition-colors group">
                                <div className="flex flex-col min-w-0">
                                    <TagDisplay tags={[tag]} size="sm" />
                                    {tag.description && (
                                        <p className="text-xs text-zinc-500 mt-1 truncate">{tag.description}</p>
                                    )}
                                </div>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-zinc-400 hover:text-white"
                                        onClick={() => openEditDialog(tag)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-zinc-400 hover:text-red-400"
                                        onClick={() => handleDeleteTag(tag.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 border-2 border-dashed border-zinc-800 rounded-lg">
                        <TagIcon className="w-8 h-8 mx-auto text-zinc-600 mb-2 opacity-50" />
                        <p className="text-zinc-500">No tags created yet. Add tags to organize your questions.</p>
                    </div>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-[#151518] border-zinc-800 text-white">
                    <DialogHeader>
                        <DialogTitle>{editingTag ? 'Edit Tag' : 'Create New Tag'}</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            {editingTag ? 'Update the details for this tag.' : 'Add a new tag to organize your question bank.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <label className="text-sm font-medium text-zinc-400 mb-1 block">Tag Name</label>
                            <Input
                                value={tagName}
                                onChange={(e) => setTagName(e.target.value)}
                                placeholder="e.g. Mathematics, Hard, Chapter 1"
                                className="bg-[#0f0f10] border-zinc-700 text-white focus:ring-violet-600"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-zinc-400 mb-1 block">Description (Optional)</label>
                            <Textarea
                                value={tagDescription}
                                onChange={(e) => setTagDescription(e.target.value)}
                                placeholder="Brief description of the tag"
                                className="bg-[#0f0f10] border-zinc-700 text-white focus:ring-violet-600 resize-none h-20"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-zinc-400 mb-2 block">Tag Color</label>
                            <div className="flex flex-wrap gap-2">
                                {['#7c3aed', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#71717a'].map(color => (
                                    <button
                                        key={color}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform ${tagColor === color ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setTagColor(color)}
                                    />
                                ))}
                                <Input
                                    type="color"
                                    value={tagColor}
                                    onChange={(e) => setTagColor(e.target.value)}
                                    className="w-8 h-8 p-0 border-none bg-transparent overflow-hidden rounded-full inline-block cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                            className="border-zinc-700 text-zinc-300 bg-transparent hover:bg-zinc-800"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveTag}
                            disabled={!tagName.trim() || isLoading}
                            className="bg-violet-600 hover:bg-violet-700 text-white"
                        >
                            {isLoading ? (editingTag ? 'Updating...' : 'Creating...') : (editingTag ? 'Save Changes' : 'Create Tag')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
