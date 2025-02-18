import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, List, Underline as UnderlineIcon } from 'lucide-react';

export const RichTextEditor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline
    ],
    content: '<p>Start typing here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <p className='font-bold mb-10 flex justify-center text-lg'>Rich Text Editor</p>
        <div className="flex gap-2">
          <button
          title='bold'
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <Bold size={20} />
          </button>
          <button
          title='italic'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <Italic size={20} />
          </button>
          <button
          title='underline'
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded ${editor.isActive('underline') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <UnderlineIcon size={20} />
          </button>
          <button
          title='bulletList'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} className="min-h-[200px]" />
    </div>
  );
};