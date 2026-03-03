# 角色生成修复说明

## 修复日期
2026-03-03

## 问题现象
- 主角（protagonist）空白
- 其他角色顺延
- 例如：第1个角色为空，第2个角色显示在主角位置

## 根本原因
AI返回的响应格式不统一，可能包含：
1. 说明性文字（被误认为角色段落）
2. 数字编号（如"1. "）未被正确处理
3. 第一个有效段落不是主角

## 修复措施

### 1. 段落过滤（line 212-229）
过滤掉非角色段落，只保留：
- 以英文名字开头的段落（如"Sophia..."）
- 以中文名字开头的段落（如"Sophia..."）
- 包含角色标识符的段落（如"身份"、"Role"、"年龄"、"Age"）

### 2. 名字清理（line 243-246）
移除常见前缀，提取干净名字：
- 移除数字编号：`1. `、`2. `等
- 移除角色标签：`主角：`、`角色：`、`恋爱对象：`等
- 移除括号内容：`（主角）`等

### 3. 严格验证（line 285-289）
如果第一个角色不是protagonist或无效，直接返回全部默认角色：
```javascript
if (characters.length === 0 ||
    !characters[0] ||
    characters[0].role !== 'protagonist' ||
    !characters[0].name ||
    characters[0].name.length < 2) {
    console.error('[角色解析] 主角无效或缺失，使用全部默认角色');
    return this.getDefaultCharacters(category);
}
```

## 关键改进

### 过滤前
```
段落1: "以下是6个角色设定..." （说明文字，会被错误解析）
段落2: "1. Sophia（主角）..." （第一个角色，但被跳过）
```

### 过滤后
```
段落1: "1. Sophia（主角）..." （说明文字被过滤，保留真实角色）
段落2: "2. Alexander..."
```

### 名字清理
```
原始: "1. 主角：Sophia（女主角）"
清理后: "Sophia"
```

## 测试方法

### 正常测试
1. 进入角色设计步骤
2. 点击"AI生成全部角色"
3. 检查控制台日志：
   - `[角色解析] 有效角色段落: 6/6`（6个段落都有效）
   - `[角色解析] 第1个角色提取名称: "Sophia"`（第一个有名字）
   - `最终角色列表: ["protagonist: Sophia", ...]`（角色正确）

### 如果还有问题
打开控制台运行：
```javascript
DebugHelper.checkCharacters()
```

查看输出：
- 如果显示`❌ 缺失`，说明修复未生效
- 运行`DebugHelper.fixCharacters()`强制使用默认角色

## 影响范围

### 修改的文件
- `js/ai-service.js`：`parseCharacterResponse`方法

### 未修改的文件
- 所有其他文件保持不变

## 默认角色（备用）
如果AI解析失败，自动使用：
1. **主角**：Sophia Anderson（女）/ Ethan Williams（男）
2. **恋爱对象**：Alexander Knight（男）/ Emma Thompson（女）
3. **主要反派**：Victoria Sterling（女）/ Marcus Johnson（男）
4. **次要反派**：Marcus Reed（男）/ Catherine White（女）
5. **闺蜜/好友**：Lily Chen（女）/ James Wilson（男）
6. **喜剧角色**：James Miller（男）/ Olivia Davis（女）

## 预期效果
- 主角不再空白
- 角色顺序正确（主角→恋爱对象→反派→闺蜜→喜剧角色）
- 即使AI格式异常，也能返回有效角色
