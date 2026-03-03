// AI创意生成功能诊断脚本
// 在浏览器控制台中运行此代码来检查问题

console.log('=== AI创意生成诊断 ===\n');

// 1. 检查window.aiService是否存在
console.log('1. 检查window.aiService:');
console.log('   存在:', !!window.aiService);

if (window.aiService) {
    // 2. 检查isAvailable
    console.log('\n2. 检查服务可用性:');
    console.log('   isAvailable:', window.aiService.isAvailable());
    console.log('   useAI:', window.aiService.useAI);
    console.log('   API_KEY长度:', window.aiService.API_KEY?.length);
    console.log('   API_KEY前10位:', window.aiService.API_KEY?.substring(0, 10) + '...');

    // 3. 测试API连接
    console.log('\n3. 测试API连接:');
    window.aiService.testConnection().then(isWorking => {
        console.log('   API连接测试结果:', isWorking ? '✓ 正常' : '✗ 失败');

        if (!isWorking) {
            console.log('\n   ⚠️ 警告: API连接失败，将使用模板生成');
            console.log('   可能原因:');
            console.log('   - OpenRouter额度已用完');
            console.log('   - API Key无效');
            console.log('   - 网络连接问题');
        } else {
            console.log('\n   ✓ API连接正常，应该可以生成AI创意');
        }
    });
} else {
    console.log('\n   ✗ 错误: window.aiService不存在');
    console.log('   可能原因: ai-service.js未正确加载');
}

// 4. 检查IDEA_GENERATOR是否存在
console.log('\n4. 检查模板生成器:');
console.log('   IDEA_GENERATOR存在:', typeof IDEA_GENERATOR !== 'undefined');

// 5. 测试生成创意（使用当前设置）
console.log('\n5. 测试生成创意:');
if (window.app && window.app.selectedType) {
    console.log('   当前选择的类型:', window.app.selectedType);
    console.log('   请运行 app.generateIdeas() 来测试生成过程');
    console.log('   并观察控制台输出');
} else {
    console.log('   请先选择一个剧集类型');
}

console.log('\n=== 诊断完成 ===');
