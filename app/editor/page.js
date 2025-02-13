'use client';
import { useEffect, useState } from 'react';
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnNumberedList,
  BtnRedo,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';
import sanitizeHtml from 'sanitize-html';

export default function App() {
  const [html, setHtml] = useState('');
  const [clean, setClean] = useState('');

  useEffect(() => {
    setClean(
      sanitizeHtml(html, {
        allowedTags: [
          'b',
          'i',
          'u',
          'h1',
          'h2',
          'h3',
          'div',
          'ul',
          'ol',
          'li',
          'pre',
          'br',
        ],
      }),
    );
    console.log(clean);
  }, [html]);

  function onChange(e) {
    setHtml(e.target.value);
  }

  return (
    <>
      <div className="editor">
        <EditorProvider>
          <Editor value={html} onChange={onChange}>
            <Toolbar>
              <BtnUndo />
              <BtnRedo />
              <Separator />
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <Separator />
              <BtnNumberedList />
              <BtnBulletList />
            </Toolbar>
          </Editor>
        </EditorProvider>
      </div>
      <h2>Output</h2>
      <div dangerouslySetInnerHTML={{ __html: clean }} />
    </>
  );
}
