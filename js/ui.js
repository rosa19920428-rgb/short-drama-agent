/**
 * Short Drama Script Agent - UI Controller
 * 用户界面控制器
 */

const app = {
    engine: new ScriptEngine(),
    currentStep: 1,
    selectedType: 'billionaire-ceo',
    selectedCategory: 'female',
    selectedLanguage: 'zh', // 'zh' 或 'en'
    selectedIdea: null, // 选中的创意
    generatedIdeas: [], // 生成的10个创意
    ideasType: null, // 记录生成创意时的类型，用于检测类型变化

    // ===== 密码配置 =====
    ACCESS_PASSWORD: 'drama2024', // 修改这里来更改访问密码
    isAuthenticated: false,

    // ===== 初始化 =====
    init() {
        this.bindEvents();
        this.showPasswordProtection();
    },

    // ===== 密码保护 =====
    showPasswordProtection() {
        // 检查是否已经验证过（使用sessionStorage，浏览器关闭后失效）
        const authenticated = sessionStorage.getItem('drama_authenticated');
        if (authenticated === 'true') {
            this.unlockApp();
        } else {
            document.getElementById('password-overlay').style.display = 'flex';
            document.getElementById('main-app').style.display = 'none';
            document.getElementById('access-password').focus();
        }
    },

    checkPassword() {
        const input = document.getElementById('access-password').value;
        const errorDiv = document.getElementById('password-error');

        if (input === this.ACCESS_PASSWORD) {
            // 密码正确
            sessionStorage.setItem('drama_authenticated', 'true');
            this.unlockApp();
            errorDiv.classList.add('hidden');
        } else {
            // 密码错误
            errorDiv.classList.remove('hidden');
            document.getElementById('access-password').value = '';
            document.getElementById('access-password').focus();
        }
    },

    unlockApp() {
        document.getElementById('password-overlay').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        this.isAuthenticated = true;

        // 加载项目列表等初始化工作
        this.loadProjectsList();

        // 检查AI服务状态
        this.checkAIServiceStatus();

        console.log('✅ 应用已解锁');
    },

    // 检查AI服务状态
    async checkAIServiceStatus() {
        console.log('%c[系统初始化] 检查AI服务状态...', 'background: #9C27B0; color: white; padding: 2px 6px; border-radius: 4px;');

        if (!window.aiService) {
            console.error('[系统初始化] ❌ AI服务未加载');
            this.showNotification('⚠️ AI服务未正确加载，将使用模板生成创意', 'warning');
            return;
        }

        const isAvailable = window.aiService.isAvailable();
        console.log('[系统初始化] AI服务状态:', isAvailable ? '✅ 可用' : '❌ 不可用');

        if (isAvailable) {
            // 测试API连接
            console.log('[系统初始化] 测试API连接...');
            const isConnected = await window.aiService.testConnection();

            if (isConnected) {
                console.log('[系统初始化] ✅ API连接正常，可以使用AI生成创意');
                this.showNotification('✅ AI服务已就绪，可以使用AI生成创意', 'success');
            } else {
                console.error('[系统初始化] ❌ API连接失败，可能是额度用完或网络问题');
                this.showNotification('⚠️ API连接失败，将使用模板生成创意。请检查OpenRouter额度。', 'warning');
            }
        } else {
            console.warn('[系统初始化] ⚠️ AI服务未配置（API Key无效）');
            this.showNotification('⚠️ AI服务未配置，将使用模板生成创意', 'warning');
        }
    },

    // ===== 事件绑定 =====
    bindEvents() {
        // 主导航
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.navigate(section);
            });
        });

        // 类别标签切换
        document.querySelectorAll('.cat-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.switchCategory(category);
            });
        });

        // 类型选择
        document.querySelectorAll('input[name="type"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.selectedType = e.target.value;
            });
        });
    },

    // ===== 导航 =====
    navigate(section) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === section);
        });

        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.toggle('active', sec.id === section);
        });

        if (section === 'projects') {
            this.loadProjectsList();
        }
    },

    // ===== 步骤导航 =====
    goToStep(step) {
        document.querySelectorAll('.step-item').forEach(item => {
            const itemStep = parseInt(item.dataset.step);
            item.classList.remove('active', 'completed');

            if (itemStep === step) {
                item.classList.add('active');
            } else if (itemStep < step) {
                item.classList.add('completed');
            }
        });

        document.querySelectorAll('.step-panel').forEach(panel => {
            const panelStep = parseInt(panel.dataset.step);
            panel.classList.toggle('active', panelStep === step);
        });

        this.currentStep = step;

        if (step === 2) {
            // 如果类型变化了，清空旧创意
            if (this.ideasType && this.ideasType !== this.selectedType) {
                this.generatedIdeas = [];
                this.ideasType = null;
                this.selectedIdea = null;
            }
            this.renderIdeaSelection();
        } else if (step === 3) {
            // 进入角色设计步骤前，确保创意已同步
            if (this.selectedIdea && this.engine.project) {
                this.engine.project.selectedIdea = this.selectedIdea;
                this.engine.project.creative = this.selectedIdea;
            }
            // 检查类型是否变化，如果变化了需要清空角色（因为角色是类型特定的）
            if (this.charactersType && this.charactersType !== this.selectedType) {
                console.log('[角色设计] 类型变化，清空旧角色');
                this.engine.project.characters = [];
                this.saveProject();
            }
            this.renderCharacterList();
        } else if (step === 4) {
            // 标题选择步骤 - 检查类型是否变化
            if (this.titlesType && this.titlesType !== this.selectedType) {
                console.log('[标题选择] 类型变化，清空旧标题');
                this.generatedTitles = [];
                this.titlesType = null;
                this.engine.project.title = '';
                this.saveProject();
            }
            // 如果没有生成过标题，显示生成按钮
            if (!this.generatedTitles || this.generatedTitles.length === 0) {
                this.renderTitleSelection();
            }
        } else if (step === 5) {
            // 大纲步骤：根据大纲是否存在显示配置或内容
            if (this.engine.project.outline && this.engine.project.outline.length > 0) {
                this.showOutlineDisplay();
            } else {
                this.showOutlineConfig();
            }
        } else if (step === 6) {
            this.renderFullScript();
        }
    },

    nextStep() {
        if (this.currentStep < 6) {
            this.goToStep(this.currentStep + 1);
        }
    },

    prevStep() {
        if (this.currentStep > 1) {
            this.goToStep(this.currentStep - 1);
        }
    },

    // ===== 类别切换 =====
    switchCategory(category) {
        this.selectedCategory = category;

        document.querySelectorAll('.cat-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });

        document.querySelectorAll('.type-panel').forEach(panel => {
            panel.classList.toggle('active', panel.dataset.category === category);
        });

        const firstType = document.querySelector(`.type-panel[data-category="${category}"] input[name="type"]`);
        if (firstType) {
            firstType.checked = true;
            this.selectedType = firstType.value;
        }
    },

    // ===== 生成5个创意供选择（使用AI生成）=====
    async generateIdeas() {
        this.showLoading('正在AI生成创意概念...');

        const typeInfo = DRAMA_TYPES[this.selectedType];
        const ideaCount = 5; // 统一改为5个

        // 重置选择状态（新生成的创意会有新ID）
        this.selectedIdea = null;
        this.generatedIdeas = []; // 清空旧创意，准备接收新创意
        if (this.engine.project) {
            this.engine.project.selectedIdea = null;
            this.engine.project.creative = null;
        }
        console.log('%c[创意生成] 开始生成流程（已重置选择状态）', 'background: #2196F3; color: white; padding: 4px 8px; border-radius: 4px;');
        console.log('[创意生成] 检查AI服务状态:');
        console.log('  - window.aiService存在:', !!window.aiService);
        console.log('  - window.aiService.isAvailable():', window.aiService?.isAvailable?.());
        console.log('  - 选择的类型:', this.selectedType);
        console.log('  - 类型信息:', typeInfo?.name);

        try {
            // 尝试使用AI生成创意
            let ideas = null;
            if (window.aiService && window.aiService.isAvailable()) {
                console.log('[创意生成] ✅ AI服务可用，准备调用AI生成创意...');

                ideas = await window.aiService.generateCreativeIdeas(
                    this.selectedType,
                    typeInfo,
                    ideaCount
                );

                console.log('[创意生成] AI返回结果:', ideas);
            } else {
                console.warn('[创意生成] ❌ AI服务不可用:');
                console.warn('  - window.aiService存在:', !!window.aiService);
                if (window.aiService) {
                    console.warn('  - isAvailable():', window.aiService.isAvailable());
                    console.warn('  - useAI:', window.aiService.useAI);
                    console.warn('  - API_KEY长度:', window.aiService.API_KEY?.length);
                }

                // 显示用户提示
                if (!window.aiService) {
                    this.showNotification('AI服务未加载，将使用模板生成创意。请刷新页面重试。', 'error');
                } else if (!window.aiService.isAvailable()) {
                    this.showNotification('AI服务未配置，将使用模板生成创意。请检查API Key设置。', 'warning');
                }
            }

            // 如果AI生成失败或不可用，回退到模板生成
            if (!ideas || ideas.length === 0) {
                console.warn('[创意生成] ⚠️ AI生成失败或返回空，回退到模板生成');
                this.showNotification('AI服务暂不可用，使用模板生成创意。请检查API设置。', 'warning');
                ideas = IDEA_GENERATOR.generateIdeas(this.selectedType, ideaCount);
                console.log('[创意生成] 模板生成结果:', ideas);
            } else {
                console.log(`[创意生成] ✅ 成功生成${ideas.length}个创意（AI）`);
                console.log('[创意生成] 创意标题:', ideas.map(i => i.title).join(', '));
                this.showNotification(`✅ 成功生成${ideas.length}个AI创意！这些创意基于不同的职业背景。`, 'success');
            }

            console.log('[创意生成] 即将设置generatedIdeas, 数量:', ideas.length);
            this.generatedIdeas = ideas;
            this.ideasType = this.selectedType; // 记录生成创意时的类型
            console.log('[创意生成] 设置完成, generatedIdeas数量:', this.generatedIdeas.length);
            this.renderIdeaSelection();

        } catch (error) {
            console.error('[创意生成] ❌ 生成过程出错:', error);
            console.error('[创意生成] 错误详情:', error.message);
            console.error('[创意生成] 错误堆栈:', error.stack);

            // 出错时使用模板
            console.warn('[创意生成] 使用模板作为最终回退');
            this.generatedIdeas = IDEA_GENERATOR.generateIdeas(this.selectedType, ideaCount);
            this.ideasType = this.selectedType;
            this.renderIdeaSelection();
        } finally {
            this.hideLoading();
            console.log('[创意生成] 流程结束');
        }
    },

    renderIdeaSelection() {
        const container = document.getElementById('idea-selection-panel');
        if (!container) return;

        // 调试日志
        console.log('[渲染] generatedIdeas数量:', this.generatedIdeas.length);
        console.log('[渲染] generatedIdeas详情:', this.generatedIdeas);

        // 统一生成5个创意（使用AI）
        const ideaCount = 5;

        if (this.generatedIdeas.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">点击按钮生成${ideaCount}个创意概念</p>
                    <button class="btn-primary" onclick="app.generateIdeas()">AI生成${ideaCount}个创意</button>
                    <p style="color: var(--text-secondary); margin-top: 15px; font-size: 0.85rem;">或</p>
                    <button class="btn-secondary" onclick="app.showCustomIdeaForm()">手动添加创意</button>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn-secondary" onclick="app.generateIdeas()">🔄 AI重新生成</button>
                <button class="btn-secondary" onclick="app.showCustomIdeaForm()">✏️ 手动添加创意</button>
                <span style="color: var(--text-secondary); margin-left: auto; align-self: center;">点击卡片选择或编辑</span>
            </div>
            <div class="ideas-grid" style="display: grid; grid-template-columns: 1fr; gap: 15px;">
                ${this.generatedIdeas.map((idea, index) => `
                    <div class="idea-card ${this.selectedIdea?.id === idea.id ? 'selected' : ''}"
                         style="background: var(--cinema-black); border: 2px solid ${this.selectedIdea?.id === idea.id ? 'var(--cinema-gold)' : 'var(--cinema-gray)'};
                                border-radius: 10px; padding: 20px; transition: all 0.3s;"
                         data-idea-id="${idea.id}">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <span style="color: var(--cinema-gold); font-weight: bold;">#${index + 1}${idea.isCustom ? ' (手动添加)' : ''}${idea.isEdited ? ' ✏️已编辑' : ''}</span>
                            <div>
                                <button onclick="app.editIdea('${idea.id}')" style="background: transparent; border: 1px solid var(--cinema-gray); color: var(--text-secondary); padding: 4px 12px; border-radius: 4px; margin-right: 8px; cursor: pointer;">编辑</button>
                                <button onclick="app.selectIdea('${idea.id}')" style="background: ${this.selectedIdea?.id === idea.id ? 'var(--success)' : 'var(--cinema-gold)'}; border: none; color: ${this.selectedIdea?.id === idea.id ? 'white' : 'var(--cinema-black)'}; padding: 4px 12px; border-radius: 4px; cursor: pointer;">${this.selectedIdea?.id === idea.id ? '✓ 已选择' : '选择'}</button>
                            </div>
                        </div>
                        <h4 style="margin-bottom: 10px; color: var(--text-primary);">${idea.title}</h4>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 10px; line-height: 1.5;"><strong>核心设定：</strong>${idea.concept}</p>
                        <div style="background: var(--cinema-black-light); padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <p style="color: var(--text-primary); line-height: 1.8; font-size: 0.9rem;">${idea.synopsis}</p>
                        </div>
                        <div style="border-top: 1px solid var(--cinema-gray); padding-top: 10px;">
                            <p style="color: var(--cinema-gold); font-size: 0.8rem; margin-bottom: 5px;"><strong>核心期待：</strong></p>
                            <p style="color: var(--cinema-gold); font-size: 0.8rem; margin-bottom: 3px; padding-left: 10px;">• 外在事件：${idea.externalHook || idea.hook || '悬念待揭晓'}</p>
                            ${idea.internalHook ? `<p style="color: var(--cinema-gold); font-size: 0.8rem; margin-bottom: 5px; padding-left: 10px;">• 内在情感：${idea.internalHook}</p>` : ''}
                            <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px;">
                                ${idea.highlights?.map(h => `<span style="background: var(--cinema-gray); padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; color: var(--text-secondary);">${h}</span>`).join('') || ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${this.selectedIdea ? `
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--cinema-gray);">
                    <h4 style="margin-bottom: 15px;">已选择的创意</h4>
                    <div style="background: rgba(212, 165, 116, 0.1); border: 1px solid var(--cinema-gold); border-radius: 10px; padding: 20px;">
                        <h3 style="margin-bottom: 10px;">${this.selectedIdea.title}</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 10px;">${this.selectedIdea.concept}</p>
                        <div style="background: var(--cinema-black-light); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                            <p style="color: var(--text-primary); line-height: 1.8;">${this.selectedIdea.synopsis}</p>
                        </div>
                        <div style="border-top: 1px solid var(--cinema-gold); padding-top: 10px;">
                            <p style="color: var(--cinema-gold); font-size: 0.9rem; margin-bottom: 5px;"><strong>核心期待：</strong></p>
                            <p style="color: var(--cinema-gold); font-size: 0.85rem; margin-bottom: 3px; padding-left: 10px;">• 外在事件：${this.selectedIdea.externalHook || this.selectedIdea.hook || '悬念待揭晓'}</p>
                            ${this.selectedIdea.internalHook ? `<p style="color: var(--cinema-gold); font-size: 0.85rem; padding-left: 10px;">• 内在情感：${this.selectedIdea.internalHook}</p>` : ''}
                        </div>
                    </div>
                    <button class="next-btn" style="margin-top: 20px;" onclick="app.goToStep(3)">进入角色设计 →</button>
                </div>
            ` : ''}
        `;
    },

    selectIdea(ideaId) {
        this.selectedIdea = this.generatedIdeas.find(i => i.id === ideaId);
        // 立即同步到项目中
        if (this.engine.project && this.selectedIdea) {
            this.engine.project.selectedIdea = this.selectedIdea;
            this.engine.project.creative = this.selectedIdea;
            console.log('创意已同步到项目:', this.selectedIdea.title);
        }
        this.renderIdeaSelection();
    },

    // 显示自定义创意表单
    showCustomIdeaForm(ideaId = null) {
        const isEdit = ideaId !== null;
        const idea = isEdit ? this.generatedIdeas.find(i => i.id === ideaId) : null;

        const formHtml = `
            <div id="custom-idea-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 1000; display: flex; align-items: center; justify-content: center;"
                 onclick="if(event.target.id === 'custom-idea-modal') app.closeCustomIdeaForm()">
                <div style="background: var(--cinema-black-card); border: 1px solid var(--cinema-gray); border-radius: 12px; padding: 30px; width: 90%; max-width: 600px; max-height: 80vh; overflow-y: auto;">
                    <h3 style="margin-bottom: 20px;">${isEdit ? '编辑创意' : '手动添加创意'}</h3>
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label>创意标题</label>
                        <input type="text" id="custom-idea-title" value="${idea?.title || ''}" placeholder="给你的创意起一个标题" style="width: 100%; padding: 10px; background: var(--cinema-black); border: 1px solid var(--cinema-gray); border-radius: 6px; color: var(--text-primary); margin-top: 5px;">
                    </div>
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label>核心设定（一句话）</label>
                        <input type="text" id="custom-idea-concept" value="${idea?.concept || ''}" placeholder="用一句话概括核心设定" style="width: 100%; padding: 10px; background: var(--cinema-black); border: 1px solid var(--cinema-gray); border-radius: 6px; color: var(--text-primary); margin-top: 5px;">
                    </div>
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label>故事梗概（400-500字） <span id="synopsis-char-count" style="color: var(--text-secondary); font-size: 0.8rem;">${idea?.synopsis ? `(${idea.synopsis.length}字)` : ''}</span></label>
                        <textarea id="custom-idea-synopsis" rows="12" placeholder="详细描述故事的开头、发展、高潮和结局..." style="width: 100%; padding: 10px; background: var(--cinema-black); border: 1px solid var(--cinema-gray); border-radius: 6px; color: var(--text-primary); margin-top: 5px; resize: vertical;" oninput="app.updateSynopsisCount(this)">${idea?.synopsis || ''}</textarea>
                        <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 5px;">要求400-500字详细梗概，包含起承转合的具体情节</p>
                    </div>
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label>核心期待 - 外在事件</label>
                        <input type="text" id="custom-idea-external-hook" value="${idea?.externalHook || idea?.hook || ''}" placeholder="比如：男女主角何时解开误会 / 女主角何时破处 / 真相何时揭露" style="width: 100%; padding: 10px; background: var(--cinema-black); border: 1px solid var(--cinema-gray); border-radius: 6px; color: var(--text-primary); margin-top: 5px;">
                        <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 5px;">外在事件：推动剧情发展的关键悬念</p>
                    </div>
                    <div class="form-group" style="margin-bottom: 20px;">
                        <label>核心期待 - 内在情感</label>
                        <input type="text" id="custom-idea-internal-hook" value="${idea?.internalHook || ''}" placeholder="比如：男女主角何时打破暧昧真正走到一起 / 男主角何时承认脆弱" style="width: 100%; padding: 10px; background: var(--cinema-black); border: 1px solid var(--cinema-gray); border-radius: 6px; color: var(--text-primary); margin-top: 5px;">
                        <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 5px;">内在情感：角色关系发展的情感期待</p>
                    </div>
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button class="btn-secondary" onclick="app.closeCustomIdeaForm()">取消</button>
                        <button class="btn-primary" onclick="app.saveCustomIdea('${ideaId || ''}')">${isEdit ? '保存修改' : '添加创意'}</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', formHtml);
    },

    // 更新梗概字数统计
    updateSynopsisCount(textarea) {
        const count = textarea.value.length;
        const countSpan = document.getElementById('synopsis-char-count');
        if (countSpan) {
            countSpan.textContent = `(${count}字)`;
            // 根据字数改变颜色
            if (count >= 400 && count <= 500) {
                countSpan.style.color = '#4CAF50'; // 绿色：符合要求
            } else if (count < 200) {
                countSpan.style.color = '#f44336'; // 红色：太短
            } else {
                countSpan.style.color = '#ff9800'; // 橙色：接近要求
            }
        }
    },

    closeCustomIdeaForm() {
        const modal = document.getElementById('custom-idea-modal');
        if (modal) modal.remove();
    },

    saveCustomIdea(ideaId) {
        const title = document.getElementById('custom-idea-title').value.trim();
        const concept = document.getElementById('custom-idea-concept').value.trim();
        const synopsis = document.getElementById('custom-idea-synopsis').value.trim();
        const externalHook = document.getElementById('custom-idea-external-hook')?.value.trim() || '';
        const internalHook = document.getElementById('custom-idea-internal-hook')?.value.trim() || '';

        if (!title || !concept || !synopsis) {
            alert('请填写完整信息');
            return;
        }

        // 确保核心期待有值
        if (!externalHook) {
            alert('请填写核心期待 - 外在事件，这是推动剧情的关键');
            return;
        }

        if (ideaId) {
            // 编辑现有创意
            const index = this.generatedIdeas.findIndex(i => i.id === ideaId);
            if (index !== -1) {
                const updatedIdea = {
                    ...this.generatedIdeas[index],
                    title,
                    concept,
                    synopsis,
                    externalHook: externalHook || this.generatedIdeas[index].externalHook,
                    internalHook: internalHook || this.generatedIdeas[index].internalHook,
                    hook: externalHook || this.generatedIdeas[index].hook, // 兼容旧数据
                    isCustom: true,
                    isEdited: true // 标记已被编辑
                };

                this.generatedIdeas[index] = updatedIdea;

                // 如果该创意当前被选中，同步更新selectedIdea
                if (this.selectedIdea && this.selectedIdea.id === ideaId) {
                    this.selectedIdea = updatedIdea;
                    // 同步到项目
                    if (this.engine.project) {
                        this.engine.project.selectedIdea = updatedIdea;
                        this.engine.project.creative = updatedIdea;
                    }
                    console.log('[创意编辑] 已同步更新选中的创意:', updatedIdea.title);
                }

                this.showNotification('✅ 创意已更新', 'success');

                // 显示快捷操作提示
                if (this.selectedIdea?.id === ideaId) {
                    setTimeout(() => {
                        this.showNotification('💡 创意已更新，点击"进入角色设计 →"继续', 'info');
                    }, 500);
                }
            }
        } else {
            // 添加新创意
            const newIdea = {
                id: `idea-custom-${Date.now()}`,
                title,
                concept,
                synopsis,
                externalHook: externalHook || '观众期待的关键事件',
                internalHook: internalHook || '男女主角何时打破暧昧，真正走到一起',
                hook: externalHook || '观众期待的关键事件', // 兼容旧数据
                highlights: ['自定义看点'],
                type: '自定义',
                isCustom: true
            };
            this.generatedIdeas.push(newIdea);
            this.ideasType = this.selectedType; // 记录添加创意时的类型
        }

        this.closeCustomIdeaForm();
        this.renderIdeaSelection();
    },

    editIdea(ideaId) {
        this.showCustomIdeaForm(ideaId);
    },

    // ===== 语言切换 =====
    setLanguage(lang) {
        this.selectedLanguage = lang;
        // 更新UI显示
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        // 如果已经在剧本页面，重新渲染
        if (this.currentStep === 5) {
            this.renderFullScript();
        }
    },

    // ===== 角色管理 =====
    renderCharacterList() {
        const container = document.getElementById('character-list');
        const characters = this.engine.project.characters;

        let html = `
            <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn-primary" onclick="app.generateAICharacters()">🤖 AI生成全部角色</button>
                <button class="btn-secondary" onclick="app.showCharacterForm()">✏️ 手动添加角色</button>
            </div>
        `;

        if (characters.length === 0) {
            html += '<p style="color: var(--text-secondary); text-align: center; padding: 40px;">暂无角色，点击上方按钮AI生成或手动添加</p>';
        } else {
            html += characters.map(char => `
                <div class="character-card" data-id="${char.id}" style="cursor: pointer; transition: all 0.3s;">
                    <h5 onclick="app.selectCharacter('${char.id}')">
                        ${char.name}
                        <span class="tag">${this.getRoleLabel(char.role)}</span>
                        ${char.isAIGenerated ? '<span style="background: var(--cinema-gold); color: var(--cinema-black); padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; margin-left: 5px;">AI</span>' : ''}
                    </h5>
                    <p onclick="app.selectCharacter('${char.id}')">${char.bio?.substring(0, 80) || '暂无描述'}...</p>
                    ${char.detailedInfo ? `<button onclick="app.showCharacterDetail('${char.id}')" style="margin-top: 10px; padding: 5px 10px; background: var(--cinema-gold-dark); color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 0.85rem;">📖 查看详细小传</button>` : ''}
                </div>
            `).join('');
        }

        container.innerHTML = html;
    },

    // AI生成全部标准角色
    async generateAICharacters() {
        const typeInfo = DRAMA_TYPES[this.selectedType];
        const creative = this.selectedIdea;

        if (!creative) {
            alert('请先生成并选择一个创意');
            return;
        }

        this.showLoading('AI正在生成详细人物设定...');

        try {
            // 调用AI服务生成详细人物（6个角色）
            const aiCharacters = await aiService.generateCharactersWithAI(
                creative,
                typeInfo,
                6
            );

            // 只清空AI生成的角色，保留手动添加的角色
            this.engine.project.characters = this.engine.project.characters.filter(char => !char.isAIGenerated);

            // 添加AI生成的角色（同步添加，不使用setTimeout）
            aiCharacters.forEach((char) => {
                this.engine.addCharacter({
                    name: char.name,
                    gender: char.role === 'love-interest' && typeInfo.category === 'female' ? 'male' : 'female',
                    age: char.detailedInfo?.age || '25',
                    role: char.role,
                    bio: char.desc,
                    detailedInfo: char.detailedInfo, // 保存详细信息
                    relationships: '',
                    isAIGenerated: true
                });
            });

            // 添加完成后立即渲染列表
            this.renderCharacterList();

            // 记录生成角色时的类型
            this.charactersType = this.selectedType;
            this.saveProject();

            this.hideLoading();
            alert('✅ AI人物生成完成！6个角色已生成（主角、恋爱对象、主要反派、次要反派、闺蜜、喜剧角色），点击角色查看详细小传');

        } catch (error) {
            console.error('AI人物生成失败:', error);
            this.hideLoading();
            alert('AI人物生成失败: ' + error.message + '\n将使用模板生成');

            // 失败时使用模板
            this.generateCharactersFromTemplate();
        }
    },

    // 分批生成大纲的进度提示
    showBatchProgress(total, current) {
        const loadingText = document.getElementById('loading-text');
        if (loadingText) {
            loadingText.textContent = `AI正在分批生成大纲 (${current}/${total}批，每批5集)...`;
        }
    },

    // 显示人物详细小传
    showCharacterDetail(charId) {
        const char = this.engine.project.characters.find(c => c.id === charId);
        if (!char || !char.detailedInfo) {
            alert('暂无详细小传');
            return;
        }

        const info = char.detailedInfo;
        const detailText = `
【${char.name} - 详细人物小传】

📋 基本信息：
姓名：${char.name}
年龄：${info.age || '未知'}
身份：${this.getRoleLabel(char.role)}

🎭 外貌特征：
${info.appearance || '暂无描述'}

💭 性格特点：
${info.personality || '暂无描述'}

📖 背景故事：
${info.background || '暂无描述'}

🎯 核心动机：
${info.motivation || '暂无描述'}

🔒 隐藏秘密：
${info.secret || '暂无'}

📊 人物简介：
${char.bio || '暂无'}
        `.trim();

        // 创建弹窗显示
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 20px;
        `;
        modal.innerHTML = `
            <div style="background: var(--cinema-black-card); border: 2px solid var(--cinema-gold); border-radius: 16px; padding: 30px; max-width: 600px; max-height: 80vh; overflow-y: auto; color: var(--text-primary); position: relative;">
                <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: var(--text-secondary); font-size: 1.5rem; cursor: pointer;">&times;</button>
                <pre style="white-space: pre-wrap; line-height: 1.8; font-family: inherit;">${detailText}</pre>
                <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 20px; padding: 10px 20px; background: var(--cinema-gold); color: var(--cinema-black); border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">关闭</button>
            </div>
        `;
        document.body.appendChild(modal);
    },

    generateCharacterFromTemplate(template, typeInfo) {
        const isFemale = template.role === 'protagonist' && typeInfo.category === 'female' ||
                        template.role === 'love-interest' && typeInfo.category === 'male';

        const firstNames = isFemale ?
            ['Emma', 'Sophia', 'Olivia', 'Ava', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn'] :
            ['Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Benjamin', 'Lucas', 'Henry', 'Alexander'];

        const lastNames = ['Anderson', 'Thompson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Adams', 'Nelson'];

        const name = template.name || `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;

        const ages = ['20岁', '22岁', '25岁', '28岁', '30岁', '32岁', '35岁'];
        const age = ages[Math.floor(Math.random() * ages.length)];

        // 根据角色类型生成详细设定
        const bio = this.generateCharacterBio(template, typeInfo, age);

        return {
            name: name,
            gender: isFemale ? 'female' : 'male',
            age: age,
            role: template.role,
            bio: bio,
            relationships: template.relationships || '',
            isAIGenerated: true
        };
    },

    generateCharacterBio(template, typeInfo, age) {
        const role = template.role;

        const personalities = {
            protagonist: ['坚强独立', '善良坚韧', '聪明机智', '外表柔弱内心强大', '有原则有底线'],
            'love-interest': ['外冷内热', '霸道专一', '神秘迷人', '温柔体贴', '强势保护欲'],
            antagonist: ['心机深沉', '嫉妒心强', '为达目的不择手段', '表面和善内心阴暗', '偏执疯狂'],
            supporting: ['忠诚可靠', '幽默风趣', '关键时刻助攻', '知情达理', '重情重义']
        };

        const backgrounds = [
            '出身优越但内心孤独',
            '家境普通靠努力打拼',
            '经历过重大创伤',
            '隐藏身份低调生活',
            '背负着家族使命',
            '曾经辉煌如今落魄'
        ];

        const motivations = [
            '渴望真爱与归属',
            '想要证明自己',
            '为家人复仇',
            '守护重要之人',
            '实现未完成的梦想',
            '摆脱过去阴影'
        ];

        const personality = personalities[role] ? personalities[role][Math.floor(Math.random() * personalities[role].length)] : '性格鲜明';
        const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        const motivation = motivations[Math.floor(Math.random() * motivations.length)];

        let bio = `${template.desc}。${age}，${personality}。`;
        bio += `${background}，${motivation}。`;

        // 根据类型添加特色
        if (typeInfo.category === 'female' && role === 'protagonist') {
            bio += '在感情中经历过伤害，但依然相信爱情。';
        } else if (typeInfo.category === 'male' && role === 'protagonist') {
            bio += '曾被人轻视羞辱，发誓要让所有人刮目相看。';
        }

        return bio;
    },

    // 当AI失败时使用模板生成角色
    generateCharactersFromTemplate() {
        const typeInfo = DRAMA_TYPES[this.selectedType];
        if (!typeInfo?.standardCharacters) {
            alert('暂无标准角色模板');
            return;
        }

        // 清空现有角色
        this.engine.project.characters = [];

        // 生成每个标准角色
        typeInfo.standardCharacters.forEach((template, index) => {
            setTimeout(() => {
                const char = this.generateCharacterFromTemplate(template, typeInfo);
                this.engine.addCharacter(char);
                this.renderCharacterList();
            }, index * 100);
        });

        // 记录生成角色时的类型
        this.charactersType = this.selectedType;
        this.saveProject();

        this.hideLoading();
    },

    showCharacterForm(charId = null) {
        const isEdit = charId !== null;
        const char = isEdit ? this.engine.project.characters.find(c => c.id === charId) : null;

        // 填充表单
        if (char) {
            document.getElementById('char-name').value = char.name;
            document.getElementById('char-gender').value = char.gender || 'female';
            document.getElementById('char-age').value = char.age || '';
            document.getElementById('char-type').value = char.role || 'protagonist';
            document.getElementById('char-bio').value = char.bio || '';
            document.getElementById('char-relationships').value = char.relationships || '';

            // 更改保存按钮行为
            const saveBtn = document.querySelector('.character-editor .btn-primary');
            if (saveBtn) {
                saveBtn.onclick = () => this.updateCharacter(charId);
                saveBtn.textContent = '保存修改';
            }
        } else {
            this.clearCharacterForm();
            const saveBtn = document.querySelector('.character-editor .btn-primary');
            if (saveBtn) {
                saveBtn.onclick = () => this.saveCharacter();
                saveBtn.textContent = '添加角色';
            }
        }
    },

    updateCharacter(charId) {
        const charData = {
            name: document.getElementById('char-name').value,
            gender: document.getElementById('char-gender').value,
            age: document.getElementById('char-age').value,
            role: document.getElementById('char-type').value,
            bio: document.getElementById('char-bio').value,
            relationships: document.getElementById('char-relationships').value,
            isAIGenerated: false // 手动修改后标记
        };

        if (!charData.name) {
            alert('请输入角色姓名');
            return;
        }

        this.engine.updateCharacter(charId, charData);
        this.renderCharacterList();
        this.clearCharacterForm();

        // 恢复按钮
        const saveBtn = document.querySelector('.character-editor .btn-primary');
        if (saveBtn) {
            saveBtn.onclick = () => this.saveCharacter();
            saveBtn.textContent = '添加角色';
        }
    },

    saveCharacter() {
        const charData = {
            name: document.getElementById('char-name').value,
            gender: document.getElementById('char-gender').value,
            age: document.getElementById('char-age').value,
            role: document.getElementById('char-type').value,
            bio: document.getElementById('char-bio').value,
            relationships: document.getElementById('char-relationships').value
        };

        if (!charData.name) {
            alert('请输入角色姓名');
            return;
        }

        this.engine.addCharacter(charData);
        this.renderCharacterList();
        this.clearCharacterForm();
    },

    selectCharacter(charId) {
        const char = this.engine.project.characters.find(c => c.id === charId);
        if (!char) return;

        document.getElementById('char-name').value = char.name;
        document.getElementById('char-gender').value = char.gender || 'female';
        document.getElementById('char-age').value = char.age || '';
        document.getElementById('char-type').value = char.role || 'protagonist';
        document.getElementById('char-bio').value = char.bio || '';
        document.getElementById('char-relationships').value = char.relationships || '';

        document.querySelectorAll('.character-card').forEach(card => {
            card.classList.toggle('active', card.dataset.id === charId);
        });
    },

    clearCharacterForm() {
        document.getElementById('char-name').value = '';
        document.getElementById('char-age').value = '';
        document.getElementById('char-bio').value = '';
        document.getElementById('char-relationships').value = '';
    },

    getRoleLabel(role) {
        const labels = {
            protagonist: '主角',
            'love-interest': '恋爱对象',
            antagonist: '主要反派',
            antagonist2: '次要反派',
            supporting: '闺蜜/好友',
            supporting2: '喜剧角色/同事'
        };
        return labels[role] || role;
    },

    getRoleEmoji(role) {
        const emojis = {
            protagonist: '👸',
            'love-interest': '👔',
            antagonist: '👿',
            antagonist2: '😈',
            supporting: '👯',
            supporting2: '😄'
        };
        return emojis[role] || '👤';
    },

    // ===== 生成剧本 =====
    generateScript(category) {
        this.showLoading('正在初始化项目...');

        const title = document.getElementById(`${category}-title`)?.value || '未命名剧集';
        // 集数和时长现在在大纲页面配置，这里使用默认值
        const episodes = 40;  // 默认值，可在大纲页面修改
        const duration = 90;  // 默认值，可在大纲页面修改

        console.log('初始化项目:', { selectedType: this.selectedType, episodes, duration, title });

        if (!this.selectedType) {
            alert('错误：请先选择剧集类型');
            this.hideLoading();
            return;
        }

        // 检查选中的创意是否匹配当前类型
        if (this.selectedIdea && this.selectedIdea.type !== this.selectedType) {
            console.log('创意类型不匹配，清空选择:', this.selectedIdea.type, '!==', this.selectedType);
            this.selectedIdea = null;
            this.generatedIdeas = [];
            this.ideasType = null;
        }

        this.engine.initProject(this.selectedType, episodes, duration, title);

        // 如果有选中的创意，保存到项目
        if (this.selectedIdea) {
            this.engine.project.selectedIdea = this.selectedIdea;
            this.engine.project.creative = this.selectedIdea;
            console.log('项目初始化完成，已绑定创意:', this.selectedIdea.title);
        } else {
            console.log('项目初始化完成，无选中创意');
        }

        setTimeout(() => {
            this.hideLoading();
            this.goToStep(2);
        }, 500);
    },

    // ===== 生成分集大纲 =====
    async generateOutline() {
        console.log('[大纲生成] 开始生成流程');

        // 获取集数和时长配置
        const episodesInput = document.getElementById('outline-episode-count');
        const durationInput = document.getElementById('outline-episode-duration');

        const episodes = episodesInput ? parseInt(episodesInput.value) : 40;
        const duration = durationInput ? parseInt(durationInput.value) : 90;

        console.log('[大纲生成] 配置:', { episodes, duration });

        // 更新项目配置
        if (this.engine.project) {
            this.engine.project.episodes = episodes;
            this.engine.project.duration = duration;
        }

        // 检查使用AI还是模板
        const useAI = aiService.isAvailable();
        this.showLoading(useAI ? '🤖 AI正在生成高质量大纲...' : '正在生成分集大纲（模板模式）...');

        // 显示提示
        if (!useAI) {
            console.log('提示: 配置Kimi AI可获得更高质量的大纲');
        }

        // 检查项目是否存在
        if (!this.engine.project) {
            alert('错误: 项目未初始化，请返回第一步重新开始');
            this.hideLoading();
            return;
        }

        // 检查必要数据
        if (!this.engine.project.typeInfo) {
            console.error('类型信息缺失，尝试自动修复...');
            if (this.selectedType && DRAMA_TYPES[this.selectedType]) {
                this.engine.project.typeInfo = DRAMA_TYPES[this.selectedType];
                this.engine.project.type = this.selectedType;
                this.engine.project.category = DRAMA_TYPES[this.selectedType].category;
            } else {
                alert('错误: 未找到类型信息，请返回第一步重新选择类型');
                this.hideLoading();
                return;
            }
        }

        // 确保使用最新的创意和角色数据
        if (this.selectedIdea) {
            this.engine.project.creative = this.selectedIdea;
            this.engine.project.selectedIdea = this.selectedIdea;
        }

        try {
            console.log('[大纲生成] 开始调用生成服务...');

            // 检查是否使用AI生成
            if (aiService.isAvailable()) {
                console.log('使用AI生成大纲...');
                const outline = await aiService.generateOutline(this.engine.project);
                this.engine.project.outline = outline;
                console.log('AI大纲生成成功，集数:', outline.length);
            } else {
                console.log('使用模板生成大纲...');
                this.engine.generateOutline();
                console.log('模板大纲生成成功，集数:', this.engine.project.outline?.length);
            }

            // 生成成功后，切换显示
            this.hideLoading();
            this.showOutlineDisplay();

        } catch (error) {
            console.error('[大纲生成] 失败:', error);
            alert('生成失败: ' + error.message);
            this.hideLoading();
        }
    },

    // 显示大纲内容（隐藏配置面板，显示内容面板）
    showOutlineDisplay() {
        const configPanel = document.getElementById('outline-config-panel');
        const displayPanel = document.getElementById('outline-display-panel');

        if (configPanel) configPanel.style.display = 'none';
        if (displayPanel) displayPanel.style.display = 'block';

        // 渲染大纲
        this.renderOutline();
    },

    // 显示大纲配置（用于重新生成时）
    showOutlineConfig() {
        const configPanel = document.getElementById('outline-config-panel');
        const displayPanel = document.getElementById('outline-display-panel');

        if (configPanel) configPanel.style.display = 'block';
        if (displayPanel) displayPanel.style.display = 'none';
    },

    // ===== 重新生成分集大纲 =====
    async regenerateOutline() {
        // 清空现有大纲，显示配置面板
        this.engine.project.outline = [];
        this.showOutlineConfig();

        // 滚动到页面顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });

        console.log('[大纲重新生成] 已清空大纲，显示配置面板');
    },

    // ===== 标题生成与选择 =====
    async generateTitles() {
        this.showLoading('AI正在生成标题选项...');

        try {
            // 确保项目数据完整
            if (!this.engine.project.creative && this.selectedIdea) {
                this.engine.project.creative = this.selectedIdea;
            }

            // 检查并修复 typeInfo
            if (!this.engine.project.typeInfo) {
                console.log('[标题生成] typeInfo缺失，尝试自动修复...');
                if (this.selectedType && DRAMA_TYPES[this.selectedType]) {
                    this.engine.project.typeInfo = DRAMA_TYPES[this.selectedType];
                    this.engine.project.type = this.selectedType;
                    this.engine.project.category = DRAMA_TYPES[this.selectedType].category;
                    console.log('[标题生成] typeInfo修复成功:', this.selectedType);
                } else {
                    throw new Error('无法确定剧集类型，请返回第一步重新选择类型');
                }
            }

            // 确保角色数据存在
            if (!this.engine.project.characters || this.engine.project.characters.length === 0) {
                console.warn('[标题生成] 角色数据为空，使用当前角色');
            }

            // 调用AI服务生成标题
            const titles = await aiService.generateTitles(this.engine.project);
            this.generatedTitles = titles;

            // 记录生成标题时的类型
            this.titlesType = this.selectedType;
            this.saveProject();

            this.renderTitleSelection();

            this.hideLoading();
        } catch (error) {
            console.error('生成标题失败:', error);
            this.hideLoading();
            alert('生成标题失败: ' + (error.message || '未知错误'));
        }
    },

    renderTitleSelection() {
        const container = document.getElementById('title-selection-panel');
        if (!container) return;

        if (!this.generatedTitles || this.generatedTitles.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">点击下方按钮生成标题选项</p>
                    <button class="btn-primary" onclick="app.generateTitles()">✨ AI生成5个标题</button>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div style="margin-bottom: 20px;">
                <p style="color: var(--text-secondary); margin-bottom: 20px;">
                    💡 点击选择最符合你心意的标题（当前选中：<strong style="color: var(--cinema-gold);">${this.engine.project.title}</strong>）
                </p>
                <div style="display: grid; gap: 15px;">
                    ${this.generatedTitles.map((title, index) => `
                        <div class="title-option ${this.engine.project.title === title.main ? 'selected' : ''}"
                             onclick="app.selectTitle(${index})"
                             style="cursor: pointer; padding: 20px; border: 2px solid ${this.engine.project.title === title.main ? 'var(--cinema-gold)' : 'var(--border-color)'};
                                    border-radius: 10px; transition: all 0.3s; background: ${this.engine.project.title === title.main ? 'rgba(218, 165, 32, 0.1)' : 'transparent'};">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <h3 style="margin: 0 0 8px 0; color: var(--text-primary); font-size: 1.3rem;">${title.main}</h3>
                                    <p style="margin: 0; color: var(--text-secondary); font-style: italic; font-size: 0.95rem;">${title.sub}</p>
                                </div>
                                <div style="font-size: 1.5rem; margin-left: 15px;">
                                    ${this.engine.project.title === title.main ? '✅' : '⭕'}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <button class="btn-secondary" onclick="app.generateTitles()">🔄 重新生成标题</button>
            </div>
        `;
    },

    selectTitle(index) {
        if (this.generatedTitles && this.generatedTitles[index]) {
            const selectedTitle = this.generatedTitles[index];
            this.engine.project.title = selectedTitle.main;
            this.renderTitleSelection();
            console.log('选择标题:', selectedTitle);
        }
    },

    // ===== 渲染大纲 =====
    renderOutline() {
        const outline = this.engine.project.outline;
        const container = document.getElementById('outline-detailed');
        const arcContainer = document.getElementById('story-arc');

        document.getElementById('outline-total').textContent = outline.length;
        document.getElementById('outline-twists').textContent = outline.filter(e => e.isTwist).length;

        arcContainer.innerHTML = `
            <div class="arc-visualization" style="display: flex; align-items: flex-end; height: 60px; gap: 2px;">
                ${outline.map((ep, i) => {
                    const height = ep.isClimax ? 100 : ep.isTwist ? 70 : 30 + Math.sin(i * 0.2) * 20;
                    const color = ep.isClimax ? 'var(--cinema-red)' : ep.isTwist ? 'var(--warning)' : 'var(--cinema-gold)';
                    return `<div style="flex: 1; height: ${height}%; background: ${color}; border-radius: 2px;" title="${ep.episodeNumber}"></div>`;
                }).join('')}
            </div>
            <p style="text-align: center; margin-top: 15px; color: var(--text-secondary); font-size: 0.85rem;">
                故事节奏弧线 | 金色: 常规集 | 橙色: 反转集 | 红色: 大结局
            </p>
        `;

        container.innerHTML = outline.map(ep => `
            <div class="episode-card ${ep.isTwist ? 'twist' : ''} ${ep.isClimax ? 'climax' : ''}">
                <div class="episode-header">
                    <div class="episode-number">
                        <h4>EPISODE ${ep.episodeNumber}</h4>
                        <span style="color: var(--text-secondary); font-size: 0.85rem;">${ep.actFocus}</span>
                    </div>
                    <div class="episode-tags">
                        ${ep.isTwist ? '<span class="tag twist">REVERSAL</span>' : ''}
                        ${ep.isClimax ? '<span class="tag climax">FINALE</span>' : ''}
                        <span class="tag hook">HOOK</span>
                    </div>
                </div>
                <div class="episode-content">
                    <h5>SYNOPSIS</h5>
                    <p>${ep.content}</p>
                    <div class="episode-hook">
                        <strong>End Hook:</strong> ${ep.hook}
                    </div>
                </div>
            </div>
        `).join('');
    },

    // ===== 生成完整剧本 =====
    async generateFullScript() {
        const outline = this.engine.project.outline;

        if (!outline || outline.length === 0) {
            alert('请先生成分集大纲');
            return;
        }

        this.showLoading('AI正在基于大纲生成好莱坞格式剧本...');

        try {
            // 使用AI服务基于大纲生成完整剧本
            const fullScript = await aiService.generateFullScript(
                this.engine.project,
                outline,
                (current, total) => {
                    this.showLoading(`正在生成第${current}/${total}集剧本...`);
                }
            );

            this.engine.project.fullScript = fullScript;
            this.hideLoading();
            this.goToStep(5);

        } catch (error) {
            console.error('剧本生成失败:', error);
            this.hideLoading();
            alert('剧本生成失败: ' + error.message + '\n将使用模板生成基础剧本。');

            // 失败时使用模板
            this.engine.generateFullScript();
            this.goToStep(5);
        }
    },

    // ===== 渲染完整剧本 =====
    renderFullScript() {
        const script = this.engine.project.fullScript;
        const container = document.getElementById('script-full-content');

        if (!script || script.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 40px;">暂无剧本，请先生成</p>';
            return;
        }

        container.innerHTML = `
            <div style="margin-bottom: 20px; padding: 15px; background: var(--cinema-black); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div>
                    <span style="color: var(--text-secondary); margin-right: 10px;">剧本格式:</span>
                    <span style="color: var(--cinema-gold); font-weight: 600;">Hollywood Standard Format</span>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <span style="font-size: 0.85rem; color: var(--text-secondary);">共 ${script.length} 集</span>
                    <button onclick="app.exportToWord()" style="padding: 8px 16px; background: var(--cinema-gold); color: var(--cinema-black); border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">📄 导出Word</button>
                    <button onclick="app.exportToPDF()" style="padding: 8px 16px; background: var(--cinema-red); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">📑 导出PDF</button>
                </div>
            </div>
            ${script.map(ep => this.renderEpisodeScript(ep)).join('')}
        `;
    },

    renderEpisodeScript(ep) {
        // AI生成的剧本是纯文本格式，直接显示
        const content = ep.content || '';

        // 将剧本内容格式化为HTML（保留换行和缩进）
        const formattedContent = content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br>');

        return `
            <div class="full-episode" id="episode-${ep.episodeNumber}" style="margin-bottom: 40px; padding-bottom: 30px; border-bottom: 2px solid var(--cinema-gray);">
                <div class="episode-header-bar" style="background: var(--cinema-gray); padding: 15px; margin-bottom: 20px; border-left: 4px solid var(--cinema-gold); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="font-family: 'Courier New', monospace; font-weight: bold; color: var(--cinema-gold); font-size: 1.1rem;">
                            EPISODE ${ep.episodeNumber}${ep.isTwist ? ' - TWIST' : ''}${ep.isClimax ? ' - FINALE' : ''}
                        </span>
                        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 5px;">
                            ${ep.title || ''}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-family: 'Courier New', monospace; color: var(--text-secondary); font-size: 0.85rem;">
                            ${ep.estimatedDuration || '90'} sec
                        </div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 3px;">
                            ~${Math.ceil((content.length || 0) / 5)} words
                        </div>
                    </div>
                </div>

                <div class="script-content" style="
                    font-family: 'Courier New', 'Courier', monospace;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: var(--text-primary);
                    background: var(--cinema-black-light);
                    padding: 25px;
                    border-radius: 8px;
                    overflow-x: auto;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                ">
                    ${formattedContent}
                </div>

                ${ep.hook ? `
                <div style="margin-top: 15px; padding: 10px 15px; background: rgba(212, 165, 116, 0.1); border-left: 3px solid var(--cinema-gold); border-radius: 0 5px 5px 0;">
                    <span style="color: var(--cinema-gold); font-weight: 600; font-size: 0.85rem;">HOOK:</span>
                    <span style="color: var(--text-secondary); font-size: 0.85rem; margin-left: 10px;">${ep.hook}</span>
                </div>
                ` : ''}
            </div>
        `;
    },

    // ===== 导出剧本为Word格式（好莱坞标准格式） =====
    exportToWord() {
        const script = this.engine.project.fullScript;
        let title = this.engine.project.title;

        // 确保标题有效
        if (!title || title.trim() === '') {
            title = 'Untitled_Drama';
            console.warn('[导出Word] 项目标题为空，使用默认文件名');
        }

        // 清理标题，移除不适合文件名的字符
        const safeTitle = title.replace(/[<>:"/\\|?*]/g, '_').trim();

        if (!script || script.length === 0) {
            alert('请先生成剧本');
            return;
        }

        // 创建符合好莱坞标准的Word HTML
        let wordContent = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset="utf-8">
                <title>${title}</title>
                <style>
                    /* 页面设置 - Letter尺寸，好莱坞标准边距 */
                    @page {
                        size: 8.5in 11in;
                        margin: 1in 1in 1in 1.5in;
                    }

                    body {
                        font-family: 'Courier New', Courier, monospace;
                        font-size: 12pt;
                        line-height: 1.0;
                        color: #000;
                        max-width: 8.5in;
                        margin: 0 auto;
                        padding: 0;
                    }

                    /* 标题页 */
                    .title-page {
                        text-align: center;
                        margin-top: 40%;
                        page-break-after: always;
                    }

                    .title-page h1 {
                        text-transform: uppercase;
                        font-size: 24pt;
                        margin-bottom: 20pt;
                        letter-spacing: 2pt;
                    }

                    .title-page .meta {
                        font-size: 12pt;
                        margin: 10pt 0;
                    }

                    /* 集标题 */
                    .episode-header {
                        margin: 24pt 0 12pt 0;
                        font-weight: bold;
                        text-transform: uppercase;
                        text-align: center;
                        font-size: 12pt;
                        page-break-after: avoid;
                    }

                    /* 场景标题 (Slugline) - 1.5英寸左边距 */
                    .slugline {
                        font-weight: bold;
                        text-transform: uppercase;
                        margin: 12pt 0 0 0;
                        font-size: 12pt;
                        page-break-after: avoid;
                    }

                    /* 动作描述 - 1.5英寸左边距 */
                    .action {
                        margin: 0 0 0 0;
                        font-size: 12pt;
                        line-height: 1.0;
                        text-align: left;
                    }

                    /* 角色名 - 3.7英寸左边距 */
                    .character {
                        font-weight: bold;
                        text-transform: uppercase;
                        margin: 12pt 0 0 2.2in;
                        font-size: 12pt;
                        text-align: center;
                        width: 2in;
                        page-break-after: avoid;
                    }

                    /* 括号 - 3.1英寸左边距 */
                    .parenthetical {
                        margin: 0 0 0 1.6in;
                        font-size: 12pt;
                        font-style: italic;
                        text-align: center;
                        width: 3in;
                        page-break-before: avoid;
                    }

                    /* 对话 - 2.5英寸左边距，2.25英寸右边距 */
                    .dialogue {
                        margin: 0 1.5in 0 1in;
                        font-size: 12pt;
                        line-height: 1.0;
                        text-align: left;
                        page-break-before: avoid;
                    }

                    /* 转场 - 右对齐 */
                    .transition {
                        text-align: right;
                        font-weight: bold;
                        text-transform: uppercase;
                        margin: 12pt 0;
                        font-size: 12pt;
                    }

                    /* Hook */
                    .hook {
                        margin: 12pt 0;
                        padding: 6pt;
                        border-top: 1pt solid #ccc;
                        font-style: italic;
                        font-size: 11pt;
                    }

                    /* 分页 */
                    .page-break {
                        page-break-after: always;
                    }
                </style>
            </head>
            <body>
                <!-- 标题页 -->
                <div class="title-page">
                    <h1>${title.toUpperCase()}</h1>
                    <div class="meta">${this.engine.project.typeInfo?.nameEn || 'Vertical Short Drama'}</div>
                    <div class="meta">${script.length} Episodes</div>
                    <div class="meta" style="margin-top: 40%;">Written by AI Screenwriter</div>
                </div>
        `;

        // 处理每一集
        script.forEach((ep, index) => {
            const formattedContent = this.formatHollywoodScript(ep.content || '');

            wordContent += `
                <div class="episode-header">
                    EPISODE ${ep.episodeNumber}${ep.isTwist ? ' - TWIST' : ''}${ep.isClimax ? ' - FINALE' : ''}
                    ${ep.title ? `<br/>"${ep.title.toUpperCase()}"` : ''}
                </div>

                ${formattedContent}

                ${ep.hook ? `
                <div class="hook">
                    <strong>HOOK:</strong> ${ep.hook}
                </div>
                ` : ''}

                ${index < script.length - 1 ? '<div class="page-break"></div>' : ''}
            `;
        });

        wordContent += `
            </body>
            </html>
        `;

        // 创建Blob并下载
        const blob = new Blob(['\ufeff', wordContent], {
            type: 'application/msword'
        });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${safeTitle}_Screenplay.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    },

    // 格式化剧本内容为好莱坞标准
    formatHollywoodScript(content) {
        if (!content) return '';

        const lines = content.split('\n');
        let formatted = [];
        let prevLine = '';

        lines.forEach(line => {
            line = line.trim();
            if (!line) {
                formatted.push('<div style="height: 12pt;"></div>');
                return;
            }

            // 检测场景标题 (Slugline)
            if (/^(INT|EXT|INT\.\/EXT|EXT\.\/INT)\./.test(line.toUpperCase())) {
                formatted.push(`<div class="slugline">${line.toUpperCase()}</div>`);
            }
            // 检测转场
            else if (/^(CUT TO|FADE IN|FADE OUT|SMASH CUT|DISSOLVE TO|JUMP CUT)/.test(line.toUpperCase())) {
                formatted.push(`<div class="transition">${line.toUpperCase()}</div>`);
            }
            // 检测角色名 (全大写，单独一行，无标点)
            else if (/^[A-Z][A-Z\s]*$/.test(line) && line.length < 30 && !line.includes('.')) {
                formatted.push(`<div class="character">${line}</div>`);
            }
            // 检测括号 (括号内容)
            else if (/^\(.+\)$/.test(line)) {
                formatted.push(`<div class="parenthetical">${line}</div>`);
            }
            // 其他为对话或动作
            else {
                // 如果前一行是角色名或括号，这行是对话
                if (prevLine && (
                    prevLine.includes('class="character"') ||
                    prevLine.includes('class="parenthetical"')
                )) {
                    formatted.push(`<div class="dialogue">${line}</div>`);
                } else {
                    // 否则是动作描述
                    formatted.push(`<div class="action">${line}</div>`);
                }
            }

            prevLine = formatted[formatted.length - 1] || '';
        });

        return formatted.join('\n');
    },

    exportToPDF() {
        // 使用浏览器打印功能生成PDF
        const title = this.engine.project.title;
        const originalTitle = document.title;

        // 创建打印专用样式
        const printStyles = `
            <style>
                @media print {
                    body { font-family: 'Courier New', monospace; font-size: 12pt; line-height: 1.4; }
                    .slugline { font-weight: bold; text-transform: uppercase; margin: 15px 0 10px 0; }
                    .action { margin: 10px 0; max-width: 6in; }
                    .character { text-align: center; text-transform: uppercase; font-weight: bold; margin-top: 15px; }
                    .parenthetical { text-align: center; margin: 2px 0; }
                    .dialogue { margin: 0 auto; max-width: 3.5in; text-align: left; }
                    .transition { text-align: right; text-transform: uppercase; margin: 15px 0; }
                    .episode-header { background: #f0f0f0; padding: 10px; margin: 20px 0; font-weight: bold; }
                    .no-print { display: none !important; }
                    @page { margin: 1in 1in 1in 1.5in; }
                }
            </style>
        `;

        // 打开新窗口打印
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>${title} - Screenplay</title>
                ${printStyles}
            </head>
            <body>
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="text-transform: uppercase;">${title}</h1>
                    <p>${this.engine.project.typeInfo?.nameEn || ''}</p>
                    <p>${this.engine.project.episodes} Episodes</p>
                </div>
                <hr/>
                ${document.getElementById('script-full-content').innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();

        setTimeout(() => {
            printWindow.print();
        }, 500);
    },

    // ===== 项目列表 =====
    loadProjectsList() {
        const projects = ScriptEngine.getAllProjects();
        const container = document.getElementById('projects-list');

        const existingProjects = projects.map(p => `
            <div class="project-card" onclick="app.loadExistingProject('${p.id}')">
                <h4>${p.title}</h4>
                <div class="meta">
                    <span>${p.typeInfo?.name || 'Unknown'}</span>
                    <span>${p.episodes} Episodes</span>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="project-card new" onclick="app.goToStep(1)">
                <span class="plus">+</span>
                <p>Create New Project</p>
            </div>
            ${existingProjects}
        `;
    },

    loadExistingProject(projectId) {
        const project = this.engine.loadProject(projectId);
        if (project) {
            this.selectedType = project.type;
            this.selectedCategory = project.category;
            this.goToStep(4);
        }
    },

    // ===== 保存项目 =====
    saveProject() {
        const id = this.engine.saveProject();
        alert(`Project Saved! ID: ${id}`);
    },

    // ===== 导出功能 =====
    exportOutline() {
        const outline = this.engine.project.outline;
        const isEnglish = this.selectedLanguage === 'en';

        let text = `${this.engine.project.title} - ${isEnglish ? 'OUTLINE' : '分集大纲'}\n`;
        text += `${isEnglish ? 'Type' : '类型'}: ${this.engine.project.typeInfo?.name}\n`;
        text += `${isEnglish ? 'Episodes' : '集数'}: ${outline.length}\n\n`;

        outline.forEach(ep => {
            text += `${isEnglish ? 'SCENE ' : ''}${ep.episodeNumber}\n`;
            text += `${isEnglish ? this.translateToEnglish(ep.content) : ep.content}\n`;
            text += `${isEnglish ? 'Hook' : '钩子'}: ${isEnglish ? this.translateToEnglish(ep.hook) : ep.hook}\n\n`;
        });

        this.downloadFile(text, `${this.engine.project.title}_Outline.txt`);
    },

    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    },

    // ===== 工具方法 =====
    showLoading(text = 'AI正在生成...') {
        document.getElementById('loading-text').textContent = text;
        document.getElementById('loading').classList.remove('hidden');
    },

    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    },

    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    // 显示通知消息
    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');

        // 设置样式
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196F3'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-size: 14px;
            max-width: 400px;
            word-wrap: break-word;
            animation: slideIn 0.3s ease-out;
        `;

        notification.textContent = message;

        // 添加动画样式
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        // 添加到页面
        document.body.appendChild(notification);

        // 3秒后自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
};

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
