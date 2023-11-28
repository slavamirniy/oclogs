import React, { useEffect, useState } from 'react';
import Tab from './Tab';
import LogViewer from './LogViewer';
import LogTreeView from './LogTreeView';
import { LogNode, parseUnityLog } from './Parsers';
import { unity } from './exampledata';

async function getLogById(id: number, logtype: 'unity' | 'unity2' | 'max'): Promise<LogNode[]> {
  // return parseUnityLog(unity);
  try {
    const log = await fetch(`./getoclog?type=${logtype}&file=${id}`)
    return parseUnityLog(await log.text())
  }
  catch {
    return []
  }
}

function ContentArea({ choosedImage }) {
  const [activeTab, setActiveTab] = useState(1);
  const [logNodes, setLogNodes] = useState<LogNode[]>([]);
  const [filter, setFilter] = useState('');
  const [reverseOrder, setReverseOrder] = useState(false);

  useEffect(() => {
    async function fetchLog() {
      const logType = activeTab === 1 ? 'max' : activeTab === 2 ? 'unity' : 'unity2'; // Измените в соответствии с вашей логикой
      const fetchedLogNodes = await getLogById(choosedImage, logType);
      setLogNodes(reverseOrder ? fetchedLogNodes.reverse() : fetchedLogNodes);
    }

    if (choosedImage !== -1) {
      fetchLog();
    }
  }, [choosedImage, activeTab, reverseOrder]); // Перезапрашиваем логи при изменении choosedImage или activeTab

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  if (choosedImage === -1) return <></>;

  return (
    <div className="content-area">
      <div className="tabs">
        <Tab id={1} active={activeTab === 1} onChange={() => handleTabChange(1)} title="3Ds Max" />
        <Tab id={2} active={activeTab === 2} onChange={() => handleTabChange(2)} title="Unity" />
        <Tab id={3} active={activeTab === 3} onChange={() => handleTabChange(3)} title="Unity2" />
      </div>
      <input
        type="text"
        placeholder="Search logs..."
        className="search-box"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="log-options">
        <input
          type="checkbox"
          checked={reverseOrder}
          onChange={(e) => setReverseOrder(e.target.checked)}
        />
        <label>Отображать логи в обратном порядке</label>
      </div>
      <LogTreeView nodes={logNodes} filter={filter} />
    </div>
  );

}

export default ContentArea;