import React, {Component} from "react";
import {observer} from "mobx-react";
import {Drawer} from 'antd';

import TodoStore from '../../store/TodoStore';
import TodoDetailForm from "./TodoDetailForm";


@observer
class TodoDetailDrawer extends Component<any, any> {
  render() {
    return (
      <>
        <Drawer
          title="修改任务信息"
          width={500}
          onClose={TodoStore.closeDetailModal}
          visible={TodoStore.detailModalVisible}
          bodyStyle={{paddingBottom: 80}}
          destroyOnClose={true}
        >
          <TodoDetailForm/>
        </Drawer>
      </>
    );
  }
}


export default TodoDetailDrawer;