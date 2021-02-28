import React, { useState } from 'react';
import { Typography,Form, Button, DatePicker, Input, Modal, Radio, Select, Steps,Checkbox } from 'antd';
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};
const radioStyle = {
  display: 'block',
  height: '50px',
  lineHeight: '50px',
  width: '800',
};
const UpdateForm = (props) => {
  const { Title, Paragraph, Text, Link } = Typography;
  const blockContent='CA服务可以为组织用户创建身份数字证书和MSP,一般部署Peer节点或Order服务之前需要先用CA服务为它们创建MSP';
  const [formVals, setFormVals] = useState({
    name: props.values.name,
    createType: props.values.createType,
    enroll_id : props.values.enroll_id,
    secret : props.values.secret,
    remark : props.values.remark,
  });
  const { value } = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fieldsValue });
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem
          name="name"
          label="名称"
          rules={[
            {
              required: true,
              message: '请输入CA名称！',
            },
          ]}
        >
          <Input placeholder="请输入CA名称,可以使用中文和空格" />
        </FormItem>
        <FormItem
          name="enroll_id"
          label="管理员ID"
          rules={[
            {
              required: true,
              message: '请输入CA管理员ID！',
            },
          ]}
        >
          <Input placeholder="请输入CA管理员ID (Administrator enroll ID)" />
        </FormItem>

        <FormItem
          name="secret"
          label="管理员密码"
          rules={[
            {
              required: true,
              message: '请输入CA管理员密码！',
            },
          ]}
        >
          <Input placeholder="请输入CA管理员密码" />
        </FormItem>
        <FormItem
          name="remark"
          label="备注"
          rules={[
            {
              required: true,
              message: '请输入至少3个字符的备注！',
              min: 3,
            },
          ]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </FormItem>
          <FormItem  name="extension" label="高级选项">
          <Checkbox.Group name="extension" options={checkOptions} style={{ width: '60%' }}   onChange={selectOption} />    

          </FormItem>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          总结
        </>
      );
    }

    return (
      <><Paragraph>
        <pre>{blockContent}</pre></Paragraph>
        
        <FormItem name = "create_type" label="新建方式" 
        rules={[
          {
            required: true,
            message: '请选择新建方式',
          },
        ]}> 
        <Radio.Group value={value} size="middle" style={{
                width: '100%',
              }} block>
        <Radio.Button style={radioStyle} value={1} block>
          创建一个新的CA服务
        </Radio.Button>
        <Radio.Button style={radioStyle} value={2} block>
          导入一个已经存在的CA服务
        </Radio.Button>
        
      </Radio.Group>
          </FormItem>
        
      </>
    );
  };

  const checkOptions = [
    { label: '数据库和复制组', value: '1' },
    { label: '资源分配', value: '2' },
    { label: '硬件安全模块(HSM)', value: '3' },
  ];

  const selectOption=()=>{

  }
  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button
            style={{
              float: 'left',
            }}
            onClick={backward}
          >
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            下一步
          </Button>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          <Button
            style={{
              float: 'left',
            }}
            onClick={backward}
          >
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </>
      );
    }

    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          下一步
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
      title="新建CA服务(Certificate Authority)"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps
        style={{
          marginBottom: 28,
        }}
        size="small"
        current={currentStep}
      >
        <Step title="选择创建或导入" description="" />
        <Step title="基本信息" />
        {/** <Step title="高级选项" />*/}
        <Step title="参数预览" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{

          name: formVals.name,
          createType: formVals.createType,
          enroll_id : formVals.enroll_id,
          secret : formVals.secret,
          remark : formVals.remark,
          dbset: formVals.dbset,
          res : formVals.res,
          hsm : formVals.hsm,
          
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
