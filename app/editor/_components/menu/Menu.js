import { useState } from "react";

import Setting from "./setting/Setting";
import Templates from "./templates/Templates";
import { Button } from "antd";

export default function Menu() {
    const [select, setSelect] = useState(0);

    const menu = [
        {
            key: 0,
            name: "لایه ها",
            icon: "",
            component: Setting,
        },
        {
            key: 1,
            name: "تمپلیت ها",
            icon: "",
            component: Templates,
        },
    ];

    const Page = menu.find((item) => item.key == select).component;

    return (
        <section className="flex h-full w-full">
            <div className="flex flex-col w-40 h-full">
                {menu.map((item) => (
                    <Button onClick={() => setSelect(item.key)}>{item.name}</Button>
                ))}
            </div>
            <div className="h-full flex-grow">
                <Page></Page>
            </div>
        </section>
    );
}
