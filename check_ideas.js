// 测试解析函数的诊断脚本
const fs = require('fs');

// 读取ai-service.js中的解析函数部分
const content = fs.readFileSync('js/ai-service.js', 'utf8');

// 查找parseCreativeIdeas函数
const match = content.match(/parseCreativeIdeas\(content\) \{([\s\S]*?)\n    \}/);
if (match) {
    console.log('找到解析函数');
    console.log('函数长度:', match[0].length);
    
    // 检查关键逻辑
    const hasSynopsisParsing = match[0].includes('_parsingSynopsis');
    const hasIdeaStartMatch = match[0].includes('ideaStartMatch');
    const hasTitleMatch = match[0].includes('标题');
    
    console.log('\n关键逻辑检查:');
    console.log('- 多行梗概解析 (_parsingSynopsis):', hasSynopsisParsing ? '✅' : '❌');
    console.log('- 创意开始识别 (ideaStartMatch):', hasIdeaStartMatch ? '✅' : '❌');
    console.log('- 标题字段识别 (标题):', hasTitleMatch ? '✅' : '❌');
}
