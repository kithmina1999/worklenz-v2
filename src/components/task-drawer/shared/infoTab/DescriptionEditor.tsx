// DescriptionEditor.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DOMPurify from 'dompurify';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useSocket } from '@/socket/socketContext';
import { SocketEvents } from '@/shared/socket-events';

interface DescriptionEditorProps {
  description: string | null;
  taskId: string;
  parentTaskId: string | null;
}

const DescriptionEditor = ({ description, taskId, parentTaskId }: DescriptionEditorProps) => {
  const { socket, connected } = useSocket();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>(description || '');
  const [isEditorLoading, setIsEditorLoading] = useState<boolean>(false);
  const editorRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const themeMode = useAppSelector(state => state.themeReducer.mode);

  // Preload TinyMCE script
  useEffect(() => {
    const preloadTinyMCE = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = '/tinymce/tinymce.min.js';
      link.as = 'script';
      document.head.appendChild(link);
    };
    
    preloadTinyMCE();
  }, []);

  const handleDescriptionChange = () => {
    if (!taskId) return;
    socket?.emit(SocketEvents.TASK_DESCRIPTION_CHANGE.toString(), JSON.stringify({
      task_id: taskId,
      description: content || null,
      parent_task: parentTaskId,
    }));
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickedOutside = wrapperRef.current && !wrapperRef.current.contains(event.target as Node);
      const isClickedOutsideEditor = !document.querySelector('.tox-tinymce')?.contains(event.target as Node);
      
      // Only save and close if the editor is actually open
      if (isEditorOpen && isClickedOutside && isClickedOutsideEditor) {
        // Check if content has changed before saving
        if (content !== description) {
          handleDescriptionChange();
        }
        setIsEditorOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditorOpen, content, description]);

  const handleEditorChange = (content: string) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    setContent(sanitizedContent);
  };

  const handleInit = (evt: any, editor: any) => {
    editorRef.current = editor;
    editor.on('focus', () => setIsEditorOpen(true));
    setIsEditorLoading(false);
  };

  const handleOpenEditor = () => {
    setIsEditorOpen(true);
    setIsEditorLoading(true);
  };

  const darkModeStyles = themeMode === 'dark' ? `
    body { 
      background-color: #1e1e1e !important;
      color: #ffffff !important;
    }
    body.mce-content-body[data-mce-placeholder]:not([contenteditable="false"]):before {
      color: #666666 !important;
    }
  ` : '';

  return (
    <div ref={wrapperRef}>
      {isEditorOpen ? (
        <div style={{ 
          minHeight: '200px',
          backgroundColor: themeMode === 'dark' ? '#1e1e1e' : '#ffffff' 
        }}>
          {isEditorLoading && (
            <div style={{
              position: 'absolute',
              zIndex: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '200px',
              backgroundColor: themeMode === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              color: themeMode === 'dark' ? '#ffffff' : '#000000'
            }}>
              <div>Loading editor...</div>
            </div>
          )}
          <Editor
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            value={content}
            onInit={handleInit}
            licenseKey="gpl"
            init={{
              height: 200,
              menubar: false,
              branding: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: `
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
                  font-size: 14px;
                }
                ${darkModeStyles}
              `,
              skin: themeMode === 'dark' ? 'oxide-dark' : 'oxide',
              content_css: themeMode === 'dark' ? 'dark' : 'default',
              skin_url: `/tinymce/skins/ui/${themeMode === 'dark' ? 'oxide-dark' : 'oxide'}`,
              content_css_cors: true,
              auto_focus: true,
              init_instance_callback: (editor) => {
                // Set initial background color
                editor.dom.setStyle(editor.getBody(), 'backgroundColor', themeMode === 'dark' ? '#1e1e1e' : '#ffffff');
              }
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
      ) : (
        <div 
          onClick={handleOpenEditor}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            minHeight: '32px', 
            padding: '4px 11px',
            border: `1px solid ${isHovered ? (themeMode === 'dark' ? '#177ddc' : '#40a9ff') : 'transparent'}`,
            borderRadius: '6px',
            cursor: 'pointer',
            color: themeMode === 'dark' ? '#ffffff' : '#000000',
            transition: 'border-color 0.3s ease'
          }}
        >
          {content ? (
            <div 
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
              style={{ color: 'inherit' }}
            />
          ) : (
            <span style={{ color: themeMode === 'dark' ? '#666666' : '#bfbfbf' }}>
              Add a more detailed description...
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default DescriptionEditor;
