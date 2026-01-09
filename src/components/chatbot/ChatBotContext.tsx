import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface ChatContextItem {
    id: string;
    content: string;
    title: string;
    metadata?: Record<string, any>;
}

export interface ChatTool {
    name: string;
    description: string;
    parameters: any; // Simplified for now, could be JSON Schema
    call: (args: any) => Promise<any>;
}

export interface ChatWorkflow {
    id: string;
    name: string;
    description: string;
    run: () => void | Promise<void>;
}

interface ChatBotContextType {
    contexts: ChatContextItem[];
    tools: ChatTool[];
    workflows: ChatWorkflow[];
    isTtsEnabled: boolean;
    setIsTtsEnabled: (enabled: boolean) => void;
    registerContext: (item: ChatContextItem) => () => void;
    unregisterContext: (id: string) => void;
    registerTool: (tool: ChatTool) => () => void;
    unregisterTool: (name: string) => void;
    registerWorkflow: (workflow: ChatWorkflow) => () => void;
    unregisterWorkflow: (id: string) => void;
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

export function ChatBotProvider({ children }: { children: React.ReactNode }) {
    const [contexts, setContexts] = useState<ChatContextItem[]>([]);
    const [tools, setTools] = useState<ChatTool[]>([]);
    const [workflows, setWorkflows] = useState<ChatWorkflow[]>([]);
    const [isTtsEnabled, setIsTtsEnabled] = useState(() => {
        return localStorage.getItem('chatbot-tts-enabled') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('chatbot-tts-enabled', isTtsEnabled.toString());
    }, [isTtsEnabled]);

    const registerContext = useCallback((item: ChatContextItem) => {
        setContexts(prev => {
            // If already exists, replace it, otherwise add
            const filtered = prev.filter(c => c.id !== item.id);
            return [...filtered, item];
        });
        return () => unregisterContext(item.id);
    }, []);

    const unregisterContext = useCallback((id: string) => {
        setContexts(prev => prev.filter(c => c.id !== id));
    }, []);

    const registerTool = useCallback((tool: ChatTool) => {
        setTools(prev => {
            const filtered = prev.filter(t => t.name !== tool.name);
            return [...filtered, tool];
        });
        return () => unregisterTool(tool.name);
    }, []);

    const unregisterTool = useCallback((name: string) => {
        setTools(prev => prev.filter(t => t.name !== name));
    }, []);

    const registerWorkflow = useCallback((workflow: ChatWorkflow) => {
        setWorkflows(prev => {
            const filtered = prev.filter(w => w.id !== workflow.id);
            return [...filtered, workflow];
        });
        return () => unregisterWorkflow(workflow.id);
    }, []);

    const unregisterWorkflow = useCallback((id: string) => {
        setWorkflows(prev => prev.filter(w => w.id !== id));
    }, []);

    return (
        <ChatBotContext.Provider value={{
            contexts,
            tools,
            workflows,
            isTtsEnabled,
            setIsTtsEnabled,
            registerContext,
            unregisterContext,
            registerTool,
            unregisterTool,
            registerWorkflow,
            unregisterWorkflow
        }}>
            {children}
        </ChatBotContext.Provider>
    );
}

export function useChatBot() {
    const context = useContext(ChatBotContext);
    if (!context) {
        throw new Error('useChatBot must be used within a ChatBotProvider');
    }
    return context;
}

export function useChatContextRegistry(item?: ChatContextItem) {
    const { registerContext } = useChatBot();

    useEffect(() => {
        if (item) {
            return registerContext(item);
        }
    }, [item, registerContext]);

    return { registerContext };
}

export function useChatToolRegistry(tool?: ChatTool) {
    const { registerTool } = useChatBot();

    useEffect(() => {
        if (tool) {
            return registerTool(tool);
        }
    }, [tool, registerTool]);

    return { registerTool };
}

export function useChatWorkflowRegistry(workflow?: ChatWorkflow) {
    const { registerWorkflow } = useChatBot();

    useEffect(() => {
        if (workflow) {
            return registerWorkflow(workflow);
        }
    }, [workflow, registerWorkflow]);

    return { registerWorkflow };
}
