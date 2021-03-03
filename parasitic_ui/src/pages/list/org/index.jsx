import { PlusOutlined,DownOutlined ,CheckCircleOutlined} from '@ant-design/icons';
import { Tag,Menu,Button, Card, List, Typography,Dropdown ,message} from 'antd';
import { findDOMNode } from 'react-dom';
import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import OperationModal from './components/OperationModal';
import UpdateForm from './components/UpdateForm';
import styles from './style.less';
import { history } from 'umi';
const { Paragraph } = Typography;

export const OrgList = (props) => {

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
    caList: { list },
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
     
    </div>
  );
  
  const extraContent = (
    <div className={styles.extraImg}>
    
    </div>
  );
  const nullData = {};
  useEffect(() => {
    dispatch({
      type: 'caList/fetch',
      payload: {
        count: 6,
      },
    });
  }, [1]);

  const showEditModal = (item) => {
    setVisible(true);
    setCurrent(item);
  };

  const goCADetail = (item) => {
    //console.info(item);return false;
    history.push(`/list/causer/`+item.id);
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
      type: 'caList/submit',
      // payload: {id, ...values,},
      payload : values,
    });
  };

  return (
    <div>
    <PageContainer content={content}>
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
                      <a onClick={(e) => { e.preventDefault(); goCADetail(item); }}>{item.name}
                      <Tag style={{float:'right'}}
                      icon={<CheckCircleOutlined />} color="success">运行中</Tag></a> </span>
                    }
                      description={
                        <a onClick={(e) => { e.preventDefault(); goCADetail(item); }}>
                        <Paragraph
                          className={styles.item}
                          ellipsis={{
                            rows: 3,
                          }}
                        >
                          {item.remark}
                        </Paragraph></a>
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
                  <PlusOutlined /> 新建CA服务
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

export default connect(({ caList, loading }) => ({
  caList,
  loading: loading.models.caList,
}))(OrgList);
