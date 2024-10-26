import Text from "@/layers/text/Text";
import Image from "@/layers/image/Image";
import Background from "@/layers/background/Background";
import Shape from "@/layers/shape/Shape";

export const layers = {
    Text: { component: Text, name: "متن", icon: <i className="fa-regular fa-font"></i> },
    Image: { component: Image, name: "عکس", icon: <i className="fa-regular fa-image"></i> },
    Background: { component: Background, name: "پس‌زمینه", icon: <i className="fa-solid fa-trees"></i> },
    Shape: { component: Shape, name: "شکل", icon: <i className="fa-regular fa-square"></i> },
};

export default layers;
