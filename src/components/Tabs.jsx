function Tabs({ tabs, selectedTab, onTabChange }) {
  return (
    <div className="flex gap-2 justify-between">
      {tabs.map((group, groupIdx) => (
        <div
          key={groupIdx}
          role="tablist"
          className={`tabs tabs-boxed ${group.className ?? ""}`}
        >
          {group.children.map((tab) => (
            <a
              key={tab.id}
              role="tab"
              className={`tab ${selectedTab === tab.id ? "tab-active" : ""} font-semibold ${tab.className ?? ""}`}
              onClick={() => onTabChange(tab)}
            >
              {tab.caption}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
