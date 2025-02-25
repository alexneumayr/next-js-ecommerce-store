'use client';
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

type Props = {
  state: string;
  stateSetter: React.Dispatch<React.SetStateAction<string>>;
};

export default function SimpleEditor(props: Props) {
  // Returns a WYSIWYG editor which uses the state and state setter from the props
  return (
    <div className="editor">
      <EditorProvider>
        <Editor
          value={props.state}
          onChange={(event) => props.stateSetter(event.target.value)}
        >
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
