chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.request === "getBookmarks") {
    chrome.bookmarks.getTree().then((tree) => {
      console.log(tree);
      const result = [];
      const getChildren = (node, parentTitle) => {
        if (node.url) {
          node.parentTitle = parentTitle;
          result.push(node);
        } else if (node.children) {
          node.children.forEach((child) =>
            getChildren(child, parentTitle || node.title),
          );
        }
      };
      getChildren({ children: tree });
      sendResponse(result);
    });
  } else if (message.request === "getBookmarkStatus") {
    let timer;
    fetch(message.url)
      .then((response) => {
        console.log(response);
        clearTimeout(timer);
        sendResponse(response.ok ? "ok" : response.status);
      })
      .catch(() => {
        clearTimeout(timer);
        sendResponse("failed");
      });
    timer = setTimeout(() => {
      sendResponse("failed");
    }, 5000);
  }
  return true;
});
