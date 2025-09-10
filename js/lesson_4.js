// JavaScript 基礎課程 - 互動功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript 基礎課程載入完成');

    // 初始化所有功能
    initSidebar();
    initScrollToTop();
    initTabSystem();
    initDOMDemo();
    initEventDemo();
    initDataDemo();
    initInteractiveFeatures();
    initMedicalChart();
    initSearchSystem();
    initLoadingDemo();
    initSmoothScrolling();
});

// 標籤系統
function initTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // 移除所有 active 狀態
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加 active 狀態
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// DOM 操作示範
function initDOMDemo() {
    const changeTitleBtn = document.getElementById('change-title');
    const changeColorBtn = document.getElementById('change-color');
    const toggleVisibilityBtn = document.getElementById('toggle-visibility');
    const addContentBtn = document.getElementById('add-content');
    
    const demoTitle = document.getElementById('demo-title');
    const demoText = document.getElementById('demo-text');
    const demoContent = document.getElementById('demo-content');

    if (changeTitleBtn) {
        changeTitleBtn.addEventListener('click', function() {
            const titles = ['心臟系統', '肺臟系統', '肝臟系統', '腎臟系統'];
            const randomTitle = titles[Math.floor(Math.random() * titles.length)];
            demoTitle.textContent = randomTitle;
            
            // 添加動畫效果
            demoTitle.style.transform = 'scale(1.1)';
            setTimeout(() => {
                demoTitle.style.transform = 'scale(1)';
            }, 200);
        });
    }

    if (changeColorBtn) {
        changeColorBtn.addEventListener('click', function() {
            const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            demoText.style.color = randomColor;
        });
    }

    if (toggleVisibilityBtn) {
        toggleVisibilityBtn.addEventListener('click', function() {
            if (demoText.style.display === 'none') {
                demoText.style.display = 'block';
                this.textContent = '隱藏文字';
            } else {
                demoText.style.display = 'none';
                this.textContent = '顯示文字';
            }
        });
    }

    if (addContentBtn) {
        addContentBtn.addEventListener('click', function() {
            const timestamp = new Date().toLocaleTimeString();
            const newContent = document.createElement('div');
            newContent.innerHTML = `
                <p style="color: var(--success-color); margin: 0.5rem 0;">
                    ✅ 新增內容 - ${timestamp}
                </p>
            `;
            demoContent.appendChild(newContent);
            
            // 滾動到新內容
            // newContent.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// 事件處理示範
function initEventDemo() {
    const demoArea = document.getElementById('event-demo-area');
    const eventLog = document.getElementById('event-log');
    const clearLogBtn = document.getElementById('clear-log');
    const startTrackingBtn = document.getElementById('start-tracking');
    
    let isTracking = false;
    let eventCount = 0;

    if (demoArea && eventLog) {
        // 滑鼠事件
        demoArea.addEventListener('mouseenter', function() {
            if (isTracking) logEvent('滑鼠進入區域');
        });

        demoArea.addEventListener('mouseleave', function() {
            if (isTracking) logEvent('滑鼠離開區域');
        });

        demoArea.addEventListener('mousemove', function(e) {
            if (isTracking && eventCount % 10 === 0) { // 限制頻率
                logEvent(`滑鼠移動: (${e.offsetX}, ${e.offsetY})`);
            }
            eventCount++;
        });

        demoArea.addEventListener('click', function(e) {
            if (isTracking) {
                logEvent(`點擊位置: (${e.offsetX}, ${e.offsetY})`);
            }
        });

        // 鍵盤事件
        document.addEventListener('keydown', function(e) {
            if (isTracking) {
                logEvent(`按鍵按下: ${e.key} (${e.code})`);
            }
        });
    }

    if (clearLogBtn) {
        clearLogBtn.addEventListener('click', function() {
            eventLog.innerHTML = '<p style="color: var(--text-muted); text-align: center; font-style: italic;">事件日誌已清除，點擊「開始追蹤」按鈕重新開始記錄事件...</p>';
        });
    }

    if (startTrackingBtn) {
        startTrackingBtn.addEventListener('click', function() {
            isTracking = !isTracking;
            if (isTracking) {
                this.textContent = '停止追蹤';
                this.style.background = 'var(--error-color)';
                eventLog.innerHTML = '<p style="color: var(--success-color); text-align: center; font-weight: 500;">✅ 事件追蹤已啟動！現在可以在上方區域內移動滑鼠、點擊或按鍵盤來查看事件記錄。</p>';
                logEvent('🎯 事件追蹤已啟動');
            } else {
                this.textContent = '開始追蹤';
                this.style.background = 'var(--primary-color)';
                logEvent('⏹️ 事件追蹤已停止');
                setTimeout(() => {
                    eventLog.innerHTML = '<p style="color: var(--text-muted); text-align: center; font-style: italic;">事件追蹤已停止，點擊「開始追蹤」按鈕重新開始記錄事件...</p>';
                }, 2000);
            }
        });
    }

    function logEvent(message) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.innerHTML = `<span style="color: var(--text-muted);">[${timestamp}]</span> ${message}`;
        eventLog.appendChild(logEntry);
        
        // 限制日誌條目數量
        const entries = eventLog.children;
        if (entries.length > 20) {
            eventLog.removeChild(entries[0]);
        }
        
        // 自動滾動到底部
        eventLog.scrollTop = eventLog.scrollHeight;
    }
}

// 資料管理示範
function initDataDemo() {
    const dataInput = document.getElementById('data-input');
    const saveDataBtn = document.getElementById('save-data');
    const clearDataBtn = document.getElementById('clear-data');
    const dataOutput = document.getElementById('data-output');

    if (saveDataBtn) {
        saveDataBtn.addEventListener('click', function() {
            const inputValue = dataInput.value.trim();
            if (inputValue) {
                // 儲存到 localStorage
                const timestamp = new Date().toISOString();
                const data = {
                    content: inputValue,
                    timestamp: timestamp,
                    id: Date.now()
                };
                
                // 獲取現有資料
                let existingData = JSON.parse(localStorage.getItem('demoData') || '[]');
                existingData.push(data);
                
                // 儲存資料
                localStorage.setItem('demoData', JSON.stringify(existingData));
                
                // 顯示成功訊息
                showMessage('資料已儲存！', 'success');
                dataInput.value = '';
                
                // 更新顯示
                updateDataDisplay();
            } else {
                showMessage('請輸入要儲存的資料', 'error');
            }
        });
    }


    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', function() {
            if (confirm('確定要清除所有資料嗎？')) {
                localStorage.removeItem('demoData');
                dataOutput.innerHTML = '<p style="color: var(--text-muted);">沒有儲存的資料</p>';
                showMessage('資料已清除！', 'warning');
            }
        });
    }

    function updateDataDisplay() {
        const data = JSON.parse(localStorage.getItem('demoData') || '[]');
        
        if (data.length === 0) {
            dataOutput.innerHTML = '<p style="color: var(--text-muted);">沒有儲存的資料</p>';
            return;
        }

        const html = data.map(item => `
            <div style="border-bottom: 1px solid var(--border-light); padding: 0.5rem 0;">
                <strong>${item.content}</strong>
                <br>
                <small style="color: var(--text-muted);">
                    ${new Date(item.timestamp).toLocaleString()}
                </small>
            </div>
        `).join('');
        
        dataOutput.innerHTML = html;
    }

    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
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
        }
        
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // 初始化顯示
    updateDataDisplay();
}

// 互動式功能
function initInteractiveFeatures() {
    // 動態列表管理
    const listInput = document.getElementById('list-input');
    const addItemBtn = document.getElementById('add-item');
    const dynamicList = document.getElementById('dynamic-list');

    if (addItemBtn && listInput && dynamicList) {
        addItemBtn.addEventListener('click', function() {
            const inputValue = listInput.value.trim();
            if (inputValue) {
                addListItem(inputValue);
                listInput.value = '';
            }
        });

        listInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addItemBtn.click();
            }
        });

        // 委派事件處理移除按鈕
        dynamicList.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-btn')) {
                e.target.parentElement.remove();
            }
        });
    }

    function addListItem(text) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${text} <button class="remove-btn">×</button>`;
        dynamicList.appendChild(listItem);
        
        // 添加動畫效果
        listItem.style.opacity = '0';
        listItem.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            listItem.style.transition = 'all 0.3s ease';
            listItem.style.opacity = '1';
            listItem.style.transform = 'translateY(0)';
        }, 10);
    }
}

// 醫學圖表互動
function initMedicalChart() {
    const organPoints = document.querySelectorAll('.organ-point');
    const selectedOrganTitle = document.getElementById('selected-organ');
    const organDescription = document.getElementById('organ-description');
    const organDetails = document.getElementById('organ-details');

    // 醫學資料
    const medicalData = {
        heart: {
            name: '心臟',
            description: '心臟是循環系統的核心器官，負責將血液泵送到全身各處。',
            details: {
                '位置': '胸腔中央偏左',
                '功能': '泵血、維持循環',
                '大小': '約拳頭大小',
                '重量': '約250-350克',
                '心跳': '每分鐘60-100次'
            }
        },
        lung: {
            name: '肺臟',
            description: '肺臟負責氣體交換，將氧氣送入血液，排出二氧化碳。',
            details: {
                '位置': '胸腔兩側',
                '功能': '氣體交換、呼吸',
                '結構': '左肺2葉，右肺3葉',
                '容量': '約4-6公升',
                '呼吸頻率': '每分鐘12-20次'
            }
        },
        liver: {
            name: '肝臟',
            description: '肝臟是人體最大的內臟器官，負責代謝、解毒和膽汁生成。',
            details: {
                '位置': '右上腹部',
                '功能': '代謝、解毒、膽汁生成',
                '重量': '約1.5公斤',
                '再生能力': '具有強大的再生能力',
                '重要功能': '蛋白質合成、糖原儲存'
            }
        },
        kidney: {
            name: '腎臟',
            description: '腎臟負責過濾血液，調節水分和電解質平衡，產生尿液。',
            details: {
                '位置': '腰部兩側',
                '功能': '過濾、調節、排泄',
                '數量': '左右各一個',
                '大小': '約拳頭大小',
                '過濾量': '每天約180公升'
            }
        }
    };

    organPoints.forEach(point => {
        point.addEventListener('click', function() {
            const organType = this.dataset.organ;
            const organInfo = medicalData[organType];
            
            if (organInfo) {
                // 更新標題和描述
                selectedOrganTitle.textContent = organInfo.name;
                organDescription.textContent = organInfo.description;
                
                // 更新詳細資訊
                const detailsHtml = Object.entries(organInfo.details)
                    .map(([key, value]) => `
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-light);">
                            <strong>${key}:</strong>
                            <span>${value}</span>
                        </div>
                    `).join('');
                
                organDetails.innerHTML = detailsHtml;
                
                // 添加視覺反饋
                organPoints.forEach(p => p.style.background = 'var(--primary-color)');
                this.style.background = 'var(--accent-color)';
                this.style.transform = 'scale(1.3)';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1.2)';
                }, 200);
            }
        });

        // 懸停效果
        point.addEventListener('mouseenter', function() {
            if (this.style.background !== 'var(--accent-color)') {
                this.style.background = 'var(--success-color)';
            }
        });

        point.addEventListener('mouseleave', function() {
            if (this.style.background !== 'var(--accent-color)') {
                this.style.background = 'var(--primary-color)';
            }
        });
    });
}

// 搜尋系統
function initSearchSystem() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const systemFilter = document.getElementById('system-filter');
    const searchResults = document.getElementById('search-results');

    // 模擬醫學資料
    const medicalDatabase = [
        { name: '心臟病', category: 'diseases', system: 'circulatory', description: '心臟相關疾病總稱' },
        { name: '高血壓', category: 'diseases', system: 'circulatory', description: '血壓持續升高的疾病' },
        { name: '心臟', category: 'organs', system: 'circulatory', description: '循環系統的核心器官' },
        { name: '肺臟', category: 'organs', system: 'respiratory', description: '呼吸系統的主要器官' },
        { name: '肺炎', category: 'diseases', system: 'respiratory', description: '肺部感染性疾病' },
        { name: '肝臟', category: 'organs', system: 'digestive', description: '最大的內臟器官' },
        { name: '肝炎', category: 'diseases', system: 'digestive', description: '肝臟發炎性疾病' },
        { name: '腎臟', category: 'organs', system: 'circulatory', description: '過濾血液的器官' },
        { name: '腎炎', category: 'diseases', system: 'circulatory', description: '腎臟發炎性疾病' },
        { name: '胸痛', category: 'symptoms', system: 'circulatory', description: '胸部疼痛症狀' },
        { name: '咳嗽', category: 'symptoms', system: 'respiratory', description: '呼吸道刺激症狀' },
        { name: '腹痛', category: 'symptoms', system: 'digestive', description: '腹部疼痛症狀' },
        { name: '手術治療', category: 'treatments', system: 'circulatory', description: '外科手術治療方法' },
        { name: '藥物治療', category: 'treatments', system: 'circulatory', description: '使用藥物進行治療' },
        { name: '物理治療', category: 'treatments', system: 'circulatory', description: '物理方法進行治療' }
    ];

    let searchTimeout;

    // 搜尋功能
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        const category = categoryFilter.value;
        const system = systemFilter.value;

        if (!query && !category && !system) {
            searchResults.innerHTML = '<p class="search-placeholder">輸入關鍵字開始搜尋...</p>';
            return;
        }

        const results = medicalDatabase.filter(item => {
            const matchesQuery = !query || 
                item.name.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query);
            const matchesCategory = !category || item.category === category;
            const matchesSystem = !system || item.system === system;

            return matchesQuery && matchesCategory && matchesSystem;
        });

        displaySearchResults(results);
    }

    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p style="color: var(--error-color); text-align: center;">沒有找到相關結果</p>';
            return;
        }

        const resultsHtml = results.map(item => `
            <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem; margin-bottom: 0.5rem; background: var(--surface-color);">
                <h5 style="color: var(--primary-color); margin-bottom: 0.5rem;">${item.name}</h5>
                <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">${item.description}</p>
                <div style="display: flex; gap: 1rem; font-size: 0.8rem;">
                    <span style="background: var(--background-color); padding: 0.25rem 0.5rem; border-radius: 4px; color: var(--text-secondary);">
                        ${getCategoryLabel(item.category)}
                    </span>
                    <span style="background: var(--background-color); padding: 0.25rem 0.5rem; border-radius: 4px; color: var(--text-secondary);">
                        ${getSystemLabel(item.system)}
                    </span>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHtml;
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
            'nervous': '神經系統'
        };
        return labels[system] || system;
    }

    // 事件監聽器
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(performSearch, 300); // 防抖動
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

    // 初始化
    performSearch();
}

// 載入示範
function initLoadingDemo() {
    const loadContentBtn = document.getElementById('load-content');
    const loadImagesBtn = document.getElementById('load-images');
    const simulateApiBtn = document.getElementById('simulate-api');
    const loadingIndicator = document.getElementById('loading-indicator');
    const loadedContent = document.getElementById('loaded-content');

    if (loadContentBtn) {
        loadContentBtn.addEventListener('click', function() {
            showLoadingIndicator();
            
            setTimeout(() => {
                const content = `
                    <h5>醫學資料載入完成</h5>
                    <div style="display: grid; gap: 1rem; margin-top: 1rem;">
                        <div style="background: var(--background-color); padding: 1rem; border-radius: 8px;">
                            <strong>心臟系統</strong><br>
                            <small>負責血液循環和氧氣運輸</small>
                        </div>
                        <div style="background: var(--background-color); padding: 1rem; border-radius: 8px;">
                            <strong>呼吸系統</strong><br>
                            <small>負責氣體交換和呼吸功能</small>
                        </div>
                        <div style="background: var(--background-color); padding: 1rem; border-radius: 8px;">
                            <strong>消化系統</strong><br>
                            <small>負責食物消化和營養吸收</small>
                        </div>
                    </div>
                `;
                loadedContent.innerHTML = content;
                hideLoadingIndicator();
            }, 2000);
        });
    }

    if (loadImagesBtn) {
        loadImagesBtn.addEventListener('click', function() {
            showLoadingIndicator();
            
            setTimeout(() => {
                const content = `
                    <h5>醫學圖片載入完成</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem;">
                        <img src="img/heart.jpeg" alt="心臟" style="width: 100%; border-radius: 8px; box-shadow: var(--shadow);">
                        <img src="img/lung.webp" alt="肺臟" style="width: 100%; border-radius: 8px; box-shadow: var(--shadow);">
                        <img src="img/liver.jpg" alt="肝臟" style="width: 100%; border-radius: 8px; box-shadow: var(--shadow);">
                        <img src="img/kidney.png" alt="腎臟" style="width: 100%; border-radius: 8px; box-shadow: var(--shadow);">
                    </div>
                `;
                loadedContent.innerHTML = content;
                hideLoadingIndicator();
            }, 1500);
        });
    }

    if (simulateApiBtn) {
        simulateApiBtn.addEventListener('click', async function() {
            showLoadingIndicator();
            
            try {
                // 模擬 API 呼叫
                await new Promise(resolve => setTimeout(resolve, 3000));
                
                const content = `
                    <h5>API 資料載入完成</h5>
                    <div style="background: var(--success-color); color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                        <strong>✅ 成功連接到醫學資料庫</strong><br>
                        <small>載入了 156 筆醫學記錄</small>
                    </div>
                    <div style="margin-top: 1rem;">
                        <p>資料包含：</p>
                        <ul style="margin-left: 1rem;">
                            <li>器官功能描述</li>
                            <li>常見疾病資訊</li>
                            <li>症狀對照表</li>
                            <li>治療方法建議</li>
                        </ul>
                    </div>
                `;
                loadedContent.innerHTML = content;
            } catch (error) {
                loadedContent.innerHTML = `
                    <div style="background: var(--error-color); color: white; padding: 1rem; border-radius: 8px;">
                        <strong>❌ 載入失敗</strong><br>
                        <small>請檢查網路連線後重試</small>
                    </div>
                `;
            } finally {
                hideLoadingIndicator();
            }
        });
    }

    function showLoadingIndicator() {
        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex';
        }
        if (loadedContent) {
            loadedContent.innerHTML = '';
        }
    }

    function hideLoadingIndicator() {
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }
}

// 側邊選單功能 (僅 PC 版)
function initSidebar() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('lesson-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 檢查是否為 PC 版
    const isPC = window.innerWidth > 768;
    
    // PC 版側邊選單功能
    if (isPC) {
        // 開啟側邊選單
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.add('open');
                overlay.classList.add('active');
                this.classList.add('active');
            });
        }
        
        // 關閉側邊選單
        function closeSidebar() {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            if (sidebarToggle) {
                sidebarToggle.classList.remove('active');
            }
        }
        
        if (overlay) {
            overlay.addEventListener('click', closeSidebar);
        }
        
        // 鍵盤 ESC 關閉
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });
        
        // 視窗大小改變時關閉側邊選單
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });
    }
    
    // 導航連結點擊（僅 PC 版）
    if (isPC) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // 關閉側邊選單
                    if (sidebar.classList.contains('open')) {
                        sidebar.classList.remove('open');
                        overlay.classList.remove('active');
                        if (sidebarToggle) {
                            sidebarToggle.classList.remove('active');
                        }
                    }
                    
                    // 滾動到目標位置
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            });
        });
        
        // 滾動時高亮當前章節（僅 PC 版）
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('.content-section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        // 監聽滾動事件
        window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
        
        // 初始化高亮
        updateActiveNavLink();
    }
}

// 回到頂部按鈕功能 (僅手機版)
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (!scrollToTopBtn) return;
    
    // 檢查是否為手機版
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // 滾動時顯示/隱藏按鈕
        function toggleScrollButton() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
        
        // 點擊回到頂部
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 監聽滾動事件
        window.addEventListener('scroll', throttle(toggleScrollButton, 100));
        
        // 初始化
        toggleScrollButton();
    }
}

// 平滑滾動
function initSmoothScrolling() {
    // 這個功能現在整合到 initSidebar 中
}

// 工具函數
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// 錯誤處理
window.addEventListener('error', function(e) {
    console.error('JavaScript 錯誤:', e.error);
});

// 頁面載入完成
window.addEventListener('load', function() {
    console.log('所有資源載入完成');
    
    // 添加載入完成動畫
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});
