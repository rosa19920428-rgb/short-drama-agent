# Kimi API Key 设置详细教程

## 概述

完成这个设置只需要 **3分钟**，之后你的网站就能自动使用AI功能了。

## 第一步：获取你的API Key（1-2分钟）

### 1.1 访问 Moonshot 控制台
打开浏览器，访问：
```
https://platform.moonshot.cn/
```

### 1.2 登录账号
- 如果你已经有Kimi账号，直接登录
- 如果没有，需要先注册（手机号即可）

### 1.3 进入API Key管理页面
登录后，在页面上找到：
- **"API Key 管理"** 或 **"API Keys"** 按钮
- 通常位于页面右上角或左侧菜单

### 1.4 创建新的API Key
1. 点击 **"新建"** 或 **"创建 API Key"** 按钮
2. 给这个Key起个名字（例如："剧本生成器"）
3. 点击 **"创建"**

### 1.5 复制API Key
**⚠️ 重要**：创建成功后立即复制！

你会看到类似这样的字符串：
```
sk-abc123def456ghi789jkl012mnop345qrst
```

**注意**：
- 必须以 `sk-` 开头
- 总共大约30-40个字符
- **只显示一次**，关掉页面就找不到了！

如果不小心关了，没关系，可以删除重新创建一个。

---

## 第二步：将API Key添加到代码中（30秒）

### 2.1 打开文件
在VS Code中找到并打开：
```
js/ai-service.js
```

### 2.2 找到要修改的位置
看文件的第7-12行，你会看到：

```javascript
constructor() {
    // Kimi API配置 - 预置内置密钥
    // ⚠️ 重要：将你的Kimi API Key粘贴到下方引号中
    // 从 https://platform.moonshot.cn/ 获取你的API Key（以 sk- 开头）
    this.API_KEY = ''; // ← 在这里粘贴你的API Key，例如：'sk-your-actual-api-key-here'
```

### 2.3 粘贴你的API Key
将第10行的空字符串 `''` 替换为你的真实API Key。

**修改前**：
```javascript
    this.API_KEY = ''; // ← 在这里粘贴你的API Key
```

**修改后**（示例）：
```javascript
    this.API_KEY = 'sk-abc123def456ghi789jkl012mnop345qrst';
```

**注意**：
- 保留两边的单引号 `'`
- 确保Key完整，没有多余的空格
- 不要把Key贴到注释里（以 // 开头的是注释）

### 2.4 保存文件
按 `Ctrl+S`（Windows）或 `Cmd+S`（Mac）保存。

---

## 第三步：设置使用限额（30秒，强烈建议）

为了防止意外超支，建议设置使用上限。

### 3.1 在Moonshot控制台找到
- **"用量管理"** 或 **"额度管理"**

### 3.2 设置月度限额
建议设置为：**20元**（或你能接受的最高金额）

这样即使有人刷你的API，损失也有限。

---

## 第四步：测试是否成功（1分钟）

### 4.1 在浏览器中打开网站
在VS Code中右键点击 `index.html`，选择：
- **"Open with Live Server"**（如果你安装了Live Server插件）
- 或者直接在浏览器中打开文件

### 4.2 输入密码
你应该看到密码输入界面，输入：
```
drama2024
```

点击"进入系统"。

### 4.3 测试AI功能
1. 点击"开始创作"或进入工作台
2. 选择任意类型（例如：男频爽剧 → 逆袭打脸）
3. 生成创意
4. 添加角色
5. 点击"生成分集大纲"

**观察加载提示**：
- 如果看到 **"🤖 AI正在生成高质量大纲..."** → ✅ 成功！正在使用AI
- 如果看到 **"正在生成分集大纲（模板模式）..."** → ❌ API Key可能设置错误

### 4.4 检查浏览器控制台
按 `F12` 打开开发者工具，查看Console（控制台）标签：

**成功消息**：
```
✅ 应用已解锁，AI服务已就绪
使用Kimi AI生成大纲...
```

**错误消息**：
```
✗ API调用失败: 401 Unauthorized  → Key错误或未激活
✗ API调用失败: 429 Rate Limit   → 请求太频繁
```

---

## 常见问题解决

### 问题1：提示"API Key格式错误"
**原因**：Key不是以 `sk-` 开头
**解决**：
- 确认复制的是完整的Key
- 检查是否有多余的空格

### 问题2：提示"连接失败"或"401 Unauthorized"
**原因**：Key无效或未激活
**解决**：
1. 检查Key是否完整（不要漏字符）
2. 检查Kimi账户是否有余额（新账号可能有免费额度）
3. 重新创建一个新的API Key试试

### 问题3：AI生成很慢或卡住
**正常情况**：
- AI生成通常需要10-20秒
- 50集大纲可能需要30秒

**如果超过1分钟**：
1. 检查网络连接
2. 刷新页面重试
3. 查看控制台是否有错误

### 问题4：想确认API Key是否正确填入
**方法**：在代码中加一行调试

打开 `js/ai-service.js`，在第11行（API Key下面）添加：
```javascript
constructor() {
    this.API_KEY = '你的Key';
    console.log('API Key长度:', this.API_KEY.length);  // 添加这行
    console.log('API Key前10位:', this.API_KEY.substring(0, 10));  // 添加这行
```

然后刷新网页，按F12看控制台输出：
```
API Key长度: 35
API Key前10位: sk-abc123d
```

如果能看到这些，说明Key已经正确填入。

---

## 完整修改示例

### 修改前的文件（js/ai-service.js）
```javascript
class AIService {
    constructor() {
        // Kimi API配置 - 预置内置密钥
        // ⚠️ 重要：将你的Kimi API Key粘贴到下方引号中
        // 从 https://platform.moonshot.cn/ 获取你的API Key（以 sk- 开头）
        this.API_KEY = ''; // ← 在这里粘贴你的API Key

        this.API_URL = 'https://api.moonshot.cn/v1/chat/completions';
        this.MODEL = 'kimi-latest';

        // 备用方案：如果Kimi失败，回退到模板
        this.useAI = true;
    }
```

### 修改后的文件（js/ai-service.js）
```javascript
class AIService {
    constructor() {
        // Kimi API配置 - 预置内置密钥
        // ⚠️ 重要：将你的Kimi API Key粘贴到下方引号中
        // 从 https://platform.moonshot.cn/ 获取你的API Key（以 sk- 开头）
        this.API_KEY = 'sk-abc123def456ghi789jkl012mnop345qrst';

        this.API_URL = 'https://api.moonshot.cn/v1/chat/completions';
        this.MODEL = 'kimi-latest';

        // 备用方案：如果Kimi失败，回退到模板
        this.useAI = true;
    }
```

---

## 检查清单

设置完成后，确认：

- [ ] 已从 https://platform.moonshot.cn/ 复制API Key
- [ ] 已将API Key粘贴到 `js/ai-service.js` 第10行
- [ ] 已保存文件（Ctrl+S / Cmd+S）
- [ ] 已在浏览器中打开网页
- [ ] 已输入密码进入系统
- [ ] 已测试生成大纲，看到"AI正在生成"提示
- [ ] （可选）已在Moonshot控制台设置使用限额

---

## 下一步

设置完成后，你可以：

1. **修改访问密码**（打开 `js/ui.js` 第15行）
2. **部署到网上**（使用GitHub Pages/Vercel等免费服务）
3. **分享给朋友**（给他们链接 + 密码）

需要我教你部署到网上的步骤吗？
