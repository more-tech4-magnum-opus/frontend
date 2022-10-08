import React, { useState } from "react";
import  {  Button, message, Upload  } from "antd"
import Icon, { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { host } from "../app/consts";


interface FileUploaderIE{
    onResponse: (response:any)=>void
}
export const FileUploader:React.FC<FileUploaderIE> = (data) =>{

    const props = {
        name: 'file',
        action: "",
        headers: {
            "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
        },
        beforeUpload: (file:File) => {
          const isPNG = file.type === 'image/png';
          if (!isPNG) {
            message.error(`${file.name} is not a png file`);
          }
          data.onResponse(file)
          return isPNG || Upload.LIST_IGNORE;
          
        },
        
      };
      
    return (
            <Upload {...props}>
              <Button icon={<UploadOutlined></UploadOutlined>}>Загрузите картинку</Button>
            </Upload>
      );
}