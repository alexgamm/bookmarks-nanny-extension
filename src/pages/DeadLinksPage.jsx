import AnimatedPulseIcon from "../icons/AnimatedPulseIcon.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import table from "../components/BookmarksTable.jsx";
import BookmarksTable from "../components/BookmarksTable.jsx";

function DeadLinksPage() {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState();
  const [[checked, all], setProgress] = useState([]);

  async function loadDeadLinks() {
    setLoading(true);
    const bookmarks = await chrome.runtime.sendMessage({
      request: "getBookmarks",
    });
    setProgress([0, bookmarks.length]);
    await Promise.all(
      bookmarks.map(async (bookmark) => {
        bookmark.status = await chrome.runtime.sendMessage({
          request: "getBookmarkStatus",
          url: bookmark.url,
        });
        bookmark.domain = new URL(bookmark.url).host;
        //  setCheckedBookmarksCount((count) => count + 1);
        setProgress(([checked]) => [checked + 1, bookmarks.length]);
      }),
    );
    const grouped = Object.groupBy(
      bookmarks.filter(({ status }) => status !== "ok"),
      ({ parentTitle }) => parentTitle,
    );
    setGroups(
      Object.entries(grouped).map(([name, bookmarks]) => ({ name, bookmarks })),
    );
    setLoading(false);
  }

  function removeLinks(bookmarksIds) {
    console.log(bookmarksIds);
  }

  return (
    <>
      <button
        className="btn btn-active mt-4 min-h-0 h-12 text-base justify-center items-center gap-2"
        onClick={loadDeadLinks}
        disabled={loading}
      >
        <AnimatedPulseIcon />
        Check health
      </button>
      {loading && (
        <div className="flex justify-center items-center h-full">
          <div
            className="radial-progress bg-neutral text-base text-primary border-8 border-neutral"
            style={{
              "--value": (checked / all) * 100,
              "--size": "12rem",
              "--thickness": "0.8rem",
            }}
            role="progressbar"
          >
            {checked}/{all}
          </div>
        </div>
      )}
      {groups?.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <div className="text-primary text-lg">No dead links found.</div>
        </div>
      )}
      {groups?.length && (
        <BookmarksTable
          groups={groups}
          onRemove={removeLinks}
          additionalCells={[
            (bookmark) => (
              <td>
                <div className="badge badge-secondary w-11">
                  {bookmark.status}
                </div>
              </td>
            ),
          ]}
        />
      )}
    </>
  );
}

export default DeadLinksPage;
