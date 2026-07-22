(function () {
  'use strict';

  const STORAGE_KEY = 'endfield.partyAnalyses.v1';

  function safeParse(value, fallback) {
    try { return JSON.parse(value); } catch (_) { return fallback; }
  }

  function loadLocal() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      const parsed = value ? safeParse(value, []) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveLocal(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return true;
    } catch (_) {
      return false;
    }
  }

  function bundled() {
    return Array.isArray(window.SAVED_PARTY_ANALYSES) ? window.SAVED_PARTY_ANALYSES : [];
  }

  function normalizeId(item) {
    if (item?.id) return String(item.id);
    const ids = (item?.party || []).map((member) => member.id || member.name).filter(Boolean);
    return ids.length ? `party-${ids.join('-')}` : `party-${Date.now()}`;
  }

  function getAll() {
    const map = new Map();
    [...bundled(), ...loadLocal()].forEach((item) => {
      if (!item || typeof item !== 'object') return;
      map.set(normalizeId(item), item);
    });
    return [...map.values()].sort((left, right) => String(right.exportedAt || '').localeCompare(String(left.exportedAt || '')));
  }

  function upsert(item) {
    if (!item || typeof item !== 'object') return false;
    const id = normalizeId(item);
    item.id = id;
    const items = loadLocal();
    const index = items.findIndex((entry) => normalizeId(entry) === id);
    if (index >= 0) items[index] = item;
    else items.unshift(item);
    return saveLocal(items.slice(0, 100));
  }

  function find(id) {
    return getAll().find((item) => normalizeId(item) === String(id || '')) || null;
  }

  window.AnalysisStore = { STORAGE_KEY, getAll, upsert, find, loadLocal };
})();
