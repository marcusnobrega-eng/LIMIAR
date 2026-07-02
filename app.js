const STATUS_MAP = {
  n: 'normal',
  w: 'warning',
  f: 'flooded',
  e: 'extreme_flooding',
  x: 'no_data',
};

const BASIS_MAP = {
  h: 'hydraulic',
  q: 'q2_fallback',
  t: 'tr_alert_severe',
  u: 'unknown',
};

const STATUS_COLORS = {
  normal: '#2F7F8F',
  warning: '#D89B2B',
  flooded: '#C54B3C',
  extreme_flooding: '#7A1F2B',
  no_data: '#97A3A8',
};

const TEXT = {
  pt: {
    pageTitle: 'LIMIAR',
    brandTitle: 'LIMIAR',
    brandSubtitle: 'Levels and Indicators for Monitoring Inundation Across Rivers',
    dateLabel: 'Data',
    theoryButton: 'Como funciona',
    fitMapButton: 'Ajustar mapa',
    exportCsvButton: 'Exportar CSV',
    shareButton: 'Compartilhar',
    eyebrowLabel: 'Atlas histórico e de triagem',
    heroTitle: 'Busca diária de estações com sinais de inundação',
    heroText: 'Selecione uma data para ver quais estações estão em condição normal, em alerta, inundadas ou em inundação extrema.',
    statStationsLabel: 'Estações publicadas',
    statRangeLabel: 'Período',
    statLatestLabel: 'Última data',
    filtersTitle: 'Filtros',
    searchLabel: 'Busca',
    searchPlaceholder: 'Código, nome, UF, município, bacia',
    statusFilterLabel: 'Status',
    basisFilterLabel: 'Tipo de limiar',
    qaFilterLabel: 'Uso recomendado',
    ufFilterLabel: 'UF',
    basinFilterLabel: 'Bacia',
    biomeFilterLabel: 'Bioma',
    stationListTitle: 'Estações',
    selectedStatusEyebrow: 'Status da data',
    selectedStatusTitle: 'Selecione uma estação',
    selectedStatusSubtitle: 'Clique em uma estação no mapa ou na lista.',
    selectedMetricStatusLabel: 'Status',
    selectedMetricBasisLabel: 'Limiar usado',
    selectedMetricQaLabel: 'Incerteza',
    legendTitle: 'Legenda',
    stationTabButton: 'Estação',
    datasetTabButton: 'Conjunto',
    stationHeading: 'Estação',
    stationSubheading: 'Nenhuma estação selecionada',
    exportReportButton: 'Exportar DOCX',
    metadataTitle: 'Metadados e limiares',
    timeseriesTitle: 'Série temporal principal',
    evidenceTitle: 'Evolução dos limiares e máximos anuais',
    evidenceSubtitle: 'Mudanças de limiar ao longo do registro, com máximos anuais observados',
    eventSummaryTitle: 'Resumo de eventos',
    recentEventsTitle: 'Eventos recentes e significativos',
    qaTitle: 'Evidência hidráulica detalhada e incerteza',
    seasonalityTitle: 'Sazonalidade dos eventos',
    seasonalitySubtitle: 'Picos de eventos reconstruídos ao longo do ano',
    datasetTotalsTitle: 'Totais do conjunto',
    statusTotalsTitle: 'Totais da data selecionada',
    howToReadTitle: 'Como interpretar',
    howToReadText: 'O mapa usa primeiro limiares hidráulicos observados. Onde eles não existem, o atlas usa Q2 estatístico. Alerta e inundação severa usam limiares estatísticos de período de retorno.',
    thStartDate: 'Início',
    caveatTitle: 'Caveat científico',
    caveatText: 'Este é um atlas histórico de triagem e reconstrução. Ele não representa um sistema operacional em tempo real nem substitui validação hidrológica local.',
    thPeakDate: 'Data de pico',
    thDuration: 'Duração',
    thPeak: 'Pico',
    thClass: 'Classe',
    visibleStations: 'visíveis',
    fullRecordLabel: 'Registro completo',
    allStatesLabel: 'Todas',
    allBasinsLabel: 'Todas',
    allBiomesLabel: 'Todos',
    qaPanelsLabel: 'Painéis QA',
    noQaFlags: 'Nenhuma flag adicional registrada.',
    noQaPanel: 'Painel QA indisponível para esta estação.',
    emptyEvidence: 'Sem intervalos suficientes para resumir a evolução dos limiares nesta estação.',
    legendPointNote: 'Todos os pontos têm o mesmo tamanho. A cor mostra a classe do dia.',
    imageExpandButton: 'Ampliar figura',
    imageOverlayTitle: 'Painel hidráulico detalhado',
    closeLabel: 'Fechar',
    fatalTitle: 'Falha ao carregar o atlas',
    fatalMessage: 'Abra este site por um servidor local para que os arquivos de dados possam ser lidos.',
    fatalCommandLabel: 'No terminal, dentro da pasta docs, rode:',
    status: {
      all: 'Todos',
      normal: 'Normal',
      warning: 'Alerta',
      flooded: 'Inundada',
      extreme_flooding: 'Inundação extrema',
      no_data: 'Sem dados',
    },
    basis: {
      all: 'Todos',
      hydraulic: 'Evidência hidráulica',
      q2_fallback: 'Q2 estatístico',
      tr_alert_severe: 'Retorno estatístico',
      unknown: 'Base indisponível',
    },
    qa: {
      all: 'Todas',
      screening_ok: 'Pronto para uso',
      manual_review_medium: 'Conferir painel',
      manual_review_high: 'Checar com cuidado',
    },
    legend: {
      normal: 'Normal',
      warning: 'Alerta',
      flooded: 'Inundada',
      extreme_flooding: 'Extrema',
      no_data: 'Sem dados',
    },
    fields: {
      stationCode: 'Código',
      stationType: 'Tipo',
      uf: 'UF',
      municipality: 'Município',
      basin: 'Bacia',
      biome: 'Bioma',
      operator: 'Operador',
      agency: 'Agência responsável',
      drainageArea: 'Área de drenagem',
      altitude: 'Altitude',
      operating: 'Em operação',
      thresholdBasis: 'Tipo de limiar',
      thresholdSource: 'Origem do limiar',
      thresholdType: 'Variável principal',
      thresholdValue: 'Limiar de inundação',
      q2: 'Q2',
      q2Years: 'Anos válidos Q2',
      percentile: 'Percentil do limiar',
      exceedance: 'Fração excedida',
      eventFrequency: 'Eventos/ano',
      maxDuration: 'Maior duração',
      meanDuration: 'Duração média',
      durationStd: 'Desvio-padrão da duração',
      cautionLevel: 'Uso recomendado',
      uncertainty: 'Incerteza',
      eventStart: 'Início do evento',
      selectedDate: 'Data selecionada',
      observed: 'Valor observado',
      alert: 'Limiar de alerta',
      flood: 'Limiar de inundação',
      severe: 'Limiar severo',
      range: 'Período',
      eventCount: 'Eventos',
      qaClass: 'Revisão',
      noData: 'Sem dado para a data',
      available: 'Disponível',
    },
    report: {
      title: 'Relatório técnico da estação',
      summarySection: 'Resumo da estação',
      methodSection: 'Como interpretar esta estação',
      methodText: 'O LIMIAR compara o valor diário observado com os limiares de alerta, inundação e severidade. Sempre que existe evidência hidráulica observada, ela é priorizada; quando não existe, o atlas usa o Q2 estatístico como referência de inundação. Este produto é histórico e de triagem, não um sistema operacional em tempo real.',
      statusSection: 'Situação na data selecionada',
      chartSection: 'Série temporal principal',
      chartCaption: 'Registro diário observado com a data selecionada e os limiares aplicados.',
      evidenceSection: 'Evolução de limiares e máximos anuais',
      evidenceCaption: 'Máximos anuais observados comparados com os limiares vigentes em cada período. Marcadores indicam anos com atualização de seção transversal.',
      eventsSection: 'Eventos recentes e significativos',
      qaSection: 'Painel hidráulico e QA',
      qaCaption: 'Painel detalhado com seção observada, curva-chave, Q2 e contexto de máximos anuais.',
      fallbackImage: 'Painel hidráulico indisponível para esta estação.',
    },
    units: {
      stage_cm: 'cm',
      discharge_m3s: 'm³/s',
      days: 'dias',
    },
    qaFigureCaption: 'Painel da estação com a evidência hidráulica e os limiares usados na reconstrução.',
    emptyTimeseries: 'Sem série temporal disponível para esta estação.',
    emptySeasonality: 'Sem eventos suficientes para analisar sazonalidade nesta estação.',
    seasonalityNoEvents: 'Não foi possível derivar um padrão sazonal confiável para os eventos reconstruídos desta estação.',
    theory: {
      eyebrow: 'Como o atlas funciona',
      title: 'Teoria e fluxo de reconstrução',
      intro: 'LIMIAR organiza séries diárias, evidência hidráulica observada e limiares estatísticos em um atlas histórico para triagem de sinais de inundação em estações brasileiras.',
      steps: [
        {
          title: 'Base observacional',
          text: 'Partimos do registro diário disponível na estação e identificamos o tipo principal de variável publicada: cota ou vazão.',
        },
        {
          title: 'Limiar principal',
          text: 'Quando existe seção hidráulica observada, ela define o limiar de inundação. Onde essa evidência não existe, usamos o Q2 estatístico como fallback.',
        },
        {
          title: 'Faixas de alerta e severidade',
          text: 'Os níveis de alerta e de inundação severa são derivados de limiares estatísticos de período de retorno e aparecem apenas quando fazem sentido para a estação.',
        },
        {
          title: 'Reconstrução histórica',
          text: 'Cada dia do registro é comparado com os limiares vigentes no período para reconstruir episódios, duração, picos e sazonalidade.',
        },
      ],
      classesTitle: 'Como um dia é classificado',
      classesText: 'Na interface, a cor do ponto mostra apenas a classe daquele dia. O tamanho dos pontos não carrega informação adicional.',
      classDescriptions: {
        normal: 'Há leitura válida e nenhum limiar é excedido.',
        warning: 'O limiar de alerta é excedido, mas o limiar de inundação ainda não foi atingido.',
        flooded: 'O limiar de inundação é excedido. Sempre que possível, isso vem de evidência hidráulica observada.',
        extreme_flooding: 'O limiar severo é excedido, indicando um episódio raro e mais intenso.',
      },
      caveatTitle: 'Leitura correta do produto',
      caveatText: 'O atlas foi feito para análise histórica, priorização e comunicação científica. Ele não substitui modelagem local, vistoria de campo ou operação oficial de alerta.',
    },
    toasts: {
      loading: 'Carregando...',
      copied: 'Link copiado.',
      reportReady: 'Relatório DOCX gerado.',
      reportError: 'Falha ao gerar o relatório.',
      csvReady: 'CSV exportado.',
      loadError: 'Falha ao carregar o atlas.',
    },
  },
  en: {
    pageTitle: 'LIMIAR',
    brandTitle: 'LIMIAR',
    brandSubtitle: 'Levels and Indicators for Monitoring Inundation Across Rivers',
    dateLabel: 'Date',
    theoryButton: 'How it works',
    fitMapButton: 'Fit map',
    exportCsvButton: 'Export CSV',
    shareButton: 'Share',
    eyebrowLabel: 'Historical screening atlas',
    heroTitle: 'Daily search for stations with flood signals',
    heroText: 'Pick a date to see which stations are normal, in warning, flooded, or in extreme flooding.',
    statStationsLabel: 'Published stations',
    statRangeLabel: 'Date range',
    statLatestLabel: 'Latest date',
    filtersTitle: 'Filters',
    searchLabel: 'Search',
    searchPlaceholder: 'Code, name, state, municipality, basin',
    statusFilterLabel: 'Status',
    basisFilterLabel: 'Threshold type',
    qaFilterLabel: 'Recommended use',
    ufFilterLabel: 'State',
    basinFilterLabel: 'Basin',
    biomeFilterLabel: 'Biome',
    stationListTitle: 'Stations',
    selectedStatusEyebrow: 'Selected-day status',
    selectedStatusTitle: 'Select a station',
    selectedStatusSubtitle: 'Click a station on the map or in the list.',
    selectedMetricStatusLabel: 'Status',
    selectedMetricBasisLabel: 'Basis used',
    selectedMetricQaLabel: 'Uncertainty',
    legendTitle: 'Legend',
    stationTabButton: 'Station',
    datasetTabButton: 'Dataset',
    stationHeading: 'Station',
    stationSubheading: 'No station selected',
    exportReportButton: 'Export DOCX',
    metadataTitle: 'Metadata and thresholds',
    timeseriesTitle: 'Primary time series',
    evidenceTitle: 'Threshold evolution and annual maxima',
    evidenceSubtitle: 'Threshold changes through the record, with observed annual maxima',
    eventSummaryTitle: 'Event summary',
    recentEventsTitle: 'Recent and significant events',
    qaTitle: 'Detailed hydraulic evidence and uncertainty',
    seasonalityTitle: 'Event seasonality',
    seasonalitySubtitle: 'Reconstructed event peaks across the year',
    datasetTotalsTitle: 'Dataset totals',
    statusTotalsTitle: 'Selected-day totals',
    howToReadTitle: 'How to read',
    howToReadText: 'The map prioritizes observed hydraulic thresholds. Where those do not exist, the atlas uses statistical Q2 thresholds. Warning and severe flooding use statistical return-period thresholds.',
    thStartDate: 'Start',
    caveatTitle: 'Scientific caveat',
    caveatText: 'This is a historical screening and reconstruction atlas. It is not a real-time operational warning system and does not replace local hydrologic validation.',
    thPeakDate: 'Peak date',
    thDuration: 'Duration',
    thPeak: 'Peak',
    thClass: 'Class',
    visibleStations: 'visible',
    fullRecordLabel: 'Full record',
    allStatesLabel: 'All',
    allBasinsLabel: 'All',
    allBiomesLabel: 'All',
    qaPanelsLabel: 'QA panels',
    noQaFlags: 'No additional flags recorded.',
    noQaPanel: 'QA panel not available for this station.',
    emptyEvidence: 'Not enough intervals are available to summarize threshold evolution for this station.',
    legendPointNote: 'All points use the same size. Color shows the selected-day class.',
    imageExpandButton: 'Expand figure',
    imageOverlayTitle: 'Detailed hydraulic panel',
    closeLabel: 'Close',
    fatalTitle: 'Atlas failed to load',
    fatalMessage: 'Open this site through a local web server so the browser can read the data files.',
    fatalCommandLabel: 'From the terminal, inside the docs folder, run:',
    status: {
      all: 'All',
      normal: 'Normal',
      warning: 'Warning',
      flooded: 'Flooded',
      extreme_flooding: 'Extreme flooding',
      no_data: 'No data',
    },
    basis: {
      all: 'All',
      hydraulic: 'Hydraulic evidence',
      q2_fallback: 'Statistical Q2',
      tr_alert_severe: 'Return-period threshold',
      unknown: 'Basis unavailable',
    },
    qa: {
      all: 'All',
      screening_ok: 'Ready to use',
      manual_review_medium: 'Check panel',
      manual_review_high: 'Review carefully',
    },
    legend: {
      normal: 'Normal',
      warning: 'Warning',
      flooded: 'Flooded',
      extreme_flooding: 'Extreme',
      no_data: 'No data',
    },
    fields: {
      stationCode: 'Code',
      stationType: 'Type',
      uf: 'State',
      municipality: 'Municipality',
      basin: 'Basin',
      biome: 'Biome',
      operator: 'Operator',
      agency: 'Responsible agency',
      drainageArea: 'Drainage area',
      altitude: 'Altitude',
      operating: 'Operating',
      thresholdBasis: 'Threshold type',
      thresholdSource: 'Threshold origin',
      thresholdType: 'Primary variable',
      thresholdValue: 'Flood threshold',
      q2: 'Q2',
      q2Years: 'Valid Q2 years',
      percentile: 'Threshold percentile',
      exceedance: 'Exceedance fraction',
      eventFrequency: 'Events/year',
      maxDuration: 'Longest duration',
      meanDuration: 'Mean duration',
      durationStd: 'Duration standard deviation',
      cautionLevel: 'Recommended use',
      uncertainty: 'Uncertainty',
      eventStart: 'Event start',
      selectedDate: 'Selected date',
      observed: 'Observed value',
      alert: 'Alert threshold',
      flood: 'Flood threshold',
      severe: 'Severe threshold',
      range: 'Range',
      eventCount: 'Events',
      qaClass: 'Review',
      noData: 'No reading for this date',
      available: 'Available',
    },
    report: {
      title: 'Station technical brief',
      summarySection: 'Station summary',
      methodSection: 'How to interpret this station',
      methodText: 'LIMIAR compares the observed daily value against the alert, flood, and severe thresholds. Whenever observed hydraulic evidence exists, it is prioritized; where it does not, the atlas uses statistical Q2 as the flood reference. This is a historical screening product, not a real-time operational warning system.',
      statusSection: 'Selected-day conditions',
      chartSection: 'Primary time series',
      chartCaption: 'Observed daily record with the selected day and the thresholds applied to that period.',
      evidenceSection: 'Threshold evolution and annual maxima',
      evidenceCaption: 'Observed annual maxima compared with the thresholds in force for each period. Markers show years with cross-section updates.',
      eventsSection: 'Recent and significant events',
      qaSection: 'Hydraulic panel and QA',
      qaCaption: 'Detailed panel with the observed cross section, rating-curve context, Q2, and annual-maxima evidence.',
      fallbackImage: 'Hydraulic panel not available for this station.',
    },
    units: {
      stage_cm: 'cm',
      discharge_m3s: 'm3/s',
      days: 'days',
    },
    qaFigureCaption: 'Station panel with the hydraulic evidence and thresholds used in the reconstruction.',
    emptyTimeseries: 'No time series is available for this station.',
    emptySeasonality: 'Not enough events are available to analyze seasonality for this station.',
    seasonalityNoEvents: 'No reliable seasonal pattern could be derived for reconstructed events at this station.',
    theory: {
      eyebrow: 'How the atlas works',
      title: 'Theory and reconstruction workflow',
      intro: 'LIMIAR organizes daily records, observed hydraulic evidence, and statistical thresholds into a historical atlas for screening flood signals at Brazilian stations.',
      steps: [
        {
          title: 'Observed record',
          text: 'We start from the daily station record and identify the main published variable for the site: stage or discharge.',
        },
        {
          title: 'Primary flood threshold',
          text: 'When an observed hydraulic cross section exists, it defines the flood threshold. Where that evidence does not exist, statistical Q2 is used as a fallback.',
        },
        {
          title: 'Warning and severe bands',
          text: 'Warning and severe-flood levels are derived from statistical return-period thresholds and are shown only when they are meaningful for the station.',
        },
        {
          title: 'Historical reconstruction',
          text: 'Each day in the record is compared against the thresholds active for that period to reconstruct episodes, duration, peaks, and seasonality.',
        },
      ],
      classesTitle: 'How a day is classified',
      classesText: 'In the interface, point color shows only the class for that day. Point size does not encode additional information.',
      classDescriptions: {
        normal: 'A valid reading exists and no threshold is exceeded.',
        warning: 'The alert threshold is exceeded, but the flood threshold is not.',
        flooded: 'The flood threshold is exceeded. Whenever possible, this comes from observed hydraulic evidence.',
        extreme_flooding: 'The severe threshold is exceeded, indicating a rarer and more intense episode.',
      },
      caveatTitle: 'How to read the product correctly',
      caveatText: 'The atlas is intended for historical analysis, prioritization, and scientific communication. It does not replace local modeling, field review, or official warning operations.',
    },
    toasts: {
      loading: 'Loading...',
      copied: 'Link copied.',
      reportReady: 'DOCX report generated.',
      reportError: 'Could not generate report.',
      csvReady: 'CSV exported.',
      loadError: 'Failed to load atlas.',
    },
  },
};

const UNCERTAINTY_TEXT = {
  low: { pt: 'Baixa', en: 'Low' },
  medium: { pt: 'Média', en: 'Medium' },
  high: { pt: 'Alta', en: 'High' },
};

const CAUTION_TEXT = {
  screening_ok: {
    level: 'low',
    pt: 'Uso direto',
    en: 'Direct use',
  },
  manual_review_medium: {
    level: 'medium',
    pt: 'Use com cautela',
    en: 'Use with caution',
  },
  manual_review_high: {
    level: 'high',
    pt: 'Revisão detalhada recomendada',
    en: 'Detailed review recommended',
  },
};

const THRESHOLD_SOURCE_TEXT = {
  hydraulic_observed_cross_section_stage: {
    pt: 'Seção hidráulica observada (cota)',
    en: 'Observed hydraulic cross section (stage)',
  },
  hydraulic_observed_cross_section_discharge: {
    pt: 'Seção hidráulica observada (vazão)',
    en: 'Observed hydraulic cross section (discharge)',
  },
  q2_gumbel: {
    pt: 'Q2 estatístico (Gumbel)',
    en: 'Statistical Q2 (Gumbel)',
  },
};

const EVENT_CLASS_TEXT = {
  severe_flood_tr3p5: {
    pt: 'Inundação severa (TR 3,5 anos)',
    en: 'Severe flooding (3.5-year return period)',
  },
  flood_tr2: {
    pt: 'Inundação (TR 2 anos)',
    en: 'Flooding (2-year return period)',
  },
  alert_tr1p25: {
    pt: 'Alerta (TR 1,25 anos)',
    en: 'Warning (1.25-year return period)',
  },
  below_alert_tr1p25: {
    pt: 'Abaixo do limiar de alerta',
    en: 'Below the alert threshold',
  },
};

const QA_FLAG_TEXT = {
  stage_threshold_preferred: {
    pt: 'Cota usada como limiar principal',
    en: 'Stage used as the primary threshold',
  },
  before_first_cross_section_uses_earliest_available: {
    pt: 'Período inicial usa a seção disponível mais antiga',
    en: 'Early record uses the earliest available cross section',
  },
  cross_section_more_than_10yr_from_record_midpoint: {
    pt: 'Seção transversal distante do centro do período observado',
    en: 'Cross section is far from the midpoint of the observed record',
  },
  long_seasonal_event_detected: {
    pt: 'Evento sazonal longo detectado',
    en: 'Long seasonal event detected',
  },
  multi_year_event_detected: {
    pt: 'Evento multianual detectado',
    en: 'Multi-year event detected',
  },
  threshold_exceeded_more_than_10pct_days: {
    pt: 'Limiar excedido em mais de 10% dos dias observados',
    en: 'Threshold exceeded on more than 10% of observed days',
  },
  many_events_gt_250_and_gt_2_per_year: {
    pt: 'Muitos eventos ao longo da série',
    en: 'Many events across the observed record',
  },
  very_high_event_frequency_gt_5_per_year: {
    pt: 'Frequência de eventos muito alta',
    en: 'Very high event frequency',
  },
  very_long_event_detected: {
    pt: 'Evento de longa duração detectado',
    en: 'Very long event detected',
  },
  bankfull_discharge_more_than_twice_q2: {
    pt: 'Vazão hidráulica muito acima do Q2 estatístico',
    en: 'Hydraulic bankfull discharge is much higher than statistical Q2',
  },
};

const QA_FLAG_LEVEL = {
  stage_threshold_preferred: 'good',
  before_first_cross_section_uses_earliest_available: 'caution',
  cross_section_more_than_10yr_from_record_midpoint: 'high',
  long_seasonal_event_detected: 'caution',
  multi_year_event_detected: 'high',
  threshold_exceeded_more_than_10pct_days: 'high',
  many_events_gt_250_and_gt_2_per_year: 'high',
  very_high_event_frequency_gt_5_per_year: 'high',
  very_long_event_detected: 'caution',
  bankfull_discharge_more_than_twice_q2: 'high',
};

const MONTH_LABELS = {
  pt: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const state = {
  lang: 'pt',
  manifest: null,
  stations: [],
  stationByCode: new Map(),
  filteredStations: [],
  monthCache: new Map(),
  currentMonthKey: null,
  currentMonthRows: new Map(),
  selectedDate: null,
  selectedCode: null,
  selectedData: null,
  stationCache: new Map(),
  charts: {},
  markersLayer: null,
  currentRange: '90',
};

const map = L.map('map', {
  preferCanvas: true,
  zoomControl: true,
}).setView([-14.5, -52.5], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 18,
}).addTo(map);

function byId(id) {
  return document.getElementById(id);
}

function text(key) {
  return TEXT[state.lang][key];
}

function nestedText(group, key) {
  return TEXT[state.lang][group][key];
}

function showToast(message, duration = 2200) {
  const node = byId('toast');
  node.textContent = message;
  node.classList.add('show');
  setTimeout(() => node.classList.remove('show'), duration);
}

function openOverlay(id) {
  const node = byId(id);
  if (!node) return;
  node.hidden = false;
  document.body.classList.add('modal-open');
}

function closeOverlay(id) {
  const node = byId(id);
  if (!node) return;
  node.hidden = true;
  if (!Array.from(document.querySelectorAll('.overlay')).some((overlay) => !overlay.hidden)) {
    document.body.classList.remove('modal-open');
  }
}

function renderTheoryModal() {
  const theory = TEXT[state.lang].theory;
  const body = byId('theoryBody');
  if (!body) return;
  byId('theoryEyebrow').textContent = theory.eyebrow;
  byId('theoryTitle').textContent = theory.title;
  body.innerHTML = `
    <p class="theory-lead">${theory.intro}</p>
    <div class="theory-grid">
      ${theory.steps.map((step, index) => `
        <article class="theory-step">
          <span class="theory-step-number">${index + 1}</span>
          <div>
            <h3>${step.title}</h3>
            <p>${step.text}</p>
          </div>
        </article>
      `).join('')}
    </div>
    <section class="theory-status-card">
      <h3>${theory.classesTitle}</h3>
      <ul class="theory-status-list">
        ${['normal', 'warning', 'flooded', 'extreme_flooding'].map((key) => `
          <li>
            <span class="theory-status-dot" style="background:${STATUS_COLORS[key]}"></span>
            <div>
              <strong>${statusLabel(key)}</strong>
              <span>${theory.classDescriptions[key]}</span>
            </div>
          </li>
        `).join('')}
      </ul>
      <p>${theory.classesText}</p>
    </section>
    <section class="theory-note">
      <h3>${theory.caveatTitle}</h3>
      <p>${theory.caveatText}</p>
    </section>
  `;
}

function showFatalState(message = text('fatalMessage'), showCommand = false) {
  const card = byId('fatalState');
  const title = byId('fatalTitle');
  const body = byId('fatalMessage');
  const command = byId('fatalCommand');
  if (!card || !title || !body || !command) return;
  title.textContent = text('fatalTitle');
  body.textContent = message;
  command.textContent = `${text('fatalCommandLabel')}\ncd docs\npython3 -m http.server 8000`;
  command.hidden = !showCommand;
  card.hidden = false;
}

function hideFatalState() {
  const card = byId('fatalState');
  if (card) card.hidden = true;
}

function localhostAtlasUrl() {
  return `http://127.0.0.1:8000/${window.location.search || ''}${window.location.hash || ''}`;
}

async function tryRedirectFromFileMode() {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 1800);
  try {
    const response = await fetch('http://127.0.0.1:8000/data/manifest.json', {
      cache: 'no-store',
      signal: controller.signal,
    });
    if (response.ok) {
      window.location.replace(localhostAtlasUrl());
      return true;
    }
  } catch (error) {
    console.warn('Local atlas server not reachable from file mode.', error);
  } finally {
    window.clearTimeout(timer);
  }
  return false;
}

function formatNumber(value, digits = 0) {
  if (value === null || value === undefined || value === '' || Number.isNaN(Number(value))) return '-';
  return Number(value).toLocaleString(state.lang === 'pt' ? 'pt-BR' : 'en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatPercent(value, digits = 1) {
  if (value === null || value === undefined || value === '') return '-';
  return `${formatNumber(Number(value) * 100, digits)}%`;
}

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat(state.lang === 'pt' ? 'pt-BR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
}

function formatShortDate(value) {
  if (!value) return '-';
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat(state.lang === 'pt' ? 'pt-BR' : 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function formatValue(value, type) {
  if (value === null || value === undefined || value === '') return '-';
  const unit = TEXT[state.lang].units[type] || '';
  const digits = type === 'discharge_m3s' ? 1 : 0;
  return `${formatNumber(value, digits)} ${unit}`.trim();
}

function statusKeyFromChar(char) {
  return STATUS_MAP[char] || 'no_data';
}

function basisKeyFromChar(char) {
  return BASIS_MAP[char] || 'unknown';
}

function statusLabel(key) {
  return nestedText('status', key) || key;
}

function basisLabel(key) {
  return nestedText('basis', key) || key;
}

function qaLabel(key) {
  return nestedText('qa', key) || key || '-';
}

function cautionProfile(key) {
  return CAUTION_TEXT[key] || {
    level: 'medium',
    pt: 'Use com cautela',
    en: 'Use with caution',
  };
}

function cautionLabel(key) {
  const profile = cautionProfile(key);
  return profile[state.lang];
}

function cautionLevelClass(key) {
  return `caution-${cautionProfile(key).level}`;
}

function resolvedBasisKey(dayBasis, fallbackBasis) {
  return dayBasis && dayBasis !== 'unknown' ? dayBasis : (fallbackBasis || 'unknown');
}

function humanizeToken(value) {
  if (!value) return '-';
  return String(value).replaceAll('_', ' ');
}

function thresholdTypeLabel(type) {
  return type === 'stage_cm'
    ? (state.lang === 'pt' ? 'Cota' : 'Stage')
    : (state.lang === 'pt' ? 'Vazão' : 'Discharge');
}

function thresholdSourceLabel(value) {
  if (!value) return '-';
  const direct = THRESHOLD_SOURCE_TEXT[value];
  if (direct) return direct[state.lang];
  if (value.startsWith('hydraulic_')) {
    return state.lang === 'pt' ? 'Seção hidráulica observada' : 'Observed hydraulic section';
  }
  if (value.startsWith('q2')) {
    return state.lang === 'pt' ? 'Q2 estatístico' : 'Statistical Q2';
  }
  return humanizeToken(value);
}

function uncertaintyLabel(value) {
  if (!value) return '-';
  return UNCERTAINTY_TEXT[value]?.[state.lang] || humanizeToken(value);
}

function flagLevelClass(value) {
  return `flag-${QA_FLAG_LEVEL[value] || 'caution'}`;
}

function flagLabel(value) {
  if (!value) return '-';
  return QA_FLAG_TEXT[value]?.[state.lang] || humanizeToken(value);
}

function normalizeThresholdTriplet(alert, flood, severe) {
  let normalizedAlert = alert ?? null;
  let normalizedFlood = flood ?? null;
  let normalizedSevere = severe ?? null;

  if (normalizedFlood != null && normalizedAlert != null && normalizedAlert >= normalizedFlood) {
    normalizedAlert = null;
  }
  if (normalizedFlood != null && normalizedSevere != null && normalizedSevere <= normalizedFlood) {
    normalizedSevere = null;
  }
  if (normalizedAlert != null && normalizedSevere != null && normalizedSevere <= normalizedAlert) {
    normalizedSevere = null;
  }
  return {
    alert: normalizedAlert,
    flood: normalizedFlood,
    severe: normalizedSevere,
  };
}

function eventClassLabel(event) {
  const severity = event?.severity_class;
  if (severity && EVENT_CLASS_TEXT[severity]) return EVENT_CLASS_TEXT[severity][state.lang];
  const thresholdClass = event?.event_threshold_class;
  if (thresholdClass === 'severe') return EVENT_CLASS_TEXT.severe_flood_tr3p5[state.lang];
  if (thresholdClass === 'flood') return EVENT_CLASS_TEXT.flood_tr2[state.lang];
  if (thresholdClass === 'alert') return EVENT_CLASS_TEXT.alert_tr1p25[state.lang];
  if (event?.event_review_class) return state.lang === 'pt' ? 'Evento reconstruído' : 'Reconstructed event';
  return '-';
}

function formatDuration(value) {
  if (value === null || value === undefined || value === '' || Number.isNaN(Number(value))) return '-';
  return `${formatNumber(value, 0)} ${TEXT[state.lang].units.days}`;
}

function findEventStart(event, recentEvents) {
  if (event.event_start) return event.event_start;
  const match = recentEvents.find((candidate) =>
    candidate.peak_date === event.peak_date
    && Number(candidate.duration_days) === Number(event.duration_days)
    && (candidate.peak_stage_cm ?? null) === (event.peak_stage_cm ?? null)
    && (candidate.peak_discharge_m3s ?? null) === (event.peak_discharge_m3s ?? null)
  );
  return match?.event_start || null;
}

function eventSignature(event) {
  return [
    event?.peak_date || '',
    Number(event?.duration_days ?? ''),
    event?.peak_stage_cm ?? '',
    event?.peak_discharge_m3s ?? '',
  ].join('|');
}

function normalizedEventRows(stationData) {
  const recentRows = stationData.recent_events || [];
  const significantRows = stationData.significant_events || [];
  const significantBySignature = new Map(significantRows.map((event) => [eventSignature(event), event]));
  const sourceRows = recentRows.length ? recentRows : significantRows;
  const seen = new Set();
  return sourceRows
    .map((event) => ({
      ...event,
      event_start: findEventStart(event, stationData.recent_events),
      display_class: eventClassLabel(significantBySignature.get(eventSignature(event)) || event),
    }))
    .filter((event) => {
      const key = [
        event.event_start || '',
        event.peak_date || '',
        event.duration_days ?? '',
        event.peak_stage_cm ?? '',
        event.peak_discharge_m3s ?? '',
        event.display_class,
      ].join('|');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function durationMetrics(stationData) {
  const mean = stationData.summary.mean_event_duration_days;
  const std = stationData.summary.std_event_duration_days;
  if (mean != null || std != null) {
    return { mean, std };
  }
  const durations = deriveFloodRuns(stationData)
    .map((event) => Number(event.durationDays))
    .filter((value) => Number.isFinite(value));
  if (!durations.length) return { mean: null, std: null };
  const avg = durations.reduce((sum, value) => sum + value, 0) / durations.length;
  if (durations.length === 1) return { mean: avg, std: 0 };
  const variance = durations.reduce((sum, value) => sum + ((value - avg) ** 2), 0) / (durations.length - 1);
  return { mean: avg, std: Math.sqrt(variance) };
}

function deriveFloodRuns(stationData) {
  const runs = [];
  let active = null;

  const flushRun = () => {
    if (!active) return;
    const start = new Date(`${active.startDate}T00:00:00`);
    const end = new Date(`${active.endDate}T00:00:00`);
    active.durationDays = Math.round((end - start) / 86400000) + 1;
    runs.push(active);
    active = null;
  };

  stationData.dailyRows.forEach((row) => {
    const isFloodEventDay = row.status === 'flooded' || row.status === 'extreme_flooding';
    if (!isFloodEventDay) {
      flushRun();
      return;
    }
    if (!active) {
      active = {
        startDate: row.date,
        endDate: row.date,
        peakDate: row.date,
        peakValue: row.observed_value ?? null,
      };
      return;
    }
    active.endDate = row.date;
    if (row.observed_value != null && (active.peakValue == null || row.observed_value > active.peakValue)) {
      active.peakValue = row.observed_value;
      active.peakDate = row.date;
    }
  });
  flushRun();
  return runs;
}

function monthName(index) {
  return MONTH_LABELS[state.lang][index];
}

function computeSeasonality(stationData) {
  const startCounts = Array(12).fill(0);
  const peakCounts = Array(12).fill(0);
  const events = deriveFloodRuns(stationData);

  events.forEach((event) => {
    const startMonth = Number(event.startDate.slice(5, 7)) - 1;
    const peakMonth = Number(event.peakDate.slice(5, 7)) - 1;
    startCounts[startMonth] += 1;
    peakCounts[peakMonth] += 1;
  });

  const total = events.length;
  if (!total) {
    return {
      startCounts,
      peakCounts,
      total,
      summary: text('seasonalityNoEvents'),
    };
  }

  const ordered = peakCounts
    .map((count, monthIndex) => ({ count, monthIndex }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count || a.monthIndex - b.monthIndex);
  const topMonths = ordered.slice(0, 3);
  const topTotal = topMonths.reduce((sum, entry) => sum + entry.count, 0);
  const topNames = topMonths.map((entry) => monthName(entry.monthIndex)).join(', ');
  const topShare = total ? Math.round((topTotal / total) * 100) : 0;
  const summary = state.lang === 'pt'
    ? `Os picos de inundação se concentram em ${topNames}. Cerca de ${topShare}% dos eventos reconstruídos atingem pico nesses meses.`
    : `Flood peaks concentrate in ${topNames}. About ${topShare}% of reconstructed events peak in those months.`;

  return {
    startCounts,
    peakCounts,
    total,
    summary,
  };
}

function seriesRangeLabel(range) {
  if (range === 'full') {
    return state.lang === 'pt' ? 'registro completo' : 'full record';
  }
  return `${range}d`;
}

function annualMaximaByYear(stationData) {
  const byYear = new Map();
  stationData.dailyRows.forEach((row) => {
    if (row.observed_value == null || Number.isNaN(Number(row.observed_value))) return;
    const year = row.date.slice(0, 4);
    const current = byYear.get(year);
    if (!current || Number(row.observed_value) > Number(current.value)) {
      byYear.set(year, {
        year,
        value: Number(row.observed_value),
        date: row.date,
      });
    }
  });
  return Array.from(byYear.values()).sort((a, b) => a.year.localeCompare(b.year));
}

function buildEvidenceContext(stationData) {
  const intervals = stationData.intervalsHydrated || [];
  const maxima = annualMaximaByYear(stationData);
  if (!intervals.length || !maxima.length) return null;

  const years = Array.from(new Set([
    ...maxima.map((entry) => entry.year),
    ...intervals.map((interval) => interval.startDate?.slice(0, 4)).filter(Boolean),
    ...intervals.map((interval) => interval.endDate?.slice(0, 4)).filter(Boolean),
  ])).sort();

  const annualMap = new Map(maxima.map((entry) => [entry.year, entry]));
  const alert = [];
  const flood = [];
  const severe = [];
  const annual = [];
  const crossSections = [];
  const q2 = [];

  years.forEach((year) => {
    const annualEntry = annualMap.get(year) || null;
    const probeDate = annualEntry?.date || `${year}-07-01`;
    const interval = findIntervalForDate(stationData, probeDate)
      || intervals.find((candidate) => year >= candidate.startDate.slice(0, 4) && year <= candidate.endDate.slice(0, 4))
      || null;
    const normalized = normalizeThresholdTriplet(
      interval ? interval.alert : null,
      interval ? interval.flood : stationData.summary.threshold_value,
      interval ? interval.severe : null,
    );
    alert.push(normalized.alert);
    flood.push(normalized.flood);
    severe.push(normalized.severe);
    annual.push(annualEntry ? annualEntry.value : null);

    const yearCrossSection = intervals.find((candidate) => candidate.crossSectionDate?.startsWith(year));
    crossSections.push(yearCrossSection ? (normalized.flood ?? normalized.alert ?? normalized.severe ?? null) : null);

    if (stationData.summary.threshold_value_type === 'discharge_m3s' && stationData.summary.q2_m3s != null) {
      q2.push(Number(stationData.summary.q2_m3s));
    } else {
      q2.push(null);
    }
  });

  return {
    years,
    alert,
    flood,
    severe,
    annual,
    crossSections,
    q2,
    intervalCount: intervals.length,
    maximaCount: maxima.length,
  };
}

function evidenceSummaryText(stationData, context) {
  if (!context) return text('emptyEvidence');
  const q2Phrase = stationData.summary.threshold_value_type === 'discharge_m3s' && stationData.summary.q2_m3s != null
    ? (state.lang === 'pt' ? 'A linha azul-clara mostra o Q2 estatístico.' : 'The light-blue line shows statistical Q2.')
    : (state.lang === 'pt' ? 'Para estações em cota, o contexto de curva-chave e Q2 aparece no painel hidráulico abaixo.' : 'For stage-based stations, the rating-curve and Q2 context appears in the hydraulic panel below.');
  return state.lang === 'pt'
    ? `${context.intervalCount} intervalos de limiar foram identificados ao longo do registro. As barras mostram os máximos anuais observados, e os marcadores indicam anos com atualização de seção transversal. ${q2Phrase}`
    : `${context.intervalCount} threshold intervals were identified across the record. Bars show observed annual maxima, and markers highlight years with cross-section updates. ${q2Phrase}`;
}

async function renderChartConfigToBytes(config, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const exportConfig = JSON.parse(JSON.stringify(config));
  exportConfig.options = {
    ...(exportConfig.options || {}),
    animation: false,
    responsive: false,
    maintainAspectRatio: false,
  };
  const chart = new Chart(canvas.getContext('2d'), exportConfig);
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  const bytes = await dataUrlToUint8Array(canvas.toDataURL('image/png', 1));
  chart.destroy();
  return bytes;
}

async function chartToBytes(chartKey, width, height) {
  const chart = state.charts[chartKey];
  if (!chart) return null;
  return renderChartConfigToBytes(chart.config._config, width, height);
}

function loadJson(path) {
  return fetch(path).then((response) => {
    if (!response.ok) throw new Error(`Could not load ${path}`);
    return response.json();
  });
}

function monthKey(dateString) {
  return dateString.slice(0, 7);
}

function statusPath(dateString) {
  const [year, month] = monthKey(dateString).split('-');
  return `data/status/${year}/${month}.json`;
}

async function loadMonth(dateString) {
  const key = monthKey(dateString);
  if (state.monthCache.has(key)) {
    state.currentMonthKey = key;
    state.currentMonthRows = state.monthCache.get(key);
    return;
  }
  const payload = await loadJson(statusPath(dateString));
  const rows = new Map();
  payload.rows.forEach(([stationCode, statusCodes, basisCodes]) => {
    rows.set(String(stationCode), { statusCodes, basisCodes, daysInMonth: payload.days_in_month });
  });
  state.monthCache.set(key, rows);
  state.currentMonthKey = key;
  state.currentMonthRows = rows;
}

function getStatusInfo(stationCode, dateString) {
  const dayIndex = Number(dateString.slice(8, 10)) - 1;
  const row = state.currentMonthRows.get(String(stationCode));
  if (!row || dayIndex < 0 || dayIndex >= row.statusCodes.length) {
    return { status: 'no_data', basis: 'unknown' };
  }
  return {
    status: statusKeyFromChar(row.statusCodes[dayIndex]),
    basis: basisKeyFromChar(row.basisCodes[dayIndex]),
  };
}

function applyStaticTranslations() {
  const keys = [
    'brandTitle', 'brandSubtitle', 'dateLabel', 'theoryButton', 'fitMapButton', 'exportCsvButton', 'shareButton',
    'eyebrowLabel', 'heroTitle', 'heroText', 'statStationsLabel', 'statRangeLabel', 'statLatestLabel',
    'filtersTitle', 'searchLabel', 'statusFilterLabel', 'basisFilterLabel', 'qaFilterLabel', 'ufFilterLabel',
    'basinFilterLabel', 'biomeFilterLabel', 'stationListTitle', 'selectedStatusEyebrow',
    'selectedMetricStatusLabel', 'selectedMetricBasisLabel', 'selectedMetricQaLabel', 'legendTitle',
    'stationTabButton', 'datasetTabButton', 'exportReportButton', 'metadataTitle', 'timeseriesTitle',
    'evidenceTitle', 'evidenceSubtitle', 'eventSummaryTitle', 'seasonalityTitle', 'seasonalitySubtitle', 'recentEventsTitle', 'qaTitle', 'datasetTotalsTitle', 'statusTotalsTitle',
    'howToReadTitle', 'howToReadText', 'caveatTitle', 'caveatText', 'thStartDate', 'thPeakDate', 'thDuration',
    'thPeak', 'thClass', 'imageOverlayTitle',
  ];
  keys.forEach((id) => {
    const node = byId(id);
    if (node) node.textContent = text(id);
  });
  byId('stationSearch').placeholder = text('searchPlaceholder');
  const fullRangeButton = document.querySelector('.range-button[data-range="full"]');
  if (fullRangeButton) fullRangeButton.textContent = text('fullRecordLabel');
  const fatalTitle = byId('fatalTitle');
  const fatalMessage = byId('fatalMessage');
  if (fatalTitle) fatalTitle.textContent = text('fatalTitle');
  if (fatalMessage && !byId('fatalState')?.hidden) fatalMessage.textContent = text('fatalMessage');
  const emptyChart = byId('timeseriesEmpty');
  if (emptyChart) emptyChart.textContent = text('emptyTimeseries');
  const emptyEvidence = byId('evidenceEmpty');
  if (emptyEvidence) emptyEvidence.textContent = text('emptyEvidence');
  const emptySeasonality = byId('seasonalityEmpty');
  if (emptySeasonality) emptySeasonality.textContent = text('emptySeasonality');
  const imageButton = byId('openQaImageButton');
  if (imageButton) imageButton.textContent = text('imageExpandButton');
  const imageCaption = byId('imageOverlayCaption');
  if (imageCaption && imageCaption.textContent === '-') imageCaption.textContent = text('qaFigureCaption');
  const theoryClose = byId('closeTheoryButton');
  const imageClose = byId('closeImageButton');
  if (theoryClose) theoryClose.setAttribute('aria-label', text('closeLabel'));
  if (imageClose) imageClose.setAttribute('aria-label', text('closeLabel'));
  renderTheoryModal();
  document.title = text('pageTitle');
  document.documentElement.lang = state.lang === 'pt' ? 'pt-BR' : 'en';
}

function updateLanguageButtons() {
  document.querySelectorAll('.lang-button').forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === state.lang);
  });
}

function statusOptionValues() {
  return ['all', 'normal', 'warning', 'flooded', 'extreme_flooding', 'no_data'];
}

function basisOptionValues() {
  return ['all', 'hydraulic', 'q2_fallback', 'tr_alert_severe'];
}

function populateFilters() {
  const statusFilter = byId('statusFilter');
  const basisFilter = byId('basisFilter');
  const qaFilter = byId('qaFilter');
  const ufFilter = byId('ufFilter');
  const basinFilter = byId('basinFilter');
  const biomeFilter = byId('biomeFilter');

  const fillSelect = (select, values, labelFn) => {
    const current = select.value || 'all';
    select.innerHTML = '';
    values.forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = labelFn(value);
      select.appendChild(option);
    });
    select.value = values.includes(current) ? current : 'all';
  };

  fillSelect(statusFilter, statusOptionValues(), (value) => value === 'all' ? text('status').all : statusLabel(value));
  fillSelect(basisFilter, basisOptionValues(), (value) => value === 'all' ? text('basis').all : basisLabel(value));

  const qaValues = ['all', ...Array.from(new Set(state.stations.map((station) => station.qa_review_class).filter(Boolean))).sort()];
  fillSelect(qaFilter, qaValues, (value) => value === 'all' ? text('qa').all : qaLabel(value));

  const ufValues = ['all', ...Array.from(new Set(state.stations.map((station) => station.uf).filter(Boolean))).sort()];
  fillSelect(ufFilter, ufValues, (value) => value === 'all' ? text('allStatesLabel') : value);

  const basinValues = ['all', ...Array.from(new Set(state.stations.map((station) => station.basin_name).filter(Boolean))).sort()];
  fillSelect(basinFilter, basinValues, (value) => value === 'all' ? text('allBasinsLabel') : value);

  const biomeValues = ['all', ...Array.from(new Set(state.stations.map((station) => station.biome).filter(Boolean))).sort()];
  fillSelect(biomeFilter, biomeValues, (value) => value === 'all' ? text('allBiomesLabel') : value);
}

function stationSearchText(station) {
  return [
    station.station_code,
    station.station_name,
    station.uf,
    station.municipality,
    station.basin_name,
    station.biome,
  ].filter(Boolean).join(' ').toLowerCase();
}

function markerRadius(station) {
  return 6.5;
}

function renderLegend() {
  const legend = byId('legendItems');
  legend.innerHTML = '';
  ['normal', 'warning', 'flooded', 'extreme_flooding', 'no_data'].forEach((key) => {
    const row = document.createElement('div');
    row.className = 'legend-row';
    row.innerHTML = `<span class="legend-dot" style="background:${STATUS_COLORS[key]}"></span><span>${nestedText('legend', key)}</span>`;
    legend.appendChild(row);
  });
  const note = document.createElement('p');
  note.className = 'legend-note';
  note.textContent = text('legendPointNote');
  legend.appendChild(note);
}

function currentFilters() {
  return {
    search: byId('stationSearch').value.trim().toLowerCase(),
    status: byId('statusFilter').value,
    basis: byId('basisFilter').value,
    qa: byId('qaFilter').value,
    uf: byId('ufFilter').value,
    basin: byId('basinFilter').value,
    biome: byId('biomeFilter').value,
  };
}

function applyFilters() {
  const filters = currentFilters();
  state.filteredStations = state.stations.filter((station) => {
    const info = getStatusInfo(station.station_code, state.selectedDate);
    const basisKey = resolvedBasisKey(info.basis, station.threshold_basis);
    if (filters.search && !stationSearchText(station).includes(filters.search)) return false;
    if (filters.status !== 'all' && info.status !== filters.status) return false;
    if (filters.basis !== 'all' && basisKey !== filters.basis) return false;
    if (filters.qa !== 'all' && station.qa_review_class !== filters.qa) return false;
    if (filters.uf !== 'all' && station.uf !== filters.uf) return false;
    if (filters.basin !== 'all' && station.basin_name !== filters.basin) return false;
    if (filters.biome !== 'all' && station.biome !== filters.biome) return false;
    return true;
  });
  renderStationList();
  renderMap();
  renderDatasetMetrics();
}

function renderStationList() {
  const list = byId('stationList');
  list.innerHTML = '';
  state.filteredStations.forEach((station) => {
    const info = getStatusInfo(station.station_code, state.selectedDate);
    const basisKey = resolvedBasisKey(info.basis, station.threshold_basis);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'station-item';
    if (station.station_code === state.selectedCode) button.classList.add('active');
    button.innerHTML = `
      <strong>${station.station_name || station.station_code}</strong>
      <span class="station-meta">${[station.station_code, station.uf, station.municipality].filter(Boolean).join(' · ')}</span>
      <small>${[station.basin_name, station.biome].filter(Boolean).join(' · ')}</small>
      <div class="station-pills">
        <span class="status-pill ${info.status}">${statusLabel(info.status)}</span>
        <span class="pill subtle">${basisLabel(basisKey)}</span>
      </div>
    `;
    button.addEventListener('click', () => selectStation(station.station_code));
    list.appendChild(button);
  });
  byId('visibleCount').textContent = `${state.filteredStations.length} ${text('visibleStations')}`;
  byId('listCount').textContent = formatNumber(state.filteredStations.length);
}

function renderMap() {
  if (state.markersLayer) state.markersLayer.remove();
  const markers = [];
  state.markersLayer = L.layerGroup();
  state.filteredStations.forEach((station) => {
    if (station.lat === null || station.lon === null || station.lat === undefined || station.lon === undefined) return;
    const info = getStatusInfo(station.station_code, state.selectedDate);
    const basisKey = resolvedBasisKey(info.basis, station.threshold_basis);
    const marker = L.circleMarker([station.lat, station.lon], {
      radius: markerRadius(station),
      color: '#fffdf6',
      weight: 1.3,
      fillColor: STATUS_COLORS[info.status],
      fillOpacity: 0.92,
    });
    marker.bindPopup(`
      <div class="marker-popup">
        <strong>${station.station_name || station.station_code}</strong>
        <div>${station.station_code} · ${station.uf || '-'}</div>
        <small>${statusLabel(info.status)} · ${basisLabel(basisKey)}</small>
      </div>
    `);
    marker.on('click', () => selectStation(station.station_code));
    marker.addTo(state.markersLayer);
    markers.push(marker);
  });
  state.markersLayer.addTo(map);
  state.markerBounds = markers.length ? L.featureGroup(markers).getBounds() : null;
}

function renderGlobalStats() {
  byId('statStations').textContent = formatNumber(state.manifest.published_station_count);
  byId('statRange').textContent = `${formatShortDate(state.manifest.supported_date_min)} - ${formatShortDate(state.manifest.supported_date_max)}`;
  byId('statLatest').textContent = formatShortDate(state.manifest.latest_status_date);
}

function statusTotals() {
  const counts = {
    normal: 0,
    warning: 0,
    flooded: 0,
    extreme_flooding: 0,
    no_data: 0,
  };
  state.stations.forEach((station) => {
    const info = getStatusInfo(station.station_code, state.selectedDate);
    counts[info.status] += 1;
  });
  return counts;
}

function renderDatasetMetrics() {
  const datasetMetrics = byId('datasetMetrics');
  datasetMetrics.innerHTML = '';
  const totalCards = [
    [text('statStationsLabel'), formatNumber(state.manifest.published_station_count)],
    [text('statRangeLabel'), `${formatShortDate(state.manifest.supported_date_min)} - ${formatShortDate(state.manifest.supported_date_max)}`],
    [text('statLatestLabel'), formatShortDate(state.manifest.latest_status_date)],
    [text('qaPanelsLabel'), formatNumber(state.manifest.counts.qa_panels_copied)],
  ];
  totalCards.forEach(([label, value]) => {
    const node = document.createElement('article');
    node.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    datasetMetrics.appendChild(node);
  });

  const counts = statusTotals();
  const statusTotalsNode = byId('statusTotals');
  statusTotalsNode.innerHTML = '';
  Object.entries(counts).forEach(([key, value]) => {
    const node = document.createElement('article');
    node.innerHTML = `<span>${statusLabel(key)}</span><strong>${formatNumber(value)}</strong>`;
    statusTotalsNode.appendChild(node);
  });
}

function addDays(dateString, offset) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + Number(offset));
  return date.toISOString().slice(0, 10);
}

function hydrateStationData(raw) {
  if (state.stationCache.has(raw.metadata.station_code)) return state.stationCache.get(raw.metadata.station_code);
  const hydrated = structuredClone(raw);
  const startDate = raw.daily.start_date;
  hydrated.dailyRows = raw.daily.rows.map(([offset, observed, statusChar, basisChar]) => ({
    offset: Number(offset),
    date: addDays(startDate, Number(offset)),
    observed_value: observed,
    status: statusKeyFromChar(statusChar),
    basis: basisKeyFromChar(basisChar),
  }));
  hydrated.dailyMap = new Map(hydrated.dailyRows.map((row) => [row.date, row]));
  hydrated.intervalsHydrated = raw.intervals.map(([startOffset, endOffset, valueType, alert, flood, severe, thresholdSource, crossSectionDate, crossSectionId, flags]) => {
    const normalized = normalizeThresholdTriplet(alert, flood, severe);
    return {
      startOffset: Number(startOffset),
      endOffset: Number(endOffset),
      startDate: addDays(startDate, Number(startOffset)),
      endDate: addDays(startDate, Number(endOffset)),
      valueType: valueType === 's' ? 'stage_cm' : 'discharge_m3s',
      alert: normalized.alert,
      flood: normalized.flood,
      severe: normalized.severe,
      thresholdSource,
      crossSectionDate,
      crossSectionId,
      flags,
    };
  });
  state.stationCache.set(raw.metadata.station_code, hydrated);
  return hydrated;
}

async function loadStationData(stationCode) {
  if (state.stationCache.has(stationCode)) return state.stationCache.get(stationCode);
  const raw = await loadJson(`data/stations/${stationCode}.json`);
  return hydrateStationData(raw);
}

function findIntervalForDate(stationData, dateString) {
  return stationData.intervalsHydrated.find((interval) => dateString >= interval.startDate && dateString <= interval.endDate) || null;
}

function buildDayDetails(stationData, dateString) {
  const row = stationData.dailyMap.get(dateString);
  if (!row) {
    return {
      status: 'no_data',
      basis: 'unknown',
      observed: null,
      alert: null,
      flood: null,
      severe: null,
      valueType: stationData.summary.threshold_value_type,
      row: null,
      interval: null,
    };
  }
  const interval = findIntervalForDate(stationData, dateString);
  const valueType = stationData.summary.threshold_value_type;
  const normalized = normalizeThresholdTriplet(
    interval ? interval.alert : null,
    interval ? interval.flood : stationData.summary.threshold_value,
    interval ? interval.severe : null,
  );
  return {
    status: row.status,
    basis: row.basis,
    observed: row.observed_value,
    alert: normalized.alert,
    flood: normalized.flood,
    severe: normalized.severe,
    valueType,
    row,
    interval,
  };
}

function renderStatusCard(stationData) {
  const details = buildDayDetails(stationData, state.selectedDate);
  const basisKey = resolvedBasisKey(details.basis, stationData.summary.threshold_basis);
  byId('selectedStatusTitle').textContent = stationData.metadata.station_name || stationData.metadata.station_code;
  byId('selectedStatusSubtitle').textContent = `${formatDate(state.selectedDate)} · ${stationData.metadata.station_code}`;
  byId('selectedMetricStatus').textContent = statusLabel(details.status);
  byId('selectedMetricBasis').textContent = basisLabel(basisKey);
  byId('selectedMetricQa').textContent = uncertaintyLabel(stationData.summary.uncertainty_class);

  const badgeWrap = byId('statusBadges');
  badgeWrap.innerHTML = '';
  [details.status, basisKey, stationData.summary.uncertainty_class].forEach((value, index) => {
    const span = document.createElement('span');
    span.className = index === 0 ? `status-pill ${value}` : 'pill subtle';
    span.textContent = index === 0 ? statusLabel(value) : (index === 1 ? basisLabel(value) : uncertaintyLabel(value));
    badgeWrap.appendChild(span);
  });

  const statusGrid = byId('statusGrid');
  const cards = [
    [text('fields').selectedDate, formatDate(state.selectedDate)],
    [text('fields').observed, formatValue(details.observed, details.valueType)],
    [text('fields').alert, formatValue(details.alert, details.valueType)],
    [text('fields').flood, formatValue(details.flood, details.valueType)],
    [text('fields').severe, formatValue(details.severe, details.valueType)],
    [text('fields').range, `${formatShortDate(stationData.summary.daily_record_start)} - ${formatShortDate(stationData.summary.daily_record_end)}`],
  ];
  statusGrid.innerHTML = cards.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('');
}

function renderMetadata(stationData) {
  byId('stationHeading').textContent = stationData.metadata.station_name || stationData.metadata.station_code;
  byId('stationSubheading').textContent = [
    stationData.metadata.station_code,
    stationData.metadata.uf,
    stationData.metadata.municipality,
  ].filter(Boolean).join(' · ');

  const grid = byId('metadataGrid');
  const items = [
    [text('fields').stationCode, stationData.metadata.station_code],
    [text('fields').stationType, stationData.metadata.station_type || '-'],
    [text('fields').uf, stationData.metadata.uf || '-'],
    [text('fields').municipality, stationData.metadata.municipality || '-'],
    [text('fields').basin, stationData.metadata.basin_name || '-'],
    [text('fields').biome, stationData.metadata.biome || '-'],
    [text('fields').operator, stationData.metadata.operator || '-'],
    [text('fields').agency, stationData.metadata.responsible_agency || '-'],
    [text('fields').drainageArea, stationData.metadata.drainage_area ? `${formatNumber(stationData.metadata.drainage_area, 0)} km²` : '-'],
    [text('fields').altitude, stationData.metadata.altitude ? `${formatNumber(stationData.metadata.altitude, 0)} m` : '-'],
    [text('fields').thresholdBasis, basisLabel(stationData.summary.threshold_basis)],
    [text('fields').thresholdSource, thresholdSourceLabel(stationData.summary.threshold_source)],
    [text('fields').thresholdType, thresholdTypeLabel(stationData.summary.threshold_value_type)],
    [text('fields').thresholdValue, formatValue(stationData.summary.threshold_value, stationData.summary.threshold_value_type)],
    [text('fields').q2, formatValue(stationData.summary.q2_m3s, 'discharge_m3s')],
    [text('fields').q2Years, formatNumber(stationData.summary.q2_valid_years, 0)],
    [text('fields').percentile, formatPercent(stationData.summary.threshold_empirical_percentile)],
    [text('fields').exceedance, formatPercent(stationData.summary.threshold_exceedance_fraction)],
    [text('fields').eventFrequency, formatNumber(stationData.summary.event_frequency_per_year, 2)],
    [text('fields').maxDuration, formatDuration(stationData.summary.max_event_duration_days)],
    [text('fields').uncertainty, uncertaintyLabel(stationData.summary.uncertainty_class)],
  ];
  grid.innerHTML = items.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');
}

function destroyChart(id) {
  if (state.charts[id]) {
    state.charts[id].destroy();
    delete state.charts[id];
  }
}

function renderTimeseriesChart(stationData) {
  const centerDate = new Date(`${state.selectedDate}T00:00:00`);
  const emptyNode = byId('timeseriesEmpty');
  const canvas = byId('timeseriesChart');
  const rows = state.currentRange === 'full'
    ? stationData.dailyRows
    : stationData.dailyRows.filter((row) => {
      const spanDays = Number(state.currentRange);
      const before = Math.floor(spanDays / 2);
      const after = spanDays - before;
      const date = new Date(`${row.date}T00:00:00`);
      const delta = Math.round((date - centerDate) / 86400000);
      return delta >= -before && delta <= after;
    });

  if (!rows.length) {
    destroyChart('timeseriesChart');
    canvas.hidden = true;
    emptyNode.hidden = false;
    byId('timeseriesSubtitle').textContent = `${thresholdTypeLabel(stationData.summary.threshold_value_type)} · ${seriesRangeLabel(state.currentRange)}`;
    return;
  }

  canvas.hidden = false;
  emptyNode.hidden = true;
  const valueType = stationData.summary.threshold_value_type;
  const labels = rows.map((row) => row.date);
  const values = rows.map((row) => row.observed_value);
  const normalizedThresholdRows = rows.map((row) => {
    const interval = findIntervalForDate(stationData, row.date);
    return normalizeThresholdTriplet(
      interval ? interval.alert : null,
      interval ? interval.flood : stationData.summary.threshold_value,
      interval ? interval.severe : null,
    );
  });
  const alert = normalizedThresholdRows.map((row) => row.alert);
  const flood = normalizedThresholdRows.map((row) => row.flood);
  const severe = normalizedThresholdRows.map((row) => row.severe);
  const highlightValue = values[labels.indexOf(state.selectedDate)];

  destroyChart('timeseriesChart');
  const ctx = canvas;
  state.charts.timeseriesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: thresholdTypeLabel(valueType),
          data: values,
          borderColor: '#1F5E7A',
          backgroundColor: 'rgba(31, 94, 122, 0.12)',
          pointRadius: 0,
          borderWidth: 2.1,
          tension: 0.12,
        },
        {
          label: text('fields').alert,
          data: alert,
          borderColor: '#D89B2B',
          pointRadius: 0,
          borderDash: [6, 4],
          borderWidth: 1.6,
          stepped: true,
        },
        {
          label: text('fields').flood,
          data: flood,
          borderColor: '#C54B3C',
          pointRadius: 0,
          borderDash: [4, 3],
          borderWidth: 1.8,
          stepped: true,
        },
        {
          label: text('fields').severe,
          data: severe,
          borderColor: '#7A1F2B',
          pointRadius: 0,
          borderDash: [2, 3],
          borderWidth: 1.7,
          stepped: true,
        },
        {
          label: text('fields').selectedDate,
          type: 'scatter',
          data: highlightValue === undefined ? [] : [{ x: state.selectedDate, y: highlightValue }],
          pointRadius: 5,
          pointHoverRadius: 5,
          pointBackgroundColor: '#111',
          pointBorderColor: '#fff',
          pointBorderWidth: 1.5,
        },
      ],
    },
    options: {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      normalized: true,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: {
          labels: { boxWidth: 12, boxHeight: 12, color: '#42545c' },
        },
      },
      scales: {
        x: {
          ticks: { color: '#5b6a71', maxTicksLimit: 8 },
          grid: { color: 'rgba(0,0,0,0.05)' },
        },
        y: {
          ticks: { color: '#5b6a71' },
          grid: { color: 'rgba(0,0,0,0.06)' },
          title: {
            display: true,
            text: TEXT[state.lang].units[valueType],
            color: '#42545c',
          },
        },
      },
    },
  });
  byId('timeseriesSubtitle').textContent = `${thresholdTypeLabel(valueType)} · ${seriesRangeLabel(state.currentRange)}`;
}

function renderEvidenceChart(stationData) {
  const summaryNode = byId('evidenceSummary');
  const emptyNode = byId('evidenceEmpty');
  const canvas = byId('evidenceChart');
  const context = buildEvidenceContext(stationData);

  summaryNode.textContent = evidenceSummaryText(stationData, context);
  if (!context) {
    destroyChart('evidenceChart');
    canvas.hidden = true;
    emptyNode.hidden = false;
    return;
  }

  canvas.hidden = false;
  emptyNode.hidden = true;
  destroyChart('evidenceChart');
  const datasets = [
    {
      type: 'bar',
      label: state.lang === 'pt' ? 'Máximos anuais' : 'Annual maxima',
      data: context.annual,
      backgroundColor: 'rgba(31, 94, 122, 0.52)',
      borderColor: '#1F5E7A',
      borderWidth: 1,
      borderRadius: 5,
      borderSkipped: false,
    },
    {
      type: 'line',
      label: text('fields').alert,
      data: context.alert,
      borderColor: '#D89B2B',
      borderDash: [6, 4],
      borderWidth: 1.7,
      pointRadius: 0,
      spanGaps: true,
    },
    {
      type: 'line',
      label: text('fields').flood,
      data: context.flood,
      borderColor: '#C54B3C',
      borderDash: [4, 3],
      borderWidth: 2,
      pointRadius: 0,
      spanGaps: true,
    },
    {
      type: 'line',
      label: text('fields').severe,
      data: context.severe,
      borderColor: '#7A1F2B',
      borderDash: [2, 3],
      borderWidth: 1.8,
      pointRadius: 0,
      spanGaps: true,
    },
  ];
  if (context.q2.some((value) => value != null)) {
    datasets.push({
      type: 'line',
      label: 'Q2',
      data: context.q2,
      borderColor: '#67A9C6',
      borderDash: [8, 4],
      borderWidth: 1.6,
      pointRadius: 0,
      spanGaps: true,
    });
  }
  datasets.push({
    type: 'line',
    label: state.lang === 'pt' ? 'Atualização de seção' : 'Cross-section update',
    data: context.crossSections,
    borderColor: '#2E8B8B',
    backgroundColor: '#F7F2E7',
    pointBackgroundColor: '#F7F2E7',
    pointBorderColor: '#2E8B8B',
    pointBorderWidth: 2,
    pointRadius: 4.5,
    pointHoverRadius: 4.5,
    showLine: false,
    spanGaps: true,
  });
  state.charts.evidenceChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: context.years,
      datasets,
    },
    options: {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: {
          labels: { boxWidth: 12, boxHeight: 12, color: '#42545c' },
        },
      },
      scales: {
        x: {
          ticks: { color: '#5b6a71', maxTicksLimit: 9 },
          grid: { display: false },
        },
        y: {
          beginAtZero: false,
          ticks: { color: '#5b6a71' },
          grid: { color: 'rgba(0,0,0,0.06)' },
          title: {
            display: true,
            text: TEXT[state.lang].units[stationData.summary.threshold_value_type],
            color: '#42545c',
          },
        },
      },
    },
  });
}

function renderEventSummary(stationData) {
  const node = byId('eventMetrics');
  const durations = durationMetrics(stationData);
  const items = [
    [text('fields').eventCount, formatNumber(stationData.summary.n_events)],
    [text('fields').eventFrequency, formatNumber(stationData.summary.event_frequency_per_year, 2)],
    [text('fields').maxDuration, formatDuration(stationData.summary.max_event_duration_days)],
    [text('fields').meanDuration, formatDuration(durations.mean)],
    [text('fields').durationStd, formatDuration(durations.std)],
  ];
  node.innerHTML = items.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('');
}

function renderSeasonality(stationData) {
  const summaryNode = byId('seasonalitySummary');
  const emptyNode = byId('seasonalityEmpty');
  const canvas = byId('seasonalityChart');
  const seasonality = computeSeasonality(stationData);

  summaryNode.textContent = seasonality.summary;
  if (!seasonality.total) {
    destroyChart('seasonalityChart');
    canvas.hidden = true;
    emptyNode.hidden = false;
    return;
  }

  canvas.hidden = false;
  emptyNode.hidden = true;
  destroyChart('seasonalityChart');
  state.charts.seasonalityChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: MONTH_LABELS[state.lang],
      datasets: [
        {
          label: state.lang === 'pt' ? 'Mês do pico' : 'Peak month',
          data: seasonality.peakCounts,
          backgroundColor: 'rgba(31, 94, 122, 0.72)',
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#42545c', boxWidth: 12, boxHeight: 12 },
        },
      },
      scales: {
        x: {
          ticks: { color: '#5b6a71' },
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#5b6a71',
            precision: 0,
          },
          grid: { color: 'rgba(0,0,0,0.06)' },
        },
      },
    },
  });
}

function renderEventsTable(stationData) {
  const body = byId('eventTableBody');
  body.innerHTML = '';
  normalizedEventRows(stationData).slice(0, 12).forEach((event) => {
    const tr = document.createElement('tr');
    const classText = event.display_class;
    const peakValue = event.peak_stage_cm != null
      ? formatValue(event.peak_stage_cm, 'stage_cm')
      : formatValue(event.peak_discharge_m3s, 'discharge_m3s');
    tr.innerHTML = `
      <td>${formatShortDate(event.event_start)}</td>
      <td>${formatShortDate(event.peak_date)}</td>
      <td>${formatDuration(event.duration_days)}</td>
      <td>${peakValue}</td>
      <td>${classText}</td>
    `;
    body.appendChild(tr);
  });
}

function renderQaSection(stationData) {
  const overviewNode = byId('qaOverview');
  const overviewItems = [
    [text('fields').uncertainty, uncertaintyLabel(stationData.summary.uncertainty_class)],
    [text('fields').cautionLevel, cautionLabel(stationData.summary.qa_review_class), cautionLevelClass(stationData.summary.qa_review_class)],
    [text('fields').thresholdSource, thresholdSourceLabel(stationData.summary.threshold_source)],
  ];
  overviewNode.innerHTML = overviewItems.map(([label, value, className = '']) => `<div class="${className}"><span>${label}</span><strong>${value}</strong></div>`).join('');

  const flagsNode = byId('qaFlags');
  flagsNode.innerHTML = '';
  const flags = stationData.qa.flags || [];
  if (!flags.length) {
    const li = document.createElement('li');
    li.className = 'flag-good';
    li.textContent = text('noQaFlags');
    flagsNode.appendChild(li);
  } else {
    flags.forEach((flag) => {
      const li = document.createElement('li');
      li.className = flagLevelClass(flag);
      li.textContent = flagLabel(flag);
      flagsNode.appendChild(li);
    });
  }

  const img = byId('qaImage');
  const caption = byId('qaImageCaption');
  const fallback = byId('qaImageFallback');
  const openButton = byId('openQaImageButton');
  if (stationData.qa.panel_png) {
    img.src = stationData.qa.panel_png;
    img.hidden = false;
    caption.textContent = text('qaFigureCaption');
    caption.hidden = false;
    if (openButton) openButton.hidden = false;
    fallback.textContent = '';
    fallback.hidden = true;
    byId('imageOverlayImg').src = stationData.qa.panel_png;
    byId('imageOverlayCaption').textContent = text('qaFigureCaption');
  } else {
    img.hidden = true;
    caption.hidden = true;
    if (openButton) openButton.hidden = true;
    fallback.textContent = text('noQaPanel');
    fallback.hidden = false;
    byId('imageOverlayImg').removeAttribute('src');
    byId('imageOverlayCaption').textContent = text('noQaPanel');
  }
}

function renderEmptySelection() {
  byId('selectedStatusTitle').textContent = text('selectedStatusTitle');
  byId('selectedStatusSubtitle').textContent = text('selectedStatusSubtitle');
  byId('selectedMetricStatus').textContent = '-';
  byId('selectedMetricBasis').textContent = '-';
  byId('selectedMetricQa').textContent = '-';
  byId('stationHeading').textContent = text('stationHeading');
  byId('stationSubheading').textContent = text('stationSubheading');
  byId('qaOverview').innerHTML = '';
  byId('qaFlags').innerHTML = '';
  byId('eventMetrics').innerHTML = '';
  byId('eventTableBody').innerHTML = '';
  byId('evidenceSummary').textContent = '-';
  byId('evidenceChart').hidden = true;
  byId('evidenceEmpty').hidden = true;
  destroyChart('evidenceChart');
  byId('seasonalitySummary').textContent = '-';
  byId('seasonalityChart').hidden = true;
  byId('seasonalityEmpty').hidden = true;
  destroyChart('seasonalityChart');
  byId('qaImage').hidden = true;
  byId('qaImageCaption').hidden = true;
  byId('openQaImageButton').hidden = true;
  byId('qaImageFallback').textContent = '-';
}

async function selectStation(stationCode) {
  state.selectedCode = stationCode;
  renderStationList();
  const station = state.stationByCode.get(stationCode);
  if (!station) return;
  updateUrl();
  showToast(TEXT[state.lang].toasts.loading, 900);
  const data = await loadStationData(stationCode);
  state.selectedData = data;
  renderStatusCard(data);
  renderMetadata(data);
  renderTimeseriesChart(data);
  renderEvidenceChart(data);
  renderEventSummary(data);
  renderSeasonality(data);
  renderEventsTable(data);
  renderQaSection(data);
}

function updateUrl() {
  const url = new URL(window.location.href);
  if (state.selectedDate) url.searchParams.set('date', state.selectedDate);
  if (state.selectedCode) url.searchParams.set('station', state.selectedCode);
  url.searchParams.set('lang', state.lang);
  window.history.replaceState({}, '', url.toString());
}

function fitMapToFiltered() {
  if (state.markerBounds) {
    map.fitBounds(state.markerBounds.pad(0.15));
  }
}

function parseUrlState() {
  const params = new URLSearchParams(window.location.search);
  return {
    date: params.get('date'),
    station: params.get('station'),
    lang: params.get('lang'),
  };
}

async function setSelectedDate(dateString, preserveSelection = true) {
  state.selectedDate = dateString;
  byId('datePicker').value = dateString;
  await loadMonth(dateString);
  applyFilters();
  if (preserveSelection && state.selectedCode) {
    if (state.selectedData) {
      renderStatusCard(state.selectedData);
      renderTimeseriesChart(state.selectedData);
    } else {
      await selectStation(state.selectedCode);
    }
  }
  updateUrl();
}

function exportFilteredCsv() {
  const rows = [['station_code', 'station_name', 'uf', 'municipality', 'basin_name', 'biome', 'status', 'selected_day_basis', 'threshold_basis', 'qa_review_class', 'first_date', 'last_date', 'n_events']];
  state.filteredStations.forEach((station) => {
    const info = getStatusInfo(station.station_code, state.selectedDate);
    const basisKey = resolvedBasisKey(info.basis, station.threshold_basis);
    rows.push([
      station.station_code,
      station.station_name || '',
      station.uf || '',
      station.municipality || '',
      station.basin_name || '',
      station.biome || '',
      info.status,
      basisKey,
      station.threshold_basis || '',
      station.qa_review_class || '',
      station.first_date || '',
      station.last_date || '',
      station.n_events || 0,
    ]);
  });
  const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `limiar_filtered_${state.selectedDate}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast(TEXT[state.lang].toasts.csvReady);
}

async function dataUrlToUint8Array(dataUrl) {
  const base64 = dataUrl.split(',')[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function fetchImageBytes(path) {
  const response = await fetch(path);
  if (!response.ok) return null;
  return new Uint8Array(await response.arrayBuffer());
}

async function exportStationReport() {
  if (!state.selectedData || !window.docx) return;
  const previousRange = state.currentRange;
  let forcedFullRange = false;
  try {
    const docx = window.docx;
    if (byId('timeseriesChart').hidden) {
      state.currentRange = 'full';
      forcedFullRange = true;
      document.querySelectorAll('.range-button').forEach((node) => node.classList.toggle('active', node.dataset.range === 'full'));
      renderTimeseriesChart(state.selectedData);
    }
    renderEvidenceChart(state.selectedData);
    const chartBytes = await chartToBytes('timeseriesChart', 1800, 900);
    const evidenceBytes = await chartToBytes('evidenceChart', 1700, 860);
    const qaBytes = state.selectedData.qa.panel_png ? await fetchImageBytes(state.selectedData.qa.panel_png) : null;
    const details = buildDayDetails(state.selectedData, state.selectedDate);
    const basisKey = resolvedBasisKey(details.basis, state.selectedData.summary.threshold_basis);
    const docEvents = normalizedEventRows(state.selectedData).slice(0, 8);
    const qaFlagsText = (state.selectedData.qa.flags || []).length ? state.selectedData.qa.flags.map(flagLabel).join('; ') : text('noQaFlags');
    const summaryPairs = [
      [text('fields').selectedDate, formatDate(state.selectedDate)],
      [text('selectedMetricStatusLabel'), statusLabel(details.status)],
      [text('fields').observed, formatValue(details.observed, details.valueType)],
      [text('fields').thresholdBasis, basisLabel(basisKey)],
      [text('fields').uncertainty, uncertaintyLabel(state.selectedData.summary.uncertainty_class)],
      [text('fields').cautionLevel, cautionLabel(state.selectedData.summary.qa_review_class)],
      [text('fields').alert, formatValue(details.alert, details.valueType)],
      [text('fields').flood, formatValue(details.flood, details.valueType)],
      [text('fields').severe, formatValue(details.severe, details.valueType)],
      [text('fields').eventCount, formatNumber(state.selectedData.summary.n_events, 0)],
      [text('fields').eventFrequency, formatNumber(state.selectedData.summary.event_frequency_per_year, 2)],
      [text('fields').maxDuration, formatDuration(state.selectedData.summary.max_event_duration_days)],
    ];

    const summaryTable = new docx.Table({
      rows: summaryPairs.map(([label, value]) => new docx.TableRow({
        children: [
          new docx.TableCell({
            children: [new docx.Paragraph({ text: label })],
          }),
          new docx.TableCell({
            children: [new docx.Paragraph({ text: value })],
          }),
        ],
      })),
    });

    const eventsTableRows = [
      new docx.TableRow({
        children: [text('thStartDate'), text('thPeakDate'), text('thDuration'), text('thPeak'), text('thClass')].map((cell) => new docx.TableCell({
          children: [new docx.Paragraph(cell)],
        })),
      }),
      ...(docEvents.length
        ? docEvents.map((event) => new docx.TableRow({
          children: [
            new docx.TableCell({ children: [new docx.Paragraph(formatShortDate(event.event_start))] }),
            new docx.TableCell({ children: [new docx.Paragraph(formatShortDate(event.peak_date))] }),
            new docx.TableCell({ children: [new docx.Paragraph(formatDuration(event.duration_days))] }),
            new docx.TableCell({
              children: [
                new docx.Paragraph(
                  event.peak_stage_cm != null
                    ? formatValue(event.peak_stage_cm, 'stage_cm')
                    : formatValue(event.peak_discharge_m3s, 'discharge_m3s'),
                ),
              ],
            }),
            new docx.TableCell({ children: [new docx.Paragraph(event.display_class)] }),
          ],
        }))
        : [new docx.TableRow({
          children: Array.from({ length: 5 }, (_, index) => new docx.TableCell({
            children: [new docx.Paragraph(index === 0 ? '-' : '')],
          })),
        })]),
    ];

    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: [
            new docx.Paragraph({
              text: TEXT[state.lang].report.title,
              heading: docx.HeadingLevel.TITLE,
            }),
            new docx.Paragraph({
              text: `${state.selectedData.metadata.station_name} · ${state.selectedData.metadata.station_code}`,
            }),
            new docx.Paragraph({
              text: `${TEXT[state.lang].report.summarySection}`,
              heading: docx.HeadingLevel.HEADING_1,
            }),
            summaryTable,
            new docx.Paragraph({
              text: TEXT[state.lang].report.methodSection,
              heading: docx.HeadingLevel.HEADING_1,
            }),
            new docx.Paragraph(TEXT[state.lang].report.methodText),
            new docx.Paragraph({
              text: TEXT[state.lang].report.chartSection,
              heading: docx.HeadingLevel.HEADING_1,
              pageBreakBefore: true,
            }),
            ...(chartBytes ? [
              new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                  new docx.ImageRun({
                    data: chartBytes,
                    transformation: { width: 640, height: 320 },
                  }),
                ],
              }),
              new docx.Paragraph(TEXT[state.lang].report.chartCaption),
            ] : []),
            ...(evidenceBytes ? [
              new docx.Paragraph({
                text: TEXT[state.lang].report.evidenceSection,
                heading: docx.HeadingLevel.HEADING_1,
              }),
              new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                  new docx.ImageRun({
                    data: evidenceBytes,
                    transformation: { width: 640, height: 320 },
                  }),
                ],
              }),
              new docx.Paragraph(TEXT[state.lang].report.evidenceCaption),
            ] : []),
            new docx.Paragraph({
              text: TEXT[state.lang].report.qaSection,
              heading: docx.HeadingLevel.HEADING_1,
              pageBreakBefore: true,
            }),
            new docx.Paragraph(qaFlagsText),
            ...(qaBytes ? [
              new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                  new docx.ImageRun({
                    data: qaBytes,
                    transformation: { width: 640, height: 415 },
                  }),
                ],
              }),
              new docx.Paragraph(TEXT[state.lang].report.qaCaption),
            ] : [new docx.Paragraph(TEXT[state.lang].report.fallbackImage)]),
            new docx.Paragraph({
              text: TEXT[state.lang].report.eventsSection,
              heading: docx.HeadingLevel.HEADING_1,
            }),
            new docx.Table({
              rows: eventsTableRows,
            }),
          ],
        },
      ],
    });
    const blob = await docx.Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `limiar_station_${state.selectedData.metadata.station_code}_${state.selectedDate}.docx`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(TEXT[state.lang].toasts.reportReady);
  } catch (error) {
    console.error(error);
    showToast(TEXT[state.lang].toasts.reportError);
  } finally {
    if (forcedFullRange) {
      state.currentRange = previousRange;
      document.querySelectorAll('.range-button').forEach((node) => node.classList.toggle('active', node.dataset.range === previousRange));
      renderTimeseriesChart(state.selectedData);
    }
  }
}

function wireEvents() {
  ['stationSearch', 'statusFilter', 'basisFilter', 'qaFilter', 'ufFilter', 'basinFilter', 'biomeFilter'].forEach((id) => {
    byId(id).addEventListener('input', applyFilters);
    byId(id).addEventListener('change', applyFilters);
  });
  byId('datePicker').addEventListener('change', async (event) => {
    if (event.target.value) await setSelectedDate(event.target.value);
  });
  byId('theoryButton').addEventListener('click', () => openOverlay('theoryOverlay'));
  byId('fitMapButton').addEventListener('click', fitMapToFiltered);
  byId('exportCsvButton').addEventListener('click', exportFilteredCsv);
  byId('shareButton').addEventListener('click', async () => {
    await navigator.clipboard.writeText(window.location.href);
    showToast(TEXT[state.lang].toasts.copied);
  });
  byId('exportReportButton').addEventListener('click', exportStationReport);
  byId('openQaImageButton').addEventListener('click', () => {
    if (!byId('qaImage').hidden) openOverlay('imageOverlay');
  });
  byId('closeTheoryButton').addEventListener('click', () => closeOverlay('theoryOverlay'));
  byId('closeImageButton').addEventListener('click', () => closeOverlay('imageOverlay'));
  document.querySelectorAll('[data-overlay-close]').forEach((button) => {
    button.addEventListener('click', () => closeOverlay(button.dataset.overlayClose));
  });
  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeOverlay('theoryOverlay');
    closeOverlay('imageOverlay');
  });
  document.querySelectorAll('.lang-button').forEach((button) => {
    button.addEventListener('click', async () => {
      state.lang = button.dataset.lang;
      applyStaticTranslations();
      updateLanguageButtons();
      populateFilters();
      renderLegend();
      renderGlobalStats();
      applyFilters();
      if (state.selectedData) {
        renderStatusCard(state.selectedData);
        renderMetadata(state.selectedData);
        renderTimeseriesChart(state.selectedData);
        renderEvidenceChart(state.selectedData);
        renderEventSummary(state.selectedData);
        renderSeasonality(state.selectedData);
        renderEventsTable(state.selectedData);
        renderQaSection(state.selectedData);
      } else {
        renderEmptySelection();
      }
      updateUrl();
    });
  });
  document.querySelectorAll('.range-button').forEach((button) => {
    button.addEventListener('click', () => {
      state.currentRange = button.dataset.range;
      document.querySelectorAll('.range-button').forEach((node) => node.classList.toggle('active', node === button));
      if (state.selectedData) renderTimeseriesChart(state.selectedData);
    });
  });
  document.querySelectorAll('.tabbar button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tabbar button').forEach((node) => node.classList.toggle('active', node === button));
      document.querySelectorAll('.panel-view').forEach((panel) => panel.classList.toggle('active', panel.id === button.dataset.panel));
    });
  });
}

async function boot() {
  applyStaticTranslations();
  updateLanguageButtons();
  renderLegend();
  renderEmptySelection();
  wireEvents();
  hideFatalState();

  if (window.location.protocol === 'file:') {
    const redirected = await tryRedirectFromFileMode();
    if (redirected) return;
    showFatalState(text('fatalMessage'), true);
    return;
  }

  state.manifest = await loadJson('data/manifest.json');
  state.stations = await loadJson('data/stations.json');
  state.stationByCode = new Map(state.stations.map((station) => [station.station_code, station]));
  renderGlobalStats();

  const urlState = parseUrlState();
  if (urlState.lang && TEXT[urlState.lang]) {
    state.lang = urlState.lang;
    applyStaticTranslations();
    updateLanguageButtons();
  }
  populateFilters();
  byId('qaFilter').value = 'screening_ok';

  const firstDate = urlState.date || state.manifest.latest_status_date || state.manifest.supported_date_max;
  await setSelectedDate(firstDate, false);

  const initialStation = urlState.station || state.filteredStations[0]?.station_code || state.stations[0]?.station_code;
  if (initialStation) {
    await selectStation(initialStation);
  } else {
    renderDatasetMetrics();
  }
}

boot().catch((error) => {
  console.error(error);
  showFatalState(error?.message || TEXT[state.lang].toasts.loadError, window.location.protocol === 'file:');
  showToast(TEXT[state.lang].toasts.loadError);
});
