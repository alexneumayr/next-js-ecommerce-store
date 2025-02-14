'use client';
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnNumberedList,
  BtnRedo,
  BtnUnderline,
  BtnUndo,
  type ContentEditableEvent,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';

type Props = {
  state: string;
  stateSetter: React.Dispatch<React.SetStateAction<string>>;
};

export default function SimpleEditor(props: Props) {
  function onChange(e: ContentEditableEvent) {
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
