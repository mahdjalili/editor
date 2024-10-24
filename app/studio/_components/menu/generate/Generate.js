import { Form, Input, Button } from "antd";
import { useFormik } from "formik";

export default function Generate() {
    const formik = useFormik({
        initialValues: {
            prompt: "",
        },
    });

    return (
        <Form onFinish={formik.handleSubmit}>
            <Form.Item name="prompt" label="متن">
                <Input.TextArea placeholder="محصول را توصیف کنید..." rows={10} {...formik.getFieldProps("prompt")} />
            </Form.Item>

            <Button
                icon={<i className="fa-regular fa-sparkles"></i>}
                type="primary"
                htmlType="submit"
                block
                size="large"
            >
                تولید
            </Button>
        </Form>
    );
}
