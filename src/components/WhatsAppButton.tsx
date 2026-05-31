import type { FC } from 'react';

const WA_NUMBER = '5491156215140';
const WA_MESSAGE = encodeURIComponent(
  'Hola, me comunico desde el sitio web de la Cátedra de Psicología de la Tercera Edad y Vejez (UBA). Quisiera hacer una consulta.'
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const WhatsAppButton: FC = () => (
  <a
    href={WA_URL}
    className="whatsapp-fab"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactar por WhatsApp"
    title="Contactar por WhatsApp"
  >
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.65 4.8 1.785 6.81L2 30l7.418-1.743A13.93 13.93 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.5a11.43 11.43 0 0 1-5.83-1.594l-.418-.248-4.328 1.016.977-4.22-.272-.432A11.434 11.434 0 0 1 4.5 16.003C4.5 9.66 9.66 4.5 16.003 4.5c6.34 0 11.497 5.16 11.497 11.503S22.343 27.5 16.003 27.5zm6.34-8.544c-.347-.174-2.055-1.015-2.374-1.13-.32-.116-.553-.174-.786.174-.232.347-.9 1.13-1.104 1.364-.203.232-.406.26-.754.087-.347-.174-1.465-.54-2.79-1.722-1.03-.92-1.727-2.055-1.93-2.403-.203-.347-.022-.535.153-.708.156-.155.347-.405.52-.608.174-.203.232-.347.347-.58.116-.232.058-.435-.029-.608-.087-.174-.786-1.895-1.075-2.594-.283-.682-.572-.59-.786-.6-.203-.01-.435-.012-.667-.012-.232 0-.608.087-.927.435-.32.347-1.22 1.19-1.22 2.904s1.25 3.366 1.424 3.598c.174.232 2.461 3.758 5.963 5.27.834.36 1.485.574 1.992.735.837.266 1.599.228 2.201.138.671-.1 2.055-.84 2.346-1.65.29-.81.29-1.504.203-1.65-.087-.145-.32-.232-.667-.405z" />
    </svg>
  </a>
);

export default WhatsAppButton;
