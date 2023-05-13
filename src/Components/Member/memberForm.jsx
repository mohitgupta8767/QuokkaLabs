import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import { getMemberData, setMembersData } from '../../MockData/members';
import { generateMemberId } from '../Utils/helperFunction';

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MemberForm = ({ visible, data, handleClose, type }) => {
    const [form] = Form.useForm();
    const [isFormValidated, setIsFormValidated] = useState(false);
    useEffect(() => {
        if (type !== 'Add') {
            form.setFieldsValue({ ...data })
        }
    })

    const handleOk = () => {
        form.validateFields()
            .then(() => {
                const existingData = getMemberData();
                if (data?.member_id && type !== "Add") {
                    const exisitngMemberIndex = existingData.findIndex(x => x.member_id === data.member_id);
                    if (exisitngMemberIndex >= 0) {
                        const updatedFormData = form.getFieldsValue();
                        const currentData = existingData[exisitngMemberIndex];
                        existingData[exisitngMemberIndex] = { ...updatedFormData, key: currentData.member_id, isBlock: currentData.isBlock };
                    }
                } else {
                    const id = generateMemberId();
                    existingData.push({
                        ...form.getFieldsValue(),
                        member_id: id,
                        key: id
                    })
                }
                setMembersData(existingData);
                message.success("Record saved successfully.");
                form.resetFields();
                handleClose();
            })
    };

    const handleCancel = () => {
        form.resetFields();
        handleClose();
    };

    const handleFormChange = (allFields) => {
        console.log(allFields)
        if (type === 'Add') {
            const filedValue = allFields.every((field) => field.touched && field.validated);
            if (filedValue) {
                setIsFormValidated(true);
            } else {
                setIsFormValidated(false);
            }
        }
    }

    return (
        <>
            <Modal
                title={`${type === "Add" ? "Add" : "Edit"} Member`}
                open={visible}
                onCancel={handleCancel}
                onOk={handleOk}
                className='memberFormModal'
                closeIcon={false}
                destroyOnClose
                okButtonProps={{ disabled: type !== "Add" ? false : !isFormValidated }}
            >
                <Form
                    form={form}
                    onFieldsChange={(_, allFields) => {
                        handleFormChange(allFields);
                    }}
                >
                    {type !== "Add" && <Form.Item
                        className='customFormItem'
                        name="member_id"
                        label="Member Id"
                    >
                        <Input disabled />
                    </Form.Item>}
                    <Form.Item
                        className='customFormItem'
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your name',
                            },
                        ]}
                    >
                        <Input maxLength={30} />
                    </Form.Item>
                    <Form.Item
                        className='customFormItem'
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email',
                            },
                            {
                                pattern: regex,
                                message: 'Please enter a valid email',
                            },
                        ]}
                        validateTrigger="onBlur"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className='customFormItem'
                        name="contact"
                        label="Contact"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your contact number',
                            },
                            {
                                pattern: /^[0-9\b]+$/,
                                message: 'Please enter a valid contact number',
                            },
                            {
                                len: 10,
                                message: "Contact should be 10 digit number"
                            }
                        ]}
                        validateTrigger="onBlur"
                    >
                        <Input maxLength={10} />
                    </Form.Item>

                    <Form.Item
                        className='customFormItem'
                        name="designation"
                        label="Designation"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your designation',
                            },
                        ]}
                    >
                        <Select
                            options={[
                                { value: 'Software Engineer', label: 'Software Engineer' },
                                { value: 'Software Develper', label: 'Software Developer' },
                                { value: 'Software Architect', label: 'Software Architect' },
                                { value: 'UI Designer', label: 'UI Designer' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        className='customFormItem'
                        name="organization"
                        label="Organization"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your organization',
                            },
                        ]}
                    >
                        <Input maxLength={30} />
                    </Form.Item>

                    <Form.Item
                        className='customFormItem'
                        name="address"
                        label="Address"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your address',
                            },
                        ]}
                    >
                        <Input maxLength={50} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default MemberForm;
