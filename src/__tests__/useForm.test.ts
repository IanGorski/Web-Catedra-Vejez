import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useForm } from '@/hooks/useForm';

// Mock fetch para Formspree
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

// Mock showToast para no tener efectos secundarios
vi.mock('@/utils/toast', () => ({ showToast: vi.fn() }));

function buildForm(overrides: Record<string, string> = {}): HTMLFormElement {
  const form = document.createElement('form');
  form.id = 'test-form';

  const nameInput = document.createElement('input');
  nameInput.name = 'name';
  nameInput.required = true;
  nameInput.value = overrides.name ?? 'María García';

  const emailInput = document.createElement('input');
  emailInput.name = 'email';
  emailInput.type = 'email';
  emailInput.required = true;
  emailInput.value = overrides.email ?? 'test@example.com';

  const honeypot = document.createElement('input');
  honeypot.name = '_gotcha';
  honeypot.value = overrides._gotcha ?? '';

  form.appendChild(nameInput);
  form.appendChild(emailInput);
  form.appendChild(honeypot);
  document.body.appendChild(form);
  return form;
}

describe('useForm', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    mockFetch.mockReset();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('estado inicial es "idle"', () => {
    const { result } = renderHook(() => useForm('test-form', 'meengkoz'));
    expect(result.current.status).toBe('idle');
  });

  it('honeypot relleno: no hace fetch y no cambia estado', async () => {
    const form = buildForm({ _gotcha: 'spam-bot@evil.com' });
    const { result } = renderHook(() => useForm('test-form', 'meengkoz'));

    const fakeEvent = {
      preventDefault: vi.fn(),
      currentTarget: form,
    } as unknown as React.FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(fakeEvent);
    });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.status).toBe('idle');
  });

  it('campos requeridos vacíos: no hace fetch', async () => {
    const form = buildForm({ name: '', email: '' });
    const { result } = renderHook(() => useForm('test-form', 'meengkoz'));

    const fakeEvent = {
      preventDefault: vi.fn(),
      currentTarget: form,
    } as unknown as React.FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(fakeEvent);
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('envío exitoso → estado "ok"', async () => {
    const form = buildForm();
    mockFetch.mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useForm('test-form', 'meengkoz'));

    const fakeEvent = {
      preventDefault: vi.fn(),
      currentTarget: form,
    } as unknown as React.FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(fakeEvent);
    });

    expect(result.current.status).toBe('ok');
  });

  it('error del servidor → estado "error"', async () => {
    const form = buildForm();
    mockFetch.mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useForm('test-form', 'meengkoz'));

    const fakeEvent = {
      preventDefault: vi.fn(),
      currentTarget: form,
    } as unknown as React.FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleSubmit(fakeEvent);
    });

    expect(result.current.status).toBe('error');
  });

  it('durante el envío el estado es "loading"', async () => {
    const form = buildForm();
    let resolvePromise!: (v: Response) => void;
    mockFetch.mockReturnValueOnce(new Promise((r) => { resolvePromise = r; }));

    const { result } = renderHook(() => useForm('test-form', 'meengkoz'));
    const fakeEvent = {
      preventDefault: vi.fn(),
      currentTarget: form,
    } as unknown as React.FormEvent<HTMLFormElement>;

    // Iniciar submit sin resolver
    let submitPromise: Promise<void>;
    act(() => {
      submitPromise = result.current.handleSubmit(fakeEvent);
    });

    expect(result.current.status).toBe('loading');

    // Resolver y esperar
    await act(async () => {
      resolvePromise({ ok: true } as Response);
      await submitPromise;
    });
  });

  it('email inválido marca el campo como is-invalid en onBlur', () => {
    buildForm();
    const { result } = renderHook(() => useForm('test-form', 'meengkoz'));

    const emailInput = document.querySelector<HTMLInputElement>('input[type="email"]')!;
    emailInput.value = 'no-es-un-email';

    act(() => {
      result.current.onBlur({ currentTarget: emailInput } as React.FocusEvent<HTMLInputElement>);
    });

    expect(emailInput.classList.contains('is-invalid')).toBe(true);
  });

  it('email válido marca el campo como is-valid en onBlur', () => {
    buildForm();
    const { result } = renderHook(() => useForm('test-form', 'meengkoz'));

    const emailInput = document.querySelector<HTMLInputElement>('input[type="email"]')!;
    emailInput.value = 'valido@ejemplo.com';

    act(() => {
      result.current.onBlur({ currentTarget: emailInput } as React.FocusEvent<HTMLInputElement>);
    });

    expect(emailInput.classList.contains('is-valid')).toBe(true);
  });
});
