document.addEventListener("DOMContentLoaded", function() {
    const tocContainer = document.getElementById("toc");
    const headers = Array.from(document.querySelectorAll("h2, h3, h4, h5, h6"));
    const tocStack = [];

    headers.forEach((header, index) => {
        const level = parseInt(header.tagName[1]);
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.textContent = header.textContent;
        a.href = `#toc-${index}`;
        header.id = `toc-${index}`;
        li.appendChild(a);

        // 找到父级 ul
        while (tocStack.length && tocStack[tocStack.length - 1].level >= level) {
            tocStack.pop();
        }
        let parentUl = tocContainer;
        if (tocStack.length) parentUl = tocStack[tocStack.length - 1].ul;
        parentUl.appendChild(li);

        // 判断是否有直接下级标题（比自己层级大的第一个标题）
        let subUl = null;
        for (let i = index + 1; i < headers.length; i++) {
            const nextLevel = parseInt(headers[i].tagName[1]);
            if (nextLevel <= level){
                const placeholder = document.createElement("span");
                placeholder.className = "toc-toggle-btn";
                placeholder.textContent = "";
                li.insertBefore(placeholder, a);
                break; // 遇到同级或更高级标题停止
            }
            if (nextLevel > level) {
                // 找到下级标题，说明当前有子标题
                subUl = document.createElement("ul");
                subUl.className = "toc-sublist";
                li.appendChild(subUl);

                const btn = document.createElement("span");
                btn.className = "toc-toggle-btn";
                btn.textContent = "[+]";
                btn.onclick = () => {
                    if (subUl.style.display === "" || subUl.style.display === "none") {
                        subUl.style.display = "block";
                        btn.textContent = "[-]";
                    } else {
                        subUl.style.display = "none";
                        btn.textContent = "[+]";
                    }
                };
                li.insertBefore(btn, a);
                break; // 只需要第一个下级标题就添加按钮
            }
        }

        tocStack.push({ ul: subUl || li, level: level });
    });

    // 滚动高亮和自动展开父级
    const allLinks = document.querySelectorAll("#toc a");
    const allLis = Array.from(allLinks).map(a => a.parentElement);

    function onScroll() {
        let currentHeader = null;
        headers.forEach(header => {
            if (header.getBoundingClientRect().top <= 100) currentHeader = header;
        });

        allLis.forEach(li => li.classList.remove("toc-active"));
        if (currentHeader) {
            const activeLink = document.querySelector(`#toc a[href="#${currentHeader.id}"]`);
            if (activeLink) {
                activeLink.parentElement.classList.add("toc-active");

                // 自动展开父级
                let parent = activeLink.parentElement.parentElement;
                while (parent && parent.id !== "toc") {
                    if (parent.classList.contains("toc-sublist")) {
                        parent.style.display = "block";
                        const btn = parent.parentElement.querySelector(".toc-toggle-btn");
                        if (btn) btn.textContent = "[-]";
                    }
                    parent = parent.parentElement;
                }
            }
        }
    }

    window.addEventListener("scroll", onScroll);
    onScroll();
});