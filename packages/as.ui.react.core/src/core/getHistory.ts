import { createHashHistory, History } from 'history';

const historyStore: { history: History | null } = { history: null };

const getHistoryInstance = (customHistory?: History) => {
  const history = customHistory || createHashHistory();

  if (history) {
    historyStore.history = history;
  }

  return history;
};

const getStoredHistoryInstance = () => historyStore.history;

export { getHistoryInstance, getStoredHistoryInstance };
