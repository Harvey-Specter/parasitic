import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const UpdateForm = (props) => {
  const [formVals, setFormVals] = useState({
    name: props.values.name,
    remark: props.values.remark,
    key: props.values.key,
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });
  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    handleUpdate({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="规则名称"
          rules={[
            {
              required: true,
              message: '请输入规则名称！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="remark"
          label="规则描述"
          rules={[
            {
              required: true,
              message: '请输入至少五个字符的规则描述！',
              min: 5,
            },
          ]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          完成
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="用户信息编辑"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: formVals.name,
          remark: formVals.remark,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
