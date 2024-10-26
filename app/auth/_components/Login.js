import { Form, Input, Button, Card, message } from "antd";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import * as yup from "yup";

export const Login = () => {
    const router = useRouter();
    const { setAuthToken } = useAuth();

    const [messageApi, contextHolder] = message.useMessage();

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setAuthToken(data.data.access_token);
            router.push("/studio");
            messageApi.success("ورود با موفقیت انجام شد");
        },
        onError: (error) => {
            messageApi.error(error.response.data.message);
        },
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email("ایمیل معتبر نمی‌باشد").required("ایمیل الزامی می‌باشد"),
            password: yup.string().required("رمز عبور الزامی می‌باشد"),
        }),
        onSubmit: (values) => {
            loginMutation.mutate(values);
        },
    });

    return (
        <Card className="min-w-[400px]" title="ورود">
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

                <Button loading={loginMutation.isPending} type="primary" htmlType="submit" size="large" block>
                    ورود
                </Button>
            </Form>
        </Card>
    );
};

export default Login;
