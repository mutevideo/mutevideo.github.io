export const localeList = ['en', 'es', 'pt', 'de', 'fr', 'ja', 'zh', 'ru'] as const;
export type Locale = (typeof localeList)[number];
export const defaultLocale: Locale = 'en';

export const languages: Record<
  Locale,
  { code: string; nativeName: string; ogLocale: string; dir: 'ltr' | 'rtl' }
> = {
  en: { code: 'EN', nativeName: 'English', ogLocale: 'en_US', dir: 'ltr' },
  es: { code: 'ES', nativeName: 'Español', ogLocale: 'es_ES', dir: 'ltr' },
  pt: { code: 'PT', nativeName: 'Português', ogLocale: 'pt_BR', dir: 'ltr' },
  de: { code: 'DE', nativeName: 'Deutsch', ogLocale: 'de_DE', dir: 'ltr' },
  fr: { code: 'FR', nativeName: 'Français', ogLocale: 'fr_FR', dir: 'ltr' },
  ja: { code: 'JA', nativeName: '日本語', ogLocale: 'ja_JP', dir: 'ltr' },
  zh: { code: 'ZH', nativeName: '中文', ogLocale: 'zh_CN', dir: 'ltr' },
  ru: { code: 'RU', nativeName: 'Русский', ogLocale: 'ru_RU', dir: 'ltr' },
};

export interface UITranslations {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    brandTitle: string;
    homeAria: string;
    languageLabel: string;
    languageAria: string;
    themeToggleAria: string;
    themeToDark: string;
    themeToLight: string;
    githubAria: string;
    installPwa: string;
    installPwaAria: string;
    installedLabel: string;
    installModalTitle: string;
    installModalBody: string;
    installModalDesktop: string;
    installModalAndroid: string;
    installModalIos: string;
    installModalClose: string;
    supportDev: string;
    supportDevAria: string;
  };
  hero: {
    h1: string;
  };
  workspace: {
    step1: {
      dropTitle: string;
      dropTitleActive: string;
      dropSubtitle: string;
      selectBtn: string;
      formatsBadge: string;
      sampleBtn: string;
      sampleGenerating: string;
      privacyPill: string;
    };
    step2: {
      previewHeading: string;
      soundOnLabel: string;
      soundOffLabel: string;
      soundComparisonHint: string;
      changeFileBtn: string;
      modeSectionLabel: string;
      modeFullTitle: string;
      modeFullBadge: string;
      modeFullDesc: string;
      modeRangeTitle: string;
      modeRangeBadge: string;
      modeRangeDesc: string;
      startTimeLabel: string;
      endTimeLabel: string;
      mutedSegmentSummary: string;
      silentTrackLabel: string;
      silentTrackDesc: string;
      removeAudioBtn: string;
    };
    step3: {
      stageLoading: string;
      stageProbing: string;
      stageFullMute: string;
      stageRangeMute: string;
      stageFinalizing: string;
      privacyBadge: string;
      cancelBtn: string;
    };
    step4: {
      savedBadgePrefix: string;
      savedAmountPrefix: string;
      noAudioAlreadyNote: string;
      previewLabel: string;
      downloadBtn: string;
      muteAnotherBtn: string;
      coffeeTitle: string;
      coffeeDesc: string;
      coffeeCta: string;
    };
    errors: {
      unsupportedFile: string;
      invalidRange: string;
      processFailed: string;
    };
  };
  breadcrumbs: {
    ariaLabel: string;
    home: string;
    tools: string;
    current: string;
  };
  howTo: {
    title: string;
    subtitle: string;
    steps: Array<{ title: string; desc: string }>;
  };
  features: {
    title: string;
    items: Array<{ title: string; desc: string }>;
  };
  guides: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; desc: string }>;
  };
  comparison: {
    title: string;
    subtitle: string;
    colFeature: string;
    colOurs: string;
    colClideo: string;
    colCapcut: string;
    colCanva: string;
    rows: Array<{
      feature: string;
      ours: string;
      clideo: string;
      capcut: string;
      canva: string;
    }>;
  };
  faq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  footer: {
    tagline: string;
    privacyNote: string;
    copyright: string;
    githubLink: string;
    supportLink: string;
  };
}

export const ui: Record<Locale, UITranslations> = {
  en: {
    meta: {
      title: 'Remove Audio from Video Online — Mute Video Free',
      description:
        'Remove audio from MP4, iPhone MOV & TikTok/YouTube videos in 1 second. 100% free client-side video muter with zero uploads and no watermark.',
      keywords:
        'how to remove audio from video, remove audio from video free, how to remove audio from a video, remove audio from video online, iphone remove audio from video, remove audio from video iphone, remove audio from iphone video, remove audio from video online free, how to remove audio from youtube video, remove sound from video, how to remove audio from video iphone, how to remove audio from iphone video, mute audio from video, remove audio from mp4, remove audio track from video, how to mute video, mute audio, how to mute a video, mute youtube video, mute video iphone, mute video online, video mute online, how to mute youtube video, how to mute youtube, how to mute video sound, how to mute iphone video, how to mute a youtube video, how to mute video on iphone, mute video online free, how to mute video on tiktok, how to mute audio in a video, how to mute a video on iphone, how to mute sound in a video, how to mute a video on tiktok',
    },
    nav: {
      brandTitle: 'MuteVideo',
      homeAria: 'MuteVideo Home',
      languageLabel: 'Select Language',
      languageAria: 'Choose Interface Language',
      themeToggleAria: 'Toggle Light or Dark Theme',
      themeToDark: 'Switch to Dark Mode',
      themeToLight: 'Switch to Light Mode',
      githubAria: 'View MuteVideo on GitHub',
      installPwa: 'Add to Home Screen',
      installPwaAria: 'Add MuteVideo to Home Screen',
      installedLabel: 'App Installed',
      installModalTitle: 'Install MuteVideo App',
      installModalBody: 'Use MuteVideo offline as a lightweight desktop or mobile app with zero server tracking:',
      installModalDesktop: 'Chrome / Edge Desktop: Click the install icon inside your browser address bar.',
      installModalAndroid: 'Android Chrome: Tap the three-dot menu and choose "Add to Home screen" or "Install app".',
      installModalIos: 'iPhone / iPad Safari: Tap the Share button and select "Add to Home Screen".',
      installModalClose: 'Got it',
      supportDev: 'Support the Developer',
      supportDevAria: 'Support the Developer with a Coffee',
    },
    hero: {
      h1: 'Remove Audio from Video Online',
    },
    workspace: {
      step1: {
        dropTitle: 'Drop your video here to silence it',
        dropTitleActive: 'Release video to start muting',
        dropSubtitle: 'Instant lossless audio stripping or custom time-section mute inside your browser.',
        selectBtn: 'Select Video to Mute',
        formatsBadge: 'MP4 • MOV • WebM • MKV • AVI',
        sampleBtn: 'Try Sample Video',
        sampleGenerating: 'Generating sample clip...',
        privacyPill: 'Zero Server Uploads • 100% Original Quality • No Watermark',
      },
      step2: {
        previewHeading: 'Live Video Preview',
        soundOnLabel: 'Sound On (Original)',
        soundOffLabel: 'Sound Off (Muted Preview)',
        soundComparisonHint: 'Click to toggle sound and compare muted playback before exporting.',
        changeFileBtn: 'Change Video',
        modeSectionLabel: 'Choose Audio Removal Mode',
        modeFullTitle: 'Instant Full Mute',
        modeFullBadge: '1-Second Lossless Audio Removal • Default',
        modeFullDesc:
          'Strips the entire audio track immediately with zero video re-encoding. Keeps 100% original pixels and frame rate.',
        modeRangeTitle: 'Mute Specific Time Section',
        modeRangeBadge: 'Start / End Sliders',
        modeRangeDesc:
          'Silence only an awkward moment, wind burst, or voice clip between two timestamps while preserving the rest.',
        startTimeLabel: 'Mute Start',
        endTimeLabel: 'Mute End',
        mutedSegmentSummary: 'Silenced Window',
        silentTrackLabel: 'Keep silent audio track container',
        silentTrackDesc: 'Maintains a muted AAC track for strict social platforms like Instagram Reels or TikTok.',
        removeAudioBtn: 'Remove Audio Now',
      },
      step3: {
        stageLoading: 'Loading local FFmpeg WebAssembly engine...',
        stageProbing: 'Inspecting video & audio streams in browser RAM...',
        stageFullMute: 'Stripping Audio Stream Instantly...',
        stageRangeMute: 'Muting Selected Time Section...',
        stageFinalizing: 'Finalizing muted video container...',
        privacyBadge: '100% Local Browser RAM Processing — Zero Server Uploads, No Watermark',
        cancelBtn: 'Cancel',
      },
      step4: {
        savedBadgePrefix: 'Audio Removed • Video Quality 100% Untouched',
        savedAmountPrefix: 'Saved',
        noAudioAlreadyNote: 'Video Cleaned • Ready for Instant Download',
        previewLabel: 'Muted Video Ready',
        downloadBtn: 'Download Muted Video',
        muteAnotherBtn: 'Mute Another Video',
        coffeeTitle: 'Saved you time today?',
        coffeeDesc: 'MuteVideo runs 100% free with zero ads or watermarks. Support future updates with a coffee.',
        coffeeCta: 'Buy Developer a Coffee',
      },
      errors: {
        unsupportedFile: 'Please select a valid video file (MP4, MOV, WebM, MKV, or AVI).',
        invalidRange: 'Mute end time must be greater than mute start time.',
        processFailed: 'Could not process this video in browser memory. Try Instant Full Mute or another format.',
      },
    },
    breadcrumbs: {
      ariaLabel: 'Breadcrumb',
      home: 'Home',
      tools: 'Video Audio Tools',
      current: 'Mute Video Online',
    },
    howTo: {
      title: 'How to Remove Audio from a Video Online for Free',
      subtitle: 'Learn how to remove audio from a video in 3 steps with zero software downloads or uploads.',
      steps: [
        {
          title: '1. Select or Drop Your Video',
          desc: "Drop your MP4, iPhone MOV, or WebM file into the MuteVideo box (or click 'Select Video to Mute').",
        },
        {
          title: '2. Choose Full Mute or Time Range',
          desc: "Choose 'Instant Full Mute' to strip the entire audio track losslessly in 1 second, or select a specific time range to silence.",
        },
        {
          title: '3. Remove Audio & Download Instantly',
          desc: "Click 'Remove Audio Now' and immediately download your silent, watermark-free video.",
        },
      ],
    },
    features: {
      title: 'Built for Privacy, Speed, and Original Video Quality',
      items: [
        {
          title: '1-Second Lossless Audio Strip',
          desc: 'Full mute uses FFmpeg stream copy (-c copy -an) so video frames are copied untouched without re-encoding.',
        },
        {
          title: '100% Zero-Upload Privacy',
          desc: 'Every byte is processed inside your device RAM via WebAssembly. Private family clips or client videos never leave your screen.',
        },
        {
          title: 'Precision Time-Section Muting',
          desc: 'Silence background chatter, copyright music snippets, or wind noise between exact timestamps while keeping the rest audible.',
        },
        {
          title: 'Zero Watermarks & Offline Ready',
          desc: 'Export clean videos with no branding, no daily file limits, and installable PWA offline support.',
        },
      ],
    },
    guides: {
      title: 'How to Mute iPhone, YouTube, TikTok & MP4 Videos Online Free',
      subtitle: 'Everything you need to remove sound from video without watermark across mobile and desktop.',
      items: [
        {
          title: 'Remove Audio from Video on iPhone & Android (MOV / MP4)',
          desc: 'Wondering how to mute a video on iPhone without extra apps? Open MuteVideo in Safari or Chrome, choose any camera-roll MOV or MP4 clip, and remove audio from iPhone video locally in 1 second.',
        },
        {
          title: 'How to Mute YouTube, TikTok & Instagram Reels Videos',
          desc: 'Need to mute audio in a video before adding background music or fixing copyright audio? Strip the original sound or silence a specific time window for TikTok, Reels, and YouTube Shorts.',
        },
        {
          title: 'Remove Audio Track from MP4 Without Watermark (-c copy -an)',
          desc: 'Unlike cloud tools that re-compress footage, MuteVideo executes lossless stream copy (-c copy -an) to remove audio from MP4, WebM, MKV, and AVI while preserving 100% original video quality.',
        },
      ],
    },
    comparison: {
      title: 'MuteVideo vs. Clideo, CapCut Web & Canva',
      subtitle: 'See why mute video online free in browser RAM beats uploading files to Clideo, CapCut Web, or Canva.',
      colFeature: 'Capability',
      colOurs: 'MuteVideo (Local WASM)',
      colClideo: 'Clideo',
      colCapcut: 'CapCut Web',
      colCanva: 'Canva',
      rows: [
        {
          feature: 'Upload Waiting Time',
          ours: '0 seconds (Instant local RAM)',
          clideo: 'Slow cloud upload & queue',
          capcut: 'Account login & cloud sync',
          canva: 'Upload & project import wait',
        },
        {
          feature: 'Video Quality',
          ours: '100% Lossless (-c copy -an)',
          clideo: 'Re-encoded on server',
          capcut: 'Re-encoded on export',
          canva: 'Re-encoded / bit-rate capped',
        },
        {
          feature: 'Watermarks & Paywalls',
          ours: 'Zero Watermark • Free Forever',
          clideo: 'Watermark on free plan',
          capcut: 'Pro badges on export',
          canva: 'Pro tier for HD options',
        },
        {
          feature: 'Privacy & Data Security',
          ours: 'Never leaves your device',
          clideo: 'Uploaded to external servers',
          capcut: 'Stored in cloud workspace',
          canva: 'Uploaded to Canva servers',
        },
        {
          feature: 'Custom Time-Section Mute',
          ours: '1-Click Start / End Sliders',
          clideo: 'Full mute or manual split',
          capcut: 'Full timeline editor needed',
          canva: 'Manual track split needed',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'How do I remove audio from a video on iPhone or Android for free?',
          a: "Open MuteVideo in Safari or Chrome on your phone, tap 'Select Video to Mute' to pick a video from your camera roll, and tap 'Remove Audio Now'. The sound is stripped instantly inside your browser with zero uploads and no watermark.",
        },
        {
          q: 'Does muting a video reduce its video quality?',
          a: 'No! MuteVideo uses lossless stream copying (-c copy -an) to remove the audio track without re-encoding a single pixel of your video. Your exported video retains 100% of its original resolution and frame rate in under a second.',
        },
        {
          q: 'Why use MuteVideo instead of Clideo or Canva?',
          a: 'Cloud editors require you to upload large video files to remote servers, wait in queues, and pay to remove watermarks. MuteVideo processes your files 100% locally in your browser RAM—making it instant, completely private, and 100% free forever.',
        },
        {
          q: 'Can I mute only a specific part of a video?',
          a: 'Yes. Switch to "Mute Specific Time Section" after loading your video, set the Start and End sliders, and MuteVideo silences only that interval while preserving video stream quality.',
        },
        {
          q: 'Which video formats are supported?',
          a: 'You can drop MP4, MOV, WebM, MKV, AVI, M4V, and most standard mobile or desktop video recordings.',
        },
        {
          q: 'Why would I keep a silent audio track container?',
          a: 'Some social media uploaders or messaging apps expect an audio stream header even when silent. Keeping a silent track avoids upload errors while remaining 100% quiet.',
        },
      ],
    },
    footer: {
      tagline: 'MuteVideo — Instant, Lossless, 100% Client-Side Audio Removal',
      privacyNote: 'Zero Uploads • Processed Locally in Browser RAM',
      copyright: '© 2026 MuteVideo',
      githubLink: 'GitHub Repository',
      supportLink: 'Support the Developer',
    },
  },

  es: {
    meta: {
      title: 'Quitar Audio de Video Online — Silenciar Video Gratis',
      description:
        'Quita el audio de MP4, MOV de iPhone y videos de TikTok o YouTube en 1 segundo. 100% gratis en tu navegador, sin subidas ni marca de agua.',
      keywords:
        'quitar audio de un video, silenciar video online, quitar audio video iphone, eliminar sonido mp4, silenciar video tiktok, silenciar video youtube, sin marca de agua',
    },
    nav: {
      brandTitle: 'MuteVideo',
      homeAria: 'Inicio de MuteVideo',
      languageLabel: 'Seleccionar Idioma',
      languageAria: 'Elegir idioma de la interfaz',
      themeToggleAria: 'Cambiar tema claro u oscuro',
      themeToDark: 'Cambiar a modo oscuro',
      themeToLight: 'Cambiar a modo claro',
      githubAria: 'Ver MuteVideo en GitHub',
      installPwa: 'Añadir a Inicio',
      installPwaAria: 'Añadir MuteVideo a la pantalla de inicio',
      installedLabel: 'App Instalada',
      installModalTitle: 'Instalar App MuteVideo',
      installModalBody: 'Usa MuteVideo sin conexión como aplicación ligera sin rastreo ni servidores:',
      installModalDesktop: 'Chrome / Edge Escritorio: Haz clic en el icono de instalar en la barra de direcciones.',
      installModalAndroid: 'Android Chrome: Toca el menú de tres puntos y elige "Añadir a pantalla de inicio".',
      installModalIos: 'iPhone / iPad Safari: Toca Compartir y selecciona "Añadir a pantalla de inicio".',
      installModalClose: 'Entendido',
      supportDev: 'Apoyar al Desarrollador',
      supportDevAria: 'Apoyar al desarrollador con un café',
    },
    hero: {
      h1: 'Quitar Audio de un Video Online',
    },
    workspace: {
      step1: {
        dropTitle: 'Suelta tu video aquí para silenciarlo',
        dropTitleActive: 'Suelta el video para comenzar',
        dropSubtitle: 'Eliminación instantánea sin pérdida o silencio por tramo de tiempo en tu navegador.',
        selectBtn: 'Seleccionar Video para Silenciar',
        formatsBadge: 'MP4 • MOV • WebM • MKV • AVI',
        sampleBtn: 'Probar Video de Ejemplo',
        sampleGenerating: 'Generando clip de prueba...',
        privacyPill: 'Sin Subidas • Calidad 100% Original • Sin Marca de Agua',
      },
      step2: {
        previewHeading: 'Vista Previa en Vivo',
        soundOnLabel: 'Sonido Activado (Original)',
        soundOffLabel: 'Sonido Desactivado (Vista Silenciada)',
        soundComparisonHint: 'Haz clic para alternar el audio y comparar antes de exportar.',
        changeFileBtn: 'Cambiar Video',
        modeSectionLabel: 'Elige el Modo de Silencio',
        modeFullTitle: 'Silencio Total Instantáneo',
        modeFullBadge: 'Eliminación sin pérdida en 1 segundo • Predeterminado',
        modeFullDesc:
          'Elimina toda la pista de audio al instante sin recodificar el video. Conserva el 100% de la calidad original.',
        modeRangeTitle: 'Silenciar Sección de Tiempo',
        modeRangeBadge: 'Controles Inicio / Fin',
        modeRangeDesc:
          'Silencia solo un fragmento específico, ruido de viento o conversación manteniendo el resto del audio.',
        startTimeLabel: 'Inicio del Silencio',
        endTimeLabel: 'Fin del Silencio',
        mutedSegmentSummary: 'Tramo Silenciado',
        silentTrackLabel: 'Conservar pista de audio silenciosa',
        silentTrackDesc: 'Mantiene una pista AAC muda para mayor compatibilidad con Instagram Reels o TikTok.',
        removeAudioBtn: 'Eliminar Audio Ahora',
      },
      step3: {
        stageLoading: 'Cargando motor local FFmpeg WebAssembly...',
        stageProbing: 'Analizando pistas de video y audio en memoria RAM...',
        stageFullMute: 'Eliminando pista de audio al instante...',
        stageRangeMute: 'Silenciando el tramo de tiempo seleccionado...',
        stageFinalizing: 'Finalizando archivo de video silenciado...',
        privacyBadge: 'Procesamiento 100% Local en RAM del Navegador — Sin Subidas, Sin Marca de Agua',
        cancelBtn: 'Cancelar',
      },
      step4: {
        savedBadgePrefix: 'Audio Eliminado • Calidad de Video 100% Intacta',
        savedAmountPrefix: 'Ahorrado',
        noAudioAlreadyNote: 'Video Limpio • Listo para Descarga Instantánea',
        previewLabel: 'Video Silenciado Listo',
        downloadBtn: 'Descargar Video Silenciado',
        muteAnotherBtn: 'Silenciar Otro Video',
        coffeeTitle: '¿Te ahorró tiempo hoy?',
        coffeeDesc: 'MuteVideo es 100% gratis, sin anuncios ni marcas de agua. Apoya futuras mejoras con un café.',
        coffeeCta: 'Invitar un Café al Desarrollador',
      },
      errors: {
        unsupportedFile: 'Selecciona un archivo de video válido (MP4, MOV, WebM, MKV o AVI).',
        invalidRange: 'El tiempo de fin debe ser mayor que el tiempo de inicio.',
        processFailed: 'No se pudo procesar en memoria del navegador. Prueba Silencio Total o cambia el formato.',
      },
    },
    breadcrumbs: {
      ariaLabel: 'Ruta de navegación',
      home: 'Inicio',
      tools: 'Herramientas de Audio y Video',
      current: 'Silenciar Video Online',
    },
    howTo: {
      title: 'Cómo Quitar el Audio de un Video Online Gratis',
      subtitle: 'Sin instalar programas, sin registros y sin esperar subidas lentas.',
      steps: [
        {
          title: '1. Selecciona o Arrastra tu Video',
          desc: "Suelta tu archivo MP4, MOV de iPhone o WebM en MuteVideo (o haz clic en 'Seleccionar Video para Silenciar').",
        },
        {
          title: '2. Elige Silencio Total o Por Tramos',
          desc: "Elige 'Silencio Total Instantáneo' para quitar el audio sin pérdida en 1 segundo, o selecciona un tramo de tiempo.",
        },
        {
          title: '3. Elimina el Audio y Descarga al Instante',
          desc: "Haz clic en 'Eliminar Audio Ahora' y descarga de inmediato tu video mudo sin marca de agua.",
        },
      ],
    },
    features: {
      title: 'Diseñado para Privacidad, Velocidad y Calidad Original',
      items: [
        {
          title: 'Eliminación Sin Pérdida en 1 Segundo',
          desc: 'El modo completo usa copia directa de flujo (-c copy -an) sin recodificar los fotogramas.',
        },
        {
          title: 'Privacidad 100% Sin Subidas',
          desc: 'Todo se procesa en la RAM de tu dispositivo mediante WebAssembly. Tus videos nunca salen de tu pantalla.',
        },
        {
          title: 'Silencio Preciso por Intervalo',
          desc: 'Elimina ruido o voces entre dos marcas de tiempo exactas conservando el resto del audio.',
        },
        {
          title: 'Sin Marcas de Agua y PWA Offline',
          desc: 'Exportación limpia, sin límites diarios y compatible para instalar como aplicación web.',
        },
      ],
    },
    guides: {
      title: 'Cómo Silenciar Videos de iPhone, YouTube, TikTok y MP4 Gratis',
      subtitle: 'Todo lo necesario para quitar el sonido de un video sin marca de agua en móvil o PC.',
      items: [
        {
          title: 'Quitar Audio de Video en iPhone y Android (MOV / MP4)',
          desc: 'Abre MuteVideo en Safari o Chrome desde tu móvil, selecciona cualquier clip MOV o MP4 del carrete y elimina el audio en 1 segundo sin subir archivos.',
        },
        {
          title: 'Cómo Silenciar Videos de YouTube, TikTok e Instagram Reels',
          desc: 'Elimina el sonido ambiente antes de añadir música de fondo o silencia solo un tramo exacto para TikTok, Reels y YouTube Shorts.',
        },
        {
          title: 'Quitar Pista de Audio de MP4 Sin Marca de Agua (-c copy -an)',
          desc: 'MuteVideo usa copia directa (-c copy -an) para quitar el audio de MP4, WebM, MKV y AVI conservando el 100% de la calidad original.',
        },
      ],
    },
    comparison: {
      title: 'MuteVideo vs. Clideo, CapCut Web y Canva',
      subtitle: 'Por qué silenciar videos gratis en tu navegador supera a Clideo, CapCut Web y Canva.',
      colFeature: 'Capacidad',
      colOurs: 'MuteVideo (Local WASM)',
      colClideo: 'Clideo',
      colCapcut: 'CapCut Web',
      colCanva: 'Canva',
      rows: [
        {
          feature: 'Tiempo de Subida',
          ours: '0 segundos (RAM local)',
          clideo: 'Subida lenta y cola',
          capcut: 'Requiere cuenta y nube',
          canva: 'Espera al importar proyecto',
        },
        {
          feature: 'Calidad de Video',
          ours: '100% Sin Pérdida (-c copy -an)',
          clideo: 'Recodificado en servidor',
          capcut: 'Recodificado al exportar',
          canva: 'Recodificado con límite',
        },
        {
          feature: 'Marcas de Agua y Pagos',
          ours: 'Cero Marcas • Gratis Siempre',
          clideo: 'Marca en plan gratis',
          capcut: 'Funciones Pro al exportar',
          canva: 'Plan Pro para opciones HD',
        },
        {
          feature: 'Privacidad y Seguridad',
          ours: 'Nunca sale de tu dispositivo',
          clideo: 'Subido a servidores externos',
          capcut: 'Guardado en la nube',
          canva: 'Subido a servidores Canva',
        },
        {
          feature: 'Silencio por Tramo Horario',
          ours: 'Deslizadores Inicio / Fin',
          clideo: 'Total o corte manual',
          capcut: 'Requiere editor completo',
          canva: 'Requiere dividir pista',
        },
      ],
    },
    faq: {
      title: 'Preguntas Frecuentes',
      items: [
        {
          q: '¿Cómo quitar el audio de un video en iPhone o Android gratis?',
          a: "Abre MuteVideo en Safari o Chrome desde tu teléfono, pulsa 'Seleccionar Video para Silenciar' para elegir un video de tu galería y toca 'Eliminar Audio Ahora'. El sonido se elimina al instante en tu navegador sin subidas ni marca de agua.",
        },
        {
          q: '¿Silenciar un video reduce la calidad de imagen?',
          a: '¡No! MuteVideo usa copia directa sin pérdida (-c copy -an) para quitar la pista de audio sin recodificar ni un solo píxel. Tu video mantiene el 100% de su resolución y fotogramas.',
        },
        {
          q: '¿Por qué usar MuteVideo en lugar de Clideo o Canva?',
          a: 'Los editores en la nube te obligan a subir archivos pesados a servidores remotos, esperar colas y pagar para quitar marcas de agua. MuteVideo procesa 100% local en la RAM de tu navegador: instantáneo, privado y gratis siempre.',
        },
        {
          q: '¿Puedo silenciar solo unos segundos del video?',
          a: 'Sí. Selecciona "Silenciar Sección de Tiempo" y ajusta los deslizadores de inicio y fin.',
        },
        {
          q: '¿Qué formatos acepta MuteVideo?',
          a: 'Soporta MP4, MOV, WebM, MKV, AVI, M4V y la mayoría de videos grabados en móvil o PC.',
        },
        {
          q: '¿Para qué sirve conservar una pista de audio silenciosa?',
          a: 'Algunas aplicaciones sociales requieren que el contenedor tenga cabecera de audio aunque esté en silencio absoluto.',
        },
      ],
    },
    footer: {
      tagline: 'MuteVideo — Eliminación de Audio Instantánea, Sin Pérdida y 100% Local',
      privacyNote: 'Cero Subidas • Procesado Localmente en la RAM del Navegador',
      copyright: '© 2026 MuteVideo',
      githubLink: 'Repositorio GitHub',
      supportLink: 'Apoyar al Desarrollador',
    },
  },

  pt: {
    meta: {
      title: 'Tirar Áudio de Vídeo Online — Silenciar Vídeo Grátis',
      description:
        'Remova o áudio de vídeos MP4, iPhone MOV, TikTok e YouTube em 1 segundo. 100% grátis no navegador, sem uploads e sem marca d’água.',
      keywords:
        'tirar audio de video, remover audio de video online, tirar som de video iphone, remover audio mp4, mutar video tiktok, silenciar video youtube, sem marca dagua',
    },
    nav: {
      brandTitle: 'MuteVideo',
      homeAria: 'Início MuteVideo',
      languageLabel: 'Selecionar Idioma',
      languageAria: 'Escolher idioma da interface',
      themeToggleAria: 'Alternar tema claro ou escuro',
      themeToDark: 'Mudar para modo escuro',
      themeToLight: 'Mudar para modo claro',
      githubAria: 'Ver MuteVideo no GitHub',
      installPwa: 'Adicionar à Tela Inicial',
      installPwaAria: 'Instalar MuteVideo na tela inicial',
      installedLabel: 'App Instalado',
      installModalTitle: 'Instalar App MuteVideo',
      installModalBody: 'Use o MuteVideo offline como um app leve sem servidores nem rastreamento:',
      installModalDesktop: 'Chrome / Edge Desktop: Clique no ícone de instalação na barra de endereço.',
      installModalAndroid: 'Android Chrome: Toque no menu e escolha "Adicionar à tela inicial".',
      installModalIos: 'iPhone / iPad Safari: Toque em Compartilhar e escolha "Adicionar à Tela de Início".',
      installModalClose: 'Entendi',
      supportDev: 'Apoiar o Desenvolvedor',
      supportDevAria: 'Apoiar o desenvolvedor com um café',
    },
    hero: {
      h1: 'Remover Áudio de Vídeo Online',
    },
    workspace: {
      step1: {
        dropTitle: 'Solte seu vídeo aqui para silenciar',
        dropTitleActive: 'Solte o vídeo para começar',
        dropSubtitle: 'Remoção instantânea sem perdas ou silenciamento de trecho específico direto no navegador.',
        selectBtn: 'Selecionar Vídeo para Mutar',
        formatsBadge: 'MP4 • MOV • WebM • MKV • AVI',
        sampleBtn: 'Testar Vídeo de Exemplo',
        sampleGenerating: 'Gerando clipe de teste...',
        privacyPill: 'Zero Uploads • Qualidade 100% Original • Sem Marca d’Água',
      },
      step2: {
        previewHeading: 'Pré-visualização ao Vivo',
        soundOnLabel: 'Som Ligado (Original)',
        soundOffLabel: 'Som Desligado (Prévia Muda)',
        soundComparisonHint: 'Clique para alternar o som e comparar antes de exportar.',
        changeFileBtn: 'Trocar Vídeo',
        modeSectionLabel: 'Escolha o Modo de Remoção',
        modeFullTitle: 'Silêncio Total Instantâneo',
        modeFullBadge: 'Remoção sem perdas em 1 segundo • Padrão',
        modeFullDesc:
          'Remove toda a faixa de áudio instantaneamente sem recodificar o vídeo. Mantém 100% da qualidade original.',
        modeRangeTitle: 'Mutar Trecho Específico',
        modeRangeBadge: 'Controles Início / Fim',
        modeRangeDesc:
          'Silencie apenas um trecho com ruído, vento ou voz entre dois tempos mantendo o restante intacto.',
        startTimeLabel: 'Início do Silêncio',
        endTimeLabel: 'Fim do Silêncio',
        mutedSegmentSummary: 'Trecho Silenciado',
        silentTrackLabel: 'Manter faixa de áudio silenciosa',
        silentTrackDesc: 'Preserva uma trilha AAC muda para compatibilidade com Instagram Reels ou TikTok.',
        removeAudioBtn: 'Remover Áudio Agora',
      },
      step3: {
        stageLoading: 'Carregando motor local FFmpeg WebAssembly...',
        stageProbing: 'Analisando fluxos de vídeo e áudio na RAM...',
        stageFullMute: 'Removendo faixa de áudio instantaneamente...',
        stageRangeMute: 'Silenciando o trecho selecionado...',
        stageFinalizing: 'Finalizando arquivo de vídeo mudo...',
        privacyBadge: 'Processamento 100% Local na RAM do Navegador — Zero Uploads, Sem Marca d’Água',
        cancelBtn: 'Cancelar',
      },
      step4: {
        savedBadgePrefix: 'Áudio Removido • Qualidade de Vídeo 100% Intacta',
        savedAmountPrefix: 'Economizado',
        noAudioAlreadyNote: 'Vídeo Limpo • Pronto para Download Instantâneo',
        previewLabel: 'Vídeo Silenciado Pronto',
        downloadBtn: 'Baixar Vídeo Sem Áudio',
        muteAnotherBtn: 'Silenciar Outro Vídeo',
        coffeeTitle: 'Poupou seu tempo hoje?',
        coffeeDesc: 'O MuteVideo é 100% gratuito, sem anúncios ou marca d’água. Apoie com um café.',
        coffeeCta: 'Pagar um Café ao Dev',
      },
      errors: {
        unsupportedFile: 'Selecione um arquivo de vídeo válido (MP4, MOV, WebM, MKV ou AVI).',
        invalidRange: 'O tempo final deve ser maior que o tempo inicial.',
        processFailed: 'Não foi possível processar na memória do navegador. Tente Silêncio Total ou outro formato.',
      },
    },
    breadcrumbs: {
      ariaLabel: 'Navegação estrutural',
      home: 'Início',
      tools: 'Ferramentas de Áudio e Vídeo',
      current: 'Silenciar Vídeo Online',
    },
    howTo: {
      title: 'Como Remover Áudio de um Vídeo Online Grátis',
      subtitle: 'Sem instalar programas, sem cadastro e sem esperar envio de arquivos.',
      steps: [
        {
          title: '1. Escolha ou Arraste seu Vídeo',
          desc: "Solte seu arquivo MP4, MOV de iPhone ou WebM no MuteVideo (ou clique em 'Selecionar Vídeo para Mutar').",
        },
        {
          title: '2. Escolha Mudo Total ou Trecho',
          desc: "Escolha 'Silêncio Total Instantâneo' para remover sem perdas em 1 segundo, ou defina um intervalo de tempo.",
        },
        {
          title: '3. Remova o Áudio e Baixe na Hora',
          desc: "Clique em 'Remover Áudio Agora' e baixe imediatamente seu vídeo mudo sem marca d’água.",
        },
      ],
    },
    features: {
      title: 'Feito para Privacidade, Rapidez e Qualidade Original',
      items: [
        {
          title: 'Remoção Sem Perdas em 1 Segundo',
          desc: 'O modo total copia o vídeo diretamente (-c copy -an) sem recodificar nenhum quadro.',
        },
        {
          title: 'Privacidade Total Sem Upload',
          desc: 'Processado localmente via WebAssembly na RAM do aparelho. Seus vídeos nunca saem da sua tela.',
        },
        {
          title: 'Corte de Áudio por Intervalo',
          desc: 'Silencie apenas segundos indesejados mantendo todo o restante da trilha sonora intacto.',
        },
        {
          title: 'Sem Marca d’Água e Offline PWA',
          desc: 'Exportação limpa, gratuita e instalável para funcionar direto na tela inicial.',
        },
      ],
    },
    guides: {
      title: 'Como Mutar Vídeos de iPhone, YouTube, TikTok e MP4 Grátis',
      subtitle: 'Tudo para tirar o som de vídeos sem marca d’água no celular ou computador.',
      items: [
        {
          title: 'Tirar Áudio de Vídeo no iPhone e Android (MOV / MP4)',
          desc: 'Abra o MuteVideo no Safari ou Chrome, escolha qualquer vídeo MOV ou MP4 da galeria e remova o áudio localmente em 1 segundo.',
        },
        {
          title: 'Como Silenciar Vídeos do YouTube, TikTok e Reels',
          desc: 'Remova o áudio original antes de colocar música de fundo ou silencie apenas um trecho específico para TikTok, Reels e Shorts.',
        },
        {
          title: 'Remover Faixa de Áudio de MP4 Sem Marca d’Água (-c copy -an)',
          desc: 'O MuteVideo executa cópia direta (-c copy -an) para remover o áudio de MP4, WebM, MKV e AVI mantendo 100% da qualidade original.',
        },
      ],
    },
    comparison: {
      title: 'MuteVideo vs. Clideo, CapCut Web e Canva',
      subtitle: 'Veja por que silenciar vídeo online grátis no navegador vence Clideo, CapCut Web e Canva.',
      colFeature: 'Recurso',
      colOurs: 'MuteVideo (Local WASM)',
      colClideo: 'Clideo',
      colCapcut: 'CapCut Web',
      colCanva: 'Canva',
      rows: [
        {
          feature: 'Tempo de Envio',
          ours: '0 segundos (RAM local)',
          clideo: 'Upload lento e fila',
          capcut: 'Login e nuvem obrigatórios',
          canva: 'Espera de importação',
        },
        {
          feature: 'Qualidade do Vídeo',
          ours: '100% Sem Perdas (-c copy -an)',
          clideo: 'Recodificado no servidor',
          capcut: 'Recodificado ao exportar',
          canva: 'Recodificado com limite',
        },
        {
          feature: 'Marca d’Água e Planos',
          ours: 'Zero Marca d’Água • Grátis',
          clideo: 'Marca no plano grátis',
          capcut: 'Recursos Pro na saída',
          canva: 'Plano Pro para HD',
        },
        {
          feature: 'Privacidade e Segurança',
          ours: 'Nunca sai do dispositivo',
          clideo: 'Enviado a servidores terceiros',
          capcut: 'Armazenado na nuvem',
          canva: 'Enviado aos servidores Canva',
        },
        {
          feature: 'Mudo por Trecho de Tempo',
          ours: 'Controles Início / Fim',
          clideo: 'Mudo total ou corte manual',
          capcut: 'Exige editor completo',
          canva: 'Exige dividir a faixa',
        },
      ],
    },
    faq: {
      title: 'Perguntas Frequentes',
      items: [
        {
          q: 'Como remover o áudio de um vídeo no iPhone ou Android grátis?',
          a: "Abra o MuteVideo no Safari ou Chrome do seu celular, toque em 'Selecionar Vídeo para Mutar' e toque em 'Remover Áudio Agora'. O som é removido instantaneamente no navegador sem uploads e sem marca d’água.",
        },
        {
          q: 'Silenciar um vídeo reduz a qualidade da imagem?',
          a: 'Não! O MuteVideo usa cópia direta sem perdas (-c copy -an) para remover a faixa de áudio sem recodificar nenhum pixel do vídeo, mantendo 100% da resolução original.',
        },
        {
          q: 'Por que usar o MuteVideo em vez do Clideo ou Canva?',
          a: 'Editores na nuvem exigem upload de arquivos grandes para servidores remotos, filas e pagamento para tirar marcas d’água. O MuteVideo processa 100% localmente na RAM do seu navegador — instantâneo, privado e gratuito para sempre.',
        },
        {
          q: 'Posso mutar apenas uma parte do vídeo?',
          a: 'Sim. Escolha "Mutar Trecho Específico" e ajuste os controles de início e fim.',
        },
        {
          q: 'Quais formatos são compatíveis?',
          a: 'MP4, MOV, WebM, MKV, AVI, M4V e a maioria dos formatos gravados em celulares ou computadores.',
        },
        {
          q: 'Por que manter uma trilha de áudio silenciosa?',
          a: 'Algumas plataformas exigem uma faixa de áudio presente no arquivo, mesmo estando totalmente silenciosa.',
        },
      ],
    },
    footer: {
      tagline: 'MuteVideo — Remoção de Áudio Instantânea, Sem Perdas e 100% Local',
      privacyNote: 'Zero Uploads • Processamento Local na RAM do Navegador',
      copyright: '© 2026 MuteVideo',
      githubLink: 'Repositório GitHub',
      supportLink: 'Apoiar o Desenvolvedor',
    },
  },

  de: {
    meta: {
      title: 'Audio aus Video Online Entfernen — Kostenlos Stumm',
      description:
        'Ton aus MP4, iPhone MOV, TikTok & YouTube-Videos in 1 Sekunde entfernen. 100% kostenlos lokal im Browser, ohne Upload und Wasserzeichen.',
      keywords:
        'audio aus video entfernen, video stummschalten online, iphone video ton entfernen, ton entfernen mp4, tiktok video stummschalten, youtube video stummschalten, ohne wasserzeichen',
    },
    nav: {
      brandTitle: 'MuteVideo',
      homeAria: 'MuteVideo Startseite',
      languageLabel: 'Sprache wählen',
      languageAria: 'Sprache der Oberfläche auswählen',
      themeToggleAria: 'Helles oder dunkles Design umschalten',
      themeToDark: 'Zum Dunkelmodus wechseln',
      themeToLight: 'Zum Hellmodus wechseln',
      githubAria: 'MuteVideo auf GitHub ansehen',
      installPwa: 'Zum Startbildschirm',
      installPwaAria: 'MuteVideo zum Startbildschirm hinzufügen',
      installedLabel: 'App Installiert',
      installModalTitle: 'MuteVideo App installieren',
      installModalBody: 'Nutze MuteVideo offline als kompakte Desktop- oder Mobil-App ganz ohne Server:',
      installModalDesktop: 'Chrome / Edge Desktop: Klicke auf das Installationssymbol in der Adressleiste.',
      installModalAndroid: 'Android Chrome: Öffne das Menü und wähle "Zum Startbildschirm hinzufügen".',
      installModalIos: 'iPhone / iPad Safari: Tippe auf Teilen und wähle "Zum Home-Bildschirm".',
      installModalClose: 'Verstanden',
      supportDev: 'Entwickler unterstützen',
      supportDevAria: 'Entwickler mit einem Kaffee unterstützen',
    },
    hero: {
      h1: 'Audio aus Video Online Entfernen',
    },
    workspace: {
      step1: {
        dropTitle: 'Video hier ablegen zum Stummschalten',
        dropTitleActive: 'Video loslassen zum Starten',
        dropSubtitle: 'Sofortige verlustfreie Tonentfernung oder zeitgenaue Stummschaltung direkt im Browser.',
        selectBtn: 'Video zum Stummschalten wählen',
        formatsBadge: 'MP4 • MOV • WebM • MKV • AVI',
        sampleBtn: 'Beispielvideo testen',
        sampleGenerating: 'Beispielclip wird erstellt...',
        privacyPill: 'Kein Server-Upload • 100% Originalqualität • Kein Wasserzeichen',
      },
      step2: {
        previewHeading: 'Live-Videovorschau',
        soundOnLabel: 'Ton An (Original)',
        soundOffLabel: 'Ton Aus (Stumme Vorschau)',
        soundComparisonHint: 'Klicken, um den Ton vor dem Export live zu vergleichen.',
        changeFileBtn: 'Anderes Video',
        modeSectionLabel: 'Stummschalt-Modus wählen',
        modeFullTitle: 'Sofort Komplett Stumm',
        modeFullBadge: 'Verlustfreie Tonentfernung in 1 Sekunde • Standard',
        modeFullDesc:
          'Entfernt die gesamte Audiospur ohne Videoneukodierung. Bildqualität und Bildrate bleiben zu 100% erhalten.',
        modeRangeTitle: 'Bestimmten Zeitbereich Stummschalten',
        modeRangeBadge: 'Start- / End-Regler',
        modeRangeDesc:
          'Schalte nur einen störenden Moment, Windgeräusche oder Sprache zwischen zwei Zeitpunkten stumm.',
        startTimeLabel: 'Stumm ab',
        endTimeLabel: 'Stumm bis',
        mutedSegmentSummary: 'Stummer Bereich',
        silentTrackLabel: 'Stille Audiospur im Container behalten',
        silentTrackDesc: 'Erhält eine lautlose AAC-Spur für maximale Kompatibilität mit Instagram Reels oder TikTok.',
        removeAudioBtn: 'Audio Jetzt Entfernen',
      },
      step3: {
        stageLoading: 'Lokale FFmpeg WebAssembly-Engine wird geladen...',
        stageProbing: 'Video- und Audiostreams werden im RAM geprüft...',
        stageFullMute: 'Audiospur wird sofort entfernt...',
        stageRangeMute: 'Ausgewählter Zeitbereich wird stummgeschaltet...',
        stageFinalizing: 'Stummes Video wird fertiggestellt...',
        privacyBadge: '100% Lokale Verarbeitung im Browser-RAM — Kein Upload, Kein Wasserzeichen',
        cancelBtn: 'Abbrechen',
      },
      step4: {
        savedBadgePrefix: 'Audio Entfernt • Videoqualität 100% Unberührt',
        savedAmountPrefix: 'Gespart',
        noAudioAlreadyNote: 'Video Bereinigt • Bereit zum Sofort-Download',
        previewLabel: 'Stummes Video Bereit',
        downloadBtn: 'Stummes Video Herunterladen',
        muteAnotherBtn: 'Weiteres Video Stummschalten',
        coffeeTitle: 'Hat es dir heute Zeit gespart?',
        coffeeDesc: 'MuteVideo ist 100% kostenlos ohne Werbung oder Wasserzeichen. Unterstütze die Entwicklung mit einem Kaffee.',
        coffeeCta: 'Kaffee Spendieren',
      },
      errors: {
        unsupportedFile: 'Bitte wähle eine gültige Videodatei (MP4, MOV, WebM, MKV oder AVI).',
        invalidRange: 'Die Endzeit muss größer als die Startzeit sein.',
        processFailed: 'Verarbeitung im Browser-Speicher fehlgeschlagen. Nutze Sofort Komplett Stumm oder ein anderes Format.',
      },
    },
    breadcrumbs: {
      ariaLabel: 'Brotkrumen-Navigation',
      home: 'Startseite',
      tools: 'Video-Audio-Tools',
      current: 'Video Stummschalten',
    },
    howTo: {
      title: 'Audio aus einem Video Online Kostenlos Entfernen',
      subtitle: 'Keine Software-Installation, keine Registrierung, keine Upload-Wartezeiten.',
      steps: [
        {
          title: '1. Video auswählen oder ablegen',
          desc: "Ziehe deine MP4-, iPhone-MOV- oder WebM-Datei in MuteVideo (oder klicke auf 'Video zum Stummschalten wählen').",
        },
        {
          title: '2. Modus oder Zeitbereich wählen',
          desc: "Wähle 'Sofort Komplett Stumm' für 1-Sekunden-Entfernung oder einen Zeitbereich zum Stummschalten.",
        },
        {
          title: '3. Audio entfernen & sofort laden',
          desc: "Klicke auf 'Audio Jetzt Entfernen' und lade dein stummes Video ohne Wasserzeichen sofort herunter.",
        },
      ],
    },
    features: {
      title: 'Entwickelt für Datenschutz, Tempo und Originalqualität',
      items: [
        {
          title: 'Verlustfreie 1-Sekunden-Entfernung',
          desc: 'Nutzt FFmpeg Stream-Copy (-c copy -an), sodass jedes Videobild unangetastet bleibt.',
        },
        {
          title: '100% Privat ohne Upload',
          desc: 'Alle Berechnungen laufen per WebAssembly im RAM deines Geräts. Private Clips verlassen niemals deinen Bildschirm.',
        },
        {
          title: 'Präzise Bereichs-Stummschaltung',
          desc: 'Entferne Hintergrundgeräusche oder einzelne Sätze zwischen zwei exakten Zeitmarken.',
        },
        {
          title: 'Keine Wasserzeichen & PWA-fähig',
          desc: 'Saubere Exporte ohne Limits, jederzeit als Offline-Web-App installierbar.',
        },
      ],
    },
    guides: {
      title: 'iPhone-, YouTube-, TikTok- & MP4-Videos Kostenlos Stummschalten',
      subtitle: 'So entfernst du Videoton ohne Wasserzeichen direkt auf Mobilgerät oder Desktop.',
      items: [
        {
          title: 'Ton aus iPhone & Android Videos entfernen (MOV / MP4)',
          desc: 'Öffne MuteVideo in Safari oder Chrome, wähle ein MOV- oder MP4-Video aus deiner Mediathek und entferne den Ton in 1 Sekunde lokal.',
        },
        {
          title: 'YouTube-, TikTok- & Instagram Reels-Videos stummschalten',
          desc: 'Entferne störenden Originalton vor dem Hinzufügen eigener Musik oder schalte einen bestimmten Abschnitt für TikTok und Reels stumm.',
        },
        {
          title: 'Audiospur aus MP4 ohne Wasserzeichen entfernen (-c copy -an)',
          desc: 'MuteVideo entfernt Tonspuren aus MP4, WebM, MKV und AVI per verlustfreiem Stream-Copy (-c copy -an) bei 100% Originalqualität.',
        },
      ],
    },
    comparison: {
      title: 'MuteVideo vs. Clideo, CapCut Web & Canva',
      subtitle: 'Warum lokale Browser-Verarbeitung schneller und privater ist als Clideo, CapCut Web oder Canva.',
      colFeature: 'Funktion',
      colOurs: 'MuteVideo (Lokal WASM)',
      colClideo: 'Clideo',
      colCapcut: 'CapCut Web',
      colCanva: 'Canva',
      rows: [
        {
          feature: 'Upload-Wartezeit',
          ours: '0 Sekunden (Lokaler RAM)',
          clideo: 'Langer Upload & Warteschlange',
          capcut: 'Konto & Cloud-Sync nötig',
          canva: 'Projekt-Upload abwarten',
        },
        {
          feature: 'Videoqualität',
          ours: '100% Verlustfrei (-c copy -an)',
          clideo: 'Auf Server neu kodiert',
          capcut: 'Beim Export neu kodiert',
          canva: 'Neu kodiert / begrenzt',
        },
        {
          feature: 'Wasserzeichen & Kosten',
          ours: 'Kein Wasserzeichen • Gratis',
          clideo: 'Wasserzeichen im Gratisplan',
          capcut: 'Pro-Features beim Export',
          canva: 'Pro-Abo für HD-Optionen',
        },
        {
          feature: 'Datenschutz',
          ours: 'Verlässt nie dein Gerät',
          clideo: 'Auf fremden Servern',
          capcut: 'In der Cloud gespeichert',
          canva: 'Auf Canva-Servern',
        },
        {
          feature: 'Bereichs-Stummschaltung',
          ours: '1-Klick Start- / End-Regler',
          clideo: 'Nur komplett oder Schnitt',
          capcut: 'Volle Zeitleiste nötig',
          canva: 'Spur manuell teilen',
        },
      ],
    },
    faq: {
      title: 'Häufig gestellte Fragen',
      items: [
        {
          q: 'Wie entferne ich den Ton aus einem Video auf iPhone oder Android kostenlos?',
          a: "Öffne MuteVideo in Safari oder Chrome auf deinem Smartphone, tippe auf 'Video zum Stummschalten wählen' und dann auf 'Audio Jetzt Entfernen'. Der Ton wird sofort lokal im Browser ohne Upload und ohne Wasserzeichen entfernt.",
        },
        {
          q: 'Verringert das Stummschalten die Videoqualität?',
          a: 'Nein! MuteVideo nutzt verlustfreies Stream-Copying (-c copy -an), ohne einen einzigen Pixel neu zu kodieren. Dein Video behält zu 100% die ursprüngliche Auflösung und Bildrate.',
        },
        {
          q: 'Warum MuteVideo statt Clideo oder Canva nutzen?',
          a: 'Cloud-Editoren erfordern das Hochladen großer Dateien auf fremde Server, Wartezeiten und Bezahlung für wasserzeichenfreie Exporte. MuteVideo arbeitet 100% lokal im Browser-RAM — sofort, privat und dauerhaft kostenlos.',
        },
        {
          q: 'Kann ich nur einen bestimmten Teil des Videos stummschalten?',
          a: 'Ja. Wähle "Bestimmten Zeitbereich Stummschalten" und stelle Start- und Endzeit mit den Reglern ein.',
        },
        {
          q: 'Welche Videoformate werden unterstützt?',
          a: 'MP4, MOV, WebM, MKV, AVI, M4V und gängige Smartphone- sowie Kameraformate.',
        },
        {
          q: 'Wozu dient die stille Audiospur-Option?',
          a: 'Manche Plattformen erwarten technisch eine Audiospur im Container, auch wenn diese komplett stumm ist.',
        },
      ],
    },
    footer: {
      tagline: 'MuteVideo — Sofortige, verlustfreie und 100% lokale Audioentfernung',
      privacyNote: 'Kein Upload • Lokal im Browser-RAM verarbeitet',
      copyright: '© 2026 MuteVideo',
      githubLink: 'GitHub-Repository',
      supportLink: 'Entwickler unterstützen',
    },
  },

  fr: {
    meta: {
      title: 'Supprimer le Son d’une Vidéo — Muter Gratuitement',
      description:
        'Enlevez l’audio d’un MP4, MOV iPhone, TikTok ou YouTube en 1 seconde. Outil gratuit 100% local sans envoi ni filigrane.',
      keywords:
        'supprimer son video, enlever audio video en ligne, couper son video iphone, supprimer audio mp4, muter video tiktok, muter video youtube, sans filigrane',
    },
    nav: {
      brandTitle: 'MuteVideo',
      homeAria: 'Accueil MuteVideo',
      languageLabel: 'Choisir la langue',
      languageAria: 'Sélectionner la langue de l’interface',
      themeToggleAria: 'Basculer le thème clair ou sombre',
      themeToDark: 'Passer en mode sombre',
      themeToLight: 'Passer en mode clair',
      githubAria: 'Voir MuteVideo sur GitHub',
      installPwa: 'Ajouter à l’accueil',
      installPwaAria: 'Installer MuteVideo sur l’écran d’accueil',
      installedLabel: 'App Installée',
      installModalTitle: 'Installer l’application MuteVideo',
      installModalBody: 'Utilisez MuteVideo hors ligne comme une application légère sans suivi serveur :',
      installModalDesktop: 'Chrome / Edge Ordinateur : Cliquez sur l’icône d’installation dans la barre d’adresse.',
      installModalAndroid: 'Android Chrome : Ouvrez le menu et choisissez « Ajouter à l’écran d’accueil ».',
      installModalIos: 'iPhone / iPad Safari : Touchez Partager puis « Sur l’écran d’accueil ».',
      installModalClose: 'Compris',
      supportDev: 'Soutenir le Développeur',
      supportDevAria: 'Offrir un café au développeur',
    },
    hero: {
      h1: 'Supprimer le Son d’une Vidéo en Ligne',
    },
    workspace: {
      step1: {
        dropTitle: 'Déposez votre vidéo ici pour la rendre muette',
        dropTitleActive: 'Relâchez la vidéo pour commencer',
        dropSubtitle: 'Suppression audio instantanée sans perte ou coupure ciblée sur une plage horaire dans votre navigateur.',
        selectBtn: 'Sélectionner une Vidéo à Muter',
        formatsBadge: 'MP4 • MOV • WebM • MKV • AVI',
        sampleBtn: 'Essayer une Vidéo Exemple',
        sampleGenerating: 'Génération de l’extrait test...',
        privacyPill: 'Zéro Envoi Serveur • Qualité 100% Originale • Sans Filigrane',
      },
      step2: {
        previewHeading: 'Aperçu Vidéo en Direct',
        soundOnLabel: 'Son Activé (Original)',
        soundOffLabel: 'Son Coupé (Aperçu Muet)',
        soundComparisonHint: 'Cliquez pour basculer le son et comparer avant d’exporter.',
        changeFileBtn: 'Changer de Vidéo',
        modeSectionLabel: 'Choisissez le Mode de Suppression',
        modeFullTitle: 'Silence Total Instantané',
        modeFullBadge: 'Suppression sans perte en 1 seconde • Par défaut',
        modeFullDesc:
          'Supprime la piste audio instantanément sans réencodage vidéo. Conserve 100% de la qualité d’origine.',
        modeRangeTitle: 'Couper le Son d’un Passage',
        modeRangeBadge: 'Curseurs Début / Fin',
        modeRangeDesc:
          'Rendez muet uniquement un passage gênant, du vent ou une voix entre deux instants précis.',
        startTimeLabel: 'Début du Silence',
        endTimeLabel: 'Fin du Silence',
        mutedSegmentSummary: 'Segment Coupé',
        silentTrackLabel: 'Conserver une piste audio silencieuse',
        silentTrackDesc: 'Garde une piste AAC muette pour une compatibilité optimale sur Instagram Reels ou TikTok.',
        removeAudioBtn: 'Supprimer l’Audio Maintenant',
      },
      step3: {
        stageLoading: 'Chargement du moteur local FFmpeg WebAssembly...',
        stageProbing: 'Analyse des flux vidéo et audio en mémoire RAM...',
        stageFullMute: 'Suppression instantanée de la piste audio...',
        stageRangeMute: 'Mise en silence du segment sélectionné...',
        stageFinalizing: 'Finalisation de la vidéo muette...',
        privacyBadge: 'Traitement 100% Local en RAM du Navigateur — Zéro Envoi, Sans Filigrane',
        cancelBtn: 'Annuler',
      },
      step4: {
        savedBadgePrefix: 'Audio Supprimé • Qualité Vidéo 100% Intacte',
        savedAmountPrefix: 'Économisé',
        noAudioAlreadyNote: 'Vidéo Nettoyée • Prête au Téléchargement',
        previewLabel: 'Vidéo Muette Prête',
        downloadBtn: 'Télécharger la Vidéo Muette',
        muteAnotherBtn: 'Muter une Autre Vidéo',
        coffeeTitle: 'Cela vous a fait gagner du temps ?',
        coffeeDesc: 'MuteVideo est 100% gratuit sans pub ni filigrane. Soutenez le projet avec un café.',
        coffeeCta: 'Offrir un Café au Dev',
      },
      errors: {
        unsupportedFile: 'Veuillez sélectionner un fichier vidéo valide (MP4, MOV, WebM, MKV ou AVI).',
        invalidRange: 'L’instant de fin doit être supérieur à l’instant de début.',
        processFailed: 'Impossible de traiter cette vidéo en mémoire. Essayez le mode Silence Total ou un autre format.',
      },
    },
    breadcrumbs: {
      ariaLabel: 'Fil d’Ariane',
      home: 'Accueil',
      tools: 'Outils Audio & Vidéo',
      current: 'Muter une Vidéo',
    },
    howTo: {
      title: 'Comment Supprimer le Son d’une Vidéo en Ligne Gratuitement',
      subtitle: 'Sans logiciel à installer, sans inscription et sans attente d’envoi.',
      steps: [
        {
          title: '1. Importez votre Vidéo',
          desc: "Déposez votre fichier MP4, MOV iPhone ou WebM dans MuteVideo (ou cliquez sur 'Sélectionner une Vidéo à Muter').",
        },
        {
          title: '2. Silence Total ou Plage Horaire',
          desc: "Choisissez 'Silence Total Instantané' pour retirer l’audio sans perte en 1 seconde, ou sélectionnez un passage précis.",
        },
        {
          title: '3. Supprimez l’Audio et Téléchargez',
          desc: "Cliquez sur 'Supprimer l’Audio Maintenant' et téléchargez aussitôt votre vidéo muette sans filigrane.",
        },
      ],
    },
    features: {
      title: 'Conçu pour la Confidentialité, la Vitesse et la Qualité',
      items: [
        {
          title: 'Suppression Sans Perte en 1 Seconde',
          desc: 'La copie directe (-c copy -an) retire la piste sonore sans jamais réencoder les images.',
        },
        {
          title: 'Confidentialité 100% Locale',
          desc: 'Tout est exécuté en WebAssembly dans la RAM de votre appareil. Vos vidéos ne quittent jamais votre écran.',
        },
        {
          title: 'Coupure Précise par Plage Horaire',
          desc: 'Éliminez un bruit parasite ou une conversation entre deux repères tout en gardant le reste audible.',
        },
        {
          title: 'Sans Filigrane et Installable PWA',
          desc: 'Exportations illimitées et application web utilisable même hors ligne.',
        },
      ],
    },
    guides: {
      title: 'Comment Muter des Vidéos iPhone, YouTube, TikTok et MP4 Gratuitement',
      subtitle: 'Tout pour enlever le son d’une vidéo sans filigrane sur mobile et ordinateur.',
      items: [
        {
          title: 'Couper le Son d’une Vidéo sur iPhone & Android (MOV / MP4)',
          desc: 'Ouvrez MuteVideo dans Safari ou Chrome, sélectionnez un clip MOV ou MP4 de votre pellicule et supprimez le son en 1 seconde localement.',
        },
        {
          title: 'Comment Muter des Vidéos YouTube, TikTok & Instagram Reels',
          desc: 'Retirez l’audio original avant d’ajouter votre musique ou rendez muet un passage précis pour TikTok, Reels et Shorts.',
        },
        {
          title: 'Retirer la Piste Audio d’un MP4 Sans Filigrane (-c copy -an)',
          desc: 'MuteVideo exécute une copie directe (-c copy -an) pour supprimer le son des fichiers MP4, WebM, MKV et AVI à 100% de qualité d’origine.',
        },
      ],
    },
    comparison: {
      title: 'MuteVideo vs. Clideo, CapCut Web & Canva',
      subtitle: 'Pourquoi muter une vidéo en ligne dans votre RAM navigateur bat Clideo, CapCut Web et Canva.',
      colFeature: 'Critère',
      colOurs: 'MuteVideo (Local WASM)',
      colClideo: 'Clideo',
      colCapcut: 'CapCut Web',
      colCanva: 'Canva',
      rows: [
        {
          feature: 'Temps d’envoi',
          ours: '0 seconde (RAM locale)',
          clideo: 'Upload lent et file d’attente',
          capcut: 'Compte et synchro cloud',
          canva: 'Attente d’importation',
        },
        {
          feature: 'Qualité Vidéo',
          ours: '100% Sans Perte (-c copy -an)',
          clideo: 'Réencodée sur serveur',
          capcut: 'Réencodée à l’export',
          canva: 'Réencodée / débit limité',
        },
        {
          feature: 'Filigrane & Limites',
          ours: 'Zéro Filigrane • Gratuit',
          clideo: 'Filigrane en offre gratuite',
          capcut: 'Fonctions Pro à l’export',
          canva: 'Offre Pro pour options HD',
        },
        {
          feature: 'Confidentialité',
          ours: 'Reste sur votre appareil',
          clideo: 'Stockée sur serveurs tiers',
          capcut: 'Stockée dans le cloud',
          canva: 'Envoyée sur serveurs Canva',
        },
        {
          feature: 'Coupure par Segment',
          ours: 'Curseurs Début / Fin',
          clideo: 'Total ou découpe manuelle',
          capcut: 'Éditeur complet requis',
          canva: 'Séparation manuelle requise',
        },
      ],
    },
    faq: {
      title: 'Foire Aux Questions',
      items: [
        {
          q: 'Comment supprimer le son d’une vidéo sur iPhone ou Android gratuitement ?',
          a: "Ouvrez MuteVideo dans Safari ou Chrome sur votre téléphone, touchez 'Sélectionner une Vidéo à Muter' puis 'Supprimer l’Audio Maintenant'. Le son est retiré instantanément dans le navigateur sans envoi ni filigrane.",
        },
        {
          q: 'Muter une vidéo réduit-il la qualité d’image ?',
          a: 'Non ! MuteVideo utilise la copie directe sans perte (-c copy -an) pour supprimer la piste audio sans réencoder un seul pixel. Votre vidéo garde 100% de sa résolution et fréquence d’images.',
        },
        {
          q: 'Pourquoi choisir MuteVideo plutôt que Clideo ou Canva ?',
          a: 'Les éditeurs cloud imposent d’envoyer vos fichiers lourds sur des serveurs distants, d’attendre et de payer pour retirer le filigrane. MuteVideo traite tout en local dans la RAM du navigateur — instantané, privé et gratuit à vie.',
        },
        {
          q: 'Puis-je couper le son sur seulement quelques secondes ?',
          a: 'Oui, sélectionnez « Couper le Son d’un Passage » et réglez les curseurs Début et Fin.',
        },
        {
          q: 'Quels formats sont pris en charge ?',
          a: 'MP4, MOV, WebM, MKV, AVI, M4V et la plupart des formats mobiles et ordinateurs.',
        },
        {
          q: 'Pourquoi garder une piste audio silencieuse ?',
          a: 'Certaines plateformes vérifient la présence d’un flux audio même lorsque celui-ci est totalement muet.',
        },
      ],
    },
    footer: {
      tagline: 'MuteVideo — Suppression Audio Instantanée, Sans Perte et 100% Locale',
      privacyNote: 'Zéro Upload • Traitement Local dans la RAM du Navigateur',
      copyright: '© 2026 MuteVideo',
      githubLink: 'Dépôt GitHub',
      supportLink: 'Soutenir le Développeur',
    },
  },

  ja: {
    meta: {
      title: '動画の音声を消すオンラインツール — 無料で即ミュート',
      description:
        'MP4・iPhone MOV・TikTokやYouTube動画の音声を1秒で無料削除。サーバー送信なし・無劣化・透かしなしのブラウザ処理。',
      keywords:
        '動画 音声消す, 動画 ミュート オンライン, iphone 動画 音声消す, mp4 音声削除, tiktok 動画 ミュート, youtube 動画 無音化, 透かしなし',
    },
    nav: {
      brandTitle: 'MuteVideo',
      homeAria: 'MuteVideo ホーム',
      languageLabel: '言語を選択',
      languageAria: '表示言語を選択',
      themeToggleAria: 'ライト・ダークテーマ切替',
      themeToDark: 'ダークモードに切替',
      themeToLight: 'ライトモードに切替',
      githubAria: 'GitHubでMuteVideoを見る',
      installPwa: 'ホーム画面に追加',
      installPwaAria: 'MuteVideoをホーム画面に追加',
      installedLabel: 'インストール済み',
      installModalTitle: 'MuteVideo アプリをインストール',
      installModalBody: 'サーバー通信なしの軽量アプリとしてオフラインでも利用できます:',
      installModalDesktop: 'Chrome / Edge (PC): アドレスバー右側のインストールアイコンをクリックしてください。',
      installModalAndroid: 'Android Chrome: 右上のメニューから「ホーム画面に追加」を選択してください。',
      installModalIos: 'iPhone / iPad Safari: 共有ボタンから「ホーム画面に追加」を選択してください。',
      installModalClose: '閉じる',
      supportDev: '開発者を支援する',
      supportDevAria: 'コーヒーで開発者を支援する',
    },
    hero: {
      h1: '動画の音声をオンラインで削除',
    },
    workspace: {
      step1: {
        dropTitle: '動画をここにドロップして音声を削除',
        dropTitleActive: 'ドロップして読み込み開始',
        dropSubtitle: 'ブラウザ上で即座に無劣化で音声を削除、または指定区間だけを無音化できます。',
        selectBtn: '音声を消す動画を選択',
        formatsBadge: 'MP4 • MOV • WebM • MKV • AVI',
        sampleBtn: 'サンプル動画で試す',
        sampleGenerating: 'サンプル動画を生成中...',
        privacyPill: 'アップロード不要 • 100%オリジナル画質 • 透かしなし',
      },
      step2: {
        previewHeading: 'ライブ動画プレビュー',
        soundOnLabel: '音声あり（元の動画）',
        soundOffLabel: '音声なし（ミュート確認）',
        soundComparisonHint: 'クリックして音声あり/なしをリアルタイムで比較できます。',
        changeFileBtn: '動画を変更',
        modeSectionLabel: 'ミュートモードを選択',
        modeFullTitle: '瞬間フルミュート',
        modeFullBadge: '1秒・無劣化で音声トラック完全削除（推奨）',
        modeFullDesc:
          '映像を再エンコードせずに音声ストリームだけを即座に削除します。画質・フレームレートは100%そのまま維持されます。',
        modeRangeTitle: '指定した時間区間をミュート',
        modeRangeBadge: '開始 / 終了スライダー',
        modeRangeDesc:
          '風切り音や話し声など、指定した開始〜終了時間の間だけを無音化し、前後の音声は残します。',
        startTimeLabel: 'ミュート開始',
        endTimeLabel: 'ミュート終了',
        mutedSegmentSummary: '無音化区間',
        silentTrackLabel: '無音オーディオトラックを保持する',
        silentTrackDesc: 'InstagramリールやTikTokなどの互換性のため無音のAACトラックを残します。',
        removeAudioBtn: '今すぐ音声を削除',
      },
      step3: {
        stageLoading: 'ローカル FFmpeg WebAssembly を読み込み中...',
        stageProbing: 'ブラウザRAM内で映像・音声ストリームを解析中...',
        stageFullMute: '音声ストリームを瞬時に削除中...',
        stageRangeMute: '指定した時間区間を無音化中...',
        stageFinalizing: 'ミュート済み動画ファイルを生成中...',
        privacyBadge: '100% ブラウザRAMローカル処理 — サーバー送信なし・透かしなし',
        cancelBtn: 'キャンセル',
      },
      step4: {
        savedBadgePrefix: '音声削除完了 • 映像画質100%無劣化',
        savedAmountPrefix: '削減サイズ',
        noAudioAlreadyNote: '処理完了 • すぐにダウンロード可能',
        previewLabel: 'ミュート済み動画プレビュー',
        downloadBtn: 'ミュート動画をダウンロード',
        muteAnotherBtn: '別の動画を処理する',
        coffeeTitle: '作業時間の短縮に役立ちましたか？',
        coffeeDesc: 'MuteVideoは広告・透かしなしの完全無料ツールです。コーヒー1杯で開発を応援できます。',
        coffeeCta: '開発者にコーヒーをおごる',
      },
      errors: {
        unsupportedFile: '有効な動画ファイル（MP4, MOV, WebM, MKV, AVI）を選択してください。',
        invalidRange: '終了時間は開始時間より後に設定してください。',
        processFailed: 'ブラウザメモリ上で処理できませんでした。瞬間フルミュートや別形式をお試しください。',
      },
    },
    breadcrumbs: {
      ariaLabel: 'パンくずリスト',
      home: 'ホーム',
      tools: '動画音声ツール',
      current: '動画ミュート',
    },
    howTo: {
      title: '動画の音声をオンラインで無料削除する方法',
      subtitle: 'ソフトのインストール不要、アカウント登録不要、アップロード待ち時間ゼロ。',
      steps: [
        {
          title: '1. 動画を選択またはドロップ',
          desc: 'MP4・iPhone MOV・WebMファイルをMuteVideoボックスにドロップ（または「音声を消す動画を選択」）します。',
        },
        {
          title: '2. 全体削除または区間ミュートを選択',
          desc: '1秒で無劣化削除する「瞬間フルミュート」または開始・終了の時間区間を指定します。',
        },
        {
          title: '3. 音声を削除してすぐ保存',
          desc: '「今すぐ音声を削除」をクリックし、透かしなしの無音動画を即座にダウンロードできます。',
        },
      ],
    },
    features: {
      title: 'プライバシー・超高速・無劣化にこだわった設計',
      items: [
        {
          title: '1秒の無劣化オーディオ削除',
          desc: 'FFmpegのストリームコピー（-c copy -an）により映像を再圧縮せずそのまま出力します。',
        },
        {
          title: '100%ゼロアップロード保護',
          desc: 'WebAssemblyで端末のRAM上だけで完結するため、プライベート動画も外部に一切送信されません。',
        },
        {
          title: '秒単位の区間ミュート対応',
          desc: '必要な音声は残したまま、雑音や会話が入った一部時間帯だけをピンポイントで消音します。',
        },
        {
          title: '透かしなし＆PWAオフライン対応',
          desc: 'ロゴ透かしや回数制限はなく、ホーム画面に追加していつでも使えます。',
        },
      ],
    },
    guides: {
      title: 'iPhone・YouTube・TikTok・MP4動画の音声を無料で消すガイド',
      subtitle: 'スマホでもPCでも透かしなしで動画の音声を取り除くポイント。',
      items: [
        {
          title: 'iPhone・Android動画の音声を消す (MOV / MP4)',
          desc: 'SafariやChromeでMuteVideoを開き、カメラロールのMOVやMP4動画を選ぶだけで1秒以内にローカルで無音化できます。',
        },
        {
          title: 'YouTube・TikTok・Instagramリール動画のミュート方法',
          desc: 'BGMを付ける前に元の環境音を完全に消したり、必要な区間だけ音を残して不要部分だけを無音化できます。',
        },
        {
          title: '透かしなしでMP4の音声トラックを無劣化削除 (-c copy -an)',
          desc: 'MuteVideoはストリームコピー (-c copy -an) で映像を再圧縮せず、MP4・WebM・MKV・AVIから音声だけを削除します。',
        },
      ],
    },
    comparison: {
      title: 'MuteVideo と Clideo・CapCut Web・Canva の比較',
      subtitle: 'ブラウザRAMでのローカル処理がクラウドサイトより速く安全な理由。',
      colFeature: '比較項目',
      colOurs: 'MuteVideo (ローカルWASM)',
      colClideo: 'Clideo',
      colCapcut: 'CapCut Web',
      colCanva: 'Canva',
      rows: [
        {
          feature: 'アップロード待ち時間',
          ours: '0秒（端末RAM内で即処理）',
          clideo: 'アップロードと待機列あり',
          capcut: 'ログインとクラウド同期',
          canva: '素材読み込み待ちあり',
        },
        {
          feature: '映像の画質',
          ours: '100%無劣化 (-c copy -an)',
          clideo: 'サーバー側で再エンコード',
          capcut: '書き出し時に再エンコード',
          canva: '再圧縮・ビットレート制限',
        },
        {
          feature: '透かし・料金',
          ours: '透かしゼロ • ずっと無料',
          clideo: '無料版は透かし入り',
          capcut: '出力時にPro制限あり',
          canva: 'HD出力はProプラン',
        },
        {
          feature: 'プライバシー保護',
          ours: '端末から一切外部に出ない',
          clideo: '外部サーバーへ送信',
          capcut: 'クラウド上に保存',
          canva: 'Canvaサーバーへ保存',
        },
        {
          feature: '区間ミュート',
          ours: '開始 / 終了スライダーのみ',
          clideo: '全体削除または手動分割',
          capcut: 'タイムライン編集が必要',
          canva: 'トラック分割操作が必要',
        },
      ],
    },
    faq: {
      title: 'よくある質問',
      items: [
        {
          q: 'iPhoneやAndroidで動画の音声を無料で消すには？',
          a: 'スマホのSafariやChromeでMuteVideoを開き、「音声を消す動画を選択」からカメラロールの動画を選び、「今すぐ音声を削除」をタップするだけです。アップロードも透かしも一切なくブラウザ内で即完了します。',
        },
        {
          q: '動画をミュートすると画質は下がりますか？',
          a: 'いいえ。MuteVideoはロスレスストリームコピー (-c copy -an) により映像を1ピクセルも再エンコードせず音声トラックのみを削除するため、100%元の解像度とフレームレートを維持します。',
        },
        {
          q: 'ClideoやCanvaではなくMuteVideoを使う理由は？',
          a: 'クラウド型ツールでは重い動画を外部サーバーへ送信し、待ち時間や透かし解除の課金が発生します。MuteVideoはブラウザRAM上で100%ローカル処理するため、瞬時・完全プライベート・永久無料です。',
        },
        {
          q: '動画の一部だけミュートすることはできますか？',
          a: 'はい。「指定した時間区間をミュート」を選び、開始・終了スライダーで区間を指定できます。',
        },
        {
          q: 'どの動画形式に対応していますか？',
          a: 'MP4、MOV、WebM、MKV、AVI、M4Vなど主要な形式に対応しています。',
        },
        {
          q: '「無音オーディオトラックを保持」とは何ですか？',
          a: 'SNSやチャットアプリによっては音声ヘッダーがない動画を弾く場合があるため、無音のトラックを残すオプションです。',
        },
      ],
    },
    footer: {
      tagline: 'MuteVideo — 高速・無劣化・100%ローカル動画音声削除ツール',
      privacyNote: 'アップロード不要 • ブラウザRAM内でローカル処理',
      copyright: '© 2026 MuteVideo',
      githubLink: 'GitHub リポジトリ',
      supportLink: '開発者を支援する',
    },
  },

  zh: {
    meta: {
      title: '在线去除视频声音 — 免费无水印视频静音工具',
      description:
        '1秒免费移除MP4、iPhone MOV、抖音和YouTube视频声音。100%浏览器本地处理，零上传、无损原画质、无水印。',
      keywords: '去除视频声音, 视频消音在线, 苹果手机视频去声, 删除mp4音频, 抖音视频静音, youtube视频消音, 无水印视频静音',
    },
    nav: {
      brandTitle: 'MuteVideo',
      homeAria: 'MuteVideo 首页',
      languageLabel: '选择语言',
      languageAria: '选择界面语言',
      themeToggleAria: '切换浅色或深色主题',
      themeToDark: '切换到深色模式',
      themeToLight: '切换到浅色模式',
      githubAria: '在 GitHub 查看 MuteVideo',
      installPwa: '添加到主屏幕',
      installPwaAria: '将 MuteVideo 添加到主屏幕',
      installedLabel: '已安装应用',
      installModalTitle: '安装 MuteVideo 应用',
      installModalBody: '将 MuteVideo 作为轻量离线桌面或移动应用使用，零服务器追踪：',
      installModalDesktop: 'Chrome / Edge 桌面端：点击浏览器地址栏右侧的安装图标。',
      installModalAndroid: 'Android Chrome：点击右上角菜单并选择“添加到主屏幕”或“安装应用”。',
      installModalIos: 'iPhone / iPad Safari：点击底部分享图标并选择“添加到主屏幕”。',
      installModalClose: '知道了',
      supportDev: '支持开发者',
      supportDevAria: '请开发者喝杯咖啡',
    },
    hero: {
      h1: '在线去除视频声音',
    },
    workspace: {
      step1: {
        dropTitle: '拖放视频到此处即可一键静音',
        dropTitleActive: '松开鼠标立即加载视频',
        dropSubtitle: '在浏览器内瞬间无损移除整段音轨，或按起止时间精准静音指定片段。',
        selectBtn: '选择要静音的视频',
        formatsBadge: 'MP4 • MOV • WebM • MKV • AVI',
        sampleBtn: '试用示例视频',
        sampleGenerating: '正在生成测试视频...',
        privacyPill: '零服务器上传 • 100% 原画质 • 无水印',
      },
      step2: {
        previewHeading: '实时视频预览',
        soundOnLabel: '开启声音（原声）',
        soundOffLabel: '关闭声音（静音对比）',
        soundComparisonHint: '点击切换声音开关，导出前即可实时对比消音效果。',
        changeFileBtn: '更换视频',
        modeSectionLabel: '选择消音模式',
        modeFullTitle: '瞬间完全静音',
        modeFullBadge: '1秒无损移除音频 • 默认推荐',
        modeFullDesc: '直接剥离音轨而无需重新编码视频画面，100% 保留原始像素清晰度与帧率。',
        modeRangeTitle: '静音指定时间段',
        modeRangeBadge: '起止时间滑块',
        modeRangeDesc: '仅将某一段杂音、风声或人声设为静音，其余时段的音频保持不变。',
        startTimeLabel: '静音开始时间',
        endTimeLabel: '静音结束时间',
        mutedSegmentSummary: '已选静音时段',
        silentTrackLabel: '保留静音音轨容器',
        silentTrackDesc: '保留一条静音 AAC 音轨，确保上传到抖音、Instagram Reels 或 TikTok 时兼容性最佳。',
        removeAudioBtn: '立即移除声音',
      },
      step3: {
        stageLoading: '正在加载本地 FFmpeg WebAssembly 引擎...',
        stageProbing: '正在浏览器内存中检测视频与音频流...',
        stageFullMute: '正在瞬间剥离音频流...',
        stageRangeMute: '正在静音选定时间片段...',
        stageFinalizing: '正在封装静音视频文件...',
        privacyBadge: '100% 浏览器本地内存处理 — 零服务器上传，无水印',
        cancelBtn: '取消',
      },
      step4: {
        savedBadgePrefix: '音频已移除 • 视频画质 100% 无损',
        savedAmountPrefix: '已节省体积',
        noAudioAlreadyNote: '处理完成 • 可立即下载',
        previewLabel: '静音视频已就绪',
        downloadBtn: '下载静音视频',
        muteAnotherBtn: '处理另一个视频',
        coffeeTitle: '今天帮您节省时间了吗？',
        coffeeDesc: 'MuteVideo 永久免费且无广告、无水印，欢迎请开发者喝杯咖啡支持更新。',
        coffeeCta: '请开发者喝杯咖啡',
      },
      errors: {
        unsupportedFile: '请选择有效的视频文件（MP4、MOV、WebM、MKV 或 AVI）。',
        invalidRange: '结束时间必须大于开始时间。',
        processFailed: '浏览器内存处理失败，请尝试“瞬间完全静音”模式或更换视频格式。',
      },
    },
    breadcrumbs: {
      ariaLabel: '面包屑导航',
      home: '首页',
      tools: '视频音频工具',
      current: '在线视频消音',
    },
    howTo: {
      title: '如何免费在线移除视频声音',
      subtitle: '无需安装软件、无需注册登录、无需漫长等待文件上传。',
      steps: [
        {
          title: '1. 选择或拖入视频文件',
          desc: "将 MP4、iPhone MOV 或 WebM 文件拖入 MuteVideo 框内（或点击“选择要静音的视频”）。",
        },
        {
          title: '2. 选择整段消音或局部静音',
          desc: "选择“瞬间完全静音”在 1 秒内无损去除整条音轨，或拖动滑块仅静音指定时间段。",
        },
        {
          title: '3. 立即去声并下载',
          desc: "点击“立即移除声音”，即刻下载清晰无声、无任何水印的视频。",
        },
      ],
    },
    features: {
      title: '专为隐私、速度与原画质打造',
      items: [
        {
          title: '1秒无损音轨剥离',
          desc: '整段消音采用 FFmpeg 流直拷（-c copy -an），视频帧原封不动复制，零画质损失。',
        },
        {
          title: '100% 本地零上传隐私',
          desc: '所有运算都在您设备的 WebAssembly 内存中完成，私人视频绝不离开您的屏幕。',
        },
        {
          title: '精准时段静音控制',
          desc: '轻松抹去某个时间窗口内的环境噪音或敏感对话，其余声音完整保留。',
        },
        {
          title: '无水印且支持 PWA 离线',
          desc: '导出干净无标识，无次数限制，可添加到桌面作为独立应用离线打开。',
        },
      ],
    },
    guides: {
      title: '免费为 iPhone、YouTube、TikTok 与 MP4 视频消音指南',
      subtitle: '覆盖手机与电脑端无水印去除视频声音的常见场景。',
      items: [
        {
          title: '在 iPhone 和 Android 上去除视频声音 (MOV / MP4)',
          desc: '无需额外 App，用 Safari 或 Chrome 打开 MuteVideo，直接选取相册中的 MOV 或 MP4 视频即可在 1 秒内本地去声。',
        },
        {
          title: '为 YouTube、TikTok 和抖音 / Reels 视频消音',
          desc: '在配音或加背景音乐前彻底清除原声，或仅把指定几秒的杂音静音保留其余原声。',
        },
        {
          title: '无水印移除 MP4 音轨 (-c copy -an)',
          desc: 'MuteVideo 采用无损流拷贝 (-c copy -an) 去除 MP4、WebM、MKV 和 AVI 音频，100% 保持原视频分辨率与帧率。',
        },
      ],
    },
    comparison: {
      title: 'MuteVideo 与 Clideo、CapCut 网页版及 Canva 对比',
      subtitle: '为什么在浏览器本地内存中静音远胜上传至 Clideo、CapCut 或 Canva 服务器。',
      colFeature: '核心能力',
      colOurs: 'MuteVideo（本地 WASM）',
      colClideo: 'Clideo',
      colCapcut: 'CapCut Web',
      colCanva: 'Canva',
      rows: [
        {
          feature: '上传等待时间',
          ours: '0 秒（本地内存直处理）',
          clideo: '上传缓慢且需排队',
          capcut: '需登录账号与云同步',
          canva: '需等待项目上传导入',
        },
        {
          feature: '视频画质',
          ours: '100% 无损 (-c copy -an)',
          clideo: '服务器重新编码',
          capcut: '导出时重新编码',
          canva: '压缩重编码且有限制',
        },
        {
          feature: '水印与付费墙',
          ours: '零水印 • 永久免费',
          clideo: '免费版带水印',
          capcut: '导出含 Pro 付费限制',
          canva: '高清导出需 Pro 会员',
        },
        {
          feature: '隐私与数据安全',
          ours: '文件永不离开设备',
          clideo: '上传至第三方服务器',
          capcut: '存储于云端工作区',
          canva: '上传至 Canva 服务器',
        },
        {
          feature: '自定义时段静音',
          ours: '一键起止滑块直设',
          clideo: '仅全静音或手动剪辑',
          capcut: '需进入复杂时间线',
          canva: '需手动拆分音轨',
        },
      ],
    },
    faq: {
      title: '常见问题',
      items: [
        {
          q: '如何在 iPhone 或 Android 上免费去除视频声音？',
          a: '在手机浏览器（Safari 或 Chrome）打开 MuteVideo，点击“选择要静音的视频”从相册挑选视频，然后点击“立即移除声音”。全程在浏览器内完成，零上传且无任何水印。',
        },
        {
          q: '视频静音后会降低画质吗？',
          a: '不会！MuteVideo 使用无损流拷贝（-c copy -an）仅移除音轨，不对视频画面进行任何重编码，不到 1 秒即可导出 100% 原画质视频。',
        },
        {
          q: '为什么选择 MuteVideo 而不是 Clideo 或 Canva？',
          a: '云端编辑器需要把大体积视频上传至远程服务器并排队等待，去水印还需付费。MuteVideo 在您的浏览器 RAM 中 100% 本地处理，瞬间完成、绝对私密且永久免费。',
        },
        {
          q: '可以只消音视频中的某几秒吗？',
          a: '可以。导入视频后选择“静音指定时间段”，拖动开始与结束滑块即可。',
        },
        {
          q: '支持哪些视频格式？',
          a: '支持 MP4、MOV、WebM、MKV、AVI、M4V 及绝大多数手机和桌面录像格式。',
        },
        {
          q: '为什么有时需要保留静音音轨容器？',
          a: '部分社交平台在上传时要求视频文件必须包含音频流头信息，保留静音音轨可避免兼容错误。',
        },
      ],
    },
    footer: {
      tagline: 'MuteVideo — 极速、无损、100% 本地视频消音工具',
      privacyNote: '零上传 • 完全在浏览器本地内存运行',
      copyright: '© 2026 MuteVideo',
      githubLink: 'GitHub 仓库',
      supportLink: '支持开发者',
    },
  },

  ru: {
    meta: {
      title: 'Удалить Звук из Видео Онлайн — Заглушить Бесплатно',
      description:
        'Удалите звук из MP4, iPhone MOV, TikTok и YouTube видео за 1 секунду. 100% бесплатно в браузере, без загрузок и водяных знаков.',
      keywords:
        'удалить звук из видео, убрать аудио из видео онлайн, убрать звук на айфоне, выключить звук мп4, заглушить видео тикток, без водяных знаков',
    },
    nav: {
      brandTitle: 'MuteVideo',
      homeAria: 'Главная MuteVideo',
      languageLabel: 'Выбрать язык',
      languageAria: 'Выбрать язык интерфейса',
      themeToggleAria: 'Переключить светлую или тёмную тему',
      themeToDark: 'Включить тёмную тему',
      themeToLight: 'Включить светлую тему',
      githubAria: 'Открыть MuteVideo на GitHub',
      installPwa: 'На экран «Домой»',
      installPwaAria: 'Добавить MuteVideo на экран «Домой»',
      installedLabel: 'Установлено',
      installModalTitle: 'Установить приложение MuteVideo',
      installModalBody: 'Используйте MuteVideo офлайн как лёгкое приложение без серверов и слежки:',
      installModalDesktop: 'Chrome / Edge ПК: Нажмите на значок установки в адресной строке браузера.',
      installModalAndroid: 'Android Chrome: Откройте меню и нажмите «Добавить на гл. экран».',
      installModalIos: 'iPhone / iPad Safari: Нажмите «Поделиться» и выберите «На экран “Домой”».',
      installModalClose: 'Понятно',
      supportDev: 'Поддержать Автора',
      supportDevAria: 'Поддержать разработчика чашкой кофе',
    },
    hero: {
      h1: 'Удалить Звук из Видео Онлайн',
    },
    workspace: {
      step1: {
        dropTitle: 'Перетащите видео сюда, чтобы убрать звук',
        dropTitleActive: 'Отпустите видео для начала',
        dropSubtitle: 'Мгновенное удаление аудио без потери качества или отключение звука на нужном отрезке в браузере.',
        selectBtn: 'Выбрать Видео без Звука',
        formatsBadge: 'MP4 • MOV • WebM • MKV • AVI',
        sampleBtn: 'Попробовать на Примере',
        sampleGenerating: 'Создание тестового видео...',
        privacyPill: 'Без Загрузки на Сервер • 100% Оригинальное Качество • Без Водяных Знаков',
      },
      step2: {
        previewHeading: 'Предпросмотр Видео',
        soundOnLabel: 'Звук Включён (Оригинал)',
        soundOffLabel: 'Звук Выключен (Превью без звука)',
        soundComparisonHint: 'Нажмите для переключения звука и сравнения результата перед экспортом.',
        changeFileBtn: 'Другое Видео',
        modeSectionLabel: 'Выберите Режим Удаления Звука',
        modeFullTitle: 'Полное Отключение Звука',
        modeFullBadge: 'Мгновенно без потерь за 1 сек • По умолчанию',
        modeFullDesc:
          'Удаляет аудиопоток целиком без перекодирования видео. Сохраняет 100% исходного качества и частоты кадров.',
        modeRangeTitle: 'Заглушить Выбранный Участок',
        modeRangeBadge: 'Ползунки Начала / Конца',
        modeRangeDesc:
          'Уберите лишний шум ветра, слова или звук только в заданном интервале, оставив остальное аудио.',
        startTimeLabel: 'Начало тишины',
        endTimeLabel: 'Конец тишины',
        mutedSegmentSummary: 'Заглушенный отрезок',
        silentTrackLabel: 'Оставить тихую аудиодорожку в контейнере',
        silentTrackDesc: 'Сохраняет пустую AAC-дорожку для строгих соцсетей вроде Instagram Reels и TikTok.',
        removeAudioBtn: 'Удалить Звук Сейчас',
      },
      step3: {
        stageLoading: 'Загрузка локального движка FFmpeg WebAssembly...',
        stageProbing: 'Анализ видео и аудиопотоков в памяти браузера...',
        stageFullMute: 'Мгновенное удаление аудиопотока...',
        stageRangeMute: 'Отключение звука на выбранном участке...',
        stageFinalizing: 'Финализация видео без звука...',
        privacyBadge: '100% Локальная обработка в RAM браузера — Без загрузок и водяных знаков',
        cancelBtn: 'Отмена',
      },
      step4: {
        savedBadgePrefix: 'Звук Удалён • Качество Видео 100% Без Изменений',
        savedAmountPrefix: 'Сэкономлено',
        noAudioAlreadyNote: 'Видео Очищено • Готово к Скачиванию',
        previewLabel: 'Видео без Звука Готово',
        downloadBtn: 'Скачать Видео без Звука',
        muteAnotherBtn: 'Обработать Другое Видео',
        coffeeTitle: 'Сэкономили время сегодня?',
        coffeeDesc: 'MuteVideo полностью бесплатен, без рекламы и водяных знаков. Угостите автора кофе.',
        coffeeCta: 'Угостить Автора Кофе',
      },
      errors: {
        unsupportedFile: 'Выберите поддерживаемый видеофайл (MP4, MOV, WebM, MKV или AVI).',
        invalidRange: 'Время окончания должно быть больше времени начала.',
        processFailed: 'Ошибка обработки в памяти браузера. Попробуйте режим «Полное Отключение» или другой формат.',
      },
    },
    breadcrumbs: {
      ariaLabel: 'Хлебные крошки',
      home: 'Главная',
      tools: 'Инструменты для видео и аудио',
      current: 'Убрать звук из видео',
    },
    howTo: {
      title: 'Как Удалить Звук из Видео Онлайн Бесплатно',
      subtitle: 'Без установки программ, без регистрации и без ожидания загрузки.',
      steps: [
        {
          title: '1. Выберите или перетащите видео',
          desc: "Перетащите файл MP4, iPhone MOV или WebM в окно MuteVideo (или нажмите «Выбрать Видео без Звука»).",
        },
        {
          title: '2. Выберите полное или частичное заглушение',
          desc: "Выберите «Полное Отключение Звука» для удаления без потерь за 1 секунду или укажите интервал времени.",
        },
        {
          title: '3. Удалите звук и скачайте сразу',
          desc: "Нажмите «Удалить Звук Сейчас» и мгновенно скачайте готовое видео без водяных знаков.",
        },
      ],
    },
    features: {
      title: 'Создано для Приватности, Скорости и Оригинального Качества',
      items: [
        {
          title: 'Удаление без потерь за 1 секунду',
          desc: 'При полном отключении работает прямое копирование видеопотока (-c copy -an) без перекодирования.',
        },
        {
          title: '100% Защита без Загрузки на Сервер',
          desc: 'Вся обработка происходит локально через WebAssembly в RAM вашего устройства.',
        },
        {
          title: 'Точное Заглушение по Времени',
          desc: 'Убирайте посторонние шумы в нужном промежутке, сохраняя остальную часть звуковой дорожки.',
        },
        {
          title: 'Без Водяных Знаков и Офлайн PWA',
          desc: 'Никаких логотипов, ограничений и лимитов. Можно установить на рабочий стол.',
        },
      ],
    },
    guides: {
      title: 'Как Убрать Звук в Видео на iPhone, YouTube, TikTok и MP4 Бесплатно',
      subtitle: 'Всё необходимое для удаления звука без водяных знаков на телефоне и компьютере.',
      items: [
        {
          title: 'Удаление звука из видео на iPhone и Android (MOV / MP4)',
          desc: 'Откройте MuteVideo в Safari или Chrome, выберите ролик MOV или MP4 из галереи и удалите звук локально за 1 секунду.',
        },
        {
          title: 'Как заглушить видео для YouTube, TikTok и Reels',
          desc: 'Удалите исходный шум перед наложением музыки или отключите звук только на нужном отрезке для TikTok, Reels и Shorts.',
        },
        {
          title: 'Убрать аудиопоток из MP4 без водяных знаков (-c copy -an)',
          desc: 'MuteVideo использует прямое копирование (-c copy -an) для удаления звука из MP4, WebM, MKV и AVI при 100% исходном качестве.',
        },
      ],
    },
    comparison: {
      title: 'MuteVideo против Clideo, CapCut Web и Canva',
      subtitle: 'Почему локальная обработка в браузере превосходит Clideo, CapCut Web и Canva.',
      colFeature: 'Параметр',
      colOurs: 'MuteVideo (Локальный WASM)',
      colClideo: 'Clideo',
      colCapcut: 'CapCut Web',
      colCanva: 'Canva',
      rows: [
        {
          feature: 'Ожидание загрузки',
          ours: '0 секунд (RAM браузера)',
          clideo: 'Долгая загрузка и очередь',
          capcut: 'Нужен вход и облако',
          canva: 'Ожидание импорта файла',
        },
        {
          feature: 'Качество видео',
          ours: '100% Без потерь (-c copy -an)',
          clideo: 'Перекодируется на сервере',
          capcut: 'Перекодируется при экспорте',
          canva: 'Сжатие с ограничением',
        },
        {
          feature: 'Водяные знаки и оплата',
          ours: 'Без знаков • Бесплатно',
          clideo: 'Водяной знак в бесплатном плане',
          capcut: 'Pro-лимиты на экспорт',
          canva: 'HD-опции в тарифе Pro',
        },
        {
          feature: 'Приватность',
          ours: 'Не покидает устройство',
          clideo: 'Загружается на чужие серверы',
          capcut: 'Хранится в облаке',
          canva: 'Загружается на серверы Canva',
        },
        {
          feature: 'Заглушение отрезка',
          ours: 'Ползунки Начала / Конца',
          clideo: 'Полностью или ручная резка',
          capcut: 'Нужен полный таймлайн',
          canva: 'Нужно делить дорожку',
        },
      ],
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      items: [
        {
          q: 'Как бесплатно убрать звук из видео на iPhone или Android?',
          a: 'Откройте MuteVideo в Safari или Chrome на телефоне, нажмите «Выбрать Видео без Звука» и выберите ролик из галереи, затем нажмите «Удалить Звук Сейчас». Аудио удаляется мгновенно в браузере без загрузок и водяных знаков.',
        },
        {
          q: 'Снижается ли качество видео при отключении звука?',
          a: 'Нет! MuteVideo использует прямое копирование потока без потерь (-c copy -an), не перекодируя ни единого пикселя. Ваше видео сохраняет 100% исходного разрешения и частоты кадров.',
        },
        {
          q: 'Почему стоит выбрать MuteVideo вместо Clideo или Canva?',
          a: 'Облачные редакторы требуют загружать тяжёлые файлы на серверы, ждать очереди и платить за удаление водяного знака. MuteVideo работает на 100% локально в RAM вашего браузера — мгновенно, приватно и бесплатно навсегда.',
        },
        {
          q: 'Можно ли убрать звук только на части видео?',
          a: 'Да. Выберите режим «Заглушить Выбранный Участок» и настройте ползунки начала и конца.',
        },
        {
          q: 'Какие форматы видео поддерживаются?',
          a: 'MP4, MOV, WebM, MKV, AVI, M4V и большинство стандартных записей с телефона и ПК.',
        },
        {
          q: 'Зачем нужна тихая аудиодорожка в контейнере?',
          a: 'Некоторые платформы требуют наличия заголовка аудиопотока в файле, даже если в нём полная тишина.',
        },
      ],
    },
    footer: {
      tagline: 'MuteVideo — Мгновенное и Безопасное Удаление Звука 100% Локально',
      privacyNote: 'Без Загрузки • Локальная Обработка в RAM Браузера',
      copyright: '© 2026 MuteVideo',
      githubLink: 'Репозиторий GitHub',
      supportLink: 'Поддержать Автора',
    },
  },
};
