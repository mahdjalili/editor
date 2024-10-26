import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import { generate } from "@/api/generate.api";
import { useMutation } from "@tanstack/react-query";

export default function Generate() {
    const generateMutation = useMutation({
        mutationFn: generate,
    });

    const formik = useFormik({
        initialValues: {
            prompt: "",
        },
        onSubmit: (values) => {
            generateMutation.mutate(values);
        },
    });

    return (
        <Form onFinish={formik.handleSubmit}>
            <Form.Item name="prompt" label="متن">
                <Input.TextArea placeholder="محصول را توصیف کنید..." rows={10} {...formik.getFieldProps("prompt")} />
            </Form.Item>

            <Button
                loading={generateMutation.isPending}
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
