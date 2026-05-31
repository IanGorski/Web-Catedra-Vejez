import { useState, useCallback, useRef } from 'react';
import {
    KNOWLEDGE_BASE,
    FALLBACK_RESPONSE,
    GREETING,
    type BotResponse,
} from '@/components/ChatBot/chatKnowledge';

export interface ChatMessage {
    id: number;
    from: 'user' | 'bot';
    text: string;
    links?: BotResponse['links'];
}

/** Normaliza texto: minúsculas + sin tildes */
function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export function useChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 0, from: 'bot', text: GREETING },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const findResponse = useCallback((input: string): BotResponse => {
        const normalized = normalize(input);
        return (
            KNOWLEDGE_BASE.find(entry =>
                entry.keywords.some(kw => normalized.includes(kw)),
            ) ?? FALLBACK_RESPONSE
        );
    }, []);

    const sendMessage = useCallback(
        (text: string) => {
            const trimmed = text.trim();
            if (!trimmed) return;

            const userMsg: ChatMessage = { id: Date.now(), from: 'user', text: trimmed };
            setMessages(prev => [...prev, userMsg]);
            setIsTyping(true);

            // Cancelar timer previo si el usuario escribe rápido
            if (typingTimer.current) clearTimeout(typingTimer.current);

            typingTimer.current = setTimeout(() => {
                const match = findResponse(trimmed);
                const botMsg: ChatMessage = {
                    id: Date.now() + 1,
                    from: 'bot',
                    text: match.response,
                    links: match.links,
                };
                setMessages(prev => [...prev, botMsg]);
                setIsTyping(false);
            }, 750);
        },
        [findResponse],
    );

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(v => !v), []);

    return { isOpen, open, close, toggle, messages, isTyping, sendMessage };
}
