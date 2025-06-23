// 动态加载组件的通用函数
function loadComponent(elementId, componentPath) {
    fetch(componentPath)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}

// 页面加载完成后加载组件
document.addEventListener('DOMContentLoaded', function() {
    // 加载header
    loadComponent('header-placeholder', 'components/header.html');
    
    // 加载footer
    loadComponent('footer-placeholder', 'components/footer.html');
    
    // 为GitHub按钮添加悬停效果
    setTimeout(() => {
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
    }, 100);
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