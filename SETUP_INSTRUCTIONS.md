# 密码保护 + 内置AI配置指南

## 你现在拥有的系统

✅ **密码保护** - 任何人访问网站都需要输入密码
✅ **内置Kimi AI** - 用户不需要配置API Key，你预置好后大家都能用
✅ **双重验证** - 密码验证后才能使用AI功能

## 设置步骤（只需5分钟）

### 第一步：将你的Kimi API Key添加到代码中

1. 打开文件 `js/ai-service.js`
2. 找到第10行（constructor函数中）
3. 将你的API Key粘贴到引号中：

```javascript
// 修改前：
this.API_KEY = ''; // ← 在这里粘贴你的API Key

// 修改后（示例）：
this.API_KEY = 'sk-abc123def456ghi789'; // ← 在这里粘贴你的API Key
```

**如何获取API Key**：
- 访问 https://platform.moonshot.cn/
- 登录你的Kimi账号
- 创建新的API Key
- 复制以 `sk-` 开头的字符串

### 第二步：（可选）修改访问密码

1. 打开文件 `js/ui.js`
2. 找到第15行：

```javascript
ACCESS_PASSWORD: 'drama2024', // 修改这里来更改访问密码
```

3. 将 `'drama2024'` 改成你想要的密码，例如：

```javascript
ACCESS_PASSWORD: 'mysecret2024',
```

### 第三步：部署网站

现在你可以将网站部署到任何静态托管服务：

- **GitHub Pages**（免费）
- **Vercel**（免费）
- **Netlify**（免费）
- **Cloudflare Pages**（免费）
- **你自己的服务器**

## 分享网站给其他人

只需告诉他们：
1. **网站链接**：你的部署地址
2. **访问密码**：你在第二步设置的密码

他们打开网站后会看到密码输入界面：
- 输入正确密码 → 进入完整功能界面
- 输入错误密码 → 显示"密码错误，请重试"

不需要API Key，不需要任何配置，即开即用！

## 安全注意事项

### API Key安全
- ⚠️ **API Key现在嵌入在代码中**（js/ai-service.js）
- ⚠️ **任何能看到网页源代码的人都能看到你的API Key**
- ⚠️ **建议限制API Key的使用额度**（在Moonshot控制台设置）

### 增强安全性（可选）

如果你想更安全，可以：

#### 方案1：使用后端代理（推荐用于正式分享）
创建一个简单的后端服务来转发请求，这样API Key保存在服务器上。

#### 方案2：简单的代码混淆
在 `js/ai-service.js` 中添加简单的混淆：

```javascript
// 替换这行：
this.API_KEY = 'sk-your-key';

// 改成（示例）：
this.API_KEY = atob('c2steW91ci1rZXk='); // Base64编码后的Key
```

使用在线Base64编码工具：https://www.base64encode.org/

#### 方案3：定期更换
- 经常更换API Key
- 在Moonshot控制台监控使用量
- 设置使用上限（例如每月最多$10）

## 工作流程演示

```
用户访问网站
    ↓
🔒 密码输入界面
    ↓
输入正确密码
    ↓
进入剧本生成器
    ↓
选择类型 → 生成创意 → 创建角色 → 生成分集大纲
    ↓
AI自动生成高质量大纲（使用你的API Key）
    ↓
用户可以导出、保存、打印
```

## 故障排除

### 问题：提示"连接失败"
**解决**：
1. 检查 `js/ai-service.js` 中的API Key是否正确粘贴
2. 确保API Key以 `sk-` 开头
3. 检查Kimi账户是否有可用额度
4. 查看浏览器控制台(F12)获取详细错误信息

### 问题：忘记密码
**解决**：
1. 打开 `js/ui.js`
2. 找到 `ACCESS_PASSWORD`
3. 修改或查看当前密码

### 问题：想移除密码保护
**解决**：
1. 打开 `js/ui.js`
2. 找到 `showPasswordProtection()` 方法
3. 在方法开头添加：`this.unlockApp(); return;`

```javascript
showPasswordProtection() {
    this.unlockApp(); return; // 添加这行来跳过密码
    // ... 其余代码
}
```

### 问题：AI生成很慢
**正常**：
- AI生成通常需要10-30秒
- 集数越多时间越长
- 可以在 `js/ai-service.js` 的 `buildPrompt` 中减少集数要求

## 修改AI生成风格

像之前一样，编辑 `js/ai-service.js` 中的 `buildPrompt()` 方法：

```javascript
buildPrompt(project) {
    return `请生成${episodes}集短剧大纲...

    【特殊要求】
    - 每集至少5个爽点  ← 改这个数字
    - 对话要幽默搞笑   ← 添加风格要求
    - 反派要有喜剧色彩 ← 添加具体要求
    `;
}
```

## 总结

你现在的系统：

1. ✅ **密码保护** - 输入密码才能使用
2. ✅ **内置AI** - 用户无需配置，即开即用
3. ✅ **易于分享** - 只需给链接+密码
4. ✅ **随时修改** - 改Prompt即可调整生成风格

**最后提醒**：记得在Moonshot控制台设置API Key的使用上限，避免意外超支！
