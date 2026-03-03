// 调试助手 - 用于追踪创意生成问题

window.DebugHelper = {
    // 检查生成的创意
    checkIdeas() {
        console.log('=== 创意生成诊断 ===');
        console.log('generatedIdeas数量:', app.generatedIdeas.length);
        console.log('generatedIdeas详情:', app.generatedIdeas);

        app.generatedIdeas.forEach((idea, index) => {
            console.log(`创意${index + 1}:`, {
                id: idea.id,
                title: idea.title,
                concept: idea.concept,
                synopsisLength: idea.synopsis ? idea.synopsis.length : 0,
                synopsisPreview: idea.synopsis ? idea.synopsis.substring(0, 100) + '...' : '空',
                externalHook: idea.externalHook,
                internalHook: idea.internalHook
            });
        });
    },

    // 测试解析函数
    testParse(content) {
        console.log('=== 测试解析函数 ===');
        console.log('输入内容:', content);

        // 简化版解析逻辑
        const lines = content.split('\n');
        let currentIdea = null;
        const ideas = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // 检查创意开始
            if (line.match(/^(?:创意\s*\d+|\d+[\.\、])[：:]/i)) {
                if (currentIdea) {
                    ideas.push(currentIdea);
                }
                currentIdea = { title: '', concept: '', synopsis: '' };
                continue;
            }

            if (!currentIdea) continue;

            // 匹配梗概
            if (line.match(/^梗概[：:]/i)) {
                currentIdea.synopsis = line.replace(/^梗概[：:]\s*/, '').trim();
                currentIdea._parsingSynopsis = true;
                continue;
            }

            // 匹配其他字段
            if (line.match(/^标题[：:]/i)) {
                currentIdea.title = line.replace(/^标题[：:]\s*/, '').trim();
            } else if (line.match(/^概念[：:]/i)) {
                currentIdea.concept = line.replace(/^概念[：:]\s*/, '').trim();
            } else if (line.match(/^(?:外在|内在)/i)) {
                currentIdea._parsingSynopsis = false;
            } else if (currentIdea._parsingSynopsis && line) {
                currentIdea.synopsis += ' ' + line;
            }
        }

        if (currentIdea) ideas.push(currentIdea);

        console.log('解析结果:', ideas);
        return ideas;
    },

    // 清空并重新生成
    async regenerate() {
        console.log('=== 重新生成 ===');
        app.generatedIdeas = [];
        app.selectedIdea = null;
        await app.generateIdeas();
        this.checkIdeas();
    },

    // 检查角色生成
    checkCharacters() {
        console.log('=== 角色生成诊断 ===');
        console.log('当前项目角色数:', app.project.characters.length);
        console.log('角色列表:');

        const expectedRoles = ['protagonist', 'love-interest', 'antagonist', 'antagonist2', 'supporting', 'supporting2'];
        const roleNames = {
            'protagonist': '主角',
            'love-interest': '恋爱对象',
            'antagonist': '主要反派',
            'antagonist2': '次要反派',
            'supporting': '闺蜜/好友',
            'supporting2': '喜剧角色'
        };

        expectedRoles.forEach((role, index) => {
            const char = app.project.characters.find(c => c.role === role);
            if (char) {
                console.log(`${index + 1}. ${roleNames[role]}: ✅ ${char.name}`);
            } else {
                console.log(`${index + 1}. ${roleNames[role]}: ❌ 缺失`);
            }
        });

        console.log('详细角色数据:', app.project.characters);
    },

    // 测试角色解析
    testCharacterParse(content, category = 'female') {
        console.log('=== 测试角色解析 ===');
        console.log('输入内容前200字符:', content.substring(0, 200));

        // 使用AI服务的解析方法
        if (window.aiService && window.aiService.parseCharacterResponse) {
            const result = window.aiService.parseCharacterResponse(content, category);
            console.log('解析结果:', result.map(c => ({role: c.role, name: c.name})));
            return result;
        } else {
            console.error('AI服务不可用，无法测试解析');
            return null;
        }
    },

    // 重新生成角色
    async regenerateCharacters() {
        console.log('=== 重新生成角色 ===');
        if (!app.selectedIdea) {
            console.error('错误：没有选中的创意');
            return;
        }

        const typeInfo = app.types[app.selectedType];
        try {
            console.log('开始生成角色...');
            const characters = await window.aiService.generateCharactersWithAI(
                app.selectedIdea,
                typeInfo
            );
            console.log('生成完成，角色数:', characters.length);

            // 更新项目角色
            app.project.characters = characters;
            app.saveProject();
            app.renderCharacterDesign();

            this.checkCharacters();
        } catch (error) {
            console.error('重新生成失败:', error);
        }
    },

    // 检查项目完整状态
    checkProject() {
        console.log('=== 项目状态诊断 ===');
        if (!app.engine || !app.engine.project) {
            console.error('❌ 项目未初始化');
            return;
        }

        const p = app.engine.project;
        console.log('项目ID:', p.id);
        console.log('标题:', p.title || '❌ 未设置');
        console.log('类型:', p.type || '❌ 未设置');
        console.log('类别:', p.category || '❌ 未设置');
        console.log('typeInfo:', p.typeInfo ? '✅ 已设置' : '❌ 未设置');
        console.log('集数:', p.episodes);
        console.log('创意:', p.creative && p.creative.title ? '✅ ' + p.creative.title : '❌ 未设置');
        console.log('角色数:', p.characters?.length || 0);
        console.log('大纲数:', p.outline?.length || 0);
        console.log('完整剧本:', p.fullScript?.length || 0);
    },

    // 强制修复创意数量
    async fixIdeas() {
        console.log('=== 强制修复创意数量 ===');
        if (!app.generatedIdeas || app.generatedIdeas.length < 5) {
            console.log('创意不足，重新生成...');
            await this.regenerate();
        } else {
            console.log('创意数量正常:', app.generatedIdeas.length);
        }
    },

    // 强制修复角色
    fixCharacters() {
        console.log('=== 强制修复角色 ===');
        if (!window.aiService) {
            console.error('AI服务不可用');
            return;
        }

        const defaultChars = window.aiService.getDefaultCharacters('female');
        app.project.characters = defaultChars;
        app.saveProject();
        app.renderCharacterDesign();
        console.log('✅ 已使用默认角色修复');
        this.checkCharacters();
    },

    // 一键修复所有问题
    fixAll() {
        console.log('=== 一键修复所有问题 ===');

        // 修复创意
        if (!app.generatedIdeas || app.generatedIdeas.length < 5) {
            console.log('修复创意数量...');
            app.generatedIdeas = window.aiService.getDefaultCreativeIdeas();
            console.log('✅ 创意已修复，数量:', app.generatedIdeas.length);
        }

        // 修复角色
        if (!app.project.characters || app.project.characters.length < 6) {
            console.log('修复角色...');
            app.project.characters = window.aiService.getDefaultCharacters('female');
            app.saveProject();
            console.log('✅ 角色已修复，数量:', app.project.characters.length);
        }

        // 刷新UI
        app.renderCreativeDiscussion();
        app.renderCharacterDesign();

        console.log('✅ 所有修复完成，请刷新页面查看效果');
    },

    // 测试标题生成
    async testTitleGeneration() {
        console.log('=== 测试标题生成 ===');
        try {
            const result = await window.aiService.generateTitles(app.engine.project);
            console.log('生成结果:', result);
            return result;
        } catch (error) {
            console.error('测试失败:', error);
        }
    },

    // 检查大纲状态
    checkOutline() {
        console.log('=== 大纲状态诊断 ===');
        const p = app.engine?.project;
        if (!p) {
            console.error('❌ 项目未初始化');
            return;
        }

        console.log('大纲数组:', p.outline ? `✅ 存在 (${p.outline.length}集)` : '❌ 不存在');
        console.log('集数配置:', p.episodes);
        console.log('时长配置:', p.duration);

        if (p.outline && p.outline.length > 0) {
            console.log('大纲前3集:');
            p.outline.slice(0, 3).forEach((ep, i) => {
                console.log(`  第${i+1}集:`, ep.title || '(无标题)');
            });
        }
    },

    // 强制显示大纲配置面板
    showOutlineConfig() {
        app.showOutlineConfig();
        console.log('✅ 已显示大纲配置面板');
    },

    // 强制显示大纲内容面板
    showOutlineDisplay() {
        app.showOutlineDisplay();
        console.log('✅ 已显示大纲内容面板');
    }
};

console.log('调试助手已加载，使用方式:');
console.log('DebugHelper.checkIdeas() - 检查当前创意');
console.log('DebugHelper.testParse(文本) - 测试解析函数');
console.log('DebugHelper.regenerate() - 清空并重新生成');
console.log('DebugHelper.checkCharacters() - 检查当前角色');
console.log('DebugHelper.testCharacterParse(文本, 类型) - 测试角色解析函数');
console.log('DebugHelper.regenerateCharacters() - 重新生成角色');
console.log('DebugHelper.checkProject() - 检查项目完整状态');
console.log('DebugHelper.testTitleGeneration() - 测试标题生成');
console.log('DebugHelper.fixIdeas() - 强制修复创意数量');
console.log('DebugHelper.fixCharacters() - 强制使用默认角色');
console.log('DebugHelper.fixAll() - 一键修复所有问题');
console.log('DebugHelper.checkOutline() - 检查大纲状态');
console.log('DebugHelper.showOutlineConfig() - 显示大纲配置面板');
console.log('DebugHelper.showOutlineDisplay() - 显示大纲内容面板');
