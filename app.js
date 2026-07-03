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

const QA_PANEL_PARTS = [
  { key: 'cross_section', className: 'qa-subpanel-top-left', col: 0, row: 0 },
  { key: 'daily_exceedance', className: 'qa-subpanel-top-right', col: 1, row: 0 },
  { key: 'rating_curve', className: 'qa-subpanel-bottom-left', col: 0, row: 1 },
  { key: 'annual_maxima', className: 'qa-subpanel-bottom-right', col: 1, row: 1 },
];

const TEXT = {
  pt: {
    pageTitle: 'LIMIAR',
    brandTitle: 'LIMIAR',
    brandSubtitle: 'Levels and Indicators for Monitoring Inundation Across Rivers',
    dateLabel: 'Data',
    previousDateLabel: 'Dia anterior',
    nextDateLabel: 'Próximo dia',
    dateScrubberLabel: 'Controle de rolagem da data',
    theoryButton: 'Como funciona',
    layersButton: 'Camadas',
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
    crossSectionFilterLabel: 'Seção transversal',
    ratingCurveFilterLabel: 'Curva-chave',
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
    exportStationDataButton: 'Baixar dados CSV',
    exportTimeseriesCsvButton: 'Baixar CSV',
    exportCrossSectionCsvButton: 'Baixar CSV',
    exportDynamicDailyCsvButton: 'Baixar CSV',
    exportRatingCurveCsvButton: 'Baixar CSV',
    exportEvidenceCsvButton: 'Baixar CSV',
    exportSeasonalityCsvButton: 'Baixar CSV',
    exportEventsCsvButton: 'Baixar CSV',
    exportReportButton: 'Exportar DOCX',
    metadataTitle: 'Metadados e limiares',
    timeseriesTitle: 'Série temporal principal',
    crossSectionTitle: 'Evolução das seções transversais',
    crossSectionSubtitle: 'Seções observadas e faixa de incerteza do limiar hidráulico',
    dynamicDailyTitle: 'Registro completo com limiar dinâmico',
    dynamicDailySubtitle: 'Série inteira com o limiar ativo em cada intervalo e picos reconstruídos',
    ratingCurveTitle: 'Contexto da curva-chave e do Q2',
    ratingCurveSubtitle: 'Curvas válidas ao longo do tempo e pontos de limiar por intervalo dinâmico',
    evidenceTitle: 'Evolução dos limiares e máximos anuais',
    evidenceSubtitle: 'Mudanças de limiar ao longo do registro, com máximos anuais observados',
    eventSummaryTitle: 'Resumo de eventos',
    recentEventsTitle: 'Eventos recentes e significativos',
    qaTitle: 'Evidência hidráulica detalhada e incerteza',
    seasonalityTitle: 'Sazonalidade dos eventos',
    seasonalitySubtitle: 'Picos de eventos reconstruídos ao longo do ano',
    datasetTotalsTitle: 'Totais do conjunto',
    sampleDescriptionTitle: 'Descrição da amostra',
    statusTotalsTitle: 'Totais da data selecionada',
    datasetBreakdownTitle: 'Cobertura e distribuição',
    howToReadTitle: 'Como interpretar',
    howToReadText: 'O mapa usa primeiro limiares hidráulicos observados. Onde eles não existem, o atlas usa Q2 estatístico. Alerta e inundação severa usam limiares estatísticos de período de retorno.',
    thStartDate: 'Início',
    caveatTitle: 'Caveat científico',
    caveatText: 'Este atlas mostra um retrato histórico para análise. Não é um sistema de alerta em tempo real e não substitui a avaliação local.',
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
    qaSubpanelsTitle: 'Painéis individuais',
    qaSubpanelsSubtitle: 'Seção transversal, registro diário, curva-chave e máximos anuais, um abaixo do outro.',
    noQaFlags: 'Nenhuma flag adicional registrada.',
    noQaPanel: '',
    emptyEvidence: 'Sem intervalos suficientes para resumir a evolução dos limiares nesta estação.',
    legendPointNote: 'Todos os pontos têm o mesmo tamanho. A cor mostra a classe do dia.',
    layersEyebrow: 'Mapa',
    layersTitle: 'Mapa base e camadas visíveis',
    layersBaseTitle: 'Mapa base',
    layersVisibleTitle: 'Elementos visíveis',
    baseOsm: 'OpenStreetMap padrão',
    baseOsmText: 'Base mais simples, com menos relevo visual e leitura mais direta.',
    baseTopo: 'Relevo e drenagem',
    baseTopoText: 'Mostra relevo/topografia com mais destaque visual.',
    layerStations: 'Estações',
    layerStationsText: 'Mostra os pontos das estações filtradas no mapa.',
    layerSummary: 'Resumo flutuante',
    layerSummaryText: 'Mostra o cartão com a estação selecionada sobre o mapa.',
    layerLegend: 'Legenda',
    layerLegendText: 'Mostra a legenda de classes e cores no canto do mapa.',
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
    hydraulicAvailability: {
      all: 'Todas',
      yes: 'Com evidência',
      no: 'Sem evidência',
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
      hydraulicStations: 'Com limiar hidráulico',
      q2FallbackStations: 'Com fallback Q2',
      crossSectionStations: 'Com seção transversal',
      ratingCurveStations: 'Com curva-chave',
      totalEvents: 'Eventos reconstruídos',
      medianRecordYears: 'Mediana do registro',
      medianDrainageArea: 'Mediana da área',
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
      methodText: 'O LIMIAR compara o valor diário observado com os limiares válidos naquele período. Quando existe evidência hidráulica observada, ela define o limiar principal de inundação; quando não existe, o atlas usa o Q2 estatístico como fallback. Este produto é histórico e de triagem, não um sistema operacional em tempo real.',
      statusSection: 'Situação na data selecionada',
      chartSection: 'Série temporal principal',
      chartCaption: 'Registro diário observado com a data selecionada e os limiares aplicados.',
      crossSectionSection: 'Evolução das seções transversais',
      crossSectionCaption: 'Seções transversais observadas da estação, com linha mediana do limiar hidráulico e faixa de incerteza entre os percentis 10 e 90.',
      dynamicDailySection: 'Registro completo com limiar dinâmico',
      dynamicDailyCaption: 'Série completa da estação com o limiar ativo em cada intervalo e os picos dos eventos reconstruídos.',
      ratingCurveSection: 'Curva-chave e contexto do Q2',
      ratingCurveCaption: 'Curvas válidas ao longo do registro, pontos de limiar por intervalo dinâmico e referência vertical do Q2.',
      evidenceSection: 'Evolução de limiares e máximos anuais',
      evidenceCaption: 'Máximos anuais observados comparados com os limiares vigentes em cada período. Marcadores indicam anos com atualização de seção transversal.',
      seasonalitySection: 'Sazonalidade dos eventos',
      seasonalityCaption: 'Distribuição dos meses de pico dos eventos reconstruídos, usada para resumir a concentração sazonal da estação.',
      eventsSection: 'Todos os eventos reconstruídos da estação',
      qaSection: 'Painel hidráulico e QA',
      qaCaption: 'Painel detalhado com seção observada, curva-chave, Q2 e contexto de máximos anuais.',
      qaSubpanelsSection: 'Painéis hidráulicos individuais',
      fallbackImage: 'Painel QA pré-renderizado indisponível neste pacote para esta estação.',
    },
    datasetNarratives: {
      thresholdsTitle: 'Tipos de limiar',
      evidenceTitle: 'Cobertura hidráulica',
      geographyTitle: 'Distribuição espacial',
    },
    units: {
      stage_cm: 'cm',
      discharge_m3s: 'm³/s',
      days: 'dias',
      years: 'anos',
    },
    qaFigureCaption: 'Painel da estação com a evidência hidráulica e os limiares usados na reconstrução.',
    qaPanelParts: {
      cross_section: 'Seção transversal, limiar principal e incerteza',
      daily_exceedance: 'Registro diário e excedências de limiar',
      rating_curve: 'Curva-chave e contexto hidráulico',
      annual_maxima: 'Q2 e máximos anuais',
    },
    emptyTimeseries: 'Sem série temporal disponível para esta estação.',
    emptyCrossSection: 'Sem seções transversais observadas para esta estação.',
    emptyDynamicDaily: 'Sem registro dinâmico suficiente para esta estação.',
    emptyRatingCurve: 'Sem curvas-chave suficientes para reconstruir este painel.',
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
      stationDataReady: 'Pacote CSV da estação gerado.',
      loadError: 'Falha ao carregar o atlas.',
    },
  },
  en: {
    pageTitle: 'LIMIAR',
    brandTitle: 'LIMIAR',
    brandSubtitle: 'Levels and Indicators for Monitoring Inundation Across Rivers',
    dateLabel: 'Date',
    previousDateLabel: 'Previous day',
    nextDateLabel: 'Next day',
    dateScrubberLabel: 'Date scroll control',
    theoryButton: 'How it works',
    layersButton: 'Layers',
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
    crossSectionFilterLabel: 'Cross section',
    ratingCurveFilterLabel: 'Rating curve',
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
    exportStationDataButton: 'Download station CSVs',
    exportTimeseriesCsvButton: 'Download CSV',
    exportCrossSectionCsvButton: 'Download CSV',
    exportDynamicDailyCsvButton: 'Download CSV',
    exportRatingCurveCsvButton: 'Download CSV',
    exportEvidenceCsvButton: 'Download CSV',
    exportSeasonalityCsvButton: 'Download CSV',
    exportEventsCsvButton: 'Download CSV',
    exportReportButton: 'Export DOCX',
    metadataTitle: 'Metadata and thresholds',
    timeseriesTitle: 'Primary time series',
    crossSectionTitle: 'Cross-section evolution',
    crossSectionSubtitle: 'Observed cross sections and the uncertainty band around the hydraulic threshold',
    dynamicDailyTitle: 'Full record with dynamic threshold',
    dynamicDailySubtitle: 'Whole-station series with the active threshold for each interval and reconstructed peaks',
    ratingCurveTitle: 'Rating-curve and Q2 context',
    ratingCurveSubtitle: 'Valid curves through time and interval-level threshold points',
    evidenceTitle: 'Threshold evolution and annual maxima',
    evidenceSubtitle: 'Threshold changes through the record, with observed annual maxima',
    eventSummaryTitle: 'Event summary',
    recentEventsTitle: 'Recent and significant events',
    qaTitle: 'Detailed hydraulic evidence and uncertainty',
    seasonalityTitle: 'Event seasonality',
    seasonalitySubtitle: 'Reconstructed event peaks across the year',
    datasetTotalsTitle: 'Dataset totals',
    sampleDescriptionTitle: 'Sample description',
    statusTotalsTitle: 'Selected-day totals',
    datasetBreakdownTitle: 'Coverage and distribution',
    howToReadTitle: 'How to read',
    howToReadText: 'The map prioritizes observed hydraulic thresholds. Where those do not exist, the atlas uses statistical Q2 thresholds. Warning and severe flooding use statistical return-period thresholds.',
    thStartDate: 'Start',
    caveatTitle: 'Scientific caveat',
    caveatText: 'This atlas shows a historical picture for analysis. It is not a real-time warning system and does not replace local assessment.',
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
    qaSubpanelsTitle: 'Individual panels',
    qaSubpanelsSubtitle: 'Cross section, daily record, rating-curve context, and annual maxima shown one beneath the other.',
    noQaFlags: 'No additional flags recorded.',
    noQaPanel: '',
    emptyEvidence: 'Not enough intervals are available to summarize threshold evolution for this station.',
    legendPointNote: 'All points use the same size. Color shows the selected-day class.',
    layersEyebrow: 'Map',
    layersTitle: 'Basemap and visible layers',
    layersBaseTitle: 'Basemap',
    layersVisibleTitle: 'Visible elements',
    baseOsm: 'Standard OpenStreetMap',
    baseOsmText: 'Cleaner default basemap with less visual relief.',
    baseTopo: 'Relief and drainage',
    baseTopoText: 'Highlights terrain/topography more strongly.',
    layerStations: 'Stations',
    layerStationsText: 'Show filtered station markers on the map.',
    layerSummary: 'Floating summary',
    layerSummaryText: 'Show the selected-station summary card over the map.',
    layerLegend: 'Legend',
    layerLegendText: 'Show the class/color legend in the map corner.',
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
    hydraulicAvailability: {
      all: 'All',
      yes: 'Available',
      no: 'Unavailable',
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
      hydraulicStations: 'Hydraulic-threshold stations',
      q2FallbackStations: 'Q2 fallback stations',
      crossSectionStations: 'With cross section',
      ratingCurveStations: 'With rating curve',
      totalEvents: 'Reconstructed events',
      medianRecordYears: 'Median record length',
      medianDrainageArea: 'Median drainage area',
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
      methodText: 'LIMIAR compares the observed daily value against the thresholds valid for that period. Whenever observed hydraulic evidence exists, it defines the primary flood threshold; where it does not, the atlas uses statistical Q2 as a fallback. This is a historical screening product, not a real-time operational warning system.',
      statusSection: 'Selected-day conditions',
      chartSection: 'Primary time series',
      chartCaption: 'Observed daily record with the selected day and the thresholds applied to that period.',
      crossSectionSection: 'Cross-section evolution',
      crossSectionCaption: 'Observed station cross sections with the median hydraulic threshold and the 10th to 90th percentile uncertainty band.',
      dynamicDailySection: 'Full record with dynamic threshold',
      dynamicDailyCaption: 'Whole-station series with the active threshold in each interval and reconstructed event peaks.',
      ratingCurveSection: 'Rating-curve and Q2 context',
      ratingCurveCaption: 'Valid curves through time, interval-level threshold points, and the vertical Q2 reference.',
      evidenceSection: 'Threshold evolution and annual maxima',
      evidenceCaption: 'Observed annual maxima compared with the thresholds in force for each period. Markers show years with cross-section updates.',
      seasonalitySection: 'Event seasonality',
      seasonalityCaption: 'Distribution of reconstructed event peak months, used to summarize the station seasonal concentration.',
      eventsSection: 'All reconstructed station events',
      qaSection: 'Hydraulic panel and QA',
      qaCaption: 'Detailed panel with the observed cross section, rating-curve context, Q2, and annual-maxima evidence.',
      qaSubpanelsSection: 'Individual hydraulic panels',
      fallbackImage: 'The pre-rendered QA panel is not available for this station in the current package.',
    },
    datasetNarratives: {
      thresholdsTitle: 'Threshold types',
      evidenceTitle: 'Hydraulic coverage',
      geographyTitle: 'Spatial distribution',
    },
    units: {
      stage_cm: 'cm',
      discharge_m3s: 'm3/s',
      days: 'days',
      years: 'years',
    },
    qaFigureCaption: 'Station panel with the hydraulic evidence and thresholds used in the reconstruction.',
    qaPanelParts: {
      cross_section: 'Cross section, main threshold, and uncertainty',
      daily_exceedance: 'Daily record and threshold exceedances',
      rating_curve: 'Rating-curve and hydraulic context',
      annual_maxima: 'Q2 and annual maxima',
    },
    emptyTimeseries: 'No time series is available for this station.',
    emptyCrossSection: 'No observed cross sections are available for this station.',
    emptyDynamicDaily: 'There is not enough dynamic record support for this station.',
    emptyRatingCurve: 'There are not enough rating curves to rebuild this panel.',
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
      stationDataReady: 'Station CSV package generated.',
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

const DEFAULT_STATION_CODE = '83250000';

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
  basemap: 'osm',
  baseLayers: {},
  mapVisibility: {
    stations: true,
    summary: true,
    legend: true,
  },
  dateScrubberTimer: null,
  dateStepHoldTimer: null,
  dateStepRepeatTimer: null,
  dateStepSuppressClick: false,
  dateStepBusy: false,
};

const BASEMAP_DEFS = {
  osm: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18,
  },
  topo: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap',
    maxZoom: 17,
  },
};

const map = L.map('map', {
  preferCanvas: true,
  zoomControl: true,
}).setView([-14.5, -52.5], 4);

Object.entries(BASEMAP_DEFS).forEach(([key, config]) => {
  state.baseLayers[key] = L.tileLayer(config.url, {
    attribution: config.attribution,
    maxZoom: config.maxZoom,
  });
});
state.baseLayers[state.basemap].addTo(map);

function byId(id) {
  return document.getElementById(id);
}

function text(key) {
  return TEXT[state.lang][key];
}

function nestedText(group, key) {
  return TEXT[state.lang][group][key];
}

function qaPanelPartLabel(key) {
  return TEXT[state.lang].qaPanelParts?.[key] || key;
}

function isFiniteNumber(value) {
  return value != null && Number.isFinite(Number(value));
}

function curveKey(curveId, segmentId) {
  return `${curveId || ''}||${segmentId || ''}`;
}

function quantileFromSorted(values, q) {
  if (!values.length) return null;
  if (values.length === 1) return values[0];
  const pos = (values.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  const lower = values[base];
  const upper = values[Math.min(base + 1, values.length - 1)];
  return lower + rest * (upper - lower);
}

function ratingDischarge(stageCm, coefficientA, coefficientH0, coefficientN) {
  const stageM = Number(stageCm) / 100;
  const baseM = stageM - Number(coefficientH0);
  if (!Number.isFinite(baseM) || baseM <= 0 || !Number.isFinite(Number(coefficientA)) || !Number.isFinite(Number(coefficientN))) {
    return null;
  }
  return Number(coefficientA) * (baseM ** Number(coefficientN));
}

function ratingStageFromDischarge(dischargeM3s, coefficientA, coefficientH0, coefficientN) {
  const discharge = Number(dischargeM3s);
  if (discharge <= 0 || !Number.isFinite(discharge) || !Number.isFinite(Number(coefficientA)) || Number(coefficientA) <= 0 || !Number.isFinite(Number(coefficientN)) || Number(coefficientN) <= 0) {
    return null;
  }
  const stageM = Number(coefficientH0) + ((discharge / Number(coefficientA)) ** (1 / Number(coefficientN)));
  return stageM * 100;
}

function latestRatingCurve(stationData) {
  const curves = (stationData.hydraulic?.ratingCurves || []).filter((curve) =>
    curve
    && isFiniteNumber(curve.coefficientA)
    && isFiniteNumber(curve.coefficientH0)
    && isFiniteNumber(curve.coefficientN)
  );
  if (!curves.length) return null;
  return curves.slice().sort((left, right) => {
    const leftKey = left.validTo || left.validFrom || `${left.year || 0}`;
    const rightKey = right.validTo || right.validFrom || `${right.year || 0}`;
    return String(leftKey).localeCompare(String(rightKey));
  }).at(-1);
}

function crossSectionBand(stationData) {
  const values = stationData.intervalsHydrated
    .map((interval) => (interval.valueType === 'stage_cm' ? Number(interval.flood) : null))
    .filter((value) => Number.isFinite(value))
    .sort((a, b) => a - b);
  if (!values.length) return null;
  return {
    low: quantileFromSorted(values, 0.1),
    median: quantileFromSorted(values, 0.5),
    high: quantileFromSorted(values, 0.9),
  };
}

const CURVE_COLORS = ['#2d1e3f', '#4f2a6b', '#72358c', '#98438a', '#bd537d', '#de6b68', '#f08d5e', '#f7b267'];

const thresholdBandPlugin = {
  id: 'thresholdBand',
  beforeDatasetsDraw(chart, _args, options) {
    if (!options || !options.enabled || !chart.scales?.y || !chart.chartArea) return;
    const { ctx, chartArea, scales } = chart;
    const low = Number(options.low);
    const high = Number(options.high);
    const median = Number(options.median);
    if (!Number.isFinite(low) || !Number.isFinite(high) || !Number.isFinite(median)) return;
    const y1 = scales.y.getPixelForValue(high);
    const y2 = scales.y.getPixelForValue(low);
    const ym = scales.y.getPixelForValue(median);
    ctx.save();
    ctx.fillStyle = 'rgba(208, 75, 69, 0.12)';
    ctx.fillRect(chartArea.left, Math.min(y1, y2), chartArea.right - chartArea.left, Math.abs(y2 - y1));
    ctx.strokeStyle = '#8f1d21';
    ctx.lineWidth = 1.4;
    ctx.setLineDash([7, 4]);
    ctx.beginPath();
    ctx.moveTo(chartArea.left, ym);
    ctx.lineTo(chartArea.right, ym);
    ctx.stroke();
    ctx.restore();
  },
};

if (window.Chart?.register) {
  window.Chart.register(thresholdBandPlugin);
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

function setBasemap(key) {
  if (!state.baseLayers[key] || state.basemap === key) return;
  map.removeLayer(state.baseLayers[state.basemap]);
  state.basemap = key;
  state.baseLayers[key].addTo(map);
}

function applyMapVisibility() {
  const selectedCard = byId('selectedCard');
  const legendCard = byId('legendCard');
  if (selectedCard) selectedCard.hidden = !state.mapVisibility.summary;
  if (legendCard) legendCard.hidden = !state.mapVisibility.legend;
  renderMap();
}

function renderLayersModal() {
  const body = byId('layersBody');
  if (!body) return;
  byId('layersEyebrow').textContent = text('layersEyebrow');
  byId('layersTitle').textContent = text('layersTitle');
  body.innerHTML = `
    <div class="layers-grid">
      <section class="layers-group">
        <h3>${text('layersBaseTitle')}</h3>
        <label class="layer-option">
          <input type="radio" name="basemapChoice" value="osm" ${state.basemap === 'osm' ? 'checked' : ''} />
          <span>
            <strong>${text('baseOsm')}</strong>
            <small>${text('baseOsmText')}</small>
          </span>
        </label>
        <label class="layer-option">
          <input type="radio" name="basemapChoice" value="topo" ${state.basemap === 'topo' ? 'checked' : ''} />
          <span>
            <strong>${text('baseTopo')}</strong>
            <small>${text('baseTopoText')}</small>
          </span>
        </label>
      </section>
      <section class="layers-group">
        <h3>${text('layersVisibleTitle')}</h3>
        <label class="layer-option">
          <input type="checkbox" data-layer-visibility="stations" ${state.mapVisibility.stations ? 'checked' : ''} />
          <span>
            <strong>${text('layerStations')}</strong>
            <small>${text('layerStationsText')}</small>
          </span>
        </label>
        <label class="layer-option">
          <input type="checkbox" data-layer-visibility="summary" ${state.mapVisibility.summary ? 'checked' : ''} />
          <span>
            <strong>${text('layerSummary')}</strong>
            <small>${text('layerSummaryText')}</small>
          </span>
        </label>
        <label class="layer-option">
          <input type="checkbox" data-layer-visibility="legend" ${state.mapVisibility.legend ? 'checked' : ''} />
          <span>
            <strong>${text('layerLegend')}</strong>
            <small>${text('layerLegendText')}</small>
          </span>
        </label>
      </section>
    </div>
  `;
  body.querySelectorAll('input[name="basemapChoice"]').forEach((input) => {
    input.addEventListener('change', () => setBasemap(input.value));
  });
  body.querySelectorAll('[data-layer-visibility]').forEach((input) => {
    input.addEventListener('change', () => {
      state.mapVisibility[input.dataset.layerVisibility] = input.checked;
      applyMapVisibility();
    });
  });
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

function formatPercent(value, digits = 2) {
  if (value === null || value === undefined || value === '') return '-';
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return '-';
  const scaled = numeric * 100;
  const rounded = Number(scaled.toFixed(digits));
  const minStep = 1 / (10 ** digits);
  if (numeric > 0 && numeric < 1 && rounded >= 100) return `>${formatNumber(100 - minStep, digits)}%`;
  if (numeric > 0 && rounded <= 0) return `<${formatNumber(minStep, digits)}%`;
  return `${formatNumber(scaled, digits)}%`;
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
  const allRows = stationData.all_events || [];
  const recentRows = stationData.recent_events || [];
  const significantRows = stationData.significant_events || [];
  const significantById = new Map(significantRows.filter((event) => event?.event_id).map((event) => [event.event_id, event]));
  const significantBySignature = new Map(significantRows.map((event) => [eventSignature(event), event]));
  const sourceRows = allRows.length ? allRows : (recentRows.length ? recentRows : significantRows);
  const seen = new Set();
  return sourceRows
    .map((event) => ({
      ...event,
      event_start: findEventStart(event, stationData.recent_events),
      display_class: eventClassLabel(
        significantById.get(event.event_id)
        || significantBySignature.get(eventSignature(event))
        || event,
      ),
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
  if (exportConfig.options?.plugins?.legend?.labels) {
    exportConfig.options.plugins.legend.labels.font = {
      ...(exportConfig.options.plugins.legend.labels.font || {}),
      size: 24,
    };
  }
  Object.values(exportConfig.options?.scales || {}).forEach((scale) => {
    if (scale?.ticks) {
      scale.ticks.font = {
        ...(scale.ticks.font || {}),
        size: 24,
      };
    }
    if (scale?.title?.display) {
      scale.title.font = {
        ...(scale.title.font || {}),
        size: 26,
        weight: '600',
      };
    }
  });
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

async function safeChartToBytes(chartKey, width, height) {
  try {
    return await chartToBytes(chartKey, width, height);
  } catch (error) {
    console.warn(`Could not export chart ${chartKey} to image.`, error);
    return null;
  }
}

async function safeBuildQaPanelPartImages(src) {
  try {
    return src ? await buildQaPanelPartImages(src) : [];
  } catch (error) {
    console.warn('Could not build QA panel image parts.', error);
    return [];
  }
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
    'brandTitle', 'brandSubtitle', 'dateLabel', 'theoryButton', 'layersButton', 'fitMapButton', 'exportCsvButton', 'shareButton',
    'eyebrowLabel', 'heroTitle', 'heroText', 'statStationsLabel', 'statRangeLabel', 'statLatestLabel',
    'filtersTitle', 'searchLabel', 'statusFilterLabel', 'basisFilterLabel', 'qaFilterLabel', 'crossSectionFilterLabel',
    'ratingCurveFilterLabel', 'ufFilterLabel', 'basinFilterLabel', 'biomeFilterLabel', 'stationListTitle', 'selectedStatusEyebrow',
    'selectedMetricStatusLabel', 'selectedMetricBasisLabel', 'selectedMetricQaLabel', 'legendTitle',
    'stationTabButton', 'datasetTabButton', 'exportStationDataButton', 'exportTimeseriesCsvButton', 'exportCrossSectionCsvButton', 'exportDynamicDailyCsvButton', 'exportRatingCurveCsvButton', 'exportEvidenceCsvButton', 'exportSeasonalityCsvButton', 'exportEventsCsvButton', 'exportReportButton', 'metadataTitle', 'timeseriesTitle',
    'crossSectionTitle', 'crossSectionSubtitle', 'dynamicDailyTitle', 'dynamicDailySubtitle', 'ratingCurveTitle', 'ratingCurveSubtitle',
    'evidenceTitle', 'evidenceSubtitle', 'eventSummaryTitle', 'seasonalityTitle', 'seasonalitySubtitle', 'recentEventsTitle', 'qaTitle', 'datasetTotalsTitle', 'sampleDescriptionTitle', 'statusTotalsTitle', 'datasetBreakdownTitle',
    'howToReadTitle', 'howToReadText', 'caveatTitle', 'caveatText', 'thStartDate', 'thPeakDate', 'thDuration',
    'thPeak', 'thClass', 'imageOverlayTitle', 'qaSubpanelsTitle', 'qaSubpanelsSubtitle',
  ];
  keys.forEach((id) => {
    const node = byId(id);
    if (node) node.textContent = text(id);
  });
  byId('stationSearch').placeholder = text('searchPlaceholder');
  const prevDateButton = byId('prevDateButton');
  const nextDateButton = byId('nextDateButton');
  const dateScrubber = byId('dateScrubber');
  if (prevDateButton) {
    prevDateButton.setAttribute('aria-label', text('previousDateLabel'));
    prevDateButton.setAttribute('title', text('previousDateLabel'));
  }
  if (nextDateButton) {
    nextDateButton.setAttribute('aria-label', text('nextDateLabel'));
    nextDateButton.setAttribute('title', text('nextDateLabel'));
  }
  if (dateScrubber) {
    dateScrubber.setAttribute('aria-label', text('dateScrubberLabel'));
    dateScrubber.setAttribute('title', text('dateScrubberLabel'));
  }
  const fullRangeButton = document.querySelector('.range-button[data-range="full"]');
  if (fullRangeButton) fullRangeButton.textContent = text('fullRecordLabel');
  const fatalTitle = byId('fatalTitle');
  const fatalMessage = byId('fatalMessage');
  if (fatalTitle) fatalTitle.textContent = text('fatalTitle');
  if (fatalMessage && !byId('fatalState')?.hidden) fatalMessage.textContent = text('fatalMessage');
  const emptyChart = byId('timeseriesEmpty');
  if (emptyChart) emptyChart.textContent = text('emptyTimeseries');
  const emptyCrossSection = byId('crossSectionEmpty');
  if (emptyCrossSection) emptyCrossSection.textContent = text('emptyCrossSection');
  const emptyDynamicDaily = byId('dynamicDailyEmpty');
  if (emptyDynamicDaily) emptyDynamicDaily.textContent = text('emptyDynamicDaily');
  const emptyRatingCurve = byId('ratingCurveEmpty');
  if (emptyRatingCurve) emptyRatingCurve.textContent = text('emptyRatingCurve');
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
  const layersClose = byId('closeLayersButton');
  if (layersClose) layersClose.setAttribute('aria-label', text('closeLabel'));
  renderTheoryModal();
  renderLayersModal();
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

function buildDateStepButton(id, arrowEntity) {
  const button = document.createElement('button');
  button.type = 'button';
  button.id = id;
  button.className = 'date-step-button';
  const icon = document.createElement('span');
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = arrowEntity;
  button.appendChild(icon);
  return button;
}

function buildDateScrubber() {
  const scrubber = document.createElement('input');
  scrubber.type = 'range';
  scrubber.id = 'dateScrubber';
  scrubber.className = 'date-scrubber';
  scrubber.min = '0';
  scrubber.max = '0';
  scrubber.value = '0';
  scrubber.step = '1';
  return scrubber;
}

function ensureDateNavigator() {
  const datePicker = byId('datePicker');
  if (!datePicker) return;
  const dateControl = datePicker.closest('.date-control');
  if (!dateControl) return;

  let navigator = dateControl.closest('.date-navigator');
  if (!navigator) {
    navigator = document.createElement('div');
    navigator.className = 'date-navigator';
    navigator.setAttribute('role', 'group');
    navigator.setAttribute('aria-labelledby', 'dateLabel');
    dateControl.parentNode.insertBefore(navigator, dateControl);
    navigator.appendChild(buildDateStepButton('prevDateButton', '&larr;'));
    navigator.appendChild(dateControl);
    navigator.appendChild(buildDateStepButton('nextDateButton', '&rarr;'));
    return;
  }

  if (!byId('prevDateButton')) {
    navigator.insertBefore(buildDateStepButton('prevDateButton', '&larr;'), navigator.firstChild);
  }
  if (!byId('nextDateButton')) {
    navigator.appendChild(buildDateStepButton('nextDateButton', '&rarr;'));
  }
  if (!byId('dateScrubber')) {
    dateControl.appendChild(buildDateScrubber());
  }
}

function basisOptionValues() {
  return ['all', 'hydraulic', 'q2_fallback', 'tr_alert_severe'];
}

function hydraulicAvailabilityValues() {
  return ['all', 'yes', 'no'];
}

function populateFilters() {
  const statusFilter = byId('statusFilter');
  const basisFilter = byId('basisFilter');
  const qaFilter = byId('qaFilter');
  const crossSectionFilter = byId('crossSectionFilter');
  const ratingCurveFilter = byId('ratingCurveFilter');
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
  fillSelect(crossSectionFilter, hydraulicAvailabilityValues(), (value) => nestedText('hydraulicAvailability', value));
  fillSelect(ratingCurveFilter, hydraulicAvailabilityValues(), (value) => nestedText('hydraulicAvailability', value));

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
    crossSection: byId('crossSectionFilter').value,
    ratingCurve: byId('ratingCurveFilter').value,
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
    if (filters.crossSection === 'yes' && !station.has_cross_sections) return false;
    if (filters.crossSection === 'no' && station.has_cross_sections) return false;
    if (filters.ratingCurve === 'yes' && !station.has_rating_curves) return false;
    if (filters.ratingCurve === 'no' && station.has_rating_curves) return false;
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
  state.markersLayer = L.layerGroup();
  if (!state.mapVisibility.stations) {
    state.markerBounds = null;
    return;
  }
  const markers = [];
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

function median(values) {
  if (!values.length) return null;
  const ordered = values.slice().sort((left, right) => left - right);
  const middle = Math.floor(ordered.length / 2);
  if (ordered.length % 2) return ordered[middle];
  return (ordered[middle - 1] + ordered[middle]) / 2;
}

function recordLengthYears(station) {
  if (!station?.first_date || !station?.last_date) return null;
  const start = Date.parse(`${station.first_date}T00:00:00Z`);
  const end = Date.parse(`${station.last_date}T00:00:00Z`);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return null;
  return (end - start) / (86400000 * 365.25);
}

function formatCountShare(count, total, digits = 1) {
  if (!Number.isFinite(count)) return '-';
  if (!Number.isFinite(total) || total <= 0) return formatNumber(count);
  return `${formatNumber(count)} (${formatNumber((count / total) * 100, digits)}%)`;
}

function topCategories(rows, key, limit = 4) {
  const counts = new Map();
  rows.forEach((row) => {
    const value = row?.[key];
    if (!value) return;
    counts.set(value, (counts.get(value) || 0) + 1);
  });
  return Array.from(counts.entries())
    .sort((left, right) => right[1] - left[1] || String(left[0]).localeCompare(String(right[0])))
    .slice(0, limit);
}

function formatTopCategories(rows) {
  if (!rows.length) return '-';
  return rows.map(([label, count]) => `${label} (${formatNumber(count)})`).join(', ');
}

function renderMetricArticles(container, items) {
  if (!container) return;
  container.innerHTML = '';
  items.forEach(([label, value]) => {
    const node = document.createElement('article');
    node.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    container.appendChild(node);
  });
}

function renderDatasetMetrics() {
  const allStations = state.stations || [];
  const totalCount = allStations.length || Number(state.manifest?.published_station_count || 0);
  const hydraulicCount = allStations.filter((station) => station.threshold_basis === 'hydraulic').length;
  const q2FallbackCount = allStations.filter((station) => station.threshold_basis === 'q2_fallback').length;
  const crossSectionCount = allStations.filter((station) => station.has_cross_sections).length;
  const ratingCurveCount = allStations.filter((station) => station.has_rating_curves).length;
  const totalEvents = allStations.reduce((sum, station) => sum + Number(station.n_events || 0), 0);
  const medianYears = median(allStations.map(recordLengthYears).filter((value) => Number.isFinite(value)));
  const medianDrainageArea = median(allStations
    .map((station) => Number(station.drainage_area))
    .filter((value) => Number.isFinite(value) && value > 0));

  renderMetricArticles(byId('datasetMetrics'), [
    [text('statStationsLabel'), formatNumber(state.manifest.published_station_count)],
    [text('statRangeLabel'), `${formatShortDate(state.manifest.supported_date_min)} - ${formatShortDate(state.manifest.supported_date_max)}`],
    [text('statLatestLabel'), formatShortDate(state.manifest.latest_status_date)],
    [text('qaPanelsLabel'), formatNumber(state.manifest.counts.qa_panels_copied)],
  ]);

  renderMetricArticles(byId('sampleMetrics'), [
    [text('fields').hydraulicStations, formatCountShare(hydraulicCount, totalCount)],
    [text('fields').q2FallbackStations, formatCountShare(q2FallbackCount, totalCount)],
    [text('fields').crossSectionStations, formatCountShare(crossSectionCount, totalCount)],
    [text('fields').ratingCurveStations, formatCountShare(ratingCurveCount, totalCount)],
    [text('fields').totalEvents, formatNumber(totalEvents)],
    [text('fields').medianRecordYears, medianYears == null ? '-' : `${formatNumber(medianYears, 1)} ${TEXT[state.lang].units.years}`],
    [text('fields').medianDrainageArea, medianDrainageArea == null ? '-' : `${formatNumber(medianDrainageArea, 0)} km²`],
  ]);

  const counts = statusTotals();
  renderMetricArticles(byId('statusTotals'), Object.entries(counts).map(([key, value]) => [statusLabel(key), formatNumber(value)]));

  const thresholdNarrative = state.lang === 'pt'
    ? `${formatCountShare(hydraulicCount, totalCount)} usam limiar hidráulico observado, enquanto ${formatCountShare(q2FallbackCount, totalCount)} dependem de fallback Q2.`
    : `${formatCountShare(hydraulicCount, totalCount)} use observed hydraulic thresholds, while ${formatCountShare(q2FallbackCount, totalCount)} rely on Q2 fallback.`;
  const evidenceNarrative = state.lang === 'pt'
    ? `${formatCountShare(crossSectionCount, totalCount)} contam com seção transversal observada, ${formatCountShare(ratingCurveCount, totalCount)} têm curva-chave disponível, e ${formatNumber(state.manifest.counts.qa_panels_copied)} painéis QA pré-renderizados acompanham este pacote.`
    : `${formatCountShare(crossSectionCount, totalCount)} include observed cross sections, ${formatCountShare(ratingCurveCount, totalCount)} have rating curves available, and ${formatNumber(state.manifest.counts.qa_panels_copied)} pre-rendered QA panels are bundled in this package.`;
  const geographyNarrative = state.lang === 'pt'
    ? `UFs com mais estações: ${formatTopCategories(topCategories(allStations, 'uf'))}. Biomas mais frequentes: ${formatTopCategories(topCategories(allStations, 'biome'))}.`
    : `States with the most stations: ${formatTopCategories(topCategories(allStations, 'uf'))}. Most common biomes: ${formatTopCategories(topCategories(allStations, 'biome'))}.`;
  const breakdown = byId('datasetBreakdown');
  if (breakdown) {
    breakdown.innerHTML = [
      [TEXT[state.lang].datasetNarratives.thresholdsTitle, thresholdNarrative],
      [TEXT[state.lang].datasetNarratives.evidenceTitle, evidenceNarrative],
      [TEXT[state.lang].datasetNarratives.geographyTitle, geographyNarrative],
    ].map(([title, body]) => `<article><h4>${title}</h4><p>${body}</p></article>`).join('');
  }
}

function addDays(dateString, offset) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + Number(offset));
  return date.toISOString().slice(0, 10);
}

function utcDayNumber(dateString) {
  return Math.round(Date.parse(`${dateString}T00:00:00Z`) / 86400000);
}

function clampDateToSupportedRange(dateString) {
  if (!state.manifest || !dateString) return dateString;
  if (dateString < state.manifest.supported_date_min) return state.manifest.supported_date_min;
  if (dateString > state.manifest.supported_date_max) return state.manifest.supported_date_max;
  return dateString;
}

function scrubberOffsetForDate(dateString) {
  if (!state.manifest || !dateString) return 0;
  return Math.max(0, utcDayNumber(clampDateToSupportedRange(dateString)) - utcDayNumber(state.manifest.supported_date_min));
}

function dateForScrubberOffset(offset) {
  if (!state.manifest) return state.selectedDate;
  const dayNumber = utcDayNumber(state.manifest.supported_date_min) + Number(offset || 0);
  return new Date(dayNumber * 86400000).toISOString().slice(0, 10);
}

function updateDateNavigation() {
  const datePicker = byId('datePicker');
  if (!datePicker) return;
  const minDate = state.manifest?.supported_date_min || '';
  const maxDate = state.manifest?.supported_date_max || '';
  datePicker.min = minDate;
  datePicker.max = maxDate;

  const dateScrubber = byId('dateScrubber');
  if (dateScrubber) {
    if (minDate && maxDate) {
      dateScrubber.min = '0';
      dateScrubber.max = String(Math.max(0, utcDayNumber(maxDate) - utcDayNumber(minDate)));
      dateScrubber.value = String(scrubberOffsetForDate(state.selectedDate || minDate));
      dateScrubber.disabled = false;
    } else {
      dateScrubber.min = '0';
      dateScrubber.max = '0';
      dateScrubber.value = '0';
      dateScrubber.disabled = true;
    }
  }

  const prevButton = byId('prevDateButton');
  const nextButton = byId('nextDateButton');
  if (!prevButton || !nextButton || !state.selectedDate) return;

  prevButton.disabled = Boolean(minDate) && state.selectedDate <= minDate;
  nextButton.disabled = Boolean(maxDate) && state.selectedDate >= maxDate;
}

async function stepSelectedDate(deltaDays) {
  if (state.dateStepBusy || !state.selectedDate) return false;
  const nextDate = clampDateToSupportedRange(addDays(state.selectedDate, deltaDays));
  if (nextDate === state.selectedDate) return false;
  state.dateStepBusy = true;
  try {
    await setSelectedDate(nextDate);
    return true;
  } finally {
    state.dateStepBusy = false;
  }
}

function stopDateStepRepeat() {
  if (state.dateStepHoldTimer) {
    window.clearTimeout(state.dateStepHoldTimer);
    state.dateStepHoldTimer = null;
  }
  if (state.dateStepRepeatTimer) {
    window.clearInterval(state.dateStepRepeatTimer);
    state.dateStepRepeatTimer = null;
  }
}

function bindDateStepButton(button, deltaDays) {
  if (!button) return;

  button.addEventListener('click', async () => {
    if (state.dateStepSuppressClick) {
      state.dateStepSuppressClick = false;
      return;
    }
    await stepSelectedDate(deltaDays);
  });

  button.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || button.disabled) return;
    stopDateStepRepeat();
    state.dateStepHoldTimer = window.setTimeout(async () => {
      state.dateStepHoldTimer = null;
      state.dateStepSuppressClick = true;
      await stepSelectedDate(deltaDays);
      state.dateStepRepeatTimer = window.setInterval(() => {
        stepSelectedDate(deltaDays);
      }, 110);
    }, 260);
  });

  ['pointerup', 'pointerleave', 'pointercancel'].forEach((eventName) => {
    button.addEventListener(eventName, () => {
      stopDateStepRepeat();
      window.setTimeout(() => {
        state.dateStepSuppressClick = false;
      }, 0);
    });
  });
}

function hydrateStationData(raw) {
  if (state.stationCache.has(raw.metadata.station_code)) return state.stationCache.get(raw.metadata.station_code);
  const hydrated = structuredClone(raw);
  const startDate = raw.daily.start_date;
  hydrated.hydraulic = {
    crossSections: (raw.hydraulic?.cross_sections || []).map(([date, id, points]) => ({
      date,
      id,
      points: (points || []).map(([x, y]) => ({ x: Number(x), y: Number(y) })),
    })),
    ratingCurves: (raw.hydraulic?.rating_curves || []).map(([validFrom, validTo, year, curveId, segmentId, stageMin, stageMax, coefficientA, coefficientH0, coefficientN]) => ({
      validFrom,
      validTo,
      year: year == null ? null : Number(year),
      curveId,
      segmentId,
      stageMin: stageMin == null ? null : Number(stageMin),
      stageMax: stageMax == null ? null : Number(stageMax),
      coefficientA: coefficientA == null ? null : Number(coefficientA),
      coefficientH0: coefficientH0 == null ? null : Number(coefficientH0),
      coefficientN: coefficientN == null ? null : Number(coefficientN),
      key: curveKey(curveId, segmentId),
    })),
  };
  hydrated.dailyRows = raw.daily.rows.map(([offset, observed, statusChar, basisChar]) => ({
    offset: Number(offset),
    date: addDays(startDate, Number(offset)),
    observed_value: observed,
    status: statusKeyFromChar(statusChar),
    basis: basisKeyFromChar(basisChar),
  }));
  hydrated.dailyMap = new Map(hydrated.dailyRows.map((row) => [row.date, row]));
  hydrated.intervalsHydrated = raw.intervals.map(([startOffset, endOffset, valueType, alert, flood, severe, thresholdSource, crossSectionDate, crossSectionId, flags, ratingCurveId, ratingCurveSegmentId]) => {
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
      ratingCurveId,
      ratingCurveSegmentId,
      curveKey: curveKey(ratingCurveId, ratingCurveSegmentId),
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
  const latestCurve = valueType === 'stage_cm' ? latestRatingCurve(stationData) : null;
  const labels = rows.map((row) => row.date);
  const values = rows.map((row) => row.observed_value);
  const derivedDischarge = latestCurve
    ? rows.map((row) => {
      if (!isFiniteNumber(row.observed_value)) return null;
      const stage = Number(row.observed_value);
      const withinCurveBounds = (
        !isFiniteNumber(latestCurve.stageMin)
        || !isFiniteNumber(latestCurve.stageMax)
        || (stage >= Number(latestCurve.stageMin) && stage <= Number(latestCurve.stageMax))
      );
      if (!withinCurveBounds) return null;
      return ratingDischarge(stage, latestCurve.coefficientA, latestCurve.coefficientH0, latestCurve.coefficientN);
    })
    : [];
  const hasDerivedDischarge = derivedDischarge.some((value) => isFiniteNumber(value));
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
        ...(latestCurve && hasDerivedDischarge ? [{
          label: state.lang === 'pt'
            ? `Vazão estimada pela curva-chave mais recente (${formatShortDate(latestCurve.validTo || latestCurve.validFrom)})`
            : `Estimated discharge from the latest rating curve (${formatShortDate(latestCurve.validTo || latestCurve.validFrom)})`,
          data: derivedDischarge,
          yAxisID: 'yDischarge',
          borderColor: '#2E8B8B',
          backgroundColor: 'rgba(46, 139, 139, 0.1)',
          pointRadius: 0,
          borderWidth: 1.8,
          borderDash: [8, 4],
          tension: 0.08,
          spanGaps: true,
        }] : []),
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
        ...(latestCurve && hasDerivedDischarge ? {
          yDischarge: {
            position: 'right',
            ticks: { color: '#2E8B8B' },
            grid: { drawOnChartArea: false },
            title: {
              display: true,
              text: state.lang === 'pt' ? 'Vazão estimada (m³/s)' : 'Estimated discharge (m³/s)',
              color: '#2E8B8B',
            },
          },
        } : {}),
      },
    },
  });
  byId('timeseriesSubtitle').textContent = `${thresholdTypeLabel(valueType)} · ${seriesRangeLabel(state.currentRange)}`;
}

function renderCrossSectionChart(stationData) {
  const emptyNode = byId('crossSectionEmpty');
  const canvas = byId('crossSectionChart');
  const sections = (stationData.hydraulic?.crossSections || []).slice().sort((left, right) => {
    const leftKey = left.date || '';
    const rightKey = right.date || '';
    return leftKey.localeCompare(rightKey);
  });
  if (!sections.length) {
    destroyChart('crossSectionChart');
    canvas.hidden = true;
    emptyNode.hidden = false;
    return;
  }

  const band = crossSectionBand(stationData);
  const oldestSection = sections[0];
  const latestSection = sections[sections.length - 1];
  const subtitle = byId('crossSectionSubtitle');
  if (subtitle) {
    subtitle.textContent = sections.length === 1
      ? (state.lang === 'pt'
        ? `Seção observada em ${formatShortDate(latestSection?.date)} com faixa de incerteza do limiar hidráulico.`
        : `Observed cross section from ${formatShortDate(latestSection?.date)} with the hydraulic-threshold uncertainty band.`)
      : (state.lang === 'pt'
        ? `${sections.length} seções observadas. Destaques: mais antiga em ${formatShortDate(oldestSection?.date)} e mais recente em ${formatShortDate(latestSection?.date)}.`
        : `${sections.length} observed cross sections. Highlights: oldest from ${formatShortDate(oldestSection?.date)} and latest from ${formatShortDate(latestSection?.date)}.`);
  }
  canvas.hidden = false;
  emptyNode.hidden = true;
  destroyChart('crossSectionChart');
  state.charts.crossSectionChart = new Chart(canvas, {
    type: 'line',
    data: {
      datasets: sections.map((section, index) => {
        const isOldest = index === 0;
        const isLatest = index === sections.length - 1;
        const grayValue = Math.round(190 - (index / Math.max(sections.length - 1, 1)) * 95);
        return {
          label: sections.length === 1
            ? (state.lang === 'pt' ? `Seção observada · ${formatShortDate(section.date)}` : `Observed section · ${formatShortDate(section.date)}`)
            : (isLatest
              ? (state.lang === 'pt' ? `Seção mais recente · ${formatShortDate(section.date)}` : `Latest section · ${formatShortDate(section.date)}`)
              : (isOldest
                ? (state.lang === 'pt' ? `Seção mais antiga · ${formatShortDate(section.date)}` : `Oldest section · ${formatShortDate(section.date)}`)
                : (section.date ? section.date.slice(0, 4) : `S${index + 1}`))),
          data: section.points,
          parsing: false,
          showLine: true,
          pointRadius: 0,
          tension: 0,
          borderColor: isLatest ? '#D04B45' : (isOldest ? '#2E8B8B' : `rgb(${grayValue}, ${grayValue}, ${grayValue})`),
          borderWidth: isLatest ? 3 : (isOldest ? 2.4 : 1.5),
          borderCapStyle: 'round',
          order: isLatest ? 99 : index,
          showInLegend: sections.length === 1 || isLatest || isOldest,
        };
      }),
    },
    options: {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'nearest' },
      plugins: {
        thresholdBand: {
          enabled: !!band,
          low: band?.low,
          median: band?.median,
          high: band?.high,
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 12,
            boxHeight: 12,
            color: '#42545c',
            filter(item, data) {
              return data.datasets[item.datasetIndex]?.showInLegend !== false;
            },
          },
        },
      },
      scales: {
        x: {
          type: 'linear',
          ticks: { color: '#5b6a71' },
          grid: { color: 'rgba(0,0,0,0.05)' },
          title: {
            display: true,
            text: state.lang === 'pt' ? 'Distância da seção (m)' : 'Cross-section distance (m)',
            color: '#42545c',
          },
        },
        y: {
          ticks: { color: '#5b6a71' },
          grid: { color: 'rgba(0,0,0,0.06)' },
          title: {
            display: true,
            text: state.lang === 'pt' ? 'Cota/elevação (cm)' : 'Stage/elevation (cm)',
            color: '#42545c',
          },
        },
      },
    },
  });
}

function renderDynamicDailyChart(stationData) {
  const emptyNode = byId('dynamicDailyEmpty');
  const canvas = byId('dynamicDailyChart');
  const rows = stationData.dailyRows || [];
  if (!rows.length) {
    destroyChart('dynamicDailyChart');
    canvas.hidden = true;
    emptyNode.hidden = false;
    return;
  }

  const valueType = stationData.summary.threshold_value_type;
  const labels = rows.map((row) => row.date);
  const values = rows.map((row) => row.observed_value);
  const flood = rows.map((row) => {
    const interval = findIntervalForDate(stationData, row.date);
    const normalized = normalizeThresholdTriplet(
      interval ? interval.alert : null,
      interval ? interval.flood : stationData.summary.threshold_value,
      interval ? interval.severe : null,
    );
    return normalized.flood;
  });
  const peaks = normalizedEventRows(stationData)
    .map((event) => ({
      x: event.peak_date,
      y: valueType === 'stage_cm' ? event.peak_stage_cm : event.peak_discharge_m3s,
    }))
    .filter((event) => event.x && isFiniteNumber(event.y));

  canvas.hidden = false;
  emptyNode.hidden = true;
  destroyChart('dynamicDailyChart');
  state.charts.dynamicDailyChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: thresholdTypeLabel(valueType),
          data: values,
          borderColor: '#5c5c5c',
          pointRadius: 0,
          borderWidth: 1,
          tension: 0,
        },
        {
          label: text('fields').flood,
          data: flood,
          borderColor: '#111111',
          borderWidth: 1.6,
          stepped: true,
          pointRadius: 0,
          spanGaps: true,
        },
        {
          label: state.lang === 'pt' ? 'Picos reconstruídos' : 'Reconstructed peaks',
          type: 'scatter',
          data: peaks,
          pointRadius: 2.2,
          pointHoverRadius: 3.2,
          pointBackgroundColor: '#9b1d20',
          pointBorderWidth: 0,
        },
      ],
    },
    options: {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 12, boxHeight: 12, color: '#42545c' },
        },
      },
      scales: {
        x: {
          ticks: { color: '#5b6a71', maxTicksLimit: 7 },
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
}

function renderRatingCurveChart(stationData) {
  const emptyNode = byId('ratingCurveEmpty');
  const canvas = byId('ratingCurveChart');
  const curves = stationData.hydraulic?.ratingCurves || [];
  if (!curves.length) {
    destroyChart('ratingCurveChart');
    canvas.hidden = true;
    emptyNode.hidden = false;
    return;
  }

  const years = [...new Set(curves.map((curve) => curve.year).filter((year) => year != null))].sort((a, b) => a - b);
  const colorByYear = new Map(years.map((year, index) => [year, CURVE_COLORS[index % CURVE_COLORS.length]]));
  const curveByKey = new Map(curves.map((curve) => [curve.key, curve]));
  const orderedSections = (stationData.hydraulic?.crossSections || []).slice().sort((left, right) => (left.date || '').localeCompare(right.date || ''));
  const oldestSectionDate = orderedSections[0]?.date || null;
  const latestSectionDate = orderedSections[orderedSections.length - 1]?.date || null;
  const datasets = curves.map((curve) => {
    const span = Number(curve.stageMax) - Number(curve.stageMin);
    const step = span > 0 ? span / 120 : 1;
    const points = [];
    for (let stage = Number(curve.stageMin); stage <= Number(curve.stageMax); stage += step) {
      const discharge = ratingDischarge(stage, curve.coefficientA, curve.coefficientH0, curve.coefficientN);
      if (isFiniteNumber(discharge) && Number(discharge) > 0) {
        points.push({ x: Number(discharge), y: Number(stage) });
      }
    }
    if (!points.length) return null;
    return {
      label: curve.validFrom ? curve.validFrom.slice(0, 4) : String(curve.year || ''),
      data: points,
      parsing: false,
      showLine: true,
      pointRadius: 0,
      tension: 0,
      borderWidth: 1.4,
      borderColor: colorByYear.get(curve.year) || '#5e2b83',
    };
  }).filter(Boolean);

  const thresholdPoints = stationData.intervalsHydrated
    .map((interval) => {
      const curve = curveByKey.get(interval.curveKey);
      if (!curve) return null;
      let discharge = null;
      let stage = null;
      if (interval.valueType === 'stage_cm' && isFiniteNumber(interval.flood)) {
        stage = Number(interval.flood);
        discharge = ratingDischarge(stage, curve.coefficientA, curve.coefficientH0, curve.coefficientN);
      } else if (interval.valueType === 'discharge_m3s' && isFiniteNumber(interval.flood)) {
        discharge = Number(interval.flood);
        stage = ratingStageFromDischarge(discharge, curve.coefficientA, curve.coefficientH0, curve.coefficientN);
      }
      if (!isFiniteNumber(discharge) || !isFiniteNumber(stage) || Number(discharge) <= 0) return null;
      return {
        x: Number(discharge),
        y: Number(stage),
        color: colorByYear.get(curve.year) || '#5e2b83',
        crossSectionDate: interval.crossSectionDate || null,
      };
    })
    .filter(Boolean);

  const oldestThresholdPoints = thresholdPoints.filter((point) => oldestSectionDate && point.crossSectionDate === oldestSectionDate);
  const latestThresholdPoints = thresholdPoints.filter((point) => latestSectionDate && point.crossSectionDate === latestSectionDate && latestSectionDate !== oldestSectionDate);
  const otherThresholdPoints = (!oldestSectionDate && !latestSectionDate)
    ? thresholdPoints
    : thresholdPoints.filter((point) => point.crossSectionDate !== oldestSectionDate && point.crossSectionDate !== latestSectionDate);

  const stageValues = datasets.flatMap((dataset) => dataset.data.map((point) => point.y));
  const q2 = isFiniteNumber(stationData.summary.q2_m3s) ? Number(stationData.summary.q2_m3s) : null;
  if (q2 && stageValues.length) {
    datasets.push({
      label: 'Q2',
      data: [
        { x: q2, y: Math.min(...stageValues) },
        { x: q2, y: Math.max(...stageValues) },
      ],
      parsing: false,
      showLine: true,
      pointRadius: 0,
      borderWidth: 1.3,
      borderDash: [7, 4],
      borderColor: '#202020',
    });
  }
  if (otherThresholdPoints.length) {
    datasets.push({
      label: state.lang === 'pt' ? 'Outros pontos de limiar dinâmico' : 'Other dynamic threshold points',
      type: 'scatter',
      data: otherThresholdPoints.map((point) => ({ x: point.x, y: point.y })),
      pointRadius: 2.8,
      pointHoverRadius: 4.1,
      pointBackgroundColor: otherThresholdPoints.map((point) => point.color),
      pointBorderColor: '#ffffff',
      pointBorderWidth: 0.8,
    });
  }
  if (oldestThresholdPoints.length) {
    datasets.push({
      label: state.lang === 'pt'
        ? `Limiar na seção mais antiga · ${formatShortDate(oldestSectionDate)}`
        : `Threshold at oldest section · ${formatShortDate(oldestSectionDate)}`,
      type: 'scatter',
      data: oldestThresholdPoints.map((point) => ({ x: point.x, y: point.y })),
      pointRadius: 4.1,
      pointHoverRadius: 4.8,
      pointBackgroundColor: '#2E8B8B',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 1,
    });
  }
  if (latestThresholdPoints.length) {
    datasets.push({
      label: state.lang === 'pt'
        ? `Limiar na seção mais recente · ${formatShortDate(latestSectionDate)}`
        : `Threshold at latest section · ${formatShortDate(latestSectionDate)}`,
      type: 'scatter',
      data: latestThresholdPoints.map((point) => ({ x: point.x, y: point.y })),
      pointRadius: 4.4,
      pointHoverRadius: 5.2,
      pointBackgroundColor: '#D04B45',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 1,
    });
  }
  if (!datasets.length) {
    destroyChart('ratingCurveChart');
    canvas.hidden = true;
    emptyNode.hidden = false;
    return;
  }

  const subtitle = byId('ratingCurveSubtitle');
  if (subtitle && oldestSectionDate && latestSectionDate && oldestSectionDate !== latestSectionDate) {
    subtitle.textContent = state.lang === 'pt'
      ? `Curvas válidas ao longo do tempo e pontos de limiar por intervalo dinâmico. Seções de referência: ${formatShortDate(oldestSectionDate)} e ${formatShortDate(latestSectionDate)}.`
      : `Valid curves through time and interval-level threshold points. Reference sections: ${formatShortDate(oldestSectionDate)} and ${formatShortDate(latestSectionDate)}.`;
  } else if (subtitle) {
    subtitle.textContent = text('ratingCurveSubtitle');
  }

  canvas.hidden = false;
  emptyNode.hidden = true;
  destroyChart('ratingCurveChart');
  state.charts.ratingCurveChart = new Chart(canvas, {
    type: 'line',
    data: { datasets },
    options: {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'nearest' },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 12, boxHeight: 12, color: '#42545c' },
        },
      },
      scales: {
        x: {
          type: 'logarithmic',
          ticks: { color: '#5b6a71' },
          grid: { color: 'rgba(0,0,0,0.05)' },
          title: {
            display: true,
            text: state.lang === 'pt' ? 'Vazão (m³/s)' : 'Discharge (m³/s)',
            color: '#42545c',
          },
        },
        y: {
          ticks: { color: '#5b6a71' },
          grid: { color: 'rgba(0,0,0,0.06)' },
          title: {
            display: true,
            text: state.lang === 'pt' ? 'Cota (cm)' : 'Stage (cm)',
            color: '#42545c',
          },
        },
      },
    },
  });
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
  const events = normalizedEventRows(stationData);
  if (!events.length) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="5">-</td>';
    body.appendChild(tr);
    return;
  }
  events.forEach((event) => {
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
  const shell = byId('qaImageShell');
  const caption = byId('qaImageCaption');
  const fallback = byId('qaImageFallback');
  const openButton = byId('openQaImageButton');
  const subpanelsNode = byId('qaSubpanels');
  const subpanelList = byId('qaSubpanelList');
  const setQaFallback = () => {
    if (shell) shell.hidden = true;
    img.hidden = true;
    caption.hidden = true;
    if (openButton) openButton.hidden = true;
    fallback.textContent = '';
    fallback.hidden = true;
    byId('imageOverlayImg').removeAttribute('src');
    byId('imageOverlayCaption').textContent = '';
    subpanelList.innerHTML = '';
    subpanelsNode.hidden = true;
  };
  if (stationData.qa.panel_png) {
    img.onerror = () => setQaFallback();
    img.onload = () => {
      if (shell) shell.hidden = false;
      img.hidden = false;
      caption.hidden = false;
      if (openButton) openButton.hidden = false;
      fallback.hidden = true;
    };
    img.src = stationData.qa.panel_png;
    if (shell) shell.hidden = false;
    caption.textContent = text('qaFigureCaption');
    fallback.textContent = '';
    fallback.hidden = true;
    byId('imageOverlayImg').src = stationData.qa.panel_png;
    byId('imageOverlayCaption').textContent = text('qaFigureCaption');
    subpanelList.innerHTML = QA_PANEL_PARTS.map((panel) => `
      <article class="qa-subpanel-card">
        <h5>${qaPanelPartLabel(panel.key)}</h5>
        <div class="qa-subpanel-frame ${panel.className}">
          <img src="${stationData.qa.panel_png}" alt="${qaPanelPartLabel(panel.key)}" loading="lazy" />
        </div>
      </article>
    `).join('');
    subpanelsNode.hidden = false;
  } else {
    setQaFallback();
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
  byId('crossSectionChart').hidden = true;
  byId('crossSectionEmpty').hidden = true;
  destroyChart('crossSectionChart');
  byId('dynamicDailyChart').hidden = true;
  byId('dynamicDailyEmpty').hidden = true;
  destroyChart('dynamicDailyChart');
  byId('ratingCurveChart').hidden = true;
  byId('ratingCurveEmpty').hidden = true;
  destroyChart('ratingCurveChart');
  byId('evidenceSummary').textContent = '-';
  byId('evidenceChart').hidden = true;
  byId('evidenceEmpty').hidden = true;
  destroyChart('evidenceChart');
  byId('seasonalitySummary').textContent = '-';
  byId('seasonalityChart').hidden = true;
  byId('seasonalityEmpty').hidden = true;
  destroyChart('seasonalityChart');
  byId('qaImageShell').hidden = true;
  byId('qaImage').hidden = true;
  byId('qaImageCaption').hidden = true;
  byId('openQaImageButton').hidden = true;
  byId('qaImageFallback').textContent = '';
  byId('qaImageFallback').hidden = true;
  byId('qaSubpanels').hidden = true;
  byId('qaSubpanelList').innerHTML = '';
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
  renderCrossSectionChart(data);
  renderDynamicDailyChart(data);
  renderRatingCurveChart(data);
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
  if (state.dateScrubberTimer) {
    window.clearTimeout(state.dateScrubberTimer);
    state.dateScrubberTimer = null;
  }
  state.selectedDate = clampDateToSupportedRange(dateString);
  byId('datePicker').value = dateString;
  updateDateNavigation();
  byId('datePicker').value = state.selectedDate;
  await loadMonth(state.selectedDate);
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
  downloadBlob(new Blob([buildCsv(rows)], { type: 'text/csv;charset=utf-8' }), `limiar_filtered_${state.selectedDate}.csv`);
  showToast(TEXT[state.lang].toasts.csvReady);
}

function normalizeCsvValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number' && !Number.isFinite(value)) return '';
  return value;
}

function buildCsv(rows) {
  return rows
    .map((row) => row.map((value) => `"${String(normalizeCsvValue(value)).replaceAll('"', '""')}"`).join(','))
    .join('\n');
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let c = index;
    for (let bit = 0; bit < 8; bit += 1) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[index] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xFFFFFFFF;
  for (let index = 0; index < bytes.length; index += 1) {
    crc = CRC32_TABLE[(crc ^ bytes[index]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function pushUint16(target, value) {
  target.push(value & 0xFF, (value >>> 8) & 0xFF);
}

function pushUint32(target, value) {
  target.push(value & 0xFF, (value >>> 8) & 0xFF, (value >>> 16) & 0xFF, (value >>> 24) & 0xFF);
}

function zipDosDateTime(date = new Date()) {
  const year = Math.max(1980, date.getFullYear());
  const dosTime = ((date.getHours() & 0x1F) << 11) | ((date.getMinutes() & 0x3F) << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = (((year - 1980) & 0x7F) << 9) | (((date.getMonth() + 1) & 0x0F) << 5) | (date.getDate() & 0x1F);
  return { dosDate, dosTime };
}

function buildZipBlob(entries) {
  const encoder = new TextEncoder();
  const locals = [];
  const centrals = [];
  const { dosDate, dosTime } = zipDosDateTime(new Date());
  let offset = 0;

  entries.forEach((entry) => {
    const nameBytes = encoder.encode(entry.name);
    const dataBytes = encoder.encode(entry.text);
    const checksum = crc32(dataBytes);
    const localHeader = [];
    pushUint32(localHeader, 0x04034B50);
    pushUint16(localHeader, 20);
    pushUint16(localHeader, 0);
    pushUint16(localHeader, 0);
    pushUint16(localHeader, dosTime);
    pushUint16(localHeader, dosDate);
    pushUint32(localHeader, checksum);
    pushUint32(localHeader, dataBytes.length);
    pushUint32(localHeader, dataBytes.length);
    pushUint16(localHeader, nameBytes.length);
    pushUint16(localHeader, 0);

    const localBytes = new Uint8Array(localHeader.length + nameBytes.length + dataBytes.length);
    localBytes.set(localHeader, 0);
    localBytes.set(nameBytes, localHeader.length);
    localBytes.set(dataBytes, localHeader.length + nameBytes.length);
    locals.push(localBytes);

    const centralHeader = [];
    pushUint32(centralHeader, 0x02014B50);
    pushUint16(centralHeader, 20);
    pushUint16(centralHeader, 20);
    pushUint16(centralHeader, 0);
    pushUint16(centralHeader, 0);
    pushUint16(centralHeader, dosTime);
    pushUint16(centralHeader, dosDate);
    pushUint32(centralHeader, checksum);
    pushUint32(centralHeader, dataBytes.length);
    pushUint32(centralHeader, dataBytes.length);
    pushUint16(centralHeader, nameBytes.length);
    pushUint16(centralHeader, 0);
    pushUint16(centralHeader, 0);
    pushUint16(centralHeader, 0);
    pushUint16(centralHeader, 0);
    pushUint32(centralHeader, 0);
    pushUint32(centralHeader, offset);

    const centralBytes = new Uint8Array(centralHeader.length + nameBytes.length);
    centralBytes.set(centralHeader, 0);
    centralBytes.set(nameBytes, centralHeader.length);
    centrals.push(centralBytes);
    offset += localBytes.length;
  });

  const centralSize = centrals.reduce((sum, bytes) => sum + bytes.length, 0);
  const centralOffset = offset;
  const eocd = [];
  pushUint32(eocd, 0x06054B50);
  pushUint16(eocd, 0);
  pushUint16(eocd, 0);
  pushUint16(eocd, entries.length);
  pushUint16(eocd, entries.length);
  pushUint32(eocd, centralSize);
  pushUint32(eocd, centralOffset);
  pushUint16(eocd, 0);

  return new Blob([...locals, ...centrals, new Uint8Array(eocd)], { type: 'application/zip' });
}

function crossSectionRoleLabel(stationData, date) {
  const sections = stationData.hydraulic?.crossSections || [];
  if (!sections.length || !date) return '';
  const ordered = sections.slice().sort((left, right) => (left.date || '').localeCompare(right.date || ''));
  const oldest = ordered[0]?.date;
  const latest = ordered[ordered.length - 1]?.date;
  if (date === oldest && date === latest) return 'only_section';
  if (date === oldest) return 'oldest_section';
  if (date === latest) return 'latest_section';
  return 'intermediate_section';
}

function stationMetadataCsvRows(stationData) {
  const details = buildDayDetails(stationData, state.selectedDate);
  const basisKey = resolvedBasisKey(details.basis, stationData.summary.threshold_basis);
  return [
    ['field', 'value'],
    ['selected_date', state.selectedDate],
    ['selected_date_status', details.status],
    ['selected_date_status_label', statusLabel(details.status)],
    ['selected_date_basis', basisKey],
    ['selected_date_basis_label', basisLabel(basisKey)],
    ['station_code', stationData.metadata.station_code],
    ['station_name', stationData.metadata.station_name],
    ['uf', stationData.metadata.uf],
    ['municipality', stationData.metadata.municipality],
    ['basin_name', stationData.metadata.basin_name],
    ['biome', stationData.metadata.biome],
    ['threshold_value_type', stationData.summary.threshold_value_type],
    ['threshold_basis', stationData.summary.threshold_basis],
    ['threshold_source', stationData.summary.threshold_source],
    ['threshold_value', stationData.summary.threshold_value],
    ['q2_m3s', stationData.summary.q2_m3s],
    ['q2_valid_years', stationData.summary.q2_valid_years],
    ['threshold_empirical_percentile', stationData.summary.threshold_empirical_percentile],
    ['threshold_exceedance_fraction', stationData.summary.threshold_exceedance_fraction],
    ['event_frequency_per_year', stationData.summary.event_frequency_per_year],
    ['n_events', stationData.summary.n_events],
    ['max_event_duration_days', stationData.summary.max_event_duration_days],
    ['mean_event_duration_days', stationData.summary.mean_event_duration_days],
    ['std_event_duration_days', stationData.summary.std_event_duration_days],
    ['uncertainty_class', stationData.summary.uncertainty_class],
    ['qa_review_class', stationData.summary.qa_review_class],
  ];
}

function dailySeriesCsvRows(stationData) {
  const latestCurve = stationData.summary.threshold_value_type === 'stage_cm' ? latestRatingCurve(stationData) : null;
  const rows = [[
    'date',
    'observed_value',
    'observed_unit',
    'status_code',
    'status_label',
    'basis_code',
    'basis_label',
    'alert_threshold',
    'flood_threshold',
    'severe_threshold',
    'threshold_source',
    'interval_start',
    'interval_end',
    'estimated_discharge_latest_curve_m3s',
  ]];
  stationData.dailyRows.forEach((row) => {
    const interval = findIntervalForDate(stationData, row.date);
    const normalized = normalizeThresholdTriplet(
      interval ? interval.alert : null,
      interval ? interval.flood : stationData.summary.threshold_value,
      interval ? interval.severe : null,
    );
    const estimatedDischarge = latestCurve && isFiniteNumber(row.observed_value)
      ? ratingDischarge(row.observed_value, latestCurve.coefficientA, latestCurve.coefficientH0, latestCurve.coefficientN)
      : null;
    rows.push([
      row.date,
      row.observed_value,
      TEXT[state.lang].units[stationData.summary.threshold_value_type],
      row.status,
      statusLabel(row.status),
      row.basis,
      basisLabel(resolvedBasisKey(row.basis, stationData.summary.threshold_basis)),
      normalized.alert,
      normalized.flood,
      normalized.severe,
      interval?.thresholdSource || '',
      interval?.startDate || '',
      interval?.endDate || '',
      estimatedDischarge,
    ]);
  });
  return rows;
}

function thresholdIntervalsCsvRows(stationData) {
  const rows = [[
    'interval_start',
    'interval_end',
    'value_type',
    'alert_threshold',
    'flood_threshold',
    'severe_threshold',
    'threshold_source',
    'cross_section_date',
    'cross_section_id',
    'cross_section_role',
    'rating_curve_id',
    'rating_curve_segment_id',
    'flags',
  ]];
  stationData.intervalsHydrated.forEach((interval) => {
    rows.push([
      interval.startDate,
      interval.endDate,
      interval.valueType,
      interval.alert,
      interval.flood,
      interval.severe,
      interval.thresholdSource,
      interval.crossSectionDate,
      interval.crossSectionId,
      crossSectionRoleLabel(stationData, interval.crossSectionDate),
      interval.ratingCurveId,
      interval.ratingCurveSegmentId,
      Array.isArray(interval.flags) ? interval.flags.join(';') : interval.flags,
    ]);
  });
  return rows;
}

function crossSectionsCsvRows(stationData) {
  const band = crossSectionBand(stationData);
  const sections = (stationData.hydraulic?.crossSections || []).slice().sort((left, right) => (left.date || '').localeCompare(right.date || ''));
  const rows = [[
    'section_date',
    'section_id',
    'section_role',
    'point_index',
    'distance_m',
    'elevation_cm',
    'threshold_band_p10_cm',
    'threshold_band_p50_cm',
    'threshold_band_p90_cm',
  ]];
  sections.forEach((section) => {
    section.points.forEach((point, index) => {
      rows.push([
        section.date,
        section.id,
        crossSectionRoleLabel(stationData, section.date),
        index,
        point.x,
        point.y,
        band?.low,
        band?.median,
        band?.high,
      ]);
    });
  });
  return rows;
}

function ratingCurveLinesCsvRows(stationData) {
  const rows = [[
    'curve_year',
    'valid_from',
    'valid_to',
    'curve_id',
    'segment_id',
    'curve_role',
    'stage_cm',
    'discharge_m3s',
  ]];
  const curves = (stationData.hydraulic?.ratingCurves || []).slice().sort((left, right) => (left.validFrom || '').localeCompare(right.validFrom || ''));
  const oldestCurveKey = curves[0]?.key;
  const latestCurveKey = curves[curves.length - 1]?.key;
  curves.forEach((curve) => {
    const span = Number(curve.stageMax) - Number(curve.stageMin);
    const step = span > 0 ? span / 120 : 1;
    for (let stage = Number(curve.stageMin); stage <= Number(curve.stageMax); stage += step) {
      const discharge = ratingDischarge(stage, curve.coefficientA, curve.coefficientH0, curve.coefficientN);
      if (!isFiniteNumber(discharge) || Number(discharge) <= 0) continue;
      rows.push([
        curve.year,
        curve.validFrom,
        curve.validTo,
        curve.curveId,
        curve.segmentId,
        curve.key === oldestCurveKey && curve.key === latestCurveKey ? 'only_curve' : (curve.key === oldestCurveKey ? 'oldest_curve' : (curve.key === latestCurveKey ? 'latest_curve' : 'intermediate_curve')),
        stage,
        discharge,
      ]);
    }
  });
  return rows;
}

function ratingCurveThresholdPointsCsvRows(stationData) {
  const curveByKey = new Map((stationData.hydraulic?.ratingCurves || []).map((curve) => [curve.key, curve]));
  const rows = [[
    'interval_start',
    'interval_end',
    'cross_section_date',
    'cross_section_role',
    'curve_year',
    'curve_id',
    'segment_id',
    'threshold_value_type',
    'threshold_stage_cm',
    'threshold_discharge_m3s',
  ]];
  stationData.intervalsHydrated.forEach((interval) => {
    const curve = curveByKey.get(interval.curveKey);
    if (!curve) return;
    let thresholdDischarge = null;
    let thresholdStage = null;
    if (interval.valueType === 'stage_cm' && isFiniteNumber(interval.flood)) {
      thresholdStage = Number(interval.flood);
      thresholdDischarge = ratingDischarge(thresholdStage, curve.coefficientA, curve.coefficientH0, curve.coefficientN);
    } else if (interval.valueType === 'discharge_m3s' && isFiniteNumber(interval.flood)) {
      thresholdDischarge = Number(interval.flood);
      thresholdStage = ratingStageFromDischarge(thresholdDischarge, curve.coefficientA, curve.coefficientH0, curve.coefficientN);
    }
    if (!isFiniteNumber(thresholdDischarge) || !isFiniteNumber(thresholdStage) || Number(thresholdDischarge) <= 0) return;
    rows.push([
      interval.startDate,
      interval.endDate,
      interval.crossSectionDate,
      crossSectionRoleLabel(stationData, interval.crossSectionDate),
      curve.year,
      curve.curveId,
      curve.segmentId,
      interval.valueType,
      thresholdStage,
      thresholdDischarge,
    ]);
  });
  return rows;
}

function annualEvidenceCsvRows(stationData) {
  const context = buildEvidenceContext(stationData);
  const maximaByYear = new Map(annualMaximaByYear(stationData).map((entry) => [entry.year, entry]));
  const rows = [[
    'year',
    'annual_maximum_date',
    'annual_maximum_value',
    'alert_threshold',
    'flood_threshold',
    'severe_threshold',
    'q2_m3s',
    'has_cross_section_update',
  ]];
  if (!context) return rows;
  context.years.forEach((year, index) => {
    const maximum = maximaByYear.get(year);
    rows.push([
      year,
      maximum?.date || '',
      maximum?.value,
      context.alert[index],
      context.flood[index],
      context.severe[index],
      context.q2[index],
      context.crossSections[index] != null,
    ]);
  });
  return rows;
}

function eventsCsvRows(stationData) {
  const rows = [['event_start', 'peak_date', 'duration_days', 'peak_stage_cm', 'peak_discharge_m3s', 'event_class']];
  normalizedEventRows(stationData).forEach((event) => {
    rows.push([
      event.event_start,
      event.peak_date,
      event.duration_days,
      event.peak_stage_cm,
      event.peak_discharge_m3s,
      event.display_class,
    ]);
  });
  return rows;
}

function seasonalityCsvRows(stationData) {
  const seasonality = computeSeasonality(stationData);
  const rows = [['month_index', 'month_label', 'event_start_count', 'event_peak_count']];
  for (let index = 0; index < 12; index += 1) {
    rows.push([index + 1, MONTH_LABELS[state.lang][index], seasonality.startCounts[index], seasonality.peakCounts[index]]);
  }
  return rows;
}

function buildStationCsvEntries(stationData) {
  const stationCode = stationData.metadata.station_code;
  const selectedDateSlug = state.selectedDate || 'date';
  const readme = state.lang === 'pt'
    ? [
      'Pacote CSV da estação LIMIAR',
      '',
      'Arquivos incluídos:',
      '- metadata_summary.csv: metadados e resumo da estação na data selecionada.',
      '- daily_timeseries.csv: série diária com status, limiares e vazão estimada pela curva-chave mais recente.',
      '- threshold_intervals.csv: intervalos dinâmicos de limiar usados na reconstrução.',
      '- cross_sections.csv: pontos de cada seção transversal plotada.',
      '- rating_curve_lines.csv: pontos das curvas-chave plotadas no gráfico.',
      '- rating_curve_threshold_points.csv: pontos dinâmicos de limiar no espaço vazão-cota.',
      '- annual_maxima_thresholds.csv: base do gráfico de máximos anuais e limiares.',
      '- events_reconstructed.csv: todos os eventos reconstruídos da estação.',
      '- seasonality.csv: contagem mensal dos inícios e picos dos eventos.',
    ].join('\n')
    : [
      'LIMIAR station CSV package',
      '',
      'Included files:',
      '- metadata_summary.csv: station metadata and selected-day summary.',
      '- daily_timeseries.csv: daily series with status, thresholds, and discharge estimated from the latest rating curve.',
      '- threshold_intervals.csv: dynamic threshold intervals used in the reconstruction.',
      '- cross_sections.csv: points for each plotted cross section.',
      '- rating_curve_lines.csv: points for the rating-curve chart.',
      '- rating_curve_threshold_points.csv: dynamic threshold points in discharge-stage space.',
      '- annual_maxima_thresholds.csv: data behind the annual-maxima and threshold chart.',
      '- events_reconstructed.csv: all reconstructed events for the station.',
      '- seasonality.csv: monthly counts of event starts and peaks.',
    ].join('\n');
  return [
    { name: `limiar_station_${stationCode}_${selectedDateSlug}/README.txt`, text: readme },
    { name: `limiar_station_${stationCode}_${selectedDateSlug}/metadata_summary.csv`, text: buildCsv(stationMetadataCsvRows(stationData)) },
    { name: `limiar_station_${stationCode}_${selectedDateSlug}/daily_timeseries.csv`, text: buildCsv(dailySeriesCsvRows(stationData)) },
    { name: `limiar_station_${stationCode}_${selectedDateSlug}/threshold_intervals.csv`, text: buildCsv(thresholdIntervalsCsvRows(stationData)) },
    { name: `limiar_station_${stationCode}_${selectedDateSlug}/cross_sections.csv`, text: buildCsv(crossSectionsCsvRows(stationData)) },
    { name: `limiar_station_${stationCode}_${selectedDateSlug}/rating_curve_lines.csv`, text: buildCsv(ratingCurveLinesCsvRows(stationData)) },
    { name: `limiar_station_${stationCode}_${selectedDateSlug}/rating_curve_threshold_points.csv`, text: buildCsv(ratingCurveThresholdPointsCsvRows(stationData)) },
    { name: `limiar_station_${stationCode}_${selectedDateSlug}/annual_maxima_thresholds.csv`, text: buildCsv(annualEvidenceCsvRows(stationData)) },
    { name: `limiar_station_${stationCode}_${selectedDateSlug}/events_reconstructed.csv`, text: buildCsv(eventsCsvRows(stationData)) },
    { name: `limiar_station_${stationCode}_${selectedDateSlug}/seasonality.csv`, text: buildCsv(seasonalityCsvRows(stationData)) },
  ];
}

function exportStationDataPackage() {
  if (!state.selectedData) return;
  const entries = buildStationCsvEntries(state.selectedData);
  downloadBlob(buildZipBlob(entries), `limiar_station_${state.selectedData.metadata.station_code}_${state.selectedDate}.zip`);
  showToast(TEXT[state.lang].toasts.stationDataReady);
}

function dynamicDailyCsvRows(stationData) {
  const peakDates = new Set(normalizedEventRows(stationData).map((event) => event.peak_date).filter(Boolean));
  const rows = [[
    'date',
    'observed_value',
    'observed_unit',
    'dynamic_flood_threshold',
    'status_code',
    'status_label',
    'is_reconstructed_peak',
  ]];
  stationData.dailyRows.forEach((row) => {
    const interval = findIntervalForDate(stationData, row.date);
    const normalized = normalizeThresholdTriplet(
      interval ? interval.alert : null,
      interval ? interval.flood : stationData.summary.threshold_value,
      interval ? interval.severe : null,
    );
    rows.push([
      row.date,
      row.observed_value,
      TEXT[state.lang].units[stationData.summary.threshold_value_type],
      normalized.flood,
      row.status,
      statusLabel(row.status),
      peakDates.has(row.date),
    ]);
  });
  return rows;
}

function ratingCurveChartCsvRows(stationData) {
  const rows = [[
    'row_type',
    'curve_year',
    'valid_from',
    'valid_to',
    'curve_id',
    'segment_id',
    'curve_role',
    'cross_section_date',
    'cross_section_role',
    'stage_cm',
    'discharge_m3s',
  ]];
  ratingCurveLinesCsvRows(stationData).slice(1).forEach((row) => {
    rows.push(['curve_line', row[0], row[1], row[2], row[3], row[4], row[5], '', '', row[6], row[7]]);
  });
  ratingCurveThresholdPointsCsvRows(stationData).slice(1).forEach((row) => {
    rows.push(['threshold_point', row[4], '', '', row[5], row[6], '', row[2], row[3], row[8], row[9]]);
  });
  return rows;
}

const STATION_CSV_EXPORTS = {
  exportTimeseriesCsvButton: { slug: 'timeseries', rows: dailySeriesCsvRows },
  exportCrossSectionCsvButton: { slug: 'cross_sections', rows: crossSectionsCsvRows },
  exportDynamicDailyCsvButton: { slug: 'dynamic_daily', rows: dynamicDailyCsvRows },
  exportRatingCurveCsvButton: { slug: 'rating_curve', rows: ratingCurveChartCsvRows },
  exportEvidenceCsvButton: { slug: 'annual_evidence', rows: annualEvidenceCsvRows },
  exportSeasonalityCsvButton: { slug: 'seasonality', rows: seasonalityCsvRows },
  exportEventsCsvButton: { slug: 'events', rows: eventsCsvRows },
};

function exportStationCsv(kind) {
  if (!state.selectedData) return;
  const config = STATION_CSV_EXPORTS[kind];
  if (!config) return;
  const filename = `limiar_station_${state.selectedData.metadata.station_code}_${state.selectedDate}_${config.slug}.csv`;
  downloadBlob(
    new Blob([buildCsv(config.rows(state.selectedData))], { type: 'text/csv;charset=utf-8' }),
    filename,
  );
  showToast(TEXT[state.lang].toasts.csvReady);
}

async function dataUrlToUint8Array(dataUrl) {
  const base64 = dataUrl.split(',')[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load image: ${src}`));
    image.src = src;
  });
}

async function cropImageRectToBytes(image, x, y, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.drawImage(image, x, y, width, height, 0, 0, width, height);
  return dataUrlToUint8Array(canvas.toDataURL('image/png', 1));
}

async function buildQaPanelPartImages(src) {
  const image = await loadImageElement(src);
  const halfWidth = Math.floor(image.naturalWidth / 2);
  const halfHeight = Math.floor(image.naturalHeight / 2);
  return Promise.all(QA_PANEL_PARTS.map(async (panel) => ({
    ...panel,
    title: qaPanelPartLabel(panel.key),
    bytes: await cropImageRectToBytes(
      image,
      panel.col * halfWidth,
      panel.row * halfHeight,
      halfWidth,
      halfHeight,
    ),
  })));
}

const REPORT_THEME = {
  accent: '1F5E7A',
  text: '24323A',
  muted: '5B6A71',
  soft: 'F3EFE6',
  softAccent: 'E7F0F3',
  border: 'D2C4AF',
};

function reportRun(text, options = {}) {
  const docx = window.docx;
  return new docx.TextRun({
    text: text == null ? '' : String(text),
    bold: Boolean(options.bold),
    italics: Boolean(options.italics),
    color: options.color || REPORT_THEME.text,
    size: options.size || 26,
    font: options.font || 'Aptos',
  });
}

function reportParagraph(text, options = {}) {
  const docx = window.docx;
  return new docx.Paragraph({
    alignment: options.alignment,
    pageBreakBefore: options.pageBreakBefore,
    spacing: {
      before: options.before || 0,
      after: options.after ?? 140,
      line: options.line || 340,
    },
    children: Array.isArray(options.children) && options.children.length
      ? options.children
      : [reportRun(text, options)],
  });
}

function reportCell(text, options = {}) {
  const docx = window.docx;
  return new docx.TableCell({
    shading: options.fill ? { fill: options.fill } : undefined,
    margins: {
      top: 90,
      bottom: 90,
      left: 110,
      right: 110,
    },
    children: [
      reportParagraph(text, {
        size: options.size || 26,
        bold: options.bold,
        color: options.color || REPORT_THEME.text,
        after: 0,
        line: 300,
      }),
    ],
  });
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
    renderCrossSectionChart(state.selectedData);
    renderDynamicDailyChart(state.selectedData);
    renderRatingCurveChart(state.selectedData);
    renderEvidenceChart(state.selectedData);
    renderSeasonality(state.selectedData);
    const chartBytes = await safeChartToBytes('timeseriesChart', 2800, 1500);
    const crossSectionBytes = await safeChartToBytes('crossSectionChart', 2600, 1500);
    const dynamicDailyBytes = await safeChartToBytes('dynamicDailyChart', 2800, 1500);
    const ratingCurveBytes = await safeChartToBytes('ratingCurveChart', 2600, 1500);
    const evidenceBytes = await safeChartToBytes('evidenceChart', 2700, 1460);
    const seasonalityBytes = await safeChartToBytes('seasonalityChart', 2600, 1300);
    const qaPanelParts = await safeBuildQaPanelPartImages(state.selectedData.qa.panel_png);
    const details = buildDayDetails(state.selectedData, state.selectedDate);
    const basisKey = resolvedBasisKey(details.basis, state.selectedData.summary.threshold_basis);
    const latestCurve = latestRatingCurve(state.selectedData);
    const docEvents = normalizedEventRows(state.selectedData);
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
      [text('fields').percentile, formatPercent(state.selectedData.summary.threshold_empirical_percentile, 2)],
      [text('fields').exceedance, formatPercent(state.selectedData.summary.threshold_exceedance_fraction, 2)],
      [text('fields').eventCount, formatNumber(state.selectedData.summary.n_events, 0)],
      [text('fields').eventFrequency, formatNumber(state.selectedData.summary.event_frequency_per_year, 2)],
      [text('fields').maxDuration, formatDuration(state.selectedData.summary.max_event_duration_days)],
    ];

    const summaryRows = [];
    for (let index = 0; index < summaryPairs.length; index += 2) {
      const left = summaryPairs[index];
      const right = summaryPairs[index + 1];
      summaryRows.push(new docx.TableRow({
        children: [
          reportCell(left?.[0] || '', { fill: REPORT_THEME.softAccent, bold: true, color: REPORT_THEME.accent }),
          reportCell(left?.[1] || ''),
          reportCell(right?.[0] || '', { fill: REPORT_THEME.softAccent, bold: true, color: REPORT_THEME.accent }),
          reportCell(right?.[1] || ''),
        ],
      }));
    }
    const summaryTable = new docx.Table({ rows: summaryRows });

    const eventsTableRows = [
      new docx.TableRow({
        children: [text('thStartDate'), text('thPeakDate'), text('thDuration'), text('thPeak'), text('thClass')].map((cell) => reportCell(cell, {
          fill: REPORT_THEME.softAccent,
          bold: true,
          color: REPORT_THEME.accent,
        })),
      }),
      ...(docEvents.length
        ? docEvents.map((event) => new docx.TableRow({
          children: [
            reportCell(formatShortDate(event.event_start)),
            reportCell(formatShortDate(event.peak_date)),
            reportCell(formatDuration(event.duration_days)),
            reportCell(
              event.peak_stage_cm != null
                ? formatValue(event.peak_stage_cm, 'stage_cm')
                : formatValue(event.peak_discharge_m3s, 'discharge_m3s'),
            ),
            reportCell(event.display_class),
          ],
        }))
        : [new docx.TableRow({
          children: Array.from({ length: 5 }, (_, index) => reportCell(index === 0 ? '-' : '')),
        })]),
    ];

    const figureParagraph = (bytes, width, height) => new docx.Paragraph({
      alignment: docx.AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new docx.ImageRun({
          data: bytes,
          transformation: { width, height },
        }),
      ],
    });

    const figureCaption = (captionText) => reportParagraph(captionText, {
      size: 26,
      italics: true,
      color: REPORT_THEME.muted,
      after: 220,
    });

    const timeseriesCaption = latestCurve && state.selectedData.summary.threshold_value_type === 'stage_cm'
      ? `${TEXT[state.lang].report.chartCaption} ${state.lang === 'pt' ? 'O eixo direito mostra a vazão estimada com a curva-chave mais recente.' : 'The right axis shows discharge estimated from the latest rating curve.'}`
      : TEXT[state.lang].report.chartCaption;

    const doc = new docx.Document({
      sections: [
        {
          properties: {
            page: {
              margin: { top: 720, right: 720, bottom: 720, left: 720 },
            },
          },
          children: [
            reportParagraph(TEXT[state.lang].report.title, {
              size: 40,
              bold: true,
              color: REPORT_THEME.accent,
              after: 80,
            }),
            reportParagraph(`${state.selectedData.metadata.station_name} · ${state.selectedData.metadata.station_code}`, {
              size: 30,
              bold: true,
              after: 50,
            }),
            reportParagraph(`${formatDate(state.selectedDate)} · ${statusLabel(details.status)} · ${basisLabel(basisKey)}`, {
              size: 24,
              color: REPORT_THEME.muted,
              after: 220,
            }),
            reportParagraph(TEXT[state.lang].report.summarySection, {
              size: 30,
              bold: true,
              color: REPORT_THEME.accent,
              after: 100,
            }),
            summaryTable,
            reportParagraph(TEXT[state.lang].report.methodSection, {
              size: 30,
              bold: true,
              color: REPORT_THEME.accent,
              before: 180,
              after: 80,
            }),
            new docx.Table({
              rows: [
                new docx.TableRow({
                  children: [
                    reportCell(TEXT[state.lang].report.methodText, {
                      fill: REPORT_THEME.soft,
                      size: 26,
                    }),
                  ],
                }),
              ],
            }),
            reportParagraph(TEXT[state.lang].report.chartSection, {
              size: 30,
              bold: true,
              color: REPORT_THEME.accent,
              pageBreakBefore: true,
              after: 90,
            }),
            ...(chartBytes ? [
              figureParagraph(chartBytes, 660, 354),
              figureCaption(timeseriesCaption),
            ] : []),
            ...(crossSectionBytes ? [
              reportParagraph(TEXT[state.lang].report.crossSectionSection, {
                size: 28,
                bold: true,
                color: REPORT_THEME.accent,
                after: 70,
              }),
              figureParagraph(crossSectionBytes, 660, 381),
              figureCaption(TEXT[state.lang].report.crossSectionCaption),
            ] : []),
            ...(dynamicDailyBytes ? [
              reportParagraph(TEXT[state.lang].report.dynamicDailySection, {
                size: 28,
                bold: true,
                color: REPORT_THEME.accent,
                after: 70,
              }),
              figureParagraph(dynamicDailyBytes, 660, 354),
              figureCaption(TEXT[state.lang].report.dynamicDailyCaption),
            ] : []),
            ...(ratingCurveBytes ? [
              reportParagraph(TEXT[state.lang].report.ratingCurveSection, {
                size: 28,
                bold: true,
                color: REPORT_THEME.accent,
                after: 70,
              }),
              figureParagraph(ratingCurveBytes, 660, 381),
              figureCaption(TEXT[state.lang].report.ratingCurveCaption),
            ] : []),
            ...(evidenceBytes ? [
              reportParagraph(TEXT[state.lang].report.evidenceSection, {
                size: 28,
                bold: true,
                color: REPORT_THEME.accent,
                after: 70,
              }),
              figureParagraph(evidenceBytes, 660, 357),
              figureCaption(TEXT[state.lang].report.evidenceCaption),
            ] : []),
            ...(seasonalityBytes ? [
              reportParagraph(TEXT[state.lang].report.seasonalitySection, {
                size: 28,
                bold: true,
                color: REPORT_THEME.accent,
                after: 70,
              }),
              figureParagraph(seasonalityBytes, 660, 330),
              figureCaption(TEXT[state.lang].report.seasonalityCaption),
            ] : []),
            reportParagraph(TEXT[state.lang].report.qaSection, {
              size: 30,
              bold: true,
              color: REPORT_THEME.accent,
              pageBreakBefore: true,
              after: 80,
            }),
            reportParagraph(qaFlagsText, {
              size: 24,
              color: REPORT_THEME.muted,
              after: 120,
            }),
            ...(qaPanelParts.length ? [
              figureCaption(TEXT[state.lang].report.qaCaption),
              reportParagraph(TEXT[state.lang].report.qaSubpanelsSection, {
                size: 26,
                bold: true,
                color: REPORT_THEME.accent,
                after: 70,
              }),
              ...qaPanelParts.flatMap((panel) => [
                reportParagraph(panel.title, {
                  size: 26,
                  bold: true,
                  color: REPORT_THEME.text,
                  after: 60,
                }),
                figureParagraph(panel.bytes, 640, 422),
              ]),
            ] : []),
            reportParagraph(TEXT[state.lang].report.eventsSection, {
              size: 30,
              bold: true,
              color: REPORT_THEME.accent,
              pageBreakBefore: true,
              after: 80,
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
  ['stationSearch', 'statusFilter', 'basisFilter', 'qaFilter', 'crossSectionFilter', 'ratingCurveFilter', 'ufFilter', 'basinFilter', 'biomeFilter'].forEach((id) => {
    byId(id).addEventListener('input', applyFilters);
    byId(id).addEventListener('change', applyFilters);
  });
  byId('datePicker').addEventListener('change', async (event) => {
    if (event.target.value) await setSelectedDate(event.target.value);
  });
  const dateScrubber = byId('dateScrubber');
  if (dateScrubber) {
    dateScrubber.addEventListener('input', (event) => {
      const scrubberDate = dateForScrubberOffset(event.target.value);
      byId('datePicker').value = scrubberDate;
      if (state.dateScrubberTimer) window.clearTimeout(state.dateScrubberTimer);
      state.dateScrubberTimer = window.setTimeout(async () => {
        state.dateScrubberTimer = null;
        if (scrubberDate !== state.selectedDate) await setSelectedDate(scrubberDate);
      }, 140);
    });
    dateScrubber.addEventListener('change', async (event) => {
      const scrubberDate = dateForScrubberOffset(event.target.value);
      if (state.dateScrubberTimer) {
        window.clearTimeout(state.dateScrubberTimer);
        state.dateScrubberTimer = null;
      }
      if (scrubberDate !== state.selectedDate) await setSelectedDate(scrubberDate);
    });
  }
  const prevDateButton = byId('prevDateButton');
  const nextDateButton = byId('nextDateButton');
  bindDateStepButton(prevDateButton, -1);
  bindDateStepButton(nextDateButton, 1);
  byId('theoryButton').addEventListener('click', () => openOverlay('theoryOverlay'));
  byId('layersButton').addEventListener('click', () => {
    renderLayersModal();
    openOverlay('layersOverlay');
  });
  byId('fitMapButton').addEventListener('click', fitMapToFiltered);
  byId('exportCsvButton').addEventListener('click', exportFilteredCsv);
  byId('shareButton').addEventListener('click', async () => {
    await navigator.clipboard.writeText(window.location.href);
    showToast(TEXT[state.lang].toasts.copied);
  });
  byId('exportStationDataButton').addEventListener('click', exportStationDataPackage);
  Object.keys(STATION_CSV_EXPORTS).forEach((id) => {
    const button = byId(id);
    if (button) button.addEventListener('click', () => exportStationCsv(id));
  });
  byId('exportReportButton').addEventListener('click', exportStationReport);
  byId('openQaImageButton').addEventListener('click', () => {
    if (!byId('qaImage').hidden) openOverlay('imageOverlay');
  });
  byId('closeTheoryButton').addEventListener('click', () => closeOverlay('theoryOverlay'));
  byId('closeLayersButton').addEventListener('click', () => closeOverlay('layersOverlay'));
  byId('closeImageButton').addEventListener('click', () => closeOverlay('imageOverlay'));
  document.querySelectorAll('[data-overlay-close]').forEach((button) => {
    button.addEventListener('click', () => closeOverlay(button.dataset.overlayClose));
  });
  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeOverlay('theoryOverlay');
    closeOverlay('layersOverlay');
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
        renderCrossSectionChart(state.selectedData);
        renderDynamicDailyChart(state.selectedData);
        renderRatingCurveChart(state.selectedData);
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
  ensureDateNavigator();
  applyStaticTranslations();
  updateLanguageButtons();
  renderLegend();
  applyMapVisibility();
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
  updateDateNavigation();
  renderGlobalStats();

  const urlState = parseUrlState();
  if (urlState.lang && TEXT[urlState.lang]) {
    state.lang = urlState.lang;
    applyStaticTranslations();
    updateLanguageButtons();
  }
  populateFilters();
  byId('qaFilter').value = 'screening_ok';

  const preferredDefaultDate = '2020-01-01';
  const defaultDate = (
    state.manifest.supported_date_min <= preferredDefaultDate
    && preferredDefaultDate <= state.manifest.supported_date_max
  )
    ? preferredDefaultDate
    : (state.manifest.latest_status_date || state.manifest.supported_date_max);
  const firstDate = urlState.date || defaultDate;
  await setSelectedDate(firstDate, false);

  const defaultStation = state.stationByCode.has(DEFAULT_STATION_CODE)
    ? DEFAULT_STATION_CODE
    : (state.filteredStations[0]?.station_code || state.stations[0]?.station_code);
  const initialStation = urlState.station || defaultStation;
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
