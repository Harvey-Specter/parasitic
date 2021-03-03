import { DownOutlined, PlusOutlined,IssuesCloseOutlined } from '@ant-design/icons';
import { Menu,Button, Divider, message, Input, Drawer ,Dropdown,Modal} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import styles from './style.less';
import { queryUser, updateUser, addUser, removeUser ,cancelUser} from './service';
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addUser({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');

  try {
    await updateUser({
      name: fields.name,
      remark: fields.remark,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeUser({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleCancel = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await cancelUser({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
  console.log('param====index===',props.match.caid);
  const content = (
    <div className={styles.pageHeaderContent}>
      <p>
        段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
        提供跨越设计与开发的体验解决方案。
      </p>
      <div className={styles.contentLink}>
        <a>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
          快速开始
        </a>
        <a>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
          产品简介
        </a>
        <a>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
          产品文档
        </a>
      </div>
    </div>
  );
  
  const extraContent = (
    <div className={styles.extraImg}>
      <img
        alt="这是一个标题"
        src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
      />
    </div>
  );
  const [createModalVisible, handleModalVisible] = useState(false);
  const deleteItem = async (delFlag,selectedRowsState) => {
    if(delFlag=='1')await handleRemove(selectedRowsState);
    else if(delFlag=='0')await handleCancel(selectedRowsState);
      console.log('selectedRowsState----',selectedRowsState)
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();
  }; 
  
  const editAndDelete = (key, currentItem) => {
    if (key === 'edit') {
      //handleUpdateModalVisible(true);
      //setStepFormValues(currentItem);
      Modal.confirm({
        title: '注销用户',
        content: '确定注销该用户吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem('0',[currentItem]),
      });
    }
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除用户',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem('1',[currentItem]),
      });
    }
  };
  
  const MoreBtn = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">注销</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );
  const [title, setTitle] = useState('新建用户');
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      tip: '用户名称是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '邮箱为必填项',
          },
        ],
      },
      //valueType: 'textarea',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '邮箱为必填项',
          },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'remark',
      valueType: 'textarea',
    },
    
//{title: '服务调用次数', dataIndex: 'callNo', sorter: true, hideInForm: true, renderText: (val) => `${val} 万`,},
    {
      title: '状态',
      dataIndex: 'state',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '正常',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    {
      title: '上次登陆时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <MoreBtn key="more" item={record} />
        </>
      ),
    },
  ];
  return (
    <PageContainer content={content} extraContent={extraContent}>
      <ProTable
        headerTitle="CA的用户"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => {
            handleModalVisible(true);
            //setTitle('新建用户');
          }}>
            <IssuesCloseOutlined />重新Enroll
          </Button>,
          <Button type="primary" onClick={() => {
            handleModalVisible(true);
            setTitle('新建用户');
          }}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => queryUser({ ...params, sorter, filter })}
        
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项&nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              console.log('selectedRowsState----',selectedRowsState)
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} title={title}>
        <ProTable
          onSubmit={async (value) => {

            console.log('value====',value);
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
