# 修复测试指南

## 已修复的问题

### 1. 创意数量不足（只有2个）
**解决方案**：
- 添加详细日志查看AI实际返回内容
- 当AI返回创意少于5个时，自动使用5个默认创意补齐
- 默认创意符合玛丽苏霸道总裁套路，可直接使用

### 2. 主角空缺，其他角色顺延
**解决方案**：
- 添加文本预处理（移除特殊空格、BOM等）
- 添加详细日志追踪解析过程
- 如果主角无效，直接返回完整默认角色列表
- 确保6个角色都有有效名字

## 测试步骤

### 测试1：创意生成
1. 刷新浏览器（Ctrl+Shift+R 强制刷新）
2. 进入创意讨论步骤
3. 点击"AI生成5个创意"
4. 打开控制台（F12），查看日志
5. 检查是否显示5个创意

**期望的日志输出**：
```
[AI服务] 解析后的创意数量: 2      <- 如果AI只返回了2个
[AI服务] 创意不足5个(2个)，使用默认模板补齐
[AI服务] 解析完成，有效创意数量: 5  <- 最终应该有5个
```

**如果仍然只有2个**：
在控制台运行：
```javascript
DebugHelper.checkIdeas()
DebugHelper.fixIdeas()  // 强制重新生成
```

### 测试2：角色生成
1. 进入角色设计步骤
2. 点击"AI生成全部角色"
3. 打开控制台查看日志
4. 检查6个角色是否都有效

**期望的日志输出**：
```
[角色解析] 原始文本长度: 1234
[角色解析] 解析到的角色段落数: 6
[角色解析] 第1个角色: 段落行数=15
[角色解析] 第1个角色原始名称行: "Sophia Anderson"
[角色解析] 第1个角色提取名称: "Sophia Anderson"
...
最终角色列表: ["protagonist: Sophia", "love-interest: Alexander", ...]
```

**如果主角仍然空缺**：
在控制台运行：
```javascript
DebugHelper.checkCharacters()
DebugHelper.fixCharacters()  // 使用默认角色修复
```

## 紧急修复命令

如果以上都不奏效，在控制台运行：

```javascript
// 强制使用默认创意
app.generatedIdeas = window.aiService.getDefaultCreativeIdeas();
app.renderCreativeDiscussion();

// 强制使用默认角色
app.project.characters = window.aiService.getDefaultCharacters('female');
app.saveProject();
app.renderCharacterDesign();
```

## 如果还有问题

请复制控制台的所有日志给我，特别是：
1. `[AI服务]` 开头的日志
2. `[角色解析]` 开头的日志
3. `[创意解析]` 开头的日志

这样我可以精确定位问题所在。
