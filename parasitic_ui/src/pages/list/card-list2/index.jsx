import { PlusOutlined,DownOutlined ,CheckCircleOutlined} from '@ant-design/icons';
import { Tag,Menu,Button, Card, List, Typography,Dropdown ,message} from 'antd';
import { findDOMNode } from 'react-dom';
import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import OperationModal from './components/OperationModal';
import UpdateForm from './components/UpdateForm';
import styles from './style.less';
const { Paragraph } = Typography;

export const CardList = (props) => {

  const MoreBtn = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">停止</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    listAndcardList2: { list },
  } = props;
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  //const actionRef = useRef();
  const [stepFormValues, setStepFormValues] = useState({'a':1});
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
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
  const nullData = {};
  useEffect(() => {
    dispatch({
      type: 'listAndcardList2/fetch',
      payload: {
        count: 6,
      },
    });
  }, [1]);

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item) => {
    setVisible(true);
    setCurrent(item);
  };

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current);
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();
    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleSubmit = (values) => {
    console.info('ca====',values);//return ;
    //const id = current ? current.id : '';
    setAddBtnblur();
    setDone(true);
    dispatch({
      type: 'listAndcardList2/submit',
      // payload: {id, ...values,},
      payload : values,
    });
  };
  
  /** 
  const handleUpdate = async (fields) => {
    const hide = message.loading('正在配置');
    console.log('handleUpdate====',fields)
    try {
      await updateRule({
        name: fields.name,
        remark: fields.remark,
        //key: fields.key,
      });
      hide();
      message.success('配置成功');
      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
      return false;
    }
  };**/
  

  return (
    <div>
    <PageContainer content={content} extraContent={extraContent}>
      <div className={styles.cardList}>
        <List
          rowKey="id"
          loading={loading}
          grid={{
            gutter: 25,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={[nullData, ...list]}
          renderItem={(item) => {
            if (item && item.id) {
              return (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
actions={[<a key="option1" key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                      >编辑</a>, 
                      <MoreBtn key="more" item={item} />
                    ]}
                  >
                    <Card.Meta
                      title={
                        <span>
                      <a>{item.name}</a> &nbsp;&nbsp;&nbsp;&nbsp;
                      <Tag style={{float:'right'}}
                      icon={<CheckCircleOutlined />} color="success">运行中</Tag></span>
                    }
                      description={
                        <Paragraph
                          className={styles.item}
                          ellipsis={{
                            rows: 3,
                          }}
                        >
                          {item.remark}
                        </Paragraph>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }

            return (
              <List.Item>
                <Button type="dashed" className={styles.newButton} onClick={() => {
                  console.info('handleUpdateModalVisible===',stepFormValues)
                  handleUpdateModalVisible(true);
            }}
              ref={addBtn} >
                  <PlusOutlined /> 创建CA服务
                </Button>
              </List.Item>
            );
          }}
        />
      </div>
    </PageContainer>
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleSubmit(value);
            console.log('success=====',success)

            //if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});

              // if (addBtn.current) {
              //   addBtn.current.reload();
              // }
            //}
          }
        }
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      
    <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default connect(({ listAndcardList2, loading }) => ({
  listAndcardList2,
  loading: loading.models.listAndcardList2,
}))(CardList);
