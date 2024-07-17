import Setting from "./_components/setting/Setting";
import Templates from "./_components/templates/Templates";

export default function layout({ children }) {
    return (
        <section className="flex items-center justify-between">
            <Setting />
            {children}
            <Templates />
        </section>
    );
}
