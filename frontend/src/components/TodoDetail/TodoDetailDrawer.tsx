import React, {useContext} from "react";
import { observer } from "mobx-react-lite";
import {Drawer} from 'antd';

import { TodoContext } from '../../utils/context';
import TodoDetailForm from "./TodoDetailForm";


const TodoDetailDrawer: React.FC = observer(() => {
  const todo = useContext(TodoContext);

  return (
    <>
      <Drawer
        title="Edit TODO Detail"
        width={500}
        onClose={todo.closeDetailModal}
        visible={todo.detailModalVisible}
        bodyStyle={{paddingBottom: 80}}
        destroyOnClose={true}
      >
        <TodoDetailForm/>
      </Drawer>
    </>
  );
});


export default TodoDetailDrawer;