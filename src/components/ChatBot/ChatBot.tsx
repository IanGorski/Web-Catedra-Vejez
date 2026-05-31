import { type FC, type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useChatBot } from '@/hooks/useChatBot';
import { QUICK_REPLIES } from './chatKnowledge';

/* Ícono */
const BotIcon: FC<{ size?: number }> = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h3a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h3V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2zm-4 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm8 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-4 5c-1.5 0-2.5-.67-3-1h6c-.5.33-1.5 1-3 1z" />
    </svg>
);

/* Ícono enviar */
const SendIcon: FC = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);

/* Ícono cerrar */
const CloseIcon: FC = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
);

const ChatBot: FC = () => {
    const { isOpen, toggle, close, messages, isTyping, sendMessage } = useChatBot();
    const [input, setInput] = useState('');
    const [showQuickReplies, setShowQuickReplies] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /* Scroll al último mensaje cada vez que cambia la lista */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    /* Focus en el input al abrir */
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 120);
        }
    }, [isOpen]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!input.trim()) return;
        setShowQuickReplies(false);
        sendMessage(input);
        setInput('');
    }

    function handleQuickReply(text: string) {
        setShowQuickReplies(false);
        sendMessage(text);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as FormEvent);
        }
    }

    /* Cerrar con Escape */
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: Event) => {
            if ((e as globalThis.KeyboardEvent).key === 'Escape') close();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, close]);

    return (
        <>
            {/* Burbuja flotante */}
            <button
                className={`chatbot-fab${isOpen ? ' chatbot-fab--open' : ''}`}
                onClick={toggle}
                aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente virtual'}
                title={isOpen ? 'Cerrar asistente' : '¿Necesitás ayuda?'}
            >
                <span className="chatbot-fab__icon chatbot-fab__icon--bot" aria-hidden="true">
                    <BotIcon size={26} />
                </span>
                <span className="chatbot-fab__icon chatbot-fab__icon--close" aria-hidden="true">
                    <CloseIcon />
                </span>
                {!isOpen && (
                    <span className="chatbot-fab__badge" aria-hidden="true">1</span>
                )}
            </button>

            {/* Ventana de chat */}
            <div
                className={`chatbot-window${isOpen ? ' chatbot-window--open' : ''}`}
                role="dialog"
                aria-label="Asistente virtual de la Cátedra Vejez UBA"
                aria-modal="false"
            >
                {/* Header */}
                <div className="chatbot-header">
                    <div className="chatbot-header__avatar" aria-hidden="true">
                        <BotIcon size={20} />
                    </div>
                    <div className="chatbot-header__info">
                        <span className="chatbot-header__name">Asistente Cátedra</span>
                        <span className="chatbot-header__status">
                            <span className="chatbot-header__dot" aria-hidden="true" />
                            En línea
                        </span>
                    </div>
                    <button
                        className="chatbot-header__close"
                        onClick={close}
                        aria-label="Cerrar asistente"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Mensajes */}
                <div className="chatbot-messages" role="log" aria-live="polite" aria-label="Conversación">
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            className={`chatbot-msg chatbot-msg--${msg.from}`}
                        >
                            {msg.from === 'bot' && (
                                <span className="chatbot-msg__avatar" aria-hidden="true">
                                    <BotIcon size={16} />
                                </span>
                            )}
                            <div className="chatbot-msg__bubble">
                                {/* Texto con saltos de línea */}
                                {msg.text.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        {i < msg.text.split('\n').length - 1 && <br />}
                                    </span>
                                ))}
                                {/* Links de acción */}
                                {msg.links && msg.links.length > 0 && (
                                    <div className="chatbot-msg__links">
                                        {msg.links.map(link => (
                                            <a
                                                key={link.href}
                                                href={link.href}
                                                className="chatbot-msg__link"
                                                onClick={close}
                                            >
                                                {link.label} →
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Indicador "escribiendo..." */}
                    {isTyping && (
                        <div className="chatbot-msg chatbot-msg--bot" aria-label="El asistente está escribiendo">
                            <span className="chatbot-msg__avatar" aria-hidden="true">
                                <BotIcon size={16} />
                            </span>
                            <div className="chatbot-msg__bubble chatbot-msg__bubble--typing">
                                <span className="chatbot-typing-dot" />
                                <span className="chatbot-typing-dot" />
                                <span className="chatbot-typing-dot" />
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Respuestas rápidas */}
                {showQuickReplies && messages.length === 1 && (
                    <div className="chatbot-quick-replies" role="group" aria-label="Preguntas frecuentes">
                        {QUICK_REPLIES.map(reply => (
                            <button
                                key={reply}
                                className="chatbot-quick-reply"
                                onClick={() => handleQuickReply(reply)}
                            >
                                {reply}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <form className="chatbot-form" onSubmit={handleSubmit} noValidate>
                    <input
                        ref={inputRef}
                        className="chatbot-input"
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Escribí tu consulta..."
                        maxLength={300}
                        aria-label="Escribí tu consulta"
                        autoComplete="off"
                    />
                    <button
                        className="chatbot-send"
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        aria-label="Enviar mensaje"
                    >
                        <SendIcon />
                    </button>
                </form>
            </div>
        </>
    );
};

export default ChatBot;
