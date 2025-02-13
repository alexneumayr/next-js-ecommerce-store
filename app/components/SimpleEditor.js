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

export default function SimpleEditor(props) {
  function onChange(e) {
    props.stateSetter(e.target.value);
  }

  return (
    <div className="editor">
      <EditorProvider>
        <Editor value={props.state} onChange={onChange}>
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
  );
}
/*   <h2>Output</h2>
<div dangerouslySetInnerHTML={{ __html: clean }} /> */
