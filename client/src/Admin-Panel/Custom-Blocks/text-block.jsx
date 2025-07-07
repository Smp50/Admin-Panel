import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Text_Block() {
  const [ckData, setckData] = useState('');

  return (
    <div className="mb-4">
      <CKEditor
        editor={ClassicEditor}
        data={ckData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setckData(data);
        }}
      />
    </div>
  );
}

export default Text_Block;
