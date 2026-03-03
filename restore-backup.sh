#!/bin/bash
# 一键恢复备份脚本

echo "可用的备份文件："
ls -1t js/*.backup-* 2>/dev/null | head -5 | nl

echo ""
echo "输入编号恢复 (1-5)，或按Ctrl+C取消:"
read num

file=$(ls -1t js/*.backup-* 2>/dev/null | head -5 | sed -n "${num}p")

if [ -n "$file" ]; then
    cp "$file" js/ai-service.js
    echo "✅ 已恢复: $file"
    echo "请刷新浏览器查看效果"
else
    echo "❌ 无效选择"
fi
