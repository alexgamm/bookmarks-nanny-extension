import Tabs from "./components/Tabs.jsx";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import DeadLinksPage from "./pages/DeadLinksPage.jsx";
import AbandonedSitesPage from "./pages/AbandonedSitesPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

function App() {
  const tabs = [
    {
      className: "w-full grid-cols-2",
      children: [
        {
          id: "dead-links",
          caption: "Dead bookmarks",
          content: <DeadLinksPage />,
        },
        {
          id: "abandoned-sites",
          caption: "Abandoned sites",
          content: <AbandonedSitesPage />,
        },
      ],
    },
    {
      className: "w-11",
      children: [
        {
          id: "settings",
          caption: <FontAwesomeIcon icon={faGears} />,
          className: "p-0",
          content: <SettingsPage />,
        },
      ],
    },
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0].children[0].id);
  const selectedTabContent = tabs
    .map((group) => group.children.find((tab) => tab.id === selectedTab))
    .find((tab) => !!tab)?.content;

  return (
    <div style={{ width: "400px", height: "600px" }} className="p-3 flex flex-col">
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={(tab) => setSelectedTab(tab.id)}
      />
      {selectedTabContent}
    </div>
  );
}

export default App;
