document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre[class*="language-"]').forEach(pre => {
    // 避免重复添加
    if (pre.querySelector('.copy-btn')) return;

    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.className = 'copy-btn';
    pre.appendChild(copyBtn);

    copyBtn.addEventListener('click', () => {
      const code = pre.querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy', 1000);
      }).catch(() => {
        copyBtn.textContent = 'Failed';
        setTimeout(() => copyBtn.textContent = 'Copy', 1000);
      });
    });
  });
});