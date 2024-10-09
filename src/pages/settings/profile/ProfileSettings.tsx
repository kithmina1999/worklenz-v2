import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import {
    Button,
    Card,
    Flex,
    Form,
    GetProp,
    Input,
    message,
    Typography,
    Upload,
    UploadProps,
} from 'antd'
import React, { useState } from 'react'
import { colors } from '../../../styles/colors'

const ProfileSettings = () => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string>()
    const [name, setName] = useState('Sachintha Prasad')
    const [email, setEmail] = useState('prasadsachintha1231@gmail.com')

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result as string))
        reader.readAsDataURL(img)
    }

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng =
            file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!')
        }
        return isJpgOrPng && isLt2M
    }

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false)
                setImageUrl(url)
            })
        }
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <Flex align="center" gap={4}>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <Typography.Text>Upload</Typography.Text>
            </Flex>
        </button>
    )

    return (
        <Card style={{ width: '100%' }}>
            <Form
                layout="vertical"
                initialValues={{ name: name, email: email }}
                style={{ width: '100%', maxWidth: 350 }}
            >
                <Form.Item>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{ width: '100%' }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Name is required',
                        },
                    ]}
                >
                    <Input style={{ borderRadius: 4 }} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Name is required',
                        },
                    ]}
                >
                    <Input style={{ borderRadius: 4 }} disabled />
                </Form.Item>
                <Form.Item>
                    <Button type="primary">Save Changes</Button>
                </Form.Item>
            </Form>

            <Flex vertical>
                <Typography.Text
                    style={{ fontSize: 12, color: colors.lightGray }}
                >
                    Joined a month ago
                </Typography.Text>
                <Typography.Text
                    style={{ fontSize: 12, color: colors.lightGray }}
                >
                    Last updated a month ago
                </Typography.Text>
            </Flex>
        </Card>
    )
}

export default ProfileSettings
