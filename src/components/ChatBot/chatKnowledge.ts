export interface BotResponse {
    id: string;
    keywords: string[];
    response: string;
    links?: { label: string; href: string }[];
}

export const KNOWLEDGE_BASE: BotResponse[] = [
    {
        id: 'inscripcion',
        keywords: [
            'inscripci', 'inscribir', 'anotar', 'anotarme', 'sumarme',
            'acceder', 'diplomatura', 'posgrado', 'actualizacion', 'curso',
        ],
        response:
            'Las inscripciones a la Diplomatura en Recursos Psicogerontológicos y al Programa de Actualización en Psicología del Envejecimiento 2026 están abiertas. Ambas propuestas son 100 % virtuales y están dirigidas por la Facultad de Psicología (UBA).',
        links: [{ label: 'Ver propuestas de posgrado', href: '#posgrado' }],
    },
    {
        id: 'clinica',
        keywords: [
            'turno', 'atencion', 'terapeuta', 'psicologo', 'psicologa',
            'cartilla', 'derivaci', 'consulta', 'mayor', 'adulto', 'familia',
            'cuidador', 'tratamiento', 'ayuda psicologica',
        ],
        response:
            'La Cartilla Clínica de la Cátedra conecta a personas mayores, familias y cuidadores con profesionales especializados en vejez. Ofrecemos atención individual y grupal, modalidad presencial y virtual, con derivación a profesionales.',
        links: [{ label: 'Ver Cartilla Clínica', href: '#clinica' }],
    },
    {
        id: 'contacto',
        keywords: [
            'contacto', 'mail', 'email', 'escribir', 'comunicar',
            'telefono', 'mensaje', 'formulario', 'como llego', 'donde',
        ],
        response:
            'Podés contactarnos a través del formulario de contacto en el sitio o por nuestros medios de comunicación. Te respondemos a la brevedad.',
        links: [{ label: 'Ir a contacto', href: '#contacto' }],
    },
    {
        id: 'programa',
        keywords: [
            'programa', 'materia', 'bibliografi', 'cursada', 'horario',
            'examen', 'fecha', 'calendario', 'campus', 'aula',
        ],
        response:
            'El programa, bibliografía y calendario de cursada 2026 de la materia de grado están disponibles en la sección Materia de Grado.',
        links: [{ label: 'Ver recursos de la materia', href: '#estudiantes' }],
    },
    {
        id: 'estudiantes',
        keywords: [
            'estudiante', 'alumno', 'alumna', 'grado', 'carrera',
            'psicologia', 'uba', 'facultad', 'pasantia',
        ],
        response:
            'Si sos estudiante de Psicología UBA, en la sección Materia de Grado encontrás el programa, la bibliografía, el calendario y el acceso al campus virtual.',
        links: [{ label: 'Ver sección Estudiantes', href: '#estudiantes' }],
    },
    {
        id: 'equipo',
        keywords: [
            'iacub', 'docente', 'equipo', 'quien', 'profesor',
            'investigador', 'staff', 'personal',
        ],
        response:
            'La Cátedra está dirigida por el Dr. Ricardo Iacub y cuenta con un equipo de 55 docentes e investigadores especializados en psicogerontología.',
        links: [{ label: 'Conocer el equipo', href: '#equipo' }],
    },
    {
        id: 'investigacion',
        keywords: [
            'investigaci', 'ubacyt', 'proyecto', 'ciencia',
            'publicaci', 'articulo', 'libro', 'paper',
        ],
        response:
            'Contamos con proyectos UBACyT activos y más de 40 publicaciones científicas entre libros, capítulos y artículos sobre envejecimiento, vejez y psicogerontología.',
        links: [
            { label: 'Ver investigación', href: '#investigacion' },
            { label: 'Ver publicaciones', href: '#publicaciones' },
        ],
    },
    {
        id: 'agenda',
        keywords: [
            'evento', 'jornada', 'taller', 'seminario', 'actividad',
            'agenda', 'proximo', 'cuando', 'proximos eventos', 'novedades',
        ],
        response:
            'Próximos eventos: Jornada Anual de Psicogerontología 2026 (15 de mayo), Taller de Evaluación Neuropsicológica (20 de junio) y Seminario sobre Modelos de Cuidado (10 de julio).',
        links: [{ label: 'Ver agenda completa', href: '#agenda' }],
    },
    {
        id: 'noticias',
        keywords: [
            'noticia', 'novedad', 'boletin', 'news', 'actualidad', 'reciente',
        ],
        response:
            'Publicamos noticias sobre jornadas, nuevas investigaciones y convocatorias. Podés ver todas las novedades en la sección Noticias.',
        links: [{ label: 'Ver noticias', href: '#noticias' }],
    },
    {
        id: 'catedra',
        keywords: [
            'catedra', 'quienes son', 'que es', 'historia', 'mision',
            'pilar', 'objetivo', 'sobre', 'acerca', 'institución',
        ],
        response:
            'Somos la Cátedra de Psicología de la Tercera Edad y Vejez de la Facultad de Psicología (UBA), con más de 30 años de trayectoria. Nuestros pilares son: Educación, Profesionalización, Investigación, Clínica y Divulgación.',
        links: [{ label: 'Conocer la cátedra', href: '#nosotros' }],
    },
    {
        id: 'prensa',
        keywords: [
            'prensa', 'medios', 'television', 'radio', 'nota', 'entrevista',
            'diario', 'periodico', 'cobertura',
        ],
        response:
            'La Cátedra tiene presencia en medios gráficos, digitales, radio y televisión. Podés ver las apariciones en la sección Prensa y Medios.',
        links: [{ label: 'Ver prensa', href: '#prensa' }],
    },
    {
        id: 'recursos',
        keywords: [
            'recurso', 'material', 'descarga', 'pdf', 'video', 'guia',
            'herramienta', 'documento',
        ],
        response:
            'Tenemos materiales y recursos disponibles para estudiantes, profesionales y el público general en la sección Recursos.',
        links: [{ label: 'Ver recursos', href: '#recursos' }],
    },
];

/** Se usa cuando ninguna keyword coincide */
export const FALLBACK_RESPONSE: BotResponse = {
    id: 'fallback',
    keywords: [],
    response:
        'No tengo información sobre eso, pero con gusto te ayudamos personalmente. Escribinos y te respondemos a la brevedad.',
    links: [{ label: 'Ir a contacto', href: '#contacto' }],
};

/** Mensaje de bienvenida al abrir el chat */
export const GREETING =
    '¡Hola! Soy el asistente de la Cátedra Vejez UBA. ¿En qué puedo ayudarte?\n\nPodés preguntarme sobre inscripciones, la cartilla clínica, el equipo, la agenda, el programa de la materia o cualquier otra consulta.';

/** Respuestas rápidas sugeridas al inicio */
export const QUICK_REPLIES = [
    'Inscripciones a posgrado',
    'Solicitar turno clínico',
    'Programa de la materia',
    'Próximos eventos',
    'Contacto',
];
