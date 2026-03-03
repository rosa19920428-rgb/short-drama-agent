# Kimi AI 集成指南

## 概述

已成功集成Kimi AI (Moonshot AI) 到短剧剧本生成器！现在你可以选择使用AI生成高质量大纲，或继续使用本地模板。

## 新功能

### 1. AI配置界面
- 点击右上角 **"AI配置"** 按钮
- 输入你的Kimi API Key（从 https://platform.moonshot.cn/ 获取）
- 点击"保存并测试连接"
- 连接成功后，AI图标会变为 🟢

### 2. 智能生成
- **配置AI后**：大纲将由Kimi AI生成，质量更高、更专业
- **未配置AI**：自动回退到本地模板生成

### 3. 双重保障
- AI生成失败时，自动提示使用模板生成
- 随时可以重新配置或更换API Key

## AI vs 模板对比

| 特性 | AI生成 (Kimi) | 模板生成 |
|------|---------------|----------|
| 剧情创意 | 丰富多变，每集不同 | 基于固定套路 |
| 场景细节 | 具体场景+动作+对话 | 概要描述 |
| 爽点设置 | 智能分布，符合短剧节奏 | 固定位置 |
| 角色一致性 | 自动保持角色人设 | 需要手动确保 |
| 生成速度 | 10-20秒 | 即时 |
| 可用性 | 需要API Key | 随时可用 |

## 如何修改AI生成内容

### 修改Prompt（最简单）
编辑 `js/ai-service.js` 中的 `buildPrompt()` 方法：

```javascript
buildPrompt(project) {
    return `请生成${episodes}集短剧大纲...

【特殊要求】
- 男频重点：升级打脸、身份暴露
- 每集至少3个爽点  ← 改这个数字即可调整密度
- 第10-12集：必须是重大危机`;
}
```

### 修改解析逻辑
编辑 `js/ai-service.js` 中的 `parseOutline()` 方法，调整如何从AI响应中提取数据。

### 修改生成参数
```javascript
// 在 generateOutline 方法中
body: JSON.stringify({
    model: this.MODEL,
    messages: [...],
    temperature: 0.8,  // 创意度（0-2，越高越随机）
    max_tokens: 8000   // 最大生成长度
})
```

## 为什么AI集成后更容易修改

### 以前（模板方式）
想增加"每集3个爽点" → 需要：
1. 修改 `js/engine.js` 中的剧情生成算法
2. 重新设计数据结构
3. 测试所有剧情分支
4. 确保不破坏其他类型

### 现在（AI方式）
想增加"每集3个爽点" → 只需要：
1. 打开 `js/ai-service.js`
2. 找到 buildPrompt 方法
3. 改一行文字：`每集至少3个爽点`
4. 保存，立即生效

**Prompt即代码** - 你不需要是程序员，只需要会描述需求。

## 技术架构

```
用户界面 (UI)
    ↓
UI控制器 (js/ui.js) ← 你主要在这里添加功能
    ↓
AI服务层 (js/ai-service.js) ← 改Prompt在这里
    ↓
Kimi API (Moonshot AI)
```

### 关键文件

- `js/ai-service.js` - AI服务，负责调用API和解析响应
- `js/ui.js` - UI控制器，已添加AI配置和生成逻辑
- `index.html` - 添加了AI配置界面
- `css/styles.css` - 添加了AI配置样式

## API Key安全性

- API Key仅存储在浏览器本地存储 (localStorage)
- 不会上传到任何服务器
- 仅用于直接调用Kimi API
- 建议定期更换API Key

## 故障排除

### AI连接失败
1. 检查API Key是否正确（以`sk-`开头）
2. 检查网络连接
3. 查看浏览器控制台(F12)的错误信息
4. 确认Kimi账户有可用额度

### AI生成质量不佳
1. 在 `buildPrompt()` 中添加更详细的示例
2. 调整 `temperature` 参数（降低则更稳定）
3. 在 `parseOutline()` 中优化解析逻辑
4. 考虑使用更强的模型（如 `kimi-k2.5-32k`）

### 生成很慢
- AI生成通常需要10-20秒
- 集数越多，时间越长
- 可以在 `buildPrompt()` 中要求"精简生成"来提速

## 下一步建议

1. **获取Kimi API Key**：访问 https://platform.moonshot.cn/
2. **测试生成**：创建一个项目，看看AI生成的大纲质量
3. **调整Prompt**：根据你的喜好修改 `buildPrompt()`
4. **添加更多AI功能**：如AI辅助角色设计、AI剧本润色等

## 示例：快速修改大纲风格

想让AI生成更幽默的风格？

**步骤1**: 打开 `js/ai-service.js`
**步骤2**: 找到 `buildPrompt` 中的系统提示词
**步骤3**: 修改这一行：

```javascript
// 从：
content: '你是专业的竖屏短剧编剧...'

// 改成：
content: '你是专业的竖屏短剧编剧，擅长创作幽默搞笑...'
```

**步骤4**: 在格式要求中添加：
```javascript
【风格要求】
- 对话要幽默风趣
- 每集至少2个笑点
- 反派要有喜剧色彩
```

完成！无需重启，下次生成时自动生效。

---

**总结**: AI集成不是让系统变复杂，而是让系统变简单。你现在拥有一个可以用"自然语言"控制的剧本生成器！