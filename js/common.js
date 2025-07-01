// 动态加载组件的通用函数
// GitHub按钮悬停效果
document.addEventListener('DOMContentLoaded', function() {
    const githubButton = document.querySelector('.github-link');
    if (githubButton) {
        githubButton.addEventListener('mouseenter', function() {
            const icon = this.querySelector('img');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        githubButton.addEventListener('mouseleave', function() {
            const icon = this.querySelector('img');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    }
});

// 平滑滚动到锚点
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 为导航链接添加平滑滚动
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const navLinks = document.querySelectorAll('.nav-links a[href*="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.includes('#')) {
                    const targetId = href.split('#')[1];
                    if (targetId && document.getElementById(targetId)) {
                        e.preventDefault();
                        smoothScrollTo(targetId);
                    }
                }
            });
        });
    }, 200);
});