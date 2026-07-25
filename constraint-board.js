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
  const clearSelectionButton = document.getElementById('clear-marker-selection');
  const scoreSelectionTotal = document.getElementById('score-selection-total');
  const scoreSelectionValue = document.getElementById('score-selection-value');
  const conflictToggle = document.getElementById('toggle-conflict-lines');
  const synergyToggle = document.getElementById('toggle-synergy-lines');
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
      relationVisibility: { conflict: true, synergy: true },
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
      gridRow: Number.isFinite(Number(item.gridRow)) ? Math.max(0, Math.round(Number(item.gridRow))) : null,
      layoutOrder: Number.isFinite(Number(item.layoutOrder)) ? Number(item.layoutOrder) : index,
      sourceConstraintId: item.sourceConstraintId ? String(item.sourceConstraintId) : null,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || item.createdAt || new Date().toISOString()
    })) : [];
    const ids = new Set(markers.map((item) => item.id));
    const relations = Array.isArray(source.relations) ? source.relations.filter((item) => ids.has(item.a) && ids.has(item.b) && item.a !== item.b && ['conflict', 'synergy'].includes(item.type)).map((item) => ({
      id: String(item.id || uid('relation')),
      a: String(item.a), b: String(item.b), type: item.type,
      createdAt: item.createdAt || new Date().toISOString()
    })) : [];
    return {
      schemaVersion: 1,
      projectId: String(source.projectId || uid('constraint-project')),
      markers,
      relations,
      relationVisibility: {
        conflict: source.relationVisibility?.conflict !== false,
        synergy: source.relationVisibility?.synergy !== false
      },
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

  function markerHtml(marker, location) {
    const isBoard = location === 'board';
    const className = isBoard ? 'board-marker' : `tray-marker ${location === 'drawer' ? 'drawer-marker' : ''}`.trim();
    const style = isBoard ? `left:${marker.x * 100}%;top:${marker.y * 100}%` : '';
    const selectedClass = selectedMarkerIds.has(marker.id) ? ' is-selected' : '';
    const scoreSelectedClass = isBoard && scoreSelectedMarkerIds.has(marker.id) ? ' is-score-selected' : '';
    const placementBadge = !isBoard && marker.tier != null ? `<span class="marker-placement-badge">${marker.tier}점</span>` : '';
    return `<article class="${className}${selectedClass}${scoreSelectedClass}" data-marker-id="${esc(marker.id)}" data-marker-location="${esc(location)}" data-category="${esc(marker.category)}" style="${style}" tabindex="0" aria-selected="${selectedMarkerIds.has(marker.id)}" data-score-selected="${isBoard && scoreSelectedMarkerIds.has(marker.id)}" aria-label="${esc(marker.category)} 제약 ${esc(marker.title)}">
      <span class="marker-category">${esc(marker.category)}</span>
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
    return categoryMatches && scoreMatches;
  }

  function applyBoardFilters() {
    let visibleCount = 0;
    tierZones.forEach((zone) => {
      const tier = Number(zone.dataset.tier);
      const row = zone.closest('.score-row');
      const scoreRowVisible = boardScoreFilter === 'all' || tier === Number(boardScoreFilter);
      row.classList.toggle('is-score-filtered-out', !scoreRowVisible);
      const allMarkers = sortedTierMarkers(tier);
      allMarkers.forEach((marker) => {
        const element = zone.querySelector(`[data-marker-id="${CSS.escape(marker.id)}"]`);
        if (!element) return;
        const hidden = !scoreRowVisible || !markerMatchesBoardFilter(marker);
        element.classList.toggle('is-board-filtered-out', hidden);
        element.setAttribute('aria-hidden', String(hidden));
        if (!hidden) visibleCount += 1;
      });
    });
    if (boardFilterCount) boardFilterCount.textContent = `표시 ${visibleCount}개`;
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
    requestAnimationFrame(renderRelations);
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
          toggleMarkerSelection(element.dataset.markerId);
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
    clearSelectionButton.hidden = count === 0;
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

  function cancelPendingScoreSelection() {
    window.clearTimeout(pendingScoreSelectionTimer);
    pendingScoreSelectionTimer = null;
    pendingScoreSelectionId = null;
  }

  function updateScoreSelectionUi() {
    [...scoreSelectedMarkerIds].forEach((id) => {
      const marker = getMarker(id);
      if (!marker || marker.tier == null) scoreSelectedMarkerIds.delete(id);
    });
    document.querySelectorAll('.board-marker[data-marker-id]').forEach((element) => {
      const selected = scoreSelectedMarkerIds.has(element.dataset.markerId);
      element.classList.toggle('is-score-selected', selected);
      element.dataset.scoreSelected = String(selected);
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
    if (scoreSelectedMarkerIds.has(marker.id)) scoreSelectedMarkerIds.delete(marker.id);
    else scoreSelectedMarkerIds.add(marker.id);
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
    tooltip.innerHTML = `<small style="color:var(--cat-${CATEGORY_CLASS[marker.category]})">${esc(marker.category)} CATEGORY</small><strong>${esc(marker.title)}</strong><p>${rich(marker.description || '설명이 없습니다.')}</p>`;
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
    const fallbackOrder = Math.max(0, Number(marker.layoutOrder) || 0);
    const gridCol = Number.isFinite(Number(marker.gridCol))
      ? clamp(Math.round(Number(marker.gridCol)), 0, BOARD_GRID_COLUMNS - 1)
      : clamp(Math.floor(clamp(Number(marker.x) || .5, 0, .9999) * BOARD_GRID_COLUMNS), 0, BOARD_GRID_COLUMNS - 1);
    const gridRow = Number.isFinite(Number(marker.gridRow))
      ? Math.max(0, Math.round(Number(marker.gridRow)))
      : Math.floor(fallbackOrder / BOARD_GRID_COLUMNS);
    return { row: gridRow, col: gridCol };
  }

  function findNearestFreeSlot(occupied, targetCol, targetRow = 0) {
    const col = clamp(Math.round(Number(targetCol) || 0), 0, BOARD_GRID_COLUMNS - 1);
    const row = Math.max(0, Math.round(Number(targetRow) || 0));
    if (!occupied.has(slotKey(row, col))) return { row, col };
    const maxRow = Math.max(row + 3, ...[...occupied].map((key) => Number(key.split(':')[0]) || 0)) + 2;
    for (let distance = 1; distance <= BOARD_GRID_COLUMNS + maxRow; distance += 1) {
      const candidates = [];
      for (let rowOffset = -distance; rowOffset <= distance; rowOffset += 1) {
        const candidateRow = row + rowOffset;
        if (candidateRow < 0 || candidateRow > maxRow) continue;
        const colDistance = distance - Math.abs(rowOffset);
        [col - colDistance, col + colDistance].forEach((candidateCol) => {
          if (candidateCol < 0 || candidateCol >= BOARD_GRID_COLUMNS) return;
          candidates.push({ row: candidateRow, col: candidateCol });
        });
      }
      candidates.sort((a, b) => Math.abs(a.row - row) - Math.abs(b.row - row) || Math.abs(a.col - col) - Math.abs(b.col - col) || a.row - b.row || a.col - b.col);
      const free = candidates.find((candidate) => !occupied.has(slotKey(candidate.row, candidate.col)));
      if (free) return free;
    }
    return { row: maxRow + 1, col: 0 };
  }

  function reflowTier(tier) {
    const markers = sortedTierMarkers(tier);
    const zone = tierZones.find((item) => Number(item.dataset.tier) === Number(tier));
    const rowElement = zone?.closest('.score-row');
    const occupied = new Set();
    markers.forEach((marker) => {
      const desired = inferredSlot(marker);
      const slot = findNearestFreeSlot(occupied, desired.col, desired.row);
      occupied.add(slotKey(slot.row, slot.col));
      marker.gridCol = slot.col;
      marker.gridRow = slot.row;
      marker.layoutOrder = slot.row * BOARD_GRID_COLUMNS + slot.col;
    });
    const maxRow = markers.reduce((max, marker) => Math.max(max, Number(marker.gridRow) || 0), 0);
    const rowHeight = maxRow === 0 ? 190 : Math.max(190, (maxRow + 1) * 100 + 20);
    if (rowElement) rowElement.style.height = `${rowHeight}px`;
    markers.forEach((marker) => {
      marker.x = (marker.gridCol + .5) / BOARD_GRID_COLUMNS;
      marker.y = maxRow === 0 ? .5 : (60 + marker.gridRow * 100) / rowHeight;
    });
  }

  function reflowAllTiers() {
    [1, 2, 3].forEach(reflowTier);
  }

  function dropSlotForPoint(zone, x, y, markerIds) {
    const rect = zone.getBoundingClientRect();
    const excluded = new Set((Array.isArray(markerIds) ? markerIds : [markerIds]).map(String));
    const current = sortedTierMarkers(Number(zone.dataset.tier)).filter((marker) => !excluded.has(marker.id));
    const maxRow = current.reduce((max, marker) => Math.max(max, Number(marker.gridRow) || 0), 0);
    const rowCount = Math.max(1, maxRow + 1);
    const col = clamp(Math.floor(((x - rect.left) / Math.max(1, rect.width)) * BOARD_GRID_COLUMNS), 0, BOARD_GRID_COLUMNS - 1);
    const row = rowCount === 1
      ? 0
      : clamp(Math.floor(((y - rect.top) / Math.max(1, rect.height)) * rowCount), 0, rowCount - 1);
    return { row, col };
  }

  function placeMarkersAtSlot(markerIds, tier, targetCol, targetRow = 0) {
    const ids = [...new Set(markerIds.map(String))];
    const moving = orderedMarkers(ids);
    if (!moving.length) return false;
    const oldTiers = new Set(moving.map((marker) => marker.tier).filter((value) => value != null));
    const idSet = new Set(ids);
    const destination = sortedTierMarkers(tier).filter((marker) => !idSet.has(marker.id));
    const occupied = new Set(destination.map((marker) => {
      const slot = inferredSlot(marker);
      return slotKey(slot.row, slot.col);
    }));
    moving.forEach((marker, index) => {
      const linear = Math.max(0, targetRow) * BOARD_GRID_COLUMNS + Math.max(0, targetCol) + index;
      const desiredRow = Math.floor(linear / BOARD_GRID_COLUMNS);
      const desiredCol = linear % BOARD_GRID_COLUMNS;
      const slot = findNearestFreeSlot(occupied, desiredCol, desiredRow);
      occupied.add(slotKey(slot.row, slot.col));
      marker.tier = Number(tier);
      marker.gridCol = slot.col;
      marker.gridRow = slot.row;
      marker.layoutOrder = slot.row * BOARD_GRID_COLUMNS + slot.col;
      marker.updatedAt = new Date().toISOString();
    });
    oldTiers.forEach((oldTier) => { if (oldTier !== Number(tier)) reflowTier(oldTier); });
    reflowTier(tier);
    return true;
  }

  function placeMarkersInTier(markerIds, tier) {
    reflowTier(tier);
    const movingIds = new Set(markerIds.map(String));
    const occupied = new Set(sortedTierMarkers(tier)
      .filter((marker) => !movingIds.has(marker.id))
      .map((marker) => slotKey(Number(marker.gridRow) || 0, Number(marker.gridCol) || 0)));
    const first = findNearestFreeSlot(occupied, 0, 0);
    return placeMarkersAtSlot(markerIds, tier, first.col, first.row);
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
    interaction = {
      markerId: marker.id,
      markerIds,
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
    tierZones.forEach((zone) => zone.classList.remove('drag-over'));
    boardDropHint.classList.remove('active');
    document.removeEventListener('pointermove', onGlobalPointerMove);
    interaction = null;
  }

  function startDragGhost(markerId, x, y) {
    const marker = getMarker(markerId);
    if (!marker || !interaction) return;
    const count = interaction.markerIds.length;
    const ghost = document.createElement('article');
    ghost.className = `drag-ghost ${count > 1 ? 'multi-drag-ghost' : ''}`;
    ghost.dataset.category = marker.category;
    ghost.innerHTML = `<span class="marker-category">${esc(marker.category)}</span><div class="marker-label">${rich(marker.label)}</div>${count > 1 ? `<b class="drag-count-badge">+${count - 1}</b>` : ''}`;
    document.body.appendChild(ghost);
    interaction.ghost = ghost;
    interaction.fadedElements = [...document.querySelectorAll('[data-marker-id]')].filter((element) => interaction.markerIds.includes(element.dataset.markerId));
    interaction.fadedElements.forEach((element) => { element.style.opacity = '.28'; });
    updateDragGhost(x, y);
  }

  function updateDragGhost(x, y) {
    if (!interaction?.ghost) return;
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
    tierZones.forEach((item) => item.classList.toggle('drag-over', item === zone));
    const boardRect = board.getBoundingClientRect();
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
      const tier = Number(zone.dataset.tier);
      const slot = dropSlotForPoint(zone, x, y, movingIds);
      placeMarkersAtSlot(movingIds, tier, slot.col, slot.row);
      showToast(movingIds.length > 1 ? `${movingIds.length}개 제약을 ${tier}점 구역의 선택한 위치에 함께 배치했습니다.` : `${tier}점 구역의 선택한 위치에 배치했습니다.`);
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
    renderRelations();
    scheduleSave();
    showToast(`${label} 관계를 기록했습니다.`);
  }

  function markerCenter(id) {
    const element = document.querySelector(`.board-marker[data-marker-id="${CSS.escape(id)}"]`);
    if (!element || element.classList.contains('is-board-filtered-out') || element.closest('.score-row')?.classList.contains('is-score-filtered-out')) return null;
    const boardRect = board.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    return { x: rect.left - boardRect.left + rect.width / 2, y: rect.top - boardRect.top + rect.height / 2 };
  }

  function svgLine(x1, y1, x2, y2, attrs = '') {
    return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" ${attrs}></line>`;
  }

  function doubleLinePoints(a, b, offset) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.max(1, Math.hypot(dx, dy));
    const px = -dy / length * offset;
    const py = dx / length * offset;
    return [{ x: a.x + px, y: a.y + py }, { x: b.x + px, y: b.y + py }];
  }

  function renderRelations() {
    const visible = state.relations.filter((relation) => state.relationVisibility?.[relation.type] !== false && markerMatchesBoardFilter(getMarker(relation.a)) && markerMatchesBoardFilter(getMarker(relation.b)));
    let html = '';
    visible.forEach((relation) => {
      const a = markerCenter(relation.a);
      const b = markerCenter(relation.b);
      if (!a || !b) return;
      html += svgLine(a.x, a.y, b.x, b.y, `class="relation-hit" data-relation-id="${esc(relation.id)}"`);
      if (relation.type === 'conflict') {
        html += svgLine(a.x, a.y, b.x, b.y, 'class="relation-visible" stroke="#e14343" stroke-width="3" stroke-linecap="round"');
      } else {
        const top = doubleLinePoints(a, b, 3.2);
        const bottom = doubleLinePoints(a, b, -3.2);
        html += svgLine(top[0].x, top[0].y, top[1].x, top[1].y, 'class="relation-visible" stroke="#d9ac32" stroke-width="2.5" stroke-linecap="round"');
        html += svgLine(bottom[0].x, bottom[0].y, bottom[1].x, bottom[1].y, 'class="relation-visible" stroke="#d9ac32" stroke-width="2.5" stroke-linecap="round"');
      }
    });
    if (aim) {
      const source = markerCenter(aim.sourceId);
      const boardRect = board.getBoundingClientRect();
      const target = { x: aim.x - boardRect.left, y: aim.y - boardRect.top };
      if (source) {
        if (aim.type === 'conflict') {
          html += svgLine(source.x, source.y, target.x, target.y, 'stroke="#e14343" stroke-width="3" stroke-linecap="round" stroke-dasharray="9 5"');
        } else {
          const one = doubleLinePoints(source, target, 3.2);
          const two = doubleLinePoints(source, target, -3.2);
          html += svgLine(one[0].x, one[0].y, one[1].x, one[1].y, 'stroke="#d9ac32" stroke-width="2.5" stroke-linecap="round"');
          html += svgLine(two[0].x, two[0].y, two[1].x, two[1].y, 'stroke="#d9ac32" stroke-width="2.5" stroke-linecap="round"');
        }
      }
    }
    relationLayer.innerHTML = html;
    relationLayer.querySelectorAll('[data-relation-id]').forEach((line) => line.addEventListener('click', (event) => {
      event.stopPropagation();
      openRelationMenu(line.dataset.relationId, event.clientX, event.clientY);
    }));
  }

  function openRelationMenu(id, x, y) {
    const relation = state.relations.find((item) => item.id === id);
    if (!relation) return;
    activeRelationId = id;
    const a = getMarker(relation.a);
    const b = getMarker(relation.b);
    const type = relation.type === 'conflict' ? '충돌 관계' : '시너지 관계';
    document.getElementById('relation-menu-title').textContent = `${type}: ${a?.label || '?'} ↔ ${b?.label || '?'}`;
    relationMenu.hidden = false;
    relationMenu.style.left = `${clamp(x + 8, 10, window.innerWidth - 180)}px`;
    relationMenu.style.top = `${clamp(y + 8, 10, window.innerHeight - 90)}px`;
  }

  function closeRelationMenu() {
    relationMenu.hidden = true;
    activeRelationId = null;
  }

  document.getElementById('remove-relation-button').addEventListener('click', () => {
    if (!activeRelationId) return;
    const relation = state.relations.find((item) => item.id === activeRelationId);
    const label = relation?.type === 'synergy' ? '시너지' : '충돌';
    state.relations = state.relations.filter((item) => item.id !== activeRelationId);
    closeRelationMenu();
    renderRelations();
    scheduleSave();
    showToast(`${label} 관계를 해제했습니다.`);
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('#relation-menu') && !event.target.closest('.relation-hit')) closeRelationMenu();
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
      sourceConstraintId: null,
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
    if (!window.confirm(`“${marker.title}” 제약을 완전히 삭제할까요? 연결된 충돌·시너지 관계도 함께 삭제됩니다.`)) return;
    state.markers = state.markers.filter((item) => item.id !== id);
    selectedMarkerIds.delete(id);
    scoreSelectedMarkerIds.delete(id);
    state.relations = state.relations.filter((relation) => relation.a !== id && relation.b !== id);
    closeModals();
    renderMarkers();
    scheduleSave();
    showToast('제약 마크와 연결 관계를 완전히 삭제했습니다.');
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
      tier: null, x: .5, y: .5, gridCol: null, gridRow: null, layoutOrder: 0, sourceConstraintId: item.id,
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

  clearSelectionButton.addEventListener('click', clearMarkerSelection);
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
      placeMarkerInTier(marker.id, tier);
      renderMarkers();
      scheduleSave();
      showToast(`${marker.label}을(를) ${tier}점 구역에 배치했습니다.`);
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
      synergy: snapshot.relations.filter((relation) => relation.type === 'synergy').length
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
        <div class="version-summary"><span>제약 ${version.snapshot.markers.length}개</span><span>배치 ${version.snapshot.markers.filter((marker) => marker.tier != null).length}개</span><span>충돌 ${counts.conflict}</span><span>시너지 ${counts.synergy}</span></div>
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
    document.getElementById('preview-content').innerHTML = `<div class="preview-meta"><span>${formatDate(version.createdAt)}</span><span>제약 ${version.snapshot.markers.length}개</span><span>충돌 ${counts.conflict}</span><span>시너지 ${counts.synergy}</span></div><p class="preview-memo">${esc(version.memo || '변경 메모 없음')}</p>${miniBoard(version.snapshot)}`;
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

  window.addEventListener('resize', () => requestAnimationFrame(renderRelations));
  document.getElementById('constraint-board-scroll').addEventListener('scroll', () => {
    hideTooltip();
    closeRelationMenu();
  });

  renderAll();
})();
