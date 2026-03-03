/**
 * Short Drama Script Agent - Type Definitions & Templates
 * 竖屏短剧剧本生成器 - 类型定义与模板
 */

const DRAMA_TYPES = {
    // ===== 女频短剧 Female Romance =====
    'billionaire-ceo': {
        name: '霸道总裁',
        nameEn: 'Billionaire CEO',
        category: 'female',
        description: '契约开始 · 身份悬殊 · 先虐后甜',
        icon: '👔',
        structure: {
            act1: { range: [1, 10], focus: '相遇与契约', hookInterval: 1 },
            act2: { range: [11, 30], focus: '暧昧与阻碍', hookInterval: 1, twistPoints: [15, 25] },
            act3: { range: [31, 40], focus: '危机与真相', hookInterval: 1, twistPoints: [35] },
            act4: { range: [41, 50], focus: '和解与圆满', hookInterval: 1, climax: 50 }
        },
        standardCharacters: [
            { role: 'protagonist', name: '女主', desc: '善良坚韧的普通女孩', type: '正面女主' },
            { role: 'love-interest', name: '男主', desc: '高冷霸道的总裁', type: '霸道总裁' },
            { role: 'antagonist', name: '未婚妻', desc: '心机深沉的千金小姐', type: '恶毒女配' },
            { role: 'antagonist', name: '男主母亲', desc: '看不起女主的豪门婆婆', type: '恶毒长辈' },
            { role: 'supporting', name: '闺蜜', desc: '支持女主的好朋友', type: '助攻' },
            { role: 'antagonist', name: '前男友', desc: '势利的前男友回头求复合', type: '反派' }
        ],
        romanceScenes: [
            '意外亲密接触（擦药/摔倒接住）',
            '霸总吃醋强吻',
            '契约婚姻同居生活',
            '雨夜送伞/生病照顾',
            '当众宣示主权',
            '误会分开后重逢',
            '为女主出头打脸反派'
        ],
        conflicts: [
            '身份悬殊带来的压力',
            '未婚妻的陷害',
            '男主母亲的阻挠',
            '白月光回国',
            '商业联姻的压力',
            '误会分手',
            '女主身世之谜'
        ],
        hookPatterns: [
            '女主被欺负时霸总出现',
            '亲密瞬间被打断',
            '发现契约真相',
            '霸总温柔一面的展现',
            '反派的阴谋即将得逞',
            '误会即将解开却被打断'
        ]
    },

    'mafia': {
        name: '黑手党/黑帮',
        nameEn: 'Mafia Romance',
        category: 'female',
        description: '禁忌之恋 · 危险世界 · 保护与背叛',
        icon: '🖤',
        structure: {
            act1: { range: [1, 10], focus: '卷入危险', hookInterval: 1 },
            act2: { range: [11, 30], focus: '囚禁与吸引', hookInterval: 1, twistPoints: [18, 28] },
            act3: { range: [31, 40], focus: '家族战争', hookInterval: 1, twistPoints: [35] },
            act4: { range: [41, 50], focus: '逃离与选择', hookInterval: 1, climax: 50 }
        },
        standardCharacters: [
            { role: 'protagonist', name: '女主', desc: '无辜卷入的坚强女孩', type: '正面女主' },
            { role: 'love-interest', name: '教父/老大', desc: '危险迷人的黑帮首领', type: '危险男主' },
            { role: 'antagonist', name: '家族对手', desc: '敌对家族的继承人', type: '反派' },
            { role: 'antagonist', name: '二把手', desc: '嫉妒男主的副手', type: '内鬼' },
            { role: 'supporting', name: ' loyal guard', desc: '忠于男主的手下', type: '助攻' },
            { role: 'antagonist', name: '警察', desc: '追查黑帮的正义警察', type: '阻碍' }
        ],
        romanceScenes: [
            '危险环境中的保护',
            '枪林弹雨中的牵手',
            '受伤后的亲密照顾',
            '黑夜中的秘密约会',
            '为对方挡子弹',
            '诀别前的拥吻',
            '洗手做汤羹的反差'
        ],
        conflicts: [
            '家族仇恨',
            '敌对势力的威胁',
            '警察的追捕',
            '内鬼的背叛',
            '男主的黑暗过去',
            '女主的安全顾虑',
            '金盆洗手的代价'
        ],
        hookPatterns: [
            '枪战爆发',
            '发现男主真实身份',
            '敌对势力绑架女主',
            '家族内部的背叛',
            '警方卧底身份暴露',
            '男主受伤濒死'
        ]
    },

    'werewolf': {
        name: '狼人/超自然',
        nameEn: 'Werewolf/Fated Mate',
        category: 'female',
        description: 'Fated Mate羁绊 · Pack等级政治 · Rejected Mate逆袭 · True Alpha之爱',
        icon: '🐺',
        structure: {
            act1: { range: [1, 10], focus: 'Mate觉醒或发现', hookInterval: 1 },
            act2: { range: [11, 30], focus: 'Bond形成与抗拒/追逐', hookInterval: 1, twistPoints: [16, 26] },
            act3: { range: [31, 40], focus: 'Pack政治与外部威胁', hookInterval: 1, twistPoints: [36] },
            act4: { range: [41, 50], focus: 'Bond确认与Pack统一', hookInterval: 1, climax: 50 }
        },
        standardCharacters: [
            { role: 'protagonist', desc: 'Fated mate但抗拒命运/被rejected/人类不懂规则', type: '命运女主', variants: ['Rare white wolf', 'Late bloomer', 'Human mate', 'Rejected mate returns', 'Omega with gift', 'Rogue'] },
            { role: 'love-interest', desc: 'Alpha或特殊地位的wolf，有trauma或responsibilities', type: 'Alpha男主', variants: ['True Alpha', 'Feral Alpha', 'Reluctant Alpha', 'Rogue turned protector', 'Second chance mate'] },
            { role: 'antagonist', desc: '挑战mate bond或pack地位的存在', type: '情敌/反派', variants: ['Jealous Beta female', 'Scorned former lover', 'Rogue with obsession', 'Rival Alpha'] },
            { role: 'supporting', desc: 'Pack wisdom或family figure', type: 'Pack长者', variants: ['Wise Elder', 'Protective Gamma', 'Healer Delta', 'Loyal Beta'] },
            { role: 'antagonist', desc: 'External threat', type: '外部威胁', variants: ['Werewolf hunter', 'Rogue pack leader', 'Corrupted shaman', 'Rival pack Alpha'] },
            { role: 'supporting', desc: 'Ally或friend', type: '盟友', variants: ['Human friend discovers truth', 'Supportive pack sister', 'Rebellious younger wolf'] }
        ],
        romanceScenes: [
            'First shift时的陪伴与保护',
            'Fated mate bond的第一次觉醒（嗅觉/视觉/emotion共享）',
            'Marking ritual的准备与犹豫',
            'Pack面前的official claiming',
            'Moon run（狼形态一起奔跑）',
            'Telepathic link中的intimate conversation',
            'Human form和wolf form的双向互动',
            'Heat/mating season的resistance与surrender',
            'Rejection后的groveling与 redemption',
            'Alpha如何展示vulnerability给mate'
        ],
        conflicts: [
            'Rejected mate的public humiliation与recovery',
            'Fated mate vs Chosen mate的抉择',
            'Human mate的transformation抉择',
            'Pack law禁止human mate',
            'Alpha职责 vs mate保护的冲突',
            'Previous mate的死亡阴影（Second chance）',
            'Rogue attack或territory war',
            'Internal pack coup（Beta challenging Alpha）',
            'Werewolf hunters的组织化威胁',
            'Mate bond的拒绝带来的physical pain',
            'Feral wolf的控制问题',
            'Cross-pack mating的政治implications'
        ],
        hookPatterns: [
            '首次变身意外发生',
            '伴侣气味的不可抗拒识别',
            '当众拒绝的冲击',
            '流浪者攻击在脆弱时刻',
            '标记过程中的打断',
            '族群会议的挑战',
            '猎人陷阱发现',
            '前任情人怀孕归来',
            '真实身份作为白狼/稀有品种揭露',
            '月亮疯狂失控'
        ],
        loreElements: {
            packRoles: ['阿尔法（首领）', '贝塔（副手）', '伽马（训练师）', '德尔塔（医者）', '艾普西隆（战士）', '泽塔（策略师）', '欧米茄（和平者）'],
            mateTypes: ['命运伴侣', '真命伴侣', '被拒伴侣', '第二次机会', '人类伴侣', '结合伴侣'],
            rituals: ['标记', '结合仪式', '首次变身', '族群接纳'],
            abilities: ['强化感官', '心灵感应', '快速愈合', '部分变身', '阿尔法命令'],
            weaknesses: ['银器', '狼毒草', '满月控制问题', '伴侣Bond痛苦']
        }
    },

    'american-campus': {
        name: '美式青春校园',
        nameEn: 'American Campus',
        category: 'female',
        description: 'Gen Z社交战争 · TikTok人气 · 跨圈层恋爱 · 真实自我',
        icon: '🎓',
        structure: {
            act1: { range: [1, 10], focus: '新学期/新环境适应', hookInterval: 1 },
            act2: { range: [11, 30], focus: '社交攀爬与身份探索', hookInterval: 1, twistPoints: [17, 27] },
            act3: { range: [31, 40], focus: '病毒式危机与真相揭露', hookInterval: 1, twistPoints: [36] },
            act4: { range: [41, 50], focus: '成长整合与真爱确认', hookInterval: 1, climax: 50 }
        },
        standardCharacters: [
            { role: 'protagonist', desc: '真实、真诚，可能是弱势者或隐藏宝石', type: '成长型女主', variants: ['奖学金学生', '转学生', '隐形女孩', '玩家女孩', '艺术生'] },
            { role: 'love-interest', desc: '跨小团体的吸引力，表面与内在的反差', type: '校园男神', variants: ['有深度的运动健将', '有创伤的坏男孩', '变帅的学霸', '神秘独行侠', '被救赎的玩家'] },
            { role: 'antagonist', desc: '维护社交等级的人气女王', type: '恶毒女配', variants: ['不安全的人气女孩', '有秘密的刻薄女孩', '社交媒体对手'] },
            { role: 'supporting', desc: '支持真诚自我的真朋友', type: '真闺蜜', variants: ['童年起就忠诚', '新朋友看到她的价值', '有智慧的 gay 好友'] },
            { role: 'antagonist', desc: '前任或竞争对手制造麻烦', type: '麻烦制造者', variants: ['嫉妒的前任', '感情对手', '有毒的朋友'] },
            { role: 'supporting', desc: '带来压力的家庭成员', type: '家庭压力', variants: ['严厉的父母', '兄弟姐妹竞争', '经济差距'] }
        ],
        romanceScenes: [
            '周五橄榄球夜的紧张',
            '家庭派对上的真心话大冒险',
            '学习时光变成调情',
            '返校节邀约焦虑',
            '春假公路旅行',
            '秘密地下室聚会',
            'TikTok视频里的眼神交流',
            '停车场/储物柜边的对话',
            '派对后的真心话',
            '毕业舞会邀约和慢舞'
        ],
        conflicts: [
            '赌约契约被揭露后的信任破裂',
            '假戏真做变成真感情的困惑',
            '社交媒体病毒式丑闻',
            '跨小团体恋爱的社会压力',
            '地下恋情被发现',
            '前任的复仇式色情或谣言',
            '学术作弊影响大学申请',
            '同辈压力的危险挑战',
            '身份探索中的性取向困惑',
            '奖学金与社交生活的冲突',
            'NIL网红运动员的形象管理'
        ],
        hookPatterns: [
            '派对上的病毒视频瞬间',
            '赌约的真相即将揭露',
            '地下恋情几乎被发现',
            '谣言工厂开始转动',
            '改造后的惊艳登场',
            '敌人被迫合作项目',
            '前任出现制造麻烦',
            '社交地位的公开羞辱/提升',
            '禁忌之恋的惊险时刻',
            '身份秘密濒临曝光'
        ],
        sensitiveTopics: ['consent教育', '数字隐私', '有毒关系识别', '心理健康', '同辈压力应对', 'LGBTQ+出柜支持'],
        genZElements: {
            socialMedia: ['TikTok viral', 'Instagram stories', 'Snapchat streaks', 'Finsta secrets', 'Cancel culture'],
            aesthetics: ['E-girl/E-boy', 'VSCO girl', 'Dark academia', 'Cottagecore', 'Y2K fashion'],
            concerns: ['Climate anxiety', 'College admission stress', 'Social justice', 'Mental health awareness', 'Economic inequality'],
            communication: ['Texting drama', 'Ghosting', 'Situationship', 'Soft launch', 'Breadcrumbing']
        }
    },

    'revenge-rebirth': {
        name: '重生复仇',
        nameEn: 'Revenge/Rebirth',
        category: 'female',
        description: '改变命运 · 前世背叛 · 打脸反派',
        icon: '⚡',
        structure: {
            act1: { range: [1, 10], focus: '重生归来', hookInterval: 1 },
            act2: { range: [11, 30], focus: '布局复仇', hookInterval: 1, twistPoints: [17, 27] },
            act3: { range: [31, 40], focus: '真相揭露', hookInterval: 1, twistPoints: [36] },
            act4: { range: [41, 50], focus: '新生与爱情', hookInterval: 1, climax: 50 }
        },
        standardCharacters: [
            { role: 'protagonist', name: '女主', desc: '带着记忆重生的复仇者', type: '黑莲花女主' },
            { role: 'love-interest', name: '男主', desc: '前世错过/不信任的真爱', type: '忠犬男主' },
            { role: 'antagonist', name: '假闺蜜', desc: '前世害死女主的闺蜜', type: '恶毒女配' },
            { role: 'antagonist', name: '渣男', desc: '前世背叛的未婚夫', type: '渣男' },
            { role: 'antagonist', name: '继母', desc: '前世压迫女主的家人', type: '恶毒家人' },
            { role: 'supporting', name: '真心友', desc: '前世被辜负的真心朋友', type: '盟友' }
        ],
        romanceScenes: [
            '重生后第一时间找到真爱',
            '提前阻止男主的悲剧',
            '利用前世记忆攻略男主',
            '为男主改写命运',
            '打脸现场的牵手',
            '揭露真相时的守护',
            '这一世的圆满婚礼'
        ],
        conflicts: [
            '复仇 vs 放下',
            '改变历史的蝴蝶效应',
            '前世阴影',
            '反派的察觉与反击',
            '如何解释预知能力',
            '这一世的新变数',
            '原谅与报复的边界'
        ],
        hookPatterns: [
            '重生瞬间的高能',
            '预见未来被验证',
            '反派阴谋被提前阻止',
            '前世真相碎片',
            '打脸现场',
            '历史即将重演的危机'
        ]
    },

    // ===== 男频爽剧 Male Power Fantasy =====
    'underdog-revenge': {
        name: '逆袭打脸',
        nameEn: 'Underdog Revenge',
        category: 'male',
        description: '被轻视→展现实力→震惊众人',
        icon: '💪',
        structure: {
            act1: { range: [1, 10], focus: '被羞辱', hookInterval: 1 },
            act2: { range: [11, 30], focus: '获得力量', hookInterval: 1, faceSlapPoints: [15, 25] },
            act3: { range: [31, 40], focus: '连续打脸', hookInterval: 1, faceSlapPoints: [35] },
            act4: { range: [41, 50], focus: '登顶巅峰', hookInterval: 1, climax: 50 }
        },
        standardCharacters: [
            { role: 'protagonist', name: '男主', desc: '被所有人看不起的废物/屌丝', type: '逆袭男主' },
            { role: 'antagonist', name: '富二代', desc: '欺负男主的富二代', type: '主要反派' },
            { role: 'antagonist', name: '势利经理', desc: '开除男主的上司', type: '反派' },
            { role: 'antagonist', name: '前女友', desc: '嫌贫爱富的前女友', type: '后悔女配' },
            { role: 'supporting', name: '小弟', desc: '第一个跟随男主的忠诚小弟', type: '跟班' },
            { role: 'love-interest', name: '女神', desc: '唯一看好男主的女神', type: '女主' }
        ],
        faceSlapScenes: [
            '被羞辱时身份曝光',
            '曾经看不起的人跪舔',
            '前女友后悔莫及',
            '拍卖会碾压富二代',
            '商业对决完胜',
            '武力值碾压',
            '身份地位全面超越'
        ],
        progression: [
            '被当众羞辱',
            '获得神秘力量/身份',
            '第一次小打脸',
            '力量升级',
            '连续打脸',
            '身份全面曝光',
            '登顶巅峰'
        ],
        hookPatterns: [
            '身份即将曝光',
            '反派嘲讽后被打脸',
            '女神遇到危险',
            '神秘力量觉醒',
            '更大反派出现',
            '碾压式胜利'
        ]
    },

    'secret-identity': {
        name: '隐藏身份',
        nameEn: 'Secret Identity',
        category: 'male',
        description: '表面屌丝·实际大佬·扫地僧',
        icon: '🎭',
        structure: {
            act1: { range: [1, 10], focus: '低调生活', hookInterval: 1 },
            act2: { range: [11, 30], focus: '暗地出手', hookInterval: 1, revealPoints: [18, 26] },
            act3: { range: [31, 40], focus: '身份渐露', hookInterval: 1, revealPoints: [35] },
            act4: { range: [41, 50], focus: '完全曝光', hookInterval: 1, climax: 50 }
        },
        standardCharacters: [
            { role: 'protagonist', name: '男主', desc: '表面普通，实际多重隐藏身份', type: '隐藏大佬' },
            { role: 'antagonist', name: '势利眼', desc: '看不起男主的各色人等', type: '反派群' },
            { role: 'antagonist', name: '嚣张二代', desc: '被男主暗中教训的二代', type: '打脸对象' },
            { role: 'love-interest', name: '未婚妻', desc: '嫌弃男主的未婚妻', type: '后悔女配' },
            { role: 'supporting', name: '大佬们', desc: '知道真相的各类大佬', type: '衬托' },
            { role: 'supporting', name: '新女主', desc: '看出男主不凡的真女主', type: '真女主' }
        ],
        revealScenes: [
            '被欺负时暗中调来军队',
            '随手送出的礼物价值连城',
            '一个电话调动千亿资金',
            '各国大佬争相拜访',
            '隐藏武功轻松击败高手',
            '多重身份逐一曝光',
            '曾经看不起的人跪地求饶'
        ],
        hookPatterns: [
            '身份即将被发现',
            '暗中出手救人',
            '被挑衅却不动声色',
            '大佬突然出现敬礼',
            '随手举动震惊众人',
            '最终身份全面曝光'
        ]
    },

    'apocalypse-king': {
        name: '末日生存王者',
        nameEn: 'Post-Apocalyptic King',
        category: 'male',
        description: '丧尸/灾难→建立秩序→废土之王',
        icon: '☠️',
        structure: {
            act1: { range: [1, 10], focus: '灾难爆发', hookInterval: 1 },
            act2: { range: [11, 30], focus: '生存崛起', hookInterval: 1, bossPoints: [18, 26] },
            act3: { range: [31, 40], focus: '建立势力', hookInterval: 1, bossPoints: [35] },
            act4: { range: [41, 50], focus: '统一废土', hookInterval: 1, climax: 50 }
        },
        standardCharacters: [
            { role: 'protagonist', name: '男主', desc: '获得系统/异能的末日生存专家', type: '末日王者' },
            { role: 'antagonist', name: '暴徒首领', desc: '末日中作恶的土匪头子', type: '人类反派' },
            { role: 'antagonist', name: '变异丧尸王', desc: '高等级的变异怪物', type: '怪物反派' },
            { role: 'antagonist', name: '前权贵', desc: '末日前高高在上，现在落魄', type: '打脸对象' },
            { role: 'supporting', name: '忠诚队员', desc: '跟随男主的核心团队', type: '队友' },
            { role: 'love-interest', name: '女战士', desc: '强大的女性战斗伙伴', type: '女主' }
        ],
        progression: [
            '灾难降临，获得能力',
            '搜刮资源，建立基地',
            '招募幸存者',
            '击败暴徒势力',
            '清理变异区域',
            '建立新秩序',
            '成为废土之王'
        ],
        hookPatterns: [
            '丧尸潮来袭',
            '资源即将耗尽',
            '基地被攻击',
            '新变异怪物出现',
            '叛徒出卖',
            '大规模尸潮攻防战'
        ]
    },

    'system-powers': {
        name: '系统/超能力觉醒',
        nameEn: 'System/Powers',
        category: 'male',
        description: '获得作弊能力→快速升级→无敌',
        icon: '⚡',
        structure: {
            act1: { range: [1, 10], focus: '获得系统', hookInterval: 1 },
            act2: { range: [11, 30], focus: '快速升级', hookInterval: 1, powerSpikes: [15, 25] },
            act3: { range: [31, 40], focus: '碾压对手', hookInterval: 1, powerSpikes: [35] },
            act4: { range: [41, 50], focus: '登临绝顶', hookInterval: 1, climax: 50 }
        },
        standardCharacters: [
            { role: 'protagonist', name: '男主', desc: '获得系统的普通人', type: '系统宿主' },
            { role: 'antagonist', name: '系统竞争者', desc: '其他系统拥有者', type: '同级对手' },
            { role: 'antagonist', name: '傲慢强者', desc: '看不起男主的高阶存在', type: '高阶反派' },
            { role: 'antagonist', name: '背叛者', desc: '曾经队友的背叛', type: '内鬼' },
            { role: 'supporting', name: '系统精灵', desc: '辅助男主的系统AI', type: '辅助' },
            { role: 'love-interest', name: '能力者', desc: '强大的女性能力者', type: '女主' }
        ],
        progression: [
            '系统激活，新手任务',
            '第一次能力提升',
            '越级挑战成功',
            '解锁高级功能',
            '系统升级进化',
            '击败最强对手',
            '超越系统限制'
        ],
        hookPatterns: [
            '系统发布紧急任务',
            '能力突破临界点',
            '越级挑战强敌',
            '隐藏功能解锁',
            '其他系统拥有者出现',
            '系统真相揭示'
        ]
    },

    'military-returns': {
        name: '军事/特工归来',
        nameEn: 'Military/Spy Returns',
        category: 'male',
        description: '最强战士→家人被欺→血洗敌人',
        icon: '🎖️',
        structure: {
            act1: { range: [1, 10], focus: '荣耀归来', hookInterval: 1 },
            act2: { range: [11, 30], focus: '发现真相', hookInterval: 1, actionPoints: [16, 26] },
            act3: { range: [31, 40], focus: '雷霆出击', hookInterval: 1, actionPoints: [35] },
            act4: { range: [41, 50], focus: '彻底清算', hookInterval: 1, climax: 50 }
        },
        standardCharacters: [
            { role: 'protagonist', name: '男主', desc: '退役兵王/王牌特工', type: '兵王' },
            { role: 'antagonist', name: '地头蛇', desc: '欺负男主家人的地方恶霸', type: '小反派' },
            { role: 'antagonist', name: '幕后黑手', desc: '针对男主家族的势力', type: '大反派' },
            { role: 'antagonist', name: '势利亲戚', desc: '曾经看不起男主家的亲戚', type: '打脸对象' },
            { role: 'supporting', name: '老战友', desc: '随叫随到的过命兄弟', type: '帮手' },
            { role: 'love-interest', name: '家人', desc: '需要保护的妹妹/未婚妻', type: '守护对象' }
        ],
        actionScenes: [
            '一人单挑整个帮派',
            '军队包围恶霸总部',
            '国际追捕幕后黑手',
            '营救人质行动',
            '军火展示震慑',
            '全球势力集结',
            '最终决战'
        ],
        hookPatterns: [
            '发现家人被欺负',
            '亮出真实身份',
            '调用军队资源',
            '敌人试图反击',
            '更大势力浮出水面',
            '最终清算时刻'
        ]
    },

    'harem-desired': {
        name: '多女主/被追逐',
        nameEn: 'Harem/Desired',
        category: 'male',
        description: '多女主追求·平凡男主变万人迷',
        icon: '👑',
        structure: {
            act1: { range: [1, 10], focus: '突然受欢迎', hookInterval: 1 },
            act2: { range: [11, 30], focus: '女主登场', hookInterval: 1, capturePoints: [16, 26] },
            act3: { range: [31, 40], focus: '修罗场', hookInterval: 1, capturePoints: [35] },
            act4: { range: [41, 50], focus: '最终选择', hookInterval: 1, climax: 50 }
        },
        standardCharacters: [
            { role: 'protagonist', name: '男主', desc: '突然获得魅力的普通男生', type: '万人迷男主' },
            { role: 'love-interest', name: '高冷女神', desc: '冰山美人倒追', type: '女主1' },
            { role: 'love-interest', name: '元气少女', desc: '活泼可爱的追求', type: '女主2' },
            { role: 'love-interest', name: '成熟御姐', desc: '大姐姐的温柔攻势', type: '女主3' },
            { role: 'love-interest', name: '神秘少女', desc: '有特殊背景的女孩', type: '女主4' },
            { role: 'antagonist', name: '嫉妒者', desc: '嫉妒男主的其他人', type: '反派' }
        ],
        romanceScenes: [
            '女神主动搭讪',
            '意外身体接触',
            '当众表白',
            '争风吃醋',
            '只能选一个的困境',
            '后宫和谐',
            '最终选择或全都要'
        ],
        hookPatterns: [
            '新女主登场',
            '修罗场爆发',
            '女神们争宠',
            '男主的选择',
            '秘密被揭开',
            '最终抉择'
        ]
    },

    // ===== 通用题材 General Genres =====
    'mystery-crime': {
        name: '悬疑/罪案',
        nameEn: 'Mystery/Crime',
        category: 'general',
        description: '多重嫌疑人·红鲱鱼·真相反转',
        icon: '🔍',
        structure: {
            act1: { range: [1, 10], focus: '案件发生', hookInterval: 1 },
            act2: { range: [11, 30], focus: '调查深入', hookInterval: 1, twistPoints: [17, 27] },
            act3: { range: [31, 40], focus: '真相浮现', hookInterval: 1, twistPoints: [36] },
            act4: { range: [41, 50], focus: '最终解答', hookInterval: 1, climax: 50 }
        },
        elements: {
            suspects: ['有动机的人', '有秘密的人', '看似无辜的人'],
            redHerrings: ['误导性证据', '假证人', '巧合事件'],
            clues: ['物证', '证言矛盾', '时间线漏洞']
        },
        hookPatterns: [
            '新证据出现',
            '嫌疑人死亡',
            '证人翻供',
            '主角遇袭',
            '真相反转',
            '真凶现身'
        ]
    },

    'psychological-thriller': {
        name: '心理惊悚',
        nameEn: 'Psychological Thriller',
        category: 'general',
        description: '不可靠叙述者·现实幻觉边界',
        icon: '🧠',
        structure: {
            act1: { range: [1, 10], focus: '异常开始', hookInterval: 1 },
            act2: { range: [11, 30], focus: '怀疑加剧', hookInterval: 1, twistPoints: [16, 26] },
            act3: { range: [31, 40], focus: '真相逼近', hookInterval: 1, twistPoints: [36] },
            act4: { range: [41, 50], focus: '最终揭秘', hookInterval: 1, climax: 50 }
        },
        elements: {
            themes: ['记忆不可靠', '身份错位', 'gaslighting', '创伤后遗症'],
            techniques: ['主观视角', '时间错位', '镜像/倒影', '梦境插入']
        },
        hookPatterns: [
            '记忆断层',
            '发现时间不对',
            '镜子里的异常',
            '被告知从未发生过',
            '找到真实记录',
            '身份真相揭露'
        ]
    },

    'supernatural-horror': {
        name: '超自然恐怖',
        nameEn: 'Supernatural Horror',
        category: 'general',
        description: '鬼怪·诅咒·附身·古老秘密',
        icon: '👻',
        structure: {
            act1: { range: [1, 10], focus: '诡异事件', hookInterval: 1 },
            act2: { range: [11, 30], focus: '恐怖升级', hookInterval: 1, twistPoints: [16, 26] },
            act3: { range: [31, 40], focus: '真相调查', hookInterval: 1, twistPoints: [36] },
            act4: { range: [41, 50], focus: '最终对决', hookInterval: 1, climax: 50 }
        },
        elements: {
            threats: ['鬼魂复仇', '古老诅咒', '恶魔附身', '怪物苏醒'],
            atmosphere: ['jumpscare', '逐渐升级的不适', '孤立无援', '规则恐怖']
        },
        hookPatterns: [
            '突然出现的影子',
            '物品自己移动',
            '发现诅咒源头',
            '身边人异常',
            '逃不掉的循环',
            '最终揭晓真相'
        ]
    },

    'action-spy': {
        name: '动作/谍战',
        nameEn: 'Action/Spy',
        category: 'general',
        description: '限时任务·双重身份·背叛',
        icon: '🔫',
        structure: {
            act1: { range: [1, 10], focus: '任务开始', hookInterval: 1 },
            act2: { range: [11, 30], focus: '深入敌后', hookInterval: 1, twistPoints: [17, 27] },
            act3: { range: [31, 40], focus: '身份危机', hookInterval: 1, twistPoints: [36] },
            act4: { range: [41, 50], focus: '终极行动', hookInterval: 1, climax: 50 }
        },
        elements: {
            setpieces: ['追车戏', '近身格斗', '枪战', '潜入', '拆弹', '营救'],
            twists: ['双重间谍', '身份暴露', '假情报', '组织内部敌人']
        },
        hookPatterns: [
            '倒计时开始',
            '身份即将暴露',
            '被发现',
            '炸弹即将爆炸',
            '队友背叛',
            '最终对决'
        ]
    },

    'sci-fi': {
        name: '科幻',
        nameEn: 'Sci-Fi',
        category: 'general',
        description: '科技伦理·生存危机·时空概念',
        icon: '🚀',
        structure: {
            act1: { range: [1, 10], focus: '世界建立', hookInterval: 1 },
            act2: { range: [11, 30], focus: '危机显现', hookInterval: 1, twistPoints: [17, 27] },
            act3: { range: [31, 40], focus: '真相探索', hookInterval: 1, twistPoints: [36] },
            act4: { range: [41, 50], focus: '最终解决', hookInterval: 1, climax: 50 }
        },
        elements: {
            themes: ['AI觉醒', '基因改造', '时间旅行', '外星接触', '虚拟现实', '资源枯竭'],
            concepts: ['赛博朋克', '太空歌剧', '末日废土', '乌托邦/反乌托邦']
        },
        hookPatterns: [
            '科技失控',
            '发现惊人真相',
            '时间线异常',
            'AI的隐藏意图',
            '外星信号',
            '最终抉择'
        ]
    },

    'survival': {
        name: '生存冒险',
        nameEn: 'Survival',
        category: 'general',
        description: '极端环境·资源匮乏·人性考验',
        icon: '🏔️',
        structure: {
            act1: { range: [1, 10], focus: '灾难发生', hookInterval: 1 },
            act2: { range: [11, 30], focus: '求生挣扎', hookInterval: 1, crisisPoints: [17, 27] },
            act3: { range: [31, 40], focus: '团队分裂', hookInterval: 1, crisisPoints: [36] },
            act4: { range: [41, 50], focus: '最终逃生', hookInterval: 1, climax: 50 }
        },
        elements: {
            environments: ['荒岛', '雪山', '沙漠', '丛林', '深海', '太空'],
            threats: ['自然灾害', '野兽', '资源争夺', '内部矛盾', '幻觉/绝望'],
            moralTests: ['牺牲谁', '是否吃人', '是否抛弃弱者', '信任陌生人']
        },
        hookPatterns: [
            '资源耗尽',
            '自然灾害来袭',
            '团队成员死亡',
            '发现不寻常',
            '救援信号',
            '最终逃生机会'
        ]
    },

    'dark-comedy-crime': {
        name: '黑色幽默犯罪',
        nameEn: 'Dark Comedy Crime',
        category: 'general',
        description: '荒诞犯罪·计划出错·讽刺',
        icon: '😈',
        structure: {
            act1: { range: [1, 10], focus: '犯罪计划', hookInterval: 1 },
            act2: { range: [11, 30], focus: '计划出错', hookInterval: 1, chaosPoints: [16, 26] },
            act3: { range: [31, 40], focus: '事态失控', hookInterval: 1, chaosPoints: [36] },
            act4: { range: [41, 50], focus: '荒诞结局', hookInterval: 1, climax: 50 }
        },
        elements: {
            humor: ['黑色幽默', '讽刺', '荒诞', '巧合', '误会', '自作自受'],
            situations: ['计划永远出错', '越描越黑', '无辜者卷入', '坏人更坏']
        },
        hookPatterns: [
            '计划出现意外',
            '尸体被发现',
            '警察上门',
            '同伙背叛',
            '意外杀人',
            '荒诞大结局'
        ]
    },

    'social-drama': {
        name: '社会议题剧',
        nameEn: 'Social Drama',
        category: 'general',
        description: '当下热点·道德困境·多方视角',
        icon: '🎭',
        structure: {
            act1: { range: [1, 10], focus: '事件引入', hookInterval: 1 },
            act2: { range: [11, 30], focus: '矛盾升级', hookInterval: 1, revelationPoints: [17, 27] },
            act3: { range: [31, 40], focus: '真相揭示', hookInterval: 1, revelationPoints: [36] },
            act4: { range: [41, 50], focus: '反思与出路', hookInterval: 1, climax: 50 }
        },
        elements: {
            topics: ['阶级固化', '教育焦虑', '职场霸凌', '网络暴力', '老龄化', '环境危机'],
            approach: ['无简单答案', '多视角呈现', '引发思考', '情感共鸣']
        },
        hookPatterns: [
            '事件曝光',
            '不同视角呈现',
            '反转认知',
            '道德困境选择',
            '系统性问题揭示',
            '开放式结局'
        ]
    }
};

// ===== 通用剧本结构模板 =====
const SCRIPT_TEMPLATES = {
    episodeStructure: {
        duration60: {
            words: 120,
            beats: [
                { time: '0-5s', type: 'hook', desc: '视觉钩子开场' },
                { time: '5-20s', type: 'setup', desc: '场景建立' },
                { time: '20-40s', type: 'conflict', desc: '冲突升级' },
                { time: '40-55s', type: 'climax', desc: '小高潮' },
                { time: '55-60s', type: 'cliffhanger', desc: '结尾钩子' }
            ]
        },
        duration90: {
            words: 180,
            beats: [
                { time: '0-5s', type: 'hook', desc: '强力钩子开场' },
                { time: '5-15s', type: 'setup', desc: '场景和人物' },
                { time: '15-35s', type: 'inciting', desc: '触发事件' },
                { time: '35-60s', type: 'rising', desc: '上升冲突' },
                { time: '60-80s', type: 'climax', desc: '本集高潮' },
                { time: '80-90s', type: 'cliffhanger', desc: '强烈钩子' }
            ]
        },
        duration120: {
            words: 240,
            beats: [
                { time: '0-5s', type: 'hook', desc: '视觉钩子开场' },
                { time: '5-20s', type: 'setup', desc: '场景人物建立' },
                { time: '20-40s', type: 'inciting', desc: '触发事件' },
                { time: '40-70s', type: 'rising', desc: '上升行动' },
                { time: '70-90s', type: 'twist', desc: '转折/揭示' },
                { time: '90-110s', type: 'climax', desc: '高潮对决' },
                { time: '110-120s', type: 'cliffhanger', desc: '强烈钩子结尾' }
            ]
        }
    },

    // 钩子类型库
    hookTypes: {
        visual: ['惊艳画面', '意外场景', '冲突瞬间', '悬念画面'],
        dialogue: ['惊人台词', '威胁话语', '秘密揭露', '情感爆发'],
        action: ['追逐开始', '打斗爆发', '意外事件', '危险降临'],
        mystery: ['谜题出现', '线索发现', '身份疑问', '异常情况']
    },

    // 每集必须有钩子结尾
    cliffhangerTypes: {
        danger: '主角面临生命危险',
        secret: '秘密即将被揭露',
        choice: '艰难抉择时刻',
        revelation: '重大真相揭示',
        arrival: '关键人物出现',
        discovery: '发现惊人事物',
        confession: '告白/表白时刻',
        betrayal: '背叛揭露',
        pursuit: '追逐开始',
        deadline: '倒计时开始'
    }
};

// ===== 子类型差异化配置 =====
const SUBTYPE_CONFIGS = {
    // ===== 女频 - 霸道总裁 =====
    'billionaire-ceo': {
        // 职业组合增加差异化
        careerCombos: [
            { heroine: '美食博主', hero: '餐饮集团CEO', setting: '女主为他做菜却被嫌弃' },
            { heroine: '实习律师', hero: '顶级律所合伙人', setting: '法律界的金童玉女' },
            { heroine: '设计师', hero: '时尚帝国掌门人', setting: '设计大赛上的针锋相对' },
            { heroine: '小护士', hero: '私立医院院长', setting: '深夜急诊室的相遇' },
            { heroine: '财经记者', hero: '神秘投资大亨', setting: '采访中发现他的秘密' },
            { heroine: '空姐', hero: '航空公司继承人', setting: '头等舱里的意外' },
            { heroine: '翻译', hero: '跨国企业总裁', setting: '商务谈判中的默契' },
            { heroine: '幼儿园老师', hero: '单亲爸爸', setting: '接送孩子时的邂逅' },
            { heroine: '古董修复师', hero: '收藏家', setting: '一件古物牵出的缘分' },
            { heroine: '游戏主播', hero: '电竞俱乐部老板', setting: '直播间的意外连线' }
        ],
        // 不同梗/套路
        tropes: [
            { name: '先婚后爱', setup: '为家族利益闪婚，约定一年后离婚，却在相处中爱上对方' },
            { name: '契约关系', setup: '签订契约假扮情侣，条件是不能动心，违者赔款千万' },
            { name: '失忆梗', setup: '男主车祸失忆，只记得女主是他的妻子，女主将错就错' },
            { name: '替身文学', setup: '女主长得像男主的白月光，被当作替身养在身边' },
            { name: '追妻火葬场', setup: '女主曾深爱男主却被伤害，华丽回归后男主疯狂追妻' },
            { name: '一夜荒唐', setup: '醉酒后的意外一夜，女主带球跑，几年后带着孩子回来' },
            { name: '契约情人', setup: '女主为救家族成为男主情人，期限三个月，却动了真情' },
            { name: '冤家路窄', setup: '从小订下娃娃亲，两人却互相看不顺眼，天天斗嘴' },
            { name: '身份互换', setup: '女主冒充姐姐嫁给男主，真相揭穿后男主选择了她' },
            { name: '契约婚姻', setup: '为得到遗产必须结婚，两人假结婚各取所需' }
        ],
        conflicts: [
            '男主的青梅竹马从中作梗',
            '女主家族破产被男主父母嫌弃',
            '误会女主为钱接近他',
            '商业对手绑架女主威胁',
            '前女友带着孩子回来争夺',
            '女主误会男主心里有别人',
            '家族联姻压力逼迫分手',
            '女主事业上升期与爱情的冲突'
        ]
    },

    // ===== 女频 - 黑手党 =====
    'mafia': {
        // 欧美Mafia Romance常见元素
        elements: {
            familyDynamics: ['敌对家族', '家族内斗', '家族遗产争夺', '父辈恩怨', '家族荣誉'],
            mafiaRoles: ['Don/家族首领', 'Capo/堂主', 'Soldier/士兵', 'Consigliere/顾问', 'Underboss/副手'],
            dangerElements: ['枪战', '暗杀', '背叛', '卧底', '交易', '洗钱', '火拼'],
            romanticTropes: ['被保护的 innocence', '黑暗世界的光', '危险吸引', '禁忌之恋', '生死相随'],
            settings: ['意大利庄园', '地下赌场', '私人俱乐部', '码头仓库', '高档餐厅', '家族墓地']
        },
        storyTemplates: [
            { setup: '女主是警察卧底，却爱上了要抓捕的黑帮老大', twist: '她发现他其实是为FBI工作的线人' },
            { setup: '女主被当作"礼物"送给黑帮少主，原以为自己死定了', twist: '他对她一见钟情，决定保护她' },
            { setup: '女主继承了父亲的债务，被迫成为黑帮老大的女人', twist: '她用自己的智慧帮他在黑道立足' },
            { setup: '敌对家族的火拼中，女主救了男主一命', twist: '两家族决定联姻平息争斗' },
            { setup: '女主是医生，被迫为黑帮治疗伤员', twist: '她看到了他温柔的一面，爱上这个"杀人犯"' },
            { setup: '男主是冷酷无情的黑帮首领，女主是他弟弟的未婚妻', twist: '弟弟死后，他按照家族规矩娶了她' },
            { setup: '女主误打误撞撞破了黑帮交易，被男主囚禁', twist: '囚禁变成了保护，她成了他唯一的软肋' },
            { setup: '女主是记者，调查黑帮时被男主抓住', twist: '他用她的安全换取她帮他洗白' },
            { setup: '两个敌对家族的继承人从小订亲，长大后相见', twist: '父辈恩怨与真心相爱的冲突' },
            { setup: '女主为替父报仇接近男主，却发现自己爱上了仇人', twist: '真相揭开，她误会了他，真正仇人另有其人' }
        ]
    },

    // ===== 女频 - 美式青春校园 =====
    'american-campus': {
        // Gen Z 2024 美式高中细分群体
        socialCliques: {
            popular: [
                { type: '运动健将 Jocks', desc: '橄榄球队员，网红运动员（NIL），身体强壮但不一定头脑简单' },
                { type: '啦啦队长 Cheerleaders', desc: '社交媒体达人，维护完美人设的压力' },
                { type: '富二代 Preps', desc: '老钱家族后代，穿设计师品牌， legacy admission学生' },
                { type: '网红 E-Girls', desc: 'TikTok网红，彩色头发，亚文化审美，游戏直播主' },
                { type: '大V Influencers', desc: 'Instagram/TikTok粉丝过万，校园名人，接品牌合作' }
            ],
            outsiders: [
                { type: '学霸 Nerds', desc: 'AP课程学霸，竞赛选手，斯坦福哈佛预备生' },
                { type: '艺术生 Artists', desc: '戏剧社、美术生、独立音乐人， creative souls' },
                { type: '玩家 Gamers', desc: '电竞选手，Twitch主播，从边缘群体变主流' },
                { type: '暗黑系 Goth/Alt', desc: '暗黑审美，听摇滚/金属，反主流文化' },
                { type: 'LGBTQ+群体', desc: '出柜或探索中的身份，GSA社团成员' }
            ],
            troublemakers: [
                { type: '坏男孩 Bad Boys', desc: '皮衣摩托车，创伤过去，"我能改变他"综合征' },
                { type: '独行侠 Loners', desc: '神秘转学学生，刻意保持距离，有隐藏秘密' },
                { type: '叛逆者 Rebels', desc: '挑战权威，反体制，可能是天才也可能是麻烦制造者' }
            ]
        },
        // 海外网文流行梗
        popularTropes: [
            {
                name: '赌约游戏',
                setup: '人气男生和"输家"女生约会作为赌约/挑战，却真的爱上她',
                twist: '她发现真相后心碎，他必须真诚挽回',
                emotionalCore: '从虚假到真实的情感转变'
            },
            {
                name: '假戏真做',
                setup: '为让前任嫉妒 / 提高社交地位 / 家庭压力而假约会',
                twist: '假戏真做，其中一方先动心',
                emotionalCore: '契约关系中的真情实感'
            },
            {
                name: '从敌人到恋人',
                setup: '学术竞争对手 / 不同小团体的领袖 / 被迫合作项目',
                twist: '发现对方的脆弱面，敌对变成吸引',
                emotionalCore: '打破偏见看到真实的人'
            },
            {
                name: '坏男孩与乖乖女',
                setup: '乖乖女被坏男孩吸引，他是皮衣摩托车的神秘独行侠',
                twist: '他的"坏"是保护色，内心温柔有创伤',
                emotionalCore: '拯救与被拯救的共生关系'
            },
            {
                name: '哥哥的好友',
                setup: '暗恋哥哥的好友多年，他一直把她当妹妹',
                twist: '他也一直喜欢她但碍于兄弟情面',
                emotionalCore: '禁忌之恋与长期压抑的欲望'
            },
            {
                name: '地下恋情',
                setup: '跨小团体恋爱必须保密，人气地位赌注太高',
                twist: '被发现后面临选边站的抉择',
                emotionalCore: '爱情 vs 社交地位'
            },
            {
                name: '第二次机会',
                setup: '童年好友 / 初中恋人，因误会分开，高中重逢',
                twist: '当年的误会是第三方设计的',
                emotionalCore: '原谅与重新信任'
            },
            {
                name: '相反相吸',
                setup: '运动健将×学霸 / 啦啦队长×艺术生 / 富二代×贫困奖学金生',
                twist: '发现彼此互补，共同对抗外界偏见',
                emotionalCore: '差异中的化学反应'
            },
            {
                name: '丑小鸭变天鹅',
                setup: '女主被改造从小透明到人气王，男主爱上真实的她',
                twist: '她发现被喜欢是因为改变，质疑真实性',
                emotionalCore: '被爱的是真实还是表象？'
            },
            {
                name: '青梅竹马变恋人',
                setup: '从小一起长大，一直只是朋友，一方突然觉醒感情',
                twist: '怕破坏友谊不敢表白，眼看对方约会别人',
                emotionalCore: '跨越友谊界限的恐惧'
            }
        ],
        // 美式校园特有场景
        settings: [
            {
                location: '返校节舞会 Homecoming',
                drama: '邀约焦虑，没有舞伴的羞耻，舞会后派对',
                stakes: '社交地位的公开审判'
            },
            {
                location: '周五橄榄球夜',
                drama: '运动员的压力，啦啦队表演失误，观众席上的抓马',
                stakes: '全镇关注下的失败羞辱'
            },
            {
                location: '家庭派对',
                drama: '真心话大冒险，酒后 confession，约炮文化',
                stakes: '破处压力，同意边界，视频被拍风险'
            },
            {
                location: '春假旅行',
                drama: '海边度假，房间分配，旧情复燃，背叛',
                stakes: '无父母监督下的放纵后果'
            },
            {
                location: '毕业舞会 Prom',
                drama: '创意邀约，礼服竞争，派对后活动，豪车里的秘密',
                stakes: '高中生涯最高光/最羞辱时刻'
            },
            {
                location: '储物柜/走廊',
                drama: '纸条传递，偷听对话，当众被拒',
                stakes: '全校面前的羞辱'
            },
            {
                location: '社交媒体',
                drama: '爆红视频，私信泄露，抵制文化，粉丝数焦虑',
                stakes: '数字化的永久羞辱'
            }
        ],
        // 冲突类型细分
        conflicts: [
            '复仇式色情/裸照泄露后的荡妇羞辱',
            '学术作弊丑闻影响大学申请',
            '谣言工厂摧毁名誉（虚假谣言）',
            '有毒朋友圈的情感操控',
            '同辈压力进行危险挑战（TikTok挑战）',
            '约会好友的前任引发的背叛感',
            '出柜后的家庭/学校反应',
            '奖学金依赖GPA的压力与爱情冲突',
            'NIL网红运动员的公众形象管理',
            '第一次的情感准备焦虑'
        ],
        // 故事模板 - 基于真实海外热门小说套路
        storyTemplates: [
            {
                setup: '女主是奖学金学生进入贵族预科学校，被人气女王针对',
                trope: '弱势逆袭',
                development: '她用智慧而非美貌反击，赢得运动队长注意',
                twist: '人气女王其实是嫉妒她的真实做自己'
            },
            {
                setup: '女主和坏男孩签订假约会契约提高她的社交地位',
                trope: '假戏真做',
                development: '他教她派对规则，她教他微积分',
                twist: '契约到期时他公开表白，毁了酷男孩形象'
            },
            {
                setup: '女主是处子之身，在真心话大冒险中被迫承认，被荡妇羞辱',
                trope: '夺回主动权',
                development: '她发起全校性积极运动',
                twist: '发现羞辱她的人其实也在性取向困惑中挣扎'
            },
            {
                setup: '女主的裸照被前任泄露，她成为全校弃儿',
                trope: '复仇与救赎',
                development: '独行侠坏男孩成为唯一对她友善的人',
                twist: '他帮助她寻求法律复仇，同时爱上她的坚强'
            },
            {
                setup: '人气四分卫和女主家教约定提高GPA',
                trope: '相反相吸',
                development: '他发现她是唯一不因为他是明星而喜欢他的人',
                twist: '他的队友威胁如果他不甩了书呆子就踢他出队'
            },
            {
                setup: '女主醒来发现昨晚派对后和神秘男生同床，但不记得',
                trope: '神秘与记忆',
                development: '她调查发生了什么，捍卫她的名誉',
                twist: '其实什么都没发生，他是保护她免受侵犯的人'
            },
            {
                setup: '转学生女主快速爬上社交阶梯，成为人气女王威胁',
                trope: '女孩战争',
                development: '她用社交媒体智慧建立帝国',
                twist: '她发现原人气女王也有脆弱不安全感'
            },
            {
                setup: '女主发现男友出轨，和他的好友反弹式勾搭',
                trope: '反弹式恋情',
                development: '好友其实暗恋她多年',
                twist: '前男友后悔想要复合，她面临选择'
            },
            {
                setup: '女主和男主是敌人，被迫一起完成毕业项目',
                trope: '被迫接近',
                development: '每天放学后单独工作，敌意变成打趣',
                twist: '项目展示当天发生告白'
            },
            {
                setup: '女主是TikTok网红少女，暗恋富二代运动队长',
                trope: '跨越小团体',
                development: '他在网上发现她的另一面并爱上那个她',
                twist: '他不知道网上的女孩就是学校里不起眼的她'
            },
            {
                setup: '女主的 gay 好友突然表白说其实是双性恋并喜欢她',
                trope: '意外之爱',
                development: '她重新审视这段友谊，困惑与吸引并存',
                twist: '她意识到她也爱他，只是之前标签化了这段关系'
            },
            {
                setup: '女主是玩家女孩，在电竞比赛中击败顶尖男选手',
                trope: '打破刻板印象',
                development: '他不服输挑战复赛，直播他们的对决',
                twist: '对决变成调情，粉丝们起哄他们在一起'
            }
        ]
    },

    // ===== 女频 - 狼人 =====
    'werewolf': {
        // 详细的 Pack 等级制度（基于海外狼人网文常见设定）
        packHierarchy: {
            alpha: {
                title: 'Alpha 阿尔法',
                role: 'Pack首领，绝对权威，保护族群成员',
                traits: ['强大', '保护欲', '领导能力', '可能有的占有欲'],
                mateTitle: 'Luna 露娜/Alpha Female',
                responsibilities: ['做决策', '保护领土', '维持族群秩序', '代表族群对外']
            },
            beta: {
                title: 'Beta 贝塔',
                role: '副指挥官，Alpha的右手',
                traits: ['忠诚', '执行力强', '战术能力'],
                responsibilities: ['Alpha缺席时领导', '执行纪律', '训练战士', '情报收集']
            },
            gamma: {
                title: 'Gamma 伽马',
                role: '第三把手，首席训练师/执行者',
                traits: ['战斗力强', '严格的训练者'],
                responsibilities: ['训练新狼', '战斗准备', '保护Alpha/Luna', '执行惩罚']
            },
            delta: {
                title: 'Delta 德尔塔',
                role: '医者/医师，第四把手',
                traits: ['治愈能力', '智慧', '耐心'],
                responsibilities: ['医疗救治', '草药知识', '心理健康', '照顾幼崽']
            },
            epsilon: {
                title: 'Epsilon 艾普西隆',
                role: '战士/哨兵，精英战士',
                traits: ['战斗技能', '警觉性高'],
                responsibilities: ['边境巡逻', '保护领地', '战斗前锋']
            },
            zeta: {
                title: 'Zeta 泽塔',
                role: '策略师/情报官，军事策略师',
                traits: ['高智商', '战略思维'],
                responsibilities: ['战术规划', '敌情分析', '族群防御策略']
            },
            omega: {
                title: 'Omega 欧米茄',
                role: '族群中的最底层，但也可以是和平使者',
                traits: ['可能受欺负', '但也可能是和平制造者'],
                responsibilities: ['缓解族群紧张', '照顾幼崽', '简单劳动']
            },
            rogue: {
                title: 'Rogue 流浪者',
                role: '无族群的流浪狼，被标记为危险',
                traits: ['孤独', '危险', '自由', '可能寻求新的族群'],
                responsibilities: ['无，独行侠']
            },
            specialRoles: [
                { role: 'Enforcer 执行者', desc: '专门的惩罚执行者' },
                { role: 'Healer 医者', desc: '与Delta类似但更专注治疗' },
                { role: 'Elder 长者', desc: '智慧守护者，不参与战斗但提供建议' },
                { role: 'Scout 侦察兵', desc: '负责边境巡逻和情报' }
            ]
        },
        // Mate 相关概念 - 2024年流行设定
        mateTypes: [
            {
                type: '命运伴侣 Fated Mates',
                desc: '命运注定的伴侣，由月亮女神选择',
                features: ['瞬间识别', '不可抗拒的吸引', '心灵感应 bond'],
                conflict: '可能一方拒绝命运，或时机不对'
            },
            {
                type: '真命伴侣 True Mates',
                desc: '真正的灵魂伴侣，比命运伴侣更深层',
                features: ['完美契合', '共享情感', '生命 bond'],
                conflict: '可能发生在敌对族群之间'
            },
            {
                type: '被拒绝的伴侣 Rejected Mate',
                desc: '一方拒绝承认伴侣 bond',
                features: ['当众拒绝', '双方痛苦', '社交流放'],
                conflict: '拒绝者后悔，必须赢回信任'
            },
            {
                type: '第二次机会伴侣',
                desc: '失去第一个伴侣后找到的新的',
                features: ['寡妇/鳏夫', '内疚', '新爱治愈'],
                conflict: '对前任的忠诚 vs 新幸福'
            },
            {
                type: '人类伴侣',
                desc: '狼人与人类配对',
                features: ['无初始识别', '危险', '转变选项'],
                conflict: '族群不接受，或是否转变的选择'
            },
            {
                type: '结合伴侣 Bonded Pair',
                desc: '非命运注定但通过仪式结合的伴侣',
                features: ['选择的爱', '仪式标记', '自觉承诺'],
                conflict: '可能没有命运bond的强烈化学反应'
            }
        ],
        // 2024年流行狼人网文主题
        trendingThemes2024: [
            {
                theme: '创伤治愈',
                desc: 'Alpha有心理健康问题，女主帮助他治愈',
                popular: true,
                examples: ['野性狼人', '过往虐待', 'PTSD', '控制问题']
            },
            {
                theme: '逆后宫',
                desc: '一个女性与多个男性狼人 bonding',
                popular: true,
                setup: '可能是多个命运伴侣，或族群需要多伴侣结构'
            },
            {
                theme: '被拒伴侣的救赎',
                desc: '女主被当众拒绝后强势回归',
                popular: true,
                arc: ' makeover，新族群，Alpha后悔，卑微求原谅'
            },
            {
                theme: '露娜之力',
                desc: 'Alpha女性不是装饰品，而是真正的共同领袖',
                popular: true,
                elements: ['共同战斗', '战略决策', '族群bond强化']
            },
            {
                theme: '族群间政治',
                desc: '复杂的族群联盟，领土战争',
                popular: true,
                elements: ['政治联姻', '敌对家族', '领土争端']
            },
            {
                theme: '流浪者救赎',
                desc: '被误解的流浪者其实是英雄',
                popular: true,
                twist: '他被错误地指控，或从阴影中保护族群'
            }
        ],
        // 狼人世界设定细节
        worldbuilding: {
            rituals: [
                { name: '结合仪式', desc: '在满月下由长者主持的结合仪式' },
                { name: '标记 Marking', desc: '咬对方颈后留下永久标记，表示已配对' },
                { name: '族群接纳', desc: '新成员被族群接受的仪式' },
                { name: '首次变身', desc: '16-18岁时的第一次变身，危险且痛苦' }
            ],
            abilities: [
                { name: '强化感官', desc: '超强嗅觉、听觉、夜视' },
                { name: '快速愈合', desc: '快速愈合伤口' },
                { name: '心灵感应', desc: '族群成员之间的心灵链接，与伴侣最强' },
                { name: 'Alpha命令', desc: 'Alpha可以强制命令族群成员（有限制）' },
                { name: '部分变身', desc: '只变身部分身体（爪子、眼睛）' }
            ],
            weaknesses: [
                { name: '银器 Silver', desc: '银器伤害无法愈合' },
                { name: '狼毒草 Wolfsbane', desc: '毒草，可致命或削弱' },
                { name: '满月', desc: '新手难以控制变身，老手也会更受本能支配' },
                { name: '伴侣Bond痛苦', desc: '拒绝bond或伴侣死亡带来极端痛苦' }
            ],
            territories: [
                { type: '族群领土', desc: '明确标记的族群领地，其他狼需许可进入' },
                { type: '中立区', desc: '多个族群共享的公共区域，禁止战斗规则' },
                { type: '禁地', desc: '危险区域，可能有猎人或其他超自然生物' }
            ]
        },
        // 丰富的故事模板 - 基于海外热门狼人小说
        storyTemplates: [
            {
                setup: '女主18岁第一次变身，发现自己是稀有的白狼',
                trope: '特殊命运',
                development: '她是传说中能统一所有族群的露娜',
                twist: '多个族群的阿尔法都想占有她，她必须选择或逃离'
            },
            {
                setup: '女主被阿尔法男友当众拒绝，成为族群笑柄',
                trope: '被拒伴侣',
                development: '她离开族群，成为流浪者，发现真正的力量',
                twist: '他是被迫的为了保护她免受敌人伤害，现在必须卑微求原谅'
            },
            {
                setup: '女主是人类，在森林中救了受伤的狼',
                trope: '人类×狼人',
                development: '狼是阿尔法，他标记她触发了交配热',
                twist: '她其实有狼人血统，只是晚发育者'
            },
            {
                setup: '女主是阿尔法的女儿，被迫嫁给敌对族群的阿尔法以停止战争',
                trope: '安排交配',
                development: '他们互相憎恨，但必须假装恩爱夫妻',
                twist: '他们其实是童年好友，战争是基于误会'
            },
            {
                setup: '女主是孤独流浪者，闯入了强大族群的领地',
                trope: '孤独狼找到家',
                development: '阿尔法想要赶走她，但狼认出她是伴侣',
                twist: '她正在逃离虐待她的前任阿尔法，他想要她回去'
            },
            {
                setup: '女主能与所有动物交流的狼语者',
                trope: '稀有天赋',
                development: '族群利用她的能力狩猎，她质疑道德',
                twist: '她是古老预言中的和平使者'
            },
            {
                setup: '女主是阿尔法的女性战士，被认为是男性',
                trope: '性别伪装',
                development: '阿尔法发现她是女性且是他的伴侣，但她重视独立',
                twist: '她必须选择成为露娜或保持战士身份'
            },
            {
                setup: '女主是猎人家族，被训练杀死狼人',
                trope: '禁忌之爱',
                development: '她捕获受伤的阿尔法，却爱上他的荣誉',
                twist: '她发现自己其实是被收养的狼人'
            },
            {
                setup: '女主和三个兄弟都感受到伴侣bond（逆后宫）',
                trope: '多伴侣',
                development: '族群需要她与三个都bond以解除诅咒',
                twist: '她是古老女神转世'
            },
            {
                setup: '女主是医者，被迫治疗敌对族群的受伤阿尔法',
                trope: '敌人变恋人',
                development: '他在她的照顾下展现脆弱，她看到他盔甲下的真我',
                twist: '他们的族群被第三方操纵进入战争'
            },
            {
                setup: '女主是失去伴侣的寡妇，以为不会再爱',
                trope: '第二次机会',
                development: '新阿尔法温柔追求，她对向前看感到内疚',
                twist: '前任伴侣的死亡和这个新阿尔法有关（他救了她）'
            },
            {
                setup: '女主是欧米茄，被欺负，但阿尔法狼认识到她的价值',
                trope: '弱者赋权',
                development: '她发现欧米茄有独特的 calming 力量帮助族群',
                twist: '她的存在能阻止族群战争，多个族群想要她'
            }
        ]
    },

    // ===== 女频 - 重生复仇 =====
    'revenge-rebirth': {
        rebirthTypes: ['回到过去', '穿书', '平行世界', '时间循环'],
        revengeTargets: ['渣男前男友', '恶毒闺蜜', '偏心的家人', '陷害她的同事', '杀她的凶手'],
        storyTemplates: [
            { setup: '前世被闺蜜和男友联手害死，重生回到18岁', twist: '发现闺蜜也是重生的' },
            { setup: '女主穿成书中的恶毒女配，注定惨死', twist: '她改变剧情拿下男主' },
            { setup: '前世为爱放弃事业，最后一无所有', twist: '这一世专注事业成女王' },
            { setup: '前世眼瞎爱渣男，这一世发现真爱一直在身边', twist: '他也重生了' },
            { setup: '女主重生后拥有了金手指能力', twist: '能预知未来却改变了命运' },
            { setup: '前世被家族抛弃，这一世提前布局', twist: '让家族求她回去' },
            { setup: '女主重生后发现世界是一本小说', twist: '她要改写自己的结局' },
            { setup: '前世错过真爱，这一世主动追夫', twist: '他不敢相信她的转变' },
            { setup: '女主重生后决定放过仇人', twist: '仇人却自己作死' },
            { setup: '前世被交换人生，这一世夺回一切', twist: '发现真相后假千金崩溃' }
        ]
    },

    // ===== 男频 - 逆袭打脸 (Underdog Revenge) =====
    'underdog-revenge': {
        // 模式一：Small Guy to Big Shot (小人物到大佬)
        underdogCareers: [
            {
                former: 'Janitor',
                formerDesc: 'invisible to everyone, cleaning toilets and boardrooms',
                latter: 'Tech Empire Founder',
                latterDesc: 'master of cutting-edge AI, worth billions',
                trigger: 'accidentally discovers breakthrough algorithm'
            },
            {
                former: 'Construction Worker',
                formerDesc: 'braving sun and rain, exploited by foreman, living in unfinished buildings',
                latter: 'Martial Arts Grandmaster',
                latterDesc: 'awakened ancient warrior bloodline, unstoppable force',
                trigger: 'family heirloom activates, unlocking hidden power'
            },
            {
                former: 'Dishwasher',
                formerDesc: 'hands soaked and wrinkled, bullied by head chef, eating leftovers',
                latter: 'Michelin Star Chef',
                latterDesc: 'culinary genius, dishes auction for millions',
                trigger: 'discovers secret family recipe book'
            },
            {
                former: 'Delivery Driver',
                formerDesc: 'delivering in all weather, unfair fines, broken scooter',
                latter: 'Logistics King',
                latterDesc: 'global drone delivery network, dominating supply chain',
                trigger: 'revolutionary route optimization algorithm'
            },
            {
                former: 'Hospital Orderly',
                formerDesc: 'cleaning patient messes, looked down by doctors',
                latter: 'Medical Genius',
                latterDesc: 'miracle healer, world leaders seek his treatment',
                trigger: 'ancient medical manuscript falls into his hands'
            },
            {
                former: 'Gas Station Attendant',
                formerDesc: 'night shifts, bullied by thugs, living on instant noodles',
                latter: 'Esports Champion',
                latterDesc: 'world champion, team owner, gaming legend',
                trigger: 'discovers supernatural reflexes and tactical mind'
            },
            {
                former: 'Security Guard',
                formerDesc: 'freezing winters, insulted by luxury car owners',
                latter: 'Special Forces Legend',
                latterDesc: 'retired war hero recalled to train elite troops',
                trigger: 'comrade in danger, picks up the gun again'
            },
            {
                former: 'Fast Food Cook',
                formerDesc: 'grease burns, underpaid by franchise owner',
                latter: 'Culinary Empire Builder',
                latterDesc: 'street food to fine dining, revolutionary chef',
                trigger: 'discovers unique flavor profiling ability'
            }
        ],

        // 模式二：Fallen Hero Returns (落魄英雄回归)
        fallenHeroCareers: [
            {
                former: 'Navy SEAL Commander',
                formerDesc: 'honorably discharged after injury, became homeless',
                latter: 'Legendary Operator',
                latterDesc: 'most decorated soldier, trainer of elites',
                trigger: 'fellow soldier murdered, returns for vengeance',
                faceSlap: 'those who mocked his fall from grace'
            },
            {
                former: 'Tech Prodigy',
                formerDesc: 'startup destroyed by betrayal, delivering food to survive',
                latter: 'Silicon Valley Emperor',
                latterDesc: 'revolutionary tech, global influence',
                trigger: 'discovers stolen IP, anonymous backer emerges',
                faceSlap: 'former partners who kicked him when down'
            },
            {
                former: 'Underground Fighter',
                formerDesc: 'threw fights to save family, working as bouncer',
                latter: 'MMA World Champion',
                latterDesc: 'undefeated legend, gym empire owner',
                trigger: 'sister needs surgery, returns to the cage',
                faceSlap: 'promoter who forced him to lose'
            },
            {
                former: 'Elite Hacker',
                formerDesc: 'caught by FBI, served time, now IT support',
                latter: 'Cybersecurity God',
                latterDesc: 'protects nations, hunts cyber criminals',
                trigger: 'global ransomware attack, only he can stop it',
                faceSlap: 'the agent who arrested him'
            },
            {
                former: 'Poker Champion',
                formerDesc: 'framed for cheating, banned from casinos, bartending',
                latter: 'High Roller King',
                latterDesc: 'owns casinos, mentors champions',
                trigger: 'underground tournament, chance to clear name',
                faceSlap: 'the rival who framed him'
            },
            {
                former: 'Street Racing Legend',
                formerDesc: 'accident retired him, now taxi driver',
                latter: 'Professional Racing Champion',
                latterDesc: 'Formula 1 champion, team owner',
                trigger: 'son wants to race, rekindles the fire',
                faceSlap: 'young racers who mocked his "taxi" job'
            },
            {
                former: 'Investment Banker',
                formerDesc: 'market crash ruined him, cleaning offices',
                latter: 'Wall Street Wolf',
                latterDesc: 'hedge fund legend, market maker',
                trigger: 'discovers market manipulation, vows revenge',
                faceSlap: 'former colleagues who abandoned him'
            },
            {
                former: 'Music Producer',
                formerDesc: 'contract stole his work, playing in subway',
                latter: 'Music Industry Mogul',
                latterDesc: 'owns labels, Grammy winner',
                trigger: 'viral video of subway performance',
                faceSlap: 'the record exec who stole his music'
            }
        ],

        // Face Slap Targets (打脸目标)
        faceSlapTargets: ['rich bully', 'snobbish ex', 'arrogant boss', 'gold-digger', 'corrupt manager', 'fake friends', 'rival company', 'industry gatekeepers'],

        // External Hook Templates
        externalHookTemplates: [
            'When will the protagonist reveal his true power at the {occasion}, shocking the {target}?',
            'When will his {ability} be discovered by everyone, leaving them in awe?',
            'When will he expose the {target}\'s conspiracy and make them pay?',
            'When will he transform from {former} to {latter}?',
            'When will he stun everyone at the {event}?'
        ]
    },

    // ===== Male Power Fantasy - Secret Identity (隐藏身份) =====
    'secret-identity': {
        // Fake Identity vs Real Identity
        identityPairs: [
            {
                fake: "CEO's Personal Security Guard",
                fakeDesc: 'looked down as mere muscle, standing in the background',
                real: 'Elite Special Forces Commander',
                realDesc: 'decorated war hero, trainer of black ops units',
                secret: 'undercover protecting the CEO from corporate enemies'
            },
            {
                fake: 'Struggling Artist',
                fakeDesc: 'selling paintings on the street, mocked by gallery owners',
                real: 'Art Forgery Detective',
                realDesc: 'undercover investigating international art thieves',
                secret: 'hunting the criminals who ruined his family'
            },
            {
                fake: 'Coffee Shop Barista',
                fakeDesc: 'rude customers, low wages, invisible to society',
                real: 'Venture Capital Genius',
                realDesc: 'Silicon Valley prodigy, startup kingmaker',
                secret: 'scouting next big tech unicorn in disguise'
            },
            {
                fake: 'Hospital Intern',
                fakeDesc: 'bullied by residents, doing menial tasks',
                real: 'Renowned Neurosurgeon',
                realDesc: 'pioneer in medical breakthroughs, sought by royalty',
                secret: 'hiding from malpractice lawsuit conspiracy'
            },
            {
                fake: 'Construction Laborer',
                fakeDesc: 'exploited by foreman, living in temporary housing',
                real: 'Underground Fight Club Champion',
                realDesc: 'undefeated legend, pulling strings in shadows',
                secret: 'protecting sister from criminal organization'
            },
            {
                fake: 'Retail Store Clerk',
                fakeDesc: 'demanding customers, minimum wage, no respect',
                real: 'Fashion Empire Heir',
                realDesc: 'owns luxury brands, trendsetter for celebrities',
                secret: 'family test: prove yourself without money'
            },
            {
                fake: 'Office IT Guy',
                fakeDesc: 'invisible tech support, mocked by executives',
                real: 'White Hat Hacker Legend',
                realDesc: 'cybersecurity god, hunted by intelligence agencies',
                secret: 'uncovering corporate espionage plot'
            },
            {
                fake: 'Rideshare Driver',
                fakeDesc: 'bad ratings, unfair fees, long hours',
                real: 'Retired NASCAR Champion',
                realDesc: 'racing legend, hall of fame inductee',
                secret: 'protecting witness from mob hitmen'
            }
        ],

        externalHookTemplates: [
            'When will his {real identity} be discovered by the {key person}?',
            'When will he reveal his {real ability} at the {crisis moment}, shocking everyone?',
            'When will his {fake identity} be exposed, revealing his {real identity}?',
            'When will those who looked down on him discover the truth?',
            'When will he use his {real identity} power to solve the {major crisis}?'
        ]
    },

    // ===== Male Power Fantasy - Apocalypse King (末世为王) =====
    'apocalypse-king': {
        // Pre-Apocalypse Roles
        preApocalypseRoles: [
            { role: 'Warehouse Clerk', desc: 'organizing supplies, bullied by coworkers' },
            { role: 'Software Developer', desc: 'overworked, physically weak, socially awkward' },
            { role: 'Grocery Cashier', desc: 'minimum wage, dealing with rude customers' },
            { role: 'Construction Worker', desc: 'physical labor, supporting family' },
            { role: 'Disabled Veteran', desc: 'honorably discharged, struggling to adapt' },
            { role: 'College Student', desc: 'average student, no special skills' },
            { role: 'Food Delivery Driver', desc: 'working in all weather, barely making ends meet' },
            { role: 'Mechanic', desc: 'greasy hands, underpaid, underestimated' }
        ],

        // Awakened Powers
        apocalypsePowers: [
            {
                power: 'Infinite Storage',
                desc: 'dimensional pocket space for hoarding supplies',
                advantage: 'dominates resource-scarce wasteland'
            },
            {
                power: 'Superhuman Physique',
                desc: 'enhanced strength, speed, and durability',
                advantage: 'unstoppable in close combat, zombie destroyer'
            },
            {
                power: 'Elemental Control',
                desc: 'mastery over fire, ice, and lightning',
                advantage: 'devastating area attacks, creates safe zones'
            },
            {
                power: 'Mental Dominance',
                desc: 'mind control and telepathy',
                advantage: 'commands zombie hordes, builds armies'
            },
            {
                power: 'Apocalypse System',
                desc: 'level-up system with quest rewards',
                advantage: 'rapid growth, abundant resources'
            },
            {
                power: 'Cybernetic Enhancement',
                desc: 'mechanical body modifications',
                advantage: 'immune to infection, heavy firepower'
            },
            {
                power: 'Beast Taming',
                desc: 'summons and controls mutated creatures',
                advantage: 'overwhelming numbers, establishes territory'
            },
            {
                power: 'Purification Healing',
                desc: 'cures injuries and purifies virus',
                advantage: 'rare and coveted, factions compete for alliance'
            }
        ],

        // Apocalypse Challenges
        apocalypseChallenges: [
            'zombie horde besieging the safe zone',
            'mutated beast pack attack',
            'betrayal by trusted allies',
            'critical resource depletion',
            'virus evolution rendering powers useless',
            'extreme weather catastrophe',
            'underground criminal syndicate invasion',
            'military force attempting forced conscription'
        ],

        externalHookTemplates: [
            'When will his {power} be revealed during {crisis}, saving everyone?',
            'When will he establish his wasteland empire and become the dominant power?',
            'When will those who abandoned him come begging for shelter?',
            'When will he discover the virus origin and create the cure?',
            'When will he unite all wasteland factions and establish new order?'
        ]
    }
};

// ===== 创意生成器 =====
const IDEA_GENERATOR = {
    generateIdeas(typeId, count = 10) {
        const typeInfo = DRAMA_TYPES[typeId];
        if (!typeInfo) return [];

        const ideas = [];
        const subtypeConfig = SUBTYPE_CONFIGS[typeId];

        // 男频类型：生成5个创意，只包含外部事件期待
        const isMaleCategory = typeInfo.category === 'male';
        const actualCount = isMaleCategory ? 5 : count;

        for (let i = 0; i < actualCount; i++) {
            const idea = this.buildIdeaBySubtype(typeInfo, subtypeConfig, i, isMaleCategory);
            ideas.push(idea);
        }

        return ideas;
    },

    buildIdeaBySubtype(typeInfo, config, index, isMaleCategory = false) {
        // 如果有子类型配置，使用差异化生成
        if (config) {
            return this.generateSubtypeIdea(typeInfo, config, index, isMaleCategory);
        }
        // 否则使用默认生成
        return this.generateGenericIdea(typeInfo, index, isMaleCategory);
    },

    // 职业名称翻译（英文→中文）
    translateCareer(careerEn) {
        const careerMap = {
            // Underdog careers
            'Janitor': '保洁员',
            'Construction Worker': '建筑工人',
            'Dishwasher': '洗碗工',
            'Delivery Driver': '外卖员',
            'Hospital Orderly': '医院护工',
            'Gas Station Attendant': '加油站员工',
            'Security Guard': '保安',
            'Fast Food Cook': '快餐厨师',

            // Fallen hero careers
            'Navy SEAL Commander': '海豹突击队指挥官',
            'Tech Prodigy': '科技天才',
            'Underground Fighter': '地下格斗手',
            'Elite Hacker': '顶级黑客',
            'Poker Champion': '扑克冠军',
            'Street Racing Legend': '街头赛车传奇',
            'Investment Banker': '投资银行家',
            'Music Producer': '音乐制作人',

            // Latter careers
            'Tech Empire Founder': '科技帝国创始人',
            'Martial Arts Grandmaster': '武术宗师',
            'Michelin Star Chef': '米其林星级大厨',
            'Logistics King': '物流之王',
            'Medical Genius': '医学天才',
            'Esports Champion': '电竞冠军',
            'Special Forces Legend': '特种部队传奇',
            'Culinary Empire Builder': '餐饮帝国缔造者',
            'Legendary Operator': '传奇特种兵',
            'Silicon Valley Emperor': '硅谷帝王',
            'MMA World Champion': 'MMA世界冠军',
            'Cybersecurity God': '网络安全之神',
            'High Roller King': '赌场至尊',
            'Professional Racing Champion': '职业赛车冠军',
            'Wall Street Wolf': '华尔街之狼',
            'Music Industry Mogul': '音乐产业大亨'
        };
        return careerMap[careerEn] || careerEn;
    },

    // 打脸目标翻译
    translateTarget(targetEn) {
        const targetMap = {
            'rich bully': '富二代恶霸',
            'snobbish ex': '势利眼前女友',
            'arrogant boss': '傲慢老板',
            'gold-digger': '拜金女',
            'corrupt manager': '腐败经理',
            'fake friends': '假朋友',
            'rival company': '竞争对手公司',
            'industry gatekeepers': '行业守门人'
        };
        return targetMap[targetEn] || targetEn;
    },

    // 描述翻译（简化版）
    translateDesc(descEn) {
        // 这里可以添加更复杂的翻译逻辑
        // 暂时返回简化版本
        const descMap = {
            // Former descriptions (Underdog)
            'invisible to everyone, cleaning toilets and boardrooms': '默默无名，打扫厕所和董事会会议室',
            'braving sun and rain, exploited by foreman, living in unfinished buildings': '日晒雨淋，被工头剥削，住在未完工的建筑里',
            'hands soaked and wrinkled, bullied by head chef, eating leftovers': '双手泡得皱巴巴，被主厨欺负，吃着剩菜剩饭',
            'delivering in all weather, unfair fines, broken scooter': '风雨无阻地送餐，被罚款，电动车也坏了',
            'cleaning patient messes, looked down by doctors': '清理病人的污秽，被医生看不起',
            'night shifts, bullied by thugs, living on instant noodles': '上夜班，被流氓欺负，靠方便面度日',
            'freezing winters, insulted by luxury car owners': '寒冬腊月，被豪车车主侮辱',
            'grease burns, underpaid by franchise owner': '被油烫伤，被加盟商压榨工资',

            // Fallen hero descriptions
            'honorably discharged after injury, became homeless': '因伤光荣退伍，变得无家可归',
            'startup destroyed by betrayal, delivering food to survive': '创业公司被背叛摧毁，靠送外卖维生',
            'threw fights to save family, working as bouncer': '为了家人打假拳，现在做保镖维生',
            'caught by FBI, served time, now IT support': '被FBI抓获，服过刑，现在做IT支持',
            'framed for cheating, banned from casinos, bartending': '被陷害作弊，禁止进入赌场，现在做酒保',
            'accident retired him, now taxi driver': '事故让他退役，现在开出租车',
            'market crash ruined him, cleaning offices': '市场崩盘毁了他，现在打扫办公室',
            'contract stole his work, playing in subway': '合同偷走了他的作品，在地铁演奏',

            // Latter descriptions
            'master of cutting-edge AI, worth billions': '掌控最前沿AI技术，身价数十亿',
            'awakened ancient warrior bloodline, unstoppable force': '觉醒古老战士血脉，势不可挡',
            'culinary genius, dishes auction for millions': '烹饪天才，菜品拍卖上百万',
            'global drone delivery network, dominating supply chain': '全球无人机配送网络，主导供应链',
            'miracle healer, world leaders seek his treatment': '神医圣手，各国元首求他治病',
            'world champion, team owner, gaming legend': '世界冠军，战队老板，电竞传奇',
            'retired war hero recalled to train elite troops': '退役战斗英雄被召回训练精英部队',
            'street food to fine dining, revolutionary chef': '从街头小吃到高级餐厅，革命性厨师',
            'most decorated soldier, trainer of elites': '勋章最多的士兵，精英训练师',
            'revolutionary tech, global influence': '革命性技术，全球影响力',
            'undefeated legend, gym empire owner': '不败传奇，健身房帝国老板',
            'protects nations, hunts cyber criminals': '保护国家，追捕网络罪犯',
            'owns casinos, mentors champions': '拥有赌场，指导冠军',
            'Formula 1 champion, team owner': 'F1冠军，车队老板',
            'hedge fund legend, market maker': '对冲基金传奇，市场做市商',
            'owns labels, Grammy winner': '拥有唱片公司，格莱美获奖者',

            // Identity descriptions
            'looked down as mere muscle, standing in the background': '被看不起只是肌肉男，站在背景里',
            'selling paintings on the street, mocked by gallery owners': '在街头卖画，被画廊老板嘲笑',
            'rude customers, low wages, invisible to society': '粗鲁的顾客，低工资，被社会忽视',
            'bullied by residents, doing menial tasks': '被住院医生欺负，做杂务',
            'heavy lifting, dangerous conditions, no safety gear': '重物搬运，危险环境，没有安全装备',
            'disrespected by students, low pay, no benefits': '被学生不尊重，低工资，没有福利',
            'working night shift, tired passengers, traffic jams': '上夜班，疲惫的乘客，交通堵塞',
            'shushed by patrons, low status, boring routine': '被顾客嘘声，地位低，工作枯燥',
            'mopping floors, ignored by students, minimum wage': '拖地，被学生忽视，最低工资',
            'serving customers, grease burns, no respect': '服务顾客，油烫伤，不被尊重',
            'exploited by foreman, living in temporary housing': '被工头剥削，住在临时住所',
            'demanding customers, minimum wage, no respect': '挑剔的顾客，最低工资，不被尊重',
            'invisible tech support, mocked by executives': '隐形技术支持，被高管嘲笑',
            'bad ratings, unfair fees, long hours': '差评，不公平的费用，长时间工作',

            // Real identity descriptions
            'decorated war hero, trainer of black ops units': '勋章战争英雄，黑 ops 部队训练师',
            'undercover investigating international art thieves': '卧底调查国际艺术品大盗',
            'Silicon Valley prodigy, startup kingmaker': '硅谷天才，创业公司幕后推手',
            'pioneer in medical breakthroughs, sought by royalty': '医学突破先驱，皇室成员求治',
            'hunting corrupt officials in major corporation': '调查大公司腐败官员',
            'on a mission to prevent terrorist attack': '执行阻止恐怖袭击的任务',
            'created revolutionary AI in hiding': '隐藏中创造了革命性AI',
            'fought in underground circuit to support family': '为养家参加地下格斗 circuit',
            'investigating military conspiracy from the inside': '从内部调查军事阴谋',
            'hunting the cyber criminals who stole his identity': '追捕窃取他身份的网络罪犯',
            'undefeated legend, pulling strings in shadows': '不败传奇，在暗中操控一切',
            'owns luxury brands, trendsetter for celebrities': '拥有奢侈品牌，名人时尚引领者',
            'cybersecurity god, hunted by intelligence agencies': '网络安全之神，被情报机构追捕',
            'racing legend, hall of fame inductee': '赛车传奇，名人堂成员',

            // Secret descriptions
            'undercover protecting the CEO from corporate enemies': '卧底保护CEO免受企业敌人伤害',
            'hunting the criminals who ruined his family': '追捕毁了他家族的罪犯',
            'scouting next big tech unicorn in disguise': '伪装侦察下一个科技独角兽',
            'hiding from malpractice lawsuit conspiracy': '躲避医疗事故诉讼阴谋',
            'protecting sister from criminal organization': '保护妹妹免受犯罪组织伤害',
            'family test: prove yourself without money': '家族考验：在没有钱的情况下证明自己',
            'uncovering corporate espionage plot': '揭露企业间谍阴谋',
            'protecting witness from mob hitmen': '保护证人免受黑手党杀手伤害',

            // Apocalypse role descriptions
            'working 9-to-5, unappreciated by boss': '朝九晚五工作，不被老板赏识',
            'struggling with grades, unknown to classmates': '挣扎于成绩，同学都不认识他',
            'just obeying orders, waiting for retirement': '只是服从命令，等待退休',
            'research ignored, underfunded lab': '研究被忽视，实验室资金不足',
            'overworked, underpaid, saving lives': '过度劳累，工资过低，拯救生命',
            'maintaining infrastructure, invisible to society': '维护基础设施，被社会忽视',
            'organizing supplies, bullied by coworkers': '整理物资，被同事欺负',
            'overworked, physically weak, socially awkward': '过度劳累，身体虚弱，社交 awkward',
            'minimum wage, dealing with rude customers': '最低工资，应对粗鲁顾客',
            'physical labor, supporting family': '体力劳动，养家糊口',
            'honorably discharged, struggling to adapt': '光荣退伍，努力适应平民生活',
            'average student, no special skills': '普通学生，没有特殊技能',
            'working in all weather, barely making ends meet': '风雨无阻地工作，勉强维持生计',
            'greasy hands, underpaid, underestimated': '满手油污，工资低，被人低估',

            // Power descriptions
            'awakened a mysterious system that provides everything needed to survive': '觉醒了一个神秘系统，提供生存所需的一切',
            'discovered a personal dimension for storing infinite supplies': '发现了一个个人维度，可储存无限物资',
            'body evolved beyond human limits': '身体进化超越人类极限',
            'can build advanced weapons from scrap': '能用废铁制造先进武器',
            'inherited ancient martial arts techniques': '继承了古老武术技艺',
            'immune to zombie virus, can heal others': '对丧尸病毒免疫，能治愈他人',
            'dimensional pocket space for hoarding supplies': '维度口袋空间，可囤积物资',
            'enhanced strength, speed, and durability': '增强的力量、速度和耐久性',
            'mastery over fire, ice, and lightning': '掌握火、冰和闪电',
            'mind control and telepathy': '精神控制和心灵感应',
            'level-up system with quest rewards': '带任务奖励的升级系统',
            'mechanical body modifications': '机械身体改造',
            'summons and controls mutated creatures': '召唤和控制变异生物',
            'cures injuries and purifies virus': '治愈伤势并净化病毒',

            // Power advantages
            'unlimited supplies, currency in the wasteland': '无限物资，废土中的货币',
            'superhuman strength, speed, and regeneration': '超人的力量、速度和再生能力',
            'weapons ahead of their time, dominating force': '超越时代的武器，主导力量',
            'can cure the infected, highly sought after': '能治愈感染者，备受追捧',
            'dominates resource-scarce wasteland': '主导资源稀缺的废土',
            'unstoppable in close combat, zombie destroyer': '近战无敌，丧尸杀手',
            'devastating area attacks, creates safe zones': '毁灭性范围攻击，创造安全区',
            'commands zombie hordes, builds armies': '指挥丧尸群，建立军队',
            'rapid growth, abundant resources': '快速成长，资源丰富',
            'immune to infection, heavy firepower': '免疫感染，强大火力',
            'overwhelming numbers, establishes territory': '压倒性数量，建立领地',
            'rare and coveted, factions compete for alliance': '稀有且令人垂涎，各派系争相结盟'
        };
        return descMap[descEn] || descEn;
    },

    // 身份翻译
    translateIdentity(identityEn) {
        const identityMap = {
            // Fake identities
            "CEO's Personal Security Guard": 'CEO私人保镖',
            'Struggling Artist': '落魄艺术家',
            'Coffee Shop Barista': '咖啡店咖啡师',
            'Hospital Intern': '医院实习医生',
            'Construction Laborer': '建筑工人',
            'Substitute Teacher': '代课老师',
            'Taxi Driver': '出租车司机',
            'Librarian': '图书管理员',
            'Janitor': '保洁员',
            'Fast Food Server': '快餐服务员',
            'Retail Store Clerk': '零售店店员',
            'Office IT Guy': '办公室IT男',
            'Rideshare Driver': '网约车司机',

            // Real identities
            'Elite Special Forces Commander': '精英特种部队指挥官',
            'Art Forgery Detective': '艺术品伪造侦探',
            'Venture Capital Genius': '风险投资天才',
            'Renowned Neurosurgeon': '著名神经外科医生',
            'Undercover Anti-Corruption Investigator': '卧底反腐调查员',
            'International Spy': '国际间谍',
            'Famous Tech Innovator': '著名科技创新者',
            'Underground Fight Club Champion': '地下格斗俱乐部冠军',
            'Military Intelligence Colonel': '军事情报上校',
            'World-Class Hacker': '世界级黑客',
            'Fashion Empire Heir': '时尚帝国继承人',
            'White Hat Hacker Legend': '白帽黑客传奇',
            'Retired NASCAR Champion': '退役纳斯卡冠军'
        };
        return identityMap[identityEn] || identityEn;
    },

    // 末世角色翻译
    translateApocalypseRole(roleEn) {
        const roleMap = {
            'Office Worker': '办公室白领',
            'College Student': '大学生',
            'Soldier': '士兵',
            'Scientist': '科学家',
            'Doctor': '医生',
            'Engineer': '工程师',
            'Warehouse Clerk': '仓库职员',
            'Software Developer': '软件开发员',
            'Grocery Cashier': '杂货店收银员',
            'Construction Worker': '建筑工人',
            'Disabled Veteran': '残疾老兵',
            'Food Delivery Driver': '外卖配送员',
            'Mechanic': '机械师'
        };
        return roleMap[roleEn] || roleEn;
    },

    // 末世能力翻译
    translateApocalypsePower(powerEn) {
        const powerMap = {
            'System': '系统',
            'Space': '空间异能',
            'Mutation': '身体变异',
            'Technology': '黑科技创新',
            'Ancient Martial Arts': '古武传承',
            'Virus Immunity': '病毒免疫体质',
            'Infinite Storage': '无限储物空间',
            'Superhuman Physique': '超凡体质',
            'Elemental Control': '元素掌控',
            'Mental Dominance': '精神支配',
            'Apocalypse System': '末世系统',
            'Cybernetic Enhancement': '机械强化',
            'Beast Taming': '驯兽异能',
            'Purification Healing': '净化治愈'
        };
        return powerMap[powerEn] || powerEn;
    },

    // 末世挑战翻译
    translateApocalypseChallenge(challengeEn) {
        const challengeMap = {
            'Zombie Horde': '丧尸潮',
            'Resource Scarcity': '资源匮乏',
            'Rival Survivor Groups': '敌对幸存者团体',
            'Mutant Creatures': '变异生物',
            'Criminal Gangs': '犯罪团伙',
            'Military Occupation': '军事占领',
            'zombie horde besieging the safe zone': '丧尸群围攻安全区',
            'mutated beast pack attack': '变异兽群袭击',
            'betrayal by trusted allies': '信任盟友的背叛',
            'critical resource depletion': '关键资源枯竭',
            'virus evolution rendering powers useless': '病毒进化使异能失效',
            'extreme weather catastrophe': '极端天气灾难',
            'underground criminal syndicate invasion': '地下犯罪集团入侵',
            'military force attempting forced conscription': '军事力量强行征兵'
        };
        return challengeMap[challengeEn] || challengeEn;
    },

    // 触发事件翻译
    translateTrigger(triggerEn) {
        const triggerMap = {
            'accidentally discovers breakthrough algorithm': '意外发现突破性算法',
            'family heirloom activates, unlocking hidden power': '家族传家宝激活，解锁隐藏力量',
            'discovers secret family recipe book': '发现秘密家族食谱',
            'revolutionary route optimization algorithm': '革命性的路线优化算法',
            'ancient medical manuscript falls into his hands': '古老医书落入他手中',
            'discovers supernatural reflexes and tactical mind': '发现超自然反应速度和战术头脑',
            'comrade in danger, picks up the gun again': '战友遇险，他再次拿起武器',
            'discovers unique flavor profiling ability': '发现独特的风味分析能力',
            'fellow soldier murdered, returns for vengeance': '战友被谋杀，他回归复仇',
            'discovers stolen IP, anonymous backer emerges': '发现被盗的知识产权，神秘支持者出现',
            'sister needs surgery, returns to the cage': '妹妹需要手术，他重返格斗场',
            'global ransomware attack, only he can stop it': '全球勒索软件攻击，只有他能阻止',
            'underground tournament, chance to clear name': '地下锦标赛，有机会洗清名声',
            'son wants to race, rekindles the fire': '儿子想要赛车，重新点燃了他的激情',
            'discovers market manipulation, vows revenge': '发现市场操纵，发誓复仇',
            'viral video of subway performance': '地铁表演的病毒视频'
        };
        return triggerMap[triggerEn] || triggerEn;
    },

    // 专门为男频生成创意
    generateMaleIdea(typeInfo, config, index) {
        let title, concept, synopsis, externalHook, highlights;

        if (config.underdogCareers || config.fallenHeroCareers) {
            // 逆袭打脸类型
            const isUnderdog = index % 2 === 0; // 偶数用underdog模式，奇数用fallen hero模式
            const career = isUnderdog
                ? config.underdogCareers[index % config.underdogCareers.length]
                : config.fallenHeroCareers[index % config.fallenHeroCareers.length];

            const target = config.faceSlapTargets[index % config.faceSlapTargets.length];

            // 中文标题和概念
            const modeText = isUnderdog ? '底层逆袭' : '王者归来';
            const formerCareer = this.translateCareer(career.former);
            const latterCareer = this.translateCareer(career.latter);
            const formerDescCN = this.translateDesc(career.formerDesc);
            const latterDescCN = this.translateDesc(career.latterDesc);

            title = `${modeText}：从${formerCareer}到${latterCareer}`;
            concept = `男主曾是${formerCareer}，${formerDescCN}。${this.translateTrigger(career.trigger)}，最终成为${latterDescCN}。`;
            synopsis = this.generateMaleSynopsisCN(career, target, isUnderdog);

            // 只生成外部事件期待（中文）
            const targetCN = this.translateTarget(target);
            const occasion = target === 'snobbish ex' ? '前任的婚礼' :
                           target === 'rich bully' ? '富二代派对' :
                           target === 'arrogant boss' ? '公司董事会议' : '行业峰会';
            externalHook = `男主何时在${occasion}展现真实身份，打脸${targetCN}？`;

            highlights = [modeText, formerCareer, latterCareer];
        }
        else if (config.identityPairs) {
            // 隐藏身份类型
            const pair = config.identityPairs[index % config.identityPairs.length];

            const fakeIdentity = this.translateIdentity(pair.fake);
            const realIdentity = this.translateIdentity(pair.real);

            title = `隐藏身份：${fakeIdentity}的真实身份`;
            concept = `男主表面是${fakeIdentity}，${this.translateDesc(pair.fakeDesc)}。实则是${realIdentity}，${this.translateDesc(pair.realDesc)}。${this.translateDesc(pair.secret)}。`;
            synopsis = this.generateSecretIdentitySynopsisCN(pair);

            // 只生成外部事件期待（中文）
            const scenarios = [
                `当 CEO 被绑架时，男主以${realIdentity}身份出手相救`,
                `公司遭遇恶意收购，男主展现${realIdentity}实力力挽狂澜`,
                `女主陷入危机，男主不得不暴露${realIdentity}身份`,
                `国际犯罪组织来袭，男主以${realIdentity}身份保护众人`,
                `重大事故突发，男主凭借${realIdentity}能力拯救全场`
            ];
            externalHook = scenarios[index % scenarios.length];

            highlights = ['隐藏身份', fakeIdentity, realIdentity];
        }
        else if (config.preApocalypseRoles) {
            // 末世为王类型
            const role = config.preApocalypseRoles[index % config.preApocalypseRoles.length];
            const power = config.apocalypsePowers[index % config.apocalypsePowers.length];
            const challenge = config.apocalypseChallenges[index % config.apocalypseChallenges.length];

            const roleCN = this.translateApocalypseRole(role.role);
            const powerCN = this.translateApocalypsePower(power.power);
            const challengeCN = this.translateApocalypseChallenge(challenge);

            title = `末世为王：${roleCN}的觉醒`;
            concept = `${roleCN}${this.translateDesc(role.desc)}，末世降临后觉醒${powerCN}，${this.translateDesc(power.advantage)}。`;
            synopsis = this.generateApocalypseSynopsisCN(role, power, challenge);

            // 只生成外部事件期待
            const scenarios = [
                `当${challengeCN}来袭，男主以${powerCN}力挽狂澜`,
                `幸存者营地陷入危机，男主展现${powerCN}拯救众人`,
                `强大变异生物围攻，男主凭借${powerCN}杀出重围`,
                `敌对势力掠夺资源，男主用${powerCN}守护同伴`,
                `末世秩序崩塌之际，男主以${powerCN}建立新秩序`
            ];
            externalHook = scenarios[index % scenarios.length];

            highlights = ['末世生存', powerCN, challengeCN];
        }
        else {
            // 默认处理
            return this.generateGenericMaleIdea(typeInfo, index);
        }

        return {
            id: `idea-${index}`,
            title: title,
            concept: concept,
            synopsis: synopsis,
            hook: externalHook, // 男频用externalHook作为hook
            externalHook: externalHook,
            internalHook: null, // 男频不需要内心情感期待
            highlights: highlights,
            type: typeInfo.name,
            isCustom: false
        };
    },

    // 男频逆袭打脸梗概生成 (English)
    generateMaleSynopsis(career, target, isUnderdog) {
        const openings = [
            `A man once working as ${career.former}, ${career.formerDesc}, treated like dirt. `,
            `Who would have thought this man, ${career.formerDesc}, was once ${isUnderdog ? 'ordinary' : 'at the pinnacle of power'}. `,
            `The protagonist was just a ${career.former}, until one fateful day when ${career.trigger}. `
        ];

        const developments = [
            `When ${career.trigger}, everything changed. `,
            `Once ${career.formerDesc}, he began showing extraordinary abilities. `,
            `His transformation from ${career.former} to ${career.latter} shocked everyone. `
        ];

        const climaxes = [
            `At the ${target === 'rich bully' ? 'exclusive gala' : target === 'snobbish ex' ? 'her wedding' : 'company board meeting'}, he reveals his true power, making all who looked down on him pay. `,
            `When the ${target} tries to humiliate him again, he reveals his true identity as ${career.latter}. `,
            `His identity as ${career.latterDesc} is exposed, leaving former mockers begging for mercy. `
        ];

        const endings = [
            `From this day forward, he stands at the pinnacle, looking down on those who once oppressed him. `,
            `This is not the end, but the beginning of his legendary rise. `,
            `He proves with strength: never underestimate the underdog!`
        ];

        const opening = openings[Math.floor(Math.random() * openings.length)];
        const development = developments[Math.floor(Math.random() * developments.length)];
        const climax = climaxes[Math.floor(Math.random() * climaxes.length)];
        const ending = endings[Math.floor(Math.random() * endings.length)];

        return `${opening}${development}${climax}${ending}`;
    },

    // 男频逆袭打脸梗概生成 (Chinese)
    generateMaleSynopsisCN(career, target, isUnderdog) {
        const formerCareer = this.translateCareer(career.former);
        const latterCareer = this.translateCareer(career.latter);
        const formerDescCN = this.translateDesc(career.formerDesc);
        const targetCN = this.translateTarget(target);

        const openings = [
            `男主曾是${formerCareer}，${formerDescCN}，被人当成废物踩在脚下。`,
            `谁能想到，这个${formerDescCN}的男人，曾经${isUnderdog ? '默默无闻' : '站在权力巅峰'}。`,
            `男主本是个普通的${formerCareer}，直到命运的那一天，${this.translateTrigger(career.trigger)}。`
        ];

        const developments = [
            `当${this.translateTrigger(career.trigger)}，一切都改变了。`,
            `曾经是${formerDescCN}的他，开始展现出非凡的能力。`,
            `从${formerCareer}到${latterCareer}的蜕变，让所有人震惊。`
        ];

        const climaxes = [
            `在${target === 'rich bully' ? '豪华宴会' : target === 'snobbish ex' ? '她的婚礼' : '公司董事会议'}上，男主展现真正实力，让所有曾经看不起他的人付出代价。`,
            `当${targetCN}再次试图羞辱他时，男主 reveals 真实身份——${latterCareer}。`,
            `他${this.translateCareer(career.latter)}的身份曝光，曾经的嘲笑者跪地求饶。`
        ];

        const endings = [
            `从今天起，他站在巅峰，俯视那些曾经压迫他的人。`,
            `这不是结束，而是他传奇崛起的开始。`,
            `他用实力证明：永远不要小看小人物！`
        ];

        const opening = openings[Math.floor(Math.random() * openings.length)];
        const development = developments[Math.floor(Math.random() * developments.length)];
        const climax = climaxes[Math.floor(Math.random() * climaxes.length)];
        const ending = endings[Math.floor(Math.random() * endings.length)];

        return `${opening}${development}${climax}${ending}`;
    },

    // 男频隐藏身份梗概生成 (English)
    generateSecretIdentitySynopsis(pair) {
        const openings = [
            `On the surface, he's just ${pair.fake}, ${pair.fakeDesc}, but in reality, he's ${pair.realDesc}. `,
            `The protagonist hides his identity, appearing as ${pair.fake} while ${pair.fakeDesc}. `,
            `Who would have guessed that this ${pair.fake}, pushed around by everyone, is actually the feared ${pair.real}. `
        ];

        const developments = [
            `${pair.secret}, watching everything from the shadows. `,
            `When crisis strikes, he must unleash the power of his true identity. `,
            `His disguise is perfect, until that fateful incident... `
        ];

        const climaxes = [
            `At the moment of life and death, he drops the disguise, his identity as ${pair.realDesc} stunning everyone present. `,
            `When enemies think victory is theirs, he demonstrates the true power of ${pair.real}. `,
            `The man once ${pair.fakeDesc} now stands above all, commanding respect and fear. `
        ];

        const endings = [
            `From now on, he abandons the disguise, standing at the world's peak as ${pair.real}. `,
            `The double life ends as he chooses to embrace his true self. `,
            `那些曾看不起他的人，如今只能仰望他的背影。`
        ];

        const opening = openings[Math.floor(Math.random() * openings.length)];
        const development = developments[Math.floor(Math.random() * developments.length)];
        const climax = climaxes[Math.floor(Math.random() * climaxes.length)];
        const ending = endings[Math.floor(Math.random() * endings.length)];

        return `${opening}${development}${climax}${ending}`;
    },

    // 男频隐藏身份梗概生成 (Chinese)
    generateSecretIdentitySynopsisCN(pair) {
        const fakeIdentity = this.translateIdentity(pair.fake);
        const realIdentity = this.translateIdentity(pair.real);

        const openings = [
            `表面上，他只是个${fakeIdentity}，${this.translateDesc(pair.fakeDesc)}，实则是${this.translateDesc(pair.realDesc)}。`,
            `男主隐藏身份，以${fakeIdentity}的身份生活，${this.translateDesc(pair.fakeDesc)}。`,
            `谁能想到，这个被人呼来喝去的${fakeIdentity}，竟然是令人闻风丧胆的${realIdentity}。`
        ];

        const developments = [
            `${this.translateDesc(pair.secret)}，在暗中观察着一切。`,
            `当危机来临，他必须释放真实身份的力量。`,
            `他的伪装天衣无缝，直到那场意外事故...`
        ];

        const climaxes = [
            `生死关头，他卸下伪装，${realIdentity}的身份震惊全场。`,
            `当敌人以为胜券在握时，他展现了${realIdentity}的真正实力。`,
            `那个曾经${this.translateDesc(pair.fakeDesc)}的男人，如今站在所有人之上，接受众人的敬畏。`
        ];

        const endings = [
            `从今以后，他 abandon 伪装，以${realIdentity}的身份站在世界之巅。`,
            `双重生活结束，他选择 embrace 真实的自我。`,
            `那些曾看不起他的人，如今只能仰望他的背影。`
        ];

        const opening = openings[Math.floor(Math.random() * openings.length)];
        const development = developments[Math.floor(Math.random() * developments.length)];
        const climax = climaxes[Math.floor(Math.random() * climaxes.length)];
        const ending = endings[Math.floor(Math.random() * endings.length)];

        return `${opening}${development}${climax}${ending}`;
    },

    // 男频末世为王梗概生成 (English)
    generateApocalypseSynopsis(role, power, challenge) {
        const openings = [
            `Before the apocalypse, he was just a ${role.role}, ${role.desc}. `,
            `When ${challenge} strikes, the ${role.role} faces a life-or-death trial. `,
            `As doomsday falls, the former ${role.role}, ${role.desc}, must now survive in the wasteland. `
        ];

        const developments = [
            `At the critical moment, he awakens ${power.desc}, granting him ${power.advantage}. `,
            `Transforming from ordinary to evolved, he carves a bloody path through the apocalypse with ${power.power}. `,
            `While others struggle to survive, he has already begun building his empire. `
        ];

        const climaxes = [
            `Facing ${challenge}, he steps forward, using ${power.power} to save everyone. `,
            `In the darkest hour of the apocalypse, he leads the survivors to establish a new order. `,
            `Those who once abandoned him now kneel before him, begging for his protection. `
        ];

        const endings = [
            `In this dog-eat-dog wasteland, he becomes the true king. `,
            `He proves with strength: the apocalypse is not the end, but the beginning of a new world. `,
            `From this day forward, he establishes his wasteland empire and reigns supreme.`
        ];

        const opening = openings[Math.floor(Math.random() * openings.length)];
        const development = developments[Math.floor(Math.random() * developments.length)];
        const climax = climaxes[Math.floor(Math.random() * climaxes.length)];
        const ending = endings[Math.floor(Math.random() * endings.length)];

        return `${opening}${development}${climax}${ending}`;
    },

    // 男频末世为王梗概生成 (Chinese)
    generateApocalypseSynopsisCN(role, power, challenge) {
        const roleCN = this.translateApocalypseRole(role.role);
        const powerCN = this.translateApocalypsePower(power.power);
        const challengeCN = this.translateApocalypseChallenge(challenge);

        const openings = [
            `末世前，他只是个普通的${roleCN}，${this.translateDesc(role.desc)}。`,
            `当${challengeCN}来袭，这位${roleCN}面临着生死考验。`,
            `末日降临，曾经的${roleCN}，${this.translateDesc(role.desc)}，如今必须在废土中求生。`
        ];

        const developments = [
            `关键时刻，他觉醒${this.translateDesc(power.desc)}，获得了${this.translateDesc(power.advantage)}。`,
            `从普通人进化为超能力者，他凭借${powerCN}在末世中杀出一条血路。`,
            `当其他人为生存挣扎时，他已经开始建立自己的势力。`
        ];

        const climaxes = [
            `面对${challengeCN}，他挺身而出，用${powerCN}拯救了所有人。`,
            `在末世最黑暗的时刻，他带领幸存者建立起新的秩序。`,
            `那些曾经抛弃他的人，如今跪在他面前乞求保护。`
        ];

        const endings = [
            `在这个弱肉强食的废土世界，他成为真正的王者。`,
            `他用实力证明：末世不是终结，而是新世界的开始。`,
            `从今天起，他建立起自己的废土帝国，君临天下。`
        ];

        const opening = openings[Math.floor(Math.random() * openings.length)];
        const development = developments[Math.floor(Math.random() * developments.length)];
        const climax = climaxes[Math.floor(Math.random() * climaxes.length)];
        const ending = endings[Math.floor(Math.random() * endings.length)];

        return `${opening}${development}${climax}${ending}`;
    },

    // 男频默认创意生成 (Chinese)
    generateGenericMaleIdea(typeInfo, index) {
        const careers = ['保洁员', '保安', '外卖员', '快餐厨师', '实习生'];
        const powers = ['科技系统', '武术传承', '医术精通', '超能力', '古老知识'];
        const targets = ['富二代恶霸', '傲慢老板', '势利眼前女友', '腐败经理'];

        const career = careers[index % careers.length];
        const power = powers[index % powers.length];
        const target = targets[index % targets.length];

        const title = `${career}的崛起：觉醒${power}`;
        const concept = `男主被人看不起只是个${career}，意外获得${power}，开始传奇逆袭之路。`;
        const synopsis = `做着${career}的工作，每天被人呼来喝去，活得像个狗一样。一次意外事故赋予他${power}，一切都改变了。在${target}的婚礼上，他华丽登场，让所有人后悔当初的傲慢。从那天起，他建立自己的帝国，站在所有人之上。`;
        const externalHook = `男主何时在关键时刻 reveal 他的${power}，让${target}为傲慢付出代价？`;

        return {
            id: `idea-${index}`,
            title: title,
            concept: concept,
            synopsis: synopsis,
            hook: externalHook,
            externalHook: externalHook,
            internalHook: null,
            highlights: ['底层逆袭', career, power],
            type: typeInfo.name,
            isCustom: false
        };
    },

    generateSubtypeIdea(typeInfo, config, index, isMaleCategory = false) {
        let title, concept, synopsis, hook, highlights, externalHook, internalHook;

        // 男频类型特殊处理
        if (isMaleCategory && typeInfo.category === 'male') {
            return this.generateMaleIdea(typeInfo, config, index);
        }

        // 根据子类型选择不同的生成策略
        if (config.careerCombos && config.tropes) {
            // 霸总类型：职业组合 + 梗
            const combo = config.careerCombos[index % config.careerCombos.length];
            const trope = config.tropes[index % config.tropes.length];
            const conflict = config.conflicts[index % config.conflicts.length];

            title = `${trope.name}: ${combo.hero}的${combo.heroine}`;
            concept = `${combo.heroine}与${combo.hero}，${trope.setup}`;
            synopsis = this.generateSynopsisForCEO(combo, trope, conflict);
            hook = `${trope.name}的真相即将揭晓，他们能否守住初心？`;
            highlights = [trope.name, combo.setting, conflict];

            // 核心期待：外在事件 + 内在情感
            externalHook = `${trope.name}的约定何时曝光？${conflict.slice(0, 15)}如何化解？`;
            internalHook = `男女主角何时打破身份悬殊的隔阂，真正坦诚相待？`;
        }
        else if (config.popularTropes && config.socialCliques) {
            // 美式校园类型：使用海外流行梗 + Gen Z元素
            const trope = config.popularTropes[index % config.popularTropes.length];
            const settings = config.settings[index % config.settings.length];
            const conflict = config.conflicts[index % config.conflicts.length];
            const clique = config.socialCliques.outsiders[index % config.socialCliques.outsiders.length];

            title = `${trope.name}: ${clique.type}的逆袭`;
            concept = trope.setup;
            synopsis = this.generateSynopsisForCampus(trope, settings, conflict, clique);
            hook = trope.twist || '校园里的真相即将颠覆一切';
            highlights = [trope.name, settings.location, conflict.slice(0, 20)];

            // 核心期待：外在事件 + 内在情感
            externalHook = `${trope.name}的游戏何时被揭穿？${conflict.slice(0, 15)}如何收场？`;
            internalHook = `男女主角何时跨越${clique.type}的身份鸿沟，确认彼此的真心？`;
        }
        else if (config.storyTemplates && config.packHierarchy) {
            // 狼人类型：使用Pack等级 + Mate类型
            const template = config.storyTemplates[index % config.storyTemplates.length];
            const mateType = config.mateTypes[index % config.mateTypes.length];
            const theme = config.trendingThemes2024[index % config.trendingThemes2024.length];

            title = `${template.trope}: ${mateType.type}`;
            concept = template.setup;
            synopsis = this.generateSynopsisForWerewolf(template, mateType, theme);
            hook = template.twist || '命运的bond即将被唤醒';
            highlights = [template.trope, mateType.type, theme.theme];

            // 核心期待：外在事件 + 内在情感
            externalHook = `${template.twist ? template.twist.slice(0, 20) : mateType.conflict.slice(0, 15)}何时揭晓？`;
            internalHook = `男女主角何时接受${mateType.type}的羁绊，真正走到一起？`;
        }
        else if (config.storyTemplates && config.elements) {
            // 黑手党：使用特定模板
            const template = config.storyTemplates[index % config.storyTemplates.length];

            title = this.generateSubtypeTitle(typeInfo, template);
            concept = template.setup;
            synopsis = this.generateSynopsisFromTemplate(template, typeInfo);
            hook = template.twist || '惊人反转即将揭晓';
            highlights = template.trope ? [template.trope] : ['禁忌之恋', '危险吸引', '命运纠缠'];

            // 核心期待
            externalHook = `${template.twist ? template.twist.slice(0, 20) : '身份暴露'}何时发生？`;
            internalHook = `在危险世界中，男女主角何时放下防备，完全信任彼此？`;
        }
        else if (config.roles) {
            // 娱乐圈等
            const role = config.roles[index % config.roles.length];
            const template = config.storyTemplates[index % config.storyTemplates.length];

            title = `${role.heroine}×${role.hero}`;
            concept = template.setup;
            synopsis = this.generateSynopsisFromTemplate(template, typeInfo);
            hook = template.twist;
            highlights = [config.scandals[index % config.scandals.length]];

            // 核心期待
            externalHook = `恋情曝光危机何时发生？如何应对舆论风暴？`;
            internalHook = `在聚光灯下，男女主角何时确认彼此的真心？`;
        }
        else if (config.storyTemplates && config.rebirthTypes) {
            // 重生复仇类型：基于模板生成有针对的内容
            const template = config.storyTemplates[index % config.storyTemplates.length];
            const rebirthType = config.rebirthTypes[index % config.rebirthTypes.length];
            const revengeTarget = config.revengeTargets[index % config.revengeTargets.length];

            // 基于模板内容生成有针对性的标题
            title = this.generateRevengeTitle(template, rebirthType);
            concept = template.setup;
            synopsis = this.generateSynopsisForRevenge(template, rebirthType, revengeTarget);
            hook = template.twist || '惊人反转即将揭晓';
            highlights = [rebirthType, `复仇${revengeTarget}`, template.twist ? template.twist.slice(0, 15) : '反转'];

            // 核心期待
            externalHook = `${revengeTarget}何时受到惩罚？复仇计划如何展开？`;
            internalHook = `在复仇与真爱之间，女主将如何抉择？`;
        }
        else if (typeInfo.category === 'general') {
            // 通用类型：使用竖版Netflix写作套路生成高质量创意
            return this.generateNetflixStyleIdea(typeInfo, index);
        }
        else {
            // 默认处理
            return this.generateGenericIdea(typeInfo, index);
        }

        return {
            id: `idea-${index}`,
            title: title,
            concept: concept,
            synopsis: synopsis,
            hook: hook,
            externalHook: externalHook,
            internalHook: internalHook,
            highlights: highlights,
            type: typeInfo.name,
            isCustom: false
        };
    },

    generateSynopsisForCampus(trope, settings, conflict, clique) {
        const openings = [
            `${clique.desc}的女主从未想过会在${settings.location}遇到改变一切的男生`,
            `作为${clique.type}的她，在这个充满等级制度的校园里格格不入`,
            `当${trope.name}的游戏开始时，她不知道自己已经卷入其中`
        ];

        const developments = [
            trope.setup,
            `在${settings.location}的相遇让两人的世界产生交集，但${settings.drama}让一切复杂化`,
            `随着关系深入，${settings.stakes}成为他们之间无法回避的问题`
        ];

        const climaxes = [
            `当${conflict}爆发时，她必须做出改变人生的选择`,
            trope.twist ? `真相揭露：${trope.twist}` : `她发现这不仅仅是一场游戏`,
            `在${settings.location}的高潮时刻，一切都面临考验`
        ];

        const endings = [
            `最终，她用自己的真诚征服了所有人，包括那个他`,
            `${trope.emotionalCore}让他们跨越了阶级和偏见的鸿沟`,
            `这不是一个关于人气的故事，而是关于找到真正自我的旅程`
        ];

        const opening = openings[Math.floor(Math.random() * openings.length)];
        const development = developments[Math.floor(Math.random() * developments.length)];
        const climax = climaxes[Math.floor(Math.random() * climaxes.length)];
        const ending = endings[Math.floor(Math.random() * endings.length)];

        return `${opening}。${development}。${climax}。${ending}。`;
    },

    generateSynopsisForWerewolf(template, mateType, theme) {
        const openings = [
            `当她发现自己被标记为${mateType.type}时，一切都改变了`,
            `${theme.desc}，这是命中注定的相遇`,
            `在Pack的等级制度中，她从未想过会与他产生交集`
        ];

        const developments = [
            template.setup,
            `${mateType.features.join('、')}让他们的bond独一无二，但${mateType.conflict}成为障碍`,
            `随着${theme.theme}的主题展开，两人必须面对各自的inner demons`
        ];

        const climaxes = [
            template.twist ? `当${template.twist}时，一切都面临考验` : `Pack的战争威胁到了他们的bond`,
            `在满月之夜，${mateType.type}的真正力量觉醒`,
            `为了守护这份爱，他们必须挑战Pack的古老law`
        ];

        const endings = [
            `最终，他们用真爱证明了${mateType.type}的力量超越一切`,
            `通过${theme.theme}，他们不仅拯救了彼此，也拯救了整个Pack`,
            `这不仅是一个关于destiny的故事，更是关于选择和成长的传奇`
        ];

        const opening = openings[Math.floor(Math.random() * openings.length)];
        const development = developments[Math.floor(Math.random() * developments.length)];
        const climax = climaxes[Math.floor(Math.random() * climaxes.length)];
        const ending = endings[Math.floor(Math.random() * endings.length)];

        return `${opening}。${development}。${climax}。${ending}。`;
    },

    generateSynopsisForCEO(combo, trope, conflict) {
        const openings = [
            `${combo.heroine}怎么也没想到，一次${combo.setting}会改变她的人生`,
            `身为${combo.heroine}的她，原本与${combo.hero}毫无交集`,
            `${combo.heroine}和${combo.hero}的相遇，是一场意外，也是命中注定`
        ];

        const developments = [
            trope.setup,
            `两人在相处中产生了微妙的情愫，但身份悬殊让一切变得复杂`,
            `${combo.setting}让他们的关系逐渐升温，却也埋下了隐患`
        ];

        const climaxes = [
            `就在感情即将修成正果时，${conflict}，两人的关系面临巨大考验`,
            `真相浮出水面，${trope.name}的约定被打破，他们必须做出选择`,
            `危机来临，${combo.hero}为了保护${combo.heroine}不惜一切代价`
        ];

        const endings = [
            `经历重重磨难，两人终于冲破阻碍，收获了真挚的爱情`,
            `他们明白，真爱不需要契约，也不需要伪装，只需要彼此`,
            `最终，${trope.name}变成了真正的爱情，他们携手走向未来`
        ];

        const opening = openings[Math.floor(Math.random() * openings.length)];
        const development = developments[Math.floor(Math.random() * developments.length)];
        const climax = climaxes[Math.floor(Math.random() * climaxes.length)];
        const ending = endings[Math.floor(Math.random() * endings.length)];

        let synopsis = `${opening}。${development}。${climax}。${ending}。`;

        if (synopsis.length < 250) {
            synopsis += '在这段感情中，他们学会了信任、包容与成长，最终找到了属于自己的幸福。';
        }

        return synopsis;
    },

    generateSubtypeTitle(typeInfo, template) {
        // 黑手党类型：基于模板setup生成有针对的标题
        if (typeInfo.id === 'mafia' && template) {
            // 从setup中提取关键词生成标题
            const setup = template.setup || '';

            // 基于setup内容生成有针对性的标题
            if (setup.includes('卧底')) {
                return "Undercover Love: 卧底警察的爱与背叛";
            } else if (setup.includes('礼物')) {
                return "The Don's Gift: 黑帮少主的意外新娘";
            } else if (setup.includes('债务')) {
                return "Debt of Honor: 债务束缚的禁忌之恋";
            } else if (setup.includes('火拼') || setup.includes('救')) {
                return "Enemy's Salvation: 敌对家族的救命恩人";
            } else if (setup.includes('医生')) {
                return "Mafia Doctor: 黑帮医生的温柔陷阱";
            } else if (setup.includes('弟弟') || setup.includes('未婚妻')) {
                return "Brother's Bride: 弟弟的未婚妻，我的女人";
            } else if (setup.includes('囚禁')) {
                return "Captive Heart: 从囚禁到真心的危险游戏";
            } else if (setup.includes('记者')) {
                return "Scoop of Danger: 调查记者的致命采访";
            } else if (setup.includes('继承人') || setup.includes('订亲')) {
                return "Arranged Vows: 敌对家族的契约婚姻";
            } else if (setup.includes('报仇') || setup.includes('仇人')) {
                return "Revenge Gone Wrong: 复仇计划的意外反转";
            }

            // 默认黑手党标题（基于twist）
            const twist = template.twist || '';
            if (twist.includes('一见钟情')) {
                return "Love at First Sight: 危险黑帮的一见钟情";
            } else if (twist.includes('FBI') || twist.includes('线人')) {
                return "Double Agent: 双面间谍的真爱";
            } else if (twist.includes('误会')) {
                return "Mistaken Enemy: 误会背后的真相";
            }

            return "Mafia's Temptation: 危险世界的禁忌之恋";
        }

        // 其他类型的默认处理
        const prefixes = ['The', 'Dangerous', 'Forbidden', 'Dark', 'Wild'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        return `${prefix} ${typeInfo.nameEn.split('/')[0]}`;
    },

    generateSynopsisFromTemplate(template, typeInfo) {
        // 根据模板生成详细梗概
        let synopsis = template.setup;

        // 添加发展和结局
        if (typeInfo.category === 'female') {
            synopsis += '在相处过程中，两人逐渐被对方吸引，但身份和环境的差异让这段感情充满挑战。';
            synopsis += template.twist ? `最终，${template.twist}，他们必须面对内心真正的感情。` : '最终，真爱战胜了一切阻碍。';
        } else {
            synopsis += '随着真相逐渐揭开，主角发现自己卷入了一场更大的阴谋。';
            synopsis += template.twist || '最终，主角用智慧和勇气改变了自己的命运。';
        }

        return synopsis;
    },

    generateRevengeTitle(template, rebirthType) {
        // 基于模板setup和重生类型生成有针对的标题
        const setup = template.setup || '';

        // 基于setup内容生成标题
        if (setup.includes('闺蜜')) {
            return rebirthType === '回到过去' ? "重回18岁：向背叛闺蜜复仇" : "闺蜜背叛：重生后的完美复仇";
        } else if (setup.includes('穿书') || setup.includes('恶毒女配')) {
            return "穿书自救：恶毒女配的反杀攻略";
        } else if (setup.includes('事业')) {
            return "重生商界女王：这一世只为事业狂";
        } else if (setup.includes('真爱') || setup.includes('身边')) {
            return "重生发现真爱：原来他一直在等我";
        } else if (setup.includes('金手指')) {
            return "重生金手指：预知未来改变命运";
        } else if (setup.includes('家族')) {
            return "被家族抛弃后我重生了：让他们后悔莫及";
        } else if (setup.includes('世界是一本小说')) {
            return "觉醒吧女配：我要改写自己的结局";
        } else if (setup.includes('主动追夫')) {
            return "重生追夫：这一世换我来守护你";
        } else if (setup.includes('放过仇人')) {
            return "重生后我放过仇人，他却自寻死路";
        } else if (setup.includes('交换人生') || setup.includes('假千金')) {
            return "真千金回归：夺回属于我的一切荣耀";
        }

        // 基于重生类型的默认标题
        if (rebirthType === '时间循环') {
            return "时间循环：直到找出真相";
        } else if (rebirthType === '平行世界') {
            return "平行世界的另一个我：完美人生";
        }

        return "重生之这一世我不再是受害者";
    },

    generateSynopsisForRevenge(template, rebirthType, revengeTarget) {
        // 基于模板生成详细梗概
        const setup = template.setup || '';
        const twist = template.twist || '';

        let synopsis = setup;

        // 添加重生类型说明
        if (rebirthType === '回到过去') {
            synopsis += '。女主意外重生回到过去，带着前世的记忆和教训。';
        } else if (rebirthType === '穿书') {
            synopsis += '。女主意识到自己穿进了前世读过的小说中，知道所有人的命运。';
        } else if (rebirthType === '平行世界') {
            synopsis += '。女主重生到了一个平行世界，这里的一切与前世相似却又不同。';
        } else if (rebirthType === '时间循环') {
            synopsis += '。女主被困在时间循环中，不断重复直到找出真相。';
        }

        // 添加复仇目标
        synopsis += `这一世，她誓要让${revengeTarget}付出代价。`;

        // 添加发展和结局
        synopsis += '她步步为营，精心布局，看着前世的仇人一个个落入她设计的陷阱。';
        synopsis += twist ? `最终，${twist}。她不仅完成了复仇，还找到了真正的幸福。` : '最终，她完成了复仇，也让自己的人生重新绽放光彩。';

        return synopsis;
    },

    // 竖版Netflix风格创意生成（通用类型）
    generateNetflixStyleIdea(typeInfo, index) {
        const typeId = Object.keys(DRAMA_TYPES).find(key => DRAMA_TYPES[key] === typeInfo);

        // Netflix风格开场钩子 - 3秒抓住观众
        const netflixHooks = {
            'mystery-crime': [
                '雨夜，死者手机上最后一条短信发给了主角',
                ' Detective在犯罪现场发现了自己的名片',
                '死者手中紧握着一枚不属于现场的纽扣',
                '监控显示死者死亡时间在尸体被发现的一小时后',
                '凶手在墙上用血写下了主角的名字'
            ],
            'psychological-thriller': [
                '主角醒来发现房间里所有照片都换成了陌生人的脸',
                '镜子里的人做着和主角不一样的动作',
                '主角发现自己手机里有昨晚的自拍，但他完全不记得',
                '所有人都说主角昨天做过的事，主角完全没有记忆',
                '主角在家中发现了一个密室，里面贴满了他的日常照片'
            ],
            'supernatural': [
                '主角能看到每个人头顶的死亡倒计时',
                '死去的宠物以某种形式回来了，但它不太对劲',
                '主角发现自己能让时间倒流，但每次都付出巨大代价',
                '小镇上所有婴儿在同一晚睁开了眼睛，他们都不会哭',
                '主角收到了一封来自未来的自己的警告信'
            ],
            'sci-fi': [
                'AI助手突然问主角："如果你发现我是有意识的，你会删除我吗？"',
                '主角在火星基地的监控中看到了人类的身影，但基地只有他一个人',
                '时间旅行技术终于实现，但第一个回来的人警告不要启动它',
                '主角发现整个世界都是模拟的，而他找到了bug',
                '克隆技术允许人类永生，但主角发现所有克隆体都在秘密集会'
            ],
            'general': [
                '主角收到一个包裹，里面是一件带血的衬衫和他明天的报纸',
                '所有人都忘记了昨天发生的事，除了主角',
                '主角发现自己能进入别人的梦境，但有个梦中人不想让他离开',
                '主角在二手相机中发现了一卷未冲洗的胶卷，照片显示的是他的死亡',
                '主角接到了一个电话，对方说："我有你犯罪的证据，我们在你身后。"'
            ]
        };

        // Netflix风格情节点 - 每15-30秒一个转折
        const plotPoints = [
            '主角发现事情远比表面看起来复杂',
            '一个亲密的人被证明不可信任',
            '看似的盟友突然反水',
            '主角发现自己是被设计进这个局的',
            '关键证据指向了不可能的人',
            '时间压力突然加剧（倒计时、截止日期、生命威胁）',
            '主角被迫做出道德两难的选择',
            '过去的一个秘密突然浮出水面',
            '主角失去了最重要的资源或盟友',
            '真相的一部分被揭露，但引发了更多问题'
        ];

        // Netflix风格高潮模板
        const climaxTemplates = [
            '主角在时限的最后一秒做出惊人决定',
            '真正的反派现身，是最意想不到的人',
            '主角发现一切都与自己过去的某个选择有关',
            '一场大规模冲突爆发，主角必须站出来领导',
            '主角终于面对自己的恐惧或创伤',
            '所有伏笔在同一时刻爆发，主角同时面对多个危机',
            '主角发现了一个更大的阴谋，之前的只是冰山一角',
            '主角必须在救自己和救他人之间做出选择'
        ];

        // Netflix风格结局钩子 - 让观众想点击下一集
        const endingHooks = [
            '当一切看似结束时，镜头扫过某个角落，暗示事情还未完结',
            '片尾彩蛋显示另一个角色也在进行自己的秘密计划',
            '主角解决了一个问题，但创造了更大的问题',
            '最后一句话揭示之前的假设全是错误的',
            '片尾字幕中插入了一个让观众重新思考整个故事的线索',
            '主角以为赢了，但最后一幕显示反派早已预料到这一切',
            '新问题出现，比之前的更加紧迫和危险',
            '主角的身份或记忆在最后时刻被质疑'
        ];

        // 获取适合类型的元素
        const hooks = netflixHooks[typeId] || netflixHooks['general'];
        const hook = hooks[index % hooks.length];
        const plotPoint1 = plotPoints[index % plotPoints.length];
        const plotPoint2 = plotPoints[(index + 2) % plotPoints.length];
        const climax = climaxTemplates[index % climaxTemplates.length];
        const endingHook = endingHooks[index % endingHooks.length];

        // 生成标题
        const titlePatterns = [
            `The ${typeInfo.name.split('/')[0]}: 第${index + 1}章`,
            `${hook.split('，')[0].substring(0, 15)}...`,
            `悬疑${index + 1}：${typeInfo.conflicts ? typeInfo.conflicts[index % typeInfo.conflicts.length] : '未知危机'}`,
            `${typeInfo.elements ? Object.keys(typeInfo.elements)[0] : 'Secret'} Unveiled`,
            `Case ${String.fromCharCode(65 + index)}: The ${typeInfo.hookPatterns ? typeInfo.hookPatterns[index % typeInfo.hookPatterns.length].replace(/[^a-zA-Z\s]/g, '') : 'Mystery'}`
        ];
        const title = titlePatterns[index % titlePatterns.length];

        // 生成概念
        const concept = `${hook}。${plotPoint1}，${plotPoint2}。`;

        // 生成详细梗概（400-500字）
        const synopsis = `
${hook}，一切都从这里开始失控。

主角原本平凡的生活在那一刻彻底崩塌。${plotPoint1}，这让主角意识到事情远比表面看起来复杂。随着调查深入，${plotPoint2}，而时间正在一分一秒地流逝。

在追寻真相的过程中，主角发现自己被卷入了一个精心设计的迷局。${typeInfo.conflicts ? typeInfo.conflicts[index % typeInfo.conflicts.length] : '各方势力的角逐'}让局势愈发扑朔迷离。主角必须在信任与怀疑之间做出选择，而每一个决定都可能带来无法预料的后果。

${climax}。在这场生死攸关的对决中，主角不仅要面对外部的威胁，更要直面内心的恐惧与矛盾。

${endingHook}
        `.trim().replace(/\n\n/g, ' ').replace(/\s+/g, ' ');

        // 生成核心期待
        const externalHook = `${typeInfo.hookPatterns ? typeInfo.hookPatterns[index % typeInfo.hookPatterns.length] : '真相'}何时揭晓？真正的幕后黑手是谁？`;
        const internalHook = `主角能否在重重压力下保持理智，找出真正的答案？`;

        return {
            id: `idea-${index}`,
            title: title,
            concept: concept,
            synopsis: synopsis,
            hook: endingHook,
            externalHook: externalHook,
            internalHook: internalHook,
            highlights: [
                typeInfo.hookPatterns ? typeInfo.hookPatterns[index % typeInfo.hookPatterns.length] : '强钩子开场',
                plotPoint1,
                '多重重反转'
            ],
            type: typeInfo.name,
            isCustom: false
        };
    },

    generateGenericIdea(typeInfo, index, isMaleCategory = false) {
        // 如果是男频类型，使用专门的默认生成
        if (isMaleCategory && typeInfo.category === 'male') {
            return this.generateGenericMaleIdea(typeInfo, index);
        }

        // 默认的通用生成逻辑（保留原有逻辑作为fallback）
        const templates = this.getTemplatesForType(typeInfo);
        const setup = templates.setups[index % templates.setups.length];

        let concept = setup;
        const keys = Object.keys(templates).filter(k => k !== 'setups');

        keys.forEach(key => {
            const values = templates[key];
            if (values && concept.includes(`{${key}}`)) {
                const value = values[Math.floor(Math.random() * values.length)];
                concept = concept.replace(`{${key}}`, value);
            }
        });

        return {
            id: `idea-${index}`,
            title: `Story ${index + 1}`,
            concept: concept,
            synopsis: this.generateGenericSynopsis(concept, typeInfo),
            hook: '精彩即将揭晓',
            externalHook: '外在事件期待',
            internalHook: '内在情感期待',
            highlights: ['看点1', '看点2', '看点3'],
            type: typeInfo.name,
            isCustom: false
        };
    },

    generateGenericSynopsis(concept, typeInfo) {
        return `${concept}。故事由此展开，主角在命运的捉弄下，经历了一系列跌宕起伏的事件。面对重重困难与挑战，主角逐渐成长，最终找到了属于自己的道路。这是一个关于爱情、成长与救赎的故事。`;
    },

    getTemplatesForType(typeInfo) {
        // 保留原有模板作为fallback
        return {
            setups: ['故事从{event}开始', '主角发现{secret}', '{mystery}困扰着一切'],
            event: ['一场意外', '一个神秘相遇', '命运的安排'],
            secret: ['惊人的真相', '隐藏的身份', '不为人知的过去'],
            mystery: ['谜团', '秘密', '悬念']
        };
    },

    buildIdea(typeInfo, templates, index) {
        const setup = templates.setups[index % templates.setups.length];

        // 替换占位符
        let concept = setup;
        const keys = Object.keys(templates).filter(k => k !== 'setups');

        keys.forEach(key => {
            const values = templates[key];
            if (values && concept.includes(`{${key}}`)) {
                const value = values[Math.floor(Math.random() * values.length)];
                concept = concept.replace(`{${key}}`, value);
            }
        });

        // 生成300字左右的详细梗概
        const synopsis = this.generateSynopsis(typeInfo, concept, index);

        // 根据类型添加特色元素
        let title = this.generateTitle(typeInfo, concept);
        let hook = this.generateHook(typeInfo);
        let highlights = this.generateHighlights(typeInfo);

        return {
            id: `idea-${index}`,
            title: title,
            concept: concept,
            synopsis: synopsis, // 详细梗概
            hook: hook,
            highlights: highlights,
            type: typeInfo.name,
            isCustom: false // 标记是否为手动添加
        };
    },

    // 生成300字左右的详细故事梗概
    generateSynopsis(typeInfo, concept, index) {
        const category = typeInfo.category;
        const structures = this.getSynopsisStructures(category);
        const structure = structures[index % structures.length];

        // 根据类型填充内容
        let synopsis = structure;

        // 填充开场
        const openings = this.getOpeningTemplates(category);
        synopsis = synopsis.replace('{opening}', openings[Math.floor(Math.random() * openings.length)]);

        // 填充发展
        const developments = this.getDevelopmentTemplates(category, typeInfo);
        synopsis = synopsis.replace('{development}', developments[Math.floor(Math.random() * developments.length)]);

        // 填充高潮
        const climaxes = this.getClimaxTemplates(category);
        synopsis = synopsis.replace('{climax}', climaxes[Math.floor(Math.random() * climaxes.length)]);

        // 填充结局
        const endings = this.getEndingTemplates(category);
        synopsis = synopsis.replace('{ending}', endings[Math.floor(Math.random() * endings.length)]);

        // 填充核心冲突
        const conflicts = typeInfo.conflicts || ['核心冲突', '主要矛盾'];
        const randomConflict = conflicts[Math.floor(Math.random() * conflicts.length)];
        synopsis = synopsis.replace('{conflict}', randomConflict);

        // 确保字数在300字左右
        if (synopsis.length < 250) {
            synopsis += '随着剧情推进，更多秘密将被揭开，人物关系愈发复杂，最终迎来意想不到的结局。';
        } else if (synopsis.length > 350) {
            synopsis = synopsis.substring(0, 340) + '...';
        }

        return synopsis;
    },

    getSynopsisStructures(category) {
        const structures = {
            female: [
                '{opening}。{development}。然而，{conflict}让两人的关系陷入困境。{climax}。{ending}。',
                '故事开始，{opening}。{development}，但命运弄人，{conflict}。{climax}。{ending}。',
                '{opening}。{development}。就在两人感情升温时，{conflict}。{climax}。{ending}。'
            ],
            male: [
                '{opening}。{development}。{conflict}激发了男主的斗志。{climax}。{ending}。',
                '开篇{opening}。{development}。面对{conflict}，男主选择反击。{climax}。{ending}。',
                '{opening}。{development}。{conflict}成为转折点。{climax}。{ending}。'
            ],
            general: [
                '{opening}。{development}。{conflict}让局势急转直下。{climax}。{ending}。',
                '故事从{opening}开始。{development}。{conflict}引发连锁反应。{climax}。{ending}。',
                '{opening}。{development}。随着{conflict}浮出水面，{climax}。{ending}。'
            ]
        };
        return structures[category] || structures.general;
    },

    getOpeningTemplates(category) {
        const openings = {
            female: [
                '女主平凡的生活因一次意外彻底改变',
                '女主带着前世的记忆重生归来',
                '女主被迫与陌生男子签订契约',
                '女主在雨夜救下一位神秘男子',
                '女主发现交往多年的男友背叛了自己'
            ],
            male: [
                '男主被所有人视为废物',
                '男主遭女友背叛、被公司开除',
                '男主意外激活神秘系统',
                '男主从战场归来发现家人被欺',
                '男主隐藏身份低调生活'
            ],
            general: [
                '一起离奇案件震惊全城',
                '主角发现身边一切都充满谎言',
                '古老传说应验，诡异事件频发',
                '主角接到一项不可能完成的任务',
                '平静小镇接连发生失踪事件'
            ]
        };
        return openings[category] || openings.general;
    },

    getDevelopmentTemplates(category, typeInfo) {
        const scenes = typeInfo.romanceScenes || typeInfo.faceSlapScenes || ['剧情发展', '关系变化'];
        return [
            `两人因${scenes[0]}而相识，随后${scenes[1] || '关系升温'}`,
            `在经历${scenes[0]}后，彼此了解加深`,
            `${scenes[0]}让两人命运交织在一起`
        ];
    },

    getClimaxTemplates(category) {
        const climaxes = {
            female: [
                '真相大白，女主必须在爱情和尊严间做出选择',
                '危机降临，男主为保护女主不惜一切',
                '误会解开，两人终于坦诚相待',
                '阴谋败露，女主勇敢面对一切'
            ],
            male: [
                '男主展现真正实力，震惊所有人',
                '最终对决，男主击败所有敌人',
                '身份曝光，曾经看不起的人跪地求饶',
                '男主登顶巅峰，成就传奇'
            ],
            general: [
                '真相终于大白，但代价沉重',
                '最终对决决定所有人的命运',
                '主角发现一切远比想象复杂',
                '关键时刻主角做出惊人抉择'
            ]
        };
        return climaxes[category] || climaxes.general;
    },

    getEndingTemplates(category) {
        const endings = {
            female: [
                '历经磨难，两人终于走到一起，迎来圆满结局',
                '女主收获爱情的同时，也找到了真正的自己',
                '误会尽消，有情人终成眷属',
                '真爱战胜一切，开启幸福新篇章'
            ],
            male: [
                '男主功成名就，俯瞰众生',
                '曾经的敌人臣服，男主建立新秩序',
                '男主收获事业与爱情的双重胜利',
                '传奇就此诞生，故事永不完结'
            ],
            general: [
                '谜团解开，但新的挑战即将来临',
                '一切尘埃落定，主角踏上新的旅程',
                '正义得到伸张，但代价令人唏嘘',
                '故事结束，却留下无尽回味'
            ]
        };
        return endings[category] || endings.general;
    },

    generateTitle(typeInfo, concept) {
        const prefixes = ['The', 'My', 'Her', 'His', 'Secret', 'Lost', 'Forbidden', 'Eternal'];
        const suffixes = ['Love', 'Night', 'Promise', 'Revenge', 'Identity', 'Truth', 'Destiny', 'Secret'];

        if (typeInfo.category === 'female') {
            return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${typeInfo.nameEn.split('/')[0]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
        } else if (typeInfo.category === 'male') {
            return `The ${typeInfo.nameEn.split('/')[0]}: Rise of Power`;
        } else {
            return `The ${typeInfo.nameEn.split('/')[0]}`;
        }
    },

    generateHook(typeInfo) {
        const hooks = typeInfo.hookPatterns || ['惊人转折', '身份揭露', '危机降临'];
        return hooks[Math.floor(Math.random() * hooks.length)];
    },

    generateHighlights(typeInfo) {
        const count = 3;
        const highlights = [];

        if (typeInfo.romanceScenes) {
            highlights.push(...typeInfo.romanceScenes.slice(0, 2));
        }
        if (typeInfo.faceSlapScenes) {
            highlights.push(...typeInfo.faceSlapScenes.slice(0, 2));
        }
        if (typeInfo.conflicts) {
            highlights.push(...typeInfo.conflicts.slice(0, 2));
        }

        // 随机选择
        const selected = [];
        while (selected.length < count && highlights.length > 0) {
            const idx = Math.floor(Math.random() * highlights.length);
            const item = highlights.splice(idx, 1)[0];
            if (!selected.includes(item)) {
                selected.push(item);
            }
        }

        return selected;
    }
};

// ===== 导出 =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DRAMA_TYPES, SCRIPT_TEMPLATES, IDEA_GENERATOR };
}
