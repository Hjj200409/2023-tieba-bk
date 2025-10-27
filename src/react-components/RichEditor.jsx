import React, { useState } from 'react';
import './RichEditor.css';

const RichEditor = ({ value = '', onChange, config = {} }) => {
  const [editorContent, setEditorContent] = useState(value);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setEditorContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  const handleFormat = (formatType) => {
    // 简化的格式化处理，实际项目中可以使用更复杂的富文本编辑器库
    let newContent = editorContent;
    
    switch (formatType) {
      case 'bold':
        newContent = `<strong>${editorContent}</strong>`;
        break;
      case 'italic':
        newContent = `<em>${editorContent}</em>`;
        break;
      case 'underline':
        newContent = `<u>${editorContent}</u>`;
        break;
      case 'link':
        const url = prompt('请输入链接地址:');
        if (url) {
          newContent = `<a href="${url}" target="_blank">${editorContent}</a>`;
        }
        break;
      case 'image':
        const imgUrl = prompt('请输入图片地址:');
        if (imgUrl) {
          newContent = editorContent + `<img src="${imgUrl}" alt="图片" style="max-width:100%">`;
        }
        break;
      default:
        break;
    }
    
    setEditorContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  return (
    <div className="rich-editor">
      {/* 工具栏 */}
      <div className="editor-toolbar">
        <button onClick={() => handleFormat('bold')} title="加粗">
          <strong>B</strong>
        </button>
        <button onClick={() => handleFormat('italic')} title="斜体">
          <em>I</em>
        </button>
        <button onClick={() => handleFormat('underline')} title="下划线">
          <u>U</u>
        </button>
        <button onClick={() => handleFormat('link')} title="插入链接">
          🔗
        </button>
        <button onClick={() => handleFormat('image')} title="插入图片">
          🖼️
        </button>
        <span className="separator">|</span>
        <button onClick={() => handleFormat('h1')} title="标题1">H1</button>
        <button onClick={() => handleFormat('h2')} title="标题2">H2</button>
        <button onClick={() => handleFormat('h3')} title="标题3">H3</button>
      </div>
      
      {/* 编辑区域 */}
      <div className="editor-container">
        <textarea
          className="editor-textarea"
          value={editorContent}
          onChange={handleChange}
          placeholder="请输入帖子内容..."
          rows={10}
        />
      </div>
      
      {/* 预览区域 */}
      <div className="preview-container">
        <h4>预览:</h4>
        <div 
          className="preview-content" 
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
      </div>
    </div>
  );
};

export default RichEditor;