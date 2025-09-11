document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchResultsContainer = document.getElementById("search-results");
  const statusMessage = document.getElementById("status-message");

  let posts = [];

  // 加载 JSON 文件
  fetch("/search.json") // ← 换成你实际的 JSON 路径
    .then((response) => {
      if (!response.ok) throw new Error("网络请求失败");
      return response.json();
    })
    .then((data) => {
      posts = data;
      statusMessage.textContent = "输入关键词开始搜索...";
      statusMessage.classList.remove("hidden");
    })
    .catch((error) => {
      console.error("加载 JSON 出错:", error);
      statusMessage.textContent = "无法加载文章数据，请检查 JSON 文件路径。";
      statusMessage.classList.remove("hidden");
    });

  // 关键词高亮函数
  function highlight(text, keyword) {
    if (!keyword) return text;
    const reg = new RegExp(`(${keyword})`, "gi");
    return text.replace(reg, '<mark>$1</mark>');
  }

  // 截取关键词附近的内容作为摘要
  function getSnippet(content, keyword, snippetLength = 100) {
    if (!keyword) return content.slice(0, snippetLength);

    const index = content.toLowerCase().indexOf(keyword.toLowerCase());
    if (index === -1) return content.slice(0, snippetLength);

    const start = Math.max(0, index - Math.floor(snippetLength / 2));
    const end = Math.min(content.length, start + snippetLength);

    let snippet = content.slice(start, end);

    // 高亮关键词
    snippet = highlight(snippet, keyword);

    return (start > 0 ? "..." : "") + snippet + (end < content.length ? "..." : "");
  }

  // 搜索函数
  function performSearch(query) {
    if (query.trim() === "") {
      searchResultsContainer.innerHTML = "";
      statusMessage.textContent = "输入关键词开始搜索...";
      statusMessage.classList.remove("hidden");
      return;
    }

    const lowerCaseQuery = query.toLowerCase();

    const filteredPosts = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(lowerCaseQuery);
      const contentMatch = post.content.toLowerCase().includes(lowerCaseQuery);
      const tagsMatch = post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
      return titleMatch || contentMatch || tagsMatch;
    });

    searchResultsContainer.innerHTML = "";
    statusMessage.classList.add("hidden");

    if (filteredPosts.length > 0) {
      filteredPosts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300";

        postElement.innerHTML = `
          <h4 class="text-2xl font-semibold mb-2 text-purple-400">
            ${highlight(post.title, query)}
          </h4>
          <p class="text-gray-400 mb-4">
            ${getSnippet(post.content, query, 120)}
          </p>
          <a href="${post.url}" class="text-purple-500 hover:text-purple-400 font-medium transition-colors duration-300" target="_blank" rel="noopener noreferrer">
            阅读全文 &rarr;
          </a>
        `;
        searchResultsContainer.appendChild(postElement);
      });
    } else {
      statusMessage.textContent = `没有找到与 "${query}" 匹配的文章。`;
      statusMessage.classList.remove("hidden");
    }
  }

  // 输入监听
  searchInput.addEventListener("input", (event) => {
    performSearch(event.target.value);
  });
});