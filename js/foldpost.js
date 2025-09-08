
document.addEventListener("DOMContentLoaded", () => {
  const post = document.querySelector(".article"); 
  const headings = post.querySelectorAll("h2, h3"); 

  headings.forEach(heading => {
    heading.classList.add("collapsible-title");

    const wrapper = document.createElement("div");
    wrapper.className = "collapsible-content";

    // 把 heading 下直到下一个同级标题或更高级标题的内容都放入 wrapper
    let next = heading.nextElementSibling;
    const currentLevel = parseInt(heading.tagName.slice(1)); // 2 或 3
    while (next) {
      const nextLevel = /^H[2-3]$/.test(next.tagName) ? parseInt(next.tagName.slice(1)) : currentLevel;
      if (/^H[2-3]$/.test(next.tagName) && nextLevel <= currentLevel) {
        break;
      }
      const temp = next.nextElementSibling;
      wrapper.appendChild(next);
      next = temp;
    }

    heading.after(wrapper);

    heading.addEventListener("click", () => {
      const isCollapsed = wrapper.style.display === "none";
      wrapper.style.display = isCollapsed ? "block" : "none";
      heading.classList.toggle("collapsed");

      // 如果是 h2，则折叠它下的 h3 内层内容也折叠
      if (heading.tagName === "H2") {
        const innerH3Wrappers = wrapper.querySelectorAll(".collapsible-content");
        innerH3Wrappers.forEach(w => {
          w.style.display = isCollapsed ? "block" : "none";
          const h3Title = w.previousElementSibling;
          if (h3Title && h3Title.tagName === "H3") {
            h3Title.classList.toggle("collapsed", !isCollapsed);
          }
        });
      }
    });
  });
});