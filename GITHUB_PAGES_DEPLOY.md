# GitHub Pages 部署教程（2-3人共用API Key）

## 🎯 部署前准备

### 你需要：
1. GitHub账号（免费注册：https://github.com）
2. 你的项目文件（当前文件夹）
3. 10分钟时间

### 预估API额度消耗（2-3人使用）：
- **生成5个创意**：约 0.05-0.1 美元
- **生成40集大纲**：约 0.5-1 美元
- **生成完整剧本**：约 2-5 美元
- **总计一个项目**：约 3-6 美元

**OpenRouter免费额度通常有1-5美元，建议：**
- 先试用，如果额度用完再充值（充值10美元可以用很久）
- 或者让同事自己注册OpenRouter账号（免费）

---

## 🚀 部署步骤（图文）

### 第一步：创建GitHub仓库

1. 访问 https://github.com 并登录
2. 点击右上角 **+** 号 → **New repository**
3. 填写信息：
   - Repository name: `short-drama-agent`（或任意名称）
   - Description: `竖屏短剧剧本生成器`（可选）
   - 选择 **Public**（公开）或 **Private**（私有）
     - 建议选Public，GitHub Pages对Public免费
   - 勾选 **Add a README file**
4. 点击 **Create repository**

---

### 第二步：上传文件

**方式A：网页上传（简单，适合小文件）**

1. 在新创建的仓库页面，点击 **uploading an existing file**
2. 拖拽或选择你的项目文件：
   - index.html
   - js/文件夹（包含ai-service.js, ui.js, engine.js, types.js）
   - css/文件夹（包含styles.css）
3. 等待上传完成
4. 点击 **Commit changes**

**方式B：Git命令行（推荐，适合完整上传）**

```bash
# 在项目文件夹中打开终端
cd /Users/Rosa/short-drama-script-agent

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 连接到你的GitHub仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/short-drama-agent.git

# 推送
git push -u origin main
```

---

### 第三步：开启GitHub Pages

1. 在仓库页面，点击 **Settings**（顶部标签）
2. 左侧菜单点击 **Pages**
3. **Source** 部分：
   - 选择 **Deploy from a branch**
   - Branch 选择 **main**（或master）
   - 文件夹选择 **/(root)**
   - 点击 **Save**
4. 等待1-2分钟
5. 页面会显示：**Your site is published at https://你的用户名.github.io/short-drama-agent/**

✅ **这就是你的网站链接！**

---

### 第四步：测试网站

1. 打开链接：`https://你的用户名.github.io/short-drama-agent/`
2. 输入密码：`drama2024`
3. 测试生成创意功能
4. 如果一切正常，就可以分享给同事了！

---

## 🔒 安全建议（2-3人共用）

### API Key保护

**当前情况：**
- API Key在 `js/ai-service.js` 第11行
- 部署后任何人查看源代码都能看到Key
- 但只有你分享的链接和密码给同事，外人不知道链接就不会用

**加强保护（可选）：**

#### 方案1：简单密码保护（当前已有）
- 已有密码：`drama2024`
- 告诉同事不要外传链接和密码
- **适用**：小团队内部，信任度较高

#### 方案2：添加HTTP Basic Auth（更安全）
如果担心链接被泄露，可以添加浏览器级别的密码：

1. 在项目根目录创建 `_config.yml` 文件
2. 内容如下：
```yaml
plugins:
  - jekyll-auth
```

或者使用Netlify（另一个免费托管）提供内置密码保护：

---

## 📊 额度监控和管理

### 如何查看剩余额度

1. 访问 https://openrouter.ai/credits
2. 登录你的账号
3. 查看剩余额度和使用历史

### 额度用完怎么办

**选项A：充值（推荐，最稳定）**
- 在OpenRouter网站点击 "Add Credits"
- 支持信用卡，最低充值5-10美元
- 2-3人轻度使用，10美元可以用几个月

**选项B：让同事自己注册账号**
- 每个同事注册OpenRouter（免费额度1-5美元）
- 在网站设置页面添加"API Key配置"功能（需要开发）
- 每个用户输入自己的Key

**选项C：切换到DeepSeek（国内免费）**
- 修改 `js/ai-service.js` 第12-13行：
```javascript
this.API_URL = 'https://api.deepseek.com/v1/chat/completions';
this.MODEL = 'deepseek-chat';
```
- DeepSeek有免费额度，国内访问快

---

## 🛠️ 更新网站（后续修改）

如果后续修改了代码，如何更新在线网站：

### 网页上传方式
1. 在GitHub仓库页面点击 **Add file** → **Upload files**
2. 上传修改后的文件（覆盖原文件）
3. 点击 **Commit changes**
4. 等待1-2分钟自动部署

### Git命令行方式
```bash
cd /Users/Rosa/short-drama-script-agent
git add .
git commit -m "更新说明"
git push
```

**GitHub Pages会自动重新部署！**

---

## 📱 分享给同事

部署完成后，发送给同事的信息模板：

```
🎉 竖屏短剧剧本生成器已上线！

🔗 网站链接：https://你的用户名.github.io/short-drama-agent/
🔑 访问密码：drama2024

📖 使用说明：
1. 打开链接，输入密码
2. 选择"女频"→"霸道总裁爱上我"
3. 点击"AI生成5个创意"
4. 选择喜欢的创意，编辑完善
5. 进入角色设计→生成大纲→生成剧本
6. 导出Word或PDF

⚠️ 注意：
- 数据保存在你的浏览器，换电脑/清缓存会丢失
- 建议及时导出剧本保存
- 网站由GitHub托管，全球访问都很快

有问题随时问我！
```

---

## 🐛 常见问题

### 问题1：网站打开是404
**解决**：
- 确认GitHub Pages设置正确（Settings → Pages）
- 确认index.html在仓库根目录
- 等待2-3分钟再刷新

### 问题2：API调用失败（403错误）
**原因**：OpenRouter额度用完或Key被封
**解决**：
- 登录OpenRouter查看额度
- 充值或更换API Key

### 问题3：修改后网站没更新
**解决**：
- GitHub Pages有缓存，等待2-3分钟
- 强制刷新：Ctrl+F5（Windows）或 Cmd+Shift+R（Mac）
- 清除浏览器缓存

### 问题4：同事打不开链接
**解决**：
- 确认链接格式正确（https://用户名.github.io/仓库名/）
- GitHub在国内可能偶尔被墙，建议用科学上网
- 或者部署到Netlify（国内访问更稳定）

---

## 💡 备选方案：Netlify部署（国内访问更快）

如果GitHub Pages访问慢，可以用Netlify：

1. 访问 https://www.netlify.com/
2. 用GitHub账号登录
3. 点击 **Add new site** → **Import an existing project**
4. 选择你的GitHub仓库
5. 点击 **Deploy site**
6. 获得 `xxx.netlify.app` 链接
7. 国内访问速度比GitHub Pages快

---

## ✅ 部署检查清单

- [ ] 创建GitHub仓库
- [ ] 上传所有文件
- [ ] 开启GitHub Pages
- [ ] 获得在线链接
- [ ] 测试网站功能正常
- [ ] 测试密码保护有效
- [ ] 发送链接和密码给同事
- [ ] （可选）监控API额度使用情况

---

**需要我一步步指导你操作吗？或者你操作过程中遇到问题随时告诉我！** 🚀
