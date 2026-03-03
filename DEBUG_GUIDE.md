# AI创意生成功能诊断指南

## 问题描述
用户报告：每次点击进入创意讨论时，创意看起来都一样，不像AI生成的。

## 可能原因
1. **OpenRouter API额度用完** → 返回403错误，系统自动回退到模板生成
2. **API Key无效** → 认证失败，无法调用AI服务
3. **网络问题** → 请求失败，使用模板作为回退
4. **AI服务未正确初始化** → window.aiService未绑定到全局

## 已实施的改进

### 1. 增强日志记录 (js/ui.js)
- 添加了详细的控制台日志，显示AI服务状态检查过程
- 显示window.aiService是否存在、isAvailable()返回值、API_KEY长度等
- 使用彩色日志便于识别：[创意生成]、[AI服务]

### 2. 增强API调用日志 (js/ai-service.js)
- 记录API请求URL、使用的模型、temperature设置
- 显示API响应状态码和状态文本
- 记录AI原始响应内容，便于检查问题
- 显示解析后的创意数量和详情

### 3. 用户通知系统 (js/ui.js)
- 新增了`showNotification(message, type)`方法
- 当AI服务不可用时，显示警告通知
- 当成功生成AI创意时，显示成功通知
- 通知类型：success(绿色)、error(红色)、warning(橙色)、info(蓝色)

### 4. 诊断脚本 (test-ai.js)
- 创建了浏览器控制台诊断脚本
- 可以检查window.aiService状态、测试API连接

## 测试步骤

### 步骤1：打开浏览器控制台
1. 在浏览器中打开项目页面
2. 按F12打开开发者工具
3. 切换到"Console"（控制台）标签

### 步骤2：选择剧集类型
1. 选择"女频" → "霸道总裁爱上我"
2. 点击"第一步：创意讨论"进入创意生成页面

### 步骤3：点击生成按钮
1. 点击"AI生成5个创意"按钮
2. 观察控制台日志输出（应该有详细的彩色日志）

### 步骤4：查看通知
- 如果看到**绿色通知**"✅ 成功生成5个AI创意！" → AI工作正常
- 如果看到**橙色通知**"AI服务暂不可用，使用模板生成创意" → API有问题，查看控制台错误

### 步骤5：检查控制台输出
正常情况应该看到：
```
[创意生成] 开始生成流程
[创意生成] 检查AI服务状态:
  - window.aiService存在: true
  - window.aiService.isAvailable(): true
[创意生成] ✅ AI服务可用，准备调用AI生成创意...
[AI服务] 调用API生成5个创意...
[AI服务] API响应状态: 200 OK
[AI服务] 解析后的创意数量: 5
[创意生成] ✅ 成功生成5个创意（AI）
[创意生成] 创意标题: Tech CEO Romance, Wall Street Love, ...
```

## 常见问题解决

### 问题：API响应403错误
**原因**：OpenRouter额度用完或API Key无效

**解决**：
1. 访问 https://openrouter.ai/credits 检查额度
2. 如果需要充值，添加新的支付方式
3. 或者在js/ai-service.js第11行更新API Key：
```javascript
this.API_KEY = '你的新APIKey';
```

### 问题：window.aiService不存在
**原因**：ai-service.js未正确加载

**解决**：
1. 检查浏览器控制台是否有加载错误
2. 刷新页面重试
3. 检查ai-service.js文件路径是否正确

### 问题：生成的创意看起来还是相似
**原因**：
1. 查看控制台确认是否真的使用了AI（还是模板回退）
2. 如果确实是AI生成的，可能是temperature设置不够高
3. 可以在js/ai-service.js第469行调整：
```javascript
temperature: 0.95, // 提高到0.95增加随机性
```

## 手动运行诊断

在浏览器控制台中运行以下代码：

```javascript
// 加载诊断脚本
const script = document.createElement('script');
script.src = 'test-ai.js';
document.head.appendChild(script);
```

或者手动运行诊断：

```javascript
console.log('=== AI创意生成诊断 ===');
console.log('window.aiService存在:', !!window.aiService);
console.log('isAvailable:', window.aiService?.isAvailable?.());

// 测试API连接
window.aiService?.testConnection?.().then(result => {
    console.log('API连接测试结果:', result);
});
```

## 预期结果

当AI正常工作时，生成的5个创意应该：
1. **基于不同职业背景**：
   - Tech CEO（科技公司CEO）
   - Investment Banker（投资银行总裁）
   - Real Estate Tycoon（房地产大亨）
   - Fashion Brand Founder（时尚品牌创始人）
   - Hotel Group Heir（酒店集团继承人）

2. **标题不同**：每个创意有独特的英文标题
3. **概念不同**：每个创意的核心设定一句话描述不同
4. **梗概不同**：每个创意的故事梗概详细描述不同

如果所有创意都长得一样，说明**正在使用模板而非AI生成**。

## 联系支持

如果以上步骤无法解决问题，请：
1. 复制浏览器控制台的所有日志输出
2. 截图通知消息
3. 提供使用的浏览器版本信息
