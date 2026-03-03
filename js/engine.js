/**
 * Short Drama Script Agent - Script Generation Engine
 * 剧本生成引擎 - 基于专业编剧知识的规则引擎
 */

class ScriptEngine {
    constructor() {
        this.project = {
            id: null,
            title: '',
            category: '',
            type: '',
            typeInfo: null,
            episodes: 40,
            duration: 90,
            creative: {},
            characters: [],
            outline: [],
            fullScript: []
        };
        this.currentStep = 1;
    }

    // ===== 项目初始化 =====
    initProject(typeId, episodes, duration, title) {
        const typeInfo = DRAMA_TYPES[typeId];
        if (!typeInfo) {
            throw new Error(`未知类型: ${typeId}`);
        }

        this.project = {
            id: Date.now().toString(36),
            title: title || '未命名剧集',
            category: typeInfo.category,
            type: typeId,
            typeInfo: typeInfo,
            episodes: parseInt(episodes) || 40,
            duration: parseInt(duration) || 90,
            creative: {},
            characters: [],
            outline: [],
            fullScript: []
        };

        // 添加推荐角色
        this.generateRecommendedCharacters();

        return this.project;
    }

    // ===== 生成推荐角色 =====
    generateRecommendedCharacters() {
        const typeInfo = this.project.typeInfo;
        if (!typeInfo.standardCharacters) return;

        this.project.recommendedCharacters = typeInfo.standardCharacters.map((char, index) => ({
            id: `rec-${index}`,
            ...char,
            added: false
        }));
    }

    // ===== 更新创意 =====
    updateCreative(creativeData) {
        this.project.creative = {
            ...this.project.creative,
            ...creativeData,
            timestamp: Date.now()
        };
    }

    // ===== 添加角色 =====
    addCharacter(character) {
        const newChar = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            ...character
        };
        this.project.characters.push(newChar);
        return newChar;
    }

    updateCharacter(charId, updates) {
        const index = this.project.characters.findIndex(c => c.id === charId);
        if (index !== -1) {
            this.project.characters[index] = { ...this.project.characters[index], ...updates };
            return this.project.characters[index];
        }
        return null;
    }

    updateCharacter(charId, updates) {
        const index = this.project.characters.findIndex(c => c.id === charId);
        if (index !== -1) {
            this.project.characters[index] = { ...this.project.characters[index], ...updates };
            return this.project.characters[index];
        }
        return null;
    }

    deleteCharacter(charId) {
        this.project.characters = this.project.characters.filter(c => c.id !== charId);
    }

    // ===== 生成分集大纲 =====
    generateOutline() {
        const { typeInfo, episodes, creative, characters } = this.project;
        const outline = [];

        // 计算故事结构
        const structure = this.calculateStructure(episodes, typeInfo.structure);

        for (let epNum = 1; epNum <= episodes; epNum++) {
            const episode = this.generateEpisodeOutline(epNum, structure, typeInfo, creative, characters);
            outline.push(episode);
        }

        this.project.outline = outline;
        return outline;
    }

    // ===== 计算故事结构 =====
    calculateStructure(totalEpisodes, typeStructure) {
        const structure = {
            acts: [],
            twistEpisodes: [],
            climaxEpisode: totalEpisodes
        };

        // 根据类型结构计算
        if (typeStructure) {
            Object.keys(typeStructure).forEach(actKey => {
                const act = typeStructure[actKey];
                structure.acts.push({
                    name: actKey,
                    start: act.range[0],
                    end: act.range[1],
                    focus: act.focus
                });

                // 收集反转点
                if (act.twistPoints) {
                    structure.twistEpisodes.push(...act.twistPoints);
                }
                if (act.faceSlapPoints) {
                    structure.twistEpisodes.push(...act.faceSlapPoints);
                }
                if (act.revealPoints) {
                    structure.twistEpisodes.push(...act.revealPoints);
                }

                // 高潮集
                if (act.climax) {
                    structure.climaxEpisode = act.climax;
                }
            });
        } else {
            // 默认结构
            structure.acts = [
                { name: 'act1', start: 1, end: Math.floor(totalEpisodes * 0.2), focus: '引入' },
                { name: 'act2', start: Math.floor(totalEpisodes * 0.2) + 1, end: Math.floor(totalEpisodes * 0.6), focus: '发展' },
                { name: 'act3', start: Math.floor(totalEpisodes * 0.6) + 1, end: Math.floor(totalEpisodes * 0.85), focus: '高潮准备' },
                { name: 'act4', start: Math.floor(totalEpisodes * 0.85) + 1, end: totalEpisodes, focus: '结局' }
            ];

            // 默认反转点
            structure.twistEpisodes = [
                Math.floor(totalEpisodes * 0.35),
                Math.floor(totalEpisodes * 0.55),
                Math.floor(totalEpisodes * 0.75)
            ];
        }

        return structure;
    }

    // ===== 生成单集大纲 =====
    generateEpisodeOutline(epNum, structure, typeInfo, creative, characters) {
        // 确定当前幕
        const currentAct = structure.acts.find(act => epNum >= act.start && epNum <= act.end);

        // 确定是否是特殊集
        const isTwist = structure.twistEpisodes.includes(epNum);
        const isClimax = epNum === structure.climaxEpisode;
        const isFirst = epNum === 1;
        const isFinal = epNum === this.project.episodes;

        // 生成剧情内容
        let content = this.generateEpisodeContent(epNum, currentAct, typeInfo, isTwist, isClimax, creative, characters);

        // 生成钩子
        const hook = this.generateCliffhanger(epNum, typeInfo, isTwist, isClimax);

        return {
            episodeNumber: epNum,
            act: currentAct ? currentAct.name : '',
            actFocus: currentAct ? currentAct.focus : '',
            content: content,
            hook: hook,
            isTwist: isTwist,
            isClimax: isClimax,
            isFirst: isFirst,
            isFinal: isFinal,
            estimatedDuration: this.project.duration,
            wordCount: this.estimateWordCount()
        };
    }

    // ===== 生成单集内容描述（严格区分女频/男频套路）=====
    generateEpisodeContent(epNum, act, typeInfo, isTwist, isClimax, creative, characters) {
        // 根据类型严格区分生成逻辑
        if (typeInfo.category === 'female') {
            return this.generateFemaleEpisode(epNum, act, typeInfo, isTwist, isClimax, creative, characters);
        } else if (typeInfo.category === 'male') {
            return this.generateMaleEpisode(epNum, act, typeInfo, isTwist, isClimax, creative, characters);
        } else {
            return this.generateGeneralEpisode(epNum, act, typeInfo, isTwist, isClimax, creative, characters);
        }
    }

    // ===== 女频短剧：情感拉扯套路 =====
    generateFemaleEpisode(epNum, act, typeInfo, isTwist, isClimax, creative, characters) {
        const protag = characters.find(c => c.role === 'protagonist')?.name || '女主';
        const love = characters.find(c => c.role === 'love-interest')?.name || '男主';
        const antag = characters.find(c => c.role === 'antagonist')?.name || '女配';

        // 基于创意生成具体情节
        const concept = creative?.concept || '';
        const highlights = creative?.highlights || [];

        if (epNum === 1) {
            return this.generateFemaleHook(protag, love, antag, concept, highlights);
        } else if (isClimax) {
            return this.generateFemaleClimax(protag, love, antag, concept, highlights);
        } else if (isTwist) {
            return this.generateFemaleTwist(epNum, protag, love, antag, concept, highlights);
        } else {
            return this.generateFemaleProgress(epNum, act, protag, love, antag, concept, highlights);
        }
    }

    // ===== 男频爽剧：升级打脸套路 =====
    generateMaleEpisode(epNum, act, typeInfo, isTwist, isClimax, creative, characters) {
        const protag = characters.find(c => c.role === 'protagonist')?.name || '男主';
        const antag = characters.find(c => c.role === 'antagonist')?.name || '反派';
        const supporter = characters.find(c => c.role === 'supporting')?.name || '小弟';

        // 基于创意生成具体情节
        const concept = creative?.concept || '';
        const highlights = creative?.highlights || [];

        if (epNum === 1) {
            return this.generateMaleHook(protag, antag, supporter, concept, highlights);
        } else if (isClimax) {
            return this.generateMaleClimax(protag, antag, supporter, concept, highlights);
        } else if (isTwist) {
            return this.generateMaleTwist(epNum, protag, antag, supporter, concept, highlights);
        } else {
            return this.generateMaleProgress(epNum, act, protag, antag, supporter, concept, highlights);
        }
    }

    // 确定每集的功能类型

    // ===== 女频：第1集钩子（情感虐点开场）=====
    generateFemaleHook(protag, love, antag, concept, highlights) {
        return `【第1集·虐心开场】${protag}在${this.randomItem(['婚礼现场', '公司年会', '家族晚宴'])}被${antag}当众羞辱，
        未婚夫/男友竟然站在${antag}一边。关键时刻，神秘男人${love}强势登场，
        一句话逆转局势，但他的出现似乎另有目的...
        本集钩子：${love}为什么要帮${protag}？他隐藏了什么身份？`;
    }

    // ===== 男频：第1集钩子（羞辱反击开场）=====
    generateMaleHook(protag, antag, supporter, concept, highlights) {
        const career = highlights[0] || '底层小人物';
        return `【第1集·羞辱开局】${protag}身为${career}，在${this.randomItem(['工地', '公司', '餐厅'])}被${antag}当众羞辱打骂，
        所有人都以为他是废物。就在${antag}要踩碎他尊严的那一刻，
        ${concept.includes('系统') ? '脑中突然响起系统提示音' : '体内封印突然解开'}，
        ${protag}眼神骤变，反手一巴掌抽飞${antag}！全场死寂！
        本集钩子：${protag}到底是什么身份？他为何隐忍至今？`;
    }

    // ===== 女频：常规剧集（情感拉扯）=====
    generateFemaleProgress(epNum, act, protag, love, antag, concept, highlights) {
        // 定义情感拉扯的具体情节
        const progresses = [
            `【第${epNum}集·误会加深】${protag}看到${love}与${antag}单独相处，心生误会。
            ${love}想要解释，却被${antag}设计打断。
            ${protag}独自伤心，${love}心急如焚却找不到机会说清楚。
            结尾钩子：${antag}的阴谋即将得逞，两人的误会能否解开？`,

            `【第${epNum}集·英雄救美】${protag}遭遇危险，${love}及时出现相救。
            两人独处时光，气氛暧昧，${love}差点表露心意。
            但${antag}突然出现，破坏温馨时刻。
            结尾钩子：${love}眼中一闪而过的温柔，是否代表他动了真情？`,

            `【第${epNum}集·醋意大发】${love}看到${protag}与异性朋友谈笑，醋意大发。
            他强势宣示主权，让${protag}心中暗喜。
            但${antag}设计让${love}误会${protag}是水性杨花之人。
            结尾钩子：${love}的误会会让两人关系倒退吗？`,

            `【第${epNum}集·真心告白】${love}终于忍不住，向${protag}暗示心意。
            ${protag}欣喜若狂，正要回应，却被${antag}设计打断。
            ${antag}设计让${protag}听到${love}的"违心之言"，误会重重。
            结尾钩子：${protag}伤心离去，${love}能否追回她？`,

            `【第${epNum}集·深情守护】${protag}被家族逼婚，${love}霸气现身阻止。
            他当众宣布${protag}是他的人，震惊全场。
            但${antag}拿出${protag}的"不堪过去"威胁两人。
            结尾钩子：面对威胁，${love}会选择相信还是放弃？`,

            `【第${epNum}集·关系升温】${love}带${protag}出席重要场合，当众秀恩爱。
            ${antag}嫉妒得发狂，设计陷害${protag}出丑。
            关键时刻${love}挺身而出，维护${protag}。
            结尾钩子：${antag}的失败会让她的报复更加疯狂吗？`,

            `【第${epNum}集·危机降临】${protag}被绑架/陷害，生命危在旦夕。
            ${love}发疯般寻找，不惜与全世界为敌。
            他终于在千钧一发之际救下${protag}。
            结尾钩子：这次危机会让两人坦诚相对吗？`
        ];

        // 根据集数循环使用情节
        return progresses[(epNum - 2) % progresses.length];
    }

    // ===== 男频：常规剧集（升级打脸）=====
    generateMaleProgress(epNum, act, protag, antag, supporter, concept, highlights) {
        // 定义打脸升级的具体情节
        const progresses = [
            `【第${epNum}集·初次打脸】${antag}带人找${protag}麻烦，${protag}低调退让。
            对方得寸进尺，${protag}忍无可忍，小露身手震慑全场。
            ${antag}震惊，但嘴硬不服，放狠话要找更厉害的人来。
            结尾钩子：${antag}找来的"高手"会是什么下场？`,

            `【第${epNum}集·实力初显】${protag}展现出超凡能力，完成不可能的任务。
            周围人震惊，开始怀疑他的真实身份。
            ${antag}嫉妒发狂，设计更狠毒的阴谋对付${protag}。
            结尾钩子：${antag}的新阴谋会被${protag}识破吗？`,

            `【第${epNum}集·势力扩张】${protag}收服第一个小弟${supporter}，建立班底。
            他开始建立自己的势力，在底层圈子崭露头角。
            ${antag}感到威胁，联合其他反派准备打压。
            结尾钩子：${protag}能否在打压中逆势崛起？`,

            `【第${epNum}集·打脸升级】${antag}请来所谓的"大佬"教训${protag}。
            结果那位"大佬"见到${protag}，当场跪地求饶，口称主人！
            ${antag}脸色惨白，全场哗然。
            结尾钩子：${protag}的真实身份到底是什么？`,

            `【第${epNum}集·资源争夺】重要资源出现，各方势力争夺。
            ${antag}势在必得，却被${protag}以碾压姿态夺走。
            ${protag}展现惊人实力，引起更高层关注。
            结尾钩子：更高层的大佬会如何对待${protag}？`,

            `【第${epNum}集·全面碾压】${antag}不甘心，联合所有势力对付${protag}。
            ${protag}一人一刀/一拳，打得所有人跪地求饶。
            他当众宣布：从今以后，这里我说了算！
            结尾钩子：新的强敌正在暗处观察，大战即将开始？`,

            `【第${epNum}集·新敌出现】更强大的反派登场，实力远超之前所有人。
            ${protag}第一次遇到劲敌，陷入苦战。
            关键时刻他突破极限，实力暴涨。
            结尾钩子：突破后的${protag}能否横扫一切敌人？`
        ];

        // 根据集数循环使用情节
        return progresses[(epNum - 2) % progresses.length];
    }

    // ===== 女频：反转集（真相揭露）=====
    generateFemaleTwist(epNum, protag, love, antag, concept, highlights) {
        const twists = [
            `【第${epNum}集·身份反转】${protag}的真实身份曝光！原来她才是名门真千金/隐藏大佬！
            ${antag}的假冒身份被揭穿，众人哗然。
            ${love}早就知道真相，一直在暗中保护${protag}。
            结尾钩子：身份曝光后，${protag}会如何处置${antag}？`,

            `【第${epNum}集·真相大白】${antag}的阴谋被${love}揭穿，证据确凿。
            ${protag}终于明白一切都是${antag}设计的圈套。
            ${love}深情告白，表示自己从未怀疑过${protag}。
            结尾钩子：真相大白后，两人的感情能否更进一步？`,

            `【第${epNum}集·情感反转】${protag}以为${love}要放弃她，伤心欲绝准备离开。
            结果${love}在关键时刻出现，当众求婚/表白！
            原来一切都是${love}为了给${protag}惊喜而设计的。
            结尾钩子：这场惊喜会不会被${antag}破坏？`
        ];
        return twists[epNum % twists.length];
    }

    // ===== 男频：反转集（实力暴露）=====
    generateMaleTwist(epNum, protag, antag, supporter, concept, highlights) {
        const twists = [
            `【第${epNum}集·身份暴露】${protag}的真正身份曝光！他竟是传说中的战神/龙王/首富！
            ${antag}吓得跪地求饶，之前嘲笑过${protag}的人全都后悔莫及。
            各地大佬纷纷来拜，奉${protag}为尊上。
            结尾钩子：身份暴露后，更大的挑战正在路上！`,

            `【第${epNum}集·实力暴涨】${protag}在生死关头突破极限，实力暴涨十倍！
            之前不可一世的${antag}，现在连${protag}一招都接不住。
            ${protag}以无敌之姿横扫一切敌。
            结尾钩子：更强的敌人正在赶来，${protag}能否继续无敌？`,

            `【第${epNum}集·背景揭秘】${protag}的真正背景曝光！背后站着整个国家/宗门/世界组织！
            ${antag}背后的势力见到${protag}，吓得当场认怂，断尾求生。
            ${protag}不屑一顾：就这？
            结尾钩子：还有不知死活的反派要挑战${protag}吗？`
        ];
        return twists[epNum % twists.length];
    }

    // ===== 女频：大结局（圆满收官）=====
    generateFemaleClimax(protag, love, antag, concept, highlights) {
        return `【大结局·圆满收官】${antag}的阴谋彻底败露，身败名裂。
        ${love}在全城瞩目下向${protag}求婚，誓言此生只爱她一人。
        ${protag}感动落泪，两人深情拥吻，全场祝福。
        婚礼现场，所有误会解开，所有恩怨了结。
        ${protag}和${love}幸福地生活在一起，儿女双全，白头偕老。
        全剧终！`;
    }

    // ===== 男频：大结局（登顶巅峰）=====
    generateMaleClimax(protag, antag, supporter, concept, highlights) {
        return `【大结局·登顶巅峰】${antag}及所有反派被${protag}彻底碾压，跪地求饶。
        ${protag}建立商业帝国/武道宗门/无敌势力，成为传奇。
        各方大佬臣服，奉${protag}为至尊，号令天下莫敢不从。
        ${protag}与红颜知己/兄弟们共享荣华，场面宏大。
        最后镜头：${protag}站在世界之巅，俯瞰众生，成就永恒传奇。
        全剧终！`;
    }

    // ===== 通用剧集生成（备用）=====
    generateGeneralEpisode(epNum, act, typeInfo, isTwist, isClimax, creative, characters) {
        // 默认使用女频逻辑（较温和）
        return this.generateFemaleEpisode(epNum, act, typeInfo, isTwist, isClimax, creative, characters);
    }

    // ===== 生成详细人物小传 =====
    generateCharacterDetail(charId) {
        const char = this.project.characters.find(c => c.id === charId);
        if (!char) return null;

        const typeInfo = this.project.typeInfo;
        const creative = this.project.creative;

        // 基于创意和类型生成详细小传
        let bio = '';
        let motivation = '';
        let arc = '';

        if (typeInfo.category === 'female') {
            // 女频人物小传：重情感动机
            if (char.role === 'protagonist') {
                bio = `${char.name}，${char.age}岁，外表${this.randomItem(['柔弱', '清冷', '明媚', '温婉'])}，内心${this.randomItem(['坚韧', '倔强', '善良', '敏感'])}。`;
                bio += `出身${this.randomItem(['普通家庭', '没落世家', '单亲家庭', '富裕但缺爱'])}，`;
                bio += `因${this.randomItem(['家族变故', '情感受挫', '误会分离', '被人陷害'])}而${this.randomItem(['改名换姓', '远走他乡', '隐忍不发', '卧薪尝胆'])}。`;
                motivation = `渴望${this.randomItem(['真爱与归属感', '证明自己的价值', '为家人复仇', '打破命运枷锁'])}，`;
                motivation += `但内心深处害怕${this.randomItem(['再次被抛弃', '伤害他人', '面对真实的自己'])}。`;
                arc = `人物弧光：从${this.randomItem(['自卑退缩', '天真单纯', '一味忍让'])}到${this.randomItem(['自信独立', '智慧果敢', '敢爱敢恨'])}，`;
                arc += `最终学会${this.randomItem(['接纳自己', '相信爱情', '勇敢反击'])}。`;
            } else if (char.role === 'love-interest') {
                bio = `${char.name}，${char.age}岁，${this.randomItem(['冷峻霸总', '温柔医生', '神秘大佬', '傲娇影帝'])}，`;
                bio += `外表${this.randomItem(['高冷禁欲', '玩世不恭', '温润如玉'])}，实则${this.randomItem(['深情专一', '腹黑护短', '偏执占有'])}。`;
                motivation = `初见${this.getProtagonistName()}时被她的${this.randomItem(['坚韧', '善良', '与众不同'])}吸引，`;
                motivation += `但因${this.randomItem(['过去的情伤', '家族责任', '身份差距'])}而${this.randomItem(['不敢承认', '刻意疏远', '默默守护'])}。`;
                arc = `人物弧光：从${this.randomItem(['封闭内心', '游戏人间', '理智克制'])}到${this.randomItem(['为爱疯狂', '放下骄傲', '主动出击'])}，`;
                arc += `最终${this.randomItem(['深情告白', '强势求婚', '用生命守护'])}。`;
            } else if (char.role === 'antagonist') {
                bio = `${char.name}，${char.age}岁，${this.getProtagonistName()}的${this.randomItem(['塑料闺蜜', '心机继姐', '恶毒未婚妻', '假千金'])}。`;
                bio += `外表${this.randomItem(['光鲜亮丽', '温柔体贴'])}，实则${this.randomItem(['嫉妒心极强', '为达目的不择手段', '心理扭曲'])}。`;
                motivation = `因${this.randomItem(['嫉妒女主拥有的一切', '害怕失去现有地位', '深爱男主'])}而不择手段陷害女主，`;
                motivation += `但每次都被女主${this.randomItem(['化解', '反杀'])}，最终${this.randomItem(['身败名裂', '精神失常', '悔悟但为时已晚'])}。`;
            }
        } else {
            // 男频人物小传：重实力升级
            if (char.role === 'protagonist') {
                bio = `${char.name}，${char.age}岁，表面是${this.randomItem(['被人嫌弃的废物', '默默无闻的底层', '被逐出家族的弃子'])}，`;
                bio += `实则是${this.randomItem(['隐世宗门传人', '退役战神', '神秘组织首领', '绝世天才'])}。`;
                bio += `性格${this.randomItem(['隐忍不发', '低调内敛', '护短重情'])}，一旦动怒${this.randomItem(['血流成河', '天地变色', '无人可挡'])}。`;
                motivation = `因${this.randomItem(['家族血仇', '保护挚爱', '完成师父遗命'])}而${this.randomItem(['隐忍修炼', '隐藏身份'])}，`;
                motivation += `等待时机${this.randomItem(['一鸣惊人', '血债血偿', '登临绝顶'])}。`;
                arc = `人物弧光：从${this.randomItem(['人人可欺', '默默无名'])}到${this.randomItem(['威震天下', '无敌于世', '建立帝国'])}，`;
                arc += `收服${this.randomItem(['四大战神', '八方势力', '无数美女'])}，成就${this.randomItem(['万古传奇', '至尊之位'])}。`;
            } else if (char.role === 'antagonist') {
                bio = `${char.name}，${this.randomItem(['富二代', '世家子弟', '门派天才'])}，`;
                bio += `仗势欺人，多次羞辱${this.getProtagonistName()}，却不知对方是自己${this.randomItem(['惹不起的存在', '未来的主人', '要仰望的大佬'])}。`;
                motivation = `因${this.randomItem(['嫉妒', '贪婪', '愚蠢'])}不断作死，`;
                motivation += `每次都被${this.getProtagonistName()}打脸，最终${this.randomItem(['家族覆灭', '跪地求饶', '生不如死'])}。`;
            } else if (char.role === 'supporting') {
                bio = `${char.name}，${this.getProtagonistName()}的${this.randomItem(['第一个小弟', '忠诚兄弟', '得力助手'])}，`;
                bio += `起初${this.randomItem(['被人欺负', '生活困顿'])}，被${this.getProtagonistName()}救下后死心塌地跟随。`;
                motivation = `虽然实力不强，但${this.randomItem(['消息灵通', '忠心耿耿', '关键时刻敢于拼命'])}，`;
                motivation += `最终成为${this.getProtagonistName()}的${this.randomItem(['左膀右臂', '心腹大将'])}。`;
            }
        }

        return {
            ...char,
            detailedBio: bio,
            motivation: motivation,
            characterArc: arc,
            relationships: this.generateRelationships(char, typeInfo)
        };
    }

    // 获取主角名字
    getProtagonistName() {
        const protag = this.project.characters.find(c => c.role === 'protagonist');
        return protag?.name || '主角';
    }

    // 生成人物关系网
    generateRelationships(char, typeInfo) {
        const relationships = [];
        const otherChars = this.project.characters.filter(c => c.id !== char.id);

        otherChars.forEach(other => {
            let relation = '';
            if (char.role === 'protagonist' && other.role === 'love-interest') {
                relation = typeInfo.category === 'female'
                    ? `与${other.name}：命中注定的真爱，经历误会分离后终成眷属`
                    : `与${other.name}：红颜知己/挚爱，用实力守护她一生`;
            } else if (char.role === 'protagonist' && other.role === 'antagonist') {
                relation = `与${other.name}：不死不休的仇敌，多次被其陷害但最终将其踩在脚下`;
            } else if (char.role === 'love-interest' && other.role === 'protagonist') {
                relation = `与${other.name}：一见倾心，从好奇到深爱，最终成为她的唯一`;
            } else if (char.role === 'antagonist' && other.role === 'protagonist') {
                relation = `与${other.name}：嫉妒她的拥有，不择手段陷害却一次次失败`;
            }

            if (relation) {
                relationships.push(relation);
            }
        });

        return relationships;
    }

    // ===== 生成结尾钩子 =====
    generateCliffhanger(epNum, typeInfo, isTwist, isClimax) {
        const hooks = SCRIPT_TEMPLATES.cliffhangerTypes;
        const hookKeys = Object.keys(hooks);

        // 根据类型选择更合适的钩子
        let selectedHook = '';

        if (typeInfo.category === 'female') {
            const romanceHooks = [
                'danger', 'secret', 'choice', 'revelation', 'arrival', 'confession', 'betrayal'
            ];
            selectedHook = hooks[this.randomItem(romanceHooks)];
        } else if (typeInfo.category === 'male') {
            const maleHooks = [
                'danger', 'revelation', 'arrival', 'deadline', 'discovery'
            ];
            selectedHook = hooks[this.randomItem(maleHooks)];
        } else {
            selectedHook = hooks[hookKeys[epNum % hookKeys.length]];
        }

        if (isTwist) {
            return `【反转钩子】${selectedHook} - 更大的秘密即将揭晓，观众绝对想不到！`;
        } else if (isClimax) {
            return `【最终悬念】一切即将揭晓，大结局不见不散！`;
        } else {
            return `【钩子】${selectedHook} - 让人迫不及待想看下一集！`;
        }
    }

    // ===== 生成完整剧本 =====
    generateFullScript() {
        const fullScript = [];

        for (const episode of this.project.outline) {
            const scriptEpisode = this.expandEpisodeToScript(episode);
            fullScript.push(scriptEpisode);
        }

        this.project.fullScript = fullScript;
        return fullScript;
    }

    // ===== 将大纲扩展为详细剧本 =====
    expandEpisodeToScript(episodeOutline) {
        const { episodeNumber, content, hook, isTwist, isClimax } = episodeOutline;
        const duration = this.project.duration;

        // 获取剧本结构模板
        const template = duration <= 60 ? SCRIPT_TEMPLATES.episodeStructure.duration60 :
                        duration <= 90 ? SCRIPT_TEMPLATES.episodeStructure.duration90 :
                        SCRIPT_TEMPLATES.episodeStructure.duration120;

        // 生成场景
        const scenes = this.generateScenes(episodeNumber, template, content);

        return {
            episodeNumber,
            duration: `${duration}秒`,
            wordCount: template.words,
            scenes: scenes,
            hook: hook,
            isTwist,
            isClimax
        };
    }

    // ===== 生成场景 =====
    generateScenes(epNum, template, content) {
        const scenes = [];
        const sceneCount = template.beats.length - 1; // 减去结尾钩子

        const locations = this.getLocations();
        const times = ['日', '夜', '黄昏', '清晨'];

        for (let i = 0; i < sceneCount; i++) {
            const beat = template.beats[i];
            const location = locations[i % locations.length];
            const time = times[i % times.length];

            scenes.push({
                sceneNumber: i + 1,
                location: location,
                time: time,
                description: this.generateSceneDescription(epNum, i, beat),
                dialogue: this.generateDialogue(epNum, i, beat),
                duration: beat.time,
                type: beat.type
            });
        }

        return scenes;
    }

    // ===== 获取场景地点 =====
    getLocations() {
        const { category, typeInfo } = this.project;

        const commonLocations = ['客厅', '街道', '车内', '办公室', '餐厅'];

        const categoryLocations = {
            female: ['豪宅', '咖啡厅', '公司', '卧室', '花园', '商场'],
            male: ['酒吧', '格斗场', '豪华办公室', '停车场', '健身房', '豪宅'],
            general: ['警局', '废弃建筑', '医院', '公寓', '隐秘基地', '户外']
        };

        return [...commonLocations, ...(categoryLocations[category] || [])];
    }

    // ===== 生成场景描述 =====
    generateSceneDescription(epNum, sceneIndex, beat) {
        const descriptions = {
            hook: [
                '画面从一个震撼的镜头开始',
                '紧张的气氛弥漫',
                '意外的事件突然发生',
                '主角陷入危险/尴尬境地'
            ],
            setup: [
                '场景建立，人物入场',
                '日常对话交代背景',
                '人物关系逐渐清晰',
                '平静下的暗流涌动'
            ],
            inciting: [
                '触发事件发生',
                '主角面临选择',
                '冲突的种子埋下',
                '意外打破平静'
            ],
            rising: [
                '冲突不断升级',
                '情感逐渐加深',
                '阻碍接连出现',
                '主角采取行动'
            ],
            conflict: [
                '矛盾激化',
                '正面对抗',
                '秘密即将暴露',
                '情势危急'
            ],
            twist: [
                '意外转折',
                '真相浮现',
                '局势逆转',
                '隐藏身份暴露'
            ],
            climax: [
                '高潮对决',
                '情感爆发',
                '关键抉择',
                '一切即将揭晓'
            ],
            cliffhanger: [
                '悬念戛然而止',
                '惊人发现',
                '危险降临',
                '让人欲罢不能'
            ]
        };

        const options = descriptions[beat.type] || descriptions.setup;
        return options[sceneIndex % options.length];
    }

    // ===== 生成对白 =====
    generateDialogue(epNum, sceneIndex, beat) {
        const characters = this.project.characters;
        const protag = characters.find(c => c.role === 'protagonist');
        const loveInterest = characters.find(c => c.role === 'love-interest');
        const antagonist = characters.find(c => c.role === 'antagonist');

        const dialogues = [];

        // 根据场景类型生成不同对白
        if (beat.type === 'hook') {
            dialogues.push(
                { character: '旁白', text: '【紧张的音乐起】', type: 'action' },
                { character: protag?.name || '主角', text: '（震惊/恐惧）不...不可能！', type: 'dialogue' },
                { character: antagonist?.name || '反派', text: '（冷笑）没想到吧？', type: 'dialogue', parenthetical: '得意' }
            );
        } else if (beat.type === 'setup') {
            dialogues.push(
                { character: '旁白', text: '【场景切换】', type: 'transition' },
                { character: protag?.name || '主角', text: '今天又是普通的一天...', type: 'dialogue' },
                { character: '闺蜜/朋友', text: '嘿，你听说那件事了吗？', type: 'dialogue' }
            );
        } else if (beat.type === 'climax') {
            dialogues.push(
                { character: protag?.name || '主角', text: '我不会再逃避了！', type: 'dialogue', parenthetical: '坚定' },
                { character: loveInterest?.name || '男/女主', text: '我会一直在你身边。', type: 'dialogue', parenthetical: '温柔' },
                { character: '旁白', text: '【音乐推向高潮】', type: 'action' }
            );
        } else {
            // 普通对白
            dialogues.push(
                { character: protag?.name || '主角', text: '我需要做出决定了。', type: 'dialogue' },
                { character: loveInterest?.name || '男/女主', text: '不管你做什么选择，我都支持你。', type: 'dialogue' }
            );
        }

        return dialogues;
    }

    // ===== 工具方法 =====
    estimateWordCount() {
        const duration = this.project.duration;
        // 中文剧本大约每秒2-3个字
        return Math.floor(duration * 2.5);
    }

    randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    getContentTemplates(typeInfo, epNum, act) {
        return {
            opening: typeInfo.hookPatterns || ['开场钩子'],
            middle: typeInfo.romanceScenes || typeInfo.faceSlapScenes || ['剧情推进'],
            ending: typeInfo.conflicts || ['悬念结尾']
        };
    }

    // ===== 保存/加载项目 =====
    saveProject() {
        const projects = JSON.parse(localStorage.getItem('scriptProjects') || '[]');
        const existingIndex = projects.findIndex(p => p.id === this.project.id);

        if (existingIndex !== -1) {
            projects[existingIndex] = this.project;
        } else {
            projects.push(this.project);
        }

        localStorage.setItem('scriptProjects', JSON.stringify(projects));
        return this.project.id;
    }

    loadProject(projectId) {
        const projects = JSON.parse(localStorage.getItem('scriptProjects') || '[]');
        const project = projects.find(p => p.id === projectId);

        if (project) {
            this.project = project;
            return project;
        }

        return null;
    }

    static getAllProjects() {
        return JSON.parse(localStorage.getItem('scriptProjects') || '[]');
    }

    static deleteProject(projectId) {
        const projects = JSON.parse(localStorage.getItem('scriptProjects') || '[]');
        const filtered = projects.filter(p => p.id !== projectId);
        localStorage.setItem('scriptProjects', JSON.stringify(filtered));
    }
}

// ===== 导出 =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScriptEngine;
}
