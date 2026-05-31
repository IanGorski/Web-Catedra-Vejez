import { useState, useCallback, FormEvent } from 'react';
import { showToast } from '@/utils/toast';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function validateField(field: FieldEl): boolean {
  const value = field.value.trim();
  let valid = true;
  if ((field as HTMLInputElement).required && !value) valid = false;
  if (field.type === 'email' && value && !EMAIL_RE.test(value)) valid = false;
  if (field.type === 'tel' && value && !/^[\d\s+\-()]{6,20}$/.test(value)) valid = false;
  field.classList.toggle('is-invalid', !valid);
  field.classList.toggle('is-valid', valid && !!value);
  return valid;
}

async function submitToFormspree(form: HTMLFormElement, id: string): Promise<boolean> {
  const res = await fetch(`https://formspree.io/f/${id}`, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' },
  });
  return res.ok;
}

export type FormStatus = 'idle' | 'loading' | 'ok' | 'warn' | 'error';

export interface UseFormReturn {
  status: FormStatus;
  statusMsg: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onBlur: (e: React.FocusEvent<FieldEl>) => void;
  onInput: (e: React.FormEvent<FieldEl>) => void;
}

export function useForm(formId: string, formspreeId: string): UseFormReturn {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const onBlur = useCallback((e: React.FocusEvent<FieldEl>) => {
    validateField(e.currentTarget);
  }, []);

  const onInput = useCallback((e: React.FormEvent<FieldEl>) => {
    const field = e.currentTarget;
    if (field.classList.contains('is-invalid')) validateField(field);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;

      // Honeypot check
      const honeypot = form.querySelector<HTMLInputElement>('[name="_gotcha"]');
      if (honeypot?.value) return;

      const requiredFields = Array.from(
        form.querySelectorAll<FieldEl>('input[required], textarea[required]')
      );
      const allValid = requiredFields.every((f) => validateField(f));
      if (!allValid) return;

      setStatus('loading');
      setStatusMsg('');

      try {
        if (!formspreeId || formspreeId.startsWith('YOUR_')) {
          await new Promise((r) => setTimeout(r, 800));
          throw new Error('dev-placeholder');
        }

        const ok = await submitToFormspree(form, formspreeId);
        if (!ok) throw new Error('server-error');

        form.reset();
        requiredFields.forEach((f) => f.classList.remove('is-valid', 'is-invalid'));
        setStatus('ok');
        setStatusMsg('¡Mensaje enviado! Nos ponemos en contacto a la brevedad.');
        showToast('¡Formulario enviado correctamente!');
      } catch (err) {
        const msg = err instanceof Error ? err.message : '';
        if (msg === 'dev-placeholder') {
          setStatus('warn');
          setStatusMsg('[Modo desarrollo] Formulario válido. Configurá el ID de Formspree para envíos reales.');
        } else {
          setStatus('error');
          setStatusMsg('Hubo un problema al enviar. Intentá de nuevo o escribinos por mail.');
        }
      }
    },
    [formId, formspreeId]
  );

  return { status, statusMsg, handleSubmit, onBlur, onInput };
}
