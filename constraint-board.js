(function () {
  'use strict';

  const STORE = window.AnalysisStore || { getAll: () => [] };
  const CATEGORY_ORDER = ['팀', '조작', '환경'];
  const CATALOG = (Array.isArray(window.CONSTRAINT_CATALOG) ? window.CONSTRAINT_CATALOG : []).filter((item) => CATEGORY_ORDER.includes(item?.category));
  const CURRENT_KEY = 'endfield.constraintBoard.current.v1';
  const VERSION_KEY = 'endfield.constraintBoard.versions.v1';
  const CATEGORY_CLASS = { 팀: 'team', 조작: 'control', 환경: 'env' };
  const BOARD_GRID_COLUMNS = 8;
  const analyses = STORE.getAll();

  const board = document.getElementById('constraint-board');
  const relationLayer = document.getElementById('relation-layer');
  const tray = document.getElementById('marker-tray');
  const placementList = document.getElementById('placement-marker-list');
  const placementDrawer = document.getElementById('placement-drawer');
  const placementDrawerButton = document.getElementById('open-placement-modal');
  const trayViewToggle = document.getElementById('toggle-tray-view');
  const selectionStatus = document.getElementById('marker-selection-status');
  const scoreSelectionTotal = document.getElementById('score-selection-total');
  const scoreSelectionValue = document.getElementById('score-selection-value');
  const conflictToggle = document.getElementById('toggle-conflict-lines');
  const synergyToggle = document.getElementById('toggle-synergy-lines');
  const secondPhaseToggle = document.getElementById('toggle-second-phase');
  const secondPhaseToggleLabel = document.getElementById('second-phase-toggle-label');
  const tooltip = document.getElementById('marker-tooltip');
  const relationMenu = document.getElementById('relation-menu');
  const toast = document.getElementById('toast');
  const backdrop = document.getElementById('modal-backdrop');
  const autosaveStatus = document.getElementById('autosave-status');
  const boardDropHint = document.getElementById('board-drop-hint');
  const boardFilterCount = document.getElementById('board-filter-count');
  const tierZones = [...document.querySelectorAll('.tier-dropzone')];

  let state = loadCurrentState();
  let versions = loadVersions();
  let saveTimer = null;
  let toastTimer = null;
  let interaction = null;
  let aim = null;
  let activeRelationId = null;
  let activeGroupId = null;
  let compareSelection = [];
  let recommendationCategory = 'all';
  let recommendationQuery = '';
  const selectedMarkerIds = new Set();
  const scoreSelectedMarkerIds = new Set();
  let pendingScoreSelectionTimer = null;
  let pendingScoreSelectionId = null;
  let boardCategoryFilter = 'all';
  let boardScoreFilter = 'all';

  function esc(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function rich(value) {
    return esc(value)
      .replace(/\[([^\]\n]+)\]/g, '<strong class="numeric-token">[$1]</strong>')
      .replace(/\n/g, '<br>');
  }

  function uid(prefix) {
    if (window.crypto?.randomUUID) return `${prefix}-${window.crypto.randomUUID()}`;
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function safeParse(value, fallback) {
    try { return JSON.parse(value); } catch (_) { return fallback; }
  }

  function blankState() {
    return {
      schemaVersion: 1,
      projectId: uid('constraint-project'),
      markers: [],
      relations: [],
      groups: [],
      relationVisibility: { conflict: true, synergy: true },
      secondPhaseIncluded: true,
      trayViewAll: false,
      updatedAt: new Date().toISOString()
    };
  }

  function normalizeState(input) {
    const source = input && typeof input === 'object' ? input : blankState();
    const markers = Array.isArray(source.markers) ? source.markers
      .filter((item) => !item?.category || CATEGORY_ORDER.includes(item.category))
      .map((item, index) => ({
      id: String(item.id || uid('constraint')),
      category: CATEGORY_ORDER.includes(item.category) ? item.category : '팀',
      label: String(item.label || item.title || '새 제약').slice(0, 18),
      title: String(item.title || item.label || '새 제약').slice(0, 48),
      description: String(item.description || ''),
      tier: [1, 2, 3].includes(Number(item.tier)) ? Number(item.tier) : null,
      x: clamp(Number(item.x) || .5, .04, .96),
      y: clamp(Number(item.y) || .5, .08, .92),
      gridCol: Number.isFinite(Number(item.gridCol)) ? clamp(Math.round(Number(item.gridCol)), 0, BOARD_GRID_COLUMNS - 1) : null,
      gridRow: [1, 2, 3].includes(Number(item.tier)) ? 0 : null,
      layoutOrder: Number.isFinite(Number(item.layoutOrder)) ? Number(item.layoutOrder) : index,
      sourceConstraintId: item.sourceConstraintId ? String(item.sourceConstraintId) : null,
      isSecondPhase: item.isSecondPhase === true || Number(item.updatePhase) === 2,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || item.createdAt || new Date().toISOString()
    })) : [];
    const ids = new Set(markers.map((item) => item.id));
    const relations = Array.isArray(source.relations) ? source.relations.filter((item) => ids.has(item.a) && ids.has(item.b) && item.a !== item.b && ['conflict', 'synergy'].includes(item.type)).map((item) => ({
      id: String(item.id || uid('relation')),
      a: String(item.a), b: String(item.b), type: item.type,
      createdAt: item.createdAt || new Date().toISOString()
    })) : [];
    const groups = Array.isArray(source.groups) ? source.groups.map((item) => ({
      id: String(item?.id || uid('group')),
      type: item?.type === 'gatekeeper' ? 'gatekeeper' : 'normal',
      markerIds: [...new Set((Array.isArray(item?.markerIds) ? item.markerIds : []).map(String).filter((id) => ids.has(id)))],
      createdAt: item?.createdAt || new Date().toISOString()
    })).filter((item) => item.markerIds.length >= 2) : [];
    return {
      schemaVersion: 1,
      projectId: String(source.projectId || uid('constraint-project')),
      markers,
      relations,
      groups,
      relationVisibility: {
        conflict: source.relationVisibility?.conflict !== false,
        synergy: source.relationVisibility?.synergy !== false
      },
      secondPhaseIncluded: source.secondPhaseIncluded !== false,
      trayViewAll: source.trayViewAll === true,
      updatedAt: source.updatedAt || new Date().toISOString()
    };
  }

  function loadCurrentState() {
    try {
      const raw = localStorage.getItem(CURRENT_KEY);
      return normalizeState(raw ? safeParse(raw, null) : null);
    } catch (_) {
      return blankState();
    }
  }

  function loadVersions() {
    try {
      const raw = localStorage.getItem(VERSION_KEY);
      const parsed = raw ? safeParse(raw, []) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(Boolean).map((item) => ({
        id: String(item.id || uid('version')),
        name: String(item.name || '이름 없는 버전'),
        memo: String(item.memo || ''),
        createdAt: item.createdAt || new Date().toISOString(),
        snapshot: normalizeState(item.snapshot)
      })).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    } catch (_) {
      return [];
    }
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function setAutosave(mode, text) {
    autosaveStatus.className = `autosave-status ${mode || ''}`.trim();
    autosaveStatus.querySelector('span').textContent = text;
  }

  function scheduleSave() {
    state.updatedAt = new Date().toISOString();
    setAutosave('saving', '저장 중…');
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(CURRENT_KEY, JSON.stringify(state));
        setAutosave('saved', '자동 저장 완료');
      } catch (_) {
        setAutosave('failed', '자동 저장 실패');
      }
    }, 220);
  }

  function saveVersions() {
    try {
      localStorage.setItem(VERSION_KEY, JSON.stringify(versions));
      return true;
    } catch (_) {
      showToast('버전 저장에 실패했습니다. 브라우저 저장 공간을 확인해 주세요.');
      return false;
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 2600);
  }

  function markerBadgeHtml(marker) {
    return `<div class="marker-badge-row">${marker.isSecondPhase ? '<span class="marker-phase-badge">2차</span>' : ''}<span class="marker-category">${esc(marker.category)}</span></div>`;
  }

  function markerHtml(marker, location) {
    const isBoard = location === 'board';
    const className = isBoard ? 'board-marker' : `tray-marker ${location === 'drawer' ? 'drawer-marker' : ''}`.trim();
    const style = isBoard ? `left:${marker.x * 100}%;top:${marker.y * 100}%` : '';
    const selectedClass = selectedMarkerIds.has(marker.id) ? ' is-selected' : '';
    const scoreSelectedClass = isBoard && scoreSelectedMarkerIds.has(marker.id) ? ' is-score-selected' : '';
    const secondPhaseClass = marker.isSecondPhase ? ' is-second-phase' : '';
    const excludedClass = marker.isSecondPhase && state.secondPhaseIncluded === false ? ' is-second-phase-excluded' : '';
    const placementBadge = !isBoard && marker.tier != null ? `<span class="marker-placement-badge">${marker.tier}점</span>` : '';
    return `<article class="${className}${selectedClass}${scoreSelectedClass}${secondPhaseClass}${excludedClass}" data-marker-id="${esc(marker.id)}" data-marker-location="${esc(location)}" data-category="${esc(marker.category)}" data-second-phase="${marker.isSecondPhase}" style="${style}" tabindex="0" aria-selected="${selectedMarkerIds.has(marker.id)}" data-score-selected="${isBoard && scoreSelectedMarkerIds.has(marker.id)}" aria-label="${marker.isSecondPhase ? '2차 ' : ''}${esc(marker.category)} 제약 ${esc(marker.title)}">
      ${markerBadgeHtml(marker)}
      ${placementBadge}
      <button type="button" class="marker-edit-trigger" data-edit-marker="${esc(marker.id)}" aria-label="${esc(marker.title)} 수정">✎</button>
      <div class="marker-label">${rich(marker.label)}</div>
    </article>`;
  }

  function trayGroupHtml(category, markers, showAll = false) {
    const emptyText = showAll ? '생성된 제약 없음' : '미배치 제약 없음';
    return `<section class="tray-category" data-category="${esc(category)}">
      <header><div><span>${esc(category)}</span><small>${CATEGORY_CLASS[category].toUpperCase()}</small></div><em>${markers.length}</em></header>
      <div class="tray-category-grid ${markers.length ? '' : 'empty'}">${markers.length ? markers.map((marker) => markerHtml(marker, 'tray')).join('') : `<p>${emptyText}</p>`}</div>
    </section>`;
  }

  function markerMatchesBoardFilter(marker) {
    if (!marker || marker.tier == null) return false;
    const categoryMatches = boardCategoryFilter === 'all' || marker.category === boardCategoryFilter;
    const scoreMatches = boardScoreFilter === 'all' || marker.tier === Number(boardScoreFilter);
    const phaseMatches = state.secondPhaseIncluded !== false || !marker.isSecondPhase;
    return categoryMatches && scoreMatches && phaseMatches;
  }

  function applyBoardFilters() {
    let matchingCount = 0;
    let totalCount = 0;
    tierZones.forEach((zone) => {
      const row = zone.closest('.score-row');
      row?.classList.remove('is-score-filtered-out');
      sortedTierMarkers(Number(zone.dataset.tier)).forEach((marker) => {
        const element = zone.querySelector(`[data-marker-id="${CSS.escape(marker.id)}"]`);
        if (!element) return;
        const matches = markerMatchesBoardFilter(marker);
        totalCount += 1;
        if (matches) matchingCount += 1;
        element.classList.remove('is-board-filtered-out');
        element.classList.toggle('is-board-filter-dimmed', !matches);
        element.setAttribute('aria-hidden', 'false');
        element.setAttribute('data-board-filter-match', String(matches));
      });
    });
    if (boardFilterCount) boardFilterCount.textContent = `일치 ${matchingCount}개 · 전체 ${totalCount}개`;
  }

  function syncBoardFilterButtons() {
    document.querySelectorAll('[data-board-category-filter]').forEach((button) => {
      const active = button.dataset.boardCategoryFilter === boardCategoryFilter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-board-score-filter]').forEach((button) => {
      const active = button.dataset.boardScoreFilter === boardScoreFilter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function syncBoardControlAlignment() {
    const card = document.querySelector('.board-card');
    const categoryGroup = document.querySelector('.board-filter-group:not(.board-score-filter-group)');
    const scoreGroup = document.querySelector('.board-score-filter-group');
    if (!card || !categoryGroup || !scoreGroup) return;

    // Keep the selected-score card exactly as wide as the score filter control.
    card.style.setProperty('--board-filter-score-width', `${Math.ceil(scoreGroup.getBoundingClientRect().width)}px`);

    if (window.innerWidth <= 1100) {
      card.style.removeProperty('--board-filter-category-width');
      return;
    }
    card.style.setProperty('--board-filter-category-width', `${Math.ceil(categoryGroup.getBoundingClientRect().width)}px`);
  }

  function syncManagementPanelAlignment() {
    const description = document.getElementById('marker-description');
    const categories = [...tray.querySelectorAll('.tray-category')];
    if (!description || !categories.length) return;
    if (window.innerWidth <= 900) {
      tray.style.removeProperty('--synced-tray-card-height');
      return;
    }
    const descriptionRect = description.getBoundingClientRect();
    const categoryRect = categories[0].getBoundingClientRect();
    const targetHeight = descriptionRect.bottom - categoryRect.top;
    if (targetHeight > 220) tray.style.setProperty('--synced-tray-card-height', `${targetHeight}px`);
  }

  function setupCollapsiblePanels() {
    document.querySelectorAll('[data-collapse-panel]').forEach((button) => {
      button.addEventListener('click', () => {
        const content = document.getElementById(button.dataset.collapsePanel);
        if (!content) return;
        const willExpand = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(willExpand));
        const label = button.dataset.collapseLabel ? `${button.dataset.collapseLabel} ` : '';
        button.querySelector('span').textContent = `${label}${willExpand ? '접기' : '펼치기'}`;
        content.hidden = !willExpand;
        button.closest('.collapsible-work-panel')?.classList.toggle('is-collapsed', !willExpand);
      });
    });
  }

  function renderMarkers() {
    reflowAllTiers();
    tierZones.forEach((zone) => {
      const tier = Number(zone.dataset.tier);
      zone.innerHTML = sortedTierMarkers(tier).map((marker) => markerHtml(marker, 'board')).join('');
    });
    applyBoardFilters();
    const unplaced = state.markers.filter((marker) => marker.tier == null);
    const trayMarkers = state.trayViewAll ? state.markers : unplaced;
    tray.innerHTML = CATEGORY_ORDER.map((category) => trayGroupHtml(category, trayMarkers.filter((marker) => marker.category === category), state.trayViewAll)).join('');
    tray.classList.toggle('empty', trayMarkers.length === 0);
    document.getElementById('tray-count').textContent = state.trayViewAll ? `전체 ${trayMarkers.length}개` : `미배치 ${unplaced.length}개`;
    document.getElementById('marker-tray-title').textContent = state.trayViewAll ? '전체 제약 보관함' : '미배치 제약 보관함';
    document.getElementById('marker-tray-description').textContent = state.trayViewAll
      ? '현황판 배치 여부와 관계없이 생성된 모든 제약을 카테고리별로 보여줍니다. 점수 표시는 현재 배치 구역입니다.'
      : '좌측에서 만든 미배치 제약이 카테고리별로 정리됩니다. 전체 제약 보기로 배치 여부와 관계없이 모두 확인할 수 있습니다.';
    trayViewToggle.textContent = state.trayViewAll ? '미배치만 보기' : '전체 제약 보기';
    trayViewToggle.setAttribute('aria-pressed', String(state.trayViewAll));
    trayViewToggle.classList.toggle('active', state.trayViewAll);
    renderPlacementList();
    bindMarkerEvents();
    updateSelectionUi();
    updateScoreSelectionUi();
    requestAnimationFrame(() => {
      syncBoardControlAlignment();
      syncManagementPanelAlignment();
      renderRelations();
    });
  }

  function bindMarkerEvents() {
    document.querySelectorAll('[data-marker-id]').forEach((element) => {
      element.addEventListener('pointerdown', onMarkerPointerDown);
      element.addEventListener('click', onMarkerClick);
      element.addEventListener('dblclick', onMarkerDoubleClick);
      element.addEventListener('pointerenter', showMarkerTooltip);
      element.addEventListener('pointermove', moveTooltip);
      element.addEventListener('pointerleave', hideTooltip);
      element.addEventListener('keydown', (event) => {
        if (event.shiftKey && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          event.stopPropagation();
          toggleMarkerSelection(element.dataset.markerId);
          return;
        }
        if (selectedMarkerIds.size >= 2 && event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          createMarkerGroup('normal');
          return;
        }
        if (selectedMarkerIds.size >= 2 && event.key === 'ArrowUp') {
          event.preventDefault();
          event.stopPropagation();
          createMarkerGroup('gatekeeper');
          return;
        }
        if (selectedMarkerIds.size >= 1 && event.key === 'ArrowDown') {
          event.preventDefault();
          event.stopPropagation();
          toggleSecondPhaseSelection();
          return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openMarkerEdit(element.dataset.markerId);
        }
      });
    });
    document.querySelectorAll('[data-edit-marker]').forEach((button) => button.addEventListener('click', (event) => {
      event.stopPropagation();
      openMarkerEdit(button.dataset.editMarker);
    }));
  }

  function updateSelectionUi() {
    document.querySelectorAll('[data-marker-id]').forEach((element) => {
      const selected = selectedMarkerIds.has(element.dataset.markerId);
      element.classList.toggle('is-selected', selected);
      element.setAttribute('aria-selected', String(selected));
    });
    const count = selectedMarkerIds.size;
    selectionStatus.textContent = count ? `${count}개 선택됨` : '선택 없음';
    selectionStatus.classList.toggle('active', count > 0);
  }

  function toggleMarkerSelection(id) {
    const marker = getMarker(id);
    if (!marker) return;
    if (selectedMarkerIds.has(marker.id)) selectedMarkerIds.delete(marker.id);
    else selectedMarkerIds.add(marker.id);
    updateSelectionUi();
    showToast(selectedMarkerIds.size ? `${selectedMarkerIds.size}개 제약을 선택했습니다. 선택된 마크를 드래그하면 함께 이동합니다.` : '다중 선택을 해제했습니다.');
  }

  function clearMarkerSelection() {
    selectedMarkerIds.clear();
    updateSelectionUi();
  }


  function groupSignature(markerIds) {
    return [...new Set(markerIds.map(String))].sort().join('|');
  }

  function cleanupGroups() {
    const ids = new Set(state.markers.map((marker) => marker.id));
    state.groups = (Array.isArray(state.groups) ? state.groups : []).map((group) => ({
      ...group,
      markerIds: [...new Set((group.markerIds || []).map(String).filter((id) => ids.has(id)))]
    })).filter((group) => group.markerIds.length >= 2);
  }

  function selectedPlacedMarkers() {
    return orderedMarkers([...selectedMarkerIds]).filter((marker) => marker.tier != null);
  }

  function createMarkerGroup(type) {
    const selected = selectedPlacedMarkers();
    if (selectedMarkerIds.size < 2 || selected.length !== selectedMarkerIds.size) {
      showToast('현황판에 배치된 제약 마크를 2개 이상 SHIFT로 선택하세요.');
      return false;
    }
    const markerIds = selected.map((marker) => marker.id);
    const signature = groupSignature(markerIds);
    const exact = state.groups.find((group) => groupSignature(group.markerIds) === signature);
    if (exact) {
      if (exact.type === type) {
        showToast(type === 'gatekeeper' ? '이미 같은 문지기 묶음이 있습니다.' : '이미 같은 일반 묶음이 있습니다.');
        return false;
      }
      exact.type = type;
      exact.createdAt = new Date().toISOString();
      pruneInvalidScoreSelections();
      renderMarkers();
      scheduleSave();
      showToast(type === 'gatekeeper' ? '선택 묶음을 문지기 묶음으로 변경했습니다.' : '선택 묶음을 일반 묶음으로 변경했습니다.');
      return true;
    }
    const selectedSet = new Set(markerIds);
    const overlap = state.groups.find((group) => (group.markerIds || []).some((id) => selectedSet.has(id)));
    if (overlap) {
      showToast('이미 다른 묶음에 포함된 제약이 있습니다. 기존 묶음을 해제한 뒤 다시 묶어주세요.');
      return false;
    }
    state.groups.push({
      id: uid('group'),
      type,
      markerIds,
      createdAt: new Date().toISOString()
    });
    pruneInvalidScoreSelections();
    renderMarkers();
    scheduleSave();
    showToast(type === 'gatekeeper'
      ? `${markerIds.length}개 제약을 문지기 묶음으로 만들었습니다.`
      : `${markerIds.length}개 제약을 일반 묶음으로 만들었습니다.`);
    return true;
  }

  function toggleSecondPhaseSelection() {
    const selected = selectedPlacedMarkers();
    if (!selectedMarkerIds.size || selected.length !== selectedMarkerIds.size) {
      showToast('현황판에 배치된 제약 마크를 SHIFT로 선택하세요.');
      return false;
    }
    const markAsSecondPhase = !selected.every((marker) => marker.isSecondPhase);
    selected.forEach((marker) => {
      marker.isSecondPhase = markAsSecondPhase;
      marker.updatedAt = new Date().toISOString();
      if (!markAsSecondPhase) scoreSelectedMarkerIds.delete(marker.id);
    });
    pruneInvalidScoreSelections();
    renderMarkers();
    scheduleSave();
    showToast(markAsSecondPhase
      ? `${selected.length}개 제약을 위기협약 2차 업데이트 제약으로 지정했습니다.`
      : `${selected.length}개 제약의 2차 업데이트 표시를 해제했습니다.`);
    return true;
  }

  function markerGroupMembership(id) {
    return (state.groups || []).filter((group) => (group.markerIds || []).includes(String(id)));
  }

  function cancelPendingScoreSelection() {
    window.clearTimeout(pendingScoreSelectionTimer);
    pendingScoreSelectionTimer = null;
    pendingScoreSelectionId = null;
  }

  function conflictingSelectedMarker(markerId, selectedIds = scoreSelectedMarkerIds) {
    const relation = state.relations.find((item) => item.type === 'conflict' && (
      (item.a === markerId && selectedIds.has(item.b)) ||
      (item.b === markerId && selectedIds.has(item.a))
    ));
    if (!relation) return null;
    return getMarker(relation.a === markerId ? relation.b : relation.a);
  }

  function placedGroupMarkers(group) {
    return (group?.markerIds || []).map(getMarker).filter((marker) => marker && marker.tier != null);
  }

  function gatekeeperBlocker(marker, selectedIds = scoreSelectedMarkerIds) {
    if (!marker || marker.tier == null) return null;
    const markerCol = inferredSlot(marker).col;
    for (const group of (state.groups || []).filter((item) => item.type === 'gatekeeper')) {
      const members = placedGroupMarkers(group);
      if (members.length < 2 || group.markerIds.includes(marker.id)) continue;
      const boundaryCol = Math.max(...members.map((item) => inferredSlot(item).col));
      const opened = members.some((item) => selectedIds.has(item.id));
      if (!opened && markerCol > boundaryCol) return { group, members, boundaryCol };
    }
    return null;
  }

  function scoreBlockReason(marker, selectedIds = scoreSelectedMarkerIds) {
    if (marker?.isSecondPhase && state.secondPhaseIncluded === false) return '2차 제약 미포함 상태에서는 총점에 포함할 수 없습니다.';
    const conflict = conflictingSelectedMarker(marker.id, selectedIds);
    if (conflict) return `선택한 “${conflict.label}” 제약과 충돌하여 함께 포함할 수 없습니다.`;
    const gate = gatekeeperBlocker(marker, selectedIds);
    if (gate) return `왼쪽 문지기 묶음에서 제약을 1개 이상 먼저 선택해야 합니다.`;
    return '';
  }

  function pruneInvalidScoreSelections() {
    [...scoreSelectedMarkerIds].forEach((id) => {
      const marker = getMarker(id);
      if (!marker || marker.tier == null || (marker.isSecondPhase && state.secondPhaseIncluded === false)) scoreSelectedMarkerIds.delete(id);
    });

    const kept = new Set();
    [...scoreSelectedMarkerIds].forEach((id) => {
      const conflict = conflictingSelectedMarker(id, kept);
      if (conflict) scoreSelectedMarkerIds.delete(id);
      else kept.add(id);
    });

    let changed = true;
    while (changed) {
      changed = false;
      [...scoreSelectedMarkerIds].forEach((id) => {
        const marker = getMarker(id);
        if (!marker) return;
        const gate = gatekeeperBlocker(marker, scoreSelectedMarkerIds);
        if (gate) {
          scoreSelectedMarkerIds.delete(id);
          changed = true;
        }
      });
    }
  }

  function updateScoreSelectionUi() {
    pruneInvalidScoreSelections();
    document.querySelectorAll('.board-marker[data-marker-id]').forEach((element) => {
      const marker = getMarker(element.dataset.markerId);
      const selected = scoreSelectedMarkerIds.has(element.dataset.markerId);
      const reason = marker && !selected ? scoreBlockReason(marker) : '';
      element.classList.toggle('is-score-selected', selected);
      element.classList.toggle('is-score-blocked', Boolean(reason));
      element.dataset.scoreSelected = String(selected);
      element.dataset.scoreBlockedReason = reason;
      element.setAttribute('aria-disabled', String(Boolean(reason)));
    });
    const selected = [...scoreSelectedMarkerIds].map(getMarker).filter((marker) => marker && marker.tier != null);
    const total = selected.reduce((sum, marker) => sum + Number(marker.tier || 0), 0);
    if (scoreSelectionValue) scoreSelectionValue.textContent = `${total}점`;
    if (scoreSelectionTotal) {
      scoreSelectionTotal.classList.toggle('active', selected.length > 0);
      scoreSelectionTotal.setAttribute('aria-label', selected.length ? `선택한 제약 ${selected.length}개, 총 ${total}점` : '선택한 제약 없음, 총 0점');
    }
  }

  function toggleScoreSelection(id) {
    const marker = getMarker(id);
    if (!marker || marker.tier == null) return;
    if (scoreSelectedMarkerIds.has(marker.id)) {
      scoreSelectedMarkerIds.delete(marker.id);
      const before = scoreSelectedMarkerIds.size;
      pruneInvalidScoreSelections();
      const removed = before - scoreSelectedMarkerIds.size;
      updateScoreSelectionUi();
      if (removed > 0) showToast(`문지기 선택이 해제되어 오른쪽 제약 ${removed}개도 총점에서 제외했습니다.`);
      return;
    }
    const reason = scoreBlockReason(marker);
    if (reason) {
      showToast(reason);
      updateScoreSelectionUi();
      return;
    }
    scoreSelectedMarkerIds.add(marker.id);
    pruneInvalidScoreSelections();
    updateScoreSelectionUi();
  }

  function orderedMarkers(ids) {
    const idSet = new Set(ids);
    return state.markers.filter((marker) => idSet.has(marker.id)).sort((a, b) => {
      const tierA = a.tier == null ? 9 : a.tier;
      const tierB = b.tier == null ? 9 : b.tier;
      const rowA = Number.isFinite(Number(a.gridRow)) ? Number(a.gridRow) : Math.floor((a.layoutOrder || 0) / BOARD_GRID_COLUMNS);
      const rowB = Number.isFinite(Number(b.gridRow)) ? Number(b.gridRow) : Math.floor((b.layoutOrder || 0) / BOARD_GRID_COLUMNS);
      const colA = Number.isFinite(Number(a.gridCol)) ? Number(a.gridCol) : (a.layoutOrder || 0) % BOARD_GRID_COLUMNS;
      const colB = Number.isFinite(Number(b.gridCol)) ? Number(b.gridCol) : (b.layoutOrder || 0) % BOARD_GRID_COLUMNS;
      return tierA - tierB || rowA - rowB || colA - colB || Date.parse(a.createdAt) - Date.parse(b.createdAt);
    });
  }

  function showMarkerTooltip(event) {
    if (interaction || aim) return;
    const marker = getMarker(event.currentTarget.dataset.markerId);
    if (!marker) return;
    const blockedReason = event.currentTarget.dataset.markerLocation === 'board' && !scoreSelectedMarkerIds.has(marker.id) ? scoreBlockReason(marker) : '';
    tooltip.innerHTML = `<small style="color:var(--cat-${CATEGORY_CLASS[marker.category]})">${esc(marker.category)} CATEGORY</small><strong>${esc(marker.title)}</strong><p>${rich(marker.description || '설명이 없습니다.')}</p>${blockedReason ? `<p class="score-blocked-note">${esc(blockedReason)}</p>` : ''}`;
    tooltip.hidden = false;
    moveTooltip(event);
  }

  function moveTooltip(event) {
    if (tooltip.hidden) return;
    const pad = 14;
    const width = tooltip.offsetWidth || 330;
    const height = tooltip.offsetHeight || 120;
    let left = event.clientX + 16;
    let top = event.clientY + 16;
    if (left + width > window.innerWidth - pad) left = event.clientX - width - 16;
    if (top + height > window.innerHeight - pad) top = event.clientY - height - 16;
    tooltip.style.left = `${Math.max(pad, left)}px`;
    tooltip.style.top = `${Math.max(pad, top)}px`;
  }

  function hideTooltip() {
    tooltip.hidden = true;
  }

  function getMarker(id) {
    return state.markers.find((item) => item.id === String(id)) || null;
  }

  function sortedTierMarkers(tier, excludingId = null) {
    return state.markers
      .filter((marker) => marker.tier === Number(tier) && marker.id !== excludingId)
      .sort((a, b) => {
        const rowA = Number.isFinite(Number(a.gridRow)) ? Number(a.gridRow) : Math.floor((a.layoutOrder || 0) / BOARD_GRID_COLUMNS);
        const rowB = Number.isFinite(Number(b.gridRow)) ? Number(b.gridRow) : Math.floor((b.layoutOrder || 0) / BOARD_GRID_COLUMNS);
        const colA = Number.isFinite(Number(a.gridCol)) ? Number(a.gridCol) : (a.layoutOrder || 0) % BOARD_GRID_COLUMNS;
        const colB = Number.isFinite(Number(b.gridCol)) ? Number(b.gridCol) : (b.layoutOrder || 0) % BOARD_GRID_COLUMNS;
        return rowA - rowB || colA - colB || Date.parse(a.createdAt) - Date.parse(b.createdAt);
      });
  }

  function slotKey(row, col) {
    return `${row}:${col}`;
  }

  function inferredSlot(marker) {
    const gridCol = Number.isFinite(Number(marker.gridCol))
      ? clamp(Math.round(Number(marker.gridCol)), 0, BOARD_GRID_COLUMNS - 1)
      : clamp(Math.floor(clamp(Number(marker.x) || .5, 0, .9999) * BOARD_GRID_COLUMNS), 0, BOARD_GRID_COLUMNS - 1);
    return { row: 0, col: gridCol };
  }

  function findNearestFreeSlot(occupied, targetCol) {
    const col = clamp(Math.round(Number(targetCol) || 0), 0, BOARD_GRID_COLUMNS - 1);
    if (!occupied.has(slotKey(0, col))) return { row: 0, col };
    for (let distance = 1; distance < BOARD_GRID_COLUMNS; distance += 1) {
      const candidates = [col - distance, col + distance]
        .filter((candidateCol) => candidateCol >= 0 && candidateCol < BOARD_GRID_COLUMNS);
      const freeCol = candidates.find((candidateCol) => !occupied.has(slotKey(0, candidateCol)));
      if (freeCol != null) return { row: 0, col: freeCol };
    }
    return null;
  }

  function reflowTier(tier) {
    const markers = sortedTierMarkers(tier);
    const zone = tierZones.find((item) => Number(item.dataset.tier) === Number(tier));
    const rowElement = zone?.closest('.score-row');
    const occupied = new Set();
    const overflow = [];
    markers.forEach((marker) => {
      const desired = inferredSlot(marker);
      const slot = findNearestFreeSlot(occupied, desired.col);
      if (!slot) {
        overflow.push(marker);
        return;
      }
      occupied.add(slotKey(0, slot.col));
      marker.gridCol = slot.col;
      marker.gridRow = 0;
      marker.layoutOrder = slot.col;
      marker.x = (slot.col + .5) / BOARD_GRID_COLUMNS;
      marker.y = .5;
    });
    overflow.forEach((marker) => {
      marker.tier = null;
      marker.gridCol = null;
      marker.gridRow = null;
      marker.layoutOrder = 0;
      scoreSelectedMarkerIds.delete(marker.id);
    });
    if (rowElement) rowElement.style.height = '190px';
  }

  function reflowAllTiers() {
    [1, 2, 3].forEach(reflowTier);
  }

  function dropSlotForPoint(zone, x, y, markerIds) {
    const rect = zone.getBoundingClientRect();
    const col = clamp(Math.floor(((x - rect.left) / Math.max(1, rect.width)) * BOARD_GRID_COLUMNS), 0, BOARD_GRID_COLUMNS - 1);
    return { row: 0, col };
  }

  function placeMarkersAtSlot(markerIds, tier, targetCol) {
    const ids = [...new Set(markerIds.map(String))];
    const moving = orderedMarkers(ids);
    if (!moving.length) return false;
    const oldTiers = new Set(moving.map((marker) => marker.tier).filter((value) => value != null));
    const idSet = new Set(ids);
    const destination = sortedTierMarkers(tier).filter((marker) => !idSet.has(marker.id));
    const occupied = new Set(destination.map((marker) => slotKey(0, inferredSlot(marker).col)));
    const planned = [];
    moving.forEach((marker, index) => {
      if (planned.length !== index) return;
      const desiredCol = clamp(Number(targetCol) + index, 0, BOARD_GRID_COLUMNS - 1);
      const slot = findNearestFreeSlot(occupied, desiredCol);
      if (!slot) return;
      occupied.add(slotKey(0, slot.col));
      planned.push({ marker, slot });
    });
    if (planned.length !== moving.length) return false;
    planned.forEach(({ marker, slot }) => {
      marker.tier = Number(tier);
      marker.gridCol = slot.col;
      marker.gridRow = 0;
      marker.layoutOrder = slot.col;
      marker.updatedAt = new Date().toISOString();
    });
    oldTiers.forEach((oldTier) => { if (oldTier !== Number(tier)) reflowTier(oldTier); });
    reflowTier(tier);
    return true;
  }



  function nearestValidHorizontalDelta(markerIds, requestedDelta) {
    const moving = orderedMarkers(markerIds).filter((marker) => marker.tier != null);
    if (!moving.length) return null;
    const minCol = Math.min(...moving.map((marker) => inferredSlot(marker).col));
    const maxCol = Math.max(...moving.map((marker) => inferredSlot(marker).col));
    const minDelta = -minCol;
    const maxDelta = BOARD_GRID_COLUMNS - 1 - maxCol;
    const desired = clamp(Math.round(Number(requestedDelta) || 0), minDelta, maxDelta);
    const candidates = [];
    for (let delta = minDelta; delta <= maxDelta; delta += 1) candidates.push(delta);
    candidates.sort((a, b) => Math.abs(a - desired) - Math.abs(b - desired) || Math.abs(a) - Math.abs(b));
    const movingSet = new Set(markerIds.map(String));
    const occupiedByTier = new Map([1, 2, 3].map((tier) => [tier, new Set(
      sortedTierMarkers(tier)
        .filter((marker) => !movingSet.has(marker.id))
        .map((marker) => inferredSlot(marker).col)
    )]));
    return candidates.find((delta) => moving.every((marker) => {
      const col = inferredSlot(marker).col + delta;
      return col >= 0 && col < BOARD_GRID_COLUMNS && !occupiedByTier.get(marker.tier).has(col);
    })) ?? null;
  }

  function moveMarkersHorizontally(markerIds, anchorId, targetCol) {
    const moving = orderedMarkers(markerIds).filter((marker) => marker.tier != null);
    if (moving.length !== markerIds.length || moving.length < 2) return false;
    const anchor = moving.find((marker) => marker.id === anchorId) || moving[0];
    const requestedDelta = Number(targetCol) - inferredSlot(anchor).col;
    const delta = nearestValidHorizontalDelta(markerIds, requestedDelta);
    if (delta == null) return false;
    moving.forEach((marker) => {
      const col = inferredSlot(marker).col + delta;
      marker.gridCol = col;
      marker.gridRow = 0;
      marker.layoutOrder = col;
      marker.x = (col + .5) / BOARD_GRID_COLUMNS;
      marker.y = .5;
      marker.updatedAt = new Date().toISOString();
    });
    return true;
  }

  function placeMarkersInTier(markerIds, tier) {
    reflowTier(tier);
    const movingIds = new Set(markerIds.map(String));
    const occupied = new Set(sortedTierMarkers(tier)
      .filter((marker) => !movingIds.has(marker.id))
      .map((marker) => slotKey(0, inferredSlot(marker).col)));
    const first = findNearestFreeSlot(occupied, 0);
    if (!first) return false;
    return placeMarkersAtSlot(markerIds, tier, first.col);
  }

  function placeMarkerInTier(markerId, tier) {
    return placeMarkersInTier([markerId], tier);
  }

  function unplaceMarkers(markerIds) {
    const ids = new Set(markerIds.map(String));
    const oldTiers = new Set();
    state.markers.forEach((marker) => {
      if (!ids.has(marker.id)) return;
      if (marker.tier != null) oldTiers.add(marker.tier);
      marker.tier = null;
      marker.gridCol = null;
      marker.gridRow = null;
      marker.layoutOrder = 0;
      scoreSelectedMarkerIds.delete(marker.id);
      marker.updatedAt = new Date().toISOString();
    });
    oldTiers.forEach(reflowTier);
  }

  function onMarkerPointerDown(event) {
    if (event.button !== 0 || event.target.closest('button')) return;
    const marker = getMarker(event.currentTarget.dataset.markerId);
    if (!marker) return;
    if (event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      toggleMarkerSelection(marker.id);
      return;
    }
    if (aim?.type === 'synergy') {
      event.preventDefault();
      completeAimAt(marker.id);
      return;
    }
    hideTooltip();
    closeRelationMenu();
    const markerIds = selectedMarkerIds.has(marker.id) && selectedMarkerIds.size > 1 ? [...selectedMarkerIds] : [marker.id];
    if (!selectedMarkerIds.has(marker.id)) clearMarkerSelection();
    const lockedTierMove = markerIds.length > 1 && markerIds.every((id) => getMarker(id)?.tier != null);
    interaction = {
      markerId: marker.id,
      markerIds,
      lockedTierMove,
      sourceElement: event.currentTarget,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      moved: false,
      mode: 'pending',
      pointerId: event.pointerId,
      longTimer: null,
      ghost: null,
      ghosts: [],
      fadedElements: []
    };
    interaction.longTimer = window.setTimeout(() => {
      if (!interaction || interaction.moved) return;
      if (interaction.markerIds.length > 1) {
        showToast('여러 마크 선택 중에는 관계 연결 대신 드래그 이동을 사용하세요.');
        cleanupInteraction();
        return;
      }
      if (marker.tier == null) {
        showToast('관계선은 현황판에 배치된 마크끼리 연결할 수 있습니다.');
        cleanupInteraction();
        return;
      }
      interaction.mode = 'conflict';
      beginAim('conflict', marker.id, event.clientX, event.clientY, true);
      event.currentTarget.classList.add('relation-source');
    }, 560);
    document.addEventListener('pointermove', onGlobalPointerMove);
    document.addEventListener('pointerup', onGlobalPointerUp, { once: true });
    document.addEventListener('pointercancel', onGlobalPointerUp, { once: true });
  }

  function onMarkerClick(event) {
    if (event.shiftKey || event.target.closest('button')) return;
    const marker = getMarker(event.currentTarget.dataset.markerId);
    if (!marker || marker.tier == null) return;
    if (event.detail >= 3) {
      event.preventDefault();
      cancelPendingScoreSelection();
      beginAim('synergy', marker.id, event.clientX, event.clientY, false);
      showToast('시너지 연결 모드: 연결할 다른 제약 마크를 클릭하세요.');
    }
  }

  function onMarkerDoubleClick(event) {
    if (event.shiftKey || event.target.closest('button')) return;
    const element = event.currentTarget;
    if (element.dataset.markerLocation !== 'board') return;
    const marker = getMarker(element.dataset.markerId);
    if (!marker || marker.tier == null) return;
    event.preventDefault();
    cancelPendingScoreSelection();
    pendingScoreSelectionId = marker.id;
    pendingScoreSelectionTimer = window.setTimeout(() => {
      const id = pendingScoreSelectionId;
      pendingScoreSelectionTimer = null;
      pendingScoreSelectionId = null;
      if (id) toggleScoreSelection(id);
    }, 330);
  }

  function onGlobalPointerMove(event) {
    if (!interaction) return;
    interaction.lastX = event.clientX;
    interaction.lastY = event.clientY;
    const distance = Math.hypot(event.clientX - interaction.startX, event.clientY - interaction.startY);
    if (interaction.mode === 'pending' && distance > 7) {
      interaction.moved = true;
      window.clearTimeout(interaction.longTimer);
      interaction.mode = 'drag';
      startDragGhost(interaction.markerId, event.clientX, event.clientY);
    }
    if (interaction.mode === 'drag') {
      updateDragGhost(event.clientX, event.clientY);
      updateDropHighlight(event.clientX, event.clientY);
    }
    if (interaction.mode === 'conflict' && aim) {
      updateAim(event.clientX, event.clientY);
    }
  }

  function onGlobalPointerUp(event) {
    if (!interaction) return;
    window.clearTimeout(interaction.longTimer);
    if (interaction.mode === 'drag') finishDrag(event.clientX, event.clientY);
    if (interaction.mode === 'conflict') {
      const target = markerAtPoint(event.clientX, event.clientY);
      if (target && target !== interaction.markerId) createRelation(interaction.markerId, target, 'conflict');
      else showToast('충돌 연결이 취소되었습니다.');
      cancelAim();
    }
    cleanupInteraction();
  }

  function cleanupInteraction() {
    if (!interaction) return;
    window.clearTimeout(interaction.longTimer);
    interaction.sourceElement?.classList.remove('relation-source');
    (interaction.fadedElements || []).forEach((element) => { element.style.opacity = ''; });
    interaction.ghost?.remove();
    (interaction.ghosts || []).forEach((ghost) => ghost.element?.remove());
    tierZones.forEach((zone) => zone.classList.remove('drag-over'));
    boardDropHint.classList.remove('active');
    document.removeEventListener('pointermove', onGlobalPointerMove);
    interaction = null;
  }

  function startDragGhost(markerId, x, y) {
    const marker = getMarker(markerId);
    if (!marker || !interaction) return;
    const count = interaction.markerIds.length;
    interaction.fadedElements = [...document.querySelectorAll('[data-marker-id]')].filter((element) => interaction.markerIds.includes(element.dataset.markerId));
    interaction.fadedElements.forEach((element) => { element.style.opacity = '.28'; });

    if (interaction.lockedTierMove) {
      interaction.ghosts = interaction.markerIds.map((id) => {
        const item = getMarker(id);
        const source = document.querySelector(`.board-marker[data-marker-id="${CSS.escape(id)}"]`);
        if (!item || !source) return null;
        const rect = source.getBoundingClientRect();
        const ghost = document.createElement('article');
        ghost.className = 'drag-ghost locked-tier-drag-ghost';
        ghost.dataset.category = item.category;
        ghost.innerHTML = `${markerBadgeHtml(item)}<div class="marker-label">${rich(item.label)}</div>`;
        document.body.appendChild(ghost);
        return {
          element: ghost,
          offsetX: rect.left + rect.width / 2 - interaction.startX,
          fixedY: rect.top + rect.height / 2
        };
      }).filter(Boolean);
    } else {
      const ghost = document.createElement('article');
      ghost.className = `drag-ghost ${count > 1 ? 'multi-drag-ghost' : ''}`;
      ghost.dataset.category = marker.category;
      ghost.innerHTML = `${markerBadgeHtml(marker)}<div class="marker-label">${rich(marker.label)}</div>${count > 1 ? `<b class="drag-count-badge">+${count - 1}</b>` : ''}`;
      document.body.appendChild(ghost);
      interaction.ghost = ghost;
    }
    updateDragGhost(x, y);
  }

  function updateDragGhost(x, y) {
    if (!interaction) return;
    if (interaction.lockedTierMove && interaction.ghosts?.length) {
      interaction.ghosts.forEach((ghost) => {
        ghost.element.style.left = `${x + ghost.offsetX}px`;
        ghost.element.style.top = `${ghost.fixedY}px`;
      });
      return;
    }
    if (!interaction.ghost) return;
    interaction.ghost.style.left = `${x}px`;
    interaction.ghost.style.top = `${y}px`;
  }

  function zoneAtPoint(x, y) {
    return tierZones.find((zone) => {
      const rect = zone.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }) || null;
  }

  function markerAtPoint(x, y) {
    const elements = document.elementsFromPoint(x, y);
    const markerElement = elements.find((element) => element?.matches?.('.board-marker[data-marker-id]'));
    return markerElement?.dataset.markerId || null;
  }

  function updateDropHighlight(x, y) {
    const zone = zoneAtPoint(x, y);
    const boardRect = board.getBoundingClientRect();
    const insideBoard = x >= boardRect.left && x <= boardRect.right && y >= boardRect.top && y <= boardRect.bottom;
    if (interaction?.lockedTierMove && insideBoard) {
      const sourceTiers = new Set(interaction.markerIds.map((id) => getMarker(id)?.tier).filter(Boolean));
      tierZones.forEach((item) => item.classList.toggle('drag-over', sourceTiers.has(Number(item.dataset.tier))));
    } else {
      tierZones.forEach((item) => item.classList.toggle('drag-over', item === zone));
    }
    boardDropHint.classList.toggle('active', y > boardRect.bottom - 5 || document.elementsFromPoint(x, y).includes(tray));
  }

  function finishDrag(x, y) {
    const marker = getMarker(interaction.markerId);
    if (!marker) return;
    const movingIds = interaction.markerIds?.length ? interaction.markerIds : [marker.id];
    (interaction.fadedElements || []).forEach((element) => { element.style.opacity = ''; });
    const zone = zoneAtPoint(x, y);
    const boardRect = board.getBoundingClientRect();
    const overTray = document.elementsFromPoint(x, y).some((element) => element === tray || element.closest?.('#marker-tray'));
    if (zone) {
      if (interaction.lockedTierMove) {
        const slot = dropSlotForPoint(zone, x, y, movingIds);
        const moved = moveMarkersHorizontally(movingIds, interaction.markerId, slot.col);
        showToast(moved
          ? `${movingIds.length}개 제약의 점수 줄을 유지한 채 가로로 이동했습니다.`
          : '선택한 제약들이 모두 들어갈 수 있는 빈 세로 열이 없습니다.');
      } else {
        const tier = Number(zone.dataset.tier);
        const slot = dropSlotForPoint(zone, x, y, movingIds);
        const placed = placeMarkersAtSlot(movingIds, tier, slot.col);
        showToast(placed
          ? (movingIds.length > 1 ? `${movingIds.length}개 제약을 ${tier}점 구역의 빈 칸에 함께 배치했습니다.` : `${tier}점 구역의 빈 칸에 배치했습니다.`)
          : `${tier}점 구역에 필요한 빈 칸이 없습니다.`);
      }
    } else if (y > boardRect.bottom - 4 || overTray) {
      unplaceMarkers(movingIds);
      showToast(movingIds.length > 1 ? `${movingIds.length}개 제약을 현황판에서 제거하고 미배치 보관함으로 옮겼습니다.` : '현황판에서 제거하고 미배치 보관함으로 옮겼습니다.');
    } else {
      showToast('배치가 취소되었습니다.');
    }
    renderMarkers();
    scheduleSave();
  }

  function beginAim(type, sourceId, x, y, held) {
    const source = getMarker(sourceId);
    if (!source || source.tier == null) return;
    cancelAim();
    aim = { type, sourceId, x, y, held };
    document.querySelector(`.board-marker[data-marker-id="${CSS.escape(sourceId)}"]`)?.classList.add('relation-source');
    if (!held) {
      document.addEventListener('pointermove', onSynergyAimMove);
      window.setTimeout(() => document.addEventListener('pointerdown', onSynergyTargetPointerDown, true), 0);
    }
    renderRelations();
  }

  function onSynergyAimMove(event) {
    if (!aim || aim.type !== 'synergy') return;
    updateAim(event.clientX, event.clientY);
  }

  function onSynergyTargetPointerDown(event) {
    if (!aim || aim.type !== 'synergy') return;
    const target = event.target.closest?.('.board-marker[data-marker-id]');
    if (target) {
      event.preventDefault();
      event.stopPropagation();
      completeAimAt(target.dataset.markerId);
    } else if (!event.target.closest?.('.relation-layer')) {
      cancelAim();
      showToast('시너지 연결이 취소되었습니다.');
    }
  }

  function updateAim(x, y) {
    if (!aim) return;
    aim.x = x;
    aim.y = y;
    document.querySelectorAll('.board-marker.relation-target').forEach((item) => item.classList.remove('relation-target'));
    const targetId = markerAtPoint(x, y);
    if (targetId && targetId !== aim.sourceId) document.querySelector(`.board-marker[data-marker-id="${CSS.escape(targetId)}"]`)?.classList.add('relation-target');
    renderRelations();
  }

  function completeAimAt(targetId) {
    if (!aim) return;
    if (targetId === aim.sourceId) {
      showToast('같은 제약끼리는 연결할 수 없습니다.');
      return;
    }
    const target = getMarker(targetId);
    if (!target || target.tier == null) {
      showToast('현황판에 배치된 마크를 선택하세요.');
      return;
    }
    createRelation(aim.sourceId, targetId, aim.type);
    cancelAim();
  }

  function cancelAim() {
    document.removeEventListener('pointermove', onSynergyAimMove);
    document.removeEventListener('pointerdown', onSynergyTargetPointerDown, true);
    document.querySelectorAll('.board-marker.relation-source,.board-marker.relation-target').forEach((item) => item.classList.remove('relation-source', 'relation-target'));
    aim = null;
    renderRelations();
  }

  function pairMatch(relation, a, b) {
    return (relation.a === a && relation.b === b) || (relation.a === b && relation.b === a);
  }

  function createRelation(a, b, type) {
    const current = state.relations.find((relation) => pairMatch(relation, a, b));
    const label = type === 'conflict' ? '충돌' : '시너지';
    if (current?.type === type) {
      showToast(`이미 ${label} 관계로 연결되어 있습니다.`);
      return;
    }
    if (current && current.type !== type) {
      const from = current.type === 'conflict' ? '충돌' : '시너지';
      if (!window.confirm(`두 제약은 이미 ${from} 관계입니다. ${label} 관계로 변경할까요?`)) return;
      current.type = type;
      current.createdAt = new Date().toISOString();
    } else {
      state.relations.push({ id: uid('relation'), a, b, type, createdAt: new Date().toISOString() });
    }
    pruneInvalidScoreSelections();
    renderMarkers();
    scheduleSave();
    showToast(`${label} 관계를 기록했습니다.`);
  }

  function markerGeometry(id) {
    const element = document.querySelector(`.board-marker[data-marker-id="${CSS.escape(id)}"]`);
    if (!element) return null;
    const boardRect = board.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    const left = rect.left - boardRect.left;
    const top = rect.top - boardRect.top;
    return {
      id,
      element,
      left,
      top,
      right: left + rect.width,
      bottom: top + rect.height,
      width: rect.width,
      height: rect.height,
      x: left + rect.width / 2,
      y: top + rect.height / 2
    };
  }

  function markerCenter(id) {
    const geometry = markerGeometry(id);
    return geometry ? { x: geometry.x, y: geometry.y } : null;
  }

  function svgLine(x1, y1, x2, y2, attrs = '') {
    return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" ${attrs}></line>`;
  }

  function svgPath(points, attrs = '') {
    if (!points.length) return '';
    const commands = [`M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`];
    points.slice(1).forEach((point) => commands.push(`L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`));
    return `<path d="${commands.join(' ')}" ${attrs}></path>`;
  }

  /*
   * Keep every relationship line behind marker cards, even when a marker is
   * dimmed or semi-transparent. The SVG mask cuts the line layer out of every
   * occupied marker rectangle while leaving the marker DOM itself untouched.
   */
  function relationMarkerMaskMarkup() {
    const boardRect = board.getBoundingClientRect();
    const width = Math.max(1, boardRect.width);
    const height = Math.max(1, boardRect.height);
    let cutouts = '';

    board.querySelectorAll('.board-marker').forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      const style = window.getComputedStyle(element);
      const radius = Math.max(0, parseFloat(style.borderTopLeftRadius) || 12);
      const x = rect.left - boardRect.left;
      const y = rect.top - boardRect.top;
      cutouts += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${rect.width.toFixed(2)}" height="${rect.height.toFixed(2)}" rx="${radius.toFixed(2)}" ry="${radius.toFixed(2)}" fill="#000"></rect>`;
    });

    return `<defs><mask id="relation-marker-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="${width.toFixed(2)}" height="${height.toFixed(2)}" style="mask-type:luminance"><rect x="0" y="0" width="${width.toFixed(2)}" height="${height.toFixed(2)}" fill="#fff"></rect>${cutouts}</mask></defs>`;
  }

  function rayToMarkerEdge(origin, toward, geometry, overlap = 1.25) {
    const dx = toward.x - origin.x;
    const dy = toward.y - origin.y;
    if (Math.abs(dx) < .001 && Math.abs(dy) < .001) return { x: origin.x, y: origin.y };
    const candidates = [];
    if (dx > .001) candidates.push((geometry.right - overlap - origin.x) / dx);
    else if (dx < -.001) candidates.push((geometry.left + overlap - origin.x) / dx);
    if (dy > .001) candidates.push((geometry.bottom - overlap - origin.y) / dy);
    else if (dy < -.001) candidates.push((geometry.top + overlap - origin.y) / dy);
    const positive = candidates.filter((value) => Number.isFinite(value) && value >= 0);
    const t = positive.length ? Math.min(...positive) : 0;
    return { x: origin.x + dx * t, y: origin.y + dy * t };
  }

  function clippedRelationSegment(aId, bId, offset = 0) {
    const a = markerGeometry(aId);
    const b = markerGeometry(bId);
    if (!a || !b) return null;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.max(1, Math.hypot(dx, dy));
    const nx = -dy / length;
    const ny = dx / length;
    const aOrigin = { x: a.x + nx * offset, y: a.y + ny * offset };
    const bOrigin = { x: b.x + nx * offset, y: b.y + ny * offset };
    return {
      a: rayToMarkerEdge(aOrigin, bOrigin, a),
      b: rayToMarkerEdge(bOrigin, aOrigin, b),
      aGeometry: a,
      bGeometry: b
    };
  }

  function clippedAimSegment(sourceId, target, offset = 0) {
    const source = markerGeometry(sourceId);
    if (!source) return null;
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const length = Math.max(1, Math.hypot(dx, dy));
    const nx = -dy / length;
    const ny = dx / length;
    const origin = { x: source.x + nx * offset, y: source.y + ny * offset };
    const shiftedTarget = { x: target.x + nx * offset, y: target.y + ny * offset };
    return { a: rayToMarkerEdge(origin, shiftedTarget, source), b: shiftedTarget };
  }

  function orthogonalPoints(a, b) {
    if (Math.abs(a.x - b.x) < 3 || Math.abs(a.y - b.y) < 3) return [{ x:a.x, y:a.y }, { x:b.x, y:b.y }];
    const horizontalFirst = Math.abs(b.x - a.x) >= Math.abs(b.y - a.y);
    return horizontalFirst
      ? [{ x:a.x, y:a.y }, { x:b.x, y:a.y }, { x:b.x, y:b.y }]
      : [{ x:a.x, y:a.y }, { x:a.x, y:b.y }, { x:b.x, y:b.y }];
  }

  function clipGroupPath(points, aGeometry, bGeometry) {
    const clipped = points.map((point) => ({ x:point.x, y:point.y }));
    if (clipped.length < 2) return clipped;
    let firstTarget = clipped[1];
    for (let index = 1; index < clipped.length; index += 1) {
      if (Math.hypot(clipped[index].x - aGeometry.x, clipped[index].y - aGeometry.y) > .5) {
        firstTarget = clipped[index];
        break;
      }
    }
    let lastTarget = clipped[clipped.length - 2];
    for (let index = clipped.length - 2; index >= 0; index -= 1) {
      if (Math.hypot(clipped[index].x - bGeometry.x, clipped[index].y - bGeometry.y) > .5) {
        lastTarget = clipped[index];
        break;
      }
    }
    clipped[0] = rayToMarkerEdge({ x:aGeometry.x, y:aGeometry.y }, firstTarget, aGeometry);
    clipped[clipped.length - 1] = rayToMarkerEdge({ x:bGeometry.x, y:bGeometry.y }, lastTarget, bGeometry);
    return clipped;
  }

  function groupTreeEdges(group) {
    const nodes = (group.markerIds || []).map((id) => {
      const geometry = markerGeometry(id);
      return geometry ? { id, x:geometry.x, y:geometry.y, geometry } : null;
    }).filter(Boolean);
    if (nodes.length < 2) return [];
    const connected = [nodes.slice().sort((a, b) => a.x - b.x || a.y - b.y)[0]];
    const remaining = nodes.filter((node) => node.id !== connected[0].id);
    const edges = [];
    while (remaining.length) {
      let best = null;
      connected.forEach((from) => remaining.forEach((to, index) => {
        const distance = Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
        if (!best || distance < best.distance) best = { from, to, index, distance };
      }));
      const centerPoints = orthogonalPoints(best.from, best.to);
      edges.push({
        a:best.from,
        b:best.to,
        points:clipGroupPath(centerPoints, best.from.geometry, best.to.geometry)
      });
      connected.push(best.to);
      remaining.splice(best.index, 1);
    }
    return edges;
  }

  function polylineSegments(points) {
    const segments = [];
    for (let index = 1; index < points.length; index += 1) {
      const a = points[index - 1];
      const b = points[index];
      segments.push({ a, b, length: Math.hypot(b.x - a.x, b.y - a.y) });
    }
    return segments;
  }

  function groupMidpoint(edges) {
    const segments = edges.flatMap((edge) => polylineSegments(edge.points));
    const total = segments.reduce((sum, segment) => sum + segment.length, 0);
    if (!total || !segments.length) return null;
    let cursor = total / 2;
    for (const segment of segments) {
      if (cursor <= segment.length) {
        const ratio = segment.length ? cursor / segment.length : 0;
        return {
          x: segment.a.x + (segment.b.x - segment.a.x) * ratio,
          y: segment.a.y + (segment.b.y - segment.a.y) * ratio
        };
      }
      cursor -= segment.length;
    }
    return segments.at(-1).b;
  }

  function renderGroupsSvg() {
    let html = '';
    (state.groups || []).forEach((group) => {
      const edges = groupTreeEdges(group);
      if (!edges.length) return;
      const isGatekeeper = group.type === 'gatekeeper';
      const stroke = isGatekeeper ? '#2fc978' : '#ffffff';
      edges.forEach((edge) => {
        html += svgPath(edge.points, `class="group-hit" data-group-id="${esc(group.id)}" fill="none"`);
        html += svgPath(edge.points, `class="group-visible ${isGatekeeper ? 'gatekeeper-group-line' : 'normal-group-line'}" fill="none" stroke="${stroke}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"`);
      });
      if (isGatekeeper) {
        const midpoint = groupMidpoint(edges);
        if (midpoint) html += `<circle class="gatekeeper-group-node" cx="${midpoint.x.toFixed(2)}" cy="${midpoint.y.toFixed(2)}" r="7" fill="#2fc978" stroke="#eafff3" stroke-width="2"></circle>`;
      }
    });
    return html;
  }

  function renderRelations() {
    const visible = state.relations.filter((relation) => state.relationVisibility?.[relation.type] !== false);
    let html = renderGroupsSvg();
    visible.forEach((relation) => {
      const hit = clippedRelationSegment(relation.a, relation.b, 0);
      if (!hit) return;
      html += svgLine(hit.a.x, hit.a.y, hit.b.x, hit.b.y, `class="relation-hit" data-relation-id="${esc(relation.id)}"`);
      if (relation.type === 'conflict') {
        html += svgLine(hit.a.x, hit.a.y, hit.b.x, hit.b.y, 'class="relation-visible" stroke="#e14343" stroke-width="3" stroke-linecap="round"');
      } else {
        const top = clippedRelationSegment(relation.a, relation.b, 3.2);
        const bottom = clippedRelationSegment(relation.a, relation.b, -3.2);
        if (top) html += svgLine(top.a.x, top.a.y, top.b.x, top.b.y, 'class="relation-visible" stroke="#d9ac32" stroke-width="2.5" stroke-linecap="round"');
        if (bottom) html += svgLine(bottom.a.x, bottom.a.y, bottom.b.x, bottom.b.y, 'class="relation-visible" stroke="#d9ac32" stroke-width="2.5" stroke-linecap="round"');
      }
    });
    if (aim) {
      const boardRect = board.getBoundingClientRect();
      const target = { x: aim.x - boardRect.left, y: aim.y - boardRect.top };
      if (aim.type === 'conflict') {
        const segment = clippedAimSegment(aim.sourceId, target, 0);
        if (segment) html += svgLine(segment.a.x, segment.a.y, segment.b.x, segment.b.y, 'stroke="#e14343" stroke-width="3" stroke-linecap="round" stroke-dasharray="9 5"');
      } else {
        const one = clippedAimSegment(aim.sourceId, target, 3.2);
        const two = clippedAimSegment(aim.sourceId, target, -3.2);
        if (one) html += svgLine(one.a.x, one.a.y, one.b.x, one.b.y, 'stroke="#d9ac32" stroke-width="2.5" stroke-linecap="round"');
        if (two) html += svgLine(two.a.x, two.a.y, two.b.x, two.b.y, 'stroke="#d9ac32" stroke-width="2.5" stroke-linecap="round"');
      }
    }
    relationLayer.innerHTML = `${relationMarkerMaskMarkup()}<g class="relation-masked-content" mask="url(#relation-marker-mask)">${html}</g>`;
    relationLayer.querySelectorAll('[data-relation-id]').forEach((line) => line.addEventListener('click', (event) => {
      event.stopPropagation();
      openRelationMenu(line.dataset.relationId, event.clientX, event.clientY);
    }));
    relationLayer.querySelectorAll('[data-group-id]').forEach((line) => line.addEventListener('click', (event) => {
      event.stopPropagation();
      openGroupMenu(line.dataset.groupId, event.clientX, event.clientY);
    }));
  }

  function openRelationMenu(id, x, y) {
    const relation = state.relations.find((item) => item.id === id);
    if (!relation) return;
    activeRelationId = id;
    activeGroupId = null;
    document.getElementById('remove-relation-button').textContent = '관계 해제';
    const a = getMarker(relation.a);
    const b = getMarker(relation.b);
    const type = relation.type === 'conflict' ? '충돌 관계' : '시너지 관계';
    document.getElementById('relation-menu-title').textContent = `${type}: ${a?.label || '?'} ↔ ${b?.label || '?'}`;
    relationMenu.hidden = false;
    relationMenu.style.left = `${clamp(x + 8, 10, window.innerWidth - 180)}px`;
    relationMenu.style.top = `${clamp(y + 8, 10, window.innerHeight - 90)}px`;
  }

  function openGroupMenu(id, x, y) {
    const group = (state.groups || []).find((item) => item.id === id);
    if (!group) return;
    activeRelationId = null;
    activeGroupId = id;
    const type = group.type === 'gatekeeper' ? '문지기 묶음' : '일반 묶음';
    const labels = group.markerIds.map(getMarker).filter(Boolean).map((marker) => marker.label).join(' · ');
    document.getElementById('relation-menu-title').textContent = `${type}: ${labels}`;
    document.getElementById('remove-relation-button').textContent = '묶음 해제';
    relationMenu.hidden = false;
    relationMenu.style.left = `${clamp(x + 8, 10, window.innerWidth - 220)}px`;
    relationMenu.style.top = `${clamp(y + 8, 10, window.innerHeight - 90)}px`;
  }

  function closeRelationMenu() {
    relationMenu.hidden = true;
    activeRelationId = null;
    activeGroupId = null;
    document.getElementById('remove-relation-button').textContent = '관계 해제';
  }

  document.getElementById('remove-relation-button').addEventListener('click', () => {
    if (activeGroupId) {
      const group = (state.groups || []).find((item) => item.id === activeGroupId);
      const label = group?.type === 'gatekeeper' ? '문지기 묶음' : '일반 묶음';
      state.groups = (state.groups || []).filter((item) => item.id !== activeGroupId);
      pruneInvalidScoreSelections();
      closeRelationMenu();
      renderMarkers();
      scheduleSave();
      showToast(`${label}을 해제했습니다.`);
      return;
    }
    if (!activeRelationId) return;
    const relation = state.relations.find((item) => item.id === activeRelationId);
    const label = relation?.type === 'synergy' ? '시너지' : '충돌';
    state.relations = state.relations.filter((item) => item.id !== activeRelationId);
    pruneInvalidScoreSelections();
    closeRelationMenu();
    renderMarkers();
    scheduleSave();
    showToast(`${label} 관계를 해제했습니다.`);
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('#relation-menu') && !event.target.closest('.relation-hit') && !event.target.closest('.group-hit')) closeRelationMenu();
  });

  function openModal(id) {
    document.querySelectorAll('.board-modal').forEach((modal) => { modal.hidden = modal.id !== id; });
    backdrop.hidden = false;
    document.getElementById(id).hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModals() {
    document.querySelectorAll('.board-modal').forEach((modal) => { modal.hidden = true; });
    backdrop.hidden = true;
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', closeModals));
  backdrop.addEventListener('click', closeModals);
  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const editing = target?.matches?.('input,textarea,select,[contenteditable="true"]');
    if (!editing && selectedMarkerIds.size >= 2 && event.key === 'Enter') {
      event.preventDefault();
      createMarkerGroup('normal');
      return;
    }
    if (!editing && selectedMarkerIds.size >= 2 && event.key === 'ArrowUp') {
      event.preventDefault();
      createMarkerGroup('gatekeeper');
      return;
    }
    if (!editing && selectedMarkerIds.size >= 1 && event.key === 'ArrowDown') {
      event.preventDefault();
      toggleSecondPhaseSelection();
      return;
    }
    if (event.key === 'Escape') {
      if (aim) cancelAim();
      closeRelationMenu();
      closePlacementDrawer();
      closeModals();
    }
  });

  function openMarkerEdit(id) {
    const marker = getMarker(id);
    if (!marker) return;
    document.getElementById('edit-marker-id').value = marker.id;
    document.getElementById('edit-marker-category').value = marker.category;
    document.getElementById('edit-marker-label').value = marker.label;
    document.getElementById('edit-marker-title').value = marker.title;
    document.getElementById('edit-marker-description').value = marker.description;
    openModal('marker-edit-modal');
  }

  document.getElementById('marker-create-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const marker = {
      id: uid('constraint'),
      category: document.getElementById('marker-category').value,
      label: document.getElementById('marker-label').value.trim(),
      title: document.getElementById('marker-title').value.trim(),
      description: document.getElementById('marker-description').value.trim(),
      tier: null, x: .5, y: .5, gridCol: null, gridRow: null, layoutOrder: 0,
      sourceConstraintId: null, isSecondPhase: false,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
    };
    if (!marker.label || !marker.title || !marker.description) return;
    state.markers.push(marker);
    event.currentTarget.reset();
    document.getElementById('marker-category').value = marker.category;
    renderMarkers();
    scheduleSave();
    showToast('새 제약 마크를 미배치 보관함에 만들었습니다.');
  });

  document.getElementById('marker-edit-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const marker = getMarker(document.getElementById('edit-marker-id').value);
    if (!marker) return;
    marker.category = document.getElementById('edit-marker-category').value;
    marker.label = document.getElementById('edit-marker-label').value.trim();
    marker.title = document.getElementById('edit-marker-title').value.trim();
    marker.description = document.getElementById('edit-marker-description').value.trim();
    marker.updatedAt = new Date().toISOString();
    closeModals();
    renderMarkers();
    scheduleSave();
    showToast('제약 마크를 수정했습니다.');
  });

  document.getElementById('delete-marker-button').addEventListener('click', () => {
    const id = document.getElementById('edit-marker-id').value;
    const marker = getMarker(id);
    if (!marker) return;
    if (!window.confirm(`“${marker.title}” 제약을 완전히 삭제할까요? 연결된 충돌·시너지 관계와 묶음 정보도 함께 삭제됩니다.`)) return;
    state.markers = state.markers.filter((item) => item.id !== id);
    selectedMarkerIds.delete(id);
    scoreSelectedMarkerIds.delete(id);
    state.relations = state.relations.filter((relation) => relation.a !== id && relation.b !== id);
    state.groups = (state.groups || []).map((group) => ({ ...group, markerIds: group.markerIds.filter((markerId) => markerId !== id) })).filter((group) => group.markerIds.length >= 2);
    closeModals();
    renderMarkers();
    scheduleSave();
    showToast('제약 마크와 연결 관계·묶음 정보를 완전히 삭제했습니다.');
  });

  function sourceTexts(analysis) {
    const sources = [];
    const partyNames = (analysis.party || []).map((member) => member.name).join(' · ');
    const add = (label, text) => { if (text) sources.push({ label, text: String(text), partyNames, analysisId: analysis.id }); };
    add('파티 요약', analysis.summary?.sentence);
    (analysis.summary?.dependencies || []).forEach((item) => add('핵심 의존 요소', item.label || item));
    (analysis.combatFlow || []).forEach((item) => {
      add('주력 전투 흐름', `${item.character?.name || ''} ${item.skill?.type || ''} ${item.title || ''} ${item.detail || ''}`);
      (item.conditions || []).forEach((text) => add('발동 조건', text));
      (item.effects || []).forEach((text) => add('핵심 효과', text));
    });
    (analysis.weaknesses || []).forEach((group) => {
      add('구조적 약점', group.title);
      (group.entries || group.matches || []).forEach((entry) => add('구조적 약점', `${entry.character?.name || ''} ${entry.axis || ''} ${entry.implication || ''}`));
    });
    (analysis.designHints || []).forEach((hint) => add('제약 설계 힌트', `${hint.title || ''} ${hint.pressure || ''} ${hint.impact || ''} ${hint.opportunity || ''}`));
    (analysis.discoveries || []).forEach((item) => add('새로운 연결', `${item.title || ''} ${item.description || ''} ${item.opportunity || ''}`));
    return sources;
  }

  function mechanicTokens(analysis) {
    const profile = analysis.mechanicProfile || {};
    return new Set([...(profile.mechanicIds || []), ...(profile.hintIds || []), ...(profile.dependencyLabels || []), ...(profile.weaknessAxes || []), profile.dominantAction || ''].filter(Boolean).map((item) => String(item).toLocaleLowerCase('ko-KR')));
  }

  function buildRecommendations() {
    const prepared = analyses.map((analysis) => ({ analysis, sources: sourceTexts(analysis), tokens: mechanicTokens(analysis) }));
    return CATALOG.map((constraint) => {
      let score = constraint.baseline ? 2 + Math.min(analyses.length, 5) : 0;
      const evidence = [];
      const matched = new Set();
      const keywords = (constraint.matchAny || []).map((keyword) => String(keyword).toLocaleLowerCase('ko-KR'));
      prepared.forEach(({ analysis, sources, tokens }) => {
        const joined = sources.map((source) => source.text).join(' ').toLocaleLowerCase('ko-KR');
        let localScore = 0;
        keywords.forEach((keyword) => {
          if (tokens.has(keyword)) localScore += 7;
          else if (joined.includes(keyword)) localScore += 4;
        });
        if (!localScore) return;
        score += localScore;
        matched.add(analysis.id);
        sources.forEach((source) => {
          if (evidence.length >= 8) return;
          const lower = source.text.toLocaleLowerCase('ko-KR');
          if (keywords.some((keyword) => lower.includes(keyword))) evidence.push(source);
        });
      });
      return { ...constraint, score, matchedCount: matched.size, evidence, totalCount: analyses.length };
    }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || b.matchedCount - a.matchedCount || CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category));
  }

  const recommendations = buildRecommendations();

  function recommendationReason(item) {
    if (!analyses.length) return '저장된 파티 분석이 없어 공통 기준 제약으로 표시했습니다.';
    if (!item.evidence.length) return `저장된 ${analyses.length}개 파티 전체를 공통 기준으로 비교하기 위한 기본 제약입니다.`;
    const first = item.evidence[0];
    const text = first.text.length > 92 ? `${first.text.slice(0, 89)}…` : first.text;
    return `${analyses.length}개 중 ${item.matchedCount}개 파티에서 관련 경향이 확인되었습니다. ${first.partyNames}의 ${first.label}: “${text}”`;
  }

  function renderRecommendations() {
    const list = document.getElementById('recommendation-list');
    const query = recommendationQuery.toLocaleLowerCase('ko-KR').trim();
    const filtered = recommendations.filter((item) => {
      if (recommendationCategory !== 'all' && item.category !== recommendationCategory) return false;
      const haystack = [item.label, item.feature, item.description, item.impact, recommendationReason(item)].join(' ').toLocaleLowerCase('ko-KR');
      return !query || haystack.includes(query);
    });
    list.innerHTML = filtered.length ? filtered.map((item) => `<article class="recommendation-card" data-category="${esc(item.category)}">
      <header><div><small>${esc(item.category)} CATEGORY</small><h3>${esc(item.label)}</h3></div></header>
      <p>${rich(item.feature)}</p>
      <p class="recommendation-evidence"><strong>추천 근거</strong><br>${esc(recommendationReason(item))}</p>
      <div class="recommendation-meta"><span class="coverage-pill">${item.totalCount ? `${item.totalCount}개 중 ${item.matchedCount}개 파티 영향` : '공통 기준'}</span><button type="button" class="add-recommendation" data-add-recommendation="${esc(item.id)}">마크로 추가</button></div>
    </article>`).join('') : '<div class="recommendation-empty">검색 조건에 맞는 추천 제약이 없습니다.</div>';
    list.querySelectorAll('[data-add-recommendation]').forEach((button) => button.addEventListener('click', () => addRecommendationMarker(button.dataset.addRecommendation)));
    document.getElementById('analysis-count').textContent = `${analyses.length}개 분석`;
  }

  function addRecommendationMarker(id) {
    const item = recommendations.find((entry) => entry.id === id) || CATALOG.find((entry) => entry.id === id);
    if (!item) return;
    const marker = {
      id: uid('constraint'), category: item.category, label: item.label.slice(0, 18), title: item.label,
      description: `${item.feature}\n${item.description}\n예상 영향: ${item.impact}`,
      tier: null, x: .5, y: .5, gridCol: null, gridRow: null, layoutOrder: 0, sourceConstraintId: item.id, isSecondPhase: false,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
    };
    state.markers.push(marker);
    renderMarkers();
    scheduleSave();
    showToast(`추천 제약 “${item.label}”을 미배치 보관함에 추가했습니다.`);
  }

  trayViewToggle.addEventListener('click', () => {
    state.trayViewAll = !state.trayViewAll;
    renderMarkers();
    scheduleSave();
  });

  board.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('[data-marker-id]') && !event.shiftKey) clearMarkerSelection();
  });

  document.getElementById('recommendation-search').addEventListener('input', (event) => {
    recommendationQuery = event.target.value;
    renderRecommendations();
  });
  document.querySelectorAll('#recommendation-filters [data-category]').forEach((button) => button.addEventListener('click', () => {
    recommendationCategory = button.dataset.category;
    document.querySelectorAll('#recommendation-filters [data-category]').forEach((item) => item.classList.toggle('active', item === button));
    renderRecommendations();
  }));

  function renderPlacementList() {
    if (!placementList) return;
    const unplaced = state.markers.filter((marker) => marker.tier == null);
    placementList.innerHTML = CATEGORY_ORDER.map((category) => {
      const markers = unplaced.filter((marker) => marker.category === category);
      return `<section class="placement-category" data-category="${esc(category)}">
        <header><strong>${esc(category)}</strong><span>${markers.length}개</span></header>
        <div class="placement-category-list ${markers.length ? '' : 'empty'}">${markers.length ? markers.map((marker) => `<div class="drawer-marker-row">
          ${markerHtml(marker, 'drawer')}
          <div class="placement-score-buttons" aria-label="${esc(marker.title)} 배치 점수"><button type="button" data-place-marker="${esc(marker.id)}" data-place-tier="1">1점</button><button type="button" data-place-marker="${esc(marker.id)}" data-place-tier="2">2점</button><button type="button" data-place-marker="${esc(marker.id)}" data-place-tier="3">3점</button></div>
        </div>`).join('') : '<p>배치할 제약이 없습니다.</p>'}</div>
      </section>`;
    }).join('');
    placementList.querySelectorAll('[data-place-marker]').forEach((button) => button.addEventListener('click', () => {
      const marker = getMarker(button.dataset.placeMarker);
      const tier = Number(button.dataset.placeTier);
      if (!marker || marker.tier != null) return;
      const placed = placeMarkerInTier(marker.id, tier);
      renderMarkers();
      if (placed) {
        scheduleSave();
        showToast(`${marker.label}을(를) ${tier}점 구역의 빈 칸에 배치했습니다.`);
      } else {
        showToast(`${tier}점 구역에 빈 칸이 없습니다.`);
      }
    }));
  }

  function openPlacementDrawer() {
    renderPlacementList();
    bindMarkerEvents();
    placementDrawer.hidden = false;
    placementDrawerButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('placement-drawer-open');
  }

  function closePlacementDrawer() {
    placementDrawer.hidden = true;
    placementDrawerButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('placement-drawer-open');
  }

  placementDrawerButton.addEventListener('click', () => {
    if (placementDrawer.hidden) openPlacementDrawer();
    else closePlacementDrawer();
  });
  document.querySelectorAll('[data-close-placement-drawer]').forEach((button) => button.addEventListener('click', closePlacementDrawer));

  function syncRelationVisibilityControls() {
    conflictToggle.checked = state.relationVisibility?.conflict !== false;
    synergyToggle.checked = state.relationVisibility?.synergy !== false;
    if (secondPhaseToggle) secondPhaseToggle.checked = state.secondPhaseIncluded !== false;
    if (secondPhaseToggleLabel) secondPhaseToggleLabel.textContent = state.secondPhaseIncluded !== false ? '제약 포함' : '제약 미포함';
  }

  document.querySelectorAll('[data-board-category-filter]').forEach((button) => button.addEventListener('click', () => {
    boardCategoryFilter = button.dataset.boardCategoryFilter || 'all';
    syncBoardFilterButtons();
    applyBoardFilters();
    requestAnimationFrame(renderRelations);
  }));

  document.querySelectorAll('[data-board-score-filter]').forEach((button) => button.addEventListener('click', () => {
    boardScoreFilter = button.dataset.boardScoreFilter || 'all';
    syncBoardFilterButtons();
    applyBoardFilters();
    requestAnimationFrame(renderRelations);
  }));

  conflictToggle.addEventListener('change', () => {
    state.relationVisibility.conflict = conflictToggle.checked;
    renderRelations();
    scheduleSave();
  });

  synergyToggle.addEventListener('change', () => {
    state.relationVisibility.synergy = synergyToggle.checked;
    renderRelations();
    scheduleSave();
  });

  secondPhaseToggle?.addEventListener('change', () => {
    state.secondPhaseIncluded = secondPhaseToggle.checked;
    if (secondPhaseToggleLabel) secondPhaseToggleLabel.textContent = state.secondPhaseIncluded ? '제약 포함' : '제약 미포함';
    pruneInvalidScoreSelections();
    renderMarkers();
    scheduleSave();
    showToast(state.secondPhaseIncluded ? '2차 업데이트 제약을 포함해 표시합니다.' : '2차 업데이트 제약을 미포함 상태로 표시합니다.');
  });

  function nextVersionName() {
    return `v0.${versions.length + 1}`;
  }

  document.getElementById('save-version-button').addEventListener('click', () => {
    document.getElementById('version-name').value = nextVersionName();
    document.getElementById('version-memo').value = '';
    openModal('version-save-modal');
    setTimeout(() => document.getElementById('version-name').focus(), 0);
  });

  document.getElementById('version-save-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('version-name').value.trim();
    const memo = document.getElementById('version-memo').value.trim();
    if (!name) return;
    versions.unshift({ id: uid('version'), name, memo, createdAt: new Date().toISOString(), snapshot: deepClone(state) });
    if (!saveVersions()) return;
    closeModals();
    renderVersions();
    showToast(`“${name}” 버전을 기록했습니다.`);
  });

  function relationCounts(snapshot) {
    return {
      conflict: snapshot.relations.filter((relation) => relation.type === 'conflict').length,
      synergy: snapshot.relations.filter((relation) => relation.type === 'synergy').length,
      normalGroup: (snapshot.groups || []).filter((group) => group.type === 'normal').length,
      gatekeeperGroup: (snapshot.groups || []).filter((group) => group.type === 'gatekeeper').length
    };
  }

  function renderVersions() {
    const list = document.getElementById('version-list');
    list.classList.toggle('empty', versions.length === 0);
    list.innerHTML = versions.map((version) => {
      const counts = relationCounts(version.snapshot);
      return `<article class="version-card ${compareSelection.includes(version.id) ? 'compare-selected' : ''}" data-version-id="${esc(version.id)}">
        <header><h3>${esc(version.name)}</h3><time datetime="${esc(version.createdAt)}">${formatDate(version.createdAt)}</time></header>
        <p>${esc(version.memo || '변경 메모 없음')}</p>
        <div class="version-summary"><span>제약 ${version.snapshot.markers.length}개</span><span>배치 ${version.snapshot.markers.filter((marker) => marker.tier != null).length}개</span><span>충돌 ${counts.conflict}</span><span>시너지 ${counts.synergy}</span><span>묶음 ${counts.normalGroup}</span><span>문지기 ${counts.gatekeeperGroup}</span><span>2차 ${version.snapshot.markers.filter((marker) => marker.isSecondPhase).length}</span></div>
        <div class="version-actions">
          <button type="button" data-preview-version="${esc(version.id)}">미리보기</button>
          <button type="button" data-load-version="${esc(version.id)}">현재 작업판으로 불러오기</button>
          <button type="button" data-export-version="${esc(version.id)}">파일로 내보내기</button>
          <button type="button" class="${compareSelection.includes(version.id) ? 'compare-active' : ''}" data-compare-version="${esc(version.id)}">버전 비교하기</button>
        </div>
      </article>`;
    }).join('');
    document.getElementById('version-count').textContent = `${versions.length}개 버전`;
    list.querySelectorAll('[data-preview-version]').forEach((button) => button.addEventListener('click', () => previewVersion(button.dataset.previewVersion)));
    list.querySelectorAll('[data-load-version]').forEach((button) => button.addEventListener('click', () => loadVersion(button.dataset.loadVersion)));
    list.querySelectorAll('[data-export-version]').forEach((button) => button.addEventListener('click', () => exportVersion(button.dataset.exportVersion)));
    list.querySelectorAll('[data-compare-version]').forEach((button) => button.addEventListener('click', () => selectCompareVersion(button.dataset.compareVersion)));
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(date);
  }

  function miniBoard(snapshot) {
    return `<div class="mini-board-scroll"><div class="mini-board">${[1, 2, 3].map((tier) => `<div class="mini-score-row"><b>${tier}★</b>${snapshot.markers.filter((marker) => marker.tier === tier).map((marker) => `<span class="mini-marker" data-category="${esc(marker.category)}" style="left:${5 + marker.x * 92}%;top:${marker.y * 100}%">${rich(marker.label)}</span>`).join('')}</div>`).join('')}</div></div>`;
  }

  function previewVersion(id) {
    const version = versions.find((item) => item.id === id);
    if (!version) return;
    const counts = relationCounts(version.snapshot);
    document.getElementById('preview-title').textContent = version.name;
    document.getElementById('preview-content').innerHTML = `<div class="preview-meta"><span>${formatDate(version.createdAt)}</span><span>제약 ${version.snapshot.markers.length}개</span><span>충돌 ${counts.conflict}</span><span>시너지 ${counts.synergy}</span><span>묶음 ${counts.normalGroup}</span><span>문지기 ${counts.gatekeeperGroup}</span><span>2차 ${version.snapshot.markers.filter((marker) => marker.isSecondPhase).length}</span></div><p class="preview-memo">${esc(version.memo || '변경 메모 없음')}</p>${miniBoard(version.snapshot)}`;
    openModal('preview-modal');
  }

  function loadVersion(id) {
    const version = versions.find((item) => item.id === id);
    if (!version) return;
    if (!window.confirm(`“${version.name}” 버전을 현재 작업판으로 불러올까요? 현재 작업 상태는 자동 저장본에서 이 버전 상태로 바뀝니다.`)) return;
    state = normalizeState(deepClone(version.snapshot));
    clearMarkerSelection();
    scoreSelectedMarkerIds.clear();
    updateScoreSelectionUi();
    state.updatedAt = new Date().toISOString();
    syncRelationVisibilityControls();
    renderMarkers();
    scheduleSave();
    showToast(`“${version.name}” 버전을 현재 작업판으로 불러왔습니다.`);
  }

  function safeFilename(value) {
    return String(value || 'constraint-version').replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, '-').slice(0, 80);
  }

  function downloadJson(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportVersion(id) {
    const version = versions.find((item) => item.id === id);
    if (!version) return;
    downloadJson(`${safeFilename(version.name)}.json`, {
      schemaVersion: 1,
      exportType: 'endfield-constraint-board-version',
      exportedAt: new Date().toISOString(),
      version: deepClone(version)
    });
    showToast(`“${version.name}” 버전을 JSON 파일로 내보냈습니다.`);
  }

  function selectCompareVersion(id) {
    if (compareSelection.includes(id)) compareSelection = compareSelection.filter((item) => item !== id);
    else compareSelection = [...compareSelection.slice(-1), id];
    renderVersions();
    if (compareSelection.length === 1) showToast('비교할 다른 버전의 ‘버전 비교하기’를 누르세요.');
    if (compareSelection.length === 2) {
      const [firstId, secondId] = compareSelection;
      compareVersions(firstId, secondId);
      compareSelection = [];
      renderVersions();
    }
  }

  function relationKey(relation) {
    return `${[relation.a, relation.b].sort().join('|')}|${relation.type}`;
  }

  function groupKey(group) {
    return `${groupSignature(group.markerIds)}|group:${group.type}`;
  }

  function compareVersions(firstId, secondId) {
    const first = versions.find((item) => item.id === firstId);
    const second = versions.find((item) => item.id === secondId);
    if (!first || !second) return;
    const before = first.snapshot;
    const after = second.snapshot;
    const beforeMap = new Map(before.markers.map((marker) => [marker.id, marker]));
    const afterMap = new Map(after.markers.map((marker) => [marker.id, marker]));
    const added = after.markers.filter((marker) => !beforeMap.has(marker.id)).map((marker) => marker.title);
    const removed = before.markers.filter((marker) => !afterMap.has(marker.id)).map((marker) => marker.title);
    const changed = [];
    after.markers.forEach((marker) => {
      const old = beforeMap.get(marker.id);
      if (!old) return;
      const parts = [];
      if (old.tier !== marker.tier) parts.push(`${old.tier == null ? '미배치' : `${old.tier}점`} → ${marker.tier == null ? '미배치' : `${marker.tier}점`}`);
      if (old.category !== marker.category) parts.push(`카테고리 ${old.category} → ${marker.category}`);
      if (Boolean(old.isSecondPhase) !== Boolean(marker.isSecondPhase)) parts.push(marker.isSecondPhase ? '2차 제약 지정' : '2차 제약 해제');
      if (old.label !== marker.label || old.title !== marker.title || old.description !== marker.description) parts.push('텍스트 수정');
      if (old.tier === marker.tier && marker.tier != null && (Math.abs(old.x - marker.x) > .015 || Math.abs(old.y - marker.y) > .015)) parts.push('위치 이동');
      if (parts.length) changed.push(`${marker.title}: ${parts.join(', ')}`);
    });
    const beforeRelations = new Set(before.relations.map(relationKey));
    const afterRelations = new Set(after.relations.map(relationKey));
    const relationLabel = (key, snapshot) => {
      const [pair, type] = [key.slice(0, key.lastIndexOf('|')), key.slice(key.lastIndexOf('|') + 1)];
      const [a, b] = pair.split('|');
      const markerA = snapshot.markers.find((marker) => marker.id === a) || before.markers.find((marker) => marker.id === a) || after.markers.find((marker) => marker.id === a);
      const markerB = snapshot.markers.find((marker) => marker.id === b) || before.markers.find((marker) => marker.id === b) || after.markers.find((marker) => marker.id === b);
      return `${markerA?.title || '삭제된 제약'} ↔ ${markerB?.title || '삭제된 제약'} (${type === 'conflict' ? '충돌' : '시너지'})`;
    };
    const relationAdded = [...afterRelations].filter((key) => !beforeRelations.has(key)).map((key) => relationLabel(key, after));
    const relationRemoved = [...beforeRelations].filter((key) => !afterRelations.has(key)).map((key) => relationLabel(key, before));
    const beforeGroups = new Set((before.groups || []).map(groupKey));
    const afterGroups = new Set((after.groups || []).map(groupKey));
    const groupLabel = (key, snapshot) => {
      const splitAt = key.lastIndexOf('|group:');
      const ids = key.slice(0, splitAt).split('|');
      const type = key.slice(splitAt + 7);
      const labels = ids.map((id) => snapshot.markers.find((marker) => marker.id === id)?.title || '삭제된 제약').join(' · ');
      return `${labels} (${type === 'gatekeeper' ? '문지기 묶음' : '일반 묶음'})`;
    };
    relationAdded.push(...[...afterGroups].filter((key) => !beforeGroups.has(key)).map((key) => groupLabel(key, after)));
    relationRemoved.push(...[...beforeGroups].filter((key) => !afterGroups.has(key)).map((key) => groupLabel(key, before)));

    const group = (title, items) => `<section class="compare-group ${items.length ? '' : 'empty'}"><h3>${esc(title)} · ${items.length}</h3><ul>${items.length ? items.map((item) => `<li>${esc(item)}</li>`).join('') : '<li>변경 없음</li>'}</ul></section>`;
    document.getElementById('compare-content').innerHTML = `<div class="compare-head"><div class="compare-version"><small>기준 버전</small><strong>${esc(first.name)}</strong></div><div class="compare-arrow">→</div><div class="compare-version"><small>비교 버전</small><strong>${esc(second.name)}</strong></div></div><div class="compare-groups">${group('추가된 제약', added)}${group('제거된 제약', removed)}${group('변경된 제약', changed)}${group('추가된 관계', relationAdded)}${group('해제된 관계', relationRemoved)}</div>`;
    openModal('compare-modal');
  }

  function renderAll() {
    syncRelationVisibilityControls();
    syncBoardFilterButtons();
    renderMarkers();
    renderRecommendations();
    renderVersions();
    setAutosave('saved', '자동 저장 완료');
  }

  window.addEventListener('resize', () => requestAnimationFrame(() => {
    syncBoardControlAlignment();
    syncManagementPanelAlignment();
    renderRelations();
  }));
  document.getElementById('constraint-board-scroll').addEventListener('scroll', () => {
    hideTooltip();
    closeRelationMenu();
  });

  setupCollapsiblePanels();
  if (window.ResizeObserver) {
    const description = document.getElementById('marker-description');
    if (description) new ResizeObserver(() => requestAnimationFrame(syncManagementPanelAlignment)).observe(description);
  }
  if (document.fonts?.ready) document.fonts.ready.then(() => requestAnimationFrame(() => {
    syncBoardControlAlignment();
    syncManagementPanelAlignment();
    renderRelations();
  }));
  renderAll();
})();
