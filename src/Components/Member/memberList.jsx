import React, { useEffect, useRef, useState } from 'react'
import { getMemberData, setMembersData } from '../../MockData/members';
import { Avatar, Button, Input, Popover, Space, Switch, Table, message } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import MemberForm from './memberForm';
import DeleteConfirmModal from '../Common/deletConfirmModal';
import { useNavigate } from 'react-router';



const MemberList = () => {
    const [visible, setVisible] = useState(false);
    const [formType, setFormType] = useState("Add");
    const [listData, setListData] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const searchRef = useRef();
    const navigation = useNavigate();

    useEffect(() => {
        if (searchRef.current) {
            clearTimeout(searchRef.current)
        }
        // debouce search is implemented which searches the record after setTime. 
        // This is used so that when using backend api unnecessary network are not made on every keystroke.
        searchRef.current = setTimeout(() => {
            const trimSearchString = searchString?.trim()?.toLowerCase();
            if (trimSearchString) {
                let filterdData = [...getMemberData()];
                filterdData = filterdData?.filter((x) => {
                    return x.member_id.toLowerCase().includes(searchString) ||
                        x.email.toLowerCase().includes(searchString) ||
                        x.name.toLowerCase().includes(searchString) ||
                        x.organization.toLowerCase().includes(searchString) ||
                        x.designation.toLowerCase().includes(searchString) ||
                        x.contact.toLowerCase().includes(searchString) ||
                        x.address.toLowerCase().includes(searchString)
                })
                setListData(filterdData)
            } else {
                setListData(getMemberData())
            }
        }, 500);

    }, [searchString])

    const columns = [
        {
            title: "Member Id",
            dataIndex: "member_id",
            key: "member_id",
            sorter: (a, b) => a.member_id.localeCompare(b.member_id),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            sorter: (a, b) => a.address.localeCompare(b.address),
        },
        {
            title: "Organization",
            dataIndex: "organization",
            key: "organization",
            sorter: (a, b) => a.organization.localeCompare(b.organization),
        },
        {
            title: "Designation",
            dataIndex: "designation",
            key: "designation",
            sorter: (a, b) => a.designation.localeCompare(b.designation),
        },
        {
            title: "Contact",
            dataIndex: "contact",
            key: "contact",
        },
        {
            title: "Blocked",
            dataIndex: "isBlock",
            key: "isBlock",
            render: (text, record, index) => {
                return <Switch checked={record.isBlock} onChange={(checked) => {
                    handleBlockChange(checked, index)
                }} />

            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setVisible(true);
                            setSelectedRecord(record)
                            setFormType("Edit");
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            setShowDeleteModal(true);
                            setSelectedRecord(record)
                        }}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleBlockChange = (isChecked, index) => {
        const existingData = getMemberData();
        existingData[index].isBlock = isChecked;
        setMembersData(existingData)
        setListData(getMemberData())
        message.success(`Member ${isChecked ? "blocked" : "unblocked"} successfully.`)
    }

    const handleModalClose = () => {
        setListData(getMemberData())
        setSelectedRecord(null)
        setVisible(false)
        setShowDeleteModal(false)
    }

    const confirmDelete = () => {
        const filteredData = listData.filter(x => x.member_id !== selectedRecord.member_id)
        setMembersData(filteredData);
        message.success("Record deleted successfully.");
        setListData(getMemberData());
        setShowDeleteModal(false);

    }

    const handleSignOut = () => {
        navigation('/login');
        localStorage.clear();
        message.success("You have successfully logged out!")
    }

    const content = (
        <div>
            <p onClick={handleSignOut}>Sign out</p>
        </div>
    );

    return (
        <>
            <div className='memberlistContainer'>
                <div className='memberListSearch'>
                    <Input
                        className="search"
                        value={searchString}
                        onChange={(e) => {
                            setSearchString(e.target.value)
                        }}
                        placeholder='Search Here...'
                        prefix={<SearchOutlined />}
                    />
                    <Button
                        className="search"
                        type='primary'
                        onClick={() => {
                            setVisible(true)
                            setFormType("Add")
                        }}
                    >
                        <PlusOutlined />
                        Add
                    </Button>
                    <Popover
                        size={30}
                        content={content}
                        title=""
                        trigger="click"
                    >
                        <Avatar
                            onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <UserOutlined />
                        </Avatar>
                    </Popover>
                </div>

                <Table
                    dataSource={[...listData]}
                    columns={columns}
                    pagination={false}
                    bordered
                    size="middle"
                    scroll={{ x: 400 }}
                />
                {/* Same form is used for add and edit feature */}
                {visible &&
                    <MemberForm
                        visible={visible}
                        data={selectedRecord}
                        handleClose={handleModalClose}
                        type={formType}
                    />}
                {/* This form is used for delete feature */}
                {showDeleteModal &&
                    <DeleteConfirmModal
                        id={selectedRecord?.member_id}
                        visible={showDeleteModal}
                        handleConfirm={confirmDelete}
                        handleCancel={handleModalClose}
                    />}
            </div>
        </>
    )
}

export default MemberList;