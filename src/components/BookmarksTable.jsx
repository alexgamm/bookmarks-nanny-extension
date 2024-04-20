import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";

function BookmarksTable({ groups, onRemove, additionalCells }) {
  const [selectedBookmarksIds, setSelectedBookmarksIds] = useState([]);
  const allBookmarksIds = useMemo(
    () => groups?.flatMap((group) => group.bookmarks.map(({ id }) => id)),
    [groups],
  );

  function selectIds(ids) {
    setSelectedBookmarksIds((selectedIds) => [
      ...selectedIds,
      ...ids.filter((id) => !selectedIds.includes(id)),
    ]);
  }

  function unselectIds(ids) {
    setSelectedBookmarksIds((selectedIds) =>
      selectedIds.filter((id) => !ids.includes(id)),
    );
  }

  return (
    <div className="overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-rounded-xl overflow-x-hidden scrollbar-track-base-300 scrollbar-thumb-primary mt-2">
      <table className="table table-sm">
        <thead>
          <tr>
            <th className="w-6 pr-0">
              <label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  checked={allBookmarksIds.every((id) =>
                    selectedBookmarksIds.includes(id),
                  )}
                  onChange={({ target: { checked } }) =>
                    checked
                      ? selectIds(allBookmarksIds)
                      : unselectIds(allBookmarksIds)
                  }
                />
              </label>
            </th>
            <th className="text-sm">Select all</th>
            <th className="text-center">
              <button
                className="btn btn-xs flex w-full"
                onClick={() => onRemove(selectedBookmarksIds)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <>
              <tr className="bg-base-200">
                <td className="w-6 pr-0">
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                      checked={group.bookmarks.every(({ id }) =>
                        selectedBookmarksIds.includes(id),
                      )}
                      onChange={({ target: { checked } }) => {
                        const groupBookmarksIds = group.bookmarks.map(
                          ({ id }) => id,
                        );
                        if (checked) {
                          selectIds(groupBookmarksIds);
                        } else {
                          unselectIds(groupBookmarksIds);
                        }
                      }}
                    />
                  </label>
                </td>
                <td className="text-xs font-bold opacity-65">
                  <div className="truncate ... w-56">{group.name}</div>
                </td>
                <td></td>
              </tr>
              {group.bookmarks.map((bookmark) => (
                <tr className="link-row">
                  <td className="pr-0">
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        checked={selectedBookmarksIds.includes(bookmark.id)}
                        onChange={({ target: { checked } }) =>
                          checked
                            ? selectIds([bookmark.id])
                            : unselectIds([bookmark.id])
                        }
                      />
                    </label>
                  </td>
                  <td>
                    <div className="truncate ... w-56">{bookmark.title}</div>
                    <div className="truncate ... w-56 text-xs opacity-70 italic">
                      {bookmark.domain}
                    </div>
                  </td>
                  {additionalCells.map((cell) => cell(bookmark))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookmarksTable;
