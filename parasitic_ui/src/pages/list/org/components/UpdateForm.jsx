import React, { useEffect,useState } from 'react';
import { connect } from 'umi';
import { Typography,Form, Button, DatePicker, Input, Modal, Radio, Select, Steps,Checkbox } from 'antd';
const FormItem = Form.Item;
const formLayout = {
  labelCol: {    span: 7,  },
  wrapperCol: {  span: 13,  },
};
const radioStyle = {
  display: 'block',
  height: '50px',
  lineHeight: '50px',
  width: '800',
};
const UpdateForm = (props) => {
  // const { Title, Paragraph, Text, Link } = Typography;
  // const blockContent='CA服务可以为组织用户创建身份数字证书和MSP,一般部署Peer节点或Order服务之前需要先用CA服务为它们创建MSP';
  const [formVals, setFormVals] = useState({
    msp_name: props.values.msp_name,
    msp_id: props.values.msp_id,
    ca_id : props.values.ca_id,
    ca_user_id : props.values.ca_user_id,
    // remark : props.values.remark,
  });
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
    dispatch,
    caList: { list ,ilist},
  } = props;
  useEffect(() => {
    dispatch({
      type: 'caList/fetch',
      payload: {
      },
    });
  }, [1]);
  const { value } = useState();
  //const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  // const {
  //   onSubmit: handleUpdate,
  //   onCancel: handleUpdateModalVisible,
  //   updateModalVisible,
  //   values,
  // } = props;

  const renderContent = () => {
      return (
        <>
          <FormItem
          name="msp_name"
          label="组织名称"
          rules={[
            {
              required: true,
              message: '请输入组织MSP名称！',
            },
          ]}
        >
          <Input placeholder="请输入MSP显示名称,可以使用中文" />
        </FormItem>
        <FormItem
          name="msp_id"
          label="组织MSPID"
          rules={[
            {
              required: true,
              message: '组织MSPID！',
            },
          ]}
        >
          <Input placeholder="组织MSPID" />
        </FormItem>

        <Form.Item
          name="ca_id"
          label="根证书"
          rules={[
            {
              required: true,
              message: '请选择CA服务作为根证书',
            },
          ]}
        >
          <Select placeholder="请选择" onSelect={handleCaChange}>
            {
              list.map((item,index) => {
                return <Select.Option value= { item.id } key={index} >{item.name }</Select.Option>
             })
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="ca_user_id"
          label="管理员证书"
          rules={[
            {
              required: true,
              message: '请选择任务负责人',
            },
          ]}
        >
          <Select placeholder="请选择">
            

          {ilist && ilist.length ? (
              ilist.map((item,index) => {
                return <Select.Option value= { item.id } key={index} >{item.enroll_id }</Select.Option>
            })
      ) : null}

          </Select>
        </Form.Item>
          
        </>
      );
  };
  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    handleUpdate({ ...formVals, ...fieldsValue });
  };
  const handleCaChange = value => {
    //setCities(cityData[value]);
    //setSecondCity(cityData[value][0]);
    console.info('handleCaChange=====',value)
    dispatch({
      type: 'caList/queryIdenListByCaId',
      payload: { ca_id:value, },
    });
    
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
      title="新建组织"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{

          msp_name: formVals.msp_name,
          msp_id: formVals.msp_id,
          ca_id : formVals.ca_id,
          ca_user_id : formVals.ca_user_id,
          
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

//export default UpdateForm;

export default connect(({ caList }) => ({
  caList,
}))(UpdateForm);
