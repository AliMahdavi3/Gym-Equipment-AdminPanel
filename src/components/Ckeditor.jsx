import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Ckeditor = ({ placeholder, className, onChange }) => {
    const stripTags = (data) => {
        return data.replace(/<(?!\/?h\d)[^>]+>/g, '');
    };
    return (
        <div className={className}>
             <CKEditor
                editor={ClassicEditor}
                data={`${placeholder}`}
                onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(stripTags(data));
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) =>
                    stripTags(editor.getData()) === placeholder ? editor.setData('') : null
                }
                config={{
                    language: 'ar',
                    alignment: {
                        options: ['left', 'right', 'center', 'justify'],
                        value: 'right',
                    },
                    toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        'undo',
                        'redo',
                        'paragraph' // Add 'paragraph' to the toolbar
                    ],
                }}
            />
        </div>
    )
}

export default Ckeditor
