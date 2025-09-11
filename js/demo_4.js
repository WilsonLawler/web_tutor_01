// 互動式醫學圖表系統 - JavaScript 示範
document.addEventListener('DOMContentLoaded', function() {
    console.log('互動式醫學圖表系統載入完成');
    
    // 初始化所有功能
    initMedicalChart();
    initSearchSystem();
    initDataManagement();
    initDynamicLoading();
    initNavigation();
    initSmoothScrolling();
    
    // 載入統計
    updateLoadingStats();
});

// 互動式資料視覺化
function initMedicalChart() {
    // 醫學資料庫
    const medicalData = {
        diseases: [
            { name: '心臟病', value: 45, trend: 'up', color: '#ef4444' },
            { name: '高血壓', value: 38, trend: 'stable', color: '#f59e0b' },
            { name: '糖尿病', value: 32, trend: 'up', color: '#8b5cf6' },
            { name: '肺炎', value: 28, trend: 'down', color: '#06b6d4' },
            { name: '氣喘', value: 22, trend: 'stable', color: '#10b981' },
            { name: '肝炎', value: 18, trend: 'down', color: '#84cc16' }
        ],
        organs: [
            { name: '心臟', value: 95, trend: 'stable', color: '#ef4444' },
            { name: '肺臟', value: 88, trend: 'up', color: '#06b6d4' },
            { name: '肝臟', value: 82, trend: 'stable', color: '#84cc16' },
            { name: '腎臟', value: 76, trend: 'down', color: '#8b5cf6' },
            { name: '胃', value: 71, trend: 'up', color: '#f59e0b' },
            { name: '大腦', value: 68, trend: 'stable', color: '#ec4899' }
        ],
        symptoms: [
            { name: '胸痛', value: 42, trend: 'up', color: '#ef4444' },
            { name: '咳嗽', value: 38, trend: 'stable', color: '#06b6d4' },
            { name: '頭痛', value: 35, trend: 'up', color: '#8b5cf6' },
            { name: '腹痛', value: 29, trend: 'down', color: '#f59e0b' },
            { name: '呼吸困難', value: 24, trend: 'stable', color: '#10b981' },
            { name: '心悸', value: 19, trend: 'up', color: '#ec4899' }
        ],
        treatments: [
            { name: '藥物治療', value: 78, trend: 'up', color: '#10b981' },
            { name: '手術治療', value: 45, trend: 'stable', color: '#ef4444' },
            { name: '物理治療', value: 32, trend: 'up', color: '#06b6d4' },
            { name: '飲食療法', value: 28, trend: 'up', color: '#f59e0b' },
            { name: '心理治療', value: 22, trend: 'stable', color: '#8b5cf6' },
            { name: '針灸治療', value: 18, trend: 'down', color: '#84cc16' }
        ]
    };
    
    let currentChartType = 'bar';
    let currentDataCategory = 'diseases';
    let currentData = medicalData[currentDataCategory];
    
    // 全域函數定義
    window.changeChartType = function(type) {
        currentChartType = type;
        document.querySelectorAll('.chart-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-type="${type}"]`).classList.add('active');
        updateVisualization();
    };
    
    window.updateVisualization = function() {
        const category = document.getElementById('data-category').value;
        currentDataCategory = category;
        currentData = medicalData[category];
        
        const categoryNames = {
            diseases: '疾病統計',
            organs: '器官功能',
            symptoms: '症狀分析',
            treatments: '治療方法'
        };
        
        const chartTypeNames = {
            bar: '長條圖',
            pie: '圓餅圖',
            line: '折線圖',
            scatter: '散點圖'
        };
        
        document.getElementById('chart-title').textContent = 
            `${categoryNames[category]} - ${chartTypeNames[currentChartType]}`;
        
        updateStats();
        generateChart();
        updateDataTable();
    };
    
    
    window.sortData = function(sortBy) {
        currentData.sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else {
                return b.value - a.value;
            }
        });
        updateVisualization();
    };
    
    window.exportData = function() {
        const csvContent = "data:text/csv;charset=utf-8," 
            + "項目,數值,百分比,趨勢\n"
            + currentData.map(item => 
                `${item.name},${item.value},${((item.value / currentData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}%,${item.trend}`
            ).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${currentDataCategory}_data.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showMessage('資料已匯出', 'success');
    };
    
    // 初始化事件監聽器
    function initEventListeners() {
        // 圖表類型按鈕
        document.querySelectorAll('.chart-type-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.dataset.type;
                changeChartType(type);
            });
        });
        
        // 資料類別選擇
        const dataCategory = document.getElementById('data-category');
        if (dataCategory) {
            dataCategory.addEventListener('change', updateVisualization);
        }
        
        
        // 表格控制按鈕
        document.querySelectorAll('.table-btn[data-sort]').forEach(btn => {
            btn.addEventListener('click', function() {
                const sortBy = this.dataset.sort;
                sortData(sortBy);
            });
        });
        
        // 匯出按鈕
        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', exportData);
        }
    }
    
    initEventListeners();
    
    // 初始化圖表
    updateVisualization();
    
    function updateStats() {
        const total = currentData.reduce((sum, item) => sum + item.value, 0);
        const max = Math.max(...currentData.map(item => item.value));
        const avg = (total / currentData.length).toFixed(1);
        
        document.getElementById('total-count').textContent = total;
        document.getElementById('max-value').textContent = max;
        document.getElementById('avg-value').textContent = avg;
    }
    
    function generateChart() {
        const container = document.getElementById('chart-container');
        container.innerHTML = '';
        
        switch (currentChartType) {
            case 'bar':
                generateBarChart(container);
                break;
            case 'pie':
                generatePieChart(container);
                break;
            case 'line':
                generateLineChart(container);
                break;
            case 'scatter':
                generateScatterChart(container);
                break;
        }
        
        generateLegend();
    }
    
    function generateBarChart(container) {
        const maxValue = Math.max(...currentData.map(item => item.value));
        const chartHeight = 300;
        const barWidth = 60;
        const barSpacing = 20;
        const chartWidth = currentData.length * (barWidth + barSpacing) + barSpacing;
        
        container.style.width = `${chartWidth}px`;
        container.style.height = `${chartHeight + 60}px`;
        
        currentData.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = index * (barWidth + barSpacing) + barSpacing;
            
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.cssText = `
                position: absolute;
                left: ${x}px;
                bottom: 60px;
                width: ${barWidth}px;
                height: ${barHeight}px;
                background: ${item.color};
                transition: all 0.5s ease;
            `;
            
            const label = document.createElement('div');
            label.style.cssText = `
                position: absolute;
                left: ${x}px;
                bottom: 10px;
                width: ${barWidth}px;
                text-align: center;
                font-size: 0.75rem;
                color: var(--text-secondary);
                transform: rotate(-45deg);
                transform-origin: center;
            `;
            label.textContent = item.name;
            
            container.appendChild(bar);
            container.appendChild(label);
        });
    }
    
    function generatePieChart(container) {
        const total = currentData.reduce((sum, item) => sum + item.value, 0);
        const radius = 120;
        const centerX = 150;
        const centerY = 150;
        
        container.style.width = '300px';
        container.style.height = '300px';
        
        let currentAngle = 0;
        
        currentData.forEach((item, index) => {
            const angle = (item.value / total) * 360;
            
            const slice = document.createElement('div');
            slice.className = 'chart-pie-slice';
            slice.style.cssText = `
                position: absolute;
                left: ${centerX}px;
                top: ${centerY}px;
                width: ${radius * 2}px;
                height: ${radius * 2}px;
                border-radius: 50%;
                background: conic-gradient(from ${currentAngle}deg, ${item.color} 0deg ${angle}deg, transparent ${angle}deg);
                transform: translate(-50%, -50%);
                transition: all 0.5s ease;
            `;
            
            container.appendChild(slice);
            currentAngle += angle;
        });
    }
    
    function generateLineChart(container) {
        const maxValue = Math.max(...currentData.map(item => item.value));
        const chartWidth = 400;
        const chartHeight = 250;
        const padding = 40;
        
        container.style.width = `${chartWidth}px`;
        container.style.height = `${chartHeight}px`;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', chartWidth);
        svg.setAttribute('height', chartHeight);
        svg.style.cssText = 'position: absolute; top: 0; left: 0;';
        
        const points = currentData.map((item, index) => {
            const x = padding + (index * (chartWidth - 2 * padding) / (currentData.length - 1));
            const y = chartHeight - padding - ((item.value / maxValue) * (chartHeight - 2 * padding));
            return `${x},${y}`;
        }).join(' ');
        
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', points);
        polyline.setAttribute('fill', 'none');
        polyline.setAttribute('stroke', 'var(--primary-color)');
        polyline.setAttribute('stroke-width', '3');
        polyline.setAttribute('stroke-linecap', 'round');
        polyline.setAttribute('stroke-linejoin', 'round');
        
        svg.appendChild(polyline);
        container.appendChild(svg);
    }
    
    function generateScatterChart(container) {
        const maxValue = Math.max(...currentData.map(item => item.value));
        const chartWidth = 400;
        const chartHeight = 300;
        const padding = 40;
        
        container.style.width = `${chartWidth}px`;
        container.style.height = `${chartHeight}px`;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', chartWidth);
        svg.setAttribute('height', chartHeight);
        svg.style.cssText = 'position: absolute; top: 0; left: 0;';
        
        currentData.forEach((item, index) => {
            const x = padding + Math.random() * (chartWidth - 2 * padding);
            const y = chartHeight - padding - ((item.value / maxValue) * (chartHeight - 2 * padding));
            const size = 8 + (item.value / maxValue) * 12;
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', size);
            circle.setAttribute('fill', item.color);
            circle.setAttribute('opacity', '0.7');
            
            svg.appendChild(circle);
        });
        
        container.appendChild(svg);
    }
    
    function generateLegend() {
        const legend = document.getElementById('chart-legend');
        legend.innerHTML = '';
        
        currentData.forEach(item => {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.innerHTML = `
                <div class="legend-color" style="background: ${item.color}"></div>
                <span>${item.name}</span>
            `;
            legend.appendChild(legendItem);
        });
    }
    
    function updateDataTable() {
        const tbody = document.getElementById('table-body');
        const total = currentData.reduce((sum, item) => sum + item.value, 0);
        
        tbody.innerHTML = currentData.map(item => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            const trendIcon = item.trend === 'up' ? '↗️' : item.trend === 'down' ? '↘️' : '➡️';
            const trendClass = item.trend === 'up' ? 'trend-up' : item.trend === 'down' ? 'trend-down' : 'trend-stable';
            
            return `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.value}</td>
                    <td>${percentage}%</td>
                    <td>
                        <div class="trend-indicator ${trendClass}">
                            <span>${trendIcon}</span>
                            <span>${item.trend === 'up' ? '上升' : item.trend === 'down' ? '下降' : '穩定'}</span>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }
    
}

// 搜尋系統
function initSearchSystem() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const systemFilter = document.getElementById('system-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const searchResults = document.getElementById('search-results');
    const resultsCount = document.getElementById('results-count');
    const searchSuggestions = document.getElementById('search-suggestions');
    
    // 擴展醫學資料庫
    const searchDatabase = [
        // 器官
        { name: '心臟', category: 'organs', system: 'circulatory', difficulty: 'beginner', description: '循環系統的核心器官，負責泵血' },
        { name: '肺臟', category: 'organs', system: 'respiratory', difficulty: 'beginner', description: '呼吸系統的主要器官，負責氣體交換' },
        { name: '肝臟', category: 'organs', system: 'digestive', difficulty: 'intermediate', description: '最大的內臟器官，負責代謝和解毒' },
        { name: '腎臟', category: 'organs', system: 'circulatory', difficulty: 'intermediate', description: '過濾血液，調節水分和電解質平衡' },
        { name: '胃', category: 'organs', system: 'digestive', difficulty: 'beginner', description: '消化系統的重要器官，負責食物儲存和初步消化' },
        { name: '大腦', category: 'organs', system: 'nervous', difficulty: 'advanced', description: '中樞神經系統的核心，負責思考和記憶' },
        
        // 疾病
        { name: '心臟病', category: 'diseases', system: 'circulatory', difficulty: 'intermediate', description: '心臟相關疾病的總稱' },
        { name: '高血壓', category: 'diseases', system: 'circulatory', difficulty: 'beginner', description: '血壓持續升高的疾病' },
        { name: '肺炎', category: 'diseases', system: 'respiratory', difficulty: 'intermediate', description: '肺部感染性疾病' },
        { name: '氣喘', category: 'diseases', system: 'respiratory', difficulty: 'beginner', description: '慢性呼吸道疾病' },
        { name: '肝炎', category: 'diseases', system: 'digestive', difficulty: 'intermediate', description: '肝臟發炎性疾病' },
        { name: '腎炎', category: 'diseases', system: 'circulatory', difficulty: 'advanced', description: '腎臟發炎性疾病' },
        
        // 症狀
        { name: '胸痛', category: 'symptoms', system: 'circulatory', difficulty: 'beginner', description: '胸部疼痛症狀' },
        { name: '咳嗽', category: 'symptoms', system: 'respiratory', difficulty: 'beginner', description: '呼吸道刺激症狀' },
        { name: '腹痛', category: 'symptoms', system: 'digestive', difficulty: 'beginner', description: '腹部疼痛症狀' },
        { name: '頭痛', category: 'symptoms', system: 'nervous', difficulty: 'beginner', description: '頭部疼痛症狀' },
        { name: '呼吸困難', category: 'symptoms', system: 'respiratory', difficulty: 'intermediate', description: '呼吸不順暢的症狀' },
        { name: '心悸', category: 'symptoms', system: 'circulatory', difficulty: 'intermediate', description: '心跳不規律的症狀' },
        
        // 治療
        { name: '手術治療', category: 'treatments', system: 'circulatory', difficulty: 'advanced', description: '外科手術治療方法' },
        { name: '藥物治療', category: 'treatments', system: 'circulatory', difficulty: 'intermediate', description: '使用藥物進行治療' },
        { name: '物理治療', category: 'treatments', system: 'circulatory', difficulty: 'beginner', description: '物理方法進行治療' },
        { name: '飲食療法', category: 'treatments', system: 'digestive', difficulty: 'beginner', description: '通過飲食調整進行治療' }
    ];
    
    let searchTimeout;
    
    // 搜尋功能
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        const category = categoryFilter.value;
        const system = systemFilter.value;
        const difficulty = difficultyFilter.value;
        
        const results = searchDatabase.filter(item => {
            const matchesQuery = !query || 
                item.name.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query);
            const matchesCategory = !category || item.category === category;
            const matchesSystem = !system || item.system === system;
            const matchesDifficulty = !difficulty || item.difficulty === difficulty;
            
            return matchesQuery && matchesCategory && matchesSystem && matchesDifficulty;
        });
        
        displaySearchResults(results);
        updateResultsCount(results.length);
    }
    
    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <p>沒有找到相關結果</p>
                </div>
            `;
            return;
        }
        
        const resultsHtml = results.map(item => `
            <div class="result-item" onclick="selectSearchResult('${item.name}')">
                <h5 class="result-title">${item.name}</h5>
                <p class="result-description">${item.description}</p>
                <div class="result-meta">
                    <span class="result-tag">${getCategoryLabel(item.category)}</span>
                    <span class="result-tag">${getSystemLabel(item.system)}</span>
                    <span class="result-tag">${getDifficultyLabel(item.difficulty)}</span>
                </div>
            </div>
        `).join('');
        
        searchResults.innerHTML = resultsHtml;
    }
    
    function updateResultsCount(count) {
        resultsCount.textContent = count;
    }
    
    function getCategoryLabel(category) {
        const labels = {
            'organs': '器官',
            'diseases': '疾病',
            'symptoms': '症狀',
            'treatments': '治療'
        };
        return labels[category] || category;
    }
    
    function getSystemLabel(system) {
        const labels = {
            'circulatory': '循環系統',
            'respiratory': '呼吸系統',
            'digestive': '消化系統',
            'nervous': '神經系統',
            'endocrine': '內分泌系統'
        };
        return labels[system] || system;
    }
    
    function getDifficultyLabel(difficulty) {
        const labels = {
            'beginner': '初級',
            'intermediate': '中級',
            'advanced': '高級'
        };
        return labels[difficulty] || difficulty;
    }
    
    // 搜尋建議
    function showSuggestions(query) {
        if (!query || query.length < 2) {
            searchSuggestions.style.display = 'none';
            return;
        }
        
        const suggestions = searchDatabase
            .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5)
            .map(item => `
                <div class="suggestion-item" onclick="selectSuggestion('${item.name}')">
                    ${item.name}
                </div>
            `).join('');
        
        if (suggestions) {
            searchSuggestions.innerHTML = suggestions;
            searchSuggestions.style.display = 'block';
        } else {
            searchSuggestions.style.display = 'none';
        }
    }
    
    // 事件監聽器
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            showSuggestions(this.value);
            searchTimeout = setTimeout(performSearch, 300);
        });
        
        searchInput.addEventListener('focus', function() {
            if (this.value.length >= 2) {
                showSuggestions(this.value);
            }
        });
        
        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                searchSuggestions.style.display = 'none';
            }, 200);
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', performSearch);
    }
    
    if (systemFilter) {
        systemFilter.addEventListener('change', performSearch);
    }
    
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', performSearch);
    }
    
    // 初始化搜尋
    performSearch();
}

// 資料管理
function initDataManagement() {
    // 初始化進度追蹤
    updateProgressTracking();
    
    // 初始化收藏夾
    loadFavorites();
    
    // 初始化設定
    loadSettings();
}

function updateProgressTracking() {
    const progressItems = document.querySelectorAll('.progress-item');
    
    progressItems.forEach(item => {
        const progressFill = item.querySelector('.progress-fill');
        const progressPercent = item.querySelector('.progress-percent');
        const currentWidth = progressFill.style.width;
        
        // 動畫效果
        progressFill.style.width = '0%';
        setTimeout(() => {
            progressFill.style.width = currentWidth;
        }, 500);
    });
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesList = document.getElementById('favorites-list');
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <div class="no-favorites">
                <p>還沒有收藏任何項目</p>
            </div>
        `;
        return;
    }
    
    const favoritesHtml = favorites.map(fav => `
        <div class="favorite-item">
            <span class="favorite-icon">${getOrganIcon(fav.type)}</span>
            <div class="favorite-info">
                <h5>${fav.name}</h5>
                <p>${fav.description}</p>
            </div>
            <button class="remove-favorite" onclick="removeFavorite('${fav.id}')">×</button>
        </div>
    `).join('');
    
    favoritesList.innerHTML = favoritesHtml;
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    
    // 載入語言設定
    const languageSetting = document.getElementById('language-setting');
    if (languageSetting && settings.language) {
        languageSetting.value = settings.language;
    }
    
    // 載入主題設定
    const themeSetting = document.getElementById('theme-setting');
    if (themeSetting && settings.theme) {
        themeSetting.value = settings.theme;
    }
    
    // 載入通知設定
    const notifications = document.getElementById('notifications');
    if (notifications && settings.notifications !== undefined) {
        notifications.checked = settings.notifications;
    }
    
    const updates = document.getElementById('updates');
    if (updates && settings.updates !== undefined) {
        updates.checked = settings.updates;
    }
}

// 動態載入
function initDynamicLoading() {
    // 初始化載入統計
    updateLoadingStats();
}

function updateLoadingStats() {
    const loadedItems = document.getElementById('loaded-items');
    const loadTime = document.getElementById('load-time');
    const cacheHits = document.getElementById('cache-hits');
    
    if (loadedItems) {
        const count = parseInt(localStorage.getItem('loadedItems') || '0');
        loadedItems.textContent = count;
    }
    
    if (loadTime) {
        const time = parseInt(localStorage.getItem('lastLoadTime') || '0');
        loadTime.textContent = time;
    }
    
    if (cacheHits) {
        const hits = parseInt(localStorage.getItem('cacheHits') || '0');
        cacheHits.textContent = hits;
    }
}

// 導航功能
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // 導航高亮
    const navLinksList = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.demo-section');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', throttle(updateActiveNav, 100));
    updateActiveNav();
}

// 平滑滾動
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考慮固定導航高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 全域函數
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function addToFavorites() {
    const selectedOrganTitle = document.getElementById('selected-organ-title');
    const organDescription = document.getElementById('organ-description');
    
    if (!selectedOrganTitle || selectedOrganTitle.textContent === '選擇器官查看詳細資訊') {
        showMessage('請先選擇一個器官', 'warning');
        return;
    }
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorite = {
        id: Date.now().toString(),
        name: selectedOrganTitle.textContent,
        description: organDescription.textContent.substring(0, 50) + '...',
        type: 'organ',
        timestamp: new Date().toISOString()
    };
    
    // 檢查是否已存在
    const exists = favorites.some(fav => fav.name === newFavorite.name);
    if (exists) {
        showMessage('該項目已在收藏夾中', 'info');
        return;
    }
    
    favorites.push(newFavorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    showMessage('已加入收藏夾', 'success');
    loadFavorites();
}

function shareOrganInfo() {
    const selectedOrganTitle = document.getElementById('selected-organ-title');
    
    if (!selectedOrganTitle || selectedOrganTitle.textContent === '選擇器官查看詳細資訊') {
        showMessage('請先選擇一個器官', 'warning');
        return;
    }
    
    const shareText = `我正在學習 ${selectedOrganTitle.textContent} 的相關知識！`;
    
    if (navigator.share) {
        navigator.share({
            title: '醫學知識分享',
            text: shareText,
            url: window.location.href
        });
    } else {
        // 複製到剪貼板
        navigator.clipboard.writeText(shareText).then(() => {
            showMessage('分享內容已複製到剪貼板', 'success');
        });
    }
}

function viewRelatedDiseases() {
    const selectedOrganTitle = document.getElementById('selected-organ-title');
    
    if (!selectedOrganTitle || selectedOrganTitle.textContent === '選擇器官查看詳細資訊') {
        showMessage('請先選擇一個器官', 'warning');
        return;
    }
    
    // 模擬載入相關疾病
    showMessage('正在載入相關疾病資訊...', 'info');
    
    setTimeout(() => {
        showMessage('相關疾病資訊載入完成', 'success');
    }, 2000);
}

function removeFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    showMessage('已從收藏夾移除', 'success');
    loadFavorites();
}

function updateSetting(key, value) {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    settings[key] = value;
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    showMessage('設定已更新', 'success');
}

function clearSearch() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const systemFilter = document.getElementById('system-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (systemFilter) systemFilter.value = '';
    if (difficultyFilter) difficultyFilter.value = '';
    
    performSearch();
}

function selectSuggestion(suggestion) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = suggestion;
        performSearch();
    }
}

function selectSearchResult(resultName) {
    showMessage(`已選擇：${resultName}`, 'success');
}

// 載入功能
function loadMedicalData() {
    showLoadingIndicator();
    
    setTimeout(() => {
        const content = `
            <h5>醫學資料載入完成</h5>
            <div class="loaded-data-grid">
                <div class="data-card">
                    <h6>器官系統</h6>
                    <p>載入了 12 個主要器官的詳細資訊</p>
                </div>
                <div class="data-card">
                    <h6>疾病資料</h6>
                    <p>載入了 25 種常見疾病的相關資訊</p>
                </div>
                <div class="data-card">
                    <h6>症狀對照</h6>
                    <p>載入了 18 種常見症狀的說明</p>
                </div>
            </div>
        `;
        document.getElementById('loaded-content').innerHTML = content;
        hideLoadingIndicator();
        
        updateLoadStats(3, 1500);
    }, 2000);
}

function loadOrganImages() {
    showLoadingIndicator();
    
    setTimeout(() => {
        const content = `
            <h5>器官圖片載入完成</h5>
            <div class="image-gallery">
                <img src="../img/heart.jpeg" alt="心臟" class="gallery-image">
                <img src="../img/lung.webp" alt="肺臟" class="gallery-image">
                <img src="../img/liver.jpg" alt="肝臟" class="gallery-image">
                <img src="../img/kidney.png" alt="腎臟" class="gallery-image">
            </div>
        `;
        document.getElementById('loaded-content').innerHTML = content;
        hideLoadingIndicator();
        
        updateLoadStats(4, 1200);
    }, 1500);
}

function loadDiseaseInfo() {
    showLoadingIndicator();
    
    setTimeout(() => {
        const content = `
            <h5>疾病資訊載入完成</h5>
            <div class="disease-list">
                <div class="disease-item">
                    <h6>心臟病</h6>
                    <p>包括心肌梗塞、心律不整等相關疾病</p>
                </div>
                <div class="disease-item">
                    <h6>呼吸系統疾病</h6>
                    <p>包括肺炎、氣喘、肺氣腫等</p>
                </div>
                <div class="disease-item">
                    <h6>消化系統疾病</h6>
                    <p>包括肝炎、胃潰瘍、腸炎等</p>
                </div>
            </div>
        `;
        document.getElementById('loaded-content').innerHTML = content;
        hideLoadingIndicator();
        
        updateLoadStats(3, 1800);
    }, 2500);
}

function simulateApiCall() {
    showLoadingIndicator();
    
    setTimeout(() => {
        const content = `
            <h5>API 呼叫成功</h5>
            <div class="api-response">
                <div class="response-item success">
                    <span class="response-icon">✅</span>
                    <span>成功連接到醫學資料庫</span>
                </div>
                <div class="response-item info">
                    <span class="response-icon">📊</span>
                    <span>載入了 156 筆醫學記錄</span>
                </div>
                <div class="response-item info">
                    <span class="response-icon">🔄</span>
                    <span>資料已同步到本地快取</span>
                </div>
            </div>
        `;
        document.getElementById('loaded-content').innerHTML = content;
        hideLoadingIndicator();
        
        updateLoadStats(1, 3000);
        updateCacheHits();
    }, 3000);
}

function showLoadingIndicator() {
    const indicator = document.getElementById('loading-indicator');
    if (indicator) {
        indicator.style.display = 'flex';
    }
}

function hideLoadingIndicator() {
    const indicator = document.getElementById('loading-indicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

function updateLoadStats(items, time) {
    const currentItems = parseInt(localStorage.getItem('loadedItems') || '0');
    localStorage.setItem('loadedItems', (currentItems + items).toString());
    localStorage.setItem('lastLoadTime', time.toString());
    
    updateLoadingStats();
}

function updateCacheHits() {
    const currentHits = parseInt(localStorage.getItem('cacheHits') || '0');
    localStorage.setItem('cacheHits', (currentHits + 1).toString());
    
    updateLoadingStats();
}

function updateOrganViewCount(organType) {
    const viewCounts = JSON.parse(localStorage.getItem('organViewCounts') || '{}');
    viewCounts[organType] = (viewCounts[organType] || 0) + 1;
    localStorage.setItem('organViewCounts', JSON.stringify(viewCounts));
}

function getOrganIcon(organType) {
    const icons = {
        'heart': '🫀',
        'lung': '🫁',
        'liver': '🫘',
        'kidney': '🫘',
        'stomach': '🫄',
        'brain': '🧠'
    };
    return icons[organType] || '🫀';
}

function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // 樣式
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // 根據類型設定顏色
    switch (type) {
        case 'success':
            messageDiv.style.background = 'var(--success-color)';
            break;
        case 'error':
            messageDiv.style.background = 'var(--error-color)';
            break;
        case 'warning':
            messageDiv.style.background = 'var(--warning-color)';
            break;
        case 'info':
        default:
            messageDiv.style.background = 'var(--primary-color)';
            break;
    }
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

// 工具函數
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 添加 CSS 動畫
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .loaded-data-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .data-card {
        background: var(--surface-color);
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid var(--border-color);
    }
    
    .data-card h6 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }
    
    .image-gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .gallery-image {
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: var(--shadow);
    }
    
    .disease-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .disease-item {
        background: var(--surface-color);
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid var(--border-color);
    }
    
    .disease-item h6 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }
    
    .api-response {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .response-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border-radius: 4px;
    }
    
    .response-item.success {
        background: rgba(16, 185, 129, 0.1);
        color: var(--success-color);
    }
    
    .response-item.info {
        background: rgba(37, 99, 235, 0.1);
        color: var(--primary-color);
    }
    
    .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border-light);
    }
    
    .detail-label {
        font-weight: 600;
        color: var(--text-primary);
    }
    
    .detail-value {
        color: var(--text-secondary);
        text-align: right;
        max-width: 60%;
    }
    
    .organ-image-container {
        text-align: center;
        margin-bottom: 1rem;
    }
    
    .organ-detail-image {
        max-width: 200px;
        height: auto;
        border-radius: 8px;
        box-shadow: var(--shadow);
    }
    
    .organ-details-content {
        flex: 1;
    }
`;
document.head.appendChild(style);

// 頁面載入完成
window.addEventListener('load', function() {
    console.log('所有資源載入完成');
    
    // 添加載入完成動畫
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});