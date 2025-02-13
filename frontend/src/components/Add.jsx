import { Button, Checkbox, Form, Input, message,Image, Upload } from 'antd';
import { PrivateApi } from '../axiosInstance';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const Add = ({f})=>{
    const [messageApi, contextHolder] = message.useMessage();
    const [filelink, setFileLink]  = useState('')
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };
      function base64ToFile(base64String, fileName, fileType) {
        // Split the base64 string into its data and encoding type
        const [header, base64Data] = base64String.split(',');
        
        // Decode the base64 string
        const binaryString = window.atob(base64Data);
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
      
        // Convert binary string to Uint8Array
        for (let i = 0; i < binaryString.length; i++) {
          uint8Array[i] = binaryString.charCodeAt(i);
        }
      
        // Create a Blob object from the Uint8Array
        const blob = new Blob([uint8Array], { type: fileType });
      
        // Create a File object from the Blob
        const file = new File([blob], fileName, { type: fileType });
      
        return file;
      }
    const onFinish = async(values) => {
        const formData = new FormData();
        const file = values.image[0].originFileObj;
        const base64File = await convertToBase64(file);
    formData.append('name', values.name);
    let quiz1 = +values.quiz1;
    if (quiz1>100)quiz1=100;
    else if(quiz1<0)quiz1=0;
    quiz1 = Math.round(quiz1/2)
    let quiz2 = +values.quiz2;
    if (quiz2>100)quiz2=100;
    else if(quiz2<0)quiz2=0;
    quiz2 = Math.round(quiz2/2)
    formData.append('quiz2', quiz2);
    formData.append('quiz1', quiz1);
    if (values.image && values.image.length > 0) {
      formData.append('img',filelink);
      formData.append('img_name',values.image[0].name);
    //   formData.append('img', base64ToFile(base64File,values.image[0].name, values.image[0].type));
    }else{
        return
    }

        PrivateApi.post('/record/',formData).then((res) => {
            console.info(res.status)
          if(res.status === 201) {
            messageApi.success("Record Added")
        }else if (res.status === 401||res.status === 403){
            messageApi.error("Unauthorized")
            f(false)
        }
        else{
            messageApi.error('Could add the record ')
          }
        }).catch((error)=>{
            messageApi.error('Could add the record ')
        })
      };
      const onFinishFailed = (errorInfo) => {
        messageApi.error('Could add the record')
      };
      const getBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
        const [previewOpen, setPreviewOpen] = useState(false);
        const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const handleChange = ({ file,fileList: newFileList }) => {
        console.log(newFileList)
        if (file.status === 'done') {
            message.success(`${file.name} file uploaded successfully.`);
            setFileLink('https://server4.lcfordevelopment.com/media/images/'+file.name);
          } else if (file.status === 'error') {
            message.error(`${file.name} file upload failed.`);
          }
        setFileList(newFileList)};

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
      };
      const uploadButton = (
        <button
          style={{
            border: 0,
            background: 'none',
          }}
          type="button"
        >
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </button>
      );
      const beforeUpload = (file) => {
        console.log(file)
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      };
      const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
    return(
        <>
        <Form
        name="basic"
        onEncrypted={'multipart/form-data'}
        
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
         {contextHolder}
        <Form.Item
          label="Full Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input a name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
        name="image"
        label="Image Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please upload an image!' }]}
      >
        <Upload
          name="image"
          listType="picture"
          fileList={fileList}
          action={'https://server4.lcfordevelopment.com/api/image/'}
        //   onChange={({ fileList }) => setFileList(fileList)}
          beforeUpload={beforeUpload} // Prevent automatic upload
          onPreview={handlePreview}
          onChange={handleChange}
          accept=".jpg,.jpeg,.png"
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </Form.Item>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}




        <Form.Item
          label="Quiz 1"
          name="quiz1"
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item
          label="Quiz 2"
          name="quiz2"
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      
      </>
    )
}

export default Add;