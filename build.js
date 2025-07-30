const fs = require('fs');
const path = require('path');

/**
 * 静态模板引擎类
 * 用于处理HTML模板的变量替换
 */
class StaticTemplateEngine {
    /**
     * 渲染模板
     * @param {string} template - 模板内容
     * @param {Object} variables - 变量对象
     * @returns {string} 渲染后的内容
     */
    render(template, variables) {
        let result = template;
        
        // 替换所有模板变量
        for (const [key, value] of Object.entries(variables)) {
            const placeholder = `{{${key}}}`;
            result = result.replace(new RegExp(placeholder, 'g'), value || '');
        }
        
        return result;
    }
}

// 页面配置
const pages = {
    'index.html': {
        title: 'X2Agent - 智能助手生态平台',
        keywords: 'X2Agent, AI助手, 智能助手, 人工智能平台, AI生态系统, 智能解决方案',
        contentFile: 'pages/index-content.html',
        head_extra: '',
        scripts: ``
    },
    'market-assistant.html': {
        title: 'MarketAssistant - 智能市场分析助手 | X2Agent',
        keywords: 'MarketAssistant, 市场分析, 投资分析, AI预测, 股票分析, 量化投资, 金融数据分析, 市场预警',
        contentFile: 'pages/market-assistant-content.html',
        head_extra: '<link rel="icon" type="image/x-icon" href="images/favicon.ico">',
        scripts: ``
    },
    'writer-assistant.html': {
        title: 'WriterAssistant - 专业AI写作助手 | X2Agent',
        keywords: 'WriterAssistant, AI写作, 内容创作, 自媒体运营, 文章生成, 配图生成, 多平台发布, AIGC内容',
        contentFile: 'pages/writer-assistant-content.html',
        head_extra: '<link rel="icon" type="image/x-icon" href="images/favicon.ico">',
        scripts: ``
    }
};

/**
 * 构建页面
 * 读取布局模板和页面内容，生成最终的HTML文件
 */
function buildPages() {
    const templateEngine = new StaticTemplateEngine();
    
    // 读取布局模板
    const layoutPath = path.join(__dirname, 'layouts', 'base.html');
    const layoutTemplate = fs.readFileSync(layoutPath, 'utf8');
    
    // 为每个页面生成HTML
    for (const [filename, config] of Object.entries(pages)) {
        console.log(`构建页面: ${filename}`);
        
        // 读取页面内容
        const contentPath = path.join(__dirname, config.contentFile);
        let content = '';
        
        if (fs.existsSync(contentPath)) {
            content = fs.readFileSync(contentPath, 'utf8');
        } else {
            console.warn(`警告: 内容文件不存在 ${contentPath}`);
            continue;
        }
        
        // 渲染页面
        const html = templateEngine.render(layoutTemplate, {
            title: config.title,
            keywords: config.keywords,
            head_extra: config.head_extra,
            content: content,
            scripts: config.scripts
        });
        
        // 写入文件
        const outputPath = path.join(__dirname, filename);
        fs.writeFileSync(outputPath, html, 'utf8');
        console.log(`✓ 生成: ${filename}`);
    }
}

/**
 * 确保pages目录存在
 */
function ensurePagesDirectory() {
    const pagesDir = path.join(__dirname, 'pages');
    if (!fs.existsSync(pagesDir)) {
        fs.mkdirSync(pagesDir, { recursive: true });
        console.log('创建 pages 目录');
    }
}

// 主函数
function main() {
    console.log('开始构建静态网站...');
    
    try {
        ensurePagesDirectory();
        buildPages();
        console.log('\n✅ 构建完成！');
        console.log('\n生成的文件:');
        Object.keys(pages).forEach(filename => {
            console.log(`  - ${filename}`);
        });
        console.log('\n💡 提示: 运行 "python -m http.server 8000" 来预览网站');
    } catch (error) {
        console.error('❌ 构建失败:', error.message);
        process.exit(1);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main();
}

module.exports = {
    StaticTemplateEngine,
    buildPages,
    ensurePagesDirectory
};