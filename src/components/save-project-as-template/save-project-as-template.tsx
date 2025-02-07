import { toggleSaveAsTemplateDrawer } from "@/features/projects/projectsSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Checkbox, Drawer, Form, Input } from "antd/es";
import { useTranslation } from "react-i18next";

const SaveProjectAsTemplate = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('project-view/save-as-template');

  const [form] = Form.useForm();

  const { isSaveAsTemplateDrawerOpen } = useAppSelector(state => state.projectsReducer);

  const checkBoxOptions = {
    statuses: t('includesOptions.statuses'),
    phases: t('includesOptions.phases'),
    labels: t('includesOptions.labels'),
  };
  return (
    <Drawer
      title={t('title')}
      open={isSaveAsTemplateDrawerOpen}
      onClose={() => dispatch(toggleSaveAsTemplateDrawer())}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label={t('templateName')} required>
          <Input />
        </Form.Item>
        <Form.Item name="includes" label={t('includes')}>
          <Checkbox.Group options={Object.values(checkBoxOptions)} />
        </Form.Item>
        <Form.Item name="taskIncludes" label={t('taskIncludes')}>
          <Checkbox.Group options={Object.values(checkBoxOptions)} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default SaveProjectAsTemplate;
