import { Form, Input, Button, Card, message } from "antd";
import { useFormik } from "formik";

import { register } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";

import * as yup from "yup";

export const Register = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            messageApi.success("ثبت نام با موفقیت انجام شد");
        },
        onError: (error) => {
            messageApi.error(error.response.data.message);
        },
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: yup.object({
            email: yup.string().email("ایمیل معتبر نمی‌باشد").required("ایمیل الزامی می‌باشد"),
            password: yup.string().required("رمز عبور الزامی می‌باشد").min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
            confirmPassword: yup
                .string()
                .required("تایید رمز عبور الزامی می‌باشد")
                .oneOf([yup.ref("password"), null], "رمز عبور و تایید آن باید یکسان باشند"),
        }),
        onSubmit: (values) => {
            registerMutation.mutate({ email: values.email, password: values.password });
        },
    });

    return (
        <Card className="min-w-[400px]" title="ثبت نام">
            {contextHolder}
            <Form layout="vertical" onFinish={formik.handleSubmit}>
                <Form.Item
                    validateStatus={formik.errors.email ? "error" : ""}
                    help={formik.errors.email}
                    size="large"
                    name="email"
                    label="ایمیل"
                    onChange={formik.handleChange}
                >
                    <Input dir="ltr" />
                </Form.Item>
                <Form.Item
                    validateStatus={formik.errors.password ? "error" : ""}
                    help={formik.errors.password}
                    size="large"
                    name="password"
                    label="رمز عبور"
                    onChange={formik.handleChange}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    validateStatus={formik.errors.confirmPassword ? "error" : ""}
                    help={formik.errors.confirmPassword}
                    size="large"
                    name="confirmPassword"
                    label="تایید رمز عبور"
                    onChange={formik.handleChange}
                >
                    <Input.Password />
                </Form.Item>

                <Button loading={registerMutation.isPending} type="primary" htmlType="submit" size="large" block>
                    ثبت نام
                </Button>
            </Form>
        </Card>
    );
};

export default Register;
